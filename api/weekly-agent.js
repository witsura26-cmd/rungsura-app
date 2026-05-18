/**
 * Weekly Agent — Vercel Cron (ทุกวันอาทิตย์ 23:30 ICT = 16:30 UTC)
 * 1. อ่านผลการทำการบ้านสัปดาห์ที่แล้วจาก Redis
 * 2. วิเคราะห์ performance
 * 3. Generate บทเรียนใหม่สำหรับสัปดาห์ถัดไปด้วย Claude
 * 4. Save กลับไปที่ Redis
 */

const TEACHER_CONFIG = [
  { subjectKey:"thai",    subject:"ภาษาไทย",   teacher:"ครูนิ่ม",    icon:"✍️",  bg:"bg-yellow-50",  border:"border-yellow-200", badge:"bg-yellow-100 text-yellow-700",
    system:"คุณคือครูนิ่ม ครูภาษาไทย สอนวอลนัท 8 ขวบ ป.4 ด้วยความอบอุ่น สนุก และเชื่อมกับชีวิตจริง" },
  { subjectKey:"math",    subject:"คณิตศาสตร์", teacher:"ครูโอ๋",     icon:"🔢",  bg:"bg-blue-50",    border:"border-blue-200",   badge:"bg-blue-100 text-blue-700",
    system:"คุณคือครูโอ๋ ครูคณิตศาสตร์ สอนวอลนัท 8 ขวบ ป.4 เน้น logic และแก้โจทย์ทีละขั้นตอน" },
  { subjectKey:"science", subject:"วิทยาศาสตร์", teacher:"ครูไก่",    icon:"🔬",  bg:"bg-green-50",   border:"border-green-200",  badge:"bg-green-100 text-green-700",
    system:"คุณคือครูไก่ ครูวิทยาศาสตร์ สอนวอลนัท 8 ขวบ ป.4 ด้วยการทดลองและเรื่องน่าทึ่ง" },
  { subjectKey:"english", subject:"ภาษาอังกฤษ", teacher:"ครูอังกฤษ", icon:"🌍",  bg:"bg-indigo-50",  border:"border-indigo-200", badge:"bg-indigo-100 text-indigo-700",
    system:"คุณคือครูภาษาอังกฤษ สอนวอลนัท 8 ขวบ ป.4 เน้น conversation และ grammar พื้นฐาน" },
  { subjectKey:"singing", subject:"ร้องเพลง",    teacher:"ครูมิ้นท์", icon:"🎤",  bg:"bg-pink-50",    border:"border-pink-200",   badge:"bg-pink-100 text-pink-700",
    system:"คุณคือครูมิ้นท์ ครูร้องเพลง สอนวอลนัท 8 ขวบ ด้วยความสนุกและเทคนิคการร้อง" },
  { subjectKey:"piano",   subject:"เปียโน",      teacher:"ครูบิ๊ก",   icon:"🎹",  bg:"bg-purple-50",  border:"border-purple-200", badge:"bg-purple-100 text-purple-700",
    system:"คุณคือครูบิ๊ก ครูเปียโน สอนวอลนัท 8 ขวบ เน้นการอ่านโน้ตและ technique พื้นฐาน" },
];

async function callClaude(apiKey, system, userMsg, maxTokens = 1200) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',  // ใช้ Haiku เพราะถูกกว่าและเร็วกว่า
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userMsg }],
    }),
  });
  const d = await r.json();
  return d.content?.[0]?.text || '';
}

function safeParseJson(txt) {
  try {
    const m = txt.replace(/```json\s*/gi,'').replace(/```\s*/g,'').trim().match(/[\[{][\s\S]*[\]}]/);
    return m ? JSON.parse(m[0]) : null;
  } catch { return null; }
}

async function generateLesson(apiKey, tc, week, prevResult, interviewSummary) {
  const context = `วอลนัท อายุ 8 ขวบ ป.4\n${interviewSummary}\n` +
    (prevResult ? `ผลสัปดาห์ที่แล้ว: MCQ ${prevResult.mcqScore||0}/${prevResult.mcqTotal||15}, เขียน ${prevResult.writtenScore||0}/${prevResult.writtenTotal||9}\n` : '');

  // 1 call เดียว — รวม reading + MCQ + written เพื่อลด latency
  const prompt =
    `${context}\n` +
    `สร้างบทเรียน ${tc.subject} สัปดาห์ที่ ${week} สำหรับวอลนัท 8 ขวบ ป.4\n` +
    `ตอบ JSON object เท่านั้น (ห้ามมี text นอก JSON):\n` +
    `{\n` +
    `  "title": "ชื่อบทเรียน",\n` +
    `  "scene": "emoji 2-3 ตัว",\n` +
    `  "goal": "เป้าหมาย 1 ประโยค",\n` +
    `  "reading": "เนื้อหา 3 ย่อหน้า เล่าสนุก ไม่เกิน 200 คำ",\n` +
    `  "mcq": [{"q":"คำถาม","c":["ก.","ข.","ค.","ง."],"a":0}],\n` +
    `  "written": [{"q":"คำถาม","hint":"คำใบ้"}]\n` +
    `}\n` +
    `mcq = 15 ข้อ (ง่าย 5, กลาง 5, ยาก 5) | written = 3 ข้อ (เข้าใจง่าย ตอบ 2-3 ประโยค)`;

  const raw = await callClaude(apiKey, tc.system, prompt, 3500);
  const parsed = safeParseJson(raw) || {};

  const part1 = {
    title: parsed.title || `${tc.subject} W${week}`,
    scene: parsed.scene || tc.icon,
    goal: parsed.goal || 'เรียนรู้พื้นฐาน',
    reading: parsed.reading || 'เนื้อหาบทเรียน',
  };

  const mcqArr = Array.isArray(parsed.mcq) && parsed.mcq.length >= 10
    ? parsed.mcq
    : Array.from({length:15},(_,i)=>({q:`คำถามข้อ ${i+1}`,c:['ก. ตัวเลือก 1','ข. ตัวเลือก 2','ค. ตัวเลือก 3','ง. ตัวเลือก 4'],a:0}));

  const writtenArr = Array.isArray(parsed.written) && parsed.written.length >= 2
    ? parsed.written
    : [
        {q:'บทเรียนนี้สอนเรื่องอะไร? บอกในแบบของตัวเอง',hint:'ดูจากหัวข้อและเนื้อหา'},
        {q:'ยกตัวอย่าง 1 อย่างที่เชื่อมกับชีวิตจริงของวอลนัท',hint:'คิดถึงสิ่งที่เจอในชีวิตประจำวัน'},
        {q:'ถ้าต้องบอกเพื่อนเรื่องนี้ จะพูดว่าอะไร?',hint:'ไม่มีผิดถูก พูดในแบบตัวเอง'},
      ];

  return {
    id: `${tc.subjectKey}-w${week}`,
    subject: tc.subject, teacher: tc.teacher, teacherId: tc.subjectKey,
    icon: tc.icon, bg: tc.bg, border: tc.border, badge: tc.badge,
    week, title: part1.title, scene: part1.scene||tc.icon,
    goal: part1.goal, reading: part1.reading,
    missionBrief: part1.missionBrief||part1.goal||'',
    mcq: mcqArr, written: writtenArr,
    generatedAt: new Date().toISOString(),
    generatedBy: 'weekly-agent',
  };
}

export const maxDuration = 60; // Vercel max timeout (seconds)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Security: ตรวจ cron secret หรือ manual trigger
  const secret = process.env.CRON_SECRET || '';
  const authHeader = req.headers['authorization'] || '';
  const isManual = req.method === 'POST' && req.body?.manual === true;
  const isCron = secret && authHeader === `Bearer ${secret}`;

  // ถ้าไม่มี CRON_SECRET set ไว้ ให้ manual trigger ผ่านได้เสมอ
  if (!isManual && !isCron && secret !== '') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const apiKey = process.env.CLAUDE_API_KEY;
  const redisUrl = process.env.KV_REST_API_URL;
  const redisToken = process.env.KV_REST_API_TOKEN;

  if (!apiKey || !redisUrl || !redisToken) {
    return res.status(500).json({ error: 'Missing env vars' });
  }

  const h = { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' };

  // คำนวณสัปดาห์ถัดไป
  const today = new Date();
  const dayOfMonth = today.getDate();
  const currentWeek = Math.min(4, Math.ceil(dayOfMonth / 7));
  const targetWeek = req.body?.week || Math.min(4, currentWeek + 1);

  // ดึงข้อมูลจาก Redis
  let cloudData = {};
  try {
    const r = await fetch(`${redisUrl}/get/walnut:data`, { headers: h });
    const d = await r.json();
    cloudData = d.result ? JSON.parse(d.result) : {};
  } catch(e) {}

  // ตรวจว่ามี curriculum สำหรับ week นี้แล้วหรือยัง
  const existingKey = `walnut_curriculum_w${targetWeek}`;
  if (cloudData[existingKey] && !req.body?.force) {
    return res.status(200).json({
      ok: true, skipped: true,
      message: `มี curriculum สำหรับ W${targetWeek} อยู่แล้ว ใช้ force:true เพื่อ generate ใหม่`
    });
  }

  // อ่าน interview data
  const interviewAnalysis = cloudData.walnut_intake_analysis || {};
  const interviewSummary = interviewAnalysis.rose
    ? `ข้อมูลวอลนัท: ${interviewAnalysis.rose.slice(0,300)}`
    : 'วอลนัท อายุ 8 ขวบ ป.4 ชอบสิ่งสนุก อยากเรียนแบบ mission';

  // อ่านผลสัปดาห์ที่แล้ว
  const prevResults = {};
  TEACHER_CONFIG.forEach(tc => {
    const key = `hw_${tc.subjectKey}-w${currentWeek}`;
    if (cloudData[key]) {
      try {
        const hw = typeof cloudData[key] === 'string' ? JSON.parse(cloudData[key]) : cloudData[key];
        if (hw.submitted) prevResults[tc.subjectKey] = {
          mcqScore: hw.mcqScore||0, mcqTotal: 15,
          writtenScore: hw.writtenScore||0, writtenTotal: 9,
          score: hw.score||0,
        };
      } catch(e) {}
    }
  });

  // Generate lessons ทีละวิชา
  const generatedLessons = [];
  const errors = [];
  const statusUpdates = [];

  for (const tc of TEACHER_CONFIG) {
    try {
      statusUpdates.push(`กำลัง generate ${tc.subject}...`);
      const lesson = await generateLesson(apiKey, tc, targetWeek, prevResults[tc.subjectKey], interviewSummary);
      generatedLessons.push(lesson);
      statusUpdates.push(`✅ ${tc.subject} เสร็จแล้ว`);
    } catch(e) {
      errors.push(`${tc.subject}: ${e.message}`);
      statusUpdates.push(`⚠️ ${tc.subject} failed: ${e.message}`);
    }
  }

  if (generatedLessons.length === 0) {
    return res.status(500).json({ error: 'Generate ไม่ได้เลย', errors });
  }

  // Save ไปที่ Redis
  const curriculum = {
    lessons: generatedLessons,
    week: targetWeek,
    createdAt: new Date().toISOString(),
    generatedBy: 'weekly-agent',
    prevResults,
  };

  const existing2 = await fetch(`${redisUrl}/get/walnut:data`, { headers: h })
    .then(r => r.json()).then(d => d.result ? JSON.parse(d.result) : {}).catch(() => ({}));
  const merged = Object.assign({}, existing2, { [existingKey]: JSON.stringify(curriculum) });
  await fetch(`${redisUrl}/pipeline`, {
    method: 'POST', headers: h,
    body: JSON.stringify([['set', 'walnut:data', JSON.stringify(merged)]]),
  });

  return res.status(200).json({
    ok: true,
    week: targetWeek,
    lessonsGenerated: generatedLessons.length,
    errors: errors.length ? errors : undefined,
    status: statusUpdates,
  });
}

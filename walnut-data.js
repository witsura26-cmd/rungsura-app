// ── TEAM DATA ────────────────────────────────────────────
// หลัก: [0-2], วิชาการ: [3-6], ดนตรี: [7-8]
const TEAM = [
  {id:"tangmo",  name:"Rose",   role:"หัวหน้าแผนก",        icon:"🌸", bg:"bg-pink-50",   border:"border-pink-200",   badge:"bg-pink-100 text-pink-700",
   desc:"รับ brief ประสานทีม สรุปรายงาน",
   prompt:"คุณคือ Rose หัวหน้าแผนก Walnut Learning ของ RungSura อบอุ่น มีระเบียบ รักเด็ก วอลนัท 8 ขวบ ป.4 ร้องเพลง 3 ปี อยู่วง Last Minute Band เปียโนเกือบ 2 ปี ตอบภาษาไทย"},
  {id:"dr-aim",  name:"Dr.Aim",   role:"นักวิเคราะห์วิชาการ", icon:"📊", bg:"bg-blue-50",   border:"border-blue-200",   badge:"bg-blue-100 text-blue-700",
   desc:"วิเคราะห์ผลเทส หา learning gap",
   prompt:"คุณคือ Dr.Aim นักวิเคราะห์วิชาการเด็ก เฉียบ ข้อมูลแน่น พูดตรงจุด เชี่ยวชาญพัฒนาการ ป.3-5 วอลนัทสูตรคูณท่องได้แต่ใช้ปัญหาไม่เป็น ตอบภาษาไทย"},
  {id:"ploy",    name:"Ploy",     role:"นักพัฒนาศักยภาพ",     icon:"🌱", bg:"bg-green-50",  border:"border-green-200",  badge:"bg-green-100 text-green-700",
   desc:"ประเมิน mood วอลนัท ป้องกัน burnout",
   prompt:"คุณคือ Ploy นักพัฒนาศักยภาพเด็ก อ่อนโยน เข้าใจจิตใจเด็ก วอลนัทต้องการกำลังใจไม่ใช่ความกดดัน ตอบภาษาไทย นุ่มนวล"},
  {id:"kru-nim", name:"ครูนิ่ม",  role:"ครูภาษาไทย",          icon:"✍️", bg:"bg-yellow-50", border:"border-yellow-200", badge:"bg-yellow-100 text-yellow-700",
   desc:"เนี้ยบทุกคำ เน้นอ่านจับใจความ",
   prompt:"คุณคือครูนิ่ม ครูภาษาไทยที่เนี้ยบที่สุด สอนวอลนัท ป.4 เน้นอ่านจับใจความ มาตราตัวสะกด ตอบภาษาไทยสละสลวย"},
  {id:"kru-o",   name:"ครูโอ๋",   role:"ครูคณิตศาสตร์",       icon:"🎮", bg:"bg-orange-50", border:"border-orange-200", badge:"bg-orange-100 text-orange-700",
   desc:"ใจดี ทริคเยอะ สอนผ่านเกม",
   prompt:"คุณคือครูโอ๋ ครูเลขที่ขี้เล่น ใจดี มีทริค เลขคือเกม วอลนัทสูตรคูณท่องได้แต่ใช้โจทย์ปัญหาไม่เป็น ตอบภาษาไทยสนุก"},
  {id:"kru-kai", name:"ครูไก่",   role:"ครูวิทยาศาสตร์",      icon:"🔭", bg:"bg-cyan-50",   border:"border-cyan-200",   badge:"bg-cyan-100 text-cyan-700",
   desc:"ความรู้กว้าง เปิดโลก ทดลองบ้านได้",
   prompt:"คุณคือครูไก่ ครูวิทย์ที่ตื่นเต้นกับทุกอย่าง ชอบตั้งคำถาม สอนผ่านเรื่องเล่าและทดลอง ตอบภาษาไทยสนุก"},
  {id:"kru-jen", name:"ครูเจน",   role:"ครูภาษาอังกฤษ",       icon:"🇬🇧", bg:"bg-indigo-50", border:"border-indigo-200", badge:"bg-indigo-100 text-indigo-700",
   desc:"สนุกกับภาษา Communication first ไม่กลัวผิด",
   prompt:"คุณคือครูเจน ครูภาษาอังกฤษที่สนุกและ passionate สอนวอลนัท 8 ขวบ ป.4 เน้น am/is/are simple present daily vocabulary ตอบภาษาไทย-อังกฤษผสม ให้กำลังใจสูงมาก ไม่กลัวผิด"},
  {id:"kru-mint",name:"ครูมิ้นท์", role:"ครูร้องเพลง",         icon:"🎤", bg:"bg-rose-50",   border:"border-rose-200",   badge:"bg-rose-100 text-rose-700",
   desc:"passionate ทุกสาย อยากให้วอลนัทเป็นศิลปิน",
   prompt:"คุณคือครูมิ้นท์ ครูร้องเพลง passionate มาก วอลนัทร้องเพลง 3 ปี อยู่วง Last Minute Band กำลังพัฒนา chest voice เพลง: L.O.V.E รักคือ Golden บรรยากาศ กำลังเพิ่ม Bad Romance ตอบภาษาไทย"},
  {id:"kru-big", name:"ครูบิ๊ก",  role:"ครูเปียโน",           icon:"🎹", bg:"bg-violet-50", border:"border-violet-200", badge:"bg-violet-100 text-violet-700",
   desc:"แม่นทฤษฎี เข้าใจเด็ก",
   prompt:"คุณคือครูบิ๊ก ครูเปียโนที่แม่นทฤษฎี ใจเย็น วอลนัทเรียนเปียโนเกือบ 2 ปี interval 5th อ่านโน้ตยังไม่แม่น ตอบภาษาไทย"},
];

// ── LESSON DATA — W3 (เนื้อหาจะถูก generate จาก AI ตาม interview วอลนัท) ───
const LESSONS = [
  {id:"thai-w3", subject:"ภาษาไทย",   teacher:"ครูนิ่ม",  teacherId:"kru-nim",  icon:"✍️",
   bg:"bg-yellow-50", border:"border-yellow-200", badge:"bg-yellow-100 text-yellow-700",
   week:3, title:"รอเนื้อหาจากทีมครู", goal:"", rationale:"", reading:"",
   plan:[{w:1,t:"W1"},{w:2,t:"W2"},{w:3,t:"W3"},{w:4,t:"W4"}], mcq:[], written:[]},

  {id:"math-w3", subject:"คณิตศาสตร์", teacher:"ครูโอ๋",   teacherId:"kru-o",    icon:"🎮",
   bg:"bg-orange-50", border:"border-orange-200", badge:"bg-orange-100 text-orange-700",
   week:3, title:"รอเนื้อหาจากทีมครู", goal:"", rationale:"", reading:"",
   plan:[{w:1,t:"W1"},{w:2,t:"W2"},{w:3,t:"W3"},{w:4,t:"W4"}], mcq:[], written:[]},

  {id:"sci-w3",  subject:"วิทยาศาสตร์", teacher:"ครูไก่",   teacherId:"kru-kai",  icon:"🔭",
   bg:"bg-cyan-50",   border:"border-cyan-200",   badge:"bg-cyan-100 text-cyan-700",
   week:3, title:"รอเนื้อหาจากทีมครู", goal:"", rationale:"", reading:"",
   plan:[{w:1,t:"W1"},{w:2,t:"W2"},{w:3,t:"W3"},{w:4,t:"W4"}], mcq:[], written:[]},

  {id:"sing-w3", subject:"ร้องเพลง",   teacher:"ครูมิ้นท์", teacherId:"kru-mint", icon:"🎤",
   bg:"bg-rose-50",   border:"border-rose-200",   badge:"bg-rose-100 text-rose-700",
   week:3, title:"รอเนื้อหาจากทีมครู", goal:"", rationale:"", reading:"",
   plan:[{w:1,t:"W1"},{w:2,t:"W2"},{w:3,t:"W3"},{w:4,t:"W4"}], mcq:[], written:[]},

  {id:"piano-w3", subject:"เปียโน",    teacher:"ครูบิ๊ก",  teacherId:"kru-big",  icon:"🎹",
   bg:"bg-violet-50", border:"border-violet-200", badge:"bg-violet-100 text-violet-700",
   week:3, title:"รอเนื้อหาจากทีมครู", goal:"", rationale:"", reading:"",
   plan:[{w:1,t:"W1"},{w:2,t:"W2"},{w:3,t:"W3"},{w:4,t:"W4"}], mcq:[], written:[]},

  {id:"eng-w3",  subject:"ภาษาอังกฤษ", teacher:"ครูเจน",   teacherId:"kru-jen",  icon:"🇬🇧",
   bg:"bg-indigo-50", border:"border-indigo-200", badge:"bg-indigo-100 text-indigo-700",
   week:3, title:"รอเนื้อหาจากทีมครู", goal:"", rationale:"", reading:"",
   plan:[{w:1,t:"W1"},{w:2,t:"W2"},{w:3,t:"W3"},{w:4,t:"W4"}], mcq:[], written:[]},
];

// ── DEFAULT SCHOOL SCHEDULE ───────────────────────────────
const DEFAULT_SCHEDULE = {
  mon:["ภาษาไทย","คณิตศาสตร์","วิทยาศาสตร์","สังคม","ดนตรี"],
  tue:["ภาษาอังกฤษ","คณิตศาสตร์","ภาษาไทย","ศิลปะ","พลศึกษา"],
  wed:["คณิตศาสตร์","วิทยาศาสตร์","ภาษาอังกฤษ","ภาษาไทย","สุขศึกษา"],
  thu:["ภาษาไทย","สังคม","คณิตศาสตร์","วิทยาศาสตร์","ภาษาอังกฤษ"],
  fri:["คณิตศาสตร์","ภาษาไทย","ภาษาอังกฤษ","ดนตรี","พลศึกษา"],
};

// ── SHARED CONSTANTS ─────────────────────────────────────
const RETAKE_THRESHOLD = 60; // % — ต่ำกว่านี้แนะนำทำใหม่

// ══════════════════════════════════════════════════════════
//  WALNUT LESSON FULL-PAGE EXPERIENCE
//  Full page per lesson — MCQ ทีละข้อ + XP + rich reading
// ══════════════════════════════════════════════════════════

var currentHwLesson=null;
var hwSection="reading";   // reading | mcq | written | result
var hwMcqIndex=0;
var hwMcqAnswers=[];
var hwMcqFeedback=null;    // {correct:bool, chosen:int}
var hwXP=0;
var hwWrittenAnswers=[];

// ── Open / Close ──────────────────────────────────────────
function openHw(lessonId){
  var l=LESSONS.find(function(x){return x.id===lessonId;});
  if(!l){alert("ไม่พบบทเรียน");return;}
  currentHwLesson=l;
  var st=getHwState(l.id);
  if(st.submitted){
    hwSection="result";
    hwXP=st.xp||0;  // restore XP ที่เซฟไว้
  } else {
    hwSection="reading";
    hwMcqIndex=0;
    hwXP=0;
    hwMcqFeedback=null;
    hwMcqAnswers=new Array(l.mcq.length).fill(null);
    hwWrittenAnswers=st.writtenAnswers||new Array(l.written.length).fill("");
  }
  renderLessonFullPage();
  document.getElementById("lesson-fullpage").classList.remove("hidden");
  window.scrollTo(0,0);
}

function closeHw(){
  document.getElementById("lesson-fullpage").classList.add("hidden");
  currentHwLesson=null;
}

// ── Main Render ───────────────────────────────────────────
function renderLessonFullPage(){
  var l=currentHwLesson; if(!l) return;
  var fp=document.getElementById("lesson-fullpage"); if(!fp) return;

  var totalQ=(l.mcq&&l.mcq.length)||0;
  var answered=hwMcqAnswers.filter(function(a){return a!==null;}).length;

  // Header
  var hdr='<div class="sticky top-0 z-10 bg-gray-950 border-b border-gray-800 px-4 py-3 flex items-center gap-3">'+
    '<button onclick="closeHw()" class="text-gray-400 hover:text-white text-2xl leading-none w-8">←</button>'+
    '<div class="flex items-center gap-2 flex-1 min-w-0">'+
      '<span class="text-xl">'+l.icon+'</span>'+
      '<div class="min-w-0">'+
        '<div class="font-bold text-white text-sm truncate">'+l.subject+' — W'+l.week+'</div>'+
        '<div class="text-xs text-gray-400 truncate">'+l.teacher+'</div>'+
      '</div>'+
    '</div>'+
    (hwSection==="mcq"?'<div class="text-amber-400 font-black text-sm">⭐ '+hwXP+' XP</div>':'')+
  '</div>';

  // Section tabs
  var tabs='<div class="flex bg-gray-900 border-b border-gray-800">'+
    [['reading','📖 อ่าน'],['mcq','🎮 '+(totalQ||15)+' ด่าน'],['written','✍️ เขียน']].map(function(t){
      var active=hwSection===t[0];
      var st2=getHwState(l.id);
      var done=(t[0]==="result")||(t[0]==="mcq"&&answered>0)||(t[0]==="written"&&hwWrittenAnswers.some(function(a){return a;}));
      return '<button onclick="lpGoSection(\''+t[0]+'\')" '+
        'class="flex-1 py-3 text-xs font-bold transition-colors '+
        (active?"text-amber-400 border-b-2 border-amber-400":"text-gray-500 hover:text-gray-300")+'">'+ t[1]+'</button>';
    }).join("")+
  '</div>';

  // Body
  var body="";
  if(hwSection==="reading") body=renderLFPReading(l);
  else if(hwSection==="mcq") body=renderLFPMcq(l);
  else if(hwSection==="written") body=renderLFPWritten(l);
  else if(hwSection==="result") body=renderLFPResult(l,getHwState(l.id));

  fp.innerHTML=hdr+tabs+'<div id="lfp-body">'+body+'</div>';
}

function lpGoSection(s){
  hwSection=s;
  if(s==="mcq"&&hwMcqFeedback){hwMcqFeedback=null;}
  renderLessonFullPage();
  var fp=document.getElementById("lesson-fullpage");
  if(fp) fp.scrollTo(0,0);
}

// ── Section: Reading ─────────────────────────────────────
function renderLFPReading(l){
  var scene=l.scene||l.icon+"✨";
  var paragraphs=(l.reading||"เนื้อหากำลังโหลด...").split(/\n\n+/);

  return '<div class="max-w-2xl mx-auto pb-8">'+
    // Scene banner
    '<div class="bg-gradient-to-b from-gray-800 to-gray-900 px-6 py-8 text-center">'+
      '<div class="text-5xl mb-3 tracking-widest">'+scene+'</div>'+
      '<div class="text-xl font-black text-white mb-2">'+l.title+'</div>'+
      (l.missionBrief?'<div class="text-sm text-gray-300 italic leading-relaxed max-w-sm mx-auto">'+l.missionBrief+'</div>':'')+
      '<div class="mt-3 inline-block bg-amber-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">🎯 '+l.goal+'</div>'+
    '</div>'+
    // Reading content
    '<div class="px-5 py-6 space-y-5">'+
      paragraphs.map(function(p,i){
        if(!p.trim()) return "";
        // ย่อหน้าแรกใส่ drop cap style
        var pClass="text-gray-200 text-base leading-relaxed";
        if(i===0) pClass="text-white text-base leading-relaxed font-medium";
        return '<p class="'+pClass+'">'+p.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")+'</p>';
      }).join("")+
    '</div>'+
    // Key info box ถ้ามี
    getLessonKeyBox(l)+
    // Rationale
    (l.rationale?'<div class="mx-5 bg-blue-900/40 border border-blue-700/50 rounded-2xl p-4 mb-4">'+
      '<div class="flex items-start gap-2">'+
        '<span class="text-blue-400 text-sm">🌸</span>'+
        '<div><div class="text-xs font-bold text-blue-300 mb-1">Rose + ทีมครูเลือกเนื้อหานี้เพราะ</div>'+
        '<div class="text-xs text-blue-200 leading-relaxed">'+l.rationale+'</div></div>'+
      '</div></div>':"")+
    // CTA
    '<div class="px-5 pb-4">'+
      '<button onclick="lpGoSection(\'mcq\')" '+
        'class="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-gray-900 rounded-2xl font-black text-lg shadow-lg shadow-amber-900/30 transition-all">'+
        '🎮 เริ่มทำด่าน '+(l.mcq&&l.mcq.length||15)+' ข้อ →'+
      '</button>'+
    '</div>'+
  '</div>';
}

// ── Key Info Box (subject-specific) ──────────────────────
function getLessonKeyBox(l){
  var id=l.id||"";
  if(!id.startsWith("thai")&&!id.startsWith("math")&&!id.startsWith("sci")&&
     !id.startsWith("sing")&&!id.startsWith("piano")&&!id.startsWith("eng")) return "";
  // Dynamic box based on subject
  var subj=l.subject||"";
  var items=[];
  if(subj==="ภาษาไทย") items=[["📖","อ่านจับใจความ","จับ ใจความหลัก + ใจความสนับสนุน"],["✍️","คำศัพท์","หาคำยาก แล้วเดาจากบริบท"],["💡","หลักภาษา","สังเกตชนิดของคำ"]];
  else if(subj==="คณิตศาสตร์") items=[["🔢","ขั้นตอน","อ่านโจทย์ → หาสิ่งที่โจทย์ถาม → เลือกวิธี"],["✏️","คำนวณ","แสดงวิธีทำเสมอ"],["✅","ตรวจ","ตรวจสอบว่าคำตอบสมเหตุสมผล"]];
  else if(subj==="วิทยาศาสตร์") items=[["🔬","สังเกต","มองหาหลักการที่ซ่อนอยู่ในเนื้อหา"],["🧪","ทดลอง","นึกภาพถ้าทำจริงจะเกิดอะไร"],["💡","สรุป","เชื่อมกับชีวิตประจำวัน"]];
  else if(subj==="ร้องเพลง") items=[["🎤","เสียง","สังเกตการใช้ Chest/Head Voice"],["🌬️","ลมหายใจ","Breath control = เสียงสม่ำเสมอ"],["🎵","จังหวะ","นับ beat ก่อนร้องเสมอ"]];
  else if(subj==="เปียโน") items=[["🎹","โน้ต","อ่านทีละบรรทัด ช้าๆ ก่อน"],["✋","มือ","ฝึกมือเดียวก่อนสองมือ"],["👂","ฟัง","ฟังตัวเองเล่นแล้วปรับ"]];
  else if(subj==="ภาษาอังกฤษ") items=[["👁","อ่าน","อ่าน 2 รอบ รอบแรกดูภาพรวม"],["🔤","คำศัพท์","เดาจาก context ก่อนเปิดพจนานุกรม"],["✍️","ไวยากรณ์","สังเกต tense ที่ใช้"]];
  if(!items.length) return "";
  return '<div class="mx-5 mb-5 bg-gray-800 border border-gray-700 rounded-2xl p-4">'+
    '<div class="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">💡 เคล็ดลับก่อนทำแบบทดสอบ</div>'+
    '<div class="grid grid-cols-3 gap-2">'+
    items.map(function(it){
      return '<div class="bg-gray-700/50 rounded-xl p-3 text-center">'+
        '<div class="text-2xl mb-1">'+it[0]+'</div>'+
        '<div class="text-xs font-bold text-white">'+it[1]+'</div>'+
        '<div class="text-xs text-gray-400 mt-0.5 leading-tight">'+it[2]+'</div>'+
      '</div>';
    }).join("")+
    '</div></div>';
}

// ── Section: MCQ (ทีละข้อ) ────────────────────────────────
function renderLFPMcq(l){
  var q=l.mcq&&l.mcq[hwMcqIndex];
  if(!q){
    // เสร็จทุกข้อแล้ว
    return '<div class="max-w-lg mx-auto px-5 py-8 text-center">'+
      '<div class="text-6xl mb-4">🎉</div>'+
      '<div class="text-2xl font-black text-white mb-2">ครบ '+(l.mcq&&l.mcq.length)+'  ด่านแล้ว!</div>'+
      '<div class="text-amber-400 font-bold text-xl mb-6">⭐ '+hwXP+' XP</div>'+
      '<button onclick="lpGoSection(\'written\')" class="w-full py-4 bg-gradient-to-r from-green-400 to-teal-400 text-gray-900 rounded-2xl font-black text-lg">✍️ ไปข้อเขียน →</button>'+
    '</div>';
  }
  var total=l.mcq.length;
  var pct=Math.round((hwMcqIndex/total)*100);
  var answered=hwMcqAnswers.filter(function(a){return a!==null;}).length;
  var colors=["from-blue-500 to-indigo-600","from-purple-500 to-pink-600","from-orange-500 to-amber-600","from-green-500 to-teal-600"];
  var prefixes=["ก.","ข.","ค.","ง."];

  return '<div class="max-w-lg mx-auto pb-8">'+
    // Progress
    '<div class="px-5 py-4">'+
      '<div class="flex items-center justify-between mb-2">'+
        '<span class="text-xs text-gray-400 font-semibold">ด่าน '+(hwMcqIndex+1)+' / '+total+'</span>'+
        '<span class="text-xs text-amber-400 font-bold">⭐ '+hwXP+' XP</span>'+
      '</div>'+
      '<div class="bg-gray-800 rounded-full h-2">'+
        '<div class="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all" style="width:'+pct+'%"></div>'+
      '</div>'+
    '</div>'+
    // Question card
    '<div class="mx-5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-6 mb-5 shadow-xl">'+
      '<div class="text-xs font-bold text-amber-400 mb-3 uppercase tracking-widest">🎮 ด่านที่ '+(hwMcqIndex+1)+'</div>'+
      '<div class="text-white text-lg font-bold leading-snug">'+q.q+'</div>'+
    '</div>'+
    // Feedback (ถ้ามี)
    (hwMcqFeedback?
      '<div class="mx-5 mb-4 p-4 rounded-2xl '+(hwMcqFeedback.correct?'bg-green-900/50 border border-green-600':'bg-red-900/50 border border-red-600')+'">'+
        '<div class="font-black text-lg '+(hwMcqFeedback.correct?'text-green-400':'text-red-400')+'">'+
          (hwMcqFeedback.correct?'⭐ ถูกต้อง! +10 XP':'❌ ยังไม่ถูก — เฉลยคือ')+
        '</div>'+
        (!hwMcqFeedback.correct?'<div class="text-white font-semibold mt-1">'+q.c[q.a]+'</div>':'')+
      '</div>':'')+
    // Choices
    '<div class="px-5 space-y-3 mb-6">'+
      q.c.map(function(c,ci){
        var chosen=hwMcqFeedback&&hwMcqFeedback.chosen===ci;
        var correct=hwMcqFeedback&&ci===q.a;
        var wrong=hwMcqFeedback&&chosen&&!correct;
        var base="w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-sm transition-all flex items-center gap-3 ";
        var style="";
        if(!hwMcqFeedback) style="bg-gray-800 border-gray-600 text-white hover:border-amber-400 hover:bg-gray-700";
        else if(correct) style="bg-green-800 border-green-500 text-green-200";
        else if(wrong) style="bg-red-800 border-red-500 text-red-200";
        else style="bg-gray-800/50 border-gray-700 text-gray-500";
        var onclick=hwMcqFeedback?"":"onclick=\"lpAnswerMcq("+ci+")\"";
        return '<button '+onclick+' '+(!hwMcqFeedback?'':'disabled')+' class="'+base+style+'">'+
          '<span class="w-8 h-8 flex-shrink-0 rounded-xl bg-gradient-to-br '+colors[ci]+' flex items-center justify-center text-white font-black text-sm">'+prefixes[ci]+'</span>'+
          '<span>'+c+'</span>'+
        '</button>';
      }).join("")+
    '</div>'+
    // Next button
    (hwMcqFeedback?
      '<div class="px-5">'+
        '<button onclick="lpNextMcq()" class="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 rounded-2xl font-black text-lg">'+
          (hwMcqIndex+1<total?'ด่านถัดไป →':'🎉 ครบทุกด่านแล้ว!')+
        '</button>'+
      '</div>':'')+
  '</div>';
}

function lpAnswerMcq(ci){
  var l=currentHwLesson; if(!l) return;
  var q=l.mcq[hwMcqIndex]; if(!q) return;
  hwMcqAnswers[hwMcqIndex]=ci;
  var correct=(ci===q.a);
  hwMcqFeedback={correct:correct,chosen:ci};
  if(correct) hwXP+=10; else hwXP+=2; // XP แม้ตอบผิด
  renderLessonFullPage();
  // scroll up to see feedback
  var fp=document.getElementById("lesson-fullpage");
  if(fp) fp.scrollTo({top:0,behavior:"smooth"});
}

function lpNextMcq(){
  hwMcqFeedback=null;
  hwMcqIndex++;
  renderLessonFullPage();
  var fp=document.getElementById("lesson-fullpage");
  if(fp) fp.scrollTo({top:0,behavior:"smooth"});
}

// ── Section: Written ─────────────────────────────────────
function renderLFPWritten(l){
  var mcqDone=hwMcqAnswers.filter(function(a){return a!==null;}).length;
  var mcqTotal=l.mcq&&l.mcq.length||0;

  return '<div class="max-w-2xl mx-auto pb-8">'+
    // Status bar
    '<div class="px-5 py-4 flex items-center justify-between bg-gray-900 border-b border-gray-800">'+
      '<div class="text-xs text-gray-400">MCQ: <span class="text-green-400 font-bold">'+mcqDone+'/'+mcqTotal+'</span> ตอบแล้ว</div>'+
      '<div class="text-amber-400 font-bold text-sm">⭐ '+hwXP+' XP</div>'+
    '</div>'+
    // Questions
    '<div class="px-5 py-5 space-y-6">'+
      l.written.map(function(q,i){
        var icons=["🧠","💡","🔍","🌟","💬"];
        return '<div class="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">'+
          // Question header
          '<div class="bg-gradient-to-r from-gray-800 to-gray-900 px-5 py-4">'+
            '<div class="flex items-start gap-3">'+
              '<div class="w-10 h-10 flex-shrink-0 bg-amber-500 rounded-xl flex items-center justify-center text-xl">'+icons[i]+'</div>'+
              '<div>'+
                '<div class="text-xs font-bold text-amber-400 mb-1">ข้อที่ '+(i+1)+' / '+l.written.length+'</div>'+
                '<div class="text-white font-semibold text-sm leading-snug">'+q.q+'</div>'+
              '</div>'+
            '</div>'+
            (q.hint?'<div class="mt-3 bg-gray-700/50 rounded-xl px-3 py-2 text-xs text-gray-300">💡 <em>'+q.hint+'</em></div>':'')+
          '</div>'+
          // Answer area
          '<div class="px-5 py-4">'+
            '<textarea rows="4" placeholder="เขียนคำตอบที่นี่... ไม่ต้องกังวล เขียนในแบบของตัวเองได้เลยค่ะ 😊" '+
              'data-wi="'+i+'" '+
              'oninput="hwWrittenAnswers['+i+']=this.value;updateWrittenCount('+i+',this)" '+
              'class="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 resize-none placeholder-gray-500 leading-relaxed">'+
              (hwWrittenAnswers[i]||"")+'</textarea>'+
            '<div class="flex items-center justify-between mt-1">'+
              '<span id="wc-'+i+'" class="text-xs text-gray-500">'+(hwWrittenAnswers[i]?hwWrittenAnswers[i].length:0)+' ตัวอักษร</span>'+
              '<span class="text-xs text-gray-600">เขียนยิ่งละเอียด ได้คะแนนยิ่งสูง ✍️</span>'+
            '</div>'+
          '</div>'+
        '</div>';
      }).join("")+
    '</div>'+
    // Submit button
    '<div class="px-5 pb-4" id="hw-submit-bar">'+
      '<div class="bg-gray-800 border border-gray-700 rounded-2xl p-4 mb-4 text-xs text-gray-400">'+
        '<div class="font-bold text-white mb-1">📋 ก่อนส่ง ตรวจสอบ:</div>'+
        '<div>• MCQ ตอบแล้ว <span class="text-green-400 font-bold">'+mcqDone+'/'+mcqTotal+'</span> ข้อ</div>'+
        '<div>• ข้อเขียนตอบแล้ว <span id="written-done-count" class="text-amber-400 font-bold">'+hwWrittenAnswers.filter(function(a){return a&&a.trim();}).length+'</span>/'+l.written.length+' ข้อ</div>'+
      '</div>'+
      '<button id="hw-submit" onclick="submitHw()" '+
        'class="w-full py-4 bg-gradient-to-r from-green-400 to-teal-500 text-gray-900 rounded-2xl font-black text-lg shadow-lg shadow-green-900/30">'+
        '🚀 ส่งการบ้านและรับผล →'+
      '</button>'+
    '</div>'+
  '</div>';
}

function updateWrittenCount(i,el){
  hwWrittenAnswers[i]=el.value;
  // ── บันทึก draft ทันทีทุกครั้งที่พิมพ์ ──
  if(currentHwLesson){
    var draftSt=getHwState(currentHwLesson.id);
    if(!draftSt.submitted){
      draftSt.writtenAnswers=hwWrittenAnswers.slice();
      saveHwState(currentHwLesson.id,draftSt);
    }
  }
  var wc=document.getElementById("wc-"+i);
  if(wc) wc.textContent=el.value.length+" ตัวอักษร";
  var dc=document.getElementById("written-done-count");
  if(dc) dc.textContent=hwWrittenAnswers.filter(function(a){return a&&a.trim();}).length;
}

// ── Section: Result ───────────────────────────────────────
function renderLFPResult(l,st){
  if(!st||!st.submitted) return '<div class="px-5 py-8 text-center text-gray-400">ยังไม่มีผล</div>';

  // MCQ review panel
  var mcqReview=l.mcq.map(function(q,i){
    var ua=st.mcqAnswers?st.mcqAnswers[i]:null;
    var ok=ua===q.a;
    var expl=st.mcqExplains?st.mcqExplains.find(function(e){return e.qi===i;}):null;
    return '<div class="border rounded-xl p-3 mb-2 '+
      (ok?"border-green-800 bg-green-900/30":"border-red-800 bg-red-900/30")+'">'+
      '<div class="text-xs font-semibold mb-1 '+(ok?"text-green-400":"text-red-400")+'">'+(ok?"✅":"❌")+' ข้อ '+(i+1)+': '+q.q+'</div>'+
      (ok?'<div class="text-xs text-green-300">'+q.c[q.a]+' ✓</div>':
        '<div class="space-y-1">'+
          '<div class="text-xs text-red-300">คุณตอบ: '+(ua!==null&&ua!==undefined?q.c[ua]:"(ไม่ได้ตอบ)")+'</div>'+
          '<div class="text-xs text-green-400 font-semibold">เฉลย: '+q.c[q.a]+'</div>'+
          (expl?'<div class="mt-1 bg-yellow-900/40 border border-yellow-700/50 rounded-lg p-2 text-xs text-yellow-300">💡 '+expl.explain+(expl.trick?'<br>🧠 '+expl.trick:'')+'</div>':
           '<button onclick="loadMcqExplain(\''+l.id+'\','+i+')" class="mt-1 text-xs text-indigo-400 hover:text-indigo-300 underline">💡 ขอคำอธิบาย</button>')+
        '</div>')+
    '</div>';
  }).join("");

  return '<div class="max-w-2xl mx-auto pb-8">'+
    renderScoreHero(l,st)+
    '<div class="flex bg-gray-900 border-b border-gray-800 sticky top-0 z-10">'+
      [['mcq-res','🔢 MCQ'],['written-res','✍️ เขียน'],['analysis-res','📊 วิเคราะห์']].map(function(t,i){
        return '<button onclick="lpResTab(\''+t[0]+'\')" data-rt="'+t[0]+'" '+
          'class="lp-rt flex-1 py-3 text-xs font-bold transition-colors '+
          (i===0?"text-amber-400 border-b-2 border-amber-400":"text-gray-500")+'">'+t[1]+'</button>';
      }).join("")+
    '</div>'+
    '<div id="lp-res-mcq-res" class="px-5 py-4">'+mcqReview+'</div>'+
    '<div id="lp-res-written-res" class="hidden">'+renderWrittenPanel(l,st)+'</div>'+
    '<div id="lp-res-analysis-res" class="hidden">'+renderAnalysisPanel(st)+'</div>'+
  '</div>';
}

function lpResTab(t){
  document.querySelectorAll(".lp-rt").forEach(function(el){
    el.className="lp-rt flex-1 py-3 text-xs font-bold transition-colors "+
      (el.dataset.rt===t?"text-amber-400 border-b-2 border-amber-400":"text-gray-500");
  });
  document.querySelectorAll('[id^="lp-res-"]').forEach(function(el){el.classList.add("hidden");});
  var p=document.getElementById("lp-res-"+t);
  if(p) p.classList.remove("hidden");
}

// ── MCQ explain (keep existing) ───────────────────────────
async function loadMcqExplain(lessonId,qi){
  var l=LESSONS.find(function(x){return x.id===lessonId;});
  var st=getHwState(lessonId);
  if(!l||!st.submitted) return;
  var q=l.mcq[qi];
  var btn=event.target;
  btn.textContent="⏳ กำลังโหลด..."; btn.disabled=true;
  try{
    var res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({max_tokens:300,
        system:"คุณคือ"+l.teacher+" อธิบายสั้นๆ สำหรับเด็ก 8 ขวบ ว่าทำไมคำตอบนี้ถูก มีทริคช่วยจำ ตอบ JSON: {\"explain\":\"...\",\"trick\":\"...\"}",
        messages:[{role:"user",content:"คำถาม: "+q.q+"\nเฉลย: "+q.c[q.a]}]})});
    var d=await res.json();
    var txt=typeof d.content==="string"?d.content:"";
    var m=txt.match(/\{[\s\S]*\}/);
    var expl=m?JSON.parse(m[0]):{explain:"คำตอบที่ถูกคือ "+q.c[q.a],trick:""};
    var explains=st.mcqExplains||[];
    explains=explains.filter(function(e){return e.qi!==qi;});
    explains.push({qi:qi,explain:expl.explain||"",trick:expl.trick||""});
    st.mcqExplains=explains;
    saveHwState(lessonId,st);
    // re-render result
    var body=document.getElementById("lfp-body");
    if(body) body.innerHTML=renderLFPResult(currentHwLesson,st);
  }catch(e){btn.textContent="❌ ลองใหม่"; btn.disabled=false;}
}

// ── Edit Written Only (ไม่รีเซ็ต MCQ) ───────────────────────
function editWrittenOnly(lessonId){
  var l=LESSONS.find(function(x){return x.id===lessonId;});
  var st=getHwState(lessonId);
  if(!l||!st.submitted) return;
  // โหลดคำตอบเดิมกลับมา (ถ้ามี)
  hwWrittenAnswers=st.writtenAnswers&&st.writtenAnswers.length?
    st.writtenAnswers.slice():
    new Array(l.written.length).fill("");
  // ล้าง written eval เพื่อให้ตรวจใหม่ แต่เก็บ MCQ ไว้
  st.writtenEvals=null; st.writtenRaw=null; st.writtenScore=null;
  st.writtenOverall=""; st.score=null;
  saveHwState(lessonId,st);
  // ไปหน้า written โดยตรง
  hwSection="written";
  renderLessonFullPage();
  var fp=document.getElementById("lesson-fullpage");
  if(fp) fp.scrollTo({top:0,behavior:"smooth"});
}

// ── Retake ────────────────────────────────────────────────
function retakeHw(lessonId){
  if(!confirm("ยืนยันทำใหม่?\n(ประวัติคะแนนเดิมจะถูกเก็บไว้ ทำใหม่ = ฝึกเพิ่ม 💪)")) return;
  var hw=getHwState(lessonId);
  if(hw.submitted){
    try{
      var histKey="hw_hist_"+lessonId;
      var hist=JSON.parse(localStorage.getItem(histKey)||"[]");
      hist.push({
        score:hw.score||0,mcqScore:hw.mcqScore||0,writtenScore:hw.writtenScore||0,
        submittedAt:hw.submittedAt||"",attemptNo:hist.length+1,
        passed:Math.round(((hw.score||0)/20)*100)>=RETAKE_THRESHOLD,
        drAimEval:hw.drAimEval||"",ployEval:hw.ployEval||""
      });
      localStorage.setItem(histKey,JSON.stringify(hist));
    }catch(e){}
  }
  var newCount=(hw.retakeCount||0)+1;
  localStorage.removeItem("hw_"+lessonId);
  saveHwState(lessonId,{retakeCount:newCount,retakedAt:new Date().toISOString()});
  if(typeof saveToCloud==="function") saveToCloud();
  var ts=getLocalTasks();
  var t=ts.find(function(x){return x.lessonId===lessonId;});
  if(t){t.status="pending";saveLocalTasks(ts);}
  // reset state
  hwSection="reading";
  hwMcqIndex=0; hwXP=0; hwMcqFeedback=null;
  hwMcqAnswers=new Array((currentHwLesson&&currentHwLesson.mcq&&currentHwLesson.mcq.length)||15).fill(null);
  hwWrittenAnswers=new Array((currentHwLesson&&currentHwLesson.written&&currentHwLesson.written.length)||5).fill("");
  renderLessonFullPage();
}

// ── Submit Homework (MCQ only — instant, no API) ──────────
function submitHw(){
  if(!currentHwLesson) return;
  var l=currentHwLesson;

  // 1. เก็บคำตอบวอลนัทก่อนเสมอ — collect จาก DOM ก่อน (ทันสมัยที่สุด)
  //    แล้ว fallback กับ hwWrittenAnswers ที่ save ไว้จาก oninput
  var domAnswers={};
  document.querySelectorAll("[data-wi]").forEach(function(el){
    var idx=+el.dataset.wi;
    if(el.value&&el.value.trim()) domAnswers[idx]=el.value;
  });
  for(var wi=0;wi<hwWrittenAnswers.length;wi++){
    if(domAnswers[wi]!==undefined) hwWrittenAnswers[wi]=domAnswers[wi];
    // ถ้า DOM ไม่มี ใช้ค่าที่ oninput save ไว้แล้วใน hwWrittenAnswers[wi]
  }

  // 2. MCQ auto-grade (sync)
  var mcqScore=0, wrongMcq=[];
  l.mcq.forEach(function(q,i){
    if(hwMcqAnswers[i]===q.a) mcqScore++;
    else wrongMcq.push({qi:i,q:q.q,userAns:hwMcqAnswers[i],correctAns:q.a,choices:q.c});
  });

  // 3. Save — answers preserved, written/analysis pending
  var st={
    submitted:true, lessonId:l.id,
    mcqAnswers:hwMcqAnswers.slice(),       // snapshot คำตอบ MCQ
    writtenAnswers:hwWrittenAnswers.slice(),// snapshot คำตอบเขียน
    mcqScore:mcqScore,
    writtenRaw:null,   // null = ยังไม่ตรวจ (ต่างจาก 0 = ตรวจแล้วได้ 0)
    writtenScore:null,
    writtenEvals:null,
    writtenOverall:"",
    mcqExplains:[],
    drAimEval:"", ployEval:"",
    score:null,
    submittedAt:new Date().toISOString()
  };
  saveHwState(l.id,st);
  if(typeof saveToCloud==="function") saveToCloud();
  if(typeof syncLessonTasks==="function") syncLessonTasks();
  hwXP+=Math.round((mcqScore/l.mcq.length)*50);
  st.xp=hwXP;  // เซฟ XP ลง state ด้วย
  saveHwState(l.id,st);  // save อีกรอบหลัง XP
  hwSection="result";
  renderLessonFullPage();
  var fp=document.getElementById("lesson-fullpage");
  if(fp) fp.scrollTo({top:0,behavior:"smooth"});
}

// ── Check Written (ปุ่มในแท็บ ✍️ เขียน) ─────────────────────
async function checkWritten(lessonId){
  var l=LESSONS.find(function(x){return x.id===lessonId;});
  var st=getHwState(lessonId);
  if(!l||!st.submitted) return;
  var btn=document.getElementById("btn-check-written");
  if(btn){btn.textContent="⏳ ครูกำลังตรวจ..."; btn.disabled=true;}
  try{
    // ตรวจทีละข้อ — ป้องกัน JSON ใหญ่เกินและตัด
    var evals=[];
    var overall="";
    var numQ=l.written.length;
    for(var qi=0;qi<numQ;qi++){
      if(btn) btn.textContent="⏳ ตรวจข้อ "+(qi+1)+"/"+numQ+"...";
      var ans=(st.writtenAnswers&&st.writtenAnswers[qi]&&st.writtenAnswers[qi].trim())||"(ไม่ได้เขียน — ให้ 0)";
      var sysQ="คุณคือ"+l.teacher+" ตรวจข้อเขียนวิชา"+l.subject+" ของวอลนัท 8 ขวบ ป.4\n"+
        "ให้คะแนน 0-10 พร้อม feedback สั้นๆ ตรงๆ และ model answer ถ้าคะแนน<8\n"+
        'ตอบ JSON บรรทัดเดียว ห้ามขึ้นบรรทัดใหม่ใน string: {"score":7,"feedback":"...","model":""}';
      var rQ=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({max_tokens:600,system:sysQ,
          messages:[{role:"user",content:"คำถาม: "+l.written[qi].q+"\nคำตอบ: "+ans}]})});
      if(!rQ.ok) throw new Error("HTTP "+rQ.status+" ข้อ "+(qi+1));
      var dQ=await rQ.json();
      var txtQ=(typeof dQ.content==="string"?dQ.content:"")
        .replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim();
      // clean newlines inside JSON strings before parse
      var cleaned=txtQ.replace(/:\s*"([^"]*)"/g,function(m,v){
        return ': "'+v.replace(/\n/g," ").replace(/\r/g,"")+'"';
      });
      var mQ=cleaned.match(/\{[\s\S]*?\}/);
      var ev={score:0,feedback:"ตรวจไม่ได้",model:""};
      if(mQ){try{ev=JSON.parse(mQ[0]);}catch(pe){
        // พยายาม extract score อย่างน้อย
        var sc=cleaned.match(/"score"\s*:\s*(\d+)/);
        if(sc) ev.score=+sc[1];
        var fb=cleaned.match(/"feedback"\s*:\s*"([^"]+)"/);
        if(fb) ev.feedback=fb[1];
      }}
      evals.push({score:ev.score||0,feedback:ev.feedback||"",model:ev.model||""});
    }
    // overall summary (cheap call)
    try{
      if(btn) btn.textContent="⏳ สรุปภาพรวม...";
      var sumTxt=evals.map(function(e,i){return "ข้อ"+(i+1)+": "+e.score+"/10 — "+e.feedback;}).join(" | ");
      var rO=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({max_tokens:300,
          system:"ครู"+l.teacher+" สรุปภาพรวมข้อเขียนวิชา"+l.subject+" ของวอลนัท ป.4 เป็นภาษาไทย 2-3 ประโยค ตรงๆ",
          messages:[{role:"user",content:sumTxt}]})});
      var dO=await rO.json();
      overall=typeof dO.content==="string"?dO.content:"";
    }catch(e2){overall="";}

    st.writtenEvals=evals;
    st.writtenOverall=overall;
    st.writtenRaw=evals.reduce(function(a,e){return a+(e.score||0);},0);
    // ข้อเขียนข้อละ 3 คะแนน: AI ให้ 0-9 → หาร 3 = 0-3 ต่อข้อ
    st.writtenScore=evals.reduce(function(a,e){return a+Math.round((e.score||0)/3);},0);
    var maxScore=(currentHwLesson?currentHwLesson.mcq.length:15)+(evals.length*3);
    st.maxScore=maxScore;
    st.score=(st.mcqScore||0)+st.writtenScore;
    // เพิ่ม XP จากข้อเขียน: ข้อละ 5 XP × คะแนน (0-3)
    var writtenXP=evals.reduce(function(a,e){return a+Math.round((e.score||0)/3)*5;},0);
    hwXP=(st.xp||hwXP)+writtenXP;
    st.xp=hwXP;
    saveHwState(lessonId,st);
    if(typeof saveToCloud==="function") saveToCloud();
    var panel=document.getElementById("lp-res-written-res");
    if(panel) panel.innerHTML=renderWrittenPanel(l,st);
    var hero=document.getElementById("lp-score-hero");
    if(hero) hero.outerHTML=renderScoreHero(l,st);
  }catch(e){
    if(btn){btn.textContent="❌ ลองใหม่"; btn.disabled=false;}
    var errEl=document.getElementById("written-check-error");
    if(errEl) errEl.textContent="⚠️ "+e.message;
  }
}

// ── Run Analysis (ปุ่มในแท็บ 📊 วิเคราะห์) ─────────────────
async function runAnalysis(lessonId){
  var l=LESSONS.find(function(x){return x.id===lessonId;});
  var st=getHwState(lessonId);
  if(!l||!st.submitted) return;
  var btn=document.getElementById("btn-run-analysis");
  if(btn){btn.textContent="⏳ Dr.Aim + Ploy กำลังวิเคราะห์..."; btn.disabled=true;}
  try{
    var ws2=st.writtenEvals?st.writtenEvals.reduce(function(a,e){return a+Math.round((e.score||0)/3);},0):0;
    var mx2=l.mcq.length+(l.written?l.written.length:0)*3;
    var tot2=(st.mcqScore||0)+(st.writtenEvals?ws2:0);
    var pct2=Math.round(tot2/mx2*100);
    var ctx="วิชา: "+l.subject+" เรื่อง: "+l.title+"\n"+
      "MCQ: "+(st.mcqScore||0)+"/"+l.mcq.length+
      " | เขียน: "+(st.writtenEvals?ws2:"?")+"/"+(l.written?l.written.length:0)*3+(st.writtenEvals?"":" (ยังไม่ตรวจ)")+
      " | รวม: "+tot2+"/"+mx2+" ("+pct2+"%)";
    var [rA,rP]=await Promise.all([
      fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({max_tokens:900,
          system:"คุณคือ Dr.Aim นักวิเคราะห์วิชาการ วิเคราะห์ผลการบ้านวอลนัท ภาษาไทย ตรงไปตรงมา",
          messages:[{role:"user",content:ctx}]})}),
      fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({max_tokens:700,
          system:"คุณคือ Ploy นักพัฒนาศักยภาพเด็ก ประเมิน mindset motivation ของวอลนัท ภาษาไทย อ่อนโยน",
          messages:[{role:"user",content:ctx}]})})
    ]);
    if(!rA.ok||!rP.ok) throw new Error("HTTP error");
    var dA=await rA.json(); var dPl=await rP.json();
    st.drAimEval=typeof dA.content==="string"?dA.content:"";
    st.ployEval=typeof dPl.content==="string"?dPl.content:"";
    saveHwState(lessonId,st);
    if(typeof saveToCloud==="function") saveToCloud();
    // re-render analysis tab only
    var panel=document.getElementById("lp-res-analysis-res");
    if(panel) panel.innerHTML=renderAnalysisPanel(st);
  }catch(e){
    if(btn){btn.textContent="❌ ลองใหม่"; btn.disabled=false;}
    var errEl=document.getElementById("analysis-error");
    if(errEl) errEl.textContent="⚠️ "+e.message;
  }
}

// ── Render helpers (per-panel) ────────────────────────────
function renderScoreHero(l,st){
  var writtenChecked=(st.writtenRaw!==null&&st.writtenRaw!==undefined);
  // ข้อเขียนข้อละ 3 คะแนน (AI 0-9 → หาร 3)
  var writtenScore=writtenChecked
    ?(st.writtenEvals
        ?st.writtenEvals.reduce(function(a,e){return a+Math.round((e.score||0)/3);},0)
        :Math.round((st.writtenRaw||0)/3))
    :null;
  var maxMcq=l.mcq.length;
  var maxWritten=(l.written?l.written.length:0)*3;
  var maxScore=maxMcq+maxWritten;  // เช่น 15+15=30
  var total=writtenChecked?((st.mcqScore||0)+writtenScore):null;
  var pct=total!==null?Math.round(total/maxScore*100):null;
  var needRetake=pct!==null&&pct<RETAKE_THRESHOLD;
  var em=pct===null?"⏳":pct>=80?"🏆":pct>=60?"🌟":"💪";
  var grade=pct===null?"?":pct>=80?"A":pct>=70?"B":pct>=60?"C":"D";
  return '<div id="lp-score-hero" class="bg-gradient-to-b from-gray-800 to-gray-900 px-6 py-8 text-center border-b border-gray-800">'+
    '<div class="text-6xl mb-3">'+em+'</div>'+
    '<div class="text-5xl font-black text-white mb-1">'+(total!==null?total+"/"+maxScore:"?/"+maxScore)+'</div>'+
    '<div class="text-2xl font-bold text-amber-400 mb-3">Grade '+grade+(pct!==null?" · "+pct+"%":"")+'</div>'+
    '<div class="grid grid-cols-3 gap-3 max-w-sm mx-auto">'+
      '<div class="bg-gray-800 rounded-xl p-3 text-center"><div class="font-black text-amber-400 text-xl">'+(st.mcqScore||0)+'</div><div class="text-xs text-gray-400">MCQ /'+maxMcq+'</div></div>'+
      '<div class="bg-gray-800 rounded-xl p-3 text-center"><div class="font-black text-blue-400 text-xl">'+(writtenChecked?(writtenScore||0):'?')+'</div><div class="text-xs text-gray-400">เขียน /'+maxWritten+'</div></div>'+
      '<div class="bg-gray-800 rounded-xl p-3 text-center"><div class="font-black text-purple-400 text-xl">'+(st.xp||hwXP||0)+'</div><div class="text-xs text-gray-400">⭐ XP</div></div>'+
    '</div>'+
    (needRetake?
      '<div class="mt-4 bg-red-900/50 border border-red-700 rounded-2xl p-4">'+
        '<div class="text-red-400 font-bold mb-2">⚠️ ต่ำกว่า '+RETAKE_THRESHOLD+'% — ลองใหม่นะ</div>'+
        '<button onclick="retakeHw(\''+l.id+'\')" class="bg-red-500 hover:bg-red-400 text-white px-6 py-2.5 rounded-xl font-black">🔄 ทำใหม่</button>'+
      '</div>':
      pct!==null?
        '<div class="mt-4 bg-green-900/30 border border-green-700/50 rounded-2xl p-3 text-green-400 font-semibold">✅ ผ่านเกณฑ์ 🎉</div>':
        '<div class="mt-4 bg-yellow-900/30 border border-yellow-700/50 rounded-2xl p-3 text-yellow-400 text-sm">⏳ รอตรวจข้อเขียนก่อนถึงจะรู้ผลสุดท้าย</div>')+
  '</div>';
}

function renderWrittenPanel(l,st){
  var checked=(st.writtenEvals&&st.writtenEvals.length>0);
  // ตรวจว่าคำตอบหายหรือเปล่า
  var hasAnswers=st.writtenAnswers&&st.writtenAnswers.some(function(a){return a&&a.trim();});
  if(!checked){
    return '<div class="px-5 py-6 space-y-3">'+
      (!hasAnswers?
        // ── คำตอบหาย → แสดงแจ้งเตือน + ปุ่มพิมพ์ใหม่ ──
        '<div class="bg-red-900/40 border border-red-700/60 rounded-2xl p-4 text-center mb-2">'+
          '<div class="text-red-400 font-bold mb-1">⚠️ ไม่พบคำตอบข้อเขียน</div>'+
          '<div class="text-xs text-gray-400">กดปุ่มด้านล่างเพื่อพิมพ์คำตอบใหม่ MCQ ที่ทำไว้จะยังคงอยู่</div>'+
        '</div>':
        // ── มีคำตอบ → แสดงปกติ ──
        '<div class="text-gray-400 text-sm text-center mb-2">คำตอบวอลนัทถูกบันทึกแล้ว — รอครูตรวจ</div>'+
        l.written.map(function(q,i){
          return '<div class="border border-gray-700 rounded-xl p-3 mb-2">'+
            '<div class="text-xs text-gray-500 mb-1">ข้อ '+(i+1)+': '+q.q+'</div>'+
            '<div class="text-sm text-gray-300 bg-gray-800 rounded-lg p-2">'+
              (st.writtenAnswers[i]&&st.writtenAnswers[i].trim()||'<span class="text-gray-500">(ไม่ได้เขียน)</span>')+
            '</div>'+
          '</div>';
        }).join("")
      )+
      '<div id="written-check-error" class="text-red-400 text-xs min-h-[1rem]"></div>'+
      // ── ปุ่มพิมพ์ใหม่ (ไม่รีเซ็ต MCQ) ──
      '<button onclick="editWrittenOnly(\''+l.id+'\')" '+
        'class="w-full py-3 border border-gray-600 text-gray-300 rounded-2xl font-bold text-sm mb-2">'+
        '✏️ '+(hasAnswers?'แก้คำตอบข้อเขียน':'พิมพ์คำตอบใหม่')+' (MCQ ยังอยู่)'+
      '</button>'+
      (hasAnswers?
        '<button id="btn-check-written" onclick="checkWritten(\''+l.id+'\')" '+
          'class="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-black text-base">'+
          '✍️ ให้ครูตรวจข้อเขียน'+
        '</button>':"")+
    '</div>';
  }
  // มีผลแล้ว
  return '<div class="px-5 py-4">'+
    l.written.map(function(q,i){
      var ev=st.writtenEvals[i]||{score:0,feedback:""};
      var s=ev.score||0;
      var col=s>=8?"text-green-400":s>=5?"text-amber-400":"text-red-400";
      return '<div class="border border-gray-700 rounded-xl p-4 mb-3 bg-gray-900">'+
        '<div class="flex items-center justify-between mb-2">'+
          '<div class="text-sm font-bold text-white">ข้อ '+(i+1)+'</div>'+
          '<div class="font-black '+col+'">'+s+'/10</div>'+
        '</div>'+
        '<div class="text-xs text-gray-400 mb-2 italic">'+q.q+'</div>'+
        '<div class="bg-gray-800 rounded-lg p-2 mb-2 text-xs text-gray-300">'+
          ((st.writtenAnswers&&st.writtenAnswers[i])||"(ไม่ได้ตอบ)")+
        '</div>'+
        '<div class="text-xs '+col+'"><strong>ครูวิจารณ์: </strong>'+ev.feedback+'</div>'+
        (ev.model&&s<8?'<div class="mt-2 bg-blue-900/30 border border-blue-700/50 rounded-lg p-2 text-xs text-blue-300"><strong>📝 แนวคำตอบที่ดี: </strong>'+ev.model+'</div>':'')+
      '</div>';
    }).join("")+
    (st.writtenOverall?'<div class="bg-indigo-900/30 border border-indigo-700/50 rounded-2xl p-3 text-sm text-indigo-300 mt-2"><strong>ภาพรวม: </strong>'+st.writtenOverall+'</div>':"")+
    '<button onclick="checkWritten(\''+l.id+'\')" class="mt-3 w-full py-2 border border-gray-600 text-gray-400 rounded-xl text-xs hover:border-gray-400">🔄 ตรวจใหม่</button>'+
  '</div>';
}

function renderAnalysisPanel(st){
  var hasDrAim=st.drAimEval&&st.drAimEval.trim();
  var hasPloy=st.ployEval&&st.ployEval.trim();
  if(!hasDrAim&&!hasPloy){
    return '<div class="px-5 py-6 text-center space-y-3">'+
      '<div class="text-gray-400 text-sm mb-4">กด วิเคราะห์ เพื่อให้ Dr.Aim + Ploy ประเมินผล</div>'+
      '<div id="analysis-error" class="text-red-400 text-xs min-h-[1rem]"></div>'+
      '<button id="btn-run-analysis" onclick="runAnalysis(\''+((typeof currentHwLesson!=="undefined"&&currentHwLesson)?currentHwLesson.id:'')+'\')" '+
        'class="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black text-base">'+
        '📊 วิเคราะห์ผล (Dr.Aim + Ploy)'+
      '</button>'+
    '</div>';
  }
  return '<div class="px-5 py-4 space-y-4">'+
    '<div class="bg-blue-900/30 border border-blue-700/50 rounded-2xl p-4">'+
      '<div class="flex items-center gap-2 mb-2"><span>📊</span><strong class="text-sm text-blue-300">Dr.Aim วิเคราะห์</strong></div>'+
      '<div class="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">'+(hasDrAim?st.drAimEval:'<span class="text-gray-500">ยังไม่มีข้อมูล</span>')+'</div>'+
    '</div>'+
    '<div class="bg-green-900/30 border border-green-700/50 rounded-2xl p-4">'+
      '<div class="flex items-center gap-2 mb-2"><span>🌱</span><strong class="text-sm text-green-300">Ploy</strong></div>'+
      '<div class="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">'+(hasPloy?st.ployEval:'<span class="text-gray-500">ยังไม่มีข้อมูล</span>')+'</div>'+
    '</div>'+
    '<button id="btn-run-analysis" onclick="runAnalysis(\''+((typeof currentHwLesson!=="undefined"&&currentHwLesson)?currentHwLesson.id:'')+'\')'+
      '" class="w-full py-2 border border-gray-600 text-gray-400 rounded-xl text-xs hover:border-gray-400">🔄 วิเคราะห์ใหม่</button>'+
  '</div>';
}

// ── Helper: getHwState / saveHwState ─────────────────────
function getHwState(lessonId){
  try{return JSON.parse(localStorage.getItem("hw_"+lessonId)||"{}");}catch(e){return {};}
}
function saveHwState(lessonId,state){
  try{localStorage.setItem("hw_"+lessonId,JSON.stringify(state));}catch(e){}
}
function collectHwData(){
  var data={};
  for(var i=0;i<localStorage.length;i++){
    var k=localStorage.key(i); if(!k) continue;
    if(k.startsWith("hw_hist_")){
      try{data[k]=JSON.parse(localStorage.getItem(k));}catch(e){}
    } else if(k.startsWith("hw_")){
      try{
        var full=JSON.parse(localStorage.getItem(k));
        if(!full) continue;
        if(full.submitted) data[k]=full;
        else if(full.retakeCount) data[k]={retakeCount:full.retakeCount,retakedAt:full.retakedAt||""};
      }catch(e){}
    }
  }
  try{var evts=localStorage.getItem("walnut_events");if(evts)data["walnut_events"]=JSON.parse(evts);}catch(e){}
  return data;
}
function saveToCloud(){
  try{
    fetch("/api/sync",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(collectHwData())});
  }catch(e){}
}

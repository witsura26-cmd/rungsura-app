// ══════════════════════════════════════════════════════════
//  WALNUT LESSON FULL-PAGE EXPERIENCE
//  Full page per lesson — MCQ ทีละข้อ + XP + rich reading
// ══════════════════════════════════════════════════════════

var currentHwLesson=null;
var hwSection="reading";   // reading | mcq | written | result
var hwMcqIndex=0;
var hwMcqAnswers=[];
var hwMcqFeedback=null;    // kept for compat (unused in batch mode)
var hwMcqGraded=false;     // true = batch grading done, show results
var hwXP=0;
var hwWrittenAnswers=[];
// ── Written interactive state ─────────────────────────────
var hwMatchSelState={};  // {qi: selectedLeftIdx | -1}
var hwMatchShuffles={};  // {qi: shuffledRightIndices[]}

// ── Written helpers ───────────────────────────────────────
function seededShuffle(arr,seed){
  var a=arr.slice();
  for(var i=a.length-1;i>0;i--){
    var j=Math.abs((seed*1664525+i*1013904223)^(i<<3))%(i+1);
    var t=a[i];a[i]=a[j];a[j]=t;
  }
  return a;
}
function getFillData(qi){
  try{var s=JSON.parse(hwWrittenAnswers[qi]||"{}");if(s.t==="fill")return s;}catch(e){}
  return {t:"fill",filled:[]};
}
function getMatchData(qi){
  try{var s=JSON.parse(hwWrittenAnswers[qi]||"{}");if(s.t==="match")return s;}catch(e){}
  return {t:"match",pairs:{}};
}
function autoSaveWritten(){
  if(currentHwLesson){
    var draftSt=getHwState(currentHwLesson.id);
    if(!draftSt.submitted){draftSt.writtenAnswers=hwWrittenAnswers.slice();saveHwState(currentHwLesson.id,draftSt);}
  }
}
function reRenderWritten(){
  var body=document.getElementById("lfp-body");
  if(body&&currentHwLesson&&hwSection==="written") body.innerHTML=renderLFPWritten(currentHwLesson);
}

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
    hwMcqGraded=false;
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
  // ถ้าเก็บดาวแล้ว ห้ามกลับไปแก้ MCQ/เขียน
  if(currentHwLesson&&getHwState(currentHwLesson.id).starsCollected&&(s==="written"||s==="mcq")){
    hwSection="result"; renderLessonFullPage(); return;
  }
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
     !id.startsWith("sing")&&!id.startsWith("piano")&&!id.startsWith("eng")&&
     !id.startsWith("guitar")) return "";
  // Dynamic box based on subject
  var subj=l.subject||"";
  var items=[];
  if(subj==="ภาษาไทย") items=[["📖","อ่านจับใจความ","จับ ใจความหลัก + ใจความสนับสนุน"],["✍️","คำศัพท์","หาคำยาก แล้วเดาจากบริบท"],["💡","หลักภาษา","สังเกตชนิดของคำ"]];
  else if(subj==="คณิตศาสตร์") items=[["🔢","ขั้นตอน","อ่านโจทย์ → หาสิ่งที่โจทย์ถาม → เลือกวิธี"],["✏️","คำนวณ","แสดงวิธีทำเสมอ"],["✅","ตรวจ","ตรวจสอบว่าคำตอบสมเหตุสมผล"]];
  else if(subj==="วิทยาศาสตร์") items=[["🔬","สังเกต","มองหาหลักการที่ซ่อนอยู่ในเนื้อหา"],["🧪","ทดลอง","นึกภาพถ้าทำจริงจะเกิดอะไร"],["💡","สรุป","เชื่อมกับชีวิตประจำวัน"]];
  else if(subj==="ร้องเพลง") items=[["🎤","เสียง","สังเกตการใช้ Chest/Head Voice"],["🌬️","ลมหายใจ","Breath control = เสียงสม่ำเสมอ"],["🎵","จังหวะ","นับ beat ก่อนร้องเสมอ"]];
  else if(subj==="เปียโน") items=[["🎹","โน้ต","อ่านทีละบรรทัด ช้าๆ ก่อน"],["✋","มือ","ฝึกมือเดียวก่อนสองมือ"],["👂","ฟัง","ฟังตัวเองเล่นแล้วปรับ"]];
  else if(subj==="ภาษาอังกฤษ") items=[["👁","อ่าน","อ่าน 2 รอบ รอบแรกดูภาพรวม"],["🔤","คำศัพท์","เดาจาก context ก่อนเปิดพจนานุกรม"],["✍️","ไวยากรณ์","สังเกต tense ที่ใช้"]];
  else if(subj==="กีต้า") items=[["🎸","ส่วนประกอบ","จำชื่อแต่ละส่วนและหน้าที่"],["🤏","ท่าทาง","จับปิ๊กและท่านั่งถูกวิธีก่อนเล่น"],["🎵","คอร์ด","กดให้นิ้วตั้ง กดให้ชัด ฟังเสียง"]];
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

// ── Section: MCQ (batch-grade mode) ──────────────────────
function buildMcqNavigator(l){
  var total=l.mcq.length;
  var bubbles=l.mcq.map(function(qq,i){
    var answered=hwMcqAnswers[i]!==null;
    var isCurrent=i===hwMcqIndex;
    var cls;
    if(hwMcqGraded){
      var ok=hwMcqAnswers[i]===qq.a;
      cls=(ok?"bg-green-500 text-white":"bg-red-500 text-white");
      if(isCurrent) cls+=" ring-2 ring-white ring-offset-1 ring-offset-gray-950";
    } else {
      if(isCurrent) cls="bg-amber-400 text-gray-900 font-black scale-110";
      else if(answered) cls="bg-blue-500 text-white";
      else cls="bg-gray-700 text-gray-500";
    }
    return '<button onclick="hwMcqIndex='+i+';renderLessonFullPage()" '+
      'class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all '+cls+'">'+
      (i+1)+
    '</button>';
  }).join("");
  return '<div class="bg-gray-900/80 border-b border-gray-800 px-3 py-2.5">'+
    '<div class="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">'+bubbles+'</div>'+
  '</div>';
}

function renderLFPMcq(l){
  var total=l.mcq.length;
  var answered=hwMcqAnswers.filter(function(a){return a!==null;}).length;
  var allAnswered=answered===total;
  var colors=["from-blue-500 to-indigo-600","from-purple-500 to-pink-600","from-orange-500 to-amber-600","from-green-500 to-teal-600"];
  var prefixes=["ก.","ข.","ค.","ง."];
  var nav=buildMcqNavigator(l);

  // ── Graded results view ──────────────────────────────────
  if(hwMcqGraded){
    var q=l.mcq[hwMcqIndex];
    var userAns=hwMcqAnswers[hwMcqIndex];
    var correct=(userAns===q.a);
    var mcqScore=l.mcq.filter(function(qq,i){return hwMcqAnswers[i]===qq.a;}).length;
    var prevBtn=hwMcqIndex>0?'<button onclick="hwMcqIndex--;renderLessonFullPage()" class="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold text-sm">← ก่อน</button>':'<div class="flex-1"></div>';
    var nextBtn=hwMcqIndex<total-1?
      '<button onclick="hwMcqIndex++;renderLessonFullPage()" class="flex-1 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-xl font-bold text-sm">ถัดไป →</button>':
      '<button onclick="lpGoSection(\'written\')" class="flex-1 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-gray-900 rounded-xl font-black text-sm">✍️ ไปข้อเขียน</button>';

    return '<div class="max-w-lg mx-auto pb-6">'+
      nav+
      // สรุป score
      '<div class="px-5 py-3 flex items-center justify-between bg-gray-900 border-b border-gray-800">'+
        '<div class="text-sm font-bold text-gray-300">ข้อ '+(hwMcqIndex+1)+'/'+total+'</div>'+
        '<div class="text-sm font-black '+(correct?'text-green-400':'text-red-400')+'">'+(correct?'✅ ถูก':'❌ ผิด')+'</div>'+
        '<div class="bg-amber-900/50 border border-amber-700/50 rounded-lg px-3 py-1 text-amber-400 font-black text-sm">⭐ '+mcqScore+'/'+total+'</div>'+
      '</div>'+
      // คำถาม
      '<div class="mx-5 mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border '+(correct?'border-green-700/60':'border-red-700/60')+' rounded-3xl p-5 mb-4 shadow-xl">'+
        '<div class="text-xs font-bold '+(correct?'text-green-400':'text-red-400')+' mb-2 uppercase tracking-widest">ข้อที่ '+(hwMcqIndex+1)+'</div>'+
        '<div class="text-white text-base font-bold leading-snug">'+q.q+'</div>'+
      '</div>'+
      // ตัวเลือก + เฉลย
      '<div class="px-5 space-y-2 mb-5">'+
        q.c.map(function(c,ci){
          var isCorrect=(ci===q.a);
          var wasChosen=(userAns===ci);
          var wrongChosen=(wasChosen&&!isCorrect);
          var style=isCorrect?'bg-green-800/70 border-green-500 text-green-200':
            wrongChosen?'bg-red-800/70 border-red-500 text-red-200':
            'bg-gray-800/40 border-gray-700/50 text-gray-500';
          return '<div class="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 '+style+'">'+
            '<span class="w-7 h-7 flex-shrink-0 rounded-xl bg-gradient-to-br '+colors[ci]+' flex items-center justify-center text-white font-black text-xs">'+prefixes[ci]+'</span>'+
            '<span class="text-sm font-medium flex-1">'+c+'</span>'+
            (isCorrect?'<span class="text-green-400 font-black text-xs">✓ เฉลย</span>':'')+
            (wrongChosen?'<span class="text-red-400 font-black text-xs">← เลือก</span>':'')+
          '</div>';
        }).join("")+
      '</div>'+
      '<div class="px-5 flex gap-3">'+prevBtn+nextBtn+'</div>'+
    '</div>';
  }

  // ── Normal answering mode ────────────────────────────────
  var q=l.mcq[hwMcqIndex];
  if(!q) return '<div class="px-5 py-8 text-center text-gray-400">ไม่มีข้อคำถาม</div>';

  var choiceList=q.c.map(function(c,ci){
    var chosen=(hwMcqAnswers[hwMcqIndex]===ci);
    var style=chosen?'bg-blue-700/80 border-blue-400 text-white':
      'bg-gray-800 border-gray-600 text-white hover:border-amber-400 hover:bg-gray-700';
    return '<button onclick="lpAnswerMcq('+ci+')" '+
      'class="w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold text-sm transition-all flex items-center gap-3 '+style+'">'+
      '<span class="w-8 h-8 flex-shrink-0 rounded-xl bg-gradient-to-br '+colors[ci]+' flex items-center justify-center text-white font-black text-sm">'+prefixes[ci]+'</span>'+
      '<span class="flex-1">'+c+'</span>'+
      (chosen?'<span class="text-blue-300 text-lg">✓</span>':'')+
    '</button>';
  }).join("");

  // bottom bar
  var bottomBar;
  if(allAnswered){
    bottomBar='<div class="px-5 pb-6">'+
      '<div class="bg-green-900/30 border border-green-700/50 rounded-2xl p-3 mb-3 text-center text-green-400 text-sm font-bold">✅ ตอบครบ '+total+' ข้อแล้ว!</div>'+
      '<button onclick="lpGradeMcq()" '+
        'class="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 rounded-2xl font-black text-lg shadow-lg shadow-amber-900/30">'+
        '🎯 ตรวจคำตอบทีเดียวเลย! →'+
      '</button>'+
    '</div>';
  } else {
    // find next unanswered after current
    var nextUnanswered=-1;
    for(var ni=hwMcqIndex+1;ni<total;ni++){if(hwMcqAnswers[ni]===null){nextUnanswered=ni;break;}}
    if(nextUnanswered===-1){for(var ni2=0;ni2<hwMcqIndex;ni2++){if(hwMcqAnswers[ni2]===null){nextUnanswered=ni2;break;}}}
    var prevBtn2=hwMcqIndex>0?
      '<button onclick="hwMcqIndex--;renderLessonFullPage()" class="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold text-sm">← ก่อน</button>':
      '<div class="flex-1"></div>';
    var nextBtn2=nextUnanswered!==-1?
      '<button onclick="hwMcqIndex='+nextUnanswered+';renderLessonFullPage()" class="flex-1 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-xl font-bold text-sm">ข้อต่อไป →</button>':
      (hwMcqIndex<total-1?
        '<button onclick="hwMcqIndex++;renderLessonFullPage()" class="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold text-sm">ข้อต่อไป →</button>':
        '<div class="flex-1"></div>');
    bottomBar='<div class="px-5 pb-6 flex gap-3">'+prevBtn2+nextBtn2+'</div>';
  }

  return '<div class="max-w-lg mx-auto pb-4">'+
    nav+
    '<div class="px-5 pt-3 pb-2 flex items-center justify-between">'+
      '<span class="text-xs text-gray-400 font-semibold">ข้อที่ '+(hwMcqIndex+1)+' / '+total+'</span>'+
      '<span class="text-xs text-blue-400 font-bold">ตอบแล้ว '+answered+'/'+total+'</span>'+
    '</div>'+
    '<div class="bg-gray-800 mx-5 rounded-full h-1.5 mb-4">'+
      '<div class="bg-gradient-to-r from-blue-400 to-indigo-400 h-1.5 rounded-full transition-all" style="width:'+Math.round(answered/total*100)+'%"></div>'+
    '</div>'+
    '<div class="mx-5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-6 mb-5 shadow-xl">'+
      '<div class="text-xs font-bold text-amber-400 mb-3 uppercase tracking-widest">ข้อที่ '+(hwMcqIndex+1)+'</div>'+
      '<div class="text-white text-lg font-bold leading-snug">'+q.q+'</div>'+
    '</div>'+
    '<div class="px-5 space-y-3 mb-4">'+choiceList+'</div>'+
    bottomBar+
  '</div>';
}

function lpAnswerMcq(ci){
  var l=currentHwLesson; if(!l) return;
  if(hwMcqGraded) return; // ตรวจแล้วเปลี่ยนไม่ได้
  hwMcqAnswers[hwMcqIndex]=ci;
  // auto-advance to next unanswered
  var total=l.mcq.length;
  var nextIdx=-1;
  for(var i=hwMcqIndex+1;i<total;i++){if(hwMcqAnswers[i]===null){nextIdx=i;break;}}
  if(nextIdx===-1){for(var i2=0;i2<hwMcqIndex;i2++){if(hwMcqAnswers[i2]===null){nextIdx=i2;break;}}}
  if(nextIdx!==-1) hwMcqIndex=nextIdx;
  renderLessonFullPage();
  var fp=document.getElementById("lesson-fullpage");
  if(fp) fp.scrollTo({top:0,behavior:"smooth"});
}

function lpGradeMcq(){
  var l=currentHwLesson; if(!l) return;
  hwMcqGraded=true;
  hwMcqIndex=0;
  var mcqScore=l.mcq.filter(function(q,i){return hwMcqAnswers[i]===q.a;}).length;
  hwXP=mcqScore*10;
  renderLessonFullPage();
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
  // ถ้าเก็บดาวแล้ว → read-only mode ห้ามแก้ไข
  var stDone=getHwState(l.id);
  if(stDone.starsCollected){
    return '<div class="max-w-2xl mx-auto px-5 py-12 text-center">'+
      '<div class="text-6xl mb-4">✅</div>'+
      '<div class="text-white font-black text-xl mb-2">เสร็จเรียบร้อยแล้ว!</div>'+
      '<div class="text-gray-400 text-sm mb-6">วอลนัทเก็บดาวไปแล้ว ไม่สามารถแก้ไขคำตอบได้อีก</div>'+
      '<button onclick="lpGoSection(\'result\')" '+
        'class="bg-amber-400 hover:bg-amber-300 text-gray-900 font-black px-8 py-3 rounded-2xl text-base">'+
        'ดูผลลัพธ์ →'+
      '</button>'+
    '</div>';
  }
  var mcqDone=hwMcqAnswers.filter(function(a){return a!==null;}).length;
  var mcqTotal=l.mcq&&l.mcq.length||0;
  var mcqGradedLabel=hwMcqGraded?' ✅':' (ยังไม่ตรวจ)';
  var totalQ=l.written.length;

  // Count answered (handles all types)
  var doneCount=l.written.filter(function(q,i){
    if(q.type==="fill"){var d=getFillData(i);return (d.filled||[]).some(Boolean);}
    if(q.type==="match"){var d=getMatchData(i);return Object.keys(d.pairs||{}).length>0;}
    return hwWrittenAnswers[i]&&hwWrittenAnswers[i].trim&&hwWrittenAnswers[i].trim();
  }).length;

  return '<div class="max-w-2xl mx-auto pb-8">'+
    '<div class="px-5 py-4 flex items-center justify-between bg-gray-900 border-b border-gray-800">'+
      '<div class="text-xs text-gray-400">MCQ: <span class="text-green-400 font-bold">'+mcqDone+'/'+mcqTotal+'</span> ตอบแล้ว</div>'+
      '<div class="text-amber-400 font-bold text-sm">⭐ '+(typeof getStarTotal==="function"?getStarTotal():0)+' ดาวสะสม</div>'+
    '</div>'+
    '<div class="px-5 py-5 space-y-6">'+
      l.written.map(function(q,i){
        if(q.type==="fill") return renderFillQ(q,i,totalQ);
        if(q.type==="match") return renderMatchQ(q,i,totalQ);
        return renderOpenQ(q,i,totalQ);
      }).join("")+
    '</div>'+
    '<div class="px-5 pb-4" id="hw-submit-bar">'+
      '<div class="bg-gray-800 border border-gray-700 rounded-2xl p-4 mb-4 text-xs text-gray-400">'+
        '<div class="font-bold text-white mb-1">📋 ก่อนส่ง ตรวจสอบ:</div>'+
        '<div>• MCQ ตอบแล้ว <span class="text-green-400 font-bold">'+mcqDone+'/'+mcqTotal+'</span>'+mcqGradedLabel+'</div>'+
        '<div>• แบบฝึกหัดทำแล้ว <span id="written-done-count" class="text-amber-400 font-bold">'+doneCount+'</span>/'+totalQ+' ข้อ</div>'+
      '</div>'+
      '<button id="hw-submit" onclick="submitHw()" '+
        'class="w-full py-4 bg-gradient-to-r from-green-400 to-teal-500 text-gray-900 rounded-2xl font-black text-lg shadow-lg shadow-green-900/30">'+
        '🚀 ส่งการบ้านและรับผล →'+
      '</button>'+
    '</div>'+
  '</div>';
}

// ── Question type renderers ───────────────────────────────
function renderOpenQ(q,i,totalQ){
  var icons=["🧠","💡","🔍","🌟","💬","🎯","✏️"];
  var ans=(typeof hwWrittenAnswers[i]==="string"&&!hwWrittenAnswers[i].startsWith('{"t":'))?hwWrittenAnswers[i]:"";
  return '<div class="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">'+
    '<div class="bg-gradient-to-r from-gray-800 to-gray-900 px-5 py-4">'+
      '<div class="flex items-start gap-3">'+
        '<div class="w-10 h-10 flex-shrink-0 bg-amber-500 rounded-xl flex items-center justify-center text-xl">'+icons[i%icons.length]+'</div>'+
        '<div>'+
          '<div class="text-xs font-bold text-amber-400 mb-1">ข้อที่ '+(i+1)+' / '+totalQ+' — ตอบคำถาม ✍️</div>'+
          '<div class="text-white font-semibold text-sm leading-snug">'+q.q+'</div>'+
        '</div>'+
      '</div>'+
      (q.hint?'<div class="mt-3 bg-gray-700/50 rounded-xl px-3 py-2 text-xs text-gray-300">💡 <em>'+q.hint+'</em></div>':'')+
    '</div>'+
    '<div class="px-5 py-4">'+
      '<textarea rows="4" placeholder="เขียนคำตอบที่นี่..." '+
        'data-wi="'+i+'" '+
        'oninput="hwWrittenAnswers['+i+']=this.value;updateWrittenCount('+i+',this)" '+
        'class="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 resize-none placeholder-gray-500 leading-relaxed">'+
        ans+'</textarea>'+
      '<div class="flex items-center justify-between mt-1">'+
        '<span id="wc-'+i+'" class="text-xs text-gray-500">'+ans.length+' ตัวอักษร</span>'+
        '<span class="text-xs text-gray-600">เขียนยิ่งละเอียด ได้คะแนนยิ่งสูง ✍️</span>'+
      '</div>'+
    '</div>'+
  '</div>';
}

function renderFillQ(q,i,totalQ){
  var data=getFillData(i);
  var filled=(data.filled||[]).slice();
  var numBlanks=q.answers.length;
  while(filled.length<numBlanks) filled.push(null);
  var doneCount=filled.filter(Boolean).length;
  var usedWords=filled.filter(Boolean);

  // Build passage with interactive blanks
  var passageHtml=q.passage.replace(/__(\d+)__/g,function(m,n){
    var idx=parseInt(n);
    var word=filled[idx]||null;
    if(word){
      return '<button onclick="hwFillClear('+i+','+idx+')" '+
        'class="inline-flex items-center bg-blue-600 hover:bg-red-600/80 text-white text-xs font-bold px-2 py-0.5 rounded-lg mx-0.5 transition-colors">'+
        word+' ×</button>';
    }
    return '<span class="inline-block border-b-2 border-dashed border-amber-400 text-amber-300 text-xs font-bold px-3 min-w-[56px] text-center mx-0.5">('+idx+')</span>';
  });

  // Available words (not yet used)
  var availableWords=q.wordBank.filter(function(w){return usedWords.indexOf(w)===-1;});

  return '<div class="bg-gray-900 border border-blue-900/50 rounded-2xl overflow-hidden">'+
    '<div class="bg-gradient-to-r from-blue-950/60 to-gray-900 px-5 py-4">'+
      '<div class="flex items-start gap-3">'+
        '<div class="w-10 h-10 flex-shrink-0 bg-blue-500 rounded-xl flex items-center justify-center text-xl">📝</div>'+
        '<div>'+
          '<div class="text-xs font-bold text-blue-400 mb-1">ข้อที่ '+(i+1)+' / '+totalQ+' — เติมคำในช่องว่าง</div>'+
          '<div class="text-white font-semibold text-sm leading-snug">'+q.q+'</div>'+
        '</div>'+
      '</div>'+
      (q.hint?'<div class="mt-3 bg-gray-700/50 rounded-xl px-3 py-2 text-xs text-gray-300">💡 <em>'+q.hint+'</em></div>':'')+
    '</div>'+
    '<div class="px-5 py-4">'+
      '<div class="bg-gray-800/80 rounded-xl p-4 mb-3 text-sm text-white leading-loose">'+passageHtml+'</div>'+
      '<div class="text-xs text-gray-400 mb-3">เติมแล้ว <span class="text-blue-400 font-bold">'+doneCount+'/'+numBlanks+'</span> ช่อง  •  กดคำเพื่อเติม  •  กดช่องที่เติมแล้วเพื่อลบ</div>'+
      (availableWords.length>0?
        '<div class="flex flex-wrap gap-2">'+
          availableWords.map(function(w,wi){
            var origIdx=q.wordBank.indexOf(w);
            return '<button onclick="hwFillWordByIdx('+i+','+origIdx+')" '+
              'class="bg-gray-700 hover:bg-blue-600 text-white text-sm font-bold px-3 py-1.5 rounded-xl transition-colors border border-gray-600 hover:border-blue-500">'+w+'</button>';
          }).join("")+
        '</div>'
        :'<div class="text-xs text-green-400 font-bold">✅ ใส่คำครบแล้ว!</div>')+
    '</div>'+
  '</div>';
}

function renderMatchQ(q,i,totalQ){
  var data=getMatchData(i);
  var pairs=data.pairs||{};
  var selLeft=hwMatchSelState[i]!==undefined?hwMatchSelState[i]:-1;

  // Create shuffle once per session
  if(!hwMatchShuffles[i]){
    hwMatchShuffles[i]=seededShuffle(q.pairs.map(function(_,k){return k;}),i+7);
  }
  var shuffle=hwMatchShuffles[i];
  var matchedCount=Object.keys(pairs).length;
  var totalPairs=q.pairs.length;
  var paletteBg=["bg-blue-600","bg-green-600","bg-purple-600","bg-orange-600","bg-pink-600"];
  var paletteBrd=["border-blue-500","border-green-500","border-purple-500","border-orange-500","border-pink-500"];

  var leftHtml=q.pairs.map(function(pair,li){
    var isSel=selLeft===li;
    var isMatched=pairs[li]!==undefined;
    var ci=li%paletteBg.length;
    var cls=isSel
      ?"bg-amber-400 border-amber-400 text-gray-900 font-black"
      :isMatched
      ?paletteBg[ci]+" "+paletteBrd[ci]+" text-white font-bold"
      :"bg-gray-700 border-gray-600 text-white hover:bg-gray-600";
    return '<div onclick="hwMatchLeft('+i+','+li+')" '+
      'class="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer text-sm transition-all border '+cls+'">'+
      '<span class="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-xs font-black">'+(li+1)+'</span>'+
      '<span class="flex-1 leading-tight">'+pair.left+'</span>'+
      (isMatched?'<span class="text-xs opacity-70">✓</span>':'')+
    '</div>';
  }).join('');

  var rightHtml=shuffle.map(function(origIdx,di){
    var matchedByLeft=-1;
    Object.keys(pairs).forEach(function(k){if(pairs[k]===di)matchedByLeft=parseInt(k);});
    var isMatched=matchedByLeft!==-1;
    var ci=matchedByLeft%paletteBg.length;
    var isActive=selLeft!==-1&&!isMatched;
    var cls=isMatched
      ?paletteBg[ci]+" "+paletteBrd[ci]+" text-white font-bold"
      :isActive
      ?"bg-gray-700 border-amber-700/60 text-white hover:bg-amber-800/40 hover:border-amber-500"
      :"bg-gray-700 border-gray-600 text-gray-300";
    return '<div onclick="hwMatchRight('+i+','+di+')" '+
      'class="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-all border '+cls+'">'+
      '<span class="w-6 h-6 rounded-full bg-white/15 flex-shrink-0 flex items-center justify-center text-xs opacity-60">'+String.fromCharCode(65+di)+'</span>'+
      '<span class="flex-1 leading-tight">'+q.pairs[origIdx].right+'</span>'+
    '</div>';
  }).join('');

  return '<div class="bg-gray-900 border border-purple-900/50 rounded-2xl overflow-hidden">'+
    '<div class="bg-gradient-to-r from-purple-950/60 to-gray-900 px-5 py-4">'+
      '<div class="flex items-start gap-3">'+
        '<div class="w-10 h-10 flex-shrink-0 bg-purple-500 rounded-xl flex items-center justify-center text-xl">🔗</div>'+
        '<div>'+
          '<div class="text-xs font-bold text-purple-400 mb-1">ข้อที่ '+(i+1)+' / '+totalQ+' — จับคู่</div>'+
          '<div class="text-white font-semibold text-sm leading-snug">'+q.q+'</div>'+
        '</div>'+
      '</div>'+
      (q.hint?'<div class="mt-3 bg-gray-700/50 rounded-xl px-3 py-2 text-xs text-gray-300">💡 <em>'+q.hint+'</em></div>':'')+
    '</div>'+
    '<div class="px-4 py-4">'+
      '<div class="text-xs text-gray-400 mb-3">จับคู่แล้ว <span class="text-purple-400 font-bold">'+matchedCount+'/'+totalPairs+'</span> คู่'+(selLeft!==-1?' — เลือกด้านขวาเพื่อจับคู่ 👉':' — กดด้านซ้ายก่อน 👈')+'</div>'+
      '<div class="grid grid-cols-2 gap-2">'+
        '<div class="space-y-2">'+leftHtml+'</div>'+
        '<div class="space-y-2">'+rightHtml+'</div>'+
      '</div>'+
      (matchedCount===totalPairs?'<div class="mt-3 text-xs text-green-400 font-bold text-center">✅ จับคู่ครบแล้ว!</div>':'')+
    '</div>'+
  '</div>';
}

// ── Fill/Match interaction handlers ──────────────────────
function hwFillWordByIdx(qi,wordIdx){
  var q=currentHwLesson&&currentHwLesson.written[qi];
  if(!q||q.type!=="fill") return;
  var word=q.wordBank[wordIdx];
  var data=getFillData(qi);
  var filled=(data.filled||[]).slice();
  var numBlanks=q.answers.length;
  while(filled.length<numBlanks) filled.push(null);
  for(var i=0;i<numBlanks;i++){if(!filled[i]){filled[i]=word;break;}}
  hwWrittenAnswers[qi]=JSON.stringify({t:"fill",filled:filled});
  autoSaveWritten();
  reRenderWritten();
}
function hwFillClear(qi,blankIdx){
  var data=getFillData(qi);
  var filled=(data.filled||[]).slice();
  var q=currentHwLesson&&currentHwLesson.written[qi];
  var numBlanks=(q&&q.answers)?q.answers.length:filled.length;
  while(filled.length<=blankIdx) filled.push(null);
  filled[blankIdx]=null;
  hwWrittenAnswers[qi]=JSON.stringify({t:"fill",filled:filled});
  autoSaveWritten();
  reRenderWritten();
}
function hwMatchLeft(qi,li){
  if(hwMatchSelState[qi]===li) hwMatchSelState[qi]=-1;
  else hwMatchSelState[qi]=li;
  reRenderWritten();
}
function hwMatchRight(qi,ri){
  var li=hwMatchSelState[qi];
  if(li===undefined||li===-1) return;
  var data=getMatchData(qi);
  var pairs=Object.assign({},data.pairs||{});
  // Remove existing match for this right slot
  Object.keys(pairs).forEach(function(k){if(pairs[k]===ri)delete pairs[k];});
  pairs[li]=ri;
  hwWrittenAnswers[qi]=JSON.stringify({t:"match",pairs:pairs});
  hwMatchSelState[qi]=-1;
  autoSaveWritten();
  reRenderWritten();
}

function updateWrittenCount(i,el){
  hwWrittenAnswers[i]=el.value;
  autoSaveWritten();
  var wc=document.getElementById("wc-"+i);
  if(wc) wc.textContent=el.value.length+" ตัวอักษร";
  var dc=document.getElementById("written-done-count");
  if(dc&&currentHwLesson){
    var cnt=currentHwLesson.written.filter(function(q,qi){
      if(q.type==="fill"){var d=getFillData(qi);return (d.filled||[]).some(Boolean);}
      if(q.type==="match"){var d=getMatchData(qi);return Object.keys(d.pairs||{}).length>0;}
      return hwWrittenAnswers[qi]&&hwWrittenAnswers[qi].trim&&hwWrittenAnswers[qi].trim();
    }).length;
    dc.textContent=cnt;
  }
}

// ── Auto-grade helper for fill/match ─────────────────────
function gradeAutoWritten(l,qi){
  var q=l.written[qi];
  if(!q) return null;
  if(q.type==="fill"){
    var data=getFillData(qi);
    var filled=data.filled||[];
    var correct=q.answers.filter(function(ans,ai){
      return (filled[ai]||"").trim()===ans.trim();
    }).length;
    var total=q.answers.length;
    var score=Math.round((correct/total)*10);
    return {score:score,
      feedback:"เติมถูก "+correct+"/"+total+" ช่อง"+(correct<total?" | เฉลย: "+q.answers.join(", "):""),
      model:"",auto:true};
  }
  if(q.type==="match"){
    var data=getMatchData(qi);
    var userPairs=data.pairs||{};
    var shuffle=hwMatchShuffles[qi]||seededShuffle(q.pairs.map(function(_,k){return k;}),qi+7);
    var correct=0;
    q.pairs.forEach(function(pair,li){
      var di=userPairs[li];
      if(di!==undefined&&shuffle[di]===li) correct++;
    });
    var total=q.pairs.length;
    var score=Math.round((correct/total)*10);
    // Build answer key for feedback
    var ansKey=q.pairs.map(function(p){return p.left+"→"+p.right;}).join(" | ");
    return {score:score,
      feedback:"จับคู่ถูก "+correct+"/"+total+" คู่"+(correct<total?" | เฉลย: "+ansKey:""),
      model:"",auto:true};
  }
  return null;
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
  hwMcqIndex=0; hwXP=0; hwMcqFeedback=null; hwMcqGraded=false;
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

  // 2b. Stars from MCQ — 1 star per correct answer
  var mcqStars=mcqScore; // max = l.mcq.length (usually 15)

  // 3. Auto-grade fill/match written questions immediately
  var autoEvals=l.written.map(function(q,qi){return gradeAutoWritten(l,qi);});
  var hasAutoEvals=autoEvals.some(function(e){return e!==null;});
  var allAutoGraded=autoEvals.every(function(e){return e!==null;});
  // Build initial writtenEvals (null = open question, needs AI)
  var initialWrittenEvals=hasAutoEvals?autoEvals:null;

  // Auto-calc written stars if all questions are auto-graded
  var autoWrittenStars=null;
  if(allAutoGraded&&initialWrittenEvals){
    autoWrittenStars=initialWrittenEvals.reduce(function(a,e){var s=e.score||0;return a+(s>=8?2:s>=5?1:0);},0);
  }

  // 4. Save — answers preserved, written/analysis pending
  var st={
    submitted:true, lessonId:l.id,
    mcqAnswers:hwMcqAnswers.slice(),
    writtenAnswers:hwWrittenAnswers.slice(),
    mcqScore:mcqScore,
    mcqStars:mcqStars,
    writtenRaw:allAutoGraded&&initialWrittenEvals?initialWrittenEvals.reduce(function(a,e){return a+(e.score||0);},0):null,
    writtenScore:allAutoGraded&&initialWrittenEvals?initialWrittenEvals.reduce(function(a,e){return a+Math.round((e.score||0)/3);},0):null,
    writtenStars:autoWrittenStars,
    writtenEvals:initialWrittenEvals,
    writtenOverall:"",
    mcqExplains:[],
    drAimEval:"", ployEval:"",
    score:null,
    starsCollected:false,
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
    // ตรวจทีละข้อ — ข้ามถ้า auto-graded ไปแล้ว
    var evals=st.writtenEvals?st.writtenEvals.slice():[];
    while(evals.length<l.written.length) evals.push(null);
    var overall="";
    var numQ=l.written.length;
    var openCount=l.written.filter(function(q){return !q.type||q.type==="open";}).length;
    var graded=0;
    for(var qi=0;qi<numQ;qi++){
      // Skip auto-graded questions
      if(evals[qi]!==null&&evals[qi]!==undefined){continue;}
      graded++;
      if(btn) btn.textContent="⏳ ตรวจข้อ "+graded+"/"+openCount+"...";
      var ans=(st.writtenAnswers&&st.writtenAnswers[qi]&&
        typeof st.writtenAnswers[qi]==="string"&&
        !st.writtenAnswers[qi].startsWith('{"t":')&&
        st.writtenAnswers[qi].trim())||"(ไม่ได้เขียน — ให้ 0)";
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
      var cleaned=txtQ.replace(/:\s*"([^"]*)"/g,function(m,v){
        return ': "'+v.replace(/\n/g," ").replace(/\r/g,"")+'"';
      });
      var mQ=cleaned.match(/\{[\s\S]*?\}/);
      var ev={score:0,feedback:"ตรวจไม่ได้",model:""};
      if(mQ){try{ev=JSON.parse(mQ[0]);}catch(pe){
        var sc=cleaned.match(/"score"\s*:\s*(\d+)/);
        if(sc) ev.score=+sc[1];
        var fb=cleaned.match(/"feedback"\s*:\s*"([^"]+)"/);
        if(fb) ev.feedback=fb[1];
      }}
      evals[qi]={score:ev.score||0,feedback:ev.feedback||"",model:ev.model||""};
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
    // written = 2 คะแนนต่อข้อ (AI score≥8→2, ≥5→1, else→0)
    st.writtenStars=evals.reduce(function(a,e){var s=e.score||0;return a+(s>=8?2:s>=5?1:0);},0);
    st.writtenScore=evals.reduce(function(a,e){return a+Math.round((e.score||0)/3);},0);
    var maxScore=(currentHwLesson?currentHwLesson.mcq.length:15)+(evals.length*3);
    st.maxScore=maxScore;
    st.score=(st.mcqScore||0)+st.writtenScore;
    hwXP=st.xp||hwXP;
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
  // written = 3 คะแนนต่อข้อ (AI score 0-9 หาร 3 = 0-3)
  var evCheck=st.writtenEvals;
  var writtenChecked=evCheck&&evCheck.length>0&&evCheck.every(function(e){return e!==null&&e!==undefined;});
  var writtenScore=writtenChecked
    ?evCheck.reduce(function(a,e){return a+Math.round((e.score||0)/3);},0)
    :null;
  var maxMcq=l.mcq.length;
  var maxWritten=(l.written?l.written.length:0)*3;  // 3 คะแนนต่อข้อ
  var maxScore=maxMcq+maxWritten;  // เช่น 15+15=30
  var total=writtenChecked?((st.mcqScore||0)+writtenScore):null;
  var pct=total!==null?Math.round(total/maxScore*100):null;
  var needRetake=pct!==null&&pct<RETAKE_THRESHOLD;
  var em=pct===null?"⏳":pct>=80?"🏆":pct>=60?"🌟":"💪";
  var grade=pct===null?"?":pct>=80?"A":pct>=70?"B":pct>=60?"C":"D";
  var starsThisLesson=(st.mcqStars||0)+(writtenChecked?(st.writtenStars||0):0);
  return '<div id="lp-score-hero" class="bg-gradient-to-b from-gray-800 to-gray-900 px-6 py-8 text-center border-b border-gray-800">'+
    '<div class="text-6xl mb-3">'+em+'</div>'+
    '<div class="text-5xl font-black text-white mb-1">'+(total!==null?total+"/"+maxScore:"?/"+maxScore)+'</div>'+
    '<div class="text-2xl font-bold text-amber-400 mb-3">Grade '+grade+(pct!==null?" · "+pct+"%":"")+'</div>'+
    '<div class="grid grid-cols-3 gap-3 max-w-sm mx-auto">'+
      '<div class="bg-gray-800 rounded-xl p-3 text-center"><div class="font-black text-amber-400 text-xl">'+(st.mcqScore||0)+'</div><div class="text-xs text-gray-400">MCQ /'+maxMcq+'</div></div>'+
      '<div class="bg-gray-800 rounded-xl p-3 text-center"><div class="font-black text-blue-400 text-xl">'+(writtenChecked?(writtenScore||0):'?')+'</div><div class="text-xs text-gray-400">เขียน /'+maxWritten+'</div></div>'+
      '<div class="bg-gray-800 rounded-xl p-3 text-center"><div class="font-black text-amber-400 text-xl">'+starsThisLesson+'</div><div class="text-xs text-gray-400">⭐ ดาวรอบนี้</div></div>'+
    '</div>'+
    // ── ส่วนดาว ──────────────────────────────────────────────
    (function(){
      var evs2=st.writtenEvals||[];
      var numQ2=(typeof l!=="undefined"&&l&&l.written)?l.written.length:evs2.length;
      var writtenDone=evs2.length>=numQ2&&numQ2>0&&evs2.every(function(e){return e!==null&&e!==undefined;});
      if(st.starsCollected){
        // เก็บดาวแล้ว
        var earned=st.starsEarned||(st.mcqStars||0)+(st.writtenStars||0);
        return '<div class="mt-4 bg-amber-900/30 border border-amber-600/60 rounded-2xl p-4 text-center">'+
          '<div class="text-3xl mb-1">⭐</div>'+
          '<div class="text-amber-400 font-black text-lg">เก็บดาวแล้ว +'+earned+' ดาว ✅</div>'+
          '<div class="text-xs text-gray-400 mt-1">ดาวสะสมทั้งหมด: '+parseInt(localStorage.getItem("walnut_stars")||"0")+'</div>'+
          (needRetake?
            '<div class="mt-3"><button onclick="retakeHw(\''+l.id+'\')" class="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-xl font-bold text-sm">🔄 ทำใหม่เพื่อเก็บดาวเพิ่ม</button></div>':"")+
        '</div>';
      } else if(writtenDone){
        // ยังไม่เก็บดาว — แสดงปุ่ม
        var pendingMcq=st.mcqStars||0;
        var pendingW=st.writtenStars||0;
        var pendingTotal=pendingMcq+pendingW;
        return '<div class="mt-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl p-4 text-center shadow-lg shadow-amber-900/30">'+
          '<div class="text-gray-900 text-xs font-bold mb-1">ดาวที่รอเก็บอยู่</div>'+
          '<div class="flex items-center justify-center gap-4 mb-3">'+
            '<div class="text-center"><div class="text-2xl font-black text-gray-900">'+pendingMcq+'</div><div class="text-xs text-gray-700">MCQ ⭐</div></div>'+
            '<div class="text-gray-600 text-xl">+</div>'+
            '<div class="text-center"><div class="text-2xl font-black text-gray-900">'+pendingW+'</div><div class="text-xs text-gray-700">เขียน ⭐</div></div>'+
            '<div class="text-gray-600 text-xl">=</div>'+
            '<div class="text-center"><div class="text-3xl font-black text-gray-900">'+pendingTotal+'</div><div class="text-xs text-gray-700">ดาว</div></div>'+
          '</div>'+
          '<button onclick="collectStars(\''+l.id+'\')" class="w-full py-3 bg-gray-900 hover:bg-gray-800 text-amber-400 rounded-xl font-black text-lg">'+
            '⭐ เก็บดาว '+pendingTotal+' ดาว →'+
          '</button>'+
        '</div>';
      } else {
        // รอตรวจข้อเขียน
        return '<div class="mt-4 bg-yellow-900/30 border border-yellow-700/50 rounded-2xl p-3 text-yellow-400 text-sm text-center">'+
          '<div class="font-bold mb-1">⏳ รอครูตรวจข้อเขียนก่อน</div>'+
          '<div class="text-xs opacity-80">ไปที่แท็บ ✍️ เขียน แล้วกด "ให้ครูตรวจข้อเขียน" เพื่อเก็บดาวได้เลย</div>'+
          (needRetake?
            '<div class="mt-2"><button onclick="retakeHw(\''+l.id+'\')" class="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-xl font-bold text-sm">🔄 ทำใหม่</button></div>':"")+
        '</div>';
      }
    }())+
  '</div>';
}

function renderWrittenPanel(l,st){
  var evs=st.writtenEvals||[];
  var allGraded=evs.length===l.written.length&&evs.every(function(e){return e!==null&&e!==undefined;});
  var hasOpenQ=l.written.some(function(q){return !q.type||q.type==="open";});
  var hasAnswers=st.writtenAnswers&&st.writtenAnswers.some(function(a){return a&&(typeof a==="string")&&!a.startsWith('{"t":')&&a.trim();});
  var hasInteractiveAnswers=st.writtenAnswers&&st.writtenAnswers.some(function(a){return a&&typeof a==="string"&&a.startsWith('{"t":');});
  var anyAnswers=hasAnswers||hasInteractiveAnswers||(st.writtenEvals&&st.writtenEvals.some(function(e){return e!==null;}));

  if(!allGraded){
    // Show preview of what was answered + grade button
    return '<div class="px-5 py-6 space-y-3">'+
      (!anyAnswers&&!hasInteractiveAnswers?
        '<div class="bg-red-900/40 border border-red-700/60 rounded-2xl p-4 text-center mb-2">'+
          '<div class="text-red-400 font-bold mb-1">⚠️ ไม่พบคำตอบ</div>'+
          '<div class="text-xs text-gray-400">กดปุ่มด้านล่างเพื่อกลับไปทำใหม่</div>'+
        '</div>':
        l.written.map(function(q,i){
          var ev=evs[i]||null;
          var hasEval=ev!==null&&ev!==undefined;
          var s=hasEval?ev.score:null;
          var col=s===null?"text-gray-400":s>=8?"text-green-400":s>=5?"text-amber-400":"text-red-400";
          var typeLabel=q.type==="fill"?"📝 เติมคำ":q.type==="match"?"🔗 จับคู่":"✍️ ตอบคำถาม";
          return '<div class="border border-gray-700 rounded-xl p-3 mb-1 bg-gray-900">'+
            '<div class="flex items-center justify-between mb-1">'+
              '<div class="text-xs text-gray-400">ข้อ '+(i+1)+' '+typeLabel+'</div>'+
              (hasEval?'<div class="text-xs font-black '+col+'">'+s+'/10 '+(ev.auto?"🤖 auto":"")+'</div>':
                '<div class="text-xs text-gray-500">รอตรวจ ⏳</div>')+
            '</div>'+
            '<div class="text-xs text-gray-500 truncate">'+q.q+'</div>'+
            (hasEval?'<div class="text-xs '+col+' mt-1">'+ev.feedback+'</div>':'')+
          '</div>';
        }).join("")
      )+
      '<div id="written-check-error" class="text-red-400 text-xs min-h-[1rem]"></div>'+
      (!st.starsCollected?
        '<button onclick="editWrittenOnly(\''+l.id+'\')" '+
          'class="w-full py-3 border border-gray-600 text-gray-300 rounded-2xl font-bold text-sm mb-2">'+
          '✏️ กลับไปแก้คำตอบ (MCQ ยังอยู่)'+
        '</button>':"")+
      (hasOpenQ&&anyAnswers?
        '<button id="btn-check-written" onclick="checkWritten(\''+l.id+'\')" '+
          'class="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-black text-base">'+
          '✍️ ให้ครูตรวจข้อเขียน'+
        '</button>':"")+
    '</div>';
  }

  // All graded — show full results
  return '<div class="px-5 py-4">'+
    l.written.map(function(q,i){
      var ev=evs[i]||{score:0,feedback:""};
      var s=ev.score||0;
      var col=s>=8?"text-green-400":s>=5?"text-amber-400":"text-red-400";
      var isAuto=ev.auto===true;
      var ansDisplay="";
      if(q.type==="fill"){
        try{var d=JSON.parse(st.writtenAnswers[i]||"{}");ansDisplay=(d.filled||[]).map(function(w,ai){return "("+ai+"): "+(w||"—");}).join(" | ");}
        catch(e){ansDisplay="—";}
      }else if(q.type==="match"){
        try{
          var d=JSON.parse(st.writtenAnswers[i]||"{}");
          var prs=d.pairs||{};
          var sh=hwMatchShuffles[i]||seededShuffle(q.pairs.map(function(_,k){return k;}),i+7);
          ansDisplay=Object.keys(prs).map(function(li){
            var di=prs[li];
            return q.pairs[li].left+" → "+q.pairs[sh[di]].right;
          }).join(" | ");
        }catch(e){ansDisplay="—";}
      }else{
        ansDisplay=(st.writtenAnswers&&st.writtenAnswers[i]&&
          typeof st.writtenAnswers[i]==="string"&&!st.writtenAnswers[i].startsWith('{"t":'))?
          st.writtenAnswers[i]:"(ไม่ได้ตอบ)";
      }
      return '<div class="border border-gray-700 rounded-xl p-4 mb-3 bg-gray-900">'+
        '<div class="flex items-center justify-between mb-2">'+
          '<div class="text-sm font-bold text-white">ข้อ '+(i+1)+(isAuto?' <span class="text-xs text-gray-500 font-normal">🤖 auto</span>':'')+'</div>'+
          '<div class="font-black '+col+'">'+s+'/10</div>'+
        '</div>'+
        '<div class="text-xs text-gray-400 mb-2 italic">'+q.q+'</div>'+
        '<div class="bg-gray-800 rounded-lg p-2 mb-2 text-xs text-gray-300 leading-relaxed">'+ansDisplay+'</div>'+
        '<div class="text-xs '+col+'"><strong>ผล: </strong>'+ev.feedback+'</div>'+
        (ev.model&&s<8?'<div class="mt-2 bg-blue-900/30 border border-blue-700/50 rounded-lg p-2 text-xs text-blue-300"><strong>📝 เฉลย: </strong>'+ev.model+'</div>':'')+
      '</div>';
    }).join("")+
    (st.writtenOverall?'<div class="bg-indigo-900/30 border border-indigo-700/50 rounded-2xl p-3 text-sm text-indigo-300 mt-2"><strong>ภาพรวม: </strong>'+st.writtenOverall+'</div>':"")+
    (hasOpenQ?'<button onclick="checkWritten(\''+l.id+'\')" class="mt-3 w-full py-2 border border-gray-600 text-gray-400 rounded-xl text-xs hover:border-gray-400">🔄 ตรวจใหม่</button>':"")+
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

// ── Collect Stars (เก็บดาวเข้ากระเป๋า) ──────────────────
function collectStars(lessonId){
  var st=getHwState(lessonId);
  var evs=st.writtenEvals||[];
  var l=LESSONS.find(function(x){return x.id===lessonId;});
  var numQ=l?l.written.length:0;
  var fullyGraded=evs.length>=numQ&&evs.every(function(e){return e!==null&&e!==undefined;});
  if(!st.submitted||!fullyGraded||st.starsCollected) return;
  var earned=(st.mcqStars||0)+(st.writtenStars||0);
  var prev=parseInt(localStorage.getItem("walnut_stars")||"0");
  var newTotal=prev+earned;
  localStorage.setItem("walnut_stars",String(newTotal));
  st.starsCollected=true;
  st.starsEarned=earned;
  saveHwState(lessonId,st);
  if(typeof saveToCloud==="function") saveToCloud();
  if(typeof syncLessonTasks==="function") syncLessonTasks();
  // อัปเดต star counter ใน header
  var headerStar=document.getElementById("header-stars");
  if(headerStar) headerStar.textContent="⭐ "+newTotal;
  // Re-render result
  hwSection="result";
  renderLessonFullPage();
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

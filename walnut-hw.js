// ── LESSON VISUAL ─────────────────────────────────────────
function getLessonVisual(id){
  if(id.startsWith("thai")) return (
    '<div class="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 mb-4 border border-yellow-100">'+
    '<div class="text-xs font-bold text-amber-700 mb-3">📚 ตารางมาตราตัวสะกด</div>'+
    '<div class="grid grid-cols-3 gap-2">'+
    [["แม่กง","วาง กาง วิ่ง สิ่ง","🔔"],["แม่กน","กิน คน นอน วัน","📝"],["แม่กม","ยิ้ม ชม ลิ้ม นาม","💜"]].map(function(m){
      return '<div class="bg-white rounded-xl p-3 text-center shadow-sm"><div class="font-bold text-amber-600 mb-1">'+m[0]+' '+m[2]+'</div>'+
        m[1].split(" ").map(function(w){return '<span class="inline-block bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg text-xs m-0.5">'+w+'</span>';}).join("")+
      '</div>';
    }).join("")+
    '</div></div>');
  if(id.startsWith("math")) return (
    '<div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4 mb-4 border border-orange-100">'+
    '<div class="text-xs font-bold text-orange-700 mb-3">🎮 ตารางสูตรคูณ แม่ 6–9</div>'+
    '<div class="grid grid-cols-4 gap-1 text-xs text-center">'+
    [6,7,8,9].map(function(a){
      return '<div><div class="font-bold text-orange-600 bg-orange-100 rounded-t-lg py-1">×'+a+'</div>'+
        [6,7,8,9,10,11].map(function(b){
          return '<div class="'+(a===b?'bg-amber-200 font-bold':'bg-white')+' border-b py-1 rounded">'+a+'×'+b+'='+a*b+'</div>';
        }).join("")+
      '</div>';
    }).join("")+
    '</div></div>');
  if(id.startsWith("sci")) return (
    '<div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 mb-4 border border-cyan-100">'+
    '<div class="text-xs font-bold text-cyan-700 mb-3">🔬 แผนภาพร่างกาย</div>'+
    '<div class="flex items-start gap-4">'+
    '<div class="text-center text-4xl leading-tight">🧠<br>🫁🫀<br>💪<br>🦷<br>🦵</div>'+
    '<div class="flex-1 space-y-1.5 text-xs">'+
    [["🧠 สมอง","สั่งการร่างกาย","bg-purple-50 text-purple-700"],
     ["🫀 หัวใจ","กล้ามเนื้อหัวใจ — ทำงาน 24/7","bg-red-50 text-red-700"],
     ["💪 กล้ามเนื้อโครงร่าง","ควบคุมได้ตามใจ","bg-orange-50 text-orange-700"],
     ["🦴 กระดูก 206 ชิ้น","ค้ำจุน + ปกป้องอวัยวะ","bg-cyan-50 text-cyan-700"]].map(function(r){
      return '<div class="'+r[2]+' rounded-lg px-2 py-1"><strong>'+r[0]+'</strong> — '+r[1]+'</div>';
    }).join("")+
    '</div></div></div>');
  if(id.startsWith("sing")) return (
    '<div class="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 mb-4 border border-rose-100">'+
    '<div class="text-xs font-bold text-rose-700 mb-3">🎤 Warm-Up Routine (10 นาที)</div>'+
    '<div class="flex gap-2 items-center flex-wrap">'+
    [["Lip Trill","2 นาที","🌬️","bg-rose-100"],["Humming","3 นาที","🎵","bg-pink-100"],["Ma-Me-Mi","3 นาที","🗣️","bg-fuchsia-100"],["Scale","2 นาที","🎼","bg-purple-100"]].map(function(s){
      return '<div class="'+s[3]+' rounded-xl p-2.5 text-center flex-1 min-w-0"><div class="text-xl">'+s[2]+'</div><div class="font-bold text-xs mt-1">'+s[0]+'</div><div class="text-xs text-gray-500">'+s[1]+'</div></div>';
    }).join('<div class="text-gray-300 text-lg">→</div>')+
    '</div></div>');
  if(id.startsWith("piano")) return (
    '<div class="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 mb-4 border border-violet-100">'+
    '<div class="text-xs font-bold text-violet-700 mb-3">🎹 คีย์บอร์ด Treble Clef</div>'+
    '<div class="flex gap-0.5 items-end justify-center mb-3">'+
    ["C","D","E","F","G","A","B","C"].map(function(n){
      return '<div class="flex flex-col items-center"><div class="w-8 h-16 bg-white border-2 border-gray-200 rounded-b-lg flex items-end justify-center pb-1 text-xs font-bold text-violet-600">'+n+'</div></div>';
    }).join("")+
    '</div>'+
    '<div class="text-xs text-gray-600 text-center">เส้น: <strong>E G B D F</strong> ("Every Good Boy Does Fine") · ช่อง: <strong>F A C E</strong></div>'+
    '</div>');
  if(id.startsWith("eng")) return (
    '<div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-4 mb-4 border border-indigo-100">'+
    '<div class="text-xs font-bold text-indigo-700 mb-3">🇬🇧 Vocabulary Flashcards</div>'+
    '<div class="grid grid-cols-3 gap-2 mb-3">'+
    [["happy","มีความสุข","😊"],["proud","ภูมิใจ","🏆"],["singer","นักร้อง","🎤"],
     ["school","โรงเรียน","🏫"],["friend","เพื่อน","🤝"],["music","ดนตรี","🎵"]].map(function(v){
      return '<div class="bg-white rounded-xl p-2.5 text-center shadow-sm border border-indigo-50">'+
        '<div class="text-xl">'+v[2]+'</div>'+
        '<div class="font-bold text-indigo-600 text-xs mt-1">'+v[0]+'</div>'+
        '<div class="text-gray-500 text-xs">'+v[1]+'</div>'+
      '</div>';
    }).join("")+
    '</div>'+
    '<div class="bg-indigo-100 rounded-xl p-3 text-xs text-center font-semibold text-indigo-800">I → AM &nbsp;|&nbsp; He/She/It → IS &nbsp;|&nbsp; We/You/They → ARE</div>'+
    '</div>');
  return "";
}

// ── HOMEWORK OPEN/DISPLAY ─────────────────────────────────
function openHw(id){
  const l=LESSONS.find(x=>x.id===id);if(!l)return;
  currentHwLesson=l;
  const st=getHwState(id);
  hwMcqAnswers=st.mcqAnswers||new Array(l.mcq.length).fill(null);
  hwWrittenAnswers=st.writtenAnswers||new Array(l.written.length).fill("");
  document.getElementById("hw-hdr").className="rounded-2xl p-5 mb-5 flex items-center justify-between "+l.bg+" border "+l.border;
  document.getElementById("hw-icon").textContent=l.icon;
  document.getElementById("hw-subj").textContent=l.subject;
  document.getElementById("hw-tch").textContent=l.teacher+" · สัปดาห์ที่ "+l.week;
  document.getElementById("hw-title").textContent=l.title;
  document.getElementById("hw-goal").textContent="🎯 "+l.goal;
  document.getElementById("hw-content").innerHTML=getLessonVisual(l.id)+
    '<div class="whitespace-pre-line text-sm text-gray-700 leading-relaxed">'+
    l.reading.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")+
    '</div>';
  document.getElementById("hw-mcq").innerHTML=l.mcq.map(function(q,i){
    return '<div class="border border-gray-100 rounded-xl p-4 bg-gray-50">'+
      '<div class="text-sm font-medium text-gray-800 mb-3">'+(i+1)+'. '+q.q+'</div>'+
      '<div class="space-y-2">'+
      q.c.map(function(c,ci){
        var sel=hwMcqAnswers[i]===ci;
        return '<button onclick="selMcq('+i+','+ci+')" data-q="'+i+'" data-c="'+ci+'" class="mcq-btn w-full text-left px-4 py-2.5 rounded-lg text-sm border '+(sel?"bg-amber-400 border-amber-400 text-white font-semibold":"bg-white border-gray-200 hover:border-amber-300 text-gray-700")+'">'+c+'</button>';
      }).join("")+
      '</div></div>';
  }).join("");
  document.getElementById("hw-written").innerHTML=l.written.map(function(q,i){
    return '<div class="border border-gray-100 rounded-xl p-4 bg-gray-50">'+
      '<div class="text-sm font-medium text-gray-800 mb-2">'+(i+1)+'. '+q.q+'</div>'+
      '<textarea rows="3" placeholder="เขียนคำตอบที่นี่..." data-wi="'+i+'" onchange="hwWrittenAnswers['+i+']=this.value" '+
      'class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400 resize-none bg-white">'+
      (hwWrittenAnswers[i]||"")+'</textarea>'+
      '</div>';
  }).join("");
  if(st.submitted){
    showHwResult(st);
    var btn=document.getElementById("hw-submit");
    btn.textContent="✅ ส่งแล้ว"; btn.disabled=true;
    btn.className="w-full bg-green-400 text-white py-3 rounded-2xl font-bold cursor-not-allowed";
  } else {
    document.getElementById("hw-result").classList.add("hidden");
    var btn2=document.getElementById("hw-submit");
    btn2.textContent="ส่งการบ้าน →"; btn2.disabled=false;
    btn2.className="w-full bg-amber-400 hover:bg-amber-500 text-white py-3 rounded-2xl font-bold";
  }
  document.getElementById("hw-modal").classList.remove("hidden");
  window.scrollTo(0,0);
}
function closeHw(){document.getElementById("hw-modal").classList.add("hidden");currentHwLesson=null;}

function selMcq(qi,ci){
  hwMcqAnswers[qi]=ci;
  document.querySelectorAll('[data-q="'+qi+'"]').forEach(function(btn){
    var sel=+btn.dataset.c===ci;
    btn.className="mcq-btn w-full text-left px-4 py-2.5 rounded-lg text-sm border transition-colors "+
      (sel?"bg-amber-400 border-amber-400 text-white font-semibold":"bg-white border-gray-200 hover:border-amber-300 text-gray-700");
  });
}

// โหลดคำอธิบาย MCQ ข้อเดิมที่ยังไม่มีทีหลัง
async function loadMcqExplain(lessonId, qi){
  var l=LESSONS.find(function(x){return x.id===lessonId;});
  var st=getHwState(lessonId);
  if(!l||!st.submitted)return;
  var q=l.mcq[qi];
  var btn=event.target;
  btn.textContent="⏳ กำลังโหลด...";btn.disabled=true;
  try{
    var res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:200,
        system:"คุณคือ"+l.teacher+" อธิบายสั้นๆ สำหรับเด็ก 8 ขวบ ทำไมคำตอบนี้ถูก มีทริคช่วยจำ ตอบ JSON: {\"explain\":\"...\",\"trick\":\"...\"}",
        messages:[{role:"user",content:"คำถาม: "+q.q+"\nเฉลย: "+q.c[q.a]}]})});
    var d=await res.json();
    var txt=d.content?.[0]?.text||"{}";
    var m=txt.match(/\{[\s\S]*\}/);
    var expl=m?JSON.parse(m[0]):{explain:"คำตอบที่ถูกต้องคือ "+q.c[q.a],trick:""};
    var explains=st.mcqExplains||[];
    explains=explains.filter(function(e){return e.qi!==qi;});
    explains.push({qi:qi,explain:expl.explain||"",trick:expl.trick||""});
    st.mcqExplains=explains;
    saveHwState(lessonId,st);
    // Re-render result
    var savedLesson=currentHwLesson;
    currentHwLesson=l;
    showHwResult(st);
    currentHwLesson=savedLesson;
    switchResTab("mcq");
  }catch(e){btn.textContent="❌ ลองใหม่";btn.disabled=false;}
}

// ── RESULT DISPLAY ────────────────────────────────────────
// RETAKE_THRESHOLD defined in walnut-data.js

function showHwResult(st){
  var l=currentHwLesson||LESSONS.find(function(x){return x.id===st.lessonId;});
  // writtenRaw = sum of 0-10 scores (max 50), normalized to /5 for total
  var writtenRaw=st.writtenRaw||st.writtenScore*10||0;
  var writtenNorm=Math.round(writtenRaw/10); // 0-5
  var total=st.mcqScore+(writtenNorm);
  var pct=Math.round(total/20*100);
  var needRetake=pct<RETAKE_THRESHOLD;
  var em=pct>=80?"🏆":pct>=60?"😊":"💪";
  var resEl=document.getElementById("hw-result");

  // MCQ review
  var mcqReview="";
  if(l){
    mcqReview=l.mcq.map(function(q,i){
      var userAns=st.mcqAnswers?st.mcqAnswers[i]:null;
      var correct=q.a;
      var isRight=userAns===correct;
      var expl=st.mcqExplains?st.mcqExplains.find(function(e){return e.qi===i;}):null;
      return '<div class="border rounded-xl p-3 mb-2 '+(isRight?"border-green-200 bg-green-50":"border-red-200 bg-red-50")+'">'+
        '<div class="text-xs font-semibold mb-1 '+(isRight?"text-green-700":"text-red-700")+'">'+(isRight?"✅":"❌")+' ข้อ '+(i+1)+': '+q.q+'</div>'+
        (isRight?
          '<div class="text-xs text-green-600">'+q.c[correct]+' — ถูกต้อง! 🎉</div>':
          '<div class="space-y-1">'+
            '<div class="text-xs"><span class="text-red-500">คำตอบของวอลนัท: </span>'+
              '<span class="line-through text-red-400">'+(userAns!==null&&userAns!==undefined?q.c[userAns]:"(ไม่ได้ตอบ)")+'</span></div>'+
            '<div class="text-xs"><span class="text-green-600 font-semibold">เฉลยที่ถูก: </span>'+
              '<span class="font-semibold text-green-700">'+q.c[correct]+'</span></div>'+
            (expl?
              '<div class="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2">'+
                '<div class="text-xs text-yellow-800"><strong>💡 อธิบาย:</strong> '+expl.explain+'</div>'+
                (expl.trick?'<div class="text-xs text-yellow-700 mt-1"><strong>🧠 ทริค:</strong> '+expl.trick+'</div>':'')+
              '</div>':
              '<button onclick="loadMcqExplain(\''+st.lessonId+'\','+i+')" class="mt-2 text-xs text-indigo-500 hover:text-indigo-700 underline">💡 ขอคำอธิบาย</button>')+
          '</div>')+
        '</div>';
    }).join("");
  }

  // Written review (0-10 per question)
  var writtenReview="";
  if(l&&st.writtenEvals&&st.writtenEvals.length){
    writtenReview=l.written.map(function(q,i){
      var ev=st.writtenEvals[i]||{score:0,feedback:"",model:"",breakdown:""};
      var s=ev.score||0;
      var barColor=s>=8?"bg-green-400":s>=5?"bg-amber-400":"bg-red-400";
      return '<div class="border rounded-xl p-4 mb-3 bg-white shadow-sm">'+
        '<div class="flex items-center justify-between mb-2">'+
          '<div class="text-sm font-semibold text-gray-800">ข้อ '+(i+1)+'</div>'+
          '<div class="flex items-center gap-2">'+
            '<div class="text-lg font-bold '+(s>=8?"text-green-600":s>=5?"text-amber-600":"text-red-500")+'">'+s+'/10</div>'+
            '<div class="w-16 bg-gray-100 rounded-full h-2"><div class="'+barColor+' h-2 rounded-full" style="width:'+s*10+'%"></div></div>'+
          '</div>'+
        '</div>'+
        '<div class="text-xs text-gray-500 mb-2 italic">'+q.q+'</div>'+
        '<div class="bg-gray-50 rounded-lg p-2 mb-2 text-xs text-gray-700">'+
          '<strong>คำตอบ: </strong>'+(st.writtenAnswers?st.writtenAnswers[i]||"(ไม่ได้ตอบ)":"(ไม่ได้ตอบ)")+
        '</div>'+
        '<div class="text-xs '+(s>=8?"text-green-700":s>=5?"text-amber-700":"text-red-600")+'">'+
          '<strong>ครูวิจารณ์: </strong>'+ev.feedback+
        '</div>'+
        (ev.breakdown?'<div class="mt-2 text-xs text-gray-500"><strong>รายละเอียดคะแนน: </strong>'+ev.breakdown+'</div>':'')+
        (ev.model&&s<8?'<div class="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-gray-600"><strong>📝 คำตอบที่ดีควรเป็น: </strong>'+ev.model+'</div>':'')+
      '</div>';
    }).join("")+
    '<div class="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 border">'+
      '<strong>📝 ภาพรวมข้อเขียน: </strong>'+(st.writtenOverall||"—")+'</div>';
  } else {
    writtenReview='<div class="text-xs text-gray-400 text-center py-4">ยังไม่มีผลตรวจข้อเขียน</div>';
  }

  // Dr.Aim + Ploy panel
  var analysisPanel=
    '<div class="space-y-4">'+
    '<div class="bg-blue-50 border border-blue-200 rounded-2xl p-4">'+
      '<div class="flex items-center gap-2 mb-2"><span>📊</span><strong class="text-sm text-blue-800">Dr.Aim วิเคราะห์</strong></div>'+
      (st.drAimEval?
        '<div class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">'+st.drAimEval+'</div>':
        '<div class="text-gray-400 text-sm">กำลังวิเคราะห์...</div>')+
    '</div>'+
    '<div class="bg-green-50 border border-green-200 rounded-2xl p-4">'+
      '<div class="flex items-center gap-2 mb-2"><span>🌱</span><strong class="text-sm text-green-800">Ploy — ด้านความสุขและแรงบันดาลใจ</strong></div>'+
      (st.ployEval?
        '<div class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">'+st.ployEval+'</div>':
        '<div class="text-gray-400 text-sm">กำลังประเมิน...</div>')+
    '</div>'+
    (needRetake?
      '<div class="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">'+
        '<div class="text-red-700 font-semibold mb-1">⚠️ คะแนนต่ำกว่า '+RETAKE_THRESHOLD+'% — แนะนำให้ทำใหม่</div>'+
        '<div class="text-xs text-red-500 mb-3">ทำใหม่ = ได้ฝึกอีกรอบ ไม่ใช่เรื่องแย่ 💪</div>'+
        '<button onclick="retakeHw(\''+st.lessonId+'\')" class="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm">🔄 ทำใหม่</button>'+
      '</div>':'')+'</div>';

  var retakeCountBadge=st.retakeCount?(' · ทำมาแล้ว <strong>'+st.retakeCount+'</strong> ครั้ง'):'';
  resEl.innerHTML=
    '<div class="bg-white rounded-2xl border border-gray-100 p-5">'+
    // Score header
    '<div class="text-center mb-3">'+
      '<div class="text-5xl mb-2">'+em+'</div>'+
      '<div class="text-3xl font-bold">'+total+'/20 <span class="text-lg text-gray-400">('+pct+'%)</span></div>'+
    '</div>'+
    // Retake banner — ขึ้นก่อน tabs เลย
    (needRetake?
      '<div class="bg-red-50 border-2 border-red-300 rounded-2xl p-4 mb-4 flex items-center justify-between gap-3">'+
        '<div>'+
          '<div class="text-red-700 font-bold text-sm">⚠️ คะแนนต่ำกว่า '+RETAKE_THRESHOLD+'%</div>'+
          '<div class="text-xs text-red-500 mt-0.5">แนะนำให้ทำใหม่'+retakeCountBadge+'</div>'+
        '</div>'+
        '<button onclick="retakeHw(\''+st.lessonId+'\')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shrink-0">🔄 ทำใหม่</button>'+
      '</div>':
      '<div class="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 flex items-center justify-between">'+
        '<div class="text-green-700 font-semibold text-sm">✅ ผ่านเกณฑ์ 60% ยินดีด้วยนะ 🎉</div>'+
        (st.retakeCount?'<div class="text-xs text-gray-400">ทำมา '+st.retakeCount+' ครั้ง</div>':'')+
      '</div>')+
    '<div class="grid grid-cols-3 gap-2 mb-4">'+
      '<div class="bg-amber-50 rounded-xl p-2 text-center"><div class="text-base font-bold text-amber-600">'+st.mcqScore+'/15</div><div class="text-xs text-gray-500">MCQ</div></div>'+
      '<div class="bg-blue-50 rounded-xl p-2 text-center"><div class="text-base font-bold text-blue-600">'+writtenRaw+'/50</div><div class="text-xs text-gray-500">ข้อเขียน</div></div>'+
      '<div class="bg-purple-50 rounded-xl p-2 text-center"><div class="text-base font-bold text-purple-600">'+pct+'%</div><div class="text-xs text-gray-500">ภาพรวม</div></div>'+
    '</div>'+
    // Tabs
    '<div class="flex gap-1 mb-4">'+
      [['mcq','🔢 MCQ'],['written','✍️ ข้อเขียน'],['analysis','📊 วิเคราะห์']].map(function(t,i){
        return '<button onclick="switchResTab(\''+t[0]+'\')" data-rt="'+t[0]+'" '+
          'class="res-tab flex-1 py-2 rounded-xl text-xs font-semibold transition-colors '+
          (i===0?"bg-amber-400 text-white":"bg-gray-100 text-gray-500")+'">'+t[1]+'</button>';
      }).join("")+
    '</div>'+
    '<div id="res-mcq-panel">'+mcqReview+'</div>'+
    '<div id="res-written-panel" class="hidden">'+writtenReview+'</div>'+
    '<div id="res-analysis-panel" class="hidden">'+analysisPanel+'</div>'+
    '</div>';

  resEl.classList.remove("hidden");
  // scroll to top of modal
  var top=document.getElementById("hw-scroll-top");
  if(top) top.scrollIntoView({behavior:"smooth"});
}

function switchResTab(t){
  document.querySelectorAll(".res-tab").forEach(function(el){
    el.className="res-tab flex-1 py-2 rounded-xl text-xs font-semibold transition-colors "+
      (el.dataset.rt===t?"bg-amber-400 text-white":"bg-gray-100 text-gray-500");
  });
  ["mcq","written","analysis"].forEach(function(p){
    var el=document.getElementById("res-"+p+"-panel");
    if(el) el.classList.add("hidden");
  });
  var panel=document.getElementById("res-"+t+"-panel");
  if(panel) panel.classList.remove("hidden");
}

// ── RETAKE ────────────────────────────────────────────────
function retakeHw(lessonId){
  if(!confirm("ยืนยันทำใหม่? คะแนนเดิมจะถูกลบ\n(ทำใหม่ = ฝึกได้อีกรอบ ไม่ใช่เรื่องแย่ 💪)")) return;
  var hw=getHwState(lessonId);
  // บันทึกประวัติเฉพาะครั้งที่ "ผ่าน" (≥60%) เพื่อวิเคราะห์พัฒนาการในอนาคต
  var pct=Math.round(((hw.score||0)/20)*100);
  if(hw.submitted&&pct>=RETAKE_THRESHOLD){
    try{
      var histKey="hw_hist_"+lessonId;
      var hist=JSON.parse(localStorage.getItem(histKey)||"[]");
      hist.push(hw); // เก็บ full state รวม AI eval
      localStorage.setItem(histKey,JSON.stringify(hist));
    }catch(e){}
  }
  var newCount=(hw.retakeCount||0)+1;
  localStorage.removeItem("hw_"+lessonId);
  saveHwState(lessonId,{retakeCount:newCount,retakedAt:new Date().toISOString()});
  if(typeof saveToCloud==="function") saveToCloud();
  // คืน task กลับ pending zone
  var ts=getLocalTasks();
  var t=ts.find(function(x){return x.lessonId===lessonId;});
  if(t){t.status="pending";saveLocalTasks(ts);}
  closeHw();
  // ไปหน้า tasks เพื่อเห็น task ที่ย้ายกลับมา
  if(typeof switchTab==="function") switchTab("tasks");
}

// ── SUBMIT HOMEWORK ───────────────────────────────────────
async function submitHw(){
  if(!currentHwLesson)return;
  var l=currentHwLesson;
  document.querySelectorAll("[data-wi]").forEach(function(el){hwWrittenAnswers[+el.dataset.wi]=el.value;});
  var bar=document.getElementById("hw-submit-bar");
  var btn=document.getElementById("hw-submit");
  btn.textContent="กำลังตรวจ..."; btn.disabled=true;

  // 1. MCQ auto-grade
  var mcqScore=0;
  var wrongMcq=[];
  l.mcq.forEach(function(q,i){
    if(hwMcqAnswers[i]===q.a) mcqScore++;
    else wrongMcq.push({qi:i,q:q.q,userAns:hwMcqAnswers[i],correctAns:q.a,choices:q.c});
  });

  var writtenRaw=0, writtenEvals=[], writtenOverall="", mcqExplains=[], drAimEval="", ployEval="";

  // API key lives on Netlify server — always try /api/chat
  {
    btn.textContent="ครูกำลังตรวจ... (1/4)";
    // 2. Written grading — 0-10 per question
    try{
      var answeredCount=hwWrittenAnswers.filter(function(a){return a&&a.trim();}).length;
      var wtext=l.written.map(function(q,i){
        return "ข้อ "+(i+1)+"\nคำถาม: "+q.q+"\nคำตอบของวอลนัท: "+(hwWrittenAnswers[i]&&hwWrittenAnswers[i].trim()||"(ไม่ได้เขียนอะไร — ให้ 0 คะแนน)");
      }).join("\n---\n");
      var sysWritten="คุณคือ"+l.teacher+" ครูของวอลนัท อายุ 8 ขวบ ชั้น ป.4\n\n"+
        "ตรวจข้อเขียนตอบ 5 ข้อ วิชา"+l.subject+" เรื่อง\""+l.title+"\"\n\n"+
        "กฎการให้คะแนน 0-10:\n"+
        "10 = สมบูรณ์แบบ ครบถ้วน มีความคิดของตัวเอง\n"+
        "8-9 = ดีมาก ถูกต้อง อาจขาดรายละเอียดเล็กน้อย\n"+
        "6-7 = พอใช้ได้ เข้าใจหลัก แต่ขาดความลึก\n"+
        "4-5 = เข้าใจบางส่วน มีข้อผิดพลาดหลายจุด\n"+
        "2-3 = พยายามตอบ แต่เข้าใจผิดพื้นฐาน\n"+
        "0-1 = ไม่ตอบ หรือไม่เกี่ยวข้องกับคำถามเลย\n\n"+
        "สิ่งที่ต้องบอกในแต่ละข้อ:\n"+
        "- score: ตัวเลข 0-10\n"+
        "- feedback: บอกตรงๆ ว่าดีหรือไม่ดีอย่างไร ขาดอะไร (ภาษาไทยธรรมชาติ ไม่ formal)\n"+
        "- breakdown: อธิบายวิธีให้คะแนน เช่น 'ถูกประเด็นหลัก +5 แต่ไม่มีตัวอย่าง -3'\n"+
        "- model: คำตอบที่ดีควรเป็นอย่างไร (บอกเมื่อคะแนนต่ำกว่า 7)\n\n"+
        "ตอบเป็น JSON อย่างเดียว ไม่มีข้อความอื่น:\n"+
        '{"questions":[{"score":8,"feedback":"ตอบได้ดี แต่ยังขาด...","breakdown":"ถูกหลัก +7 แต่ไม่มีตัวอย่าง -2","model":""},...],"overall":"สรุปภาพรวม 2-3 ประโยค"}';
      var resW=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:2000,
          system:sysWritten,
          messages:[{role:"user",content:wtext}]})});
      var dW=await resW.json();
      if(dW.error){throw new Error(dW.error);}
      var txtW=dW.content?.[0]?.text||"{}";
      // ลบ markdown code block ถ้ามี
      txtW=txtW.replace(/```json\s*/g,"").replace(/```\s*/g,"").trim();
      var matchW=txtW.match(/\{[\s\S]*\}/);
      if(matchW){
        try{
          var pW=JSON.parse(matchW[0]);
          writtenEvals=pW.questions||[];
          writtenOverall=pW.overall||"";
          writtenRaw=writtenEvals.reduce(function(a,e){return a+(e.score||0);},0);
        }catch(pe){writtenOverall="แยก JSON ไม่สำเร็จ: "+txtW.slice(0,100);}
      } else {
        writtenOverall="ครูให้ความเห็น: "+txtW.slice(0,300);
      }
    }catch(e){writtenRaw=0;writtenEvals=[];writtenOverall="⚠️ ตรวจไม่สำเร็จ: "+e.message;}

    btn.textContent="ครูอธิบาย MCQ... (2/4)";
    // 3. MCQ explanations
    if(wrongMcq.length>0){
      try{
        var mcqPrompt=wrongMcq.map(function(w){
          return "ข้อ "+(w.qi+1)+": "+w.q+"\nคำตอบที่ถูก: "+w.choices[w.correctAns];
        }).join("\n---\n");
        var sysMcq="คุณคือ"+l.teacher+" อธิบายให้วอลนัท (8 ขวบ) เข้าใจว่าทำไมคำตอบนี้ถูก\n"+
          "ใช้ภาษาไทยง่ายๆ สนุก เหมือนครูอธิบายให้เด็ก มีทริคช่วยจำด้วย\n"+
          "ตอบ JSON อย่างเดียว:\n"+
          '[{"qi":0,"explain":"เพราะ...อธิบายสั้นๆ...","trick":"จำง่ายๆ ว่า..."},...]';
        var resM=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:800,system:sysMcq,
            messages:[{role:"user",content:"วิชา "+l.subject+"\n\n"+mcqPrompt}]})});
        var dM=await resM.json();
        var txtM=(dM.content?.[0]?.text||"[]").replace(/```json\s*/g,"").replace(/```\s*/g,"").trim();
        var matchM=txtM.match(/\[[\s\S]*\]/);
        if(matchM) mcqExplains=JSON.parse(matchM[0]);
      }catch(e){mcqExplains=[];}
    }

    btn.textContent="Dr.Aim + Ploy วิเคราะห์... (3/4)";
    // 4. Dr.Aim + Ploy parallel
    var writtenNorm=Math.round(writtenRaw/10);
    var total=mcqScore+writtenNorm;
    var pct=Math.round(total/20*100);
    var wrongList=wrongMcq.length>0
      ?wrongMcq.map(function(w){return "ข้อ"+(w.qi+1)+" ("+w.q+")";}).join(", ")
      :"ถูกทั้งหมด";
    var writtenSummary=writtenEvals.length>0
      ?writtenEvals.map(function(e,i){return "ข้อ"+(i+1)+": "+e.score+"/10 — "+e.feedback;}).join("\n")
      :"(ยังไม่มีผลตรวจข้อเขียน)";
    var context="วิชา: "+l.subject+"\nหัวข้อ: "+l.title+"\n"+
      "ผล MCQ: "+mcqScore+"/15 | ข้อเขียน: "+writtenRaw+"/50 | รวม: "+total+"/20 ("+pct+"%)\n"+
      "MCQ ผิด: "+wrongList+"\n\n"+
      "ผลตรวจข้อเขียน:\n"+writtenSummary+"\n\n"+
      "ความเห็นภาพรวมจากครู: "+(writtenOverall||"ยังไม่มี");

    try{
      var aimPrompt="คุณคือ Dr.Aim นักวิเคราะห์วิชาการเด็กของ Walnut Learning\n\n"+
        "วิเคราะห์ผลการบ้านของวอลนัท (8 ขวบ ป.4) จากข้อมูลที่ให้\n"+
        "ภาษาไทยที่อ่านง่าย เป็นธรรมชาติ ไม่ formal เกินไป ตรงไปตรงมา\n"+
        "ถ้าผลแย่ต้องบอกตรงๆ ว่าแย่ตรงไหน เพราะอะไร — ไม่ต้องปิดบัง\n\n"+
        "เขียนในรูปแบบนี้ (ห้ามเปลี่ยน format):\n\n"+
        "[ย่อหน้าที่ 1: ภาพรวมคะแนนและสิ่งที่เห็น 2-3 ประโยค]\n\n"+
        "[ย่อหน้าที่ 2: pattern ที่เห็นจากข้อผิด เข้าใจผิดตรงไหน 2-3 ประโยค]\n\n"+
        "✅ จุดแข็ง\n• [bullet point จริงๆ ไม่ใช่ ...]\n\n"+
        "🔴 จุดที่ต้องพัฒนา\n• [bullet point จริงๆ]\n\n"+
        "💡 Dr.Aim แนะนำ\n• [action ที่ทำได้จริง]";
      var ployPrompt="คุณคือ Ploy นักพัฒนาศักยภาพเด็กของ Walnut Learning\n\n"+
        "ดูผลการบ้านของวอลนัท แล้วประเมินด้านความรู้สึก แรงบันดาลใจ และ mindset\n"+
        "ภาษาไทยอ่อนโยน อบอุ่น เป็นธรรมชาติ เหมือนพูดกับเด็กจริงๆ\n"+
        (pct<RETAKE_THRESHOLD?"คะแนนยังไม่ผ่านเกณฑ์ — ช่วยบอกวอลนัทว่าการทำใหม่คือโอกาสฝึก ไม่ใช่ความล้มเหลว\n\n":"\n")+
        "เขียนในรูปแบบนี้:\n\n"+
        "[ย่อหน้าที่ 1: อ่านจากคำตอบแล้ว วอลนัทน่าจะรู้สึกหรือมี mindset อย่างไร 2-3 ประโยค]\n\n"+
        "💚 สิ่งที่น่าชื่นชม\n• [จริงๆ ไม่ใช่ ...]\n\n"+
        "🌱 Ploy แนะนำ\n• [แนะนำด้านความรู้สึกและแรงจูงใจ]";
      var [resA,resP]=await Promise.all([
        fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:900,system:aimPrompt,
            messages:[{role:"user",content:context}]})}),
        fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:700,system:ployPrompt,
            messages:[{role:"user",content:context}]})})
      ]);
      var dA=await resA.json();
      var dP=await resP.json();
      if(dA.error) throw new Error("Dr.Aim: "+dA.error);
      if(dP.error) throw new Error("Ploy: "+dP.error);
      drAimEval=dA.content?.[0]?.text||"Dr.Aim ไม่สามารถวิเคราะห์ได้";
      ployEval=dP.content?.[0]?.text||"Ploy ไม่สามารถประเมินได้";
    }catch(e){drAimEval="⚠️ "+e.message;ployEval="⚠️ "+e.message;}
  }

  var writtenScore=Math.round(writtenRaw/10);
  var total2=mcqScore+writtenScore;
  var st={
    submitted:true, lessonId:l.id,
    mcqAnswers:hwMcqAnswers, writtenAnswers:hwWrittenAnswers,
    mcqScore:mcqScore, writtenRaw:writtenRaw, writtenScore:writtenScore, score:total2,
    mcqExplains:mcqExplains, writtenEvals:writtenEvals, writtenOverall:writtenOverall,
    drAimEval:drAimEval, ployEval:ployEval,
    submittedAt:new Date().toISOString()
  };
  saveHwState(l.id,st);
  // sync ขึ้น cloud ทันทีหลังส่งการบ้าน
  if(typeof saveToCloud==="function") saveToCloud();

  // hide submit bar, show result
  if(bar) bar.classList.add("hidden");
  showHwResult(st);
  syncLessonTasks();
}


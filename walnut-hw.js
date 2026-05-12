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

// ── RESULT DISPLAY ────────────────────────────────────────
function showHwResult(st){
  var l=currentHwLesson||LESSONS.find(function(x){return x.id===st.lessonId;});
  var pct=Math.round((st.score/20)*100);
  var em=pct>=80?"🏆":pct>=60?"😊":"💪";
  var resEl=document.getElementById("hw-result");

  var mcqReview="";
  if(l){
    mcqReview=l.mcq.map(function(q,i){
      var userAns=st.mcqAnswers[i];
      var correct=q.a;
      var isRight=userAns===correct;
      var expl=st.mcqExplains?st.mcqExplains.find(function(e){return e.qi===i;}):null;
      return '<div class="border rounded-xl p-3 mb-2 '+(isRight?"border-green-200 bg-green-50":"border-red-200 bg-red-50")+'">'+
        '<div class="text-xs font-semibold mb-1 '+(isRight?"text-green-700":"text-red-700")+'">'+(isRight?"✅":"❌")+' ข้อ '+(i+1)+': '+q.q+'</div>'+
        (isRight?
          '<div class="text-xs text-green-600">'+q.c[correct]+' — ถูกต้อง! 🎉</div>':
          '<div class="space-y-1">'+
            '<div class="text-xs"><span class="text-red-500">คำตอบของวอลนัท: </span>'+
              '<span class="line-through text-red-400">'+(userAns!==null?q.c[userAns]:"(ไม่ได้ตอบ)")+'</span></div>'+
            '<div class="text-xs"><span class="text-green-600 font-semibold">เฉลยที่ถูก: </span>'+
              '<span class="font-semibold text-green-700">'+q.c[correct]+'</span></div>'+
            (expl?
              '<div class="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-2">'+
                '<div class="text-xs text-yellow-800"><strong>💡 อธิบาย:</strong> '+expl.explain+'</div>'+
                (expl.trick?'<div class="text-xs text-yellow-700 mt-1"><strong>🧠 ทริค:</strong> '+expl.trick+'</div>':'')+
              '</div>':
              '<div class="text-xs text-gray-400 italic mt-1">กำลังโหลดคำอธิบาย...</div>')+
          '</div>')+
        '</div>';
    }).join("");
  }

  var writtenReview="";
  if(l&&st.writtenEvals){
    writtenReview=l.written.map(function(q,i){
      var ev=st.writtenEvals[i]||{score:0,feedback:"",model:""};
      return '<div class="border rounded-xl p-3 mb-2 '+(ev.score>0?"border-blue-200 bg-blue-50":"border-orange-200 bg-orange-50")+'">'+
        '<div class="text-xs font-semibold mb-1">ข้อ '+(i+1)+': '+q.q+'</div>'+
        '<div class="text-xs bg-white rounded-lg p-2 mb-2 text-gray-700">'+
          '<strong>คำตอบวอลนัท: </strong>'+(st.writtenAnswers[i]||"(ไม่ได้ตอบ)")+
        '</div>'+
        '<div class="text-xs '+(ev.score>0?"text-blue-700":"text-orange-700")+'">'+
          '<strong>'+(ev.score>0?"✅ "+ev.score+"/1":"❌ 0/1")+'</strong> — '+ev.feedback+
        '</div>'+
        (ev.model?'<div class="mt-2 bg-white border rounded-lg p-2 text-xs text-gray-600"><strong>📝 เฉลย: </strong>'+ev.model+'</div>':'')+
        '</div>';
    }).join("");
  }

  resEl.innerHTML=
    '<div class="text-center mb-4"><div class="text-5xl mb-2">'+em+'</div>'+
      '<div class="text-3xl font-bold">'+st.score+'/20</div>'+
      '<div class="text-gray-400">'+pct+'%</div>'+
    '</div>'+
    '<div class="grid grid-cols-2 gap-3 mb-4">'+
      '<div class="bg-amber-50 rounded-xl p-3 text-center"><div class="text-lg font-bold text-amber-600">'+st.mcqScore+'/15</div><div class="text-xs text-gray-500">MCQ</div></div>'+
      '<div class="bg-blue-50 rounded-xl p-3 text-center"><div class="text-lg font-bold text-blue-600">'+st.writtenScore+'/5</div><div class="text-xs text-gray-500">ข้อเขียน</div></div>'+
    '</div>'+
    // Result tabs
    '<div id="res-tabs" class="flex gap-1 mb-3">'+
      ['mcq','written','dlaim'].map(function(t,i){
        var labels=['🔢 ตรวจ MCQ','✍️ ตรวจข้อเขียน','📊 Dr.Aim วิเคราะห์'];
        return '<button onclick="switchResTab(\''+t+'\')" data-rt="'+t+'" class="res-tab flex-1 py-2 rounded-xl text-xs font-semibold transition-colors '+(i===0?"bg-amber-400 text-white":"bg-gray-100 text-gray-500")+'">'+labels[i]+'</button>';
      }).join("")+
    '</div>'+
    '<div id="res-mcq-panel">'+mcqReview+'</div>'+
    '<div id="res-written-panel" class="hidden">'+(writtenReview||'<div class="text-xs text-gray-400 text-center py-4">ยังไม่มีผลตรวจข้อเขียน</div>')+'<div class="mt-3 bg-gray-50 rounded-xl p-3 text-sm text-gray-700"><strong>ภาพรวม: </strong>'+(st.writtenOverall||"")+'</div></div>'+
    '<div id="res-aim-panel" class="hidden">'+
      (st.drAimEval?
        '<div class="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">'+st.drAimEval+'</div>':
        '<div class="text-center py-6"><div class="text-gray-400 text-sm">Dr.Aim กำลังวิเคราะห์...</div><div class="spinner mx-auto mt-3"></div></div>')+
    '</div>';

  resEl.classList.remove("hidden");
}

function switchResTab(t){
  document.querySelectorAll(".res-tab").forEach(function(el){
    el.className="res-tab flex-1 py-2 rounded-xl text-xs font-semibold transition-colors "+
      (el.dataset.rt===t?"bg-amber-400 text-white":"bg-gray-100 text-gray-500");
  });
  ["mcq","written","aim"].forEach(function(p){
    var el=document.getElementById("res-"+p+"-panel");
    if(el) el.classList.add("hidden");
  });
  var target=t==="dlaim"?"aim":t;
  var panel=document.getElementById("res-"+target+"-panel");
  if(panel) panel.classList.remove("hidden");
}

// ── SUBMIT HOMEWORK ───────────────────────────────────────
async function submitHw(){
  if(!currentHwLesson)return;
  var l=currentHwLesson;
  document.querySelectorAll("[data-wi]").forEach(function(el){hwWrittenAnswers[+el.dataset.wi]=el.value;});
  var btn=document.getElementById("hw-submit");
  btn.textContent="กำลังตรวจ..."; btn.disabled=true;

  // 1. MCQ auto-grade
  var mcqScore=0;
  var wrongMcq=[];
  l.mcq.forEach(function(q,i){
    if(hwMcqAnswers[i]===q.a) mcqScore++;
    else wrongMcq.push({qi:i,q:q.q,userAns:hwMcqAnswers[i],correctAns:q.a,choices:q.c});
  });

  var writtenScore=0, writtenEvals=[], writtenOverall="", mcqExplains=[], drAimEval="";

  if(CFG.claude){
    btn.textContent="ครูกำลังตรวจ... (1/3)";
    // 2. Written grading (teacher persona)
    try{
      var wtext=l.written.map(function(q,i){
        return "ข้อ"+(i+1)+": "+q.q+"\nคำตอบ: "+(hwWrittenAnswers[i]||"(ไม่ได้ตอบ)");
      }).join("\n\n");
      var sysWritten="คุณคือ"+l.teacher+" กำลังตรวจการบ้านเขียนตอบของวอลนัท (8 ขวบ ป.4) วิชา "+l.subject+
        "\nตรวจอย่างจริงใจ ไม่สปอยล์ ถ้าผิดบอกว่าผิดตรงๆ ให้คะแนน 0 หรือ 1 ต่อข้อ"+
        '\nตอบเป็น JSON เท่านั้น: {"questions":[{"score":1,"feedback":"...","model":""},...],"overall":"..."}'+
        "\nfeedback: อธิบายสั้นๆ ว่าดีหรือต้องปรับปรุงอะไร | model: เฉลยถ้าตอบผิด (ว่างได้ถ้าถูก)";
      var resW=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:800,
          system:sysWritten,
          messages:[{role:"user",content:"วิชา "+l.subject+" หัวข้อ: "+l.title+"\n\n"+wtext}]})});
      var dW=await resW.json();
      var txtW=dW.content?.[0]?.text||"{}";
      var matchW=txtW.match(/\{[\s\S]*\}/);
      if(matchW){
        var pW=JSON.parse(matchW[0]);
        writtenEvals=pW.questions||[];
        writtenOverall=pW.overall||"";
        writtenScore=writtenEvals.reduce(function(a,e){return a+(e.score||0);},0);
      }
    }catch(e){writtenScore=2;writtenEvals=[];writtenOverall="เกิดข้อผิดพลาดขณะตรวจ";}

    btn.textContent="ครูอธิบาย MCQ... (2/3)";
    // 3. MCQ explanations for wrong answers (child-friendly)
    if(wrongMcq.length>0){
      try{
        var mcqPrompt=wrongMcq.map(function(w){
          return "ข้อ"+w.qi+": "+w.q+"\nเฉลย: "+w.choices[w.correctAns];
        }).join("\n\n");
        var sysMcq="คุณคือ"+l.teacher+" อธิบายทำไมคำตอบถูกต้อง สำหรับเด็ก 8 ขวบ ภาษาง่ายๆ สนุก มีทริคช่วยจำ"+
          '\nตอบ JSON เท่านั้น: [{"qi":0,"explain":"อธิบายง่ายๆ ว่าทำไม...","trick":"ทริคจำ..."},...]';
        var resM=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:600,
            system:sysMcq,
            messages:[{role:"user",content:"วิชา "+l.subject+"\n\n"+mcqPrompt}]})});
        var dM=await resM.json();
        var txtM=dM.content?.[0]?.text||"[]";
        var matchM=txtM.match(/\[[\s\S]*\]/);
        if(matchM) mcqExplains=JSON.parse(matchM[0]);
      }catch(e){mcqExplains=[];}
    }

    btn.textContent="Dr.Aim วิเคราะห์... (3/3)";
    // 4. Dr.Aim honest evaluation
    try{
      var total=mcqScore+writtenScore;
      var pct=Math.round(total/20*100);
      var wrongList=wrongMcq.map(function(w){return "ข้อ"+(w.qi+1)+": "+w.q+" (ตอบ: "+(w.userAns!==null?w.choices[w.userAns]:"ไม่ได้ตอบ")+")"}).join(", ");
      var writtenSummary=writtenEvals.map(function(e,i){return "ข้อ"+(i+1)+": "+e.score+"/1 — "+e.feedback;}).join("\n");
      var aimPrompt="คุณคือ Dr.Aim นักวิเคราะห์วิชาการเด็กของ Walnut Learning\n"+
        "วิเคราะห์ผลการบ้านของวอลนัท (8 ขวบ ป.4) อย่างจริงใจ ไม่กั๊ก ไม่สปอยล์\n"+
        "ถ้าไม่ดีต้องบอกตรงๆ ว่าไม่ดี เพราะอะไร เพื่อให้ปรับปรุงได้จริง\n\n"+
        "Format ที่ต้องการ:\n"+
        "ย่อหน้า 1: ภาพรวม (คะแนนเป็นยังไง แข็งแกร่งหรืออ่อนตรงไหน)\n"+
        "ย่อหน้า 2: Pattern ที่เห็น (ข้อผิดมีรูปแบบไหม เข้าใจผิดเรื่องอะไร)\n\n"+
        "✅ จุดแข็ง\n• (bullet points จริงๆ)\n\n"+
        "🔴 จุดที่ต้องพัฒนา (จริงๆ ไม่กลัว)\n• (bullet points)\n\n"+
        "💡 Dr.Aim แนะนำ\n• (action items ที่ทำได้จริง)";
      var aimContext="วิชา: "+l.subject+" | หัวข้อ: "+l.title+"\n"+
        "MCQ: "+mcqScore+"/15 | Written: "+writtenScore+"/5 | รวม: "+total+"/20 ("+pct+"%)\n"+
        "MCQ ที่ผิด: "+(wrongList||"ถูกทั้งหมด 🎉")+"\n"+
        "ผลข้อเขียน:\n"+writtenSummary+"\n"+
        "ความเห็นครู: "+writtenOverall;
      var resA=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:700,
          system:aimPrompt,
          messages:[{role:"user",content:aimContext}]})});
      var dA=await resA.json();
      drAimEval=dA.content?.[0]?.text||"ไม่สามารถวิเคราะห์ได้";
    }catch(e){drAimEval="เกิดข้อผิดพลาดขณะวิเคราะห์";}
  } else {
    writtenScore=2;
    writtenOverall="ใส่ Claude API Key เพื่อรับการตรวจแบบละเอียดนะคะ";
    drAimEval="ใส่ Claude API Key เพื่อรับการวิเคราะห์จาก Dr.Aim นะคะ";
  }

  var total=mcqScore+writtenScore;
  var st={
    submitted:true, lessonId:l.id,
    mcqAnswers:hwMcqAnswers, writtenAnswers:hwWrittenAnswers,
    mcqScore, writtenScore, score:total,
    mcqExplains, writtenEvals, writtenOverall, drAimEval,
    submittedAt:new Date().toISOString()
  };
  saveHwState(l.id,st);
  showHwResult(st);
  btn.textContent="✅ ส่งแล้ว"; btn.disabled=true;
  btn.className="w-full bg-green-400 text-white py-3 rounded-2xl font-bold cursor-not-allowed";
  document.getElementById("hw-result").scrollIntoView({behavior:"smooth"});
  // sync task state
  syncLessonTasks();
}

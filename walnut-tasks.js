// ── LOCAL TASK & SCHEDULE STORAGE ────────────────────────
function getSchedule(){return JSON.parse(localStorage.getItem("walnut_sch")||JSON.stringify(DEFAULT_SCHEDULE));}
function saveSchedule(s){localStorage.setItem("walnut_sch",JSON.stringify(s));}
function getLocalTasks(){return JSON.parse(localStorage.getItem("walnut_tasks")||"[]");}
function saveLocalTasks(ts){localStorage.setItem("walnut_tasks",JSON.stringify(ts));}
function getFriday(){var d=new Date();var diff=(5-d.getDay()+7)%7||7;d.setDate(d.getDate()+diff);return d.toISOString().slice(0,10);}
function getSaturday(){var d=new Date();var diff=(6-d.getDay()+7)%7||7;d.setDate(d.getDate()+diff);return d.toISOString().slice(0,10);}

function syncLessonTasks(){
  var ts=getLocalTasks();var changed=false;
  LESSONS.forEach(function(l){
    var music=l.id.startsWith("sing")||l.id.startsWith("piano");
    var due=music?getSaturday():getFriday();
    var existing=ts.find(function(t){return t.lessonId===l.id;});
    var hwDone=getHwState(l.id).submitted;
    if(!existing){
      ts.push({id:"lt-"+l.id,lessonId:l.id,title:"📝 การบ้าน"+l.subject,
        subject:l.subject,icon:l.icon,badge:l.badge,type:"lesson",
        status:hwDone?"done":"pending",due:due});
      changed=true;
    } else if(hwDone&&existing.status!=="done"){
      existing.status="done";changed=true;
    }
  });
  if(changed)saveLocalTasks(ts);
}

function toggleLocalTask(id){
  var ts=getLocalTasks();
  var t=ts.find(function(x){return x.id===id;});
  if(t){t.status=t.status==="done"?"pending":"done";saveLocalTasks(ts);}
  switchTab("tasks");
}
function deleteLocalTask(id){
  saveLocalTasks(getLocalTasks().filter(function(t){return t.id!==id;}));
  switchTab("tasks");
}
function openAddTask(){
  var title=prompt("ชื่อ Task:");if(!title)return;
  var due=prompt("วันครบกำหนด (YYYY-MM-DD):",getFriday())||getFriday();
  var ts=getLocalTasks();
  ts.push({id:"m-"+Date.now(),title:title,subject:"ทั่วไป",icon:"📌",
    badge:"bg-gray-100 text-gray-600",type:"manual",status:"pending",due:due});
  saveLocalTasks(ts);switchTab("tasks");
}
function setTaskFilter(f,btn){
  taskFilter=f;
  document.querySelectorAll(".task-f").forEach(function(el){
    el.className="task-f px-3 py-1.5 rounded-lg text-xs font-medium transition-colors "+
      (el.dataset.f===f?"bg-amber-400 text-white":"bg-gray-100 text-gray-500");
  });
  var all=getLocalTasks();
  var shown=f==="done"?all.filter(function(t){return t.status==="done";}):
             f==="pending"?all.filter(function(t){return t.status!=="done";}):all;
  document.getElementById("task-list-inner").innerHTML=renderTaskList(shown);
}

// ── TASK LIST RENDER ──────────────────────────────────────
function renderTaskList(ts){
  if(!ts.length) return '<div class="text-center text-gray-300 py-8 text-sm">ไม่มี Task ในหมวดนี้</div>';
  var groups={overdue:[],today:[],week:[],needsRetake:[],done:[]};
  ts.forEach(function(t){
    if(t.status==="done"){
      // check if needs retake
      var hw=t.lessonId?getHwState(t.lessonId):null;
      var hwPct=hw&&hw.submitted?Math.round((hw.score||0)/20*100):100;
      if(hw&&hw.submitted&&hwPct<RETAKE_THRESHOLD) groups.needsRetake.push(t);
      else groups.done.push(t);
    } else if(t.due<TODAY) groups.overdue.push(t);
    else if(t.due===TODAY) groups.today.push(t);
    else groups.week.push(t);
  });

  function renderGroup(label,color,items){
    if(!items.length)return "";
    return '<div class="mb-4"><div class="text-xs font-bold '+color+' mb-2">'+label+'</div>'+
      items.map(function(t){
        var hw=t.lessonId?getHwState(t.lessonId):null;
        var hwSubmitted=hw&&hw.submitted;
        var hwPct=hwSubmitted?Math.round((hw.score||0)/20*100):0;
        var needsRetake=hwSubmitted&&hwPct<RETAKE_THRESHOLD;
        var retakeCount=hw&&hw.retakeCount?hw.retakeCount:0;
        var actionBtn="";
        if(t.type==="lesson"){
          if(hwSubmitted){
            if(needsRetake){
              actionBtn='<div class="flex flex-col items-end gap-1 shrink-0">'+
                '<button onclick="openHw(\''+t.lessonId+'\')" class="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded-lg text-xs font-semibold">📊 ดูผล '+(hw.score||0)+'/20</button>'+
                '<button onclick="retakeHw(\''+t.lessonId+'\')" class="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">🔄 ทำใหม่</button>'+
                (retakeCount?'<div class="text-xs text-gray-400 text-right">ทำมา '+retakeCount+'×</div>':'')+
              '</div>';
            } else {
              actionBtn='<button onclick="openHw(\''+t.lessonId+'\')" class="shrink-0 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold">'+
                '📊 ดูผล '+(hw.score||0)+'/20'+(retakeCount?' (×'+retakeCount+')'  :'')+
              '</button>';
            }
          } else {
            actionBtn='<button onclick="openHw(\''+t.lessonId+'\')" class="shrink-0 bg-amber-400 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">'+
              '📝 ทำเลย</button>';
          }
        }
        var cardBg=needsRetake?"border-red-200 bg-red-50":"border-transparent hover:bg-amber-50";
        return '<div class="flex items-center gap-3 p-3 rounded-xl border '+cardBg+' transition-colors mb-1">'+
          '<button onclick="toggleLocalTask(\''+t.id+'\')" '+
            'class="w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold transition-colors '+
            (t.status==="done"?(needsRetake?"bg-red-200 border-red-300 text-red-600":"bg-green-400 border-green-400 text-white"):"border-gray-300 hover:border-amber-400 text-transparent")+'">'+
            (t.status==="done"?(needsRetake?"!":"✓"):"✓")+'</button>'+
          '<span class="text-base">'+t.icon+'</span>'+
          '<div class="flex-1 min-w-0">'+
            '<div class="text-sm font-medium '+(t.status==="done"&&!needsRetake?"line-through text-gray-300":"text-gray-800")+' truncate">'+t.title+'</div>'+
            '<div class="flex items-center gap-2 mt-0.5">'+
              '<span class="status-badge '+t.badge+'">'+t.subject+'</span>'+
              '<span class="text-xs text-gray-400">'+t.due+'</span>'+
            '</div>'+
          '</div>'+
          actionBtn+
          (t.type==="manual"?'<button onclick="deleteLocalTask(\''+t.id+'\')" class="text-gray-300 hover:text-red-400 text-lg transition-colors ml-1 shrink-0">×</button>':'')+
        '</div>';
      }).join("")+
    '</div>';
  }

  return renderGroup("⚠️ ค้างจากที่แล้ว","text-red-400",groups.overdue)+
         renderGroup("📌 วันนี้","text-amber-600",groups.today)+
         renderGroup("📅 สัปดาห์นี้","text-gray-500",groups.week)+
         renderGroup("🔄 ต้องทำใหม่ (คะแนนต่ำกว่า "+RETAKE_THRESHOLD+"%)","text-red-500",groups.needsRetake)+
         renderGroup("✅ เสร็จแล้ว","text-green-500",groups.done);
}

// ── TASKS TAB RENDER ──────────────────────────────────────
function renderTasks(){
  syncLessonTasks();
  var all=getLocalTasks();
  var shown=taskFilter==="done"?all.filter(function(t){return t.status==="done";}):
             taskFilter==="pending"?all.filter(function(t){return t.status!=="done";}):all;
  var doneLessons=LESSONS.filter(function(l){return getHwState(l.id).submitted;}).length;
  var allDone=doneLessons===LESSONS.length;
  var sch=getSchedule();
  var dayKeys=["mon","tue","wed","thu","fri"];
  var dayNames={mon:"จ.",tue:"อ.",wed:"พ.",thu:"พฤ.",fri:"ศ."};

  var scheduleRows=(function(){
    var rows="";
    for(var p=0;p<5;p++){
      rows+="<tr>";
      dayKeys.forEach(function(d){
        var sub=(sch[d]&&sch[d][p])||"";
        var color=sub.includes("คณิต")?"bg-orange-50 text-orange-700":
          sub.includes("ไทย")?"bg-yellow-50 text-yellow-700":
          sub.includes("อังกฤษ")?"bg-indigo-50 text-indigo-700":
          sub.includes("วิทย์")?"bg-cyan-50 text-cyan-700":
          sub.includes("ดนตรี")?"bg-rose-50 text-rose-700":"bg-gray-50 text-gray-500";
        rows+='<td class="px-0.5 py-0.5"><div class="'+color+' rounded px-1 py-0.5 text-center text-xs truncate">'+sub+'</div></td>';
      });
      rows+="</tr>";
    }
    return rows;
  })();

  return '<div class="bg-white rounded-b-2xl border border-t-0 border-gray-100 p-5 space-y-4">'+
    // Progress
    '<div class="bg-amber-50 border border-amber-200 rounded-2xl p-4">'+
      '<div class="flex items-center justify-between mb-2">'+
        '<span class="text-sm font-bold text-amber-800">ความคืบหน้าสัปดาห์นี้</span>'+
        '<span class="text-sm font-bold text-amber-600">'+doneLessons+'/'+LESSONS.length+' วิชา</span>'+
      '</div>'+
      '<div class="bg-amber-100 rounded-full h-3"><div class="bg-amber-400 h-3 rounded-full transition-all" style="width:'+Math.round(doneLessons/LESSONS.length*100)+'%"></div></div>'+
      (allDone?
        '<div class="mt-3 flex items-center justify-between">'+
          '<span class="text-green-600 font-semibold text-sm">🎉 ครบทุกวิชาแล้ว!</span>'+
          '<button onclick="openCreativeSurvey()" class="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-xl text-sm font-semibold">ตอบแบบสอบถามพัฒนาการ →</button>'+
        '</div>':'')+
    '</div>'+
    // Team analysis
    '<div class="border border-blue-100 rounded-2xl p-4 bg-blue-50">'+
      '<div class="flex items-center justify-between mb-3">'+
        '<div class="flex items-center gap-2"><span class="text-lg">📊</span><span class="font-bold text-sm text-blue-800">Dr.Aim + Tangmo — แผนสัปดาห์นี้</span></div>'+
        '<button onclick="openTeacher(\'dr-aim\')" class="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">คุย Dr.Aim</button>'+
      '</div>'+
      '<div class="space-y-2 text-sm">'+
        '<div class="flex gap-2"><span class="text-red-500 shrink-0">🔴</span><span><strong>Priority 1 — คณิต:</strong> เรียนทุกวัน → ฝึกโจทย์ปัญหา 20 นาทีหลังเลิกโรงเรียน</span></div>'+
        '<div class="flex gap-2"><span class="text-yellow-500 shrink-0">🟡</span><span><strong>Priority 2 — ไทย+อังกฤษ:</strong> สลับกัน วันคู่ไทย วันคี่อังกฤษ 15 นาที</span></div>'+
        '<div class="flex gap-2"><span class="text-cyan-500 shrink-0">🔵</span><span><strong>วิทย์:</strong> อาทิตย์ละ 2 ครั้ง ทำ experiment เสริมที่บ้าน</span></div>'+
        '<div class="flex gap-2"><span class="text-green-500 shrink-0">🟢</span><span><strong>ดนตรี:</strong> ซ้อมทุกเย็น เปียโน 15 นาที + ร้องเพลง warm-up 10 นาที</span></div>'+
      '</div>'+
    '</div>'+
    // School schedule
    '<div class="border border-gray-100 rounded-2xl p-4">'+
      '<div class="flex items-center justify-between mb-3">'+
        '<div class="flex items-center gap-2"><span>🏫</span><span class="font-bold text-sm text-gray-800">ตารางเรียนโรงเรียน</span></div>'+
        '<div class="flex gap-2">'+
          '<button onclick="openCalendar()" class="text-xs bg-amber-400 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg font-semibold">📅 ปฏิทินเต็ม</button>'+
          '<button onclick="openScheduleEdit()" class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg">✏️ แก้ไข</button>'+
        '</div>'+
      '</div>'+
      '<div class="overflow-x-auto"><table class="w-full text-xs">'+
        '<tr>'+dayKeys.map(function(d){return '<th class="pb-1 text-gray-400 font-semibold text-center">'+dayNames[d]+'</th>';}).join('')+'</tr>'+
        scheduleRows+
      '</table></div>'+
    '</div>'+
    // Task list
    '<div>'+
      '<div class="flex items-center justify-between mb-3">'+
        '<div class="flex gap-1.5">'+
          ['all','pending','done'].map(function(f){
            var counts={all:all.length,pending:all.filter(function(t){return t.status!=='done';}).length,done:all.filter(function(t){return t.status==='done';}).length};
            var labels={all:'ทั้งหมด',pending:'รอทำ',done:'เสร็จ'};
            return '<button onclick="setTaskFilter(\''+f+'\',this)" data-f="'+f+'" '+
              'class="task-f px-3 py-1.5 rounded-lg text-xs font-medium transition-colors '+
              (taskFilter===f?'bg-amber-400 text-white':'bg-gray-100 text-gray-500')+'">'+
              labels[f]+' ('+counts[f]+')</button>';
          }).join("")+
        '</div>'+
        '<button onclick="openAddTask()" class="bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-semibold">+ เพิ่ม Task</button>'+
      '</div>'+
      '<div id="task-list-inner">'+renderTaskList(shown)+'</div>'+
    '</div>'+
  '</div>';
}

// ── CREATIVE SURVEY ───────────────────────────────────────
function openCreativeSurvey(){
  var saved=JSON.parse(localStorage.getItem("walnut_survey_w1")||"{}");
  if(saved.submitted){
    ["sq1","sq2","sq3","sq4","sq5"].forEach(function(id,i){
      var el=document.getElementById(id);if(el)el.value=saved.answers[i]||"";
    });
    if(saved.feedback){
      var r=document.getElementById("survey-result");
      r.classList.remove("hidden");
      r.innerHTML='<div class="text-xs font-bold text-pink-700 mb-2">🌸 Tangmo วิเคราะห์</div>'+
        '<div class="text-sm text-gray-700 whitespace-pre-wrap">'+saved.feedback+'</div>';
    }
    var btn=document.getElementById("survey-btn");
    btn.textContent="ส่งแล้ว ✅";btn.disabled=true;
    btn.className="w-full mt-5 bg-green-400 text-white py-3 rounded-2xl font-bold cursor-not-allowed";
  }
  document.getElementById("survey-modal").classList.remove("hidden");
}
async function submitCreativeSurvey(){
  var answers=["sq1","sq2","sq3","sq4","sq5"].map(function(id){
    var el=document.getElementById(id);return el?el.value.trim():"";
  });
  var btn=document.getElementById("survey-btn");
  btn.textContent="Tangmo กำลังวิเคราะห์...";btn.disabled=true;
  var feedback="(ไม่ได้เชื่อมต่อ Claude — บันทึกคำตอบแล้ว)";
  if(CFG.claude){
    try{
      var qs=["ไอเดียใหม่สัปดาห์นี้","เพลงที่อยากแต่ง","สิ่งที่สนุกที่สุด","อยากเรียนรู้เพิ่ม","สิ่งที่จินตนาการ"];
      var body=qs.map(function(q,i){return "คำถาม: "+q+"\nคำตอบวอลนัท: "+(answers[i]||"(ไม่ได้ตอบ)");}).join("\n\n");
      var res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:600,
          system:"คุณคือ Tangmo หัวหน้าแผนก Walnut Learning วิเคราะห์พัฒนาการจินตนาการและความคิดสร้างสรรค์ของวอลนัท (8 ขวบ) ตอบภาษาไทย อบอุ่น 3-4 ย่อหน้า เน้น insight ที่น่าสนใจ + แนะนำกิจกรรมเสริม",
          messages:[{role:"user",content:body}]})});
      var d=await res.json();
      feedback=d.content?.[0]?.text||feedback;
    }catch(e){feedback="เกิดข้อผิดพลาด: "+e.message;}
  }
  localStorage.setItem("walnut_survey_w1",JSON.stringify({submitted:true,answers:answers,feedback:feedback}));
  var r=document.getElementById("survey-result");
  r.classList.remove("hidden");
  r.innerHTML='<div class="text-xs font-bold text-pink-700 mb-2">🌸 Tangmo วิเคราะห์</div>'+
    '<div class="text-sm text-gray-700 whitespace-pre-wrap">'+feedback+'</div>';
  btn.textContent="ส่งแล้ว ✅";
  btn.className="w-full mt-5 bg-green-400 text-white py-3 rounded-2xl font-bold cursor-not-allowed";
}

// ── SCHEDULE EDIT ─────────────────────────────────────────
function openScheduleEdit(){
  var sch=getSchedule();
  var days=["mon","tue","wed","thu","fri"];
  var dayLabels={mon:"วันจันทร์",tue:"วันอังคาร",wed:"วันพุธ",thu:"วันพฤหัส",fri:"วันศุกร์"};
  var grid=document.getElementById("sch-edit-grid");
  grid.innerHTML=days.map(function(d){
    return '<div><div class="text-xs font-bold text-gray-600 mb-1">'+dayLabels[d]+'</div>'+
      '<div class="grid grid-cols-5 gap-1">'+
      [0,1,2,3,4].map(function(p){
        return '<input type="text" data-day="'+d+'" data-p="'+p+'" value="'+((sch[d]&&sch[d][p])||"")+'" '+
          'placeholder="คาบ '+(p+1)+'" class="border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-amber-400">';
      }).join("")+
    '</div></div>';
  }).join("");
  document.getElementById("sch-modal").classList.remove("hidden");
}
function saveScheduleEdit(){
  var sch={mon:[],tue:[],wed:[],thu:[],fri:[]};
  document.querySelectorAll("#sch-edit-grid input").forEach(function(inp){
    sch[inp.dataset.day][parseInt(inp.dataset.p)]=inp.value.trim();
  });
  saveSchedule(sch);
  document.getElementById("sch-modal").classList.add("hidden");
  switchTab("tasks");
}

// ── CALENDAR ──────────────────────────────────────────────
var calWeekOffset=0;
var CAL_HOURS=["06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21"];
var CAL_DAYS=["จ","อ","พ","พฤ","ศ","ส","อา"];
var CAL_TYPES={
  school:  {icon:"🏫",label:"โรงเรียน",       bg:"bg-blue-100",   tx:"text-blue-800",   bd:"border-blue-300"},
  piano:   {icon:"🎹",label:"เปียโน",           bg:"bg-violet-100", tx:"text-violet-800", bd:"border-violet-300"},
  singing: {icon:"🎤",label:"ร้องเพลง",        bg:"bg-rose-100",   tx:"text-rose-800",   bd:"border-rose-300"},
  pages:   {icon:"📱",label:"Pages/Influencer", bg:"bg-orange-100", tx:"text-orange-800", bd:"border-orange-300"},
  learning:{icon:"📚",label:"เรียนเสริม",      bg:"bg-amber-100",  tx:"text-amber-800",  bd:"border-amber-300"},
  other:   {icon:"🎯",label:"กิจกรรม",         bg:"bg-green-100",  tx:"text-green-800",  bd:"border-green-300"},
};
function getCalEvents(){return JSON.parse(localStorage.getItem("walnut_events")||"[]");}
function saveCalEvents(e){localStorage.setItem("walnut_events",JSON.stringify(e));}

function getWeekDates(offset){
  var d=new Date();d.setHours(0,0,0,0);
  var day=d.getDay();var diff=day===0?-6:1-day;
  d.setDate(d.getDate()+diff+offset*7);
  var dates=[];
  for(var i=0;i<7;i++){var dd=new Date(d);dd.setDate(d.getDate()+i);dates.push(dd);}
  return dates;
}
function dStr(d){return d.toISOString().slice(0,10);}

function openCalendar(){
  calWeekOffset=0;
  document.getElementById("cal-modal").classList.remove("hidden");
  renderCalendar();
}
function closeCalendar(){document.getElementById("cal-modal").classList.add("hidden");}

function renderCalendar(){
  var dates=getWeekDates(calWeekOffset);
  var d0=dates[0],d6=dates[6];
  var fmt={day:"numeric",month:"short"};
  var label=d0.toLocaleDateString("th-TH",fmt)+" – "+d6.toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"2-digit"});
  var events=getCalEvents();

  function getEventsForSlot(dateStr,dow,h){
    return events.filter(function(e){
      var onDay=e.recurring?(e.recurringDay===dow):(e.date===dateStr);
      return onDay&&e.startTime&&e.startTime.slice(0,2)===h;
    });
  }

  var html='<div class="flex items-center justify-between px-4 py-3 bg-amber-50 border-b rounded-t-2xl">'+
    '<button onclick="calWeekOffset--;renderCalendar()" class="text-amber-600 hover:bg-amber-100 px-3 py-1.5 rounded-lg text-sm font-semibold">← ก่อน</button>'+
    '<span class="font-bold text-sm text-gray-800">'+label+'</span>'+
    '<button onclick="calWeekOffset++;renderCalendar()" class="text-amber-600 hover:bg-amber-100 px-3 py-1.5 rounded-lg text-sm font-semibold">ถัดไป →</button>'+
  '</div>'+
  '<div class="overflow-x-auto"><table class="w-full text-xs border-collapse" style="min-width:560px">'+
  '<tr class="bg-gray-50 border-b">';
  html+='<th class="w-12 px-2 py-2 text-gray-400 font-semibold border-r">เวลา</th>';
  dates.forEach(function(d,i){
    var isToday=dStr(d)===TODAY;
    html+='<th class="px-1 py-2 text-center '+(isToday?"bg-amber-100":"")+'">'+
      '<div class="font-bold '+(isToday?"text-amber-700":"text-gray-600")+'">'+CAL_DAYS[i]+'</div>'+
      '<div class="text-gray-400 font-normal">'+d.getDate()+'/'+('0'+(d.getMonth()+1)).slice(-2)+'</div>'+
    '</th>';
  });
  html+='</tr>';

  CAL_HOURS.forEach(function(h){
    html+='<tr class="border-b">';
    html+='<td class="px-2 py-1 text-gray-400 border-r text-center font-medium bg-gray-50">'+h+'</td>';
    dates.forEach(function(d,di){
      var dow=(di+1)%7; // 0=Sun..6=Sat, di=0→Mon=1
      var dateStr=dStr(d);
      var slotEvts=getEventsForSlot(dateStr,dow,h);
      html+='<td class="px-0.5 py-0.5 align-top cursor-pointer hover:bg-amber-50 transition" '+
        'onclick="openAddEvent(\''+dateStr+'\',\''+h+':00\','+dow+')" style="min-height:28px">';
      slotEvts.forEach(function(e){
        var tp=CAL_TYPES[e.type]||CAL_TYPES.other;
        html+='<div class="'+tp.bg+' '+tp.tx+' border '+tp.bd+' rounded px-1 py-0.5 mb-0.5 text-xs leading-tight cursor-pointer" '+
          'onclick="event.stopPropagation();deleteCalEvent(\''+e.id+'\')">'+
          tp.icon+' '+e.title+'<span class="opacity-60 ml-0.5">'+e.startTime.slice(0,5)+'</span>'+
        '</div>';
      });
      html+='</td>';
    });
    html+='</tr>';
  });
  html+='</table></div>'+
  '<div class="p-3 border-t bg-gray-50 rounded-b-2xl flex flex-wrap gap-2 text-xs">'+
    Object.entries(CAL_TYPES).map(function(kv){
      return '<span class="'+kv[1].bg+' '+kv[1].tx+' border '+kv[1].bd+' px-2 py-0.5 rounded-full">'+kv[1].icon+' '+kv[1].label+'</span>';
    }).join("")+
  '</div>';

  document.getElementById("cal-content").innerHTML=html;
}

function openAddEvent(dateStr,time,dow){
  document.getElementById("ev-date").value=dateStr;
  document.getElementById("ev-start").value=time;
  var endH=String(parseInt(time.slice(0,2))+1).padStart(2,"0");
  document.getElementById("ev-end").value=endH+":00";
  document.getElementById("ev-title").value="";
  document.getElementById("ev-type").value="school";
  document.getElementById("ev-recurring").checked=false;
  document.getElementById("add-event-modal").classList.remove("hidden");
}
function saveNewEvent(){
  var title=document.getElementById("ev-title").value.trim();
  if(!title){alert("ใส่ชื่อกิจกรรมด้วยนะ");return;}
  var recurring=document.getElementById("ev-recurring").checked;
  var dateStr=document.getElementById("ev-date").value;
  var d=new Date(dateStr+"T12:00:00");
  var evt={
    id:"ev_"+Date.now(),
    title:title,
    type:document.getElementById("ev-type").value,
    startTime:document.getElementById("ev-start").value,
    endTime:document.getElementById("ev-end").value,
    recurring:recurring,
  };
  if(recurring) evt.recurringDay=d.getDay();
  else evt.date=dateStr;
  var evts=getCalEvents();evts.push(evt);saveCalEvents(evts);
  document.getElementById("add-event-modal").classList.add("hidden");
  renderCalendar();
}
function deleteCalEvent(id){
  var evts=getCalEvents();
  var e=evts.find(function(x){return x.id===id;});
  if(!e)return;
  if(!confirm("ลบ: "+e.title+(e.recurring?" (ซ้ำทุกสัปดาห์)":"")+"\nต้องการลบใช่มั้ย?"))return;
  saveCalEvents(evts.filter(function(x){return x.id!==id;}));
  renderCalendar();
}

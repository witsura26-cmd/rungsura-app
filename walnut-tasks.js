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
      ts.push({id:"lt-"+l.id,lessonId:l.id,title:"📝 การบ้าน"+l.subject+" W"+l.week,
        subject:l.subject,icon:l.icon,badge:l.badge,type:"lesson",week:l.week||1,
        status:hwDone?"done":"pending",due:due});
      changed=true;
    } else {
      // อัปเดต week และ title ถ้ายังไม่มี
      if(!existing.week){ existing.week=l.week||1; existing.title="📝 การบ้าน"+l.subject+" W"+l.week; changed=true; }
      if(hwDone&&existing.status!=="done"){ existing.status="done"; changed=true; }
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
  syncLessonTasks(); // sync ก่อนเสมอเพื่อให้ task status ถูกต้อง
  var all=getLocalTasks();
  if(!all.length){ syncLessonTasks(); all=getLocalTasks(); } // safeguard
  var shown=f==="done"?all.filter(function(t){return t.status==="done";}):
             f==="pending"?all.filter(function(t){return t.status!=="done";}):all;
  var inner=document.getElementById("task-list-inner");
  if(inner) inner.innerHTML=renderTaskList(shown);
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
              (t.week?'<span class="status-badge bg-amber-100 text-amber-700">W'+t.week+'</span>':'')+
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
      r.innerHTML='<div class="text-xs font-bold text-pink-700 mb-2">🌸 Rose วิเคราะห์</div>'+
        '<div class="text-sm text-gray-700 whitespace-pre-wrap">'+saved.feedback+'</div>';
    }
    var btn=document.getElementById("survey-btn");
    btn.textContent="ส่งแล้ว ✅";btn.disabled=true;
    btn.className="w-full mt-5 bg-green-400 text-white py-3 rounded-2xl font-bold cursor-not-allowed";
    // แสดงปุ่มล้างคำตอบ (สำหรับทดสอบหรือให้วอลนัทตอบใหม่)
    var resetBtn=document.getElementById("survey-reset-btn");
    if(resetBtn) resetBtn.classList.remove("hidden");
  }
  document.getElementById("survey-modal").classList.remove("hidden");
}
function resetCreativeSurvey(){
  if(!confirm("ล้างคำตอบทั้งหมดเพื่อให้วอลนัทตอบใหม่?")) return;
  localStorage.removeItem("walnut_survey_w1");
  ["sq1","sq2","sq3","sq4","sq5"].forEach(function(id){
    var el=document.getElementById(id);if(el)el.value="";
  });
  var r=document.getElementById("survey-result");if(r)r.classList.add("hidden");
  var btn=document.getElementById("survey-btn");
  if(btn){btn.textContent="ส่งให้ Rose วิเคราะห์ →";btn.disabled=false;
    btn.className="w-full mt-5 bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-2xl font-bold text-base";}
  var resetBtn=document.getElementById("survey-reset-btn");
  if(resetBtn) resetBtn.classList.add("hidden");
}
async function submitCreativeSurvey(){
  var answers=["sq1","sq2","sq3","sq4","sq5"].map(function(id){
    var el=document.getElementById(id);return el?el.value.trim():"";
  });
  var btn=document.getElementById("survey-btn");
  btn.textContent="Rose กำลังวิเคราะห์...";btn.disabled=true;
  var feedback="(ไม่ได้เชื่อมต่อ Claude — บันทึกคำตอบแล้ว)";
  if(CFG.claude){
    try{
      var qs=["ไอเดียใหม่สัปดาห์นี้","เพลงที่อยากแต่ง","สิ่งที่สนุกที่สุด","อยากเรียนรู้เพิ่ม","สิ่งที่จินตนาการ"];
      var body=qs.map(function(q,i){return "คำถาม: "+q+"\nคำตอบวอลนัท: "+(answers[i]||"(ไม่ได้ตอบ)");}).join("\n\n");
      var res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:600,
          system:"คุณคือ Rose หัวหน้าแผนก Walnut Learning วิเคราะห์พัฒนาการจินตนาการและความคิดสร้างสรรค์ของวอลนัท (8 ขวบ) ตอบภาษาไทย อบอุ่น 3-4 ย่อหน้า เน้น insight ที่น่าสนใจ + แนะนำกิจกรรมเสริม",
          messages:[{role:"user",content:body}]})});
      var d=await res.json();
      feedback=d.content?.[0]?.text||feedback;
    }catch(e){feedback="เกิดข้อผิดพลาด: "+e.message;}
  }
  localStorage.setItem("walnut_survey_w1",JSON.stringify({submitted:true,answers:answers,feedback:feedback}));
  var r=document.getElementById("survey-result");
  r.classList.remove("hidden");
  r.innerHTML='<div class="text-xs font-bold text-pink-700 mb-2">🌸 Rose วิเคราะห์</div>'+
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
var CAL_START=6, CAL_END=22; // 06:00–22:00
var CAL_DAYS_TH=["จ","อ","พ","พฤ","ศ","ส","อา"];
var CAL_TYPES={
  school:  {icon:"🏫",label:"โรงเรียน",        bg:"#dbeafe",tx:"#1e40af",bd:"#93c5fd"},
  piano:   {icon:"🎹",label:"เปียโน",            bg:"#ede9fe",tx:"#5b21b6",bd:"#c4b5fd"},
  singing: {icon:"🎤",label:"ร้องเพลง",         bg:"#ffe4e6",tx:"#9f1239",bd:"#fca5a5"},
  pages:   {icon:"📱",label:"Pages/Influencer",  bg:"#ffedd5",tx:"#9a3412",bd:"#fdba74"},
  learning:{icon:"📚",label:"เรียนเสริม",       bg:"#fef3c7",tx:"#92400e",bd:"#fcd34d"},
  other:   {icon:"🎯",label:"กิจกรรม",          bg:"#dcfce7",tx:"#166534",bd:"#86efac"},
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

// openCalendar → calendar is always visible at top, just scroll up
function openCalendar(){ window.scrollTo({top:0,behavior:"smooth"}); }
function closeCalendar(){}

function timeToFrac(t){ // "HH:MM" → fraction of CAL range
  var h=parseInt(t.slice(0,2)),m=parseInt(t.slice(3,5));
  return Math.max(0,Math.min(1,(h+m/60-CAL_START)/(CAL_END-CAL_START)));
}
function fracToTime(f){ // fraction → "HH:MM"
  var total=CAL_START+f*(CAL_END-CAL_START);
  var h=Math.floor(total);
  var m=Math.round((total-h)*60/30)*30;
  if(m>=60){h++;m=0;}
  return String(h).padStart(2,"0")+":"+String(m).padStart(2,"0");
}
function eventOnDay(e,dateStr,dow){
  if(e.days&&e.days.includes(dow)) return true;
  if(e.recurring&&e.recurringDay===dow) return true; // backward compat
  if(e.date===dateStr) return true;
  return false;
}

function renderCalendar(){
  var dates=getWeekDates(calWeekOffset);
  var evts=getCalEvents();
  var totalH=CAL_END-CAL_START;
  var hours=[];
  for(var h=CAL_START;h<=CAL_END;h++) hours.push(h);

  // Week label
  var label=dates[0].toLocaleDateString("th-TH",{day:"numeric",month:"short"})+" – "+
    dates[6].toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"2-digit"});

  // Time ruler
  var ruler='<div style="display:flex;margin-left:56px;position:relative;height:20px;overflow:hidden">';
  hours.forEach(function(h){
    var pct=((h-CAL_START)/totalH*100).toFixed(2);
    ruler+='<div style="position:absolute;left:'+pct+'%;transform:translateX(-50%);font-size:10px;color:#9ca3af;white-space:nowrap">'+String(h).padStart(2,"0")+'</div>';
  });
  ruler+='</div>';

  // Day rows
  var rows="";
  dates.forEach(function(d,di){
    var dow=(di+1)%7;
    var dateStr=dStr(d);
    var isToday=dateStr===TODAY;
    var dayEvts=evts.filter(function(e){return eventOnDay(e,dateStr,dow);})
      .sort(function(a,b){return a.startTime.localeCompare(b.startTime);});

    // Track vertical lanes for overlap
    var lanes=[];
    var evtLanes=dayEvts.map(function(e){
      var s=timeToFrac(e.startTime||"06:00");
      var en=timeToFrac(e.endTime||"07:00");
      for(var lane=0;lane<20;lane++){
        if(!lanes[lane]||lanes[lane]<=s){lanes[lane]=en;return lane;}
      }
      return 0;
    });
    var nLanes=Math.max(1,lanes.length);
    var rowH=Math.max(44,nLanes*26);

    // Grid lines
    var gridLines='';
    hours.forEach(function(h){
      var pct=((h-CAL_START)/totalH*100).toFixed(2);
      gridLines+='<div style="position:absolute;left:'+pct+'%;top:0;bottom:0;width:1px;background:#f3f4f6;pointer-events:none"></div>';
    });
    // Half-hour lines
    hours.forEach(function(h){
      var pct=((h-CAL_START+0.5)/totalH*100).toFixed(2);
      gridLines+='<div style="position:absolute;left:'+pct+'%;top:0;bottom:0;width:1px;background:#fafafa;pointer-events:none"></div>';
    });

    // Event bars
    var bars=dayEvts.map(function(e,i){
      var tp=CAL_TYPES[e.type]||CAL_TYPES.other;
      var sf=timeToFrac(e.startTime||"06:00");
      var ef=timeToFrac(e.endTime||"07:00");
      var w=Math.max(0.004,ef-sf)*100; // minimum ~4px on 1000px wide = 0.4%
      var lane=evtLanes[i]||0;
      var top=lane*26+4;
      var ht=22;
      return '<div onclick="event.stopPropagation();editCalEvent(\''+e.id+'\')" '+
        'style="position:absolute;left:'+(sf*100).toFixed(2)+'%;width:'+w.toFixed(2)+'%;top:'+top+'px;height:'+ht+'px;'+
        'background:'+tp.bg+';color:'+tp.tx+';border:1px solid '+tp.bd+';border-radius:6px;'+
        'padding:2px 6px;box-sizing:border-box;cursor:pointer;overflow:hidden;white-space:nowrap;'+
        'display:flex;align-items:center;gap:3px;font-size:11px;font-weight:600;z-index:2;">'+
        '<span>'+tp.icon+'</span>'+
        '<span style="overflow:hidden;text-overflow:ellipsis">'+e.title+'</span>'+
        '<span style="opacity:.55;font-size:10px;margin-left:auto;shrink:0">'+
          (e.startTime||"").slice(0,5)+'-'+(e.endTime||"").slice(0,5)+
        '</span>'+
      '</div>';
    }).join("");

    rows+='<div style="display:flex;border-bottom:1px solid #f3f4f6;'+(isToday?"background:#fffbeb":"")+'">'+
      '<div style="width:56px;min-width:56px;padding:0 6px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid #f3f4f6;font-size:12px">'+
        '<div style="font-weight:700;color:'+(isToday?"#b45309":"#374151")+'">'+CAL_DAYS_TH[di]+'</div>'+
        '<div style="color:#9ca3af;font-size:10px">'+d.getDate()+'/'+(d.getMonth()+1)+'</div>'+
      '</div>'+
      '<div style="flex:1;position:relative;height:'+rowH+'px;cursor:crosshair;min-width:0" '+
        'onclick="handleCalRowClick(event,\''+dateStr+'\','+dow+')">'+
        gridLines+bars+
      '</div>'+
    '</div>';
  });

  // Legend
  var legend='<div style="display:flex;flex-wrap:wrap;gap:6px;padding:10px 12px;background:#f9fafb;border-top:1px solid #f3f4f6;border-radius:0 0 16px 16px">';
  Object.entries(CAL_TYPES).forEach(function(kv){
    legend+='<span style="font-size:11px;padding:2px 8px;border-radius:20px;background:'+kv[1].bg+';color:'+kv[1].tx+';border:1px solid '+kv[1].bd+'">'+kv[1].icon+' '+kv[1].label+'</span>';
  });
  legend+='</div>';

  document.getElementById("cal-content").innerHTML=
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#fffbeb;border-bottom:1px solid #fde68a;border-radius:16px 16px 0 0">'+
      '<button onclick="calWeekOffset--;switchTab(\'calendar\')" style="color:#d97706;background:#fef3c7;border:none;padding:6px 12px;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px">← ก่อน</button>'+
      '<div style="text-align:center">'+
        '<div style="font-weight:700;font-size:14px;color:#374151">'+label+'</div>'+
        '<button onclick="calWeekOffset=0;switchTab(\'calendar\')" style="font-size:11px;color:#d97706;background:none;border:none;cursor:pointer;text-decoration:underline">สัปดาห์นี้</button>'+
      '</div>'+
      '<button onclick="calWeekOffset++;switchTab(\'calendar\')" style="color:#d97706;background:#fef3c7;border:none;padding:6px 12px;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px">ถัดไป →</button>'+
    '</div>'+
    ruler+
    '<div style="overflow-x:auto"><div style="min-width:600px">'+rows+'</div></div>'+
    legend;
}

function handleCalRowClick(ev,dateStr,dow){
  var rect=ev.currentTarget.getBoundingClientRect();
  var f=Math.max(0,Math.min(1,(ev.clientX-rect.left)/rect.width));
  var time=fracToTime(f);
  openAddEventForm(dateStr,time,dow,null);
}

function openAddEventForm(dateStr,time,dow,editId){
  var m=document.getElementById("add-event-modal");
  m.dataset.editId=editId||"";
  document.getElementById("ev-title").value="";
  document.getElementById("ev-type").value="school";
  document.getElementById("ev-start").value=time||"08:00";
  var endH=String(parseInt((time||"08:00").slice(0,2))+1).padStart(2,"0");
  document.getElementById("ev-end").value=endH+":00";
  // Day checkboxes: pre-check the clicked day
  [0,1,2,3,4,5,6].forEach(function(d){
    var cb=document.getElementById("ev-day-"+d);
    if(cb) cb.checked=(d===dow&&dow!==undefined);
  });
  document.getElementById("ev-date").value=dateStr||TODAY;
  document.getElementById("ev-delete-btn").classList.add("hidden");
  document.getElementById("ev-modal-title").textContent=editId?"✏️ แก้ไขกิจกรรม":"➕ เพิ่มกิจกรรม";
  m.classList.remove("hidden");
  setTimeout(function(){document.getElementById("ev-title").focus();},50);
}

function editCalEvent(id){
  var evts=getCalEvents();
  var e=evts.find(function(x){return x.id===id;});
  if(!e)return;
  var m=document.getElementById("add-event-modal");
  m.dataset.editId=id;
  document.getElementById("ev-title").value=e.title||"";
  document.getElementById("ev-type").value=e.type||"other";
  document.getElementById("ev-start").value=e.startTime||"08:00";
  document.getElementById("ev-end").value=e.endTime||"09:00";
  document.getElementById("ev-date").value=e.date||TODAY;
  var activeDays=e.days||(e.recurring&&e.recurringDay!==undefined?[e.recurringDay]:[]);
  [0,1,2,3,4,5,6].forEach(function(d){
    var cb=document.getElementById("ev-day-"+d);
    if(cb) cb.checked=activeDays.includes(d);
  });
  document.getElementById("ev-delete-btn").classList.remove("hidden");
  document.getElementById("ev-modal-title").textContent="✏️ แก้ไขกิจกรรม";
  m.classList.remove("hidden");
  setTimeout(function(){document.getElementById("ev-title").focus();},50);
}

function selectQuickDays(arr){
  [0,1,2,3,4,5,6].forEach(function(d){
    var cb=document.getElementById("ev-day-"+d);
    if(cb) cb.checked=arr.includes(d);
  });
}

function saveCalEvent(){
  var title=document.getElementById("ev-title").value.trim();
  if(!title){document.getElementById("ev-title").focus();return;}
  var editId=document.getElementById("add-event-modal").dataset.editId||"";
  var evts=getCalEvents();
  var selectedDays=[];
  [0,1,2,3,4,5,6].forEach(function(d){
    var cb=document.getElementById("ev-day-"+d);
    if(cb&&cb.checked) selectedDays.push(d);
  });
  var evt={
    id:editId||("ev_"+Date.now()),
    title:title,
    type:document.getElementById("ev-type").value,
    startTime:document.getElementById("ev-start").value,
    endTime:document.getElementById("ev-end").value,
  };
  if(selectedDays.length>0) evt.days=selectedDays;
  else evt.date=document.getElementById("ev-date").value;
  if(editId){
    var idx=evts.findIndex(function(e){return e.id===editId;});
    if(idx!==-1) evts[idx]=evt; else evts.push(evt);
  } else {
    evts.push(evt);
  }
  saveCalEvents(evts);
  document.getElementById("add-event-modal").classList.add("hidden");
  refreshCalTop();
}

function deleteCalEvent(){
  var id=document.getElementById("add-event-modal").dataset.editId;
  if(!id) return;
  var evts=getCalEvents();
  var e=evts.find(function(x){return x.id===id;});
  if(!e||!confirm("ลบ: "+e.title+"?")) return;
  saveCalEvents(evts.filter(function(x){return x.id!==id;}));
  document.getElementById("add-event-modal").classList.add("hidden");
  refreshCalTop();
}

// keep old name for backward compat
function openAddEvent(dateStr,time,dow){ openAddEventForm(dateStr,time,dow,null); }

// ── CALENDAR TAB ──────────────────────────────────────────
var calAnalysisResult = "";
var calAnalysisTasks = [];

function buildCalendarSummary(){
  var dates=getWeekDates(calWeekOffset);
  var evts=getCalEvents();
  var dayLabels=["จ","อ","พ","พฤ","ศ","ส","อา"];
  var summary="ตารางของวอลนัท สัปดาห์ "+
    dates[0].toLocaleDateString("th-TH",{day:"numeric",month:"short"})+" ถึง "+
    dates[6].toLocaleDateString("th-TH",{day:"numeric",month:"short"})+":\n";
  dates.forEach(function(d,di){
    var dow=(di+1)%7;
    var dateStr=dStr(d);
    var dayEvts=evts.filter(function(e){return eventOnDay(e,dateStr,dow);})
      .sort(function(a,b){return a.startTime.localeCompare(b.startTime);});
    summary+="\n"+dayLabels[di]+" "+d.getDate()+"/"+(d.getMonth()+1)+":\n";
    if(!dayEvts.length) summary+="  (ว่างทั้งวัน)\n";
    else dayEvts.forEach(function(e){
      var tp=CAL_TYPES[e.type]||CAL_TYPES.other;
      summary+="  "+e.startTime+"-"+e.endTime+" "+tp.icon+" "+e.title+"\n";
    });
  });
  summary+="\nวิชาที่ยังไม่ได้ทำการบ้าน:\n";
  var pending=LESSONS.filter(function(l){return !getHwState(l.id).submitted;});
  if(!pending.length) summary+="  ✅ ทำครบทุกวิชาแล้ว!\n";
  else pending.forEach(function(l){summary+="  - "+l.icon+" "+l.subject+": "+l.title+"\n";});
  return summary;
}

async function analyzeSchedule(){
  var btn=document.getElementById("cal-analyze-btn");
  if(btn){btn.textContent="⏳ ทีมกำลังประชุม...";btn.disabled=true;}
  var resDiv=document.getElementById("cal-analysis-result");
  if(resDiv){resDiv.innerHTML='<div class="text-gray-400 text-sm text-center py-4">ทีมกำลังวิเคราะห์...</div>';resDiv.classList.remove("hidden");}
  var summary=buildCalendarSummary();
  try{
    var sysPrompt="คุณคือ Rose (หัวหน้า) ประชุมร่วมกับ Dr.Aim (วิชาการ) เพื่อวางแผนการเรียนของวอลนัท\n"+
      "ดูตารางด้านล่าง แล้วช่วยตอบ 2 ส่วน:\n\n"+
      "ส่วนที่ 1 — วิเคราะห์และแนะนำ (ภาษาไทยธรรมชาติ อ่านง่าย):\n"+
      "• วันไหนมีเวลาว่างเหมาะทำการบ้าน\n"+
      "• วิชาไหนควรทำก่อนหลัง เพราะอะไร\n"+
      "• ถ้าตารางแน่นหรือเบาเกินไป แจ้งด้วย\n"+
      "• แนะนำการจัดเวลาที่เหมาะสม\n\n"+
      "ส่วนที่ 2 — Task ที่แนะนำ (JSON เท่านั้น ต่อท้ายการวิเคราะห์):\n"+
      '```json\n[{"title":"ทำการบ้านภาษาไทย","subject":"ภาษาไทย","due":"YYYY-MM-DD","icon":"✍️"},...]```\n'+
      "ใส่เฉพาะวิชาที่ยังไม่ได้ทำ กำหนดวันที่ให้เหมาะกับช่องว่างในตาราง";
    var res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1200,
        system:sysPrompt,
        messages:[{role:"user",content:summary}]})});
    var d=await res.json();
    if(d.error)throw new Error(d.error);
    var text=d.content?.[0]?.text||"ไม่สามารถวิเคราะห์ได้";
    // แยก JSON tasks ออกจาก analysis text
    var jsonMatch=text.match(/```json\s*([\s\S]*?)```/);
    calAnalysisTasks=[];
    if(jsonMatch){
      try{calAnalysisTasks=JSON.parse(jsonMatch[1].trim());}catch(e){}
      calAnalysisResult=text.replace(/```json[\s\S]*?```/g,"").trim();
    } else {
      calAnalysisResult=text;
    }
    // Re-render calendar top area to show results
    refreshCalTop();
  }catch(e){
    calAnalysisResult="⚠️ เกิดข้อผิดพลาด: "+e.message;
    calAnalysisTasks=[];
    refreshCalTop();
  }
}

function addAnalysisTasks(){
  if(!calAnalysisTasks.length) return;
  var ts=getLocalTasks();
  var dayNamesThai=["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];
  calAnalysisTasks.forEach(function(t){
    var title=t.title;
    if(t.due){
      var d=new Date(t.due);
      title=title+" (วัน"+dayNamesThai[d.getDay()]+")";
    }
    ts.push({
      id:"ai-"+Date.now()+"-"+Math.random().toString(36).slice(2,6),
      title:title,subject:t.subject||"ทั่วไป",
      icon:t.icon||"📌",badge:"bg-amber-100 text-amber-700",
      type:"manual",status:"pending",due:t.due||getFriday()
    });
  });
  saveLocalTasks(ts);
  calAnalysisResult="✅ เพิ่ม Task แล้ว";
  refreshCalTop();
}

function bookToCalendar(){
  // ดู LESSONS ที่ยังไม่ได้ทำ (หรือ tasks ที่แนะนำจาก AI ถ้ามี)
  var pending=[];
  if(calAnalysisTasks.length){
    // ใช้ tasks จาก AI analysis
    calAnalysisTasks.forEach(function(t){
      if(t.due) pending.push({subject:t.subject||t.title,icon:t.icon||"📚",due:t.due});
    });
  } else {
    // ไม่มี AI tasks — ใช้ LESSONS ที่ยังไม่ submit
    var pendingLessons=LESSONS.filter(function(l){return !getHwState(l.id).submitted;});
    if(!pendingLessons.length){
      alert("ทำการบ้านครบทุกวิชาแล้วครับ ไม่มีอะไรต้องบุ๊ค");
      return;
    }
    // กระจาย LESSONS ไปทั่วสัปดาห์นี้ (จันทร์-ศุกร์)
    var dates=getWeekDates(calWeekOffset);
    var weekdays=dates.slice(0,5); // จ-ศ
    pendingLessons.forEach(function(l,i){
      var d=weekdays[i%5];
      pending.push({subject:l.subject,icon:l.icon,due:dStr(d)});
    });
  }

  if(!pending.length){alert("ไม่มีวิชาที่ต้องบุ๊คครับ");return;}

  var evts=getCalEvents();
  var booked=[];

  pending.forEach(function(p){
    var d=new Date(p.due);
    var dow=d.getDay();
    var dateStr=p.due;
    var dayEvts=evts.filter(function(e){return eventOnDay(e,dateStr,dow);})
      .sort(function(a,b){return a.startTime.localeCompare(b.startTime);});

    // หา slot ว่าง 30 นาที ตั้งแต่ 16:00 - 21:00
    var slotStart="16:00",slotEnd="16:30",found=false;
    for(var h=16;h<=20&&!found;h++){
      for(var m=0;m<60&&!found;m+=30){
        var ts=String(h).padStart(2,"0")+":"+String(m).padStart(2,"0");
        var endH=m+30>=60?h+1:h, endM=(m+30)%60;
        var te=String(endH).padStart(2,"0")+":"+String(endM).padStart(2,"0");
        var busy=dayEvts.some(function(e){return e.startTime<te&&e.endTime>ts;});
        if(!busy){slotStart=ts;slotEnd=te;found=true;}
      }
    }

    var newEvt={
      id:"ev_"+Date.now()+"-"+Math.random().toString(36).slice(2,6),
      title:p.icon+" แบบทดสอบ"+p.subject,
      type:"learning",
      date:dateStr,
      startTime:slotStart,
      endTime:slotEnd
    };
    evts.push(newEvt);
    booked.push(p.subject+" ("+dateStr+" "+slotStart+")");
  });

  saveCalEvents(evts);
  if(typeof saveToCloud==="function") saveToCloud();
  calAnalysisTasks=[];
  calAnalysisResult="✅ บุ๊คลงปฏิทินแล้ว "+booked.length+" วิชา!\n"+booked.join("\n");
  refreshCalTop();
}

function renderCalendarTab(){
  // Build calendar HTML inline
  var dates=getWeekDates(calWeekOffset);
  var evts=getCalEvents();
  var totalH=CAL_END-CAL_START;
  var hours=[];
  for(var h=CAL_START;h<=CAL_END;h++) hours.push(h);
  var label=dates[0].toLocaleDateString("th-TH",{day:"numeric",month:"short"})+" – "+
    dates[6].toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"2-digit"});
  var ruler='<div style="display:flex;margin-left:56px;position:relative;height:20px;overflow:hidden">';
  hours.forEach(function(h){
    var pct=((h-CAL_START)/totalH*100).toFixed(2);
    ruler+='<div style="position:absolute;left:'+pct+'%;transform:translateX(-50%);font-size:10px;color:#9ca3af;white-space:nowrap">'+String(h).padStart(2,"0")+'</div>';
  });
  ruler+='</div>';
  var rows="";
  dates.forEach(function(d,di){
    var dow=(di+1)%7;
    var dateStr=dStr(d);
    var isToday=dateStr===TODAY;
    var dayEvts=evts.filter(function(e){return eventOnDay(e,dateStr,dow);})
      .sort(function(a,b){return a.startTime.localeCompare(b.startTime);});
    var lanes=[];
    var evtLanes=dayEvts.map(function(e){
      var s=timeToFrac(e.startTime||"06:00");
      var en=timeToFrac(e.endTime||"07:00");
      for(var lane=0;lane<20;lane++){
        if(!lanes[lane]||lanes[lane]<=s){lanes[lane]=en;return lane;}
      }
      return 0;
    });
    var nLanes=Math.max(1,lanes.length);
    var rowH=Math.max(44,nLanes*26);
    var gridLines="";
    hours.forEach(function(h){
      var pct=((h-CAL_START)/totalH*100).toFixed(2);
      gridLines+='<div style="position:absolute;left:'+pct+'%;top:0;bottom:0;width:1px;background:#f3f4f6;pointer-events:none"></div>';
    });
    var bars=dayEvts.map(function(e,i){
      var tp=CAL_TYPES[e.type]||CAL_TYPES.other;
      var sf=timeToFrac(e.startTime||"06:00");
      var ef=timeToFrac(e.endTime||"07:00");
      var w=Math.max(0.004,ef-sf)*100;
      var lane=evtLanes[i]||0;
      return '<div onclick="event.stopPropagation();editCalEvent(\''+e.id+'\')" '+
        'style="position:absolute;left:'+(sf*100).toFixed(2)+'%;width:'+w.toFixed(2)+'%;top:'+(lane*26+4)+'px;height:22px;'+
        'background:'+tp.bg+';color:'+tp.tx+';border:1px solid '+tp.bd+';border-radius:6px;'+
        'padding:2px 6px;box-sizing:border-box;cursor:pointer;overflow:hidden;white-space:nowrap;'+
        'display:flex;align-items:center;gap:3px;font-size:11px;font-weight:600;z-index:2;">'+
        '<span>'+tp.icon+'</span><span style="overflow:hidden;text-overflow:ellipsis">'+e.title+'</span>'+
        '<span style="opacity:.55;font-size:10px;margin-left:auto">'+e.startTime.slice(0,5)+'-'+e.endTime.slice(0,5)+'</span>'+
      '</div>';
    }).join("");
    rows+='<div style="display:flex;border-bottom:1px solid #f3f4f6;'+(isToday?"background:#fffbeb":"")+'">'+
      '<div style="width:56px;min-width:56px;padding:0 6px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid #f3f4f6;font-size:12px">'+
        '<div style="font-weight:700;color:'+(isToday?"#b45309":"#374151")+'">'+["จ","อ","พ","พฤ","ศ","ส","อา"][di]+'</div>'+
        '<div style="color:#9ca3af;font-size:10px">'+d.getDate()+'/'+(d.getMonth()+1)+'</div>'+
      '</div>'+
      '<div style="flex:1;position:relative;height:'+rowH+'px;cursor:crosshair;min-width:0" '+
        'onclick="handleCalRowClick(event,\''+dateStr+'\','+dow+')">'+gridLines+bars+'</div>'+
    '</div>';
  });
  var legend='<div style="display:flex;flex-wrap:wrap;gap:6px;padding:10px 12px;background:#f9fafb;border-top:1px solid #f3f4f6">'+
    Object.entries(CAL_TYPES).map(function(kv){
      return '<span style="font-size:11px;padding:2px 8px;border-radius:20px;background:'+kv[1].bg+';color:'+kv[1].tx+';border:1px solid '+kv[1].bd+'">'+kv[1].icon+' '+kv[1].label+'</span>';
    }).join("")+'</div>';
  var calHtml=
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#fffbeb;border-bottom:1px solid #fde68a">'+
      '<button onclick="calWeekOffset--;switchTab(\'calendar\')" style="color:#d97706;background:#fef3c7;border:none;padding:6px 12px;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px">← ก่อน</button>'+
      '<div style="text-align:center"><div style="font-weight:700;font-size:14px;color:#374151">'+label+'</div>'+
        '<button onclick="calWeekOffset=0;switchTab(\'calendar\')" style="font-size:11px;color:#d97706;background:none;border:none;cursor:pointer;text-decoration:underline">สัปดาห์นี้</button></div>'+
      '<button onclick="calWeekOffset++;switchTab(\'calendar\')" style="color:#d97706;background:#fef3c7;border:none;padding:6px 12px;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px">ถัดไป →</button>'+
    '</div>'+ruler+
    '<div style="overflow-x:auto"><div style="min-width:600px">'+rows+'</div></div>'+legend;

  // Analysis panel
  var analysisHtml="";
  if(calAnalysisResult){
    analysisHtml='<div class="mt-4 space-y-3">'+
      '<div class="bg-blue-50 border border-blue-200 rounded-2xl p-4">'+
        '<div class="flex items-center gap-2 mb-2"><span>🔍</span><strong class="text-sm text-blue-800">Rose + Dr.Aim ประชุมวิเคราะห์</strong></div>'+
        '<div class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">'+calAnalysisResult+'</div>'+
      '</div>'+
      (calAnalysisTasks.length?
        '<div class="bg-amber-50 border border-amber-200 rounded-2xl p-4">'+
          '<div class="text-sm font-semibold text-amber-800 mb-2">📋 ทีมแนะนำ Tasks ต่อไปนี้ ('+calAnalysisTasks.length+' รายการ):</div>'+
          '<div class="space-y-1 mb-3">'+
            calAnalysisTasks.map(function(t){
              return '<div class="flex items-center gap-2 text-sm"><span>'+(t.icon||"📌")+'</span><span class="font-medium">'+t.title+'</span><span class="text-xs text-gray-400 ml-auto">'+t.due+'</span></div>';
            }).join("")+
          '</div>'+
          '<button onclick="addAnalysisTasks()" class="w-full bg-amber-400 hover:bg-amber-500 text-white py-2 rounded-xl text-sm font-semibold">✅ เพิ่ม Tasks ทั้งหมดเลย</button>'+
        '</div>':'')+'</div>';
  }

  return '<div class="bg-white rounded-b-2xl border border-t-0 border-gray-100">'+
    '<div class="p-4 border-b flex items-center justify-between">'+
      '<div class="flex items-center gap-2"><span class="text-lg">📅</span><span class="font-bold">ปฏิทินวอลนัท</span></div>'+
      '<div class="flex gap-2">'+
        '<button onclick="openAddEvent(TODAY,\'08:00\',1)" class="bg-amber-400 hover:bg-amber-500 text-white px-3 py-1.5 rounded-xl text-sm font-semibold">+ เพิ่ม</button>'+
        '<button id="cal-analyze-btn" onclick="analyzeSchedule()" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-sm font-semibold">🔍 ทีมวิเคราะห์</button>'+
      '</div>'+
    '</div>'+
    '<div class="overflow-hidden rounded-b-xl border border-gray-100">'+calHtml+'</div>'+
    '<div class="px-4 pb-4">'+analysisHtml+'</div>'+
  '</div>';
}

// ── CALENDAR TOP AREA — multi-view (Month / Week / Day) ────
var calView="week"; // "month"|"week"|"day"
var calMonthOffset=0;
var calDaySelected=new Date().toISOString().slice(0,10);

function renderCalTop(){
  return buildCalHeader()+buildCalBody()+buildCalLegend()+buildCalAnalysis();
}

function buildCalHeader(){
  var nav="",label="";
  if(calView==="month"){
    var ref=new Date();ref.setDate(1);ref.setMonth(ref.getMonth()+calMonthOffset);
    label=ref.toLocaleDateString("th-TH",{month:"long",year:"numeric"});
    nav='<button onclick="calMonthOffset--;refreshCalTop()" style="'+btnSt()+'">← ก่อน</button>'+
        '<button onclick="calMonthOffset=0;refreshCalTop()" style="font-size:10px;color:#d97706;background:none;border:none;cursor:pointer;text-decoration:underline">วันนี้</button>'+
        '<button onclick="calMonthOffset++;refreshCalTop()" style="'+btnSt()+'">ถัดไป →</button>';
  } else if(calView==="day"){
    var d=new Date(calDaySelected);
    label=d.toLocaleDateString("th-TH",{weekday:"short",day:"numeric",month:"short"});
    nav='<button onclick="prevDay()" style="'+btnSt()+'">← ก่อน</button>'+
        '<button onclick="calDaySelected=TODAY;refreshCalTop()" style="font-size:10px;color:#d97706;background:none;border:none;cursor:pointer;text-decoration:underline">วันนี้</button>'+
        '<button onclick="nextDay()" style="'+btnSt()+'">ถัดไป →</button>';
  } else {
    var dates=getWeekDates(calWeekOffset);
    label=dates[0].toLocaleDateString("th-TH",{day:"numeric",month:"short"})+" – "+
          dates[6].toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"2-digit"});
    nav='<button onclick="calWeekOffset--;refreshCalTop()" style="'+btnSt()+'">← ก่อน</button>'+
        '<button onclick="calWeekOffset=0;refreshCalTop()" style="font-size:10px;color:#d97706;background:none;border:none;cursor:pointer;text-decoration:underline">วันนี้</button>'+
        '<button onclick="calWeekOffset++;refreshCalTop()" style="'+btnSt()+'">ถัดไป →</button>';
  }
  var viewBtns=['month','week','day'].map(function(v){
    var on=calView===v;
    var lbl={month:"เดือน",week:"สัปดาห์",day:"วัน"}[v];
    return '<button onclick="calView=\''+v+'\';refreshCalTop()" style="font-size:11px;padding:4px 9px;border-radius:6px;cursor:pointer;font-weight:600;border:1px solid #fde68a;'+
      (on?"background:#fbbf24;color:#fff":"background:#fef3c7;color:#d97706")+'">'+lbl+'</button>';
  }).join("");
  return '<div style="display:flex;flex-wrap:wrap;align-items:center;padding:10px 14px;background:#fffbeb;border-bottom:1px solid #fde68a;gap:6px">'+
    nav+
    '<div style="flex:1;text-align:center;font-weight:700;font-size:13px;color:#374151;min-width:120px">'+label+'</div>'+
    '<div style="display:flex;gap:4px">'+viewBtns+'</div>'+
    '<button onclick="openAddEvent(TODAY,\'08:00\',1)" style="background:#fbbf24;color:#fff;border:none;padding:5px 11px;border-radius:8px;font-weight:600;cursor:pointer;font-size:12px">+ เพิ่ม</button>'+
    '<button id="cal-analyze-btn" onclick="analyzeSchedule()" style="background:#2563eb;color:#fff;border:none;padding:5px 11px;border-radius:8px;font-weight:600;cursor:pointer;font-size:12px">🔍 วิเคราะห์</button>'+
    '<button onclick="bookToCalendar()" style="background:#7c3aed;color:#fff;border:none;padding:5px 11px;border-radius:8px;font-weight:600;cursor:pointer;font-size:12px">📅 บุ๊คปฏิทิน</button>'+
  '</div>';
}
function btnSt(){ return "color:#d97706;background:#fef3c7;border:1px solid #fde68a;padding:5px 11px;border-radius:8px;font-weight:600;cursor:pointer;font-size:12px"; }
function prevDay(){ var d=new Date(calDaySelected);d.setDate(d.getDate()-1);calDaySelected=dStr(d);refreshCalTop(); }
function nextDay(){ var d=new Date(calDaySelected);d.setDate(d.getDate()+1);calDaySelected=dStr(d);refreshCalTop(); }

function buildCalBody(){
  if(calView==="month") return renderCalMonth();
  if(calView==="day")   return renderCalDay();
  return renderCalWeek();
}

// ── MONTH VIEW ────────────────────────────────────────────
function renderCalMonth(){
  var ref=new Date();ref.setDate(1);ref.setMonth(ref.getMonth()+calMonthOffset);
  var year=ref.getFullYear(),month=ref.getMonth();
  var firstDow=(new Date(year,month,1).getDay()+6)%7; // Mon=0
  var daysInMonth=new Date(year,month+1,0).getDate();
  var evts=getCalEvents();
  var hdr=['จ','อ','พ','พฤ','ศ','ส','อา'].map(function(d){
    return '<div style="text-align:center;font-weight:700;font-size:11px;color:#9ca3af;padding:5px 0">'+d+'</div>';
  }).join("");
  var cells="";
  for(var i=0;i<firstDow;i++) cells+='<div style="min-height:70px"></div>';
  for(var day=1;day<=daysInMonth;day++){
    var dateStr=year+"-"+String(month+1).padStart(2,"0")+"-"+String(day).padStart(2,"0");
    var d=new Date(year,month,day);
    var dow=d.getDay(); // Sun=0
    var isToday=dateStr===TODAY;
    var dayEvts=evts.filter(function(e){return eventOnDay(e,dateStr,dow);})
      .sort(function(a,b){return a.startTime.localeCompare(b.startTime);});
    var chips=dayEvts.slice(0,3).map(function(e){
      var tp=CAL_TYPES[e.type]||CAL_TYPES.other;
      return '<div style="font-size:10px;background:'+tp.bg+';color:'+tp.tx+';border-radius:4px;padding:1px 4px;margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+tp.icon+' '+e.title+'</div>';
    }).join("")+(dayEvts.length>3?'<div style="font-size:9px;color:#9ca3af;padding-left:2px">+'+( dayEvts.length-3)+' อื่น</div>':'');
    cells+='<div onclick="calDaySelected=\''+dateStr+'\';calView=\'day\';refreshCalTop()" style="min-height:70px;padding:4px;border:1px solid #f3f4f6;border-radius:6px;cursor:pointer;'+(isToday?'background:#fffbeb;border-color:#fde68a':'')+' hover:background:#f9fafb">'+
      '<div style="font-size:12px;font-weight:'+(isToday?'700':'500')+';color:'+(isToday?'#b45309':'#374151')+';margin-bottom:2px">'+day+'</div>'+
      chips+'</div>';
  }
  return '<div style="padding:10px 12px"><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">'+hdr+cells+'</div></div>';
}

// ── DAY VIEW ──────────────────────────────────────────────
function renderCalDay(){
  var d=new Date(calDaySelected);
  var dow=d.getDay(); // Sun=0
  var evts=getCalEvents().filter(function(e){return eventOnDay(e,calDaySelected,dow);})
    .sort(function(a,b){return a.startTime.localeCompare(b.startTime);});
  if(!evts.length) return '<div style="padding:24px;text-align:center;color:#9ca3af;font-size:14px">ไม่มีกิจกรรมวันนี้<br><span style="font-size:12px">กดที่วันในปฏิทินเพื่อเพิ่ม</span></div>';
  var cards=evts.map(function(e){
    var tp=CAL_TYPES[e.type]||CAL_TYPES.other;
    return '<div onclick="editCalEvent(\''+e.id+'\')" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #f3f4f6;cursor:pointer;background:'+tp.bg+'20">'+
      '<div style="text-align:center;min-width:50px;background:'+tp.bg+';border:1px solid '+tp.bd+';border-radius:8px;padding:4px">'+
        '<div style="font-size:11px;font-weight:700;color:'+tp.tx+'">'+e.startTime.slice(0,5)+'</div>'+
        '<div style="font-size:9px;color:'+tp.tx+';opacity:.7">'+e.endTime.slice(0,5)+'</div>'+
      '</div>'+
      '<div style="flex:1">'+
        '<div style="font-size:14px;font-weight:700;color:#1f2937">'+e.title+'</div>'+
        '<div style="font-size:11px;color:#6b7280">'+tp.icon+' '+tp.label+'</div>'+
      '</div>'+
    '</div>';
  }).join("");
  return '<div>'+cards+'</div>';
}

// ── WEEK VIEW ─────────────────────────────────────────────
function renderCalWeek(){
  var dates=getWeekDates(calWeekOffset);
  var evts=getCalEvents();
  var totalH=CAL_END-CAL_START;
  var hours=[];
  for(var h=CAL_START;h<=CAL_END;h++) hours.push(h);

  // Time ruler
  var ruler='<div style="display:flex;margin-left:56px;position:relative;height:18px;overflow:hidden">';
  hours.forEach(function(h){
    var pct=((h-CAL_START)/totalH*100).toFixed(2);
    ruler+='<div style="position:absolute;left:'+pct+'%;transform:translateX(-50%);font-size:10px;color:#9ca3af;white-space:nowrap">'+String(h).padStart(2,"0")+'</div>';
  });
  ruler+='</div>';

  // Day rows
  var rows="";
  dates.forEach(function(d,di){
    var dow=(di+1)%7;
    var dateStr=dStr(d);
    var isToday=dateStr===TODAY;
    var dayEvts=evts.filter(function(e){return eventOnDay(e,dateStr,dow);})
      .sort(function(a,b){return a.startTime.localeCompare(b.startTime);});
    var lanes=[];
    var evtLanes=dayEvts.map(function(e){
      var s=timeToFrac(e.startTime||"06:00");
      var en=timeToFrac(e.endTime||"07:00");
      for(var lane=0;lane<20;lane++){
        if(!lanes[lane]||lanes[lane]<=s){lanes[lane]=en;return lane;}
      }
      return 0;
    });
    var nLanes=Math.max(1,lanes.length);
    var rowH=Math.max(52,nLanes*36);
    var gridLines="";
    hours.forEach(function(h){
      var pct=((h-CAL_START)/totalH*100).toFixed(2);
      gridLines+='<div style="position:absolute;left:'+pct+'%;top:0;bottom:0;width:1px;background:#f3f4f6;pointer-events:none"></div>';
    });
    // event bars — ชื่อนำหน้า icon ตาม
    var bars=dayEvts.map(function(e,i){
      var tp=CAL_TYPES[e.type]||CAL_TYPES.other;
      var sf=timeToFrac(e.startTime||"06:00");
      var ef=timeToFrac(e.endTime||"07:00");
      var w=Math.max(0.004,ef-sf)*100;
      var lane=evtLanes[i]||0;
      var topPx=lane*36+5;
      return '<div onclick="event.stopPropagation();editCalEvent(\''+e.id+'\')" '+
        'title="'+e.title+'\n'+e.startTime.slice(0,5)+' – '+e.endTime.slice(0,5)+'" '+
        'style="position:absolute;left:'+(sf*100).toFixed(2)+'%;width:'+w.toFixed(2)+'%;top:'+topPx+'px;height:28px;'+
        'background:'+tp.bg+';color:'+tp.tx+';border:1.5px solid '+tp.bd+';border-radius:7px;'+
        'padding:0 7px;box-sizing:border-box;cursor:pointer;overflow:hidden;white-space:nowrap;'+
        'display:flex;align-items:center;gap:4px;font-size:12px;font-weight:700;z-index:2;">'+
        '<span style="overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0">'+e.title+'</span>'+
        '<span style="flex-shrink:0;font-size:13px">'+tp.icon+'</span>'+
      '</div>';
    }).join("");
    rows+='<div style="display:flex;border-bottom:1px solid #f3f4f6;'+(isToday?"background:#fffbeb":"")+'">'+
      '<div style="width:56px;min-width:56px;padding:0 6px;display:flex;flex-direction:column;justify-content:center;border-right:1px solid #f3f4f6;font-size:12px">'+
        '<div style="font-weight:700;color:'+(isToday?"#b45309":"#374151")+'">'+["จ","อ","พ","พฤ","ศ","ส","อา"][di]+'</div>'+
        '<div style="color:#9ca3af;font-size:10px">'+d.getDate()+'/'+(d.getMonth()+1)+'</div>'+
      '</div>'+
      '<div style="flex:1;position:relative;height:'+rowH+'px;cursor:crosshair;min-width:0" '+
        'onclick="handleCalRowClick(event,\''+dateStr+'\','+dow+')">'+gridLines+bars+'</div>'+
    '</div>';
  });

  return '<div style="overflow-x:auto"><div style="min-width:600px">'+ruler+rows+'</div></div>';
}

function buildCalLegend(){
  return '<div style="display:flex;flex-wrap:wrap;gap:5px;padding:8px 12px;background:#f9fafb;border-top:1px solid #f3f4f6">'+
    Object.entries(CAL_TYPES).map(function(kv){
      return '<span style="font-size:10px;padding:2px 7px;border-radius:20px;background:'+kv[1].bg+';color:'+kv[1].tx+';border:1px solid '+kv[1].bd+'">'+kv[1].icon+' '+kv[1].label+'</span>';
    }).join("")+'</div>';
}

function buildCalAnalysis(){
  if(!calAnalysisResult) return "";
  return '<div style="padding:12px;border-top:1px solid #e5e7eb">'+
    '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:12px;margin-bottom:10px">'+
      '<div style="font-size:13px;font-weight:700;color:#1e40af;margin-bottom:6px">🔍 Rose + Dr.Aim วิเคราะห์</div>'+
      '<div style="font-size:12px;color:#374151;line-height:1.6;white-space:pre-wrap">'+calAnalysisResult+'</div>'+
    '</div>'+
    (calAnalysisTasks.length?
      '<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:12px">'+
        '<div style="font-size:12px;font-weight:700;color:#92400e;margin-bottom:8px">📋 Tasks ที่แนะนำ ('+calAnalysisTasks.length+' รายการ)</div>'+
        calAnalysisTasks.map(function(t){
          return '<div style="display:flex;align-items:center;gap:6px;font-size:12px;padding:3px 0">'+
            '<span>'+(t.icon||"📌")+'</span><span style="font-weight:500">'+t.title+'</span>'+
            '<span style="color:#9ca3af;font-size:11px;margin-left:auto">'+t.due+'</span></div>';
        }).join("")+
        '<div style="display:flex;gap:6px;margin-top:8px">'+
          '<button onclick="addAnalysisTasks()" style="flex:1;background:#fbbf24;color:#fff;border:none;padding:7px;border-radius:10px;font-weight:600;cursor:pointer;font-size:12px">✅ เพิ่ม Tasks</button>'+
          '<button onclick="bookToCalendar()" style="flex:1;background:#3b82f6;color:#fff;border:none;padding:7px;border-radius:10px;font-weight:600;cursor:pointer;font-size:12px">📅 บุ๊คลงปฏิทิน</button>'+
        '</div>'+
      '</div>':'')+'</div>';
}

function refreshCalTop(){
  var el=document.getElementById("cal-top-area");
  if(el) el.innerHTML=renderCalTop();
}

// ════════════════════════════════════════════════════════════
//  WALNUT SONG — เนื้อเพลง + วาด/โน้ต/สติกเกอร์
//  ข้อมูลเพลงดึงมาจาก ~/Claude/Projects/Lyrics (Walnut Songbook เดิม)
//  Layout/font rules ตาม lyrics-formatter skill (A4, tiered font size)
// ════════════════════════════════════════════════════════════

const SONGS = [
  {"id":"1901-phoenix","titleEn":"1901","titleTh":"", "artistEn":"Phoenix","artistTh":"","artistIcon":"🎸","sections":[{"type":"verse","num":1,"repeat":false,"lines":["Counting all different ideas drifting away","Past and present they don't matter","Now the future's sorted out","Watch her moving in elliptical patterns","Think it's not what you say","What you say is way too complicated","For a minute thought I couldn't tell how to fall out"]},{"type":"chorus","num":null,"repeat":false,"lines":["It's twenty seconds 'til the last call","Going hey hey hey hey hey hey","Lie down you know it's easy","Like we did it over summer long","And I'll be anything you ask and more","Going hey hey hey hey hey hey hey","It's not a miracle we needed","And no I wouldn't let you think so"]},{"type":"bridge","num":null,"repeat":false,"lines":["Fold it, fold it, fold it, fold it","Fold it, fold it, fold it, fold it"]},{"type":"verse","num":2,"repeat":false,"lines":["Girlfriend, oh your girlfriend is drifting away","Past and present 1855-1901","Watch them built up a material tower","Think it's not gonna stay anyway","I think it's overrated","For a minute thought I couldn't tell how to fall out"]},{"type":"chorus","num":null,"repeat":true,"lines":["It's twenty seconds 'til the last call","Going hey hey hey hey hey hey","Lie down you know it's easy","Like we did it over summer long","And I'll be anything you ask and more","Going hey hey hey hey hey hey hey","It's not a miracle we needed","And no I wouldn't let you think so"]},{"type":"outro","num":null,"repeat":false,"lines":["Fold it, fold it, fold it, fold it","Fold it, fold it, fold it, fold it","Fold it, fold it, fold it, fold it","Fold it, fold it, fold it, fold it"]}]}
];

/* ===================== STATE ===================== */
const songState = {
  view: 'home',          // home | detail
  currentId: null,
  mode: 'clean',          // clean | view | edit
  searchQuery: '',
  sortMode: 'title',      // title | artist
  activeSetlistId: null,  // null = browse all songs
  setlistManageMode: false,
  strokes: [], notes: [], stickers: [],
  snapshot: null,
  currentTool: 'pencil',
  currentColor: '#e85d8a',
  brushSize: 's', // always starts at 1px (SONG_BRUSH_SIZES.s) — not persisted
  eraserMode: 'stroke',   // stroke | pixel
  eraserSize: 'm',
  noteBorder: true,
  noteFontSize: 'm',
  noteColor: '#000000',
  selectedSticker: null,
};

const SONG_STORAGE_PREFIX = 'walnut_song_note_';
const SONG_SETLIST_KEY = 'walnut_song_setlists';
const SONG_COLORS = ['#e85d8a', '#4d96ff', '#6bcB77', '#ffd93d', '#9b5de5', '#3a3a3a'];
const SONG_NOTE_COLORS = ['#000000', '#ffffff', '#e85d8a', '#4d96ff', '#6bcB77', '#ffd93d', '#9b5de5'];
const SONG_STICKERS = ['🎵','🎶','🎤','🎧','🎸','🎹','🥁','🎷','🎺','🎻','🔔','📯','💖','💗','💓','💕','💞','💘','❤️','🧡','💛','💚','💙','💜','🤍','✨','🌟','⭐','💫','🌠','💎','😊','🥳','🎉','🌈','🦋'];
const SONG_BRUSH_SIZES = { xs: 0.5, s: 1, m: 2, l: 4 };
const SONG_ERASER_SIZES_STROKE = { s: 0.02, m: 0.035, l: 0.055 }; // "erase whole line" hit-test radius
const SONG_ERASER_SIZES_PIXEL  = { s: 0.005, m: 0.01, l: 0.017 }; // "erase like a pencil eraser" — finer, ~3/6/10px radius on a ~600px-wide page
const SONG_NOTE_FONT_SIZES = { s: 11, m: 14, l: 18 };
const SONG_STICKER_MIN = 16, SONG_STICKER_MAX = 80, SONG_STICKER_DEFAULT = 34;
const SONG_TYPE_LABEL = {
  'verse': '▸ Verse', 'chorus': '★ Chorus', 'bridge': '◆ Bridge', 'pre-chorus': '◇ Pre-Chorus',
  'instrumental': '♪ Instrumental', 'intro': '♪ Intro', 'outro': '♪ Outro', 'interlude': '♪ Interlude'
};
const SONG_ALPHABET = ['0-9', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
const SONG_SCROLL_SPEED_KEY = 'walnut_song_scroll_speed';
const SONG_SCROLL_SPEEDS = [4, 8, 12, 15, 20, 25, 30, 40, 60, 80]; // px/sec, index = level-1
let songScrollSpeed = parseInt(localStorage.getItem(SONG_SCROLL_SPEED_KEY) || '5', 10);
let songScrollRAF = null;
let songScrollLastTime = null;
let songScrollAccPos = null;

/* ===================== STYLE (inject once) ===================== */
function ensureSongsStyle(){
  if(document.getElementById('songs-style-tag')) return;
  const style = document.createElement('style');
  style.id = 'songs-style-tag';
  style.textContent = `
    #songs-root{ font-family:'Nunito','Sarabun',sans-serif; }
    .songs-home-header{ text-align:center; padding:14px 8px 10px; background:linear-gradient(150deg,#daeeff 0%,#eef7ff 45%,#fce8f4 100%); border-radius:16px; margin-bottom:12px; }
    .songs-home-header h2{ font-size:20px; font-weight:900; background:linear-gradient(135deg,#4a9fd4,#7ec0ee,#d47ab0); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin:0; }
    .songs-home-header .sub{ font-size:12px; color:#7aaac8; font-weight:700; margin-top:2px; }
    #songs-search{ width:100%; padding:10px 14px; border-radius:12px; border:1px solid #cfe6f5; font-size:14px; margin-bottom:8px; }
    .songs-seg{ display:flex; background:#fff; border-radius:10px; padding:3px; margin-bottom:10px; box-shadow:0 2px 6px rgba(0,0,0,.05); }
    .songs-seg button{ flex:1; border:none; background:transparent; padding:7px 4px; border-radius:8px; font-size:12px; color:#888; cursor:pointer; }
    .songs-seg button.active{ background:#7ec0ee; color:#fff; font-weight:700; }
    .songs-az{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-bottom:10px; }
    .songs-az button{ border:none; background:#fff; color:#4a9fd4; font-size:11px; font-weight:700; width:24px; height:24px; border-radius:6px; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,.06); }
    .songs-az button.disabled{ opacity:.3; pointer-events:none; }
    .songs-section-hd{ font-size:11px; font-weight:800; color:#d47ab0; margin:12px 2px 5px; letter-spacing:.06em; }
    .songs-item{ background:#fff; border-radius:12px; padding:10px 12px; margin-bottom:6px; box-shadow:0 2px 6px rgba(0,0,0,.06); cursor:pointer; }
    .songs-item .t{ font-size:14px; font-weight:700; color:#345f80; }
    .songs-item .t .th{ font-weight:400; color:#9bb; font-size:12px; }
    .songs-item .a{ font-size:11px; color:#9bb; margin-top:1px; }
    .songs-item .badge{ margin-left:4px; }
    .songs-empty{ text-align:center; color:#c99; font-size:13px; margin-top:24px; }

    .songs-setlist-row{ display:flex; gap:6px; overflow-x:auto; padding-bottom:4px; margin-bottom:10px; }
    .songs-setlist-chip{ flex-shrink:0; border:none; background:#fff; color:#7aaac8; font-size:12px; font-weight:700; padding:7px 13px; border-radius:999px; box-shadow:0 2px 6px rgba(0,0,0,.06); cursor:pointer; white-space:nowrap; }
    .songs-setlist-chip.active{ background:#7ec0ee; color:#fff; }
    .songs-setlist-chip.new{ background:#fff0f8; color:#d47ab0; }
    .songs-setlist-bar{ display:flex; align-items:center; gap:8px; margin-bottom:10px; }
    .songs-setlist-bar .name{ font-size:15px; font-weight:800; color:#345f80; flex:1; }
    .songs-setlist-bar button{ border:none; background:#fff; padding:6px 11px; border-radius:9px; font-size:11px; color:#666; box-shadow:0 2px 6px rgba(0,0,0,.06); cursor:pointer; }
    .songs-setlist-bar button.danger{ color:#c0392b; }
    .songs-check-item{ display:flex; align-items:center; gap:8px; }
    .songs-check-item input{ width:18px; height:18px; flex-shrink:0; }

    .songs-detail-header{ position:sticky; top:0; z-index:40; background:#fff; border-radius:16px; padding:12px 12px 10px; margin-bottom:10px; box-shadow:0 6px 18px rgba(0,0,0,.09); will-change:transform; transform:translateZ(0); backface-visibility:hidden; }
    .songs-topbar{ display:flex; align-items:center; gap:8px; margin-bottom:8px; }
    .songs-back{ border:none; background:#fdf1f5; padding:7px 11px; border-radius:9px; font-size:12px; color:#d47ab0; cursor:pointer; flex-shrink:0; }
    .songs-title-block{ flex:1; min-width:0; }
    .songs-title-block .t{ font-size:15px; font-weight:800; color:#345f80; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .songs-title-block .a{ font-size:11px; color:#9bb; }
    .songs-topbar-actions{ display:flex; gap:6px; flex-shrink:0; flex-wrap:wrap; }
    .songs-topbar-actions button{ border:none; padding:8px 13px; border-radius:9px; font-size:12px; color:#666; background:#f2f2f2; cursor:pointer; white-space:nowrap; }
    .songs-topbar-actions button.primary{ background:#ff8fab; color:#fff; font-weight:700; }

    .songs-bottom-bar{ position:fixed; left:12px; right:12px; bottom:12px; z-index:45; background:#fff; border-radius:14px; padding:7px 12px; box-shadow:0 4px 16px rgba(0,0,0,.15); display:flex; align-items:center; justify-content:space-between; gap:10px; }
    .songs-bottom-spacer{ height:64px; }
    .songs-bottom-group{ display:flex; align-items:center; gap:6px; }
    .songs-bottom-bar button{ border:none; background:#f4f9ff; border-radius:8px; padding:5px 9px; font-size:13px; cursor:pointer; }
    .songs-bottom-bar #songs-lyrics-fs-label, .songs-bottom-bar #songs-scroll-speed-label{ font-size:11px; font-weight:700; color:#666; min-width:30px; text-align:center; }
    .songs-bottom-label{ font-size:10px; color:#999; white-space:nowrap; }
    .songs-bottom-bar input[type="range"]{ width:60px; }

    .songs-toolbar{ display:flex; gap:6px; flex-wrap:wrap; justify-content:center; background:#fdf7fa; padding:7px 8px; border-radius:14px; margin-bottom:6px; }
    .songs-tool{ border:none; background:#fff; border-radius:10px; padding:6px 10px; font-size:16px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:1px; min-width:46px; }
    .songs-tool span{ font-size:9px; color:#666; }
    .songs-tool.active{ background:#ff8fab; }
    .songs-tool.active span{ color:#fff; }
    .songs-subpanel{ display:none; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center; background:#fafafa; border-radius:12px; padding:8px; margin-bottom:6px; }
    .songs-subpanel.show{ display:flex; }
    .songs-subpanel .grp{ display:flex; gap:5px; align-items:center; }
    .songs-subpanel .grp-label{ font-size:10px; color:#999; margin-right:2px; }
    .songs-swatches{ display:flex; gap:5px; align-items:center; }
    .songs-swatch{ width:19px; height:19px; border-radius:50%; cursor:pointer; border:2px solid #ddd; }
    .songs-swatch.sel{ border-color:#333; transform:scale(1.15); }
    .songs-stickerchoice{ font-size:22px; background:#fff; border:2px solid transparent; border-radius:8px; padding:3px 7px; cursor:pointer; }
    .songs-stickerchoice.sel{ background:#fff0f5; border-color:#ff8fab; transform:scale(1.15); }
    .songs-size-btn{ border:none; background:#fff; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; width:34px; height:30px; }
    .songs-size-btn.sel{ background:#ff8fab; }
    .songs-size-btn .linebar{ display:block; width:22px; border-radius:99px; background:#555; }
    .songs-size-btn.sel .linebar{ background:#fff; }
    .songs-mode-btn{ border:none; background:#fff; border-radius:8px; padding:5px 10px; font-size:11px; cursor:pointer; color:#666; }
    .songs-mode-btn.sel{ background:#4d96ff; color:#fff; }
    .songs-toggle-btn{ border:none; background:#fff; border-radius:8px; padding:5px 10px; font-size:11px; cursor:pointer; color:#666; }
    .songs-toggle-btn.sel{ background:#6bcB77; color:#fff; }

    .songs-page{ position:relative; width:100%; min-height:200px; background:#fff8f0; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,.14); overflow:hidden; }
    .songs-lyrics{ position:relative; padding:26px 20px 26px 50px; pointer-events:none; }
    .songs-lyrics h2{ text-align:center; font-size:16pt; font-weight:700; color:#d47ab0; margin:0 0 2px; }
    .songs-lyrics .artist{ text-align:center; font-size:9pt; color:#999; margin-bottom:20px; }
    .songs-single{ width:100%; box-sizing:border-box; }
    .songs-section{ margin-top:8px; margin-bottom:8px; }
    .songs-seclabel{ font-size:7pt; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#aaa; margin-bottom:1px; }
    .songs-seclabel.chorus{ color:#c0392b; } .songs-seclabel.bridge{ color:#2980b9; } .songs-seclabel.instrumental,.songs-seclabel.intro,.songs-seclabel.outro,.songs-seclabel.interlude{ color:#27ae60; }
    .songs-line{ color:#333; }
    .songs-overlay{ position:absolute; inset:0; }
    .songs-canvas{ position:absolute; inset:0; width:100%; height:100%; }
    .songs-page:not(.readonly) .songs-canvas{ touch-action:none; -webkit-user-select:none; user-select:none; -webkit-touch-callout:none; }
    .songs-eraser-cursor{ position:absolute; border:2px solid #4d96ff; background:rgba(77,150,255,.15); border-radius:50%; pointer-events:none; transform:translate(-50%,-50%); display:none; z-index:5; }
    .songs-page:not(.readonly) .songs-note-wrap{ touch-action:none; }
    .songs-note-wrap{ position:absolute; width:220px; height:74px; min-width:60px; min-height:24px; max-width:340px; max-height:260px; box-sizing:border-box; cursor:grab; }
    .songs-note{ width:100%; height:100%; background:#fff9c4; border:2px solid #f0e08a; border-radius:6px; box-shadow:0 2px 5px rgba(0,0,0,.15); box-sizing:border-box; overflow:auto; scrollbar-width:none; -ms-overflow-style:none; }
    .songs-note::-webkit-scrollbar{ display:none; }
    .songs-note-text{ padding:4px 6px; font-size:11px; outline:none; white-space:pre-wrap; overflow-wrap:break-word; box-sizing:border-box; min-height:100%; }
    .songs-note-wrap .resize.corner{ position:absolute; right:-6px; bottom:-6px; width:15px; height:15px; background:#4d96ff; border-radius:4px; cursor:nwse-resize; display:none; }
    .songs-note-wrap .resize.corner::after{ content:''; position:absolute; right:3px; bottom:3px; width:6px; height:6px; border-right:2px solid #fff; border-bottom:2px solid #fff; }
    .songs-page:not(.readonly) .songs-note-wrap .resize.corner{ display:block; }
    .songs-page.readonly .songs-note-wrap .resize.corner{ display:none !important; }
    .songs-note.noborder{ background:transparent; border:none; box-shadow:none; }
    .songs-note-wrap .del{ position:absolute; top:-14px; right:-14px; width:16px; height:16px; background:#ff6b6b; color:#fff; border-radius:50%; font-size:9px; display:flex; align-items:center; justify-content:center; cursor:pointer; }
    .songs-note-wrap .done{ position:absolute; top:-14px; left:-14px; width:18px; height:18px; background:#6bcB77; color:#fff; border-radius:50%; font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; cursor:pointer; }
    .songs-page:not(.readonly) .songs-sticker{ touch-action:none; }
    .songs-sticker{ position:absolute; font-size:28px; cursor:grab; user-select:none; filter:drop-shadow(0 2px 3px rgba(0,0,0,.2)); }
    .songs-sticker .del{ position:absolute; top:-5px; right:-9px; width:14px; height:14px; background:#ff6b6b; color:#fff; border-radius:50%; font-size:9px; line-height:14px; text-align:center; display:none; }
    .songs-sticker .resize{ position:absolute; width:16px; height:16px; background:#4d96ff; color:#fff; border-radius:50%; font-size:10px; line-height:16px; text-align:center; display:none; }
    .songs-sticker .resize.grow{ bottom:-6px; right:-6px; } .songs-sticker .resize.shrink{ bottom:-6px; left:-6px; }
    .songs-sticker.sel .del, .songs-sticker.sel .resize{ display:block; }
    .songs-page.readonly .songs-canvas{ pointer-events:none; }
    .songs-page.readonly .songs-note-wrap{ pointer-events:none; cursor:default; }
    .songs-page.readonly .songs-note-wrap .del{ display:none !important; }
    .songs-page.readonly .songs-note-wrap .done{ display:none !important; }
    .songs-page.readonly .songs-sticker{ pointer-events:none; cursor:default; }
    .songs-hint{ font-size:10px; color:#a88; margin-top:6px; text-align:center; }
  `;
  document.head.appendChild(style);
}

/* ===================== HELPERS ===================== */
function songLetterOf(str){ const c=(str||'').trim()[0]||'#'; return /[0-9]/.test(c) ? '0-9' : c.toUpperCase(); }
function songKey(id){ return SONG_STORAGE_PREFIX+id; }
function songHasNote(id){
  const raw=localStorage.getItem(songKey(id));
  if(!raw) return false;
  try{ const d=JSON.parse(raw); return (d.strokes&&d.strokes.length)||(d.notes&&d.notes.length)||(d.stickers&&d.stickers.length); }
  catch(e){ return false; }
}
function songLoadData(id){
  const raw=localStorage.getItem(songKey(id));
  if(!raw) return {strokes:[],notes:[],stickers:[]};
  try{ const d=JSON.parse(raw); return {strokes:d.strokes||[],notes:d.notes||[],stickers:d.stickers||[]}; }
  catch(e){ return {strokes:[],notes:[],stickers:[]}; }
}
function songById(id){ return SONGS.find(s=>s.id===id); }

/* ===================== SETLISTS ===================== */
function songGetSetlists(){
  try{ return JSON.parse(localStorage.getItem(SONG_SETLIST_KEY)||'[]'); }
  catch(e){ return []; }
}
function songSaveSetlists(list){ localStorage.setItem(SONG_SETLIST_KEY, JSON.stringify(list)); }
function songCurrentSetlist(){ return songGetSetlists().find(s=>s.id===songState.activeSetlistId) || null; }
function songCreateSetlist(){
  const name = prompt('Name this setlist (e.g. "5 songs to practice this week")');
  if(!name || !name.trim()) return;
  const list = songGetSetlists();
  const id = 'sl_'+Date.now();
  list.push({id, name: name.trim(), songIds: []});
  songSaveSetlists(list);
  songState.activeSetlistId = id;
  songState.setlistManageMode = true;
  songsRerender();
}
function songSelectSetlist(id){
  songState.activeSetlistId = id;
  songState.setlistManageMode = false;
  songState.searchQuery = '';
  songsRerender();
}
function songSelectAllSongs(){
  songState.activeSetlistId = null;
  songState.setlistManageMode = false;
  songsRerender();
}
function songToggleSetlistManage(){
  songState.setlistManageMode = !songState.setlistManageMode;
  songsRerender();
}
function songDeleteSetlist(id){
  const list = songGetSetlists();
  const sl = list.find(s=>s.id===id);
  if(!sl) return;
  if(!confirm(`Delete setlist "${sl.name}"? (The songs themselves won't be deleted)`)) return;
  songSaveSetlists(list.filter(s=>s.id!==id));
  if(songState.activeSetlistId===id){ songState.activeSetlistId=null; songState.setlistManageMode=false; }
  songsRerender();
}
function songToggleSongInSetlist(songId){
  const list = songGetSetlists();
  const sl = list.find(s=>s.id===songState.activeSetlistId);
  if(!sl) return;
  const i = sl.songIds.indexOf(songId);
  if(i>=0) sl.songIds.splice(i,1); else sl.songIds.push(songId);
  songSaveSetlists(list);
  songsRerender();
}
function renderSetlistRow(){
  const setlists = songGetSetlists();
  const chips = [
    `<button class="songs-setlist-chip${!songState.activeSetlistId?' active':''}" onclick="songSelectAllSongs()">📚 All Songs</button>`,
    ...setlists.map(sl=>`<button class="songs-setlist-chip${songState.activeSetlistId===sl.id?' active':''}" onclick="songSelectSetlist('${sl.id}')">🎧 ${sl.name} (${sl.songIds.length})</button>`),
    `<button class="songs-setlist-chip new" onclick="songCreateSetlist()">＋ New Setlist</button>`
  ];
  return `<div class="songs-setlist-row">${chips.join('')}</div>`;
}
let songLyricsFontSize = 16; // always starts at 16pt fresh — not persisted across sessions
function songSetLyricsZoom(delta){
  songLyricsFontSize = Math.max(9, Math.min(28, songLyricsFontSize+delta));
  songRefreshLyricsFontSize();
}
function songRefreshLyricsFontSize(){
  const styleEl=document.getElementById('songs-lyrics-fontsize-style');
  if(styleEl) styleEl.textContent = `#songs-detail-page .songs-line{font-size:${songLyricsFontSize}pt;line-height:1.9;}`;
  const label=document.getElementById('songs-lyrics-fs-label');
  if(label) label.textContent = songLyricsFontSize+'pt';
  if(songState.view==='detail' && songState.mode!=='clean') songResizeCanvas();
}
function songSectionLabel(sec){
  let base = SONG_TYPE_LABEL[sec.type] || ('▸ '+sec.type);
  if(sec.type==='verse' && sec.num) base = '▸ Verse '+sec.num;
  if(sec.repeat) base += ' *';
  return base;
}
function songSectionLabelClass(sec){
  if(sec.type==='chorus') return 'chorus';
  if(sec.type==='bridge') return 'bridge';
  if(['instrumental','intro','outro','interlude'].includes(sec.type)) return sec.type;
  return '';
}

/* ===================== ROOT RENDER ===================== */
function renderSongs(){
  ensureSongsStyle();
  return `<div id="songs-root">${songState.view==='home' ? renderSongsHome() : renderSongDetail()}</div>`;
}
function songsRerender(){
  const root=document.getElementById('songs-root');
  if(!root) return;
  root.innerHTML = songState.view==='home' ? renderSongsHome() : renderSongDetail();
  songsPostRender();
}
function initSongsTab(){ ensureSongsStyle(); songsPostRender(); }
function songsPostRender(){
  if(songState.view==='detail'){
    songSetupDetailDom();
  }
}

/* ===================== HOME ===================== */
function songMatches(s,q){
  return [s.titleEn,s.titleTh,s.artistEn,s.artistTh].some(v=>(v||'').toLowerCase().includes(q));
}
function songItemHtml(s){
  const badge = songHasNote(s.id) ? '<span class="badge">📝</span>' : '';
  const titleTh = s.titleTh ? ` <span class="th">(${s.titleTh})</span>` : '';
  const artistTh = s.artistTh ? ` <span class="th">(${s.artistTh})</span>` : '';
  return `<div class="songs-item" onclick="songOpen('${s.id}')">
    <div class="t">${s.artistIcon||'🎵'} ${s.titleEn}${titleTh}${badge}</div>
    <div class="a">${s.artistEn}${artistTh}</div>
  </div>`;
}
function songCheckItemHtml(s, sl){
  const inSetlist = sl.songIds.includes(s.id);
  const titleTh = s.titleTh ? ` <span class="th">(${s.titleTh})</span>` : '';
  return `<div class="songs-item songs-check-item" onclick="songToggleSongInSetlist('${s.id}')">
    <input type="checkbox" ${inSetlist?'checked':''} onclick="event.stopPropagation();songToggleSongInSetlist('${s.id}')">
    <div style="flex:1">
      <div class="t">${s.artistIcon||'🎵'} ${s.titleEn}${titleTh}</div>
      <div class="a">${s.artistEn}</div>
    </div>
  </div>`;
}

function renderSongsHome(){
  const header = `
    <div class="songs-home-header">
      <h2>🎵 Walnut Song</h2>
      <div class="sub">Walnut's lyrics collection</div>
    </div>
    ${renderSetlistRow()}
  `;

  // ── Manage mode: pick which songs belong to the active setlist ──
  if(songState.activeSetlistId && songState.setlistManageMode){
    const sl = songCurrentSetlist();
    if(!sl){ songState.activeSetlistId=null; songState.setlistManageMode=false; return renderSongsHome(); }
    const items = SONGS.slice().sort((a,b)=>a.titleEn.localeCompare(b.titleEn)).map(s=>songCheckItemHtml(s, sl)).join('');
    return `${header}
      <div class="songs-setlist-bar">
        <div class="name">✎ Pick songs for "${sl.name}"</div>
        <button onclick="songToggleSetlistManage()">✓ Done</button>
      </div>
      <div>${items}</div>`;
  }

  // ── Viewing one setlist ──
  if(songState.activeSetlistId){
    const sl = songCurrentSetlist();
    if(!sl){ songState.activeSetlistId=null; return renderSongsHome(); }
    const songs = sl.songIds.map(songById).filter(Boolean);
    const listHtml = songs.length ? songs.map(songItemHtml).join('') : '<div class="songs-empty">No songs in this setlist yet — tap "Edit Songs" to add some</div>';
    return `${header}
      <div class="songs-setlist-bar">
        <div class="name">🎧 ${sl.name}</div>
        <button onclick="songToggleSetlistManage()">✎ Edit Songs</button>
        <button class="danger" onclick="songDeleteSetlist('${sl.id}')">🗑️ Delete</button>
      </div>
      <div>${listHtml}</div>`;
  }

  // ── Default: browse all songs ──
  const q = (songState.searchQuery||'').trim().toLowerCase();
  const field = songState.sortMode==='title' ? 'titleEn' : 'artistEn';
  let azHtml='', listHtml='';

  if(q){
    const results = SONGS.filter(s=>songMatches(s,q)).sort((a,b)=>a[field].localeCompare(b[field]));
    listHtml = results.length ? results.map(songItemHtml).join('') : '<div class="songs-empty">No matching songs found</div>';
  } else {
    const groups={};
    SONGS.forEach(s=>{ const l=songLetterOf(s[field]); (groups[l]=groups[l]||[]).push(s); });
    Object.values(groups).forEach(arr=>arr.sort((a,b)=>a[field].localeCompare(b[field])));
    azHtml = SONG_ALPHABET.map(l=>{
      const has=!!groups[l];
      return `<button class="${has?'':'disabled'}" ${has?`onclick="songScrollToLetter('${l}')"`:''}>${l}</button>`;
    }).join('');
    listHtml = SONG_ALPHABET.filter(l=>groups[l]).map(l=>
      `<div class="songs-section-hd" id="song-sec-${l}">${l}</div>`+groups[l].map(songItemHtml).join('')
    ).join('');
  }

  return `${header}
    <input id="songs-search" placeholder="Search by song title or artist..." value="${songState.searchQuery||''}" oninput="songOnSearch(this.value)">
    <div class="songs-seg">
      <button class="${songState.sortMode==='title'?'active':''}" onclick="songSetSort('title')">By Title</button>
      <button class="${songState.sortMode==='artist'?'active':''}" onclick="songSetSort('artist')">By Artist</button>
    </div>
    ${q ? '' : `<div class="songs-az">${azHtml}</div>`}
    <div>${listHtml}</div>
  `;
}
function songOnSearch(v){ songState.searchQuery=v; const listArea=document.getElementById('songs-root'); if(listArea){ /* re-render but keep focus */ }
  const root=document.getElementById('songs-root');
  root.innerHTML = renderSongsHome();
  const input=document.getElementById('songs-search');
  if(input){ input.focus(); input.selectionStart=input.selectionEnd=input.value.length; }
}
function songSetSort(m){ songState.sortMode=m; songsRerender(); }
function songScrollToLetter(l){ const el=document.getElementById('song-sec-'+l); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }

/* ===================== AUTO-SCROLL (teleprompter) ===================== */
function songGetScrollContainer(){
  // the header above (topbar/controls) is position:sticky, so scrolling this
  // container moves the lyrics page while the header stays put.
  return document.getElementById('song-scroll-container') || document.scrollingElement || document.documentElement;
}
function songScrollStep(ts){
  const el = songGetScrollContainer();
  if(!el){ songScrollRAF=null; return; }
  if(songScrollLastTime==null){ songScrollLastTime=ts; songScrollAccPos=el.scrollTop; }
  const dt=(ts-songScrollLastTime)/1000;
  songScrollLastTime=ts;
  const pxPerSec = SONG_SCROLL_SPEEDS[songScrollSpeed-1];
  // accumulate in a private float — el.scrollTop itself gets rounded to whole
  // pixels by the browser, so reading it back each frame would silently drop
  // sub-pixel increments at low speed and freeze the scroll.
  songScrollAccPos += pxPerSec*dt;
  el.scrollTop = songScrollAccPos;
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight-2;
  if(atBottom){ songStopAutoScroll(); return; }
  songScrollRAF = requestAnimationFrame(songScrollStep);
}
function songStartAutoScroll(){
  songScrollLastTime=null;
  songScrollAccPos=null;
  songScrollRAF = requestAnimationFrame(songScrollStep);
  const btn=document.getElementById('songs-scroll-btn');
  if(btn) btn.textContent='⏸';
}
function songStopAutoScroll(){
  if(songScrollRAF) cancelAnimationFrame(songScrollRAF);
  songScrollRAF=null;
  const btn=document.getElementById('songs-scroll-btn');
  if(btn) btn.textContent='▶️';
}
function songToggleAutoScroll(){
  if(songScrollRAF) songStopAutoScroll(); else songStartAutoScroll();
}
function songSetScrollSpeed(v){
  songScrollSpeed=parseInt(v,10);
  localStorage.setItem(SONG_SCROLL_SPEED_KEY, String(songScrollSpeed));
  const label=document.getElementById('songs-scroll-speed-label');
  if(label) label.textContent='Lv.'+songScrollSpeed;
}

function songResetScroll(){
  const el=songGetScrollContainer();
  if(el) el.scrollTop=0;
}
function songOpen(id){
  songStopAutoScroll();
  songActiveNote=null;
  songState.currentId=id;
  songState.view='detail';
  songState.mode='clean';
  songsRerender();
  songResetScroll();
}
function songGoBack(){
  if(songState.mode==='edit' && !songConfirmDiscardIfChanged()) return;
  songStopAutoScroll();
  songState.view='home';
  songState.currentId=null;
  songsRerender();
  songResetScroll();
}

/* ===================== DETAIL ===================== */
function renderSongLyricsHtml(song){
  const secHtml = song.sections.map(sec=>`
    <div class="songs-section">
      <div class="songs-seclabel ${songSectionLabelClass(sec)}">${songSectionLabel(sec)}</div>
      ${sec.lines.map(l=>`<div class="songs-line">${l||'&nbsp;'}</div>`).join('')}
    </div>`).join('');

  const titleTh = song.titleTh ? ` (${song.titleTh})` : '';
  return `
    <h2>${song.titleEn}${titleTh}</h2>
    <div class="artist">${song.artistIcon||''} ${song.artistEn}</div>
    <div class="songs-single">${secHtml}</div>
    <style id="songs-lyrics-fontsize-style">#songs-detail-page .songs-line{font-size:${songLyricsFontSize}pt;line-height:1.9;}</style>
  `;
}

function renderSongDetail(){
  const song = songById(songState.currentId);
  if(!song){ songState.view='home'; return renderSongsHome(); }
  const titleTh = song.titleTh ? ` (${song.titleTh})` : '';
  const artistTh = song.artistTh ? ` (${song.artistTh})` : '';

  let actionRow;
  if(songState.mode==='clean'){
    const saved = songHasNote(song.id);
    actionRow = saved
      ? `<button onclick="songEnterView()">📝 View Saved Notes</button><button class="primary" onclick="songEnterEdit()">✏️ Write/Edit Notes</button>`
      : `<button class="primary" onclick="songEnterEdit()">✏️ Start Writing Notes</button>`;
  } else if(songState.mode==='view'){
    actionRow = `<button onclick="songSetMode('clean')">Close (plain lyrics)</button><button class="primary" onclick="songEnterEdit()">✏️ Edit Notes</button>`;
  } else {
    actionRow = '';
  }

  const headerActions = songState.mode==='edit'
    ? `<button onclick="songCancelEdit()">✖️ Cancel</button><button class="primary" onclick="songSaveEdit()">💾 Save</button>`
    : actionRow;

  const dotBtn = (px)=>`<span class="linebar" style="height:${px}px"></span>`;

  return `
    <div class="songs-detail-header">
      <div class="songs-topbar">
        <button class="songs-back" onclick="songGoBack()">← Back</button>
        <div class="songs-title-block">
          <div class="t">${song.titleEn}${titleTh}</div>
          <div class="a">${song.artistEn}${artistTh}</div>
        </div>
        <div class="songs-topbar-actions">${headerActions}</div>
      </div>
      <div class="songs-toolbar" id="songs-toolbar" style="display:${songState.mode==='edit'?'flex':'none'}">
        <button class="songs-tool" data-tool="pencil" onclick="songSelectTool('pencil')">✏️<span>Pencil</span></button>
        <button class="songs-tool" data-tool="eraser" onclick="songSelectTool('eraser')">🧽<span>Eraser</span></button>
        <button class="songs-tool" data-tool="text" onclick="songSelectTool('text')">💬<span>Note</span></button>
        <button class="songs-tool" data-tool="sticker" onclick="songSelectTool('sticker')">⭐<span>Sticker</span></button>
        <button class="songs-tool" onclick="songUndo()">↩️<span>Undo</span></button>
      </div>
      <div class="songs-subpanel" id="songs-pencilpanel">
        <div class="songs-swatches" id="songs-swatches"></div>
        <div class="grp">
          <span class="grp-label">Size</span>
          <button class="songs-size-btn" data-size="xs" onclick="songSetBrushSize('xs')">${dotBtn(3)}</button>
          <button class="songs-size-btn" data-size="s" onclick="songSetBrushSize('s')">${dotBtn(6)}</button>
          <button class="songs-size-btn" data-size="m" onclick="songSetBrushSize('m')">${dotBtn(11)}</button>
          <button class="songs-size-btn" data-size="l" onclick="songSetBrushSize('l')">${dotBtn(18)}</button>
        </div>
      </div>
      <div class="songs-subpanel" id="songs-eraserpanel">
        <div class="grp">
          <button class="songs-mode-btn" data-mode="stroke" onclick="songSetEraserMode('stroke')">🧽 Erase Line</button>
          <button class="songs-mode-btn" data-mode="pixel" onclick="songSetEraserMode('pixel')">🩹 Erase Point</button>
        </div>
        <div class="grp">
          <span class="grp-label">Size</span>
          <button class="songs-size-btn" data-esize="s" onclick="songSetEraserSize('s')">${dotBtn(4)}</button>
          <button class="songs-size-btn" data-esize="m" onclick="songSetEraserSize('m')">${dotBtn(8)}</button>
          <button class="songs-size-btn" data-esize="l" onclick="songSetEraserSize('l')">${dotBtn(16)}</button>
        </div>
      </div>
      <div class="songs-subpanel" id="songs-notepanel">
        <div class="grp">
          <button class="songs-toggle-btn" data-border="1" onclick="songSetNoteBorder(true)">▭ Border</button>
          <button class="songs-toggle-btn" data-border="0" onclick="songSetNoteBorder(false)">⬚ No Border</button>
        </div>
        <div class="grp">
          <span class="grp-label">Size</span>
          <button class="songs-mode-btn" data-nfs="s" onclick="songSetNoteFontSize('s')">A⁻</button>
          <button class="songs-mode-btn" data-nfs="m" onclick="songSetNoteFontSize('m')">A</button>
          <button class="songs-mode-btn" data-nfs="l" onclick="songSetNoteFontSize('l')">A⁺</button>
        </div>
        <div class="songs-swatches" id="songs-note-swatches"></div>
      </div>
      <div class="songs-subpanel" id="songs-stickerpanel"></div>
    </div>
    <div class="songs-page ${songState.mode==='edit'?'':'readonly'}" id="songs-detail-page">
      <div class="songs-lyrics" id="songs-lyrics-layer">${renderSongLyricsHtml(song)}</div>
      <div class="songs-overlay" id="songs-overlay" style="display:${songState.mode==='clean'?'none':'block'}">
        <canvas class="songs-canvas" id="songs-canvas"></canvas>
        <div class="songs-eraser-cursor" id="songs-eraser-cursor"></div>
      </div>
    </div>
    <div class="songs-hint" style="display:${songState.mode==='edit'?'block':'none'}">Tap "Save" up top when you're done — you'll be asked to confirm before it overwrites the previous version</div>
    <div class="songs-bottom-bar">
      <div class="songs-bottom-group">
        <span class="songs-bottom-label">Text size</span>
        <button onclick="songSetLyricsZoom(-1)">🔍－</button>
        <span id="songs-lyrics-fs-label">${songLyricsFontSize}pt</span>
        <button onclick="songSetLyricsZoom(1)">🔍＋</button>
      </div>
      <div class="songs-bottom-group">
        <span class="songs-bottom-label">Autoscroll</span>
        <button id="songs-scroll-btn" onclick="songToggleAutoScroll()">${songScrollRAF?'⏸':'▶️'}</button>
        <input type="range" min="1" max="10" step="1" value="${songScrollSpeed}" oninput="songSetScrollSpeed(this.value)">
        <span id="songs-scroll-speed-label">Lv.${songScrollSpeed}</span>
      </div>
    </div>
    <div class="songs-bottom-spacer"></div>
  `;
}

/* ===================== MODE ===================== */
function songSetMode(m){
  songState.mode=m;
  songsRerender();
  if(m==='view' || m==='edit') songLoadWorkingIntoDom();
}
function songEnterView(){
  songLoadWorkingFromStorage();
  songSetMode('view');
}
function songEnterEdit(){
  if(songState.mode!=='view') songLoadWorkingFromStorage();
  songState.snapshot = songCurrentWorkingJSON();
  songSetMode('edit');
}
function songLoadWorkingFromStorage(){
  const d=songLoadData(songState.currentId);
  songState.strokes=JSON.parse(JSON.stringify(d.strokes));
  songState.notes=JSON.parse(JSON.stringify(d.notes));
  songState.stickers=JSON.parse(JSON.stringify(d.stickers));
  songActiveNote=null;
}
function songSerializeNote(n){ return {x:n.x,y:n.y,text:n.text,border:n.border,fontSize:n.fontSize,color:n.color,width:n.width,height:n.height}; }
function songSerializeSticker(s){ return {x:s.x,y:s.y,emoji:s.emoji,size:s.size}; }
function songCurrentWorkingJSON(){
  return JSON.stringify({
    strokes: songState.strokes,
    notes: songState.notes.map(songSerializeNote),
    stickers: songState.stickers.map(songSerializeSticker)
  });
}
function songSaveEdit(){
  const already = songHasNote(songState.currentId);
  const msg = already ? 'Overwrite the existing saved notes?' : 'Save these notes?';
  if(!confirm(msg)) return;
  const data = {
    strokes: songState.strokes,
    notes: songState.notes.map(songSerializeNote),
    stickers: songState.stickers.map(songSerializeSticker),
    savedAt: Date.now()
  };
  localStorage.setItem(songKey(songState.currentId), JSON.stringify(data));
  songSetMode('clean');
}
function songConfirmDiscardIfChanged(){
  const nowJSON = songCurrentWorkingJSON();
  if(nowJSON !== songState.snapshot){
    return confirm('You have unsaved changes. Discard them and cancel?');
  }
  return true;
}
function songCancelEdit(){
  if(!songConfirmDiscardIfChanged()) return;
  songSetMode('clean');
}

/* ===================== TOOLBAR ===================== */
function songBuildColorSwatches(containerId, current, onPick, colors){
  const el=document.getElementById(containerId);
  if(!el) return;
  el.innerHTML='';
  (colors||SONG_COLORS).forEach(c=>{
    const d=document.createElement('div');
    d.className='songs-swatch'+(c===current?' sel':'');
    d.style.background=c;
    d.onclick=()=>{ onPick(c); el.querySelectorAll('.songs-swatch').forEach(s=>s.classList.remove('sel')); d.classList.add('sel'); };
    el.appendChild(d);
  });
}
function songBuildSwatches(){
  songBuildColorSwatches('songs-swatches', songState.currentColor, (c)=>{ songState.currentColor=c; });
  songBuildColorSwatches('songs-note-swatches', songState.noteColor, (c)=>songSetNoteColor(c), SONG_NOTE_COLORS);
}
function songBuildStickerPanel(){
  const el=document.getElementById('songs-stickerpanel');
  if(!el) return;
  el.innerHTML='';
  SONG_STICKERS.forEach(s=>{
    const b=document.createElement('button');
    b.className='songs-stickerchoice'+(songState.selectedSticker===s?' sel':'');
    b.textContent=s;
    b.onclick=()=>{
      songState.selectedSticker=s;
      el.querySelectorAll('.songs-stickerchoice').forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel');
    };
    el.appendChild(b);
  });
}
function songSyncToolPanelButtons(){
  document.querySelectorAll('.songs-size-btn[data-size]').forEach(b=>b.classList.toggle('sel', b.dataset.size===songState.brushSize));
  document.querySelectorAll('.songs-size-btn[data-esize]').forEach(b=>b.classList.toggle('sel', b.dataset.esize===songState.eraserSize));
  document.querySelectorAll('.songs-mode-btn[data-mode]').forEach(b=>b.classList.toggle('sel', b.dataset.mode===songState.eraserMode));
  document.querySelectorAll('.songs-mode-btn[data-nfs]').forEach(b=>b.classList.toggle('sel', b.dataset.nfs===songState.noteFontSize));
  document.querySelectorAll('.songs-toggle-btn[data-border]').forEach(b=>b.classList.toggle('sel', (b.dataset.border==='1')===songState.noteBorder));
}
function songSetBrushSize(sz){ songState.brushSize=sz; songSyncToolPanelButtons(); }
function songSetEraserMode(m){ songState.eraserMode=m; if(m!=='pixel') songHideEraserCursor(); songSyncToolPanelButtons(); }
function songSetEraserSize(sz){ songState.eraserSize=sz; songSyncToolPanelButtons(); }
function songGetActiveNote(){
  if(songActiveNote && songState.notes.includes(songActiveNote)) return songActiveNote;
  const focused = songState.notes.find(n=>n._textEl===document.activeElement);
  if(focused) return focused;
  return songState.notes[songState.notes.length-1] || null;
}
function songSetNoteBorder(v){
  songState.noteBorder=v;
  const n=songGetActiveNote();
  if(n){ n.border=v; songRefreshNoteEl(n); }
  songSyncToolPanelButtons();
}
function songSetNoteFontSize(sz){
  songState.noteFontSize=sz;
  const n=songGetActiveNote();
  if(n){ n.fontSize=SONG_NOTE_FONT_SIZES[sz]; songRefreshNoteEl(n); }
  songSyncToolPanelButtons();
}
function songSetNoteColor(c){
  songState.noteColor=c;
  const n=songGetActiveNote();
  if(n){ n.color=c; songRefreshNoteEl(n); }
}
function songRefreshNoteEl(note){
  const el=note._el, textEl=note._textEl;
  if(!el||!textEl) return;
  el.className='songs-note'+(note.border===false?' noborder':'');
  el.style.borderColor = note.border===false ? '' : (note.color==='#ffffff' ? '#555555' : (note.color||'#f0e08a'));
  el.style.background = songNoteBackground(note);
  songCenterTextInline(textEl);
  textEl.style.fontSize=(note.fontSize||SONG_NOTE_FONT_SIZES.m)+'px';
  textEl.style.color=note.color||'#333333';
}
function songSelectTool(tool){
  songState.currentTool=tool;
  songHideEraserCursor();
  document.querySelectorAll('.songs-tool').forEach(b=>b.classList.remove('active'));
  const btn=document.querySelector(`.songs-tool[data-tool="${tool}"]`);
  if(btn) btn.classList.add('active');
  document.getElementById('songs-pencilpanel').classList.toggle('show', tool==='pencil');
  document.getElementById('songs-eraserpanel').classList.toggle('show', tool==='eraser');
  document.getElementById('songs-notepanel').classList.toggle('show', tool==='text');
  document.getElementById('songs-stickerpanel').classList.toggle('show', tool==='sticker');
  songSyncToolPanelButtons();
}

/* ===================== CANVAS / DOM SETUP ===================== */
let songDrawing=false, songCurrentStroke=null;

function songSetupDetailDom(){
  songBuildSwatches();
  songBuildStickerPanel();
  if(songState.mode==='clean') return;
  songLoadWorkingIntoDom();
}
function songLoadWorkingIntoDom(){
  const canvas=document.getElementById('songs-canvas');
  if(!canvas) return;
  songAttachCanvasEvents(canvas);
  songResizeCanvas();
  songRenderOverlayEls();
  if(songState.mode==='edit') songSelectTool(songState.currentTool||'pencil');
}
function songGetPageWrap(){ return document.getElementById('songs-detail-page'); }
function songResizeCanvas(){
  const canvas=document.getElementById('songs-canvas');
  const pageWrap=songGetPageWrap();
  if(!canvas||!pageWrap) return;
  const rect=pageWrap.getBoundingClientRect();
  if(!rect.width) return;
  canvas.width=rect.width*2; canvas.height=rect.height*2;
  canvas.style.width=rect.width+'px'; canvas.style.height=rect.height+'px';
  songRedraw();
}
window.addEventListener('resize', ()=>{ if(songState.view==='detail' && songState.mode!=='clean') songResizeCanvas(); });

function songGetPos(e, canvas){
  const rect=canvas.getBoundingClientRect();
  const cx=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;
  const cy=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;
  return {x:cx/rect.width, y:cy/rect.height};
}
function songRedraw(){
  const canvas=document.getElementById('songs-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  songState.strokes.forEach(s=>{
    if(s.points.length<2) return;
    ctx.strokeStyle=s.color;
    ctx.lineWidth=(s.size||SONG_BRUSH_SIZES.m)*(canvas.width/620);
    ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.beginPath();
    s.points.forEach((p,i)=>{ const x=p.x*canvas.width, y=p.y*canvas.height; if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); });
    ctx.stroke();
  });
}
function songAttachCanvasEvents(canvas){
  if(canvas.dataset.songBound) return;
  canvas.dataset.songBound='1';
  canvas.addEventListener('pointerdown',(e)=>{
    if(songState.mode!=='edit') return;
    songUpdateEraserCursor(e, canvas);
    if(songState.currentTool==='text' || songState.currentTool==='sticker') return;
    songDrawing=true;
    const pos=songGetPos(e,canvas);
    if(songState.currentTool==='pencil'){
      songCurrentStroke={color:songState.currentColor, size:SONG_BRUSH_SIZES[songState.brushSize], points:[pos]};
      songState.strokes.push(songCurrentStroke);
    } else if(songState.currentTool==='eraser'){
      songEraseNear(pos);
    }
  });
  canvas.addEventListener('pointermove',(e)=>{
    songUpdateEraserCursor(e, canvas);
    if(!songDrawing || songState.mode!=='edit') return;
    const pos=songGetPos(e,canvas);
    if(songState.currentTool==='pencil' && songCurrentStroke){ songCurrentStroke.points.push(pos); songRedraw(); }
    else if(songState.currentTool==='eraser'){ songEraseNear(pos); }
  });
  canvas.addEventListener('pointerleave', songHideEraserCursor);
  window.addEventListener('pointerup', ()=>{ songDrawing=false; songCurrentStroke=null; });

  const pageWrap=songGetPageWrap();
  if(pageWrap && !pageWrap.dataset.songClickBound){
    pageWrap.dataset.songClickBound='1';
    pageWrap.addEventListener('click',(e)=>{
      if(songState.mode!=='edit') return;
      if(songState.currentTool!=='text' && songState.currentTool!=='sticker') return;
      const overlay=document.getElementById('songs-overlay');
      if(e.target!==canvas && e.target!==pageWrap && e.target!==overlay) return;
      const rect=pageWrap.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width, y=(e.clientY-rect.top)/rect.height;
      if(songState.currentTool==='text') songAddNote(x,y,'');
      else if(songState.currentTool==='sticker' && songState.selectedSticker) songAddSticker(x,y,songState.selectedSticker);
    });
  }
}
function songEraserRadius(){
  return songState.eraserMode==='pixel'
    ? SONG_ERASER_SIZES_PIXEL[songState.eraserSize]
    : SONG_ERASER_SIZES_STROKE[songState.eraserSize];
}
function songUpdateEraserCursor(e, canvas){
  const cursor=document.getElementById('songs-eraser-cursor');
  if(!cursor) return;
  const show = songState.mode==='edit' && songState.currentTool==='eraser' && songState.eraserMode==='pixel';
  if(!show){ cursor.style.display='none'; return; }
  const rect=canvas.getBoundingClientRect();
  const diameterPx = songEraserRadius()*2*rect.width;
  cursor.style.display='block';
  cursor.style.width=diameterPx+'px';
  cursor.style.height=diameterPx+'px';
  cursor.style.left=(e.clientX-rect.left)+'px';
  cursor.style.top=(e.clientY-rect.top)+'px';
}
function songHideEraserCursor(){
  const cursor=document.getElementById('songs-eraser-cursor');
  if(cursor) cursor.style.display='none';
}
function songEraseNear(pos){
  const radius = songEraserRadius();
  if(songState.eraserMode==='pixel') songErasePixel(pos, radius);
  else songEraseStroke(pos, radius);
}
function songEraseStroke(pos, radius){
  let changed=false;
  songState.strokes = songState.strokes.filter(s=>{
    const hit=s.points.some(p=>Math.hypot(p.x-pos.x,p.y-pos.y)<radius);
    if(hit) changed=true;
    return !hit;
  });
  if(changed) songRedraw();
}
function songErasePixel(pos, radius){
  // removes only the points under the eraser, splitting a stroke into
  // separate segments wherever a middle chunk gets erased out.
  let changed=false;
  const newStrokes=[];
  songState.strokes.forEach(s=>{
    const hasHit = s.points.some(p=>Math.hypot(p.x-pos.x,p.y-pos.y)<radius);
    if(!hasHit){ newStrokes.push(s); return; }
    changed=true;
    let current=[];
    s.points.forEach(p=>{
      if(Math.hypot(p.x-pos.x,p.y-pos.y)<radius){
        if(current.length>1) newStrokes.push({color:s.color, size:s.size, points:current});
        current=[];
      } else {
        current.push(p);
      }
    });
    if(current.length>1) newStrokes.push({color:s.color, size:s.size, points:current});
  });
  if(changed){ songState.strokes=newStrokes; songRedraw(); }
}

let songActiveNote = null;

function songAddNote(x,y,text){
  const note={x,y,text, border:songState.noteBorder, fontSize:SONG_NOTE_FONT_SIZES[songState.noteFontSize], color:songState.noteColor};
  songState.notes.push(note);
  songActiveNote = note;
  songRenderNoteEl(note);
}
function songNoteBackground(note){
  if(note.border===false) return '';
  if(note.color==='#ffffff') return '#333333';
  return (note.color||'#f0e08a')+'22';
}
function songCenterTextInline(text){
  // set every centering-relevant property inline (highest possible CSS
  // specificity) so this can never be lost to stylesheet load timing/cache.
  text.style.setProperty('display','flex','important');
  text.style.setProperty('flex-direction','column','important');
  text.style.setProperty('justify-content','center','important');
  text.style.setProperty('align-items','center','important');
  text.style.setProperty('text-align','center','important');
  text.style.setProperty('width','100%','important');
  text.style.setProperty('height','100%','important');
  text.style.setProperty('box-sizing','border-box','important');
}
function songRenderNoteEl(note){
  const overlay=document.getElementById('songs-overlay');
  if(!overlay) return;
  // wrap = position/drag/resize (overflow:visible, so del/resize handle
  //        never get clipped); note = the visible bordered box that
  //        actually scrolls if the text is too long.
  const wrap=document.createElement('div');
  wrap.className='songs-note-wrap';
  wrap.style.left=(note.x*100)+'%'; wrap.style.top=(note.y*100)+'%';
  if(note.width) wrap.style.width=note.width+'px';
  if(note.height) wrap.style.height=note.height+'px';

  const box=document.createElement('div');
  box.className='songs-note'+(note.border===false?' noborder':'');
  box.style.borderColor = note.border===false ? '' : (note.color==='#ffffff' ? '#555555' : (note.color||'#f0e08a'));
  box.style.background = songNoteBackground(note);
  wrap.appendChild(box);

  const text=document.createElement('div');
  text.className='songs-note-text';
  text.contentEditable=(songState.mode==='edit');
  songCenterTextInline(text);
  text.style.fontSize=(note.fontSize||SONG_NOTE_FONT_SIZES.m)+'px';
  text.style.color=note.color||'#333333';
  text.innerText=note.text;
  text.addEventListener('input', ()=>{ note.text=text.innerText; });
  text.addEventListener('pointerdown', ()=>{ if(songState.mode==='edit') songActiveNote=note; });
  box.appendChild(text);
  note._el = box;
  note._textEl = text;

  const del=document.createElement('div');
  del.className='del'; del.textContent='✕';
  del.onclick=(ev)=>{ ev.stopPropagation(); songState.notes=songState.notes.filter(n=>n!==note); if(songActiveNote===note) songActiveNote=null; wrap.remove(); };
  wrap.appendChild(del);

  const done=document.createElement('div');
  done.className='done'; done.textContent='✓';
  done.onclick=(ev)=>{ ev.stopPropagation(); text.blur(); };
  wrap.appendChild(done);

  songMakeNoteResizable(wrap, note);
  songMakeDraggable(wrap, note);
  overlay.appendChild(wrap);
  if(songState.mode==='edit') text.focus();
}
function songMakeNoteResizable(wrap, note){
  const rh=document.createElement('div');
  rh.className='resize corner';
  wrap.appendChild(rh);
  let resizing=false, sx=0, sy=0, startW=0, startH=0;
  rh.addEventListener('pointerdown',(e)=>{
    if(songState.mode!=='edit') return;
    e.stopPropagation();
    resizing=true;
    rh.setPointerCapture(e.pointerId);
    sx=e.clientX; sy=e.clientY;
    startW=wrap.offsetWidth; startH=wrap.offsetHeight;
  });
  rh.addEventListener('pointermove',(e)=>{
    if(!resizing) return;
    e.stopPropagation();
    const nw=Math.max(60, Math.min(340, startW+(e.clientX-sx)));
    const nh=Math.max(24, Math.min(260, startH+(e.clientY-sy)));
    wrap.style.width=nw+'px'; wrap.style.height=nh+'px';
    note.width=nw; note.height=nh;
  });
  rh.addEventListener('pointerup', ()=>{ resizing=false; });
}
function songAddSticker(x,y,emoji){
  const st={x,y,emoji,size:SONG_STICKER_DEFAULT};
  songState.stickers.push(st);
  songRenderStickerEl(st);
}
function songRenderStickerEl(st){
  const overlay=document.getElementById('songs-overlay');
  if(!overlay) return;
  const el=document.createElement('div');
  el.className='songs-sticker';
  el.style.left=(st.x*100)+'%'; el.style.top=(st.y*100)+'%';
  el.style.fontSize=(st.size||SONG_STICKER_DEFAULT)+'px';
  el.textContent=st.emoji;
  const del=document.createElement('div');
  del.className='del'; del.textContent='✕';
  del.onclick=(ev)=>{ ev.stopPropagation(); songState.stickers=songState.stickers.filter(s=>s!==st); el.remove(); };
  el.appendChild(del);
  const grow=document.createElement('div');
  grow.className='resize grow'; grow.textContent='＋';
  grow.onclick=(ev)=>{ ev.stopPropagation(); st.size=Math.min(SONG_STICKER_MAX,(st.size||SONG_STICKER_DEFAULT)+6); el.style.fontSize=st.size+'px'; };
  el.appendChild(grow);
  const shrink=document.createElement('div');
  shrink.className='resize shrink'; shrink.textContent='－';
  shrink.onclick=(ev)=>{ ev.stopPropagation(); st.size=Math.max(SONG_STICKER_MIN,(st.size||SONG_STICKER_DEFAULT)-6); el.style.fontSize=st.size+'px'; };
  el.appendChild(shrink);
  el.addEventListener('click',(ev)=>{ ev.stopPropagation(); document.querySelectorAll('.songs-sticker').forEach(s=>s.classList.remove('sel')); el.classList.add('sel'); });
  songMakeDraggable(el, st);
  overlay.appendChild(el);
}
function songMakeDraggable(el, dataRef){
  let sx,sy,startLeft,startTop,dragging=false;
  el.addEventListener('pointerdown',(e)=>{
    if(songState.mode!=='edit') return;
    if(e.target.classList.contains('del') || e.target.classList.contains('resize') || e.target.classList.contains('done')) return;
    dragging=true;
    el.setPointerCapture(e.pointerId);
    sx=e.clientX; sy=e.clientY;
    const rect=songGetPageWrap().getBoundingClientRect();
    startLeft=dataRef.x*rect.width; startTop=dataRef.y*rect.height;
  });
  el.addEventListener('pointermove',(e)=>{
    if(!dragging) return;
    const rect=songGetPageWrap().getBoundingClientRect();
    const nx=(startLeft+(e.clientX-sx))/rect.width, ny=(startTop+(e.clientY-sy))/rect.height;
    dataRef.x=Math.max(0,Math.min(0.95,nx)); dataRef.y=Math.max(0,Math.min(0.95,ny));
    el.style.left=(dataRef.x*100)+'%'; el.style.top=(dataRef.y*100)+'%';
  });
  el.addEventListener('pointerup', ()=>{ dragging=false; });
}
function songUndo(){
  if(songState.strokes.length){ songState.strokes.pop(); songRedraw(); return; }
  if(songState.stickers.length){ songState.stickers.pop(); songRenderOverlayEls(); return; }
  if(songState.notes.length){ songState.notes.pop(); songRenderOverlayEls(); }
}
function songRenderOverlayEls(){
  const overlay=document.getElementById('songs-overlay');
  if(!overlay) return;
  overlay.querySelectorAll('.songs-note-wrap, .songs-sticker').forEach(el=>el.remove());
  songState.notes.forEach(songRenderNoteEl);
  songState.stickers.forEach(songRenderStickerEl);
  songRedraw();
}

// ===== 画面操作・学習処理・音声処理 =====
const $ = s => document.querySelector(s);
function h(tag, cls, txt){ const e=document.createElement(tag); if(cls) e.className=cls; if(txt!==undefined) e.textContent=txt; return e; } // textContentなので入力は安全に表示されます

// --- 学習記録（localStorage） ---
let save = {fav:[], done:[], wrong:[], days:[], reflect:""};
try { save = Object.assign(save, JSON.parse(localStorage.getItem('mac-save')) || {}); } catch(e){}
function persist(){ try{ localStorage.setItem('mac-save', JSON.stringify(save)); }catch(e){} }
const today = new Date().toISOString().slice(0,10);
if(!save.days.includes(today)){ save.days.push(today); persist(); }
function showProgress(){
  $('#progress').textContent = `おぼえた単語 ${save.done.filter(x=>WORDS.some(w=>w.en===x)).length}/${WORDS.length}　学習した日 ${save.days.length}日`;
  $('#wrong-info').textContent = save.wrong.length ? `復習したいフレーズ：${save.wrong.length}個` : '';
}

// --- 音声（ブラウザの読み上げ機能・無料） ---
function speak(text, times=1){
  if(!('speechSynthesis' in window)){ alert('この端末・ブラウザでは音声読み上げが使えません。Safari や Chrome の最新版でお試しください。'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang='en-US'; u.rate=parseFloat($('#rate').value);
  if(times>1) u.onend=()=>speak(text,times-1);
  speechSynthesis.speak(u);
}

// --- タブ ---
document.querySelectorAll('#tabs button').forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll('#tabs button,.panel').forEach(x=>x.classList.remove('on'));
    b.classList.add('on'); $(`#${b.dataset.tab}`).classList.add('on');
  };
});
$('#tgl').onclick=()=>{ const hide=document.body.classList.toggle('hide-ja'); $('#tgl').textContent = hide?'日本語訳を表示':'日本語訳を隠す'; };
$('#print').onclick=()=>window.print();

// --- 共通カード ---
function card(it, isWord){
  const c=h('div','card');
  c.append(h('div','en',it.en), h('div','pron','発音：'+(it.pron||'')), h('div','ja',it.ja));
  if(it.ex){ c.append(h('div','ex',it.ex), h('div','ja',it.exJa)); }
  if(it.note) c.append(h('div','note',it.note));
  const r=h('div','row no-print');
  const b1=h('button','','🔊 聞く'); b1.onclick=()=>speak(it.en);
  const b2=h('button','','🔁 3回'); b2.onclick=()=>speak(it.en,3);
  r.append(b1,b2);
  if(it.ex){ const b3=h('button','','🔊 例文'); b3.onclick=()=>speak(it.ex); r.append(b3); }
  const fav=h('button','', save.fav.includes(it.en)?'★':'☆');
  fav.onclick=()=>{ toggle(save.fav,it.en); fav.textContent=save.fav.includes(it.en)?'★':'☆'; persist(); };
  r.append(fav);
  if(isWord){
    const d=h('button','', save.done.includes(it.en)?'✓ おぼえた':'おぼえた？');
    d.onclick=()=>{ toggle(save.done,it.en); d.textContent=save.done.includes(it.en)?'✓ おぼえた':'おぼえた？'; persist(); showProgress(); };
    r.append(d);
  }
  c.append(r); return c;
}
function toggle(arr,v){ const i=arr.indexOf(v); i>=0?arr.splice(i,1):arr.push(v); }

WORDS.forEach(w=>$('#words-list').append(card(w,true)));
PHRASES.forEach(p=>$('#phrases-list').append(card(p)));
HOOPONO.forEach(p=>$('#hopono-list').append(card(p)));
$('#reflect').value=save.reflect||'';
$('#reflect').oninput=e=>{ save.reflect=e.target.value; persist(); };

// --- 最初の一言 ---
SCENES.forEach(s=>{
  const c=h('div','card'); c.append(h('div','en',s.title));
  s.items.forEach(it=>{
    const row=h('div','row'); const b=h('button','',it.en+' 🔊'); b.onclick=()=>speak(it.en);
    row.append(b, h('span','ja small',it.ja)); c.append(row);
  });
  $('#first-list').append(c);
});

// --- クイズ（日本語を見て英語を選ぶ） ---
function quiz(){
  const box=$('#quiz-box'); box.textContent='';
  const pool=PHRASES.concat(HOOPONO);
  const q=pool[Math.floor(Math.random()*pool.length)];
  const opts=[q]; while(opts.length<3){ const o=pool[Math.floor(Math.random()*pool.length)]; if(!opts.includes(o)) opts.push(o); }
  opts.sort(()=>Math.random()-.5);
  box.append(h('div','q','「'+q.ja+'」を英語で言うと？'));
  const fb=h('div','fb');
  opts.forEach(o=>{
    const b=h('button','opt',o.en);
    b.onclick=()=>{
      if(o===q){ fb.textContent='⭕ せいかい！ '+q.note; speak(q.en); save.wrong=save.wrong.filter(x=>x!==q.en); }
      else { fb.textContent='🌱 おしい！ 答えは "'+q.en+'" です。'+q.note; if(!save.wrong.includes(q.en)) save.wrong.push(q.en); }
      persist(); showProgress();
    };
    box.append(b);
  });
  const n=h('button','main','次の問題'); n.onclick=quiz;
  box.append(fb,n);
}
quiz();

// --- ガイド（定型文。AIではありません） ---
const gs=$('#guide-select');
Object.keys(GUIDES).forEach(k=>gs.append(new Option(k,k)));
function say(text,cls){ const m=h('div','msg '+cls,text); $('#chat-box').append(m); $('#chat-box').scrollTop=1e9; return m; }
say('Hello! ガイドを選んで「送る」を押すと、学習用の一言が表示されます。','bot');
function send(){
  const t=$('#user-input').value.trim(); if(!t) return;
  say('あなた：'+t,'me'); $('#user-input').value='';
  const list=GUIDES[gs.value]; const p=list[Math.floor(Math.random()*list.length)];
  setTimeout(()=>{
    const m=say(gs.value.split('（')[0]+'（定型の言葉）：'+p.en,'bot');
    const ja=h('div','ja small',p.ja); m.append(ja);
    const b=h('button','','🔊'); b.onclick=()=>speak(p.en); m.append(b);
  },400);
}
$('#send').onclick=send;
$('#user-input').addEventListener('keydown',e=>{ if(e.key==='Enter') send(); });

// --- 呼吸タイマー ---
let left=300, timer=null;
function showTime(){ $('#timer-display').textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0'); }
$('#start-btn').onclick=()=>{
  const b=$('#start-btn');
  if(timer){ clearInterval(timer); timer=null; b.textContent='Resume Session'; return; }
  b.textContent='Pause Session';
  timer=setInterval(()=>{
    if(left>0){ left--; showTime(); }
    else { clearInterval(timer); timer=null; b.textContent='Start Session'; alert('Meditation complete. Take a deep breath!'); }
  },1000);
};
$('#reset-btn').onclick=()=>{ clearInterval(timer); timer=null; left=300; showTime(); $('#start-btn').textContent='Start Session'; };
const phases=['Breathe in','Hold','Breathe out']; let ph=0;
setInterval(()=>{ ph=(ph+1)%3; $('#breath-text').textContent=phases[ph]; },4000);

showProgress();
if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').catch(()=>{}); }

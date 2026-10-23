// ===== 読み込みエラーを画面に表示（原因をすぐ見つけるため） =====
function showErr(m){const d=document.createElement('div');d.style.cssText='background:#7f1d1d;color:#fff;padding:10px;margin:8px;border-radius:10px;font-size:.85rem';d.textContent=m;document.body.prepend(d);}
window.addEventListener('error',e=>showErr('エラー：'+e.message+'（'+String(e.filename||'').split('/').pop()+'）'));
if(typeof WORDS==='undefined'){window.WORDS=[];showErr('words.js が読み込めていません。GitHubに words.js がアップロードされているか確認してください。');}
if(typeof PHRASES==='undefined'){window.PHRASES=[];window.HOOPONO=[];window.SCENES=[];window.GUIDES={};showErr('phrases.js が読み込めていません。GitHubに phrases.js がアップロードされているか確認してください。');}
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
function speak(text, times=1, r){
  if(!('speechSynthesis' in window)){ alert('この端末・ブラウザでは音声読み上げが使えません。Safari や Chrome の最新版でお試しください。'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang='en-US'; u.rate=r||parseFloat($('#rate').value);
  if(times>1) u.onend=()=>speak(text,times-1,r);
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

// --- テーマ別学習 ---
THEMES.forEach(t=>{
  const c=h('div','card'); c.append(h('div','en',t.title));
  t.items.forEach(it=>{ const row=h('div','row'); const b=h('button','',it.en+' 🔊'); b.onclick=()=>speak(it.en); row.append(b,h('span','ja small',it.ja)); c.append(row); });
  $('#theme-list').append(c);
});

// --- 英文を作る練習（6段階） ---
const MODES=[['match','1 意味を選ぶ'],['choose','2 正しい英文'],['fill','3 空欄'],['order','4 並べ替え'],['read','5 音読'],['recall','6 思い出す']];
let mode='match';
const pool=()=>PHRASES.concat(HOOPONO);
const shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const pick=()=>{const p=pool();return p[Math.floor(Math.random()*p.length)];};
const clean=w=>w.replace(/[.,?!]/g,'');
function addWrong(k){ if(!save.wrong.includes(k)) save.wrong.push(k); persist(); showProgress(); }
function dropWrong(k){ save.wrong=save.wrong.filter(x=>x!==k); persist(); showProgress(); }
function mcq(box,text,opts,right,q){
  box.append(h('div','q',text)); const fb=h('div','fb');
  shuffle(opts).forEach(o=>{ const b=h('button','opt',o); b.onclick=()=>{
    if(o===right){ fb.textContent='⭕ せいかい！ '+(q.note||''); speak(q.en); dropWrong(q.en); }
    else { fb.textContent='🌱 おしい！ 答えは「'+right+'」です。'+(q.note||''); addWrong(q.en); }
  }; box.append(b); });
  box.append(fb);
}
function practice(){
  const box=$('#quiz-box'); box.textContent='';
  document.querySelectorAll('#modes button').forEach(b=>b.classList.toggle('sel',b.dataset.m===mode));
  const q=pick(); const toks=q.en.split(' ');
  if(mode==='match'){
    const o=[q]; while(o.length<3){ const x=pick(); if(!o.includes(x)) o.push(x); }
    mcq(box,'「'+q.ja+'」を英語で言うと？',o.map(x=>x.en),q.en,q);
  } else if(mode==='choose'){
    let v=[toks.slice().reverse().join(' '),shuffle(toks).join(' ')].filter((x,i,a)=>x!==q.en&&a.indexOf(x)===i);
    while(v.length<2){ const x=pick().en; if(x!==q.en&&!v.includes(x)) v.push(x); }
    mcq(box,'正しい英文はどれ？「'+q.ja+'」',[q.en,v[0],v[1]],q.en,q);
  } else if(mode==='fill'){
    const idx=toks.map((t,i)=>clean(t).length>=3?i:-1).filter(i=>i>=0); const i=idx.length?idx[Math.floor(Math.random()*idx.length)]:0;
    const ans=clean(toks[i]); const o=[ans];
    while(o.length<3){ const ws=pick().en.split(' ').map(clean).filter(w=>w.length>=3); const w=ws[Math.floor(Math.random()*ws.length)]; if(w&&!o.includes(w)) o.push(w); }
    const t2=toks.slice(); t2[i]=t2[i].replace(ans,'____');
    mcq(box,'「'+q.ja+'」　'+t2.join(' '),o,ans,q);
  } else if(mode==='order'){
    box.append(h('div','q','「'+q.ja+'」を英語に並べましょう'));
    const out=h('div','card','　'); const row=h('div','row'); const fb=h('div','fb'); let got=[];
    shuffle(toks).forEach(t=>{ const b=h('button','',t); b.onclick=()=>{ got.push(t); b.disabled=true; out.textContent=got.join(' ');
      if(got.length===toks.length){ if(got.join(' ')===q.en){ fb.textContent='⭕ せいかい！'; speak(q.en); dropWrong(q.en); } else { fb.textContent='🌱 おしい！ 答えは「'+q.en+'」です。'; addWrong(q.en); } } }; row.append(b); });
    const rs=h('button','','やり直し'); rs.onclick=practice;
    box.append(out,row,rs,fb);
  } else if(mode==='read'){
    box.append(h('div','q',q.en),h('div','ja',q.ja),h('div','small','発音：'+q.pron));
    const r=h('div','row'); const fb=h('div','fb');
    const b1=h('button','','🔊 聞く'); b1.onclick=()=>speak(q.en);
    const b2=h('button','','🐢 ゆっくり'); b2.onclick=()=>speak(q.en,1,0.5);
    const b3=h('button','main','声に出した！'); b3.onclick=()=>{ fb.textContent='👏 すばらしい！ 声に出せました。'; };
    r.append(b1,b2,b3); box.append(r,fb);
  } else {
    box.append(h('div','q','「'+q.ja+'」を、英語で思い出してみましょう'));
    const ans=h('div','card','');  const r=h('div','row');
    const show=h('button','','答えを見る');
    show.onclick=()=>{ ans.textContent=q.en; speak(q.en); r.textContent='';
      const ok=h('button','main','言えた'); ok.onclick=()=>{ dropWrong(q.en); practice(); };
      const ng=h('button','','まだ'); ng.onclick=()=>{ addWrong(q.en); practice(); }; r.append(ok,ng); };
    r.append(show); box.append(ans,r);
  }
  const n=h('button','main','次の問題'); n.onclick=practice; box.append(n);
}
MODES.forEach(m=>{ const b=h('button','',m[1]); b.dataset.m=m[0]; b.onclick=()=>{ mode=m[0]; practice(); }; $('#modes').append(b); });
practice();

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

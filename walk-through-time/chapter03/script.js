const scenes=[
 {id:'music',img:'music.webp',title:'Built for<br><em>music.</em>',eyebrow:'CHAPTER THREE · 03 / 06',desc:'Music is a huge part of my life — an outlet for <strong>creativity</strong>. I built my own guitar, compose music — also with AI — and play grunge and hard rock covers. And yes, I love Led Zeppelin.',alt:'Guitar',location:'MUSIC · CREATIVITY'},
 {id:'restoration',img:'restoration.webp',title:'Made by<br><em>hand.</em>',eyebrow:'01 · CRAFT & RESTORATION',desc:'I like getting my hands dirty and understanding how things really work. Bringing an old bicycle back to life is about <strong>solving real problems</strong> — and the satisfaction of seeing it back on the road.',location:'RESTORATION · HOW THINGS WORK'},
 {id:'books',img:'books.jpeg',title:'Between<br><em>the lines.</em>',eyebrow:'02 · BOOKS',desc:'<strong>Getting lost</strong> in a good book. I always carry one in my bag — a companion on the road, and another world to step into whenever I open it.',location:'BOOKS · IDEAS & INSPIRATION'},
 {id:'running',img:'running.jpg',title:'Keep<br><em>moving.</em>',eyebrow:'03 · RUNNING',desc:'The joy of challenging myself, one step at a time. Running has taught me to <strong>set a goal</strong> and <strong>keep working</strong> towards it — <strong>no matter how hard it is</strong> to reach.',alt:'Riccardo with his medal at the RomaOstia Half Marathon 2025',location:'ROMAOSTIA HALF MARATHON · 2025'}
];
const musicQuote=`<details class="music-quote-disclosure" open><summary>JACK BLACK ON LED ZEPPELIN</summary><blockquote class="music-quote"><p>“Led Zeppelin: the greatest rock and roll band of all time. Yeah. Better than the Beatles, better than the Stones, even better than Tenacious D. They sang songs about love, about Vikings... about Vikings making love.”</p><cite>Jack Black · <a href="https://www.youtube.com/shorts/r2BJr1FiV_8" target="_blank" rel="noopener noreferrer">WATCH THE CLIP ↗</a></cite></blockquote></details>`;
let index=0, busy=false, startX=null, requestedScene=null;
const current=document.querySelector('#current'),incoming=document.querySelector('#incoming'),stage=document.querySelector('#stage'),prev=document.querySelector('#prev'),next=document.querySelector('#next'),number=document.querySelector('#pageNumber'),progress=document.querySelector('#progress');
const isEmbedded=window.parent!==window;
document.documentElement.classList.toggle('is-embedded',isEmbedded);
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const sceneButtons=scenes.map((scene,i)=>{
 const button=document.createElement('button');
 const title=scene.title.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
 button.type='button';
 button.textContent=String(i+1).padStart(2,'0');
 button.setAttribute('aria-label',`Go to scene ${i+1} of ${scenes.length}: ${title}`);
 button.setAttribute('aria-controls','current');
 button.title=title;
 button.addEventListener('click',()=>turn(i-index));
 return button;
});
progress.append(...sceneButtons);
const songDialog=document.querySelector('#songDialog'),song=document.querySelector('#originalSong'),songError=document.querySelector('#songError');
let songTrigger=null,songRequest=0;
function stopSong(close=false){
 songRequest++;
 song.pause();
 if(close&&songDialog.open)songDialog.close();
}
async function openSong(trigger){
 songTrigger=trigger;
 songError.hidden=true;
 if(!songDialog.open)songDialog.showModal();
 const request=++songRequest;
 try{await song.play()}
 catch(error){
  if(request!==songRequest)return;
  console.warn('Song playback unavailable',error);
  songError.textContent='Playback could not start. Press Play to try again.';
  songError.hidden=false;
 }
}
song.addEventListener('play',()=>{
 if(window.parent!==window)window.parent.postMessage({type:'walk-through-time:song-play'},'*');
});
song.addEventListener('playing',()=>{songError.hidden=true});
song.addEventListener('error',()=>{
 console.warn('Original song unavailable',song.error);
 songError.textContent='This track could not be loaded. Please try again.';
 songError.hidden=false;
});
document.querySelector('#closeSong').addEventListener('click',()=>songDialog.close());
songDialog.addEventListener('click',event=>{if(event.target===songDialog)songDialog.close()});
songDialog.addEventListener('close',()=>{
 stopSong();
 if(songTrigger?.isConnected&&document.hasFocus())songTrigger.focus({preventScroll:true});
});
window.addEventListener('message',event=>{
 if(event.source!==window.parent||event.data?.type!=='walk-through-time:pause-song')return;
 stopSong(event.data.close===true);
});
const imageCache=new Map(),quoteStates=new WeakMap();
function getPhoto(i){
 const url='assets/'+scenes[i].img;
 if(!imageCache.has(url)){
  const img=new Image(); img.decoding='async'; img.src=url;
  const ready=new Promise(resolve=>{
   if(img.complete){resolve(img.naturalWidth>0);return;}
   img.addEventListener('load',()=>resolve(true),{once:true});
   img.addEventListener('error',()=>resolve(false),{once:true});
  });
  imageCache.set(url,{img,ready});
 }
 return imageCache.get(url);
}
function render(el,i){
 const s=scenes[i];el.dataset.scene=i;
 el.innerHTML=`<img class="photo" src="assets/${s.img}" alt="${s.alt||s.location}" draggable="false" loading="eager" decoding="async"><div class="shade"></div><div class="copy${i===0?' music-copy':''}"${i===0?' tabindex="0" role="region" aria-label="Music story"':''}><div class="eyebrow">${s.eyebrow}</div><h1>${s.title}</h1><p>${s.desc}</p>${i===0?'<button class="music-listen" type="button" data-listen-song aria-haspopup="dialog" aria-controls="songDialog">LISTEN TO <em>THE CROWN IS ASH</em> ♫</button>':''}${i===0?musicQuote:''}${s.location?`<div class="location">${s.location}</div>`:''}</div><div class="fold"></div>`;
 const quote=el.querySelector('.music-quote-disclosure');
 if(quote)quoteStates.set(quote,quote.open);
}
function update(){
 number.textContent=String(index+1).padStart(2,'0')+' / '+String(scenes.length).padStart(2,'0');
 prev.disabled=busy||index===0;next.disabled=busy||index===scenes.length-1;
 progress.setAttribute('aria-busy',String(busy));
 sceneButtons.forEach((button,i)=>{
  button.classList.toggle('active',i===index);
  button.setAttribute('aria-disabled',String(busy));
  if(i===index)button.setAttribute('aria-current','step');
  else button.removeAttribute('aria-current');
 });
}
function waitForTurn(el){
 return new Promise(resolve=>{
  if(motionPreference.matches){resolve();return;}
  let done=false;
  const finish=()=>{if(done)return;done=true;el.removeEventListener('transitionend',onEnd);motionPreference.removeEventListener('change',onMotionChange);clearTimeout(timer);resolve();};
  const onEnd=e=>{if(e.target===el&&e.propertyName==='transform')finish();};
  const onMotionChange=e=>{if(e.matches)finish();};
  el.addEventListener('transitionend',onEnd);
  motionPreference.addEventListener('change',onMotionChange);
  const timer=setTimeout(finish,1100);
 });
}
async function turn(delta){
 if(delta===0||songDialog.open||busy||index+delta<0||index+delta>=scenes.length)return;
 busy=true;update();
 const target=index+delta;
 let turnFrame=0;
 try{
  // Never reveal a new scene until its image has loaded successfully.
  const ok=await getPhoto(target).ready;
  if(!ok){console.error('Unable to load scene image:',scenes[target].img);return;}
  stage.classList.toggle('reverse',delta<0);
  render(incoming,target);
  incoming.style.visibility='visible';
  incoming.setAttribute('aria-hidden','true');
  current.classList.remove('turning');
  current.style.transition='none';current.style.transform='rotateY(0deg)';
  void current.offsetWidth;
  current.style.transition='';current.style.transform='';
  if(!motionPreference.matches){
   turnFrame=requestAnimationFrame(()=>{turnFrame=requestAnimationFrame(()=>current.classList.add('turning'));});
   await waitForTurn(current);
  }
  index=target;
  // Preserve the frame and photo crop across turns; quote toggles can still resize it.
  render(current,index);
 }finally{
  cancelAnimationFrame(turnFrame);
  current.style.transition='none';current.classList.remove('turning');current.style.transform='none';
  incoming.style.visibility='hidden';incoming.innerHTML='';
  stage.classList.remove('reverse');
  void current.offsetWidth;current.style.transition='';current.style.transform='';
  busy=false;update();
  // Prepare adjacent scenes without delaying interaction.
  for(const i of [index-1,index+1])if(i>=0&&i<scenes.length)getPhoto(i);
  openRequestedScene();
 }
}
function resetEmbeddedHeight(){
 if(isEmbedded)window.parent.postMessage({type:'walk-through-time:chapter-resize'},'*');
}
function openRequestedScene(){
 if(requestedScene===null||busy)return;
 const target=requestedScene;
 requestedScene=null;
 turn(target-index);
}
window.addEventListener('message',event=>{
 if(event.source!==window.parent||event.data?.type!=='walk-through-time:open-scene')return;
 const target=scenes.findIndex(scene=>scene.id===event.data.scene);
 if(target<0){console.warn('Unknown passion scene:',event.data.scene);return;}
 stopSong(true);
 requestedScene=target;
 openRequestedScene();
});
prev.addEventListener('click',()=>turn(-1));next.addEventListener('click',()=>turn(1));
document.addEventListener('keydown',async e=>{
 if(songDialog.open||(!isEmbedded&&e.target.closest?.('.music-copy')))return;
 if(isEmbedded&&(e.key==='PageDown'||e.key==='PageUp')){
  e.preventDefault();
  window.parent.postMessage({type:'walk-through-time:page-story',direction:e.key==='PageDown'?1:-1},'*');
  return;
 }
 const delta=e.key==='ArrowRight'||e.key==='PageDown'?1:e.key==='ArrowLeft'||e.key==='PageUp'?-1:0;
 if(!delta)return;
 e.preventDefault();
 if(busy)return;
 await turn(delta);
 if(e.target.closest?.('.progress'))sceneButtons[index].focus({preventScroll:true});
});
stage.addEventListener('click',event=>{
 const trigger=event.target.closest('[data-listen-song]');
 if(trigger&&!busy)openSong(trigger);
});
stage.addEventListener('toggle',event=>{
 const quote=event.target;
 if(!quote.matches('.music-quote-disclosure')||quoteStates.get(quote)===quote.open)return;
 quoteStates.set(quote,quote.open);
 // Rendering an already-open quote also emits toggle; only user changes need a new height.
 if(!busy&&current.contains(quote))resetEmbeddedHeight();
},true);
stage.addEventListener('touchstart',e=>{startX=e.changedTouches[0].screenX},{passive:true});
stage.addEventListener('touchend',e=>{if(startX===null)return;const dx=e.changedTouches[0].screenX-startX;startX=null;if(Math.abs(dx)>55)turn(dx<0?1:-1)},{passive:true});
render(current,0);update();
if(isEmbedded){
 const notifyHeight=()=>window.parent.postMessage({type:'walk-through-time:chapter-height',height:Math.ceil(stage.getBoundingClientRect().height),width:innerWidth,viewportHeight:innerHeight},'*');
 new ResizeObserver(notifyHeight).observe(stage);
 addEventListener('resize',notifyHeight);
}
getPhoto(1);

const scenes=[
 {id:'exploring',img:'zaino.jpg',title:'Always<br><em>exploring.</em>',eyebrow:'CHAPTER TWO · 02 / 06',desc:'A backpack always ready. I travel because <strong>curiosity never really takes a day off</strong>. It’s also a chance to exchange ideas, question my own assumptions, see things from a different perspective — and grow.',location:'A PLACE TO GO · A STORY TO TELL'},
 {id:'vienna',img:'vienna.jpg',title:'Routes &<br><em>possibilities.</em>',eyebrow:'01 · THE ROUTES WE TAKE',desc:'<strong>A misunderstood direction</strong> in Vienna led us to a small, historic shop near the Hofburg Palace. They made their own chocolate — and our wrong turn became a <strong>delicious discovery</strong>.',alt:'A map of Vienna',location:'VIENNA · NEAR THE HOFBURG'},
 {id:'istanbul',img:'cisterna.jpg',title:'Places<br><em>that stay.</em>',eyebrow:'02 · WONDER',desc:'Istanbul was unforgettable. The Basilica Cistern brought its layers of history close: Roman, Byzantine and Ottoman heritage; ancient beliefs, Christianity and Islam — in today’s secular, Muslim-majority Turkey.',alt:'The Basilica Cistern in Istanbul',location:'ISTANBUL · BASILICA CISTERN'},
 {id:'playa-del-carmen',img:'piscina.jpg',title:'Moments<br><em>in between.</em>',eyebrow:'03 · THE PAUSE',desc:'Exploring also means knowing when to <strong>slow down</strong> and look around.',location:'PLAYA DEL CARMEN · MEXICO'},
 {id:'maui',img:'tramonto.jpg',title:'Still<br><em>discovering.</em>',eyebrow:'04 · THE HORIZON',desc:'Every destination becomes the beginning of another journey. And with every journey, a <strong>new version of me emerges.</strong>',location:'KAPALUA BEACH · MAUI'}
];
let index=0, busy=false, startX=null, requestedScene=null;
const current=document.querySelector('#current'),incoming=document.querySelector('#incoming'),stage=document.querySelector('#stage'),prev=document.querySelector('#prev'),next=document.querySelector('#next'),number=document.querySelector('#pageNumber'),progress=document.querySelector('#progress');
document.documentElement.classList.toggle('is-embedded',window.parent!==window);
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
const imageCache=new Map();
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
 el.innerHTML=`<img class="photo" src="assets/${s.img}" alt="${s.alt||s.location}" draggable="false" loading="eager" decoding="async"><div class="shade"></div><div class="copy"><div class="eyebrow">${s.eyebrow}</div><h1>${s.title}</h1><p>${s.desc}</p><div class="location">${s.location}</div></div><div class="fold"></div>`;
 if(document.documentElement.classList.contains('is-embedded'))el.querySelector('.copy').tabIndex=0;
}
function update(){
 number.textContent=String(index+1).padStart(2,'0')+' / '+String(scenes.length).padStart(2,'0');
 prev.disabled=busy||index===0;next.disabled=busy||index===scenes.length-1;
 progress.setAttribute('aria-busy',String(busy));
 sceneButtons.forEach((button,i)=>{
  button.classList.toggle('active',i<=index);
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
 if(delta===0||busy||index+delta<0||index+delta>=scenes.length)return;
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
function openRequestedScene(){
 if(requestedScene===null||busy)return;
 const target=requestedScene;
 requestedScene=null;
 turn(target-index);
}
window.addEventListener('message',event=>{
 if(event.source!==window.parent||event.data?.type!=='walk-through-time:open-scene')return;
 const target=scenes.findIndex(scene=>scene.id===event.data.scene);
 if(target<0){console.warn('Unknown travel scene:',event.data.scene);return;}
 requestedScene=target;
 openRequestedScene();
});
prev.addEventListener('click',()=>turn(-1));next.addEventListener('click',()=>turn(1));
document.addEventListener('keydown',async e=>{
 if(window.parent!==window&&(e.key==='PageDown'||e.key==='PageUp')){
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
stage.addEventListener('touchstart',e=>{startX=e.changedTouches[0].screenX},{passive:true});
stage.addEventListener('touchend',e=>{if(startX===null)return;const dx=e.changedTouches[0].screenX-startX;startX=null;if(Math.abs(dx)>55)turn(dx<0?1:-1)},{passive:true});
render(current,0);update();
getPhoto(1);

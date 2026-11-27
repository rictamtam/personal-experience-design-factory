
'use strict';
const A='assets/';
const chapters=[
{label:'Prologue',eyebrow:'PROLOGUE · 00',title:'Hi, I’m<br><em>Riccardo.</em>',copy:'Two sides to the story, one person. Before every slide, every pipeline and every demo, there’s a small-town kid who still gets emotional over a sunset and a goal scored in the last minute.',memories:[['01-portrait-of-riccardo.jpg','A PERSON, MANY SIDES','Every journey begins with a person.'],['06-sunset-on-a-beach.jpg','THE LITTLE THINGS','The moments worth slowing down for.']]},
{label:'Childhood',eyebrow:'CHAPTER ONE · 01',title:'Where it<br><em>all began.</em>',copy:'I was born in a small town in Campania, where a little square in front of the village church became our football pitch every afternoon. Friends, football, and a whole world to discover.',memories:[['02-children-playing-football-in-a-small-tow.jpg','A SMALL TOWN','A square, a football and a bunch of friends.'],['01-portrait-of-riccardo.jpg','ROOTS','The places we come from stay with us.']]},
{label:'The world',eyebrow:'CHAPTER TWO · 02',title:'Always<br><em>exploring.</em>',copy:'A backpack always ready. I travel because curiosity never really takes a day off. It’s also a chance to exchange ideas, question my own assumptions, see things from a different perspective — and grow.',memories:[['08-at-the-finish-line-of-the-rome-marathon-.jpg','KEEP MOVING','One finish line, then the next.'],['03-a-travel-backpack-covered-in-patches-fro.jpg','FARTHER AFIELD','New places, new perspectives.'],['05-a-mountain-cabin-at-night.jpg','OUT THERE','The joy of getting away.']]},
{label:'Passions',eyebrow:'CHAPTER THREE · 03',title:'Built for<br><em>music.</em>',copy:'Music is a huge part of my life. I built my own guitar, compose music — also with AI — and play grunge and hard rock covers. And yes, I love Led Zeppelin.',memories:[['11-an-electric-guitar-resting-on-a-sofa.jpg','MUSIC','Just for the joy of playing.'],['09-riccardo-working-on-a-vintage-bicycle.jpg','RESTORATION','Patience, craft and a little grease.'],['10-a-row-of-books-on-a-table.jpg','CURIOSITY','Always something new to learn.']]},
{label:'Turning point',eyebrow:'CHAPTER FOUR · 04',title:'Switching<br><em>gears.</em>',copy:'Then Monday morning arrives and I switch gears completely. Same energy, different setting: meeting rooms, calls and events. What never changes is wanting to play the game well.',memories:[['12-riccardo-in-work-mode.jpg','A DIFFERENT SETTING','Same person, different rhythm.'],['13-riccardo-on-stage-at-an-adobe-event.jpg','ON STAGE','Ideas are better when shared.']]},
{label:'At work',eyebrow:'CHAPTER FIVE · 05',title:'Where I make<br><em>a difference.</em>',copy:'Since 2018, I’ve worked with major Italian organizations in energy, financial services, transportation and public administration. Today, as an Enterprise Sales Specialist at Adobe Italy specializing in cloud solutions, I connect technology, creativity and customer experience — <strong>helping people</strong> understand not just how a solution works, but what it <strong>could change for their business</strong>.',memories:[['13-riccardo-on-stage-at-an-adobe-event.jpg','SHARING IDEAS','The human side of technology.'],['15-adobe-sales-achievement-awards.jpg','MILESTONES','Every achievement is a team story.']]},
{label:'Today',eyebrow:'EPILOGUE · 06',title:'Many sides.<br><em>One person.</em>',copy:'Curiosity. Discipline. Patience. They shape how I explore, what I create and how I face a challenge. In life and at work, the thread stays the same.',memories:[['01-portrait-of-riccardo.jpg','THE PRESENT','A story still being written.'],['06-sunset-on-a-beach.jpg','WHAT COMES NEXT','There is always another horizon.']]}
];

const $=id=>document.getElementById(id);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const timeline=$('timeline'),story=$('story'),dialog=$('lightbox');
const journeyPhotos=[
 {src:A+'cover-editorial.png',chapter:0,label:'The person',caption:'Riccardo · Walk Through Time',cover:true},
 {src:A+'02-children-playing-football-in-a-small-tow.jpg',chapter:1,label:'Where it all began',caption:'Friends, football and a village square.'},
 {src:'chapter02/assets/zaino.jpg',chapter:2,scene:'exploring',label:'Always exploring',caption:'A backpack always ready.'},
 {src:'chapter02/assets/vienna.jpg',chapter:2,scene:'vienna',label:'Routes & possibilities',caption:'Vienna · An unexpected chocolate discovery near the Hofburg.'},
 {src:'chapter02/assets/cisterna.jpg',chapter:2,scene:'istanbul',label:'Places that stay',caption:'Istanbul · Basilica Cistern.'},
 {src:'chapter02/assets/piscina.jpg',chapter:2,scene:'playa-del-carmen',label:'Moments in between',caption:'Playa del Carmen · Mexico.'},
 {src:'chapter02/assets/tramonto.jpg',chapter:2,scene:'maui',label:'Still discovering',caption:'Kapalua Beach · Maui.'},
 {src:'chapter03/assets/music.webp',chapter:3,scene:'music',label:'Music',caption:'A guitar I built. Music I make.'},
 {src:'chapter03/assets/restoration.webp',chapter:3,scene:'restoration',label:'Made by hand',caption:'Curiosity & patience.'},
 {src:'chapter03/assets/books.jpeg',chapter:3,scene:'books',label:'Between the lines',caption:'Ideas & inspiration.'},
 {src:'chapter03/assets/running.jpg',chapter:3,scene:'running',label:'Keep moving',caption:'RomaOstia Half Marathon 2025.'},
 {src:A+'switching-gears-cutout.png',chapter:4,label:'Switching gears',caption:'Same person, different rhythm.'},
 {src:A+'13-riccardo-on-stage-at-an-adobe-event.jpg',chapter:5,label:'On stage',caption:'Sharing ideas at an Adobe event.'},
 {src:A+'15-adobe-sales-achievement-awards.jpg',chapter:5,label:'Milestones',caption:'Every achievement is a team story.'}
];
const gallery=journeyPhotos;
function photoIndex(src){return gallery.findIndex(photo=>photo.src===src)}
chapters.forEach((c,i)=>{
 const sec=document.createElement('section');sec.className='chapter';sec.id='chapter-'+i;sec.dataset.chapter=i;sec.setAttribute('aria-label',c.label);
 if(i===0){
 sec.classList.add('lumiere-hero');
 sec.innerHTML=`<div class="lumiere-copy"><h1 class="lumiere-name" aria-label="Riccardo Tammaro"><span>RICCARDO</span><span>TAMMARO</span></h1><div class="lumiere-subtitle"><span>WALK THROUGH TIME</span><em>The Story of Becoming.</em></div></div><img class="lumiere-portrait" src="assets/cover-editorial.png" alt="Black and white portrait of Riccardo in a white shirt, seated on a leather sofa and looking toward the viewer" fetchpriority="high"><a class="lumiere-scroll" href="#chapter-1">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>`;
 story.append(sec);
 const link=document.createElement('a');link.href='#chapter-0';link.className='milestone';link.innerHTML='<span>00</span><small>Prologue</small>';link.setAttribute('aria-label','Jump to Prologue');timeline.append(link);
 return;
 }
 if(i===1){
  sec.classList.add('memory-hero');
  sec.innerHTML=`<div class="memory-bar"><span>CHAPTER ONE · 01</span><span>THE MEMORY — WHERE IT ALL BEGAN</span></div><img class="memory-photo" src="assets/02-children-playing-football-in-a-small-tow.jpg" alt="Children playing football in a village square" loading="eager"><div class="memory-shade" aria-hidden="true"></div><div class="memory-content"><p class="memory-kicker">CHAPTER ONE · 01 / 06</p><h1>Where it<br><em>all began.</em></h1><div id="childhood-story" class="memory-story" aria-live="polite" aria-atomic="true"><p class="memory-story-panel is-current" aria-hidden="false">${c.copy}</p><p id="childhood-lesson" class="memory-story-panel" aria-hidden="true">My friends and I often played against older boys. To have a chance of scoring, we had to play as a team. That was my first lesson in <strong>teamwork</strong> — one I still carry into my working life.</p></div></div><button id="childhoodLesson" class="memory-lesson-toggle" type="button" aria-controls="childhood-lesson" aria-expanded="false">THE FIRST LESSON ↓</button><a class="memory-continue" href="#chapter-2">SCROLL TO REMEMBER ↓</a>`;
  story.append(sec);
  const link=document.createElement('a');link.href='#chapter-1';link.className='milestone';link.innerHTML='<span>01</span><small>Childhood</small>';link.setAttribute('aria-label','Jump to Childhood');timeline.append(link);
  return;
 }
 if(i===3){
  sec.classList.add('collection-chapter');
  sec.innerHTML=`<div class="journey-chapter-bar"><span>CHAPTER THREE · 03</span><span>PASSIONS — A PERSONAL COLLECTION</span></div><iframe class="page-turn-frame" src="chapter03/index.html" title="Passions: sfoglia quattro scene fotografiche" loading="lazy"></iframe><div class="collection-exit"><span>TURN THE PAGE · CLICK · SWIPE</span><a href="#chapter-4">CONTINUE THE JOURNEY ↓</a></div>`;
  story.append(sec);
  const link=document.createElement('a');link.href='#chapter-3';link.className='milestone';link.innerHTML='<span>03</span><small>Passions</small>';link.setAttribute('aria-label','Jump to Passions');timeline.append(link);
  return;
 }
 if(i===2){
  sec.classList.add('page-turn-chapter');
  sec.innerHTML=`<div class="page-turn-heading"><span>CHAPTER TWO · 02</span><span>ALWAYS EXPLORING — A PHOTOGRAPHIC JOURNEY</span></div><iframe class="page-turn-frame" src="chapter02/index.html" title="Always Exploring: sfoglia cinque scene fotografiche" loading="lazy"></iframe><div class="page-turn-exit"><span>TURN THE PAGE · CLICK · SWIPE</span><a href="#chapter-3">CONTINUE THE JOURNEY ↓</a></div>`;
  story.append(sec);
  const link=document.createElement('a');link.href='#chapter-2';link.className='milestone';link.innerHTML='<span>02</span><small>The world</small>';link.setAttribute('aria-label','Jump to The world');timeline.append(link);
  return;
 }
 if(i===4){
  sec.classList.add('cutout-chapter');
  sec.innerHTML=`<div class="journey-chapter-bar"><span>CHAPTER FOUR · 04</span><span>SWITCHING GEARS — A DIFFERENT SETTING</span></div><div class="cutout-heading" aria-hidden="true"><span>SWITCHING</span><span>GEARS</span></div><img class="cutout-portrait" src="assets/switching-gears-cutout.png" alt="Riccardo in giacca marrone, camicia bianca e cravatta bordeaux" loading="lazy"><div class="cutout-content"><p class="eyebrow">CHAPTER FOUR · 04</p><p>${c.copy}</p><a class="continue" href="#chapter-5">CONTINUE ↓</a></div>`;
  story.append(sec);
  const link=document.createElement('a');link.href='#chapter-4';link.className='milestone';link.innerHTML='<span>04</span><small>Turning point</small>';link.setAttribute('aria-label','Jump to Turning point');timeline.append(link);
  return;
 }
 if(i===5){
  sec.classList.add('professional-chapter');
  const career=`<section class="professional-career" aria-label="Career at Adobe"><p>CAREER AT ADOBE</p><ol><li><strong>2018–2022</strong><span>Sales Engineer</span></li><li><strong>2022–PRESENT</strong><span>Enterprise Sales Specialist</span></li></ol></section>`;
  const moments=[
   {image:'13-riccardo-on-stage-at-an-adobe-event.jpg',name:'ON STAGE',heading:c.title,lead:'Technology opens possibilities. My job is to make them relevant.',description:c.copy,alt:'Riccardo speaking on stage at an Adobe event'},
   {image:'15-adobe-sales-achievement-awards.jpg',name:'MILESTONES',heading:'Milestones<br><em>along the way.</em>',description:'Every achievement is a <strong>team story</strong>. These milestones recognize consistent results — and the trust of the people I work with.',alt:'Adobe recognition awards, including Platinum Club 2023 and 2025'}
  ];
  const total=String(moments.length).padStart(2,'0');
  const renderMoment=(m,j)=>{
   if(j===1)return `<article class="professional-moment professional-moment-2 professional-milestones" id="work-moment-2" aria-label="${m.name}"><div class="milestone-intro"><p class="professional-kicker">02 / ${total} · MILESTONES</p><h2>${m.heading}</h2><p class="professional-description">${m.description}</p></div><figure class="milestone-photo"><div class="milestone-photo-frame"><img src="${A+m.image}" alt="${m.alt}" width="1448" height="1086" loading="lazy" decoding="async"></div></figure><section class="milestone-record milestone-agent"><span class="milestone-year">2021</span><div><h3>Agent of Change</h3><p>Sales Engineer of the Year, selected by an internal peer vote.</p></div></section><section class="milestone-performance" aria-label="Annual sales target attainment"><h3>Annual target attainment</h3><dl>${[[2023,190],[2024,136],[2025,185]].map(([year,value])=>`<div><dt>${year}</dt><dd aria-label="${value}%"><span class="milestone-value" data-count="${value}" aria-hidden="true">${value}</span><span class="milestone-unit" aria-hidden="true">%</span></dd></div>`).join('')}</dl></section><section class="milestone-record milestone-platinum"><span class="milestone-year">2023 · 2025</span><div><h3>Platinum Club</h3><p>Awarded for reaching 150%+ of the annual sales target.</p></div></section><section class="milestone-record milestone-achievement"><span class="milestone-year">2023–2025</span><div><h3>Sales Achievement Award</h3><p>Three consecutive years of exceeding the annual target.</p></div></section><a class="professional-next" href="#chapter-6">CONTINUE THE JOURNEY ↓</a></article>`;
   return `<article class="professional-moment professional-moment-${j+1}" id="work-moment-${j+1}" aria-label="${m.name}"><div class="professional-image-wrap"><img src="${A+m.image}" alt="${m.alt}" loading="${j===0?'eager':'lazy'}" decoding="async"></div><div class="professional-text"><p class="professional-kicker">${String(j+1).padStart(2,'0')} / ${total} · ${m.name}</p><h2${j===0?' class="professional-personal-title"':''}>${m.heading}</h2>${m.lead?`<p class="professional-lead">${m.lead}</p>`:''}<p class="professional-description">${m.description}</p>${j===0?career:''}</div><div class="professional-moment-number">${String(j+1).padStart(2,'0')} / ${total}</div></article>`;
  };
  sec.innerHTML=`<div class="journey-chapter-bar"><span>CHAPTER FIVE · 05</span><span>WHERE I MAKE A DIFFERENCE</span></div><div class="professional-intro"><span>IDEAS · PEOPLE · IMPACT</span><span>THE PROFESSIONAL STORY</span></div><div class="professional-moments">${moments.map(renderMoment).join('')}</div><nav class="professional-index" aria-label="Work moments"><a href="#work-moment-1">01 · ON STAGE</a><a href="#work-moment-2">02 · MILESTONES</a></nav>`;
  story.append(sec);
  const link=document.createElement('a');link.href='#chapter-5';link.className='milestone';link.innerHTML='<span>05</span><small>At work</small>';link.setAttribute('aria-label','Jump to At work');timeline.append(link);
  return;
 }
 sec.classList.add('epilogue-chapter');
 const signature=`<figure class="epilogue-signature" lang="en"><p class="eyebrow" data-reveal>A THOUGHT I CARRY WITH ME</p><blockquote data-reveal><p>Something Wonderful Always Happens</p></blockquote><figcaption data-reveal>Riccardo Tammaro</figcaption></figure>`;
 const cards=journeyPhotos.map(photo=>`<li class="memory-card${photo.cover?' memory-cover':''}" data-reveal><button type="button" data-gallery="${photoIndex(photo.src)}" aria-label="Enlarge: ${photo.label}"><img data-src="${photo.src}" alt="${photo.label}" loading="lazy" decoding="async" draggable="false"></button><p>${photo.label}</p><a href="#chapter-${photo.chapter}${photo.scene?'?scene='+photo.scene:''}"${photo.scene?' data-scene-link aria-label="Return to '+photo.label+'"':''}>CHAPTER ${String(photo.chapter).padStart(2,'0')} · ${chapters[photo.chapter].label} <span aria-hidden="true">↗</span></a></li>`).join('');
 sec.innerHTML=`<div class="journey-chapter-bar"><span>EPILOGUE · 06</span><span>MANY SIDES — ONE PERSON</span></div><div class="epilogue-copy"><p class="eyebrow" data-reveal>THE STORY IS STILL BEING WRITTEN</p><h1 data-reveal>Many sides.<br><em>One person.</em></h1><div class="epilogue-note"><p class="epilogue-traits" data-reveal><strong>Curiosity.</strong> <strong>Discipline.</strong> <strong>Patience.</strong></p><p data-reveal>They shape how I explore, what I create and how I face a challenge. In life and at work, the thread stays the same.</p><a class="connect" href="https://www.linkedin.com/in/%E2%AD%95%EF%B8%8F-riccardo-tammaro-32509a30/" target="_blank" rel="noopener noreferrer">Let’s connect ↗ <span class="connect-network">on LinkedIn</span></a></div></div><div class="memory-strip-heading"><p id="memories-title">A FEW MOMENTS. THE WHOLE JOURNEY.</p><div class="memory-strip-controls" role="group" aria-label="Photograph navigation"><button id="memoryPrevious" class="memory-motion memory-browse" type="button" aria-controls="memoryStrip" aria-label="Previous photographs">←</button><button id="memoryNext" class="memory-motion memory-browse" type="button" aria-controls="memoryStrip" aria-label="Next photographs">→</button><button id="memoryMotion" class="memory-motion" type="button" aria-controls="memoryStrip" aria-label="Pause photo movement" aria-pressed="false">PAUSE</button></div></div><ul id="memoryStrip" class="memory-strip" aria-labelledby="memories-title" aria-describedby="memories-hint" tabindex="0">${cards}</ul><p id="memories-hint" class="memory-strip-hint">USE THE ARROWS OR SCROLL TO EXPLORE · SELECT A PHOTO TO ENLARGE</p>${signature}<a class="epilogue-back" href="#chapter-0">BACK TO THE BEGINNING ↑</a>`;
 story.append(sec);
 const link=document.createElement('a');link.href='#chapter-'+i;link.className='milestone';link.innerHTML=`<span>${String(i).padStart(2,'0')}</span><small>${c.label}</small>`;link.setAttribute('aria-label','Jump to '+c.label);timeline.append(link);
});
const masthead=document.querySelector('.masthead'),footer=document.querySelector('.footer');
function syncViewportChrome(){
 document.documentElement.style.setProperty('--header-height',Math.ceil(masthead.getBoundingClientRect().height)+'px');
 document.documentElement.style.setProperty('--footer-height',Math.ceil(footer.getBoundingClientRect().height)+'px');
}
syncViewportChrome();
if('ResizeObserver'in window){
 const chromeObserver=new ResizeObserver(syncViewportChrome);
 chromeObserver.observe(masthead);
 chromeObserver.observe(footer);
}
addEventListener('resize',syncViewportChrome);
const sceneFrames=new Map([2,3].map(chapter=>[chapter,document.querySelector(`#chapter-${chapter} iframe`)]));
function openSceneRoute(){
 const route=location.hash.match(/^#chapter-([23])\?scene=([a-z0-9-]+)$/);
 if(!route)return;
 const chapter=Number(route[1]),frame=sceneFrames.get(chapter);
 frame.contentWindow?.postMessage({type:'walk-through-time:open-scene',scene:route[2]},'*');
 $('chapter-'+chapter).scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 frame.focus({preventScroll:true});
}
addEventListener('hashchange',openSceneRoute);
sceneFrames.forEach((frame,chapter)=>frame.addEventListener('load',()=>{
 if(location.hash.startsWith('#chapter-'+chapter+'?scene='))openSceneRoute();
}));
story.addEventListener('click',event=>{
 const link=event.target.closest('a[data-scene-link]');
 if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 event.preventDefault();
 if(location.hash===link.hash)openSceneRoute();
 else location.hash=link.hash;
});
openSceneRoute();
if('IntersectionObserver'in window){
 const motion=matchMedia('(prefers-reduced-motion: reduce)'),frames=new Map(),entered=new Set();
 const finish=node=>{
  cancelAnimationFrame(frames.get(node));
  frames.delete(node);
  node.textContent=node.dataset.count;
 };
 const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   const node=entry.target;
   if(!entry.isIntersecting){
    finish(node);
    entered.delete(node);
    return;
   }
   if(entry.intersectionRatio<.6||entered.has(node))return;
   entered.add(node);
   if(motion.matches)return;
   const target=Number(node.dataset.count),start=performance.now();
   node.textContent='0';
   const tick=now=>{
    const progress=Math.min((now-start)/1600,1);
    node.textContent=String(Math.floor(target*(1-Math.pow(1-progress,3))));
    if(progress<1)frames.set(node,requestAnimationFrame(tick));
    else finish(node);
   };
   frames.set(node,requestAnimationFrame(tick));
  });
 },{threshold:[0,.6]});
 document.querySelectorAll('.milestone-value').forEach(node=>counterObserver.observe(node));
 motion.addEventListener('change',()=>{
  if(motion.matches)frames.forEach((frame,node)=>finish(node));
 });
}
if(!reduced&&'IntersectionObserver'in window){
 const chapter=$('chapter-4'),portrait=chapter.querySelector('.cutout-portrait');
 let inView=false;
 chapter.classList.add('cutout-title-pending');
 const reveal=()=>{
  if(!inView||!portrait.complete||!portrait.naturalWidth)return;
  chapter.classList.add('cutout-title-ready');
 };
 const observer=new IntersectionObserver(entries=>{
  inView=entries.some(entry=>entry.isIntersecting&&entry.intersectionRatio>=.12);
  if(entries.every(entry=>!entry.isIntersecting))chapter.classList.remove('cutout-title-ready');
  reveal();
 },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
 const unavailable=()=>{
  console.warn('Chapter 04 portrait could not be loaded.');
  chapter.classList.remove('cutout-title-pending');
  observer.disconnect();
 };
 portrait.addEventListener('load',reveal,{once:true});
 portrait.addEventListener('error',unavailable,{once:true});
 observer.observe(portrait);
 if(portrait.complete&&!portrait.naturalWidth)unavailable();
}
const childhoodLesson=$('childhoodLesson'),childhoodPanels=[...document.querySelectorAll('.memory-story-panel')];
childhoodLesson.addEventListener('click',()=>{
 const showLesson=childhoodLesson.getAttribute('aria-expanded')!=='true';
 childhoodPanels.forEach((panel,index)=>{
  const current=index===Number(showLesson);
  panel.classList.toggle('is-current',current);
  panel.classList.toggle('is-past',showLesson&&index===0);
  panel.setAttribute('aria-hidden',String(!current));
 });
 childhoodLesson.setAttribute('aria-expanded',String(showLesson));
 childhoodLesson.textContent=showLesson?'BACK TO THE MEMORY ↑':'THE FIRST LESSON ↓';
});
const links=[...timeline.children],sections=[...document.querySelectorAll('.chapter')];let active=-1,scheduled=false;
function setActive(i){if(i===active)return;active=i;$('chapterCount').textContent=String(i).padStart(2,'0')+' / 06';$('timelineCaption').textContent=chapters[i].label.toUpperCase();document.body.classList.toggle('editorial-active',i===6);links.forEach((l,n)=>{l.classList.toggle('active',n===i);l.classList.toggle('visited',n<i);if(n===i)l.setAttribute('aria-current','location');else l.removeAttribute('aria-current')})}
function update(){
 scheduled=false;
 const scrollMax=document.documentElement.scrollHeight-innerHeight;
 const ratio=scrollMax>0?Math.max(0,Math.min(1,scrollY/scrollMax)):0;
 $('scrollProgress').style.transform='scaleX('+ratio+')';
 const y=innerHeight*.48;let n=0;
 sections.forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.top<=y)n=i});
 setActive(n);
}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update();
if('IntersectionObserver'in window){
 const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  entry.target.classList.add('visible');
  obs.unobserve(entry.target);
 }),{threshold:.08,rootMargin:'0px 0px -5% 0px'});
 sections.forEach(section=>obs.observe(section));
 document.querySelectorAll('[data-reveal]:not(.memory-card)').forEach(element=>obs.observe(element));
}else document.querySelectorAll('.chapter,[data-reveal]:not(.memory-card)').forEach(element=>element.classList.add('visible'));
const memoryStrip=$('memoryStrip'),memoryCards=[...memoryStrip.children];
function loadMemoryCard(card){
 const image=card.querySelector('img'),source=image.dataset.src;
 if(!source)return;
 let finished=false;
 const reveal=()=>{
  if(finished)return;
  finished=true;
  image.removeEventListener('load',reveal);
  image.removeEventListener('error',reveal);
  if(!image.naturalWidth)console.warn('Memory photograph unavailable:',image.src);
  card.classList.add('visible');
 };
 image.addEventListener('load',reveal,{once:true});
 image.addEventListener('error',reveal,{once:true});
 image.src=source;
 delete image.dataset.src;
 if(image.complete)reveal();
}
if('IntersectionObserver'in window){
 const photos=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  loadMemoryCard(entry.target);
  photos.unobserve(entry.target);
 }),{root:memoryStrip,rootMargin:'0px 180px',threshold:.01});
 memoryCards.forEach(card=>photos.observe(card));
}else{
 const loadNearby=()=>{
  const left=memoryStrip.scrollLeft-180,right=memoryStrip.scrollLeft+memoryStrip.clientWidth+180;
  memoryCards.forEach(card=>{if(card.offsetLeft+card.offsetWidth>=left&&card.offsetLeft<=right)loadMemoryCard(card)});
 };
 memoryStrip.addEventListener('scroll',loadNearby,{passive:true});
 addEventListener('resize',loadNearby);
 loadNearby();
}
memoryStrip.addEventListener('focusin',event=>{
 const card=event.target.closest('.memory-card');
 if(card)loadMemoryCard(card);
});
memoryStrip.addEventListener('keydown',event=>{
 if(event.target!==memoryStrip||!['ArrowLeft','ArrowRight'].includes(event.key))return;
 event.preventDefault();
 memoryStrip.scrollBy({left:(event.key==='ArrowRight'?1:-1)*memoryStrip.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
const memoryMotion=$('memoryMotion'),memoryMotionQuery=matchMedia('(prefers-reduced-motion: reduce)'),memoryControls=document.querySelector('.memory-strip-controls');
const memoryPrevious=$('memoryPrevious'),memoryNext=$('memoryNext');
function syncMemoryBrowse(){
 memoryPrevious.disabled=memoryStrip.scrollLeft<=1;
 memoryNext.disabled=memoryStrip.scrollLeft>=memoryStrip.scrollWidth-memoryStrip.clientWidth-1;
}
for(const [button,direction] of [[memoryPrevious,-1],[memoryNext,1]]){
 button.addEventListener('click',()=>{
  pauseMemoryInteraction();
  memoryStrip.scrollBy({left:direction*memoryStrip.clientWidth*.8,behavior:memoryMotionQuery.matches?'instant':'smooth'});
 });
}
memoryStrip.addEventListener('scroll',syncMemoryBrowse,{passive:true});
addEventListener('resize',syncMemoryBrowse);
syncMemoryBrowse();
const hoveredMemories=new Set();
let memoryFrame=0,memoryTime=0,memoryPosition=0,memoryVisible=false,memoryPaused=false,memoryPointerDown=false,memoryResumeTimer=0;
function canMoveMemories(){
 return memoryVisible&&!document.hidden&&!dialog.open&&!memoryPaused&&!memoryMotionQuery.matches&&!memoryPointerDown&&!memoryResumeTimer&&!hoveredMemories.size&&!memoryStrip.querySelector('.memory-card:hover')&&!memoryStrip.matches(':focus-within')&&!memoryControls.matches(':focus-within')&&memoryStrip.scrollWidth>memoryStrip.clientWidth;
}
function syncMemoryMotion(){
 memoryMotion.disabled=memoryMotionQuery.matches;
 memoryMotion.textContent=memoryMotionQuery.matches?'MOTION OFF':memoryPaused?'RESUME':'PAUSE';
 memoryMotion.setAttribute('aria-pressed',String(memoryPaused||memoryMotionQuery.matches));
 memoryMotion.setAttribute('aria-label',memoryMotionQuery.matches?'Photo movement disabled by reduced motion preference':memoryPaused?'Resume photo movement':'Pause photo movement');
 if(!canMoveMemories()){
  cancelAnimationFrame(memoryFrame);
  memoryFrame=0;memoryTime=0;
 }else if(!memoryFrame){
  memoryPosition=memoryStrip.scrollLeft;
  memoryFrame=requestAnimationFrame(moveMemories);
 }
}
function moveMemories(time){
 if(!canMoveMemories()){syncMemoryMotion();return}
 if(memoryTime)memoryPosition+=Math.min(time-memoryTime,50)*.024;
 memoryTime=time;
 memoryPosition=Math.min(memoryPosition,memoryStrip.scrollWidth-memoryStrip.clientWidth);
 memoryStrip.scrollLeft=memoryPosition;
 // Recycle fully offscreen cards without duplicating photos or shifting the visible row.
 while(memoryStrip.children.length>1){
  const first=memoryStrip.firstElementChild,next=first.nextElementSibling;
  const pitch=next.offsetLeft-first.offsetLeft;
  if(pitch<=0||memoryPosition<first.offsetLeft+pitch)break;
  memoryStrip.append(first);
  memoryPosition-=pitch;
  memoryStrip.scrollLeft=memoryPosition;
 }
 memoryFrame=requestAnimationFrame(moveMemories);
}
memoryMotion.addEventListener('click',()=>{memoryPaused=!memoryPaused;syncMemoryMotion()});
memoryCards.forEach(card=>{
 card.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hoveredMemories.add(card);syncMemoryMotion()}});
 card.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'){hoveredMemories.delete(card);syncMemoryMotion()}});
});
memoryStrip.addEventListener('focusin',syncMemoryMotion);
memoryStrip.addEventListener('focusout',()=>queueMicrotask(syncMemoryMotion));
memoryControls.addEventListener('focusin',syncMemoryMotion);
memoryControls.addEventListener('focusout',()=>queueMicrotask(syncMemoryMotion));
function pauseMemoryInteraction(){
 clearTimeout(memoryResumeTimer);
 memoryResumeTimer=setTimeout(()=>{memoryResumeTimer=0;syncMemoryMotion()},1200);
 syncMemoryMotion();
}
memoryStrip.addEventListener('pointerdown',event=>{
 if(event.button!==0)return;
 memoryPointerDown=true;syncMemoryMotion();
});
function endMemoryInteraction(){
 if(!memoryPointerDown)return;
 memoryPointerDown=false;pauseMemoryInteraction();
}
addEventListener('pointerup',endMemoryInteraction,{passive:true});
addEventListener('pointercancel',endMemoryInteraction,{passive:true});
memoryStrip.addEventListener('wheel',pauseMemoryInteraction,{passive:true});
memoryStrip.addEventListener('scroll',()=>{if(memoryResumeTimer)pauseMemoryInteraction()},{passive:true});
if('IntersectionObserver'in window){
 const visibility=new IntersectionObserver(entries=>{
  memoryVisible=entries[0].isIntersecting;
  syncMemoryMotion();
 },{threshold:.1});
 visibility.observe(memoryStrip);
}else{
 const syncVisibility=()=>{
  const rect=memoryStrip.getBoundingClientRect();
  memoryVisible=rect.bottom>0&&rect.top<innerHeight;
  syncMemoryMotion();
 };
 addEventListener('scroll',syncVisibility,{passive:true});
 addEventListener('resize',syncVisibility);
 syncVisibility();
}
addEventListener('resize',()=>{memoryPosition=memoryStrip.scrollLeft;syncMemoryMotion()});
document.addEventListener('visibilitychange',syncMemoryMotion);
dialog.addEventListener('focusin',syncMemoryMotion);
dialog.addEventListener('close',syncMemoryMotion);
memoryMotionQuery.addEventListener('change',syncMemoryMotion);
syncMemoryMotion();
let selected=0,previousFocus=null;function openPhoto(idx){selected=(idx+gallery.length)%gallery.length;const p=gallery[selected];$('lightboxImage').src=p.src;$('lightboxImage').alt=p.label;$('lightboxImage').classList.toggle('cover-detail',!!p.cover);$('lightboxCaption').textContent=p.label+' — '+p.caption;$('lightboxCounter').textContent=(selected+1)+' / '+gallery.length;if(!dialog.open){previousFocus=document.activeElement;dialog.showModal()}}
story.addEventListener('click',e=>{const b=e.target.closest('[data-gallery]');if(b)openPhoto(Number(b.dataset.gallery))});$('closeLightbox').addEventListener('click',()=>dialog.close());$('prevPhoto').addEventListener('click',()=>openPhoto(selected-1));$('nextPhoto').addEventListener('click',()=>openPhoto(selected+1));dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();openPhoto(selected+1)}if(e.key==='ArrowLeft'){e.preventDefault();openPhoto(selected-1)}});dialog.addEventListener('close',()=>previousFocus?.focus());
const full=$('fullscreen');function syncFull(){const on=!!document.fullscreenElement;full.setAttribute('aria-pressed',String(on));full.setAttribute('aria-label',on?'Exit full screen':'Enter full screen');full.textContent=on?'⤡ EXIT FULL SCREEN':'⛶ FULL SCREEN'};full.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else alert('Full screen is not available in this browser.')}catch(e){console.warn('Full screen unavailable',e)}});document.addEventListener('fullscreenchange',syncFull);syncFull();
const audio=$('ambientAudio'),sound=$('sound'),musicFrame=document.querySelector('#chapter-3 iframe');
audio.volume=.25;
let audioRequested=false,audioRequest=0;
function syncSound(){
 const enabled=!audio.paused&&!audio.ended;
 sound.setAttribute('aria-pressed',String(enabled));
 sound.textContent=enabled?'♫ SOUND ON':'♪ SOUND OFF';
 sound.setAttribute('aria-label',enabled?'Mute ambient soundtrack':'Play ambient soundtrack');
}
function stopAmbient(){
 audioRequested=false;audioRequest++;
 audio.pause();syncSound();
}
function pauseOriginalSong(close=false){
 musicFrame.contentWindow?.postMessage({type:'walk-through-time:pause-song',close},'*');
}
sound.addEventListener('click',async()=>{
 if(audioRequested||!audio.paused){stopAmbient();return}
 pauseOriginalSong();
 audioRequested=true;
 const request=++audioRequest;
 try{await audio.play();if(!audioRequested)audio.pause()}
 catch(error){
  if(request===audioRequest){
   audioRequested=false;
   console.warn('Audio playback not available',error);
  }
 }
 syncSound();
});
audio.addEventListener('play',()=>{if(!audioRequested)audio.pause();syncSound()});
audio.addEventListener('pause',syncSound);
audio.addEventListener('ended',()=>{audioRequested=false;syncSound()});
audio.addEventListener('error',()=>{stopAmbient();console.warn('Soundtrack unavailable')});
addEventListener('message',event=>{
 if([...sceneFrames.values()].some(frame=>frame.contentWindow===event.source)&&event.data?.type==='walk-through-time:page-story'){
  if(event.data.direction===1||event.data.direction===-1)pageStory(event.data.direction);
  return;
 }
 if(event.source!==musicFrame.contentWindow)return;
 if(event.data?.type==='walk-through-time:chapter-resize'){
  musicFrame.style.removeProperty('--chapter-content-height');
 }else if(event.data?.type==='walk-through-time:chapter-height'){
  const {height,width,viewportHeight}=event.data;
  if(!Number.isFinite(height)||height<=0||!Number.isFinite(width)||width<=0||!Number.isFinite(viewportHeight)||viewportHeight<=0){console.warn('Invalid chapter dimensions:',event.data);return;}
  if(Math.abs(width-musicFrame.clientWidth)>1||Math.abs(viewportHeight-musicFrame.clientHeight)>1)return;
  const value=Math.ceil(height)+'px';
  if(musicFrame.style.getPropertyValue('--chapter-content-height')!==value)musicFrame.style.setProperty('--chapter-content-height',value);
 }else if(event.data?.type==='walk-through-time:song-play')stopAmbient();
});
addEventListener('resize',()=>musicFrame.style.removeProperty('--chapter-content-height'));
if('IntersectionObserver'in window){
 const musicVisibility=new IntersectionObserver(entries=>{
  if(!entries[0].isIntersecting)pauseOriginalSong(true);
 });
 musicVisibility.observe(musicFrame);
}else{
 const stopHiddenSong=()=>{
  const rect=musicFrame.getBoundingClientRect();
  if(rect.bottom<=0||rect.top>=innerHeight)pauseOriginalSong(true);
 };
 addEventListener('scroll',stopHiddenSong,{passive:true});
 addEventListener('resize',stopHiddenSong);
 stopHiddenSong();
}
syncSound();
// Native scrolling remains functional offline; optional Lenis can be loaded locally later.
if(!reduced&&typeof window.Lenis==='function'){const lenis=new window.Lenis({duration:1.05,smoothWheel:true});function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf)}

function pageStory(direction){
 const step=Math.max(1,innerHeight-masthead.offsetHeight-footer.offsetHeight-32);
 scrollBy({top:direction*step,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
document.addEventListener('keydown',event=>{
 if(dialog.open||event.altKey||event.ctrlKey||event.metaKey||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
 if(event.key==='PageDown'||event.key==='PageUp'){
  event.preventDefault();
  pageStory(event.key==='PageDown'?1:-1);
 }
});

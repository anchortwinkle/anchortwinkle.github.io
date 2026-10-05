'use strict';
const collections = [
 {id:'sangeet',name:'Sangeet',number:'01',label:'THE NIGHT COMES ALIVE',description:'Music, dance, laughter, and a room full of celebration.',image:'sangeet-1.webp',videos:['1DCCmfxr_jxD56W2IfYJ73gY4u5RjlUVz','1_Q_Jnu272KMgD5HM4iQSz6EeTChVReUt','1TaXyU3EF8kHbSGQuJER8-ZJLCuZRd_id'],folder:'1IDu9OmFnWkDiH_6t7hQvedff8iukB87Y'},
 {id:'haldi',name:'Haldi',number:'02',label:'SUNSHINE & SMILES',description:'Playful moments, happy faces, and all the colour of a Haldi celebration.',image:'haldi-1.webp',videos:['1ni47L2qpBD0ukdkFTocFlYB4aZX4Q-2k','1IiJf2uW8rbIa2-v1xNIuKeJo0uUp94lw','19pyc3iXWEqWBnw9AdpiF-r3uyb4HdNaq'],folder:'1dRsgav6TkTcKTkn5khK653jLIgcxT-BH'},
 {id:'wedding',name:'Weddings',number:'03',label:'MOMENTS TO TREASURE',description:'A look at the people, celebrations, and memories around the big day.',videos:[],folder:'1RYByljarhx083uotByAKiD92eCEiH6en'},
 {id:'social',name:'Social events',number:'04',label:'BRINGING PEOPLE TOGETHER',description:'A lively host, shared laughter, and guests who feel part of the occasion.',image:'social-1.webp',videos:['19Tj_S4crzpoFpQ6L2MGhvWCM2wga2dDO','1kna-mbbhCczjmBkjIttCJet9U0eSfdVz'],folder:'1EIPnptucY3c1fwUoOuArSM5zvMwhRl_T'},
 {id:'corporate',image:'corporate.webp',name:'Corporate events',number:'05',label:'PRESENCE WITH PURPOSE',description:'A confident voice and an engaging presence for your professional gatherings.',videos:[],folder:'16f_VnuGlamMrQRZu1nElx2aOKCRDlgf4'},
 {id:'government',image:'government.webp',name:'Government events',number:'06',label:'OCCASIONS OF SIGNIFICANCE',description:'Thoughtful hosting for formal programmes and public occasions.',videos:[],folder:'1_4HfId0_PErvaYn6NB3ggRcvrzML_HBw'}
];
const galleries = {
 wedding: [
  {src:'photos/wedding-1.webp',alt:'Twinkle engaging a guest with a microphone during a wedding celebration',caption:'Shared laughter and guest interactions.'},
  {src:'photos/wedding-2.webp',alt:'Guests enjoying a poolside wedding celebration',caption:'Celebrating together, beyond the stage.'}
 ],
 corporate: [
  {src:'photos/corporate-2.webp',alt:'Twinkle hosting an LG programme at a lectern',caption:'A confident voice for professional gatherings.'},
  {src:'photos/corporate-1.webp',alt:'Twinkle with a guest at the 71st Senior National Kabaddi Championship',caption:'Moments from the 71st Senior National Kabaddi Championship.'}
 ],
 government: [
  {src:'photos/government-2.webp',alt:'Audience seated at a formal public programme',caption:'Bringing a room together for an important occasion.'},
  {src:'photos/government-1.webp',alt:'Twinkle seated with Raghubar Das at an official meeting',caption:'A moment from Twinkle’s professional journey.'}
 ]
};
collections.find(c=>c.id==='wedding').image='photos/wedding-1.webp';
collections.find(c=>c.id==='corporate').videos=['1kW4AA4t5nwECvrmFoy0ypoVUhJZF475p'];
collections.find(c=>c.id==='government').videos=['1ctYr3CgaVs8DgPshd3wvFfXzZHuf245f'];
collections.find(c=>c.id==='sangeet').videos.push('18KP9kT7sQYecYC9GKmPr_QrtNEOG_GxT');
const showreel={id:'showreel',name:'A glimpse of my work',image:'sangeet-1.webp',videos:['18KP9kT7sQYecYC9GKmPr_QrtNEOG_GxT'],sources:['media/showreel-1.mp4']};
const grid=document.querySelector('#collections');
grid.innerHTML=collections.map(c=>`<article class="collection" data-category="${c.id}">${c.image?`<div class="collection-media"><img src="${c.image}" alt="Twinkle at a ${c.name} occasion" loading="lazy" width="1200" height="1200">${c.videos.length?`<span class="collection-label">${c.videos.length} VIDEOS</span><button class="round-play" data-video="${c.id}" aria-label="Watch ${c.name} videos">▶</button>`:`<span class="collection-label">${c.label}</span>`}</div>`:`<div class="collection-type ${c.id}"><span class="type-number">${c.number}</span><span>${c.label}</span></div>`}<div class="collection-body"><div class="collection-title"><h3>${c.name}</h3><span aria-hidden="true">${c.number}</span></div><p>${c.description}</p><div class="collection-links">${galleries[c.id]?`<button data-gallery="${c.id}">View photos</button>`:''}${c.videos.length?`<button data-video="${c.id}">Watch videos</button>`:''}<a href="https://drive.google.com/drive/folders/${c.folder}" target="_blank" rel="noopener noreferrer">View full collection</a><a href="#contact" data-enquire="${c.id}">Enquire for this event →</a></div></div></article>`).join('');
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 let count=0;document.querySelectorAll('.collection').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
 document.querySelector('#filter-status').textContent=`Showing ${count} ${count===1?'collection':'collections'}.`;
}));
const dialog=document.querySelector('#video-dialog'),player=document.querySelector('#video-player'),stage=document.querySelector('#video-stage');
const original=document.querySelector('#video-original'),playButton=document.querySelector('#toggle-play'),muteButton=document.querySelector('#toggle-mute'),fullscreenButton=document.querySelector('#toggle-fullscreen');
const progress=document.querySelector('#video-progress'),time=document.querySelector('#video-time'),loading=document.querySelector('#video-loading'),errorPanel=document.querySelector('#video-error'),status=document.querySelector('#player-status');
const playIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7Z"/></svg>';
const pauseIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';
let lastVideoTrigger,activeCollection,activeIndex=0,loadVersion=0,loadTimer,scrollBeforeDialog=0,seekActive=false;
function formatTime(seconds){const value=Math.max(0,Math.floor(Number.isFinite(seconds)?seconds:0));return `${Math.floor(value/60)}:${String(value%60).padStart(2,'0')}`;}
function updateTime(){
 const duration=Number.isFinite(player.duration)?player.duration:0;
 time.textContent=`${formatTime(player.currentTime)} / ${formatTime(duration)}`;
 progress.disabled=!duration;
 if(!seekActive)progress.value=duration?player.currentTime/duration*100:0;
 progress.setAttribute('aria-valuetext',`${formatTime(player.currentTime)} of ${formatTime(duration)}`);
}
function updatePlay(){playButton.innerHTML=player.paused?playIcon:pauseIcon;playButton.setAttribute('aria-label',player.paused?'Play video':'Pause video');}
function finishLoading(){clearTimeout(loadTimer);loading.hidden=true;}
function showError(){finishLoading();errorPanel.hidden=false;status.textContent='Try again or open the original video.';}
function setLoading(){loading.hidden=false;errorPanel.hidden=true;clearTimeout(loadTimer);loadTimer=setTimeout(()=>{if(dialog.open && player.readyState<2)showError();},30000);}
function switchVideo(collection,index){
 if(index<0||index>=collection.videos.length)return;
 ++loadVersion;activeCollection=collection;activeIndex=index;seekActive=false;
 player.pause();player.removeAttribute('src');player.load();
 errorPanel.hidden=true;progress.value=0;progress.disabled=true;time.textContent='0:00 / 0:00';
 player.poster=collection.image||'';
 const id=collection.videos[index];original.href=`https://drive.google.com/file/d/${id}/view?usp=drivesdk`;
 document.querySelector('#video-error-original').href=original.href;
 player.setAttribute('aria-label',`${collection.name}, video ${index+1}`);
 document.querySelectorAll('#video-tabs button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
 stage.style.setProperty('--video-ratio','9 / 16');
 player.src=collection.sources?.[index]||`media/${collection.id}-${index+1}.mp4`;setLoading();player.load();updatePlay();
 status.textContent=`Video ${index+1} selected. Tap play to watch.`;
}
async function togglePlay(){
 if(player.paused){const version=loadVersion;errorPanel.hidden=true;try{await player.play();if(version!==loadVersion)return;status.textContent='';}catch(error){if(version!==loadVersion||error.name==='AbortError')return;status.textContent=error.name==='NotAllowedError'?'Tap play again to start.':'Playback couldn’t start. Try again or open the original video.';if(error.name!=='NotAllowedError')showError();}}
 else player.pause();
}
player.addEventListener('loadedmetadata',()=>{
 if(!dialog.open)return;
 if(player.videoWidth&&player.videoHeight)stage.style.setProperty('--video-ratio',`${player.videoWidth} / ${player.videoHeight}`);
 updateTime();
});
player.addEventListener('canplay',()=>{if(!dialog.open)return;finishLoading();errorPanel.hidden=true;});
player.addEventListener('playing',()=>{finishLoading();errorPanel.hidden=true;updatePlay();});
player.addEventListener('waiting',()=>{if(dialog.open && !player.paused)setLoading();});
player.addEventListener('error',()=>{if(dialog.open && player.getAttribute('src') && player.error?.code!==1)showError();});
for(const event of ['play','pause','ended'])player.addEventListener(event,updatePlay);
player.addEventListener('timeupdate',updateTime);player.addEventListener('durationchange',updateTime);
playButton.addEventListener('click',togglePlay);player.addEventListener('click',togglePlay);
progress.addEventListener('input',()=>{seekActive=true;if(Number.isFinite(player.duration))player.currentTime=player.duration*Number(progress.value)/100;updateTime();});
progress.addEventListener('change',()=>{seekActive=false;updateTime();});
muteButton.addEventListener('click',()=>{player.muted=!player.muted;});
player.addEventListener('volumechange',()=>{muteButton.setAttribute('aria-label',player.muted?'Unmute video':'Mute video');muteButton.classList.toggle('muted',player.muted);});
function fullscreenState(){const expanded=!!document.fullscreenElement||!!document.webkitFullscreenElement||dialog.classList.contains('expanded-view');fullscreenButton.setAttribute('aria-label',expanded?'Exit fullscreen':'View video fullscreen');fullscreenButton.setAttribute('aria-pressed',String(expanded));}
async function exitExpanded(){dialog.classList.remove('expanded-view');try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.webkitFullscreenElement)document.webkitExitFullscreen();else if(player.webkitDisplayingFullscreen)player.webkitExitFullscreen();}catch{}fullscreenState();}
fullscreenButton.addEventListener('click',async()=>{
 if(document.fullscreenElement||document.webkitFullscreenElement||dialog.classList.contains('expanded-view')){await exitExpanded();return;}
 try{
  if(stage.requestFullscreen && document.fullscreenEnabled!==false)await stage.requestFullscreen();
  else if(stage.webkitRequestFullscreen)stage.webkitRequestFullscreen();
  else if(player.webkitEnterFullscreen && player.readyState>=1)player.webkitEnterFullscreen();
  else dialog.classList.add('expanded-view');
 }catch{dialog.classList.add('expanded-view');}
 fullscreenState();
});
document.addEventListener('fullscreenchange',fullscreenState);document.addEventListener('webkitfullscreenchange',fullscreenState);
player.addEventListener('webkitbeginfullscreen',()=>{fullscreenButton.setAttribute('aria-pressed','true');});
player.addEventListener('webkitendfullscreen',()=>{fullscreenButton.setAttribute('aria-pressed','false');});
document.querySelector('#retry-video').addEventListener('click',()=>{switchVideo(activeCollection,activeIndex);togglePlay();});
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{
 const collection=button.dataset.video==='showreel'?showreel:collections.find(c=>c.id===button.dataset.video);if(!collection?.videos.length)return;
 lastVideoTrigger=button;document.querySelector('#video-title').textContent=`${collection.name} highlights`;
 const tabs=document.querySelector('#video-tabs');tabs.innerHTML=collection.videos.map((_,i)=>`<button type="button" aria-pressed="${i===0}">Video ${i+1}</button>`).join('');
 tabs.querySelectorAll('button').forEach((b,i)=>b.addEventListener('click',()=>switchVideo(collection,i)));
 scrollBeforeDialog=window.scrollY;dialog.showModal();document.body.classList.add('video-dialog-open');
 document.body.style.top=`-${scrollBeforeDialog}px`;switchVideo(collection,0);
}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('cancel',e=>{if(dialog.classList.contains('expanded-view')){e.preventDefault();exitExpanded();}});
dialog.addEventListener('keydown',e=>{
 if(e.target.matches('input,button,a,select,textarea'))return;
 if(e.code==='Space'||e.key==='k'){e.preventDefault();togglePlay();}
 else if(e.key==='ArrowRight'){e.preventDefault();if(Number.isFinite(player.duration))player.currentTime=Math.min(player.duration,player.currentTime+5);}
 else if(e.key==='ArrowLeft'){e.preventDefault();player.currentTime=Math.max(0,player.currentTime-5);}
 else if(e.key==='f'){e.preventDefault();fullscreenButton.click();}
});
dialog.addEventListener('close',()=>{
 ++loadVersion;clearTimeout(loadTimer);player.pause();player.removeAttribute('src');player.removeAttribute('poster');player.load();exitExpanded();
 document.body.classList.remove('video-dialog-open');document.body.style.top='';
 window.scrollTo({top:scrollBeforeDialog,behavior:'instant'});lastVideoTrigger?.focus({preventScroll:true});
});
const menu=document.querySelector('.menu-button'),nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}));
document.querySelector('#enquiry').addEventListener('submit',e=>{
 e.preventDefault();const form=e.currentTarget;
 const name=form.elements.name.value.trim(),location=form.elements.location.value.trim();
 if(!name||!location){document.querySelector('#form-status').textContent='Please enter your name and event location.';(!name?form.elements.name:form.elements.location).focus();return;}
 const data=new FormData(form);const date=data.get('date');
 const dateText=date?new Date(`${date}T12:00:00`).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}):'To be confirmed';
 const message=`Hi Twinkle! I found your website and would love to enquire about hosting my event.\n\nName: ${name}\nEvent: ${data.get('event')}\nDate: ${dateText}\nCity / venue: ${location}${data.get('details').trim()?`\nDetails: ${data.get('details').trim()}`:''}\n\nPlease share your availability and hosting details. Thank you!`;
 window.location.assign(`https://wa.me/918340731118?text=${encodeURIComponent(message)}`);
});
document.querySelector('#year').textContent=new Date().getFullYear();

const photoDialog=document.querySelector('#photo-dialog');
const galleryImage=document.querySelector('#gallery-image');
let currentPhotos=[],photoIndex=0,photoTrigger,photoScroll=0;
function renderPhoto(){
 const photo=currentPhotos[photoIndex];galleryImage.src=photo.src;galleryImage.alt=photo.alt;
 document.querySelector('#photo-caption').textContent=photo.caption;
 document.querySelector('#photo-count').textContent=`${photoIndex+1} / ${currentPhotos.length}`;
 document.querySelector('#previous-photo').disabled=photoIndex===0;
 document.querySelector('#next-photo').disabled=photoIndex===currentPhotos.length-1;
}
function stepPhoto(step){photoIndex=Math.max(0,Math.min(currentPhotos.length-1,photoIndex+step));renderPhoto();}
document.querySelectorAll('[data-gallery]').forEach(b=>b.addEventListener('click',()=>{
 currentPhotos=galleries[b.dataset.gallery];photoIndex=0;photoTrigger=b;photoScroll=window.scrollY;
 document.querySelector('#photo-title').textContent=collections.find(c=>c.id===b.dataset.gallery).name+' — in pictures';
 renderPhoto();photoDialog.showModal();document.body.classList.add('video-dialog-open');document.body.style.top=`-${photoScroll}px`;
}));
document.querySelector('#close-photos').addEventListener('click',()=>photoDialog.close());
document.querySelector('#previous-photo').addEventListener('click',()=>stepPhoto(-1));
document.querySelector('#next-photo').addEventListener('click',()=>stepPhoto(1));
photoDialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();stepPhoto(1);}if(e.key==='ArrowLeft'){e.preventDefault();stepPhoto(-1);}});
photoDialog.addEventListener('close',()=>{document.body.classList.remove('video-dialog-open');document.body.style.top='';window.scrollTo({top:photoScroll,behavior:'instant'});photoTrigger?.focus({preventScroll:true});});
photoDialog.addEventListener('click',e=>{if(e.target===photoDialog){const r=photoDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)photoDialog.close();}});
const eventNames={sangeet:'Sangeet',haldi:'Haldi',wedding:'Wedding',social:'Social event',corporate:'Corporate event',government:'Government event'};
document.querySelectorAll('[data-enquire]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#event-type').value=eventNames[a.dataset.enquire];}));
const dateInput=document.querySelector('#date'),unknownDate=document.querySelector('#date-unknown');
const today=new Date();dateInput.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
unknownDate.addEventListener('change',()=>{dateInput.disabled=unknownDate.checked;if(unknownDate.checked)dateInput.value='';});

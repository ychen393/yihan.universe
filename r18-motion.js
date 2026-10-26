/* R18 — Non-interactive Work background video, with accessible static fallback.
   Upload a rights-cleared MP4 to assets/work-nebula.mp4 to enable playback.
   If the file is unavailable, the existing starfield and CSS fallback remain. */
(function(){
  'use strict';
  const VIDEO_PATH='/assets/work-nebula.mp4';
  const app=document.getElementById('app');
  let current=null;
  let scheduled=false;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData=()=>Boolean(navigator.connection && navigator.connection.saveData);

  function cleanup(){
    if(!current)return;
    current.observer.disconnect();
    current.video.pause();
    current.video.removeAttribute('src');
    current.video.load();
    current=null;
  }

  function mount(){
    const work=document.querySelector('#work.work-section');
    if(!work){
      cleanup();
      return;
    }
    if(current && current.work===work)return;
    cleanup();

    const layer=document.createElement('div');
    layer.className='r18-work-cinematic';
    layer.setAttribute('aria-hidden','true');
    layer.innerHTML='<div class="r18-video-poster"></div>'+
      '<div class="r18-nebula-haze"></div>'+
      '<video muted loop playsinline preload="none" tabindex="-1"></video>'+
      '<div class="r18-video-scrim"></div>';
    work.insertBefore(layer,work.firstChild);
    const video=layer.querySelector('video');
    video.muted=true;
    video.defaultMuted=true;
    video.setAttribute('muted','');
    let checked=false;
    let allowed=false;
    let visible=false;

    const state={work,layer,video,observer:null};
    current=state;

    video.addEventListener('playing',()=>{if(current===state)layer.classList.add('is-playing')});
    video.addEventListener('pause',()=>layer.classList.remove('is-playing'));
    video.addEventListener('error',()=>layer.classList.remove('is-playing'));

    async function attemptPlayback(){
      if(reduced.matches||saveData())return;
      if(!checked){
        checked=true;
        try{
          const response=await fetch(VIDEO_PATH,{method:'HEAD',cache:'no-store'});
          allowed=response.ok;
        }catch(_){allowed=false}
      }
      if(current!==state||!visible||!allowed)return;
      if(!video.getAttribute('src')){
        video.src=VIDEO_PATH;
        video.load();
      }
      try{await video.play()}catch(_){layer.classList.remove('is-playing')}
    }

    state.observer=new IntersectionObserver(entries=>{
      const entry=entries[0];
      visible=Boolean(entry && entry.isIntersecting);
      if(visible){
        void attemptPlayback();
      }else{
        video.pause();
        layer.classList.remove('is-playing');
      }
    },{threshold:0.08});
    state.observer.observe(work);
  }

  function schedule(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;mount()});
  }

  if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:false});
  document.addEventListener('DOMContentLoaded',schedule);
  window.addEventListener('popstate',schedule);
  reduced.addEventListener?.('change',()=>{
    if(current){
      current.video.pause();
      current.layer.classList.remove('is-playing');
    }
    schedule();
  });
  schedule();
})();

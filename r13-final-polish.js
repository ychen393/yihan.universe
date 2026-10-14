/* R13 · Final UI polish interactions
   Lightweight orientation, reveal, and mobile navigation enhancements. */
(function(){
'use strict';
function bind({reduced=false,locale='zh'}={}){
  const clean=[];
  const app=document.querySelector('#app');
  const header=document.querySelector('.header');
  const nav=document.querySelector('#navigation');
  const toggle=document.querySelector('.menu-toggle');

  // Page-entry polish without blocking content when JS is unavailable.
  if(app){
    app.classList.remove('r13-mounted');
    requestAnimationFrame(()=>requestAnimationFrame(()=>app.classList.add('r13-mounted')));
  }

  // Stronger sticky-header separation after the first few pixels.
  if(header){
    const syncHeader=()=>header.classList.toggle('r13-scrolled',window.scrollY>18);
    syncHeader();
    window.addEventListener('scroll',syncHeader,{passive:true});
    clean.push(()=>window.removeEventListener('scroll',syncHeader));
  }

  // Mobile navigation: readable open/close state, Escape, click-outside.
  if(nav&&toggle){
    const setMenu=open=>{
      nav.classList.toggle('open',open);
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?(locale==='zh'?'关闭菜单':'Close menu'):(locale==='zh'?'打开菜单':'Open menu'));
      toggle.textContent=open?'×':'☰';
      document.body.classList.toggle('r13-menu-open',open);
    };
    const syncMenu=()=>setMenu(nav.classList.contains('open'));
    const onToggle=()=>queueMicrotask(syncMenu);
    const onKey=e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);toggle.focus();}};
    const onOutside=e=>{if(nav.classList.contains('open')&&!header.contains(e.target))setMenu(false);};
    toggle.addEventListener('click',onToggle);
    document.addEventListener('keydown',onKey);
    document.addEventListener('click',onOutside);
    clean.push(()=>{toggle.removeEventListener('click',onToggle);document.removeEventListener('keydown',onKey);document.removeEventListener('click',onOutside);document.body.classList.remove('r13-menu-open')});
  }

  // Homepage navigation follows the current chapter.
  const homeSections=['journey','work','about'].map(id=>document.getElementById(id)).filter(Boolean);
  let homeObserver=null;
  if(homeSections.length===3&&'IntersectionObserver' in window){
    const homeLinks=[...document.querySelectorAll('.site-nav a[href*="#"]')];
    const setCurrent=id=>{
      homeLinks.forEach(a=>{
        const current=a.getAttribute('href')?.endsWith('#'+id);
        a.classList.toggle('r13-current',!!current);
        if(current)a.setAttribute('aria-current','location');
        else if(a.getAttribute('aria-current')==='location')a.removeAttribute('aria-current');
      });
    };
    homeObserver=new IntersectionObserver(entries=>{
      const candidates=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if(candidates[0])setCurrent(candidates[0].target.id);
    },{rootMargin:'-18% 0px -58% 0px',threshold:[0,.08,.2,.45]});
    homeSections.forEach(el=>homeObserver.observe(el));
    clean.push(()=>homeObserver?.disconnect());
  }

  // Detail-page local navigation follows the section currently being read.
  const localNav=document.querySelector('.r5-local-nav');
  let localObserver=null;
  if(localNav&&'IntersectionObserver' in window){
    const links=[...localNav.querySelectorAll('a[href^="#"]')];
    const targets=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const setLocal=id=>links.forEach(a=>{
      const current=a.getAttribute('href')==='#'+id;
      a.classList.toggle('r13-current',current);
      if(current)a.setAttribute('aria-current','location');
      else if(a.getAttribute('aria-current')==='location')a.removeAttribute('aria-current');
    });
    localObserver=new IntersectionObserver(entries=>{
      const hit=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(hit)setLocal(hit.target.id);
    },{rootMargin:'-24% 0px -58% 0px',threshold:[0,.1,.25,.5]});
    targets.forEach(el=>localObserver.observe(el));
    clean.push(()=>localObserver?.disconnect());
  }

  // Unified, subtle content entrance. Reduced-motion users see everything immediately.
  const revealEls=[...document.querySelectorAll([
    '.chapter-intro',
    '.work-header',
    '.work-categories',
    '.planet-card',
    '.about-body',
    '.r5-section',
    '.r7-related-card',
    '.r10-section',
    '.r10-final',
    '.r5-case-footer'
  ].join(','))];
  let revealObserver=null;
  revealEls.forEach((el,i)=>{
    el.style.setProperty('--r13-delay',Math.min((i%5)*42,168)+'ms');
    el.classList.add('r13-reveal');
  });
  if(reduced||!('IntersectionObserver' in window)){
    revealEls.forEach(el=>el.classList.add('r13-visible'));
  }else{
    revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('r13-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },{rootMargin:'0px 0px -7% 0px',threshold:.07});
    revealEls.forEach(el=>revealObserver.observe(el));
    clean.push(()=>revealObserver?.disconnect());
  }

  return ()=>clean.splice(0).forEach(fn=>{try{fn()}catch{}});
}
window.YihanR13={bind};
})();
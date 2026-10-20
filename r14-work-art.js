(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = null;
  function bind(){
    const map=document.querySelector('.r14-static-fix #galaxy.constellation-map');
    if(!map || map===current) return;
    current=map;
    if(reduce) return;
    let tx=0,ty=0,cx=0,cy=0,raf=0;
    const tick=()=>{
      cx += (tx-cx)*.075;
      cy += (ty-cy)*.075;
      map.style.setProperty('--art-x',cx.toFixed(2)+'px');
      map.style.setProperty('--art-y',cy.toFixed(2)+'px');
      raf=requestAnimationFrame(tick);
    };
    const move=e=>{
      const r=map.getBoundingClientRect();
      tx=((e.clientX-r.left)/r.width-.5)*-8;
      ty=((e.clientY-r.top)/r.height-.5)*-6;
    };
    const leave=()=>{tx=0;ty=0};
    map.addEventListener('pointermove',move,{passive:true});
    map.addEventListener('pointerleave',leave,{passive:true});
    tick();
  }
  const app=document.querySelector('#app');
  if(app) new MutationObserver(()=>requestAnimationFrame(bind)).observe(app,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',bind);
  window.addEventListener('popstate',()=>requestAnimationFrame(bind));
  bind();
})();
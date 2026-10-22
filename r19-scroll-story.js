/* R19 / learning preview — GSAP ScrollTrigger hero motion.
   Reversible, desktop-only and route-safe; Journey keeps its existing controller. */
(function(){
  "use strict";
  const root=document.getElementById("app");
  if(!root) return;
  let currentHero=null, mm=null, frame=0;

  function teardown(){
    if(mm){mm.revert();mm=null;}
    document.documentElement.classList.remove("r19-motion-enabled");
    currentHero=null;
  }

  function mount(hero){
    currentHero=hero;
    if(!window.gsap || !window.ScrollTrigger){
      console.warn("[Yihan Motion Preview] GSAP not available; using original static hero.");
      return;
    }
    const gsap=window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    if(window.MotionPathPlugin) gsap.registerPlugin(window.MotionPathPlugin);

    const core=document.createElement("div");
    core.className="motion-core";
    core.setAttribute("aria-hidden","true");
    core.innerHTML=[
      '<span class="motion-core__halo"></span>',
      '<span class="motion-core__orbit orbit-a"></span>',
      '<span class="motion-core__orbit orbit-b"></span>',
      '<span class="motion-core__orbit orbit-c"></span>',
      '<span class="motion-core__sphere"></span>',
      '<span class="motion-core__dot a"></span>',
      '<span class="motion-core__dot b"></span>',
      '<span class="motion-core__label">UNIVERSE / 01</span>'
    ].join("");
    hero.insertBefore(core,hero.querySelector(".hero-shell"));

    // Give the last phase of the pinned Hero an actual next scene.
    // This bridge stays visible as the Hero naturally scrolls away.
    const isZh=document.documentElement.lang!=="en";
    const bridge=document.createElement("div");
    bridge.className="motion-bridge";
    bridge.setAttribute("aria-hidden","true");
    bridge.innerHTML=[
      '<span class="motion-bridge__line"></span>',
      '<span class="motion-bridge__chapter">01 / JOURNEY</span>',
      '<strong class="motion-bridge__title">'+(isZh?"我的经历":"The Journey")+'</strong>',
      '<span class="motion-bridge__meta">UBC&nbsp; → &nbsp;'+(isZh?"冷酸灵":"Lengshuan")+'&nbsp; → &nbsp;Accenture&nbsp; → &nbsp;BAYESTONE</span>',
      '<span class="motion-bridge__hint">'+(isZh?"继续滚动，进入第一站 ↓":"Keep scrolling to the first chapter ↓")+'</span>'
    ].join("");
    hero.insertBefore(bridge,hero.querySelector(".hero-shell"));

    mm=gsap.matchMedia();
    mm.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)",function(){
      document.documentElement.classList.add("r19-motion-enabled");
      const titleEls=[
        hero.querySelector(".hero-copy .eyebrow"),
        hero.querySelector(".hero-heading"),
        hero.querySelector(".hero-lead"),
        hero.querySelector(".hero-ctas")
      ].filter(Boolean);
      const art=hero.querySelector(".hero-art");
      const cue=hero.querySelector(".scroll-cue");
      const signal=hero.querySelector(".hero-signal");
      const halo=core.querySelector(".motion-core__halo");
      const bridge=hero.querySelector(".motion-bridge");

      // The intro fades away only as the Journey preview enters.
      // Do not fade the background AND the Universe Core: that caused
      // an entirely empty pinned viewport at the end of R19.
      gsap.set(bridge,{autoAlpha:0,y:46});
      const tl=gsap.timeline({
        defaults:{ease:"none"},
        scrollTrigger:{
          trigger:hero,
          start:"top top+=82",
          end:()=>"+="+Math.round(Math.max(700,window.innerHeight*.96)),
          pin:true,
          pinSpacing:true,
          scrub:0.8,
          anticipatePin:1,
          invalidateOnRefresh:true
        }
      });
      tl
        .to(titleEls,{autoAlpha:0,y:-32,stagger:.04,duration:.48},.22)
        .to(core,{x:()=>-Math.min(115,window.innerWidth*.07),y:-25,scale:1.12,opacity:.98,duration:.76},.06)
        .to(halo,{scale:1.26,opacity:.65,duration:.68},.2)
        .to(art,{x:-28,scale:1.095,opacity:.94,duration:.8},0)
        .to(bridge,{autoAlpha:1,y:0,duration:.34},.56)
        .to([cue,signal].filter(Boolean),{autoAlpha:0,y:12,duration:.25},.33);
      window.ScrollTrigger.refresh();
      return function(){
        document.documentElement.classList.remove("r19-motion-enabled");
      };
    });
  }

  function sync(){
    frame=0;
    const hero=root.querySelector(".hero");
    if(hero===currentHero) return;
    teardown();
    if(hero) mount(hero);
  }
  function schedule(){
    if(frame) return;
    frame=requestAnimationFrame(sync);
  }
  const observer=new MutationObserver(schedule);
  observer.observe(root,{childList:true});
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",schedule,{once:true});
  } else schedule();
})();

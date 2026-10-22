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

      // start and end are relative to the sticky desktop navigation (82px).
      const tl=gsap.timeline({
        defaults:{ease:"none"},
        scrollTrigger:{
          trigger:hero,
          start:"top top+=82",
          end:()=>"+="+Math.round(Math.max(750,window.innerHeight*1.2)),
          pin:true,
          pinSpacing:true,
          scrub:0.8,
          anticipatePin:1,
          invalidateOnRefresh:true
        }
      });
      tl
        .to(titleEls,{autoAlpha:0,y:-42,stagger:.08,duration:.42},.07)
        .to(core,{x:()=>-Math.min(240,window.innerWidth*.14),y:50,scale:1.22,opacity:.72,duration:.73},.03)
        .to(halo,{scale:1.28,opacity:.32,duration:.55},.2)
        .to(art,{x:-95,scale:1.15,opacity:.48,duration:.78},0)
        .to([cue,signal].filter(Boolean),{autoAlpha:0,y:16,duration:.28},.1)
        .to(core,{scale:.9,opacity:0,duration:.23},.79);
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

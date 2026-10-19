(function(){
'use strict';

function bindWork(){
  var story=document.querySelector('.r151-story');
  if(!story)return;

  var stage=story.querySelector('.r151-stage');
  var ids=['agentlab','benchmark','accenture','requirement'];
  var buttons=[].slice.call(document.querySelectorAll('[data-r151-jump]'));
  var scenes=[].slice.call(document.querySelectorAll('[data-r151-scene]'));
  var current='agentlab';
  var ticking=false;
  var pointerX=0;
  var pointerY=0;
  var reduceQuery=window.matchMedia('(prefers-reduced-motion: reduce)');

  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}

  function setActive(id){
    if(ids.indexOf(id)<0)id='agentlab';
    current=id;
    story.dataset.r151Active=id;

    buttons.forEach(function(btn){
      btn.setAttribute('aria-pressed',String(btn.dataset.r151Jump===id));
    });

    var stacked=window.innerWidth<=900;
    scenes.forEach(function(scene){
      scene.setAttribute('aria-hidden',stacked?'false':String(scene.dataset.r151Scene!==id));
    });
  }

  function desktopState(){
    var top=story.getBoundingClientRect().top+window.scrollY;
    var relative=(window.scrollY+window.innerHeight*.46)-top;
    var raw=relative/window.innerHeight;
    var index=clamp(Math.floor(raw),0,ids.length-1);
    var progress=clamp(raw-index,0,1);
    if(raw<0){index=0;progress=0;}
    if(raw>=ids.length){index=ids.length-1;progress=1;}
    return {id:ids[index],index:index,progress:progress};
  }

  function mobileActive(){
    var target=window.innerHeight*.42;
    var best=scenes[0];
    var bestDistance=Infinity;
    scenes.forEach(function(scene){
      var r=scene.getBoundingClientRect();
      var center=r.top+Math.min(r.height,window.innerHeight)*.42;
      var distance=Math.abs(center-target);
      if(distance<bestDistance){bestDistance=distance;best=scene;}
    });
    return best?best.dataset.r151Scene:'agentlab';
  }

  function writeSpatial(progress){
    var p=clamp(progress||0,0,1);
    var phase=clamp(Math.floor(p*4),0,3);
    var depth=(p-.5)*10;
    var line=.18+.82*p;

    story.dataset.r154Phase=String(phase);
    story.style.setProperty('--r154-progress',p.toFixed(3));
    story.style.setProperty('--r154-line-scale',line.toFixed(3));

    var mx=pointerX;
    var my=pointerY;
    story.style.setProperty('--r154-far-x',(-mx*.12).toFixed(2)+'px');
    story.style.setProperty('--r154-far-y',(-my*.12-depth*.10).toFixed(2)+'px');
    story.style.setProperty('--r154-mid-x',(-mx*.28).toFixed(2)+'px');
    story.style.setProperty('--r154-mid-y',(-my*.28-depth*.22).toFixed(2)+'px');
    story.style.setProperty('--r154-near-x',(-mx*.58).toFixed(2)+'px');
    story.style.setProperty('--r154-near-y',(-my*.58-depth*.42).toFixed(2)+'px');
    story.style.setProperty('--r154-glow-x',(-mx*.18).toFixed(2)+'px');
    story.style.setProperty('--r154-glow-y',(-my*.18).toFixed(2)+'px');
    story.style.setProperty('--r154-copy-x',(mx*.10).toFixed(2)+'px');
    story.style.setProperty('--r154-copy-y',(my*.10).toFixed(2)+'px');
    story.style.setProperty('--r154-mech-x',(mx*.34).toFixed(2)+'px');
    story.style.setProperty('--r154-mech-y',(my*.28+depth).toFixed(2)+'px');
  }

  function updateFromScroll(){
    ticking=false;

    if(window.innerWidth<=900){
      setActive(mobileActive());
      story.dataset.r154Phase='3';
      writeSpatial(1);
      return;
    }

    var state=desktopState();
    setActive(state.id);
    writeSpatial(reduceQuery.matches?1:state.progress);
  }

  function requestUpdate(){
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(updateFromScroll);
  }

  buttons.forEach(function(btn){
    btn.addEventListener('click',function(){
      var id=btn.dataset.r151Jump;
      var index=ids.indexOf(id);
      var behavior=reduceQuery.matches?'auto':'smooth';

      if(window.innerWidth<=900){
        var scene=document.querySelector('[data-r151-scene="'+id+'"]');
        if(scene){
          var y=scene.getBoundingClientRect().top+window.scrollY-128;
          window.scrollTo({top:y,behavior:behavior});
        }
      }else{
        var storyTop=story.getBoundingClientRect().top+window.scrollY;
        window.scrollTo({top:storyTop+index*window.innerHeight+4,behavior:behavior});
      }
      setActive(id);
    });
  });

  if(stage){
    stage.addEventListener('pointermove',function(e){
      if(window.innerWidth<=900||reduceQuery.matches)return;
      var r=stage.getBoundingClientRect();
      pointerX=clamp(((e.clientX-r.left)/r.width-.5)*12,-6,6);
      pointerY=clamp(((e.clientY-r.top)/r.height-.5)*12,-6,6);
      requestUpdate();
    },{passive:true});

    stage.addEventListener('pointerleave',function(){
      pointerX=0;
      pointerY=0;
      requestUpdate();
    },{passive:true});
  }

  window.addEventListener('scroll',requestUpdate,{passive:true});
  window.addEventListener('resize',requestUpdate,{passive:true});
  if(reduceQuery.addEventListener)reduceQuery.addEventListener('change',requestUpdate);

  setActive('agentlab');
  writeSpatial(reduceQuery.matches?1:0);
  requestUpdate();
}

window.YihanR15={bindWork:bindWork};
})();
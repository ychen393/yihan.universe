(function(){
'use strict';

function bindWork(){
  var story=document.querySelector('.r151-story');
  if(!story)return;

  var ids=['agentlab','benchmark','accenture','requirement'];
  var buttons=[].slice.call(document.querySelectorAll('[data-r151-jump]'));
  var scenes=[].slice.call(document.querySelectorAll('[data-r151-scene]'));
  var current='agentlab';
  var ticking=false;

  function setActive(id){
    if(ids.indexOf(id)<0)id='agentlab';
    if(current===id && story.dataset.r151Active===id)return;
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

  function desktopActive(){
    var top=story.getBoundingClientRect().top+window.scrollY;
    var relative=(window.scrollY+window.innerHeight*.46)-top;
    var index=Math.floor(relative/window.innerHeight);
    index=Math.max(0,Math.min(ids.length-1,index));
    return ids[index];
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

  function updateFromScroll(){
    ticking=false;
    setActive(window.innerWidth<=900?mobileActive():desktopActive());
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
      var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var behavior=reduce?'auto':'smooth';

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

  window.addEventListener('scroll',requestUpdate,{passive:true});
  window.addEventListener('resize',requestUpdate,{passive:true});
  setActive('agentlab');
  requestUpdate();
}

window.YihanR15={bindWork:bindWork};
})();
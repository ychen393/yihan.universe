/* R14.1 direct linkage for existing 01–04 case-study sections.
   No duplicate recruiter view: the original sections themselves drive one sticky mechanism visual. */
(function(){
  'use strict';

  var TARGETS={
    agentlab:{scene:'agentlab',label:'Failure → Root Cause → Patch → Regression'},
    benchmark:{scene:'benchmark',label:'Capability × Task × Model'},
    'task-summary':{scene:'accenture',label:'Sources → Structure → Action'},
    requirement:{scene:'requirement',label:'Clarify → Confirm → Execute'}
  };

  var observer=null;
  var lastPath='';

  function caseId(){
    var m=location.pathname.match(/^\/(?:zh|en)\/work\/([^/]+)/);
    return m?m[1]:null;
  }
  function lang(){return /^\/en(?:\/|$)/.test(location.pathname)?'en':'zh';}
  function dots(){return '<div class="r14-phase-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></div>';}

  function agentlabScene(isZh){
    return '<div class="r14-system-scene">'+
      '<svg class="r14-v-svg" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">'+
        '<path class="p1" d="M175 335 C290 260 330 190 420 175"></path>'+
        '<path class="p2" d="M470 195 C555 240 590 305 665 345"></path>'+
        '<path class="p3" d="M720 342 C800 285 830 225 900 205"></path>'+
      '</svg>'+
      '<div class="r14-v-node failure"><small>01 · FAILURE</small><b>5 / 7</b></div>'+
      '<div class="r14-v-node root"><small>02 · ROOT CAUSE</small><b>Step limit / routing</b></div>'+
      '<div class="r14-v-node patch"><small>03 · BOUNDED PATCH</small><b>Config / instruction only</b></div>'+
      '<div class="r14-v-node regression"><small>04 · REGRESSION</small><b>7 / 7 · 16 / 16</b></div>'+
      '<div class="r14-v-proof"><span>FIXED REGRESSION<b>5/7 → 7/7</b></span><span>CONTROLLED VALIDATION<b>15/16 → 16/16</b></span></div>'+
      '<div class="r14-v-limit">'+(isZh?'当前证据来自确定性测试与受控 mock-router；不把它包装成真实外部模型或生产环境的普遍提升。':'Current evidence is deterministic and controlled mock-router validation, not universal production-model improvement.')+'</div>'+
    '</div>';
  }

  function benchmarkScene(isZh){
    var rows=[
      ['TASK','GPT','CLAUDE','QWEN','DEEPSEEK'],
      ['Brief','●','●','●','●'],
      ['Rules','●','●','●','●'],
      ['Long','●','●','●','●'],
      ['Grounding','●','●','●','●']
    ];
    var html='<div class="r14-benchmark-grid">';
    rows.forEach(function(row,ri){
      row.forEach(function(v,ci){
        var cls=(ri===0||ci===0)?'head':'';
        if((ri===1&&ci===2)||(ri===2&&ci===4)||(ri===3&&ci===1)||(ri===4&&ci===3)) cls+=' hot';
        html+='<span class="'+cls.trim()+'">'+v+'</span>';
      });
    });
    html+='</div>';
    return '<div class="r14-system-scene">'+html+
      '<div class="r14-benchmark-count"><small>EVALUATION TAXONOMY</small><b>74 × 148</b></div>'+
      '<div class="r14-benchmark-dims"><span>QUALITY</span><span>LATENCY</span><span>COST</span></div>'+
      '<div class="r14-v-limit">'+(isZh?'74 项二级能力与 148 套测试集已经落地；模型实验仍按能力持续推进，不表示所有模型、所有轮次都已完成。':'74 capabilities and 148 test suites are implemented; model experiments continue by capability and not every model round is complete.')+'</div>'+
    '</div>';
  }

  function accentureScene(isZh){
    return '<div class="r14-system-scene">'+
      '<div class="r14-input-cloud">'+
        '<span class="r14-v-chip c1">Outlook</span><span class="r14-v-chip c2">Teams</span><span class="r14-v-chip c3">Jira / Tracker</span><span class="r14-v-chip c4">Excel / CSV</span><span class="r14-v-chip c5">SharePoint / Lists</span>'+
      '</div>'+
      '<div class="r14-acc-core"><div><b>STRUCTURE</b><small>task · owner<br>deadline · status</small></div></div>'+
      '<div class="r14-output-stack">'+
        '<div class="r14-v-card"><small>ACTION</small><b>Task Summary</b></div>'+
        '<div class="r14-v-card"><small>TRACEABILITY</small><b>Source References</b></div>'+
        '<div class="r14-v-card"><small>STATUS</small><b>Blocked / Risk / Dependency</b></div>'+
      '</div>'+
      '<div class="r14-acc-proof">'+
        '<span>✓ '+(isZh?'实习期间团队实际使用':'Used by the team during the internship')+'</span>'+
        '<span>✓ '+(isZh?'保留来源引用，方便回查':'Source references retained for verification')+'</span>'+
      '</div>'+
      '<div class="r14-v-limit">'+(isZh?'不声称未经核实的节省时间，也不推断离岗后仍持续使用。':'No unverified time-savings claim and no assumption of continued post-internship usage.')+'</div>'+
    '</div>';
  }

  function requirementScene(isZh){
    return '<div class="r14-system-scene">'+
      '<div class="r14-vague-cloud">'+
        '<span class="r14-v-bubble b1">'+(isZh?'“做一个智能项目管理工具”':'“Build an intelligent project tool.”')+'</span>'+
        '<span class="r14-v-bubble b2">'+(isZh?'“最好能自动完成整个项目”':'“Ideally it runs the whole project.”')+'</span>'+
        '<span class="r14-v-bubble b3">'+(isZh?'“后面需求还会变”':'“Requirements will keep changing.”')+'</span>'+
      '</div>'+
      '<div class="r14-req-flow">'+
        '<div class="r14-v-node clarify"><small>01</small><b>Clarify</b></div>'+
        '<div class="r14-v-node impact"><small>02</small><b>Impact / Version</b></div>'+
        '<div class="r14-v-node human"><small>03 · GATE</small><b>Human Confirm</b></div>'+
        '<div class="r14-v-node executable"><small>04</small><b>Executable Version</b></div>'+
      '</div>'+
      '<div class="r14-req-proof"><span>Working MVP</span><span>AI_SUGGESTED ≠ USER_CONFIRMED</span><span>v1 → v2 → confirmed</span></div>'+
      '<div class="r14-future"><span>Persistence</span><span>Authentication</span><span>Team collaboration</span></div>'+
      '<div class="r14-v-limit">'+(isZh?'当前 MVP 聚焦澄清、版本追踪与人工确认；持久化、账号体系和多人协作属于后续版本。':'The MVP currently focuses on clarification, version tracking and human confirmation; persistence, auth and team collaboration are later extensions.')+'</div>'+
    '</div>';
  }

  function stageMarkup(id,isZh){
    var cfg=TARGETS[id];
    var body=id==='agentlab'?agentlabScene(isZh):
      id==='benchmark'?benchmarkScene(isZh):
      id==='task-summary'?accentureScene(isZh):
      requirementScene(isZh);
    return '<div class="r14-linked-stage r14-'+cfg.scene+'" data-case="'+id+'" data-phase="0">'+
      '<div class="r14-linked-head"><small>SYSTEM VIEW</small><strong>'+cfg.label+'</strong></div>'+
      body+dots()+
    '</div>';
  }

  function setPhase(wrapper,index){
    var stage=wrapper.querySelector('.r14-linked-stage');
    if(!stage)return;
    stage.dataset.phase=String(index);
    wrapper.querySelectorAll('.r5-section').forEach(function(section,i){
      section.classList.toggle('r14-active-section',i===index);
      section.setAttribute('aria-current',i===index?'step':'false');
    });
    document.querySelectorAll('.r5-local-nav a').forEach(function(a,i){
      a.classList.toggle('r14-nav-active',i===index);
    });
  }

  function bind(wrapper){
    if(observer){observer.disconnect();observer=null;}
    var sections=[].slice.call(wrapper.querySelectorAll('.r5-section'));
    if(!sections.length)return;
    setPhase(wrapper,0);

    if('IntersectionObserver' in window){
      observer=new IntersectionObserver(function(entries){
        var visible=entries.filter(function(e){return e.isIntersecting;});
        if(!visible.length)return;
        visible.sort(function(a,b){
          return Math.abs(a.boundingClientRect.top-window.innerHeight*.36)-Math.abs(b.boundingClientRect.top-window.innerHeight*.36);
        });
        var index=Number(visible[0].target.dataset.r14Phase||0);
        setPhase(wrapper,index);
      },{root:null,rootMargin:'-22% 0px -58% 0px',threshold:0});
      sections.forEach(function(s){observer.observe(s);});
    }

    document.querySelectorAll('.r5-local-nav a').forEach(function(a,i){
      a.addEventListener('click',function(){
        setPhase(wrapper,i);
      });
    });
  }

  function cleanup(){
    document.body.classList.remove('r14-linked-case');
    if(observer){observer.disconnect();observer=null;}
  }

  function apply(){
    var id=caseId();
    if(!TARGETS[id]){cleanup();lastPath=location.pathname;return;}

    var page=document.querySelector('.r5-case-page');
    var localNav=document.querySelector('.r5-local-nav');
    if(!page||!localNav)return;

    if(page.querySelector('.r14-linked-layout')){lastPath=location.pathname;return;}

    cleanup();
    document.body.classList.add('r14-linked-case');

    var sections=['context','execution','evidence','reflection'].map(function(x){return page.querySelector('#'+x);});
    if(sections.some(function(x){return !x;}))return;

    var wrapper=document.createElement('div');
    wrapper.className='r14-linked-layout';

    var left=document.createElement('div');
    left.className='r14-linked-copy';

    sections.forEach(function(section,i){
      section.dataset.r14Phase=String(i);
      left.appendChild(section);
    });

    var right=document.createElement('aside');
    right.className='r14-linked-visual';
    right.setAttribute('aria-label',lang()==='zh'?'随章节变化的项目机制图':'Scroll-linked project mechanism');
    right.innerHTML=stageMarkup(id,lang()==='zh');

    wrapper.appendChild(left);
    wrapper.appendChild(right);

    var anchor=page.querySelector('.r5-case-footer');
    page.insertBefore(wrapper,anchor);

    bind(wrapper);
    lastPath=location.pathname;
  }

  var queued=false;
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(function(){queued=false;apply();});
  }

  var app=document.querySelector('#app');
  if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',schedule);
  window.addEventListener('popstate',schedule);
  schedule();
})();
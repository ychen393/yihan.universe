/* R14.1 — static visual differentiation and copy cleanup.
   Runs after R8/R12/R13 content overrides and before app.js. */
(function(){
  'use strict';

  var portfolio=window.PORTFOLIO;
  if(portfolio && portfolio.zh && portfolio.en){
    var zh=portfolio.zh;
    var en=portfolio.en;

    var zhMove=(zh.curiosities||[]).find(function(x){return x.id==='movement';});
    if(zhMove){
      zhMove.text='有空就想动一动。健身时专心练，打羽毛球时专心追球。对我来说，运动更像一种切换节奏、重新找回专注的方式。';
    }
    var enMove=(en.curiosities||[]).find(function(x){return x.id==='movement';});
    if(enMove){
      enMove.text='I like keeping moving—sometimes with weights, sometimes chasing a shuttlecock. Exercise is one of the simplest ways for me to reset my rhythm and get my focus back.';
    }

    zh.site.aboutLead='运动、语言、旅行、设计，还有一长串想继续探索的东西。它们不一定属于同一条主线，但都来自同一种好奇心。';
    en.site.aboutLead='Movement, languages, travel, design, and a long list of things I still want to explore. They may not belong to one straight path, but they come from the same curiosity.';

    var zhBayes=(zh.journey||[]).find(function(x){return x.key==='bayestone';});
    if(zhBayes){
      zhBayes.story='在 BAYESTONE，我参与把真实业务任务拆成可评测的能力，设计测试集、参考输出、评分规则和硬错误，再在不同模型与平台上比较质量、延迟和成本。与此同时，工作也延伸到 Agent 应用场景：把模型能力放进 workflow、节点验收和异常案例里观察它在真实任务中的表现。';
      zhBayes.points=[
        '建立覆盖 74 项二级能力的评测结构，并完成 148 套通用/业务测试集。',
        '设计输入、参考输出、评分规则和硬错误，补充复杂场景与失败挑战用例。',
        '跨模型与平台开展分能力实验，并在 Agent 应用场景中关注 workflow、节点验收与异常案例。'
      ];
    }
    var enBayes=(en.journey||[]).find(function(x){return x.key==='bayestone';});
    if(enBayes){
      enBayes.story='At BAYESTONE, I help turn real business tasks into testable capabilities, define test suites, references, scoring rules and critical failures, then compare quality, latency and cost across models and platforms. The work also extends into Agent application scenarios, where model capability is observed inside workflows, node-level checks and exception cases.';
      enBayes.points=[
        'Built an evaluation structure covering 74 secondary capabilities and 148 implemented general/business test suites.',
        'Defined inputs, references, scoring rules and critical failures, including harder challenge cases.',
        'Ran task-specific model comparisons and examined Agent workflows, node-level checks and exception cases.'
      ];
    }
  }

  function stageMarkup(){
    var zh=document.documentElement.lang!=='en';
    var posting=zh?'时段':'TIME';
    var focus={
      ubc:zh?['从商业问题出发','用统计方法验证','把两种视角带到后面的项目']:['Start with business questions','Test them with statistics','Carry both perspectives forward'],
      leng:zh?['先把内容做出来','再看 GMV / CTR / 流量反馈','把观察变成内容与发布时间建议']:['Make the content','Read GMV / CTR / traffic signals','Turn observations into content and timing recommendations'],
      acc:zh?['执行 SIT / UAT','让缺陷、阻塞和依赖可见','复测闭环，并把重复流程做成工具']:['Execute SIT / UAT','Make defects, blockers and dependencies visible','Close the loop with retesting and workflow tools'],
      bayes:zh?['把业务任务拆成 74 项能力','用 148 套测试集比较质量 / 延迟 / 成本','把模型能力放进 Agent workflow 看真实表现']:['Break business work into 74 capabilities','Use 148 test suites to compare quality / latency / cost','Put model capability inside Agent workflows']
    };
    function focusSteps(items){
      return '<div class="r14-focus-steps">'+items.map(function(item,i){return '<span data-focus-step="'+i+'"><em>0'+(i+1)+'</em><b>'+item+'</b></span>';}).join('')+'</div>';
    }

    return ''+
      '<div class="r14-stage-art" aria-hidden="true">'+
        '<div class="r14-ubc" data-r14-stage="0">'+
          '<div class="r14-brand-lockup"><strong>UBC · Statistics</strong><small>ACADEMIC ORIGIN</small></div>'+
          '<div class="r14-ubc-path"><span>Business</span><i>→</i><span>Statistics</span></div>'+
          focusSteps(focus.ubc)+
        '</div>'+
        '<div class="r14-leng" data-r14-stage="1">'+
          '<div class="r14-brand-lockup"><strong>冷酸灵</strong><small>CONTENT OPS</small></div>'+
          '<div class="r14-leng-scene">'+
            '<div class="r14-reel-card primary"><span>01</span><b>'+ (zh?'短视频内容':'Short-form content') +'</b><i></i></div>'+
            '<div class="r14-reel-card secondary"><span>02</span><b>'+ (zh?'剪辑与发布':'Edit & publish') +'</b><i></i></div>'+
            '<div class="r14-reel-card tertiary"><span>03</span><b>'+ (zh?'数据复盘':'Performance review') +'</b><i></i></div>'+
            '<div class="r14-edit-timeline"><em></em><em></em><em></em><strong>CONTENT → PUBLISH → REVIEW</strong></div>'+
          '</div>'+
          '<div class="r14-leng-phone-ui"></div>'+
          '<div class="r14-leng-metrics">'+
            '<span><b>GMV</b><small>PERFORMANCE</small></span>'+
            '<span><b>CTR</b><small>RESPONSE</small></span>'+
            '<span><b>'+posting+'</b><small>POSTING</small></span>'+
          '</div>'+
          focusSteps(focus.leng)+
        '</div>'+
        '<div class="r14-acc" data-r14-stage="2">'+
          '<div class="r14-brand-lockup"><strong>Accenture</strong><small>ENTERPRISE SYSTEMS</small></div>'+
          '<div class="r14-acc-surface">'+
            '<div class="r14-system-head"><span>SAP · SIT/UAT</span><b>'+ (zh?'测试与缺陷协作':'Testing & defect coordination') +'</b></div>'+
            '<div class="r14-system-columns">'+
              '<div><small>TEST CASES</small><i></i><i></i><i></i><i></i></div>'+
              '<div><small>DEFECT QUEUE</small><i></i><i></i><i></i></div>'+
              '<div><small>STATUS</small><span>PASS</span><span>BLOCK</span><span>RETEST</span></div>'+
            '</div>'+
          '</div>'+
          '<div class="r14-acc-flow">'+
            '<i class="r14-acc-line l1"></i><i class="r14-acc-line l2"></i><i class="r14-acc-line l3"></i>'+
            '<div class="r14-acc-node n1" data-flow-step="0"><small>01</small><b>Test Case</b></div>'+
            '<div class="r14-acc-node n2" data-flow-step="0"><small>02</small><b>Fail</b></div>'+
            '<div class="r14-acc-node n3" data-flow-step="1"><small>03</small><b>Defect</b></div>'+
            '<div class="r14-acc-node n4" data-flow-step="2"><small>04</small><b>Retest → Pass</b></div>'+
          '</div>'+
          '<div class="r14-acc-status"><span>JIRA / TRACKER</span><span>BLOCKER</span><span>DEPENDENCY</span></div>'+
          focusSteps(focus.acc)+
        '</div>'+
        '<div class="r14-bayes" data-r14-stage="3">'+
          '<div class="r14-brand-lockup"><strong>BAYESTONE · 贝事音准</strong><small>AI SYSTEMS</small></div>'+
          '<div class="r14-bayes-surface">'+
            '<div class="r14-model-band"><span>GPT</span><span>Claude</span><span>Qwen</span><span>DeepSeek</span></div>'+
            '<div class="r14-eval-map">'+
              '<i style="--x:12%;--y:23%"></i><i style="--x:28%;--y:61%"></i><i style="--x:44%;--y:36%"></i><i style="--x:62%;--y:72%"></i><i style="--x:78%;--y:31%"></i>'+
              '<svg viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M10 18 C28 5 35 45 52 23 S74 16 90 42"/><path d="M12 46 C27 36 36 51 48 42 S70 25 88 16"/></svg>'+
            '</div>'+
            '<div class="r14-agent-route"><span>Input</span><i></i><span>Node</span><i></i><span>Check</span><i></i><span>Action</span></div>'+
          '</div>'+
          '<div class="r14-bayes-count"><small>EVALUATION TAXONOMY</small><strong>74 × 148</strong></div>'+
          '<div class="r14-bayes-grid"><span>GPT</span><span>Claude</span><span>Qwen</span><span>DeepSeek</span></div>'+
          '<div class="r14-bayes-dual">'+
            '<div class="r14-bayes-rail benchmark"><small>EVALUATE AI</small><b>LLM Benchmark</b><p>'+(zh?'能力拆解 · 测试集 · 质量 × 延迟 × 成本':'Capabilities · test suites · quality × latency × cost')+'</p></div>'+
            '<div class="r14-bayes-rail agent"><small>BUILD WITH AI</small><b>Agent Application</b><p>'+(zh?'喵聪聪 · 小马快跑 · workflow · 节点验收 · 异常案例':'Miaocongcong · Xiaoma Kuaipao · workflow · node checks · exceptions')+'</p></div>'+
          '</div>'+
          focusSteps(focus.bayes)+
        '</div>'+
      '</div>';
  }

  function applyStaticFix(){
    if(document.body) document.body.classList.add('r14-static-fix');

    var visual=document.querySelector('#journey-visual');
    if(visual && !visual.querySelector('.r14-stage-art')){
      visual.insertAdjacentHTML('beforeend',stageMarkup());
    }

    var lifeNote=document.querySelector('.life-note');
    if(lifeNote){
      lifeNote.textContent=document.documentElement.lang==='en'
        ? 'A few things I keep exploring beyond the main route.'
        : '主线之外，也一直留着一些想继续探索的东西。';
    }
  }

  var observer=new MutationObserver(applyStaticFix);
  document.addEventListener('DOMContentLoaded',function(){
    applyStaticFix();
    var app=document.querySelector('#app');
    if(app) observer.observe(app,{childList:true,subtree:true});
  });
})();

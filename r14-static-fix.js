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
    var benchmarkCopy=zh?'能力拆解 · 测试集 · 质量 × 延迟 × 成本':'Capabilities · test suites · quality × latency × cost';
    var agentCopy=zh?'喵聪聪 · 小马快跑 · workflow · 节点验收 · 异常案例':'Miaocongcong · Xiaoma Kuaipao · workflow · node checks · exceptions';

    return ''+
      '<div class="r14-stage-art" aria-hidden="true">'+
        '<div class="r14-leng" data-r14-stage="1">'+
          '<div class="r14-brand-lockup"><strong>冷酸灵</strong><small>CONTENT OPS</small></div>'+
          '<div class="r14-leng-edit"><small>EDIT · PUBLISH · REVIEW</small><div class="r14-leng-track"><i></i><i></i><i></i><i></i></div></div>'+
          '<div class="r14-leng-phone-ui"></div>'+
          '<div class="r14-leng-metrics">'+
            '<span><b>GMV</b><small>PERFORMANCE</small></span>'+
            '<span><b>CTR</b><small>RESPONSE</small></span>'+
            '<span><b>'+posting+'</b><small>POSTING</small></span>'+
          '</div>'+
        '</div>'+
        '<div class="r14-acc" data-r14-stage="2">'+
          '<div class="r14-brand-lockup"><strong>Accenture</strong><small>ENTERPRISE SYSTEMS</small></div>'+
          '<div class="r14-acc-flow">'+
            '<i class="r14-acc-line l1"></i><i class="r14-acc-line l2"></i><i class="r14-acc-line l3"></i>'+
            '<div class="r14-acc-node n1"><small>01</small><b>Test Case</b></div>'+
            '<div class="r14-acc-node n2"><small>02</small><b>Fail</b></div>'+
            '<div class="r14-acc-node n3"><small>03</small><b>Defect</b></div>'+
            '<div class="r14-acc-node n4"><small>04</small><b>Retest → Pass</b></div>'+
          '</div>'+
          '<div class="r14-acc-status"><span>JIRA / TRACKER</span><span>BLOCKER</span><span>DEPENDENCY</span></div>'+
        '</div>'+
        '<div class="r14-bayes" data-r14-stage="3">'+
          '<div class="r14-brand-lockup"><strong>BAYESTONE · 贝事音准</strong><small>AI SYSTEMS</small></div>'+
          '<div class="r14-bayes-count"><small>EVALUATION TAXONOMY</small><strong>74 × 148</strong></div>'+
          '<div class="r14-bayes-grid">'+
            '<span>GPT</span><span>Claude</span><span>Qwen</span><span>DeepSeek</span>'+
            '<span>Brief</span><span>Long</span><span>Rules</span><span>KB</span>'+
            '<span>Q</span><span>L</span><span>C</span><span>↗</span>'+
          '</div>'+
          '<div class="r14-bayes-dual">'+
            '<div class="r14-bayes-rail"><small>EVALUATE AI</small><b>LLM Benchmark</b><p>'+benchmarkCopy+'</p></div>'+
            '<div class="r14-bayes-rail agent"><small>BUILD WITH AI</small><b>Agent Application</b><p>'+agentCopy+'</p></div>'+
          '</div>'+
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

(function(){
'use strict';

function bindWork(d,locale,url){
  var universe=document.querySelector('.r15-universe');
  if(!universe)return;
  var zh=locale==='zh';
  var byId=function(id){return (d.projects||[]).find(function(p){return p.id===id;});};
  var agent=byId('agentlab');
  var benchmark=byId('benchmark');
  var requirement=byId('requirement');
  var task=byId('task-summary');
  var dashboard=byId('dashboard');
  var training=byId('training');

  var copy={
    agentlab:{
      eyebrow:zh?'AI AGENT · 评测与优化':'AI AGENT · EVALUATION',
      title:agent?agent.name:'AgentLab',
      hook:agent?agent.intro:'',
      problem:agent?agent.problem:'',
      role:agent?agent.role:'',
      evidence:agent?agent.result:'',
      href:url('/work/agentlab')
    },
    benchmark:{
      eyebrow:zh?'LLM · 业务评测':'LLM · BUSINESS EVALUATION',
      title:benchmark?benchmark.name:'LLM Benchmark',
      hook:benchmark?benchmark.intro:'',
      problem:benchmark?benchmark.problem:'',
      role:benchmark?benchmark.role:'',
      evidence:benchmark?benchmark.result:'',
      href:url('/work/benchmark')
    },
    requirement:{
      eyebrow:zh?'AI PRODUCT · 需求系统':'AI PRODUCT · REQUIREMENT SYSTEM',
      title:requirement?requirement.name:'Requirement Alignment Engine',
      hook:requirement?requirement.intro:'',
      problem:requirement?requirement.problem:'',
      role:requirement?requirement.role:'',
      evidence:requirement?requirement.result:'',
      href:url('/work/requirement')
    },
    accenture:{
      eyebrow:zh?'ENTERPRISE · 流程自动化':'ENTERPRISE · WORKFLOW AUTOMATION',
      title:zh?'Accenture Enterprise Automation':'Accenture Enterprise Automation',
      hook:zh?'把重复协调、状态汇总和培训资料整理，变成一组内部流程辅助工具。':'Turn repeated coordination, status reporting and training preparation into a small system of internal workflow tools.',
      problem:zh?'任务、测试状态、缺陷与培训信息散落在 Outlook、Teams、Jira、Excel 和项目文档中。':'Tasks, test status, defects and training information were spread across Outlook, Teams, Jira, Excel and project documents.',
      role:zh?'在实习中负责需求与流程设计、输出检查和迭代；GitHub Copilot 提供了大量代码辅助。三个工具的贡献边界分别保留在各自 Case Study 中。':'During the internship, I owned requirements and workflow design, checked outputs and iterated the tools; GitHub Copilot provided substantial coding assistance. Each case study keeps its own attribution boundaries.',
      evidence:zh?'Task Summary Workflow 被团队实际使用；生成的培训材料被团队使用；SIT / Defect Dashboard 已完成交接，后续采用程度未确认。':'The Task Summary Workflow was used by colleagues; generated training materials were used by the team; the SIT / Defect Dashboard was handed off, with later adoption unverified.',
      href:url('/work/task-summary')
    }
  };

  var eyebrow=document.getElementById('r15-focus-eyebrow');
  var title=document.getElementById('r15-focus-title');
  var hook=document.getElementById('r15-focus-hook');
  var problem=document.getElementById('r15-focus-problem');
  var role=document.getElementById('r15-focus-role');
  var evidence=document.getElementById('r15-focus-evidence');
  var link=document.getElementById('r15-case-link');
  var accLinks=document.getElementById('r15-accenture-links');
  var nodes=[].slice.call(document.querySelectorAll('[data-r15-project]'));

  function setFocus(id){
    var item=copy[id]||copy.agentlab;
    universe.dataset.r15Focus=id;
    nodes.forEach(function(n){n.setAttribute('aria-pressed',String(n.dataset.r15Project===id));});
    if(eyebrow)eyebrow.textContent=item.eyebrow;
    if(title)title.textContent=item.title;
    if(hook)hook.textContent=item.hook;
    if(problem)problem.textContent=item.problem;
    if(role)role.textContent=item.role;
    if(evidence)evidence.textContent=item.evidence;
    if(link){
      link.href=item.href;
      link.textContent=zh?'打开 Case Study ↗':'Open case study ↗';
    }
    if(accLinks)accLinks.hidden=id!=='accenture';
  }

  nodes.forEach(function(node){
    var id=node.dataset.r15Project;
    node.addEventListener('mouseenter',function(){setFocus(id);});
    node.addEventListener('focus',function(){setFocus(id);});
    node.addEventListener('click',function(){setFocus(id);});
  });

  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var field=universe.querySelector('.r15-orbit-field');
    universe.addEventListener('pointermove',function(e){
      if(window.innerWidth<901)return;
      var r=universe.getBoundingClientRect();
      var x=((e.clientX-r.left)/r.width-.5)*8;
      var y=((e.clientY-r.top)/r.height-.5)*8;
      if(field){field.style.setProperty('--px',x.toFixed(2)+'px');field.style.setProperty('--py',y.toFixed(2)+'px');}
    });
    universe.addEventListener('pointerleave',function(){
      if(field){field.style.setProperty('--px','0px');field.style.setProperty('--py','0px');}
    });
  }

  setFocus('agentlab');
}

window.YihanR15={bindWork:bindWork};
})();
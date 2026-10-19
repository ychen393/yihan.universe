/* V0.3: Accessible, bilingual constellation and curiosity views. */
(function(){
'use strict';
const groups=[['ai','AI 与智能体','AI & Agent','模型评测、Agent 可靠性与内容审核','Agent testing, evaluation and content review'],['enterprise','企业与产品','Enterprise & Product','需求、系统与企业协作','Enterprise workflows and product systems'],['data','数据与策略','Data & Strategy','从数据中寻找靠谱的答案','Evidence from data and strategy'],['creative','创意实验','Creative Experiments','让脑洞变成可玩的东西','Ideas to play with']];
const label=(g,zh)=>g[zh?1:2];
function work(t,d,locale,url,esc,stars){
  const zh=locale==='zh';
  const byId=id=>d.projects.find(p=>p.id===id);
  const agent=byId('agentlab');
  const benchmark=byId('benchmark');
  const requirement=byId('requirement');
  const task=byId('task-summary');
  const dashboard=byId('dashboard');
  const training=byId('training');
  const featuredIds=new Set(['agentlab','benchmark','requirement','task-summary','dashboard','training']);
  const more=d.projects.filter(p=>!featuredIds.has(p.id));
  const safe=p=>p||{};
  const name=p=>esc(safe(p).name||'');
  const intro=p=>esc(safe(p).intro||'');
  const problem=p=>esc(safe(p).problem||'');
  const role=p=>esc(safe(p).role||'');
  const result=p=>esc(safe(p).result||'');
  const tag=p=>esc(safe(p).tag||'');

  return `<section id="work" class="work-section r151-work-section" aria-label="${zh?'作品':'Work'}">
    ${stars(130,'work-stars')}

    <div class="r151-transition" aria-labelledby="r151-transition-title">
      <div class="r151-transition-inner">
        <p class="eyebrow">JOURNEY → WORK</p>
        <h2 id="r151-transition-title">
          <span>${zh?'有些路是被分配的':'Some paths were assigned'}</span>
          <span>${zh?'另一些是我自己开出来的':'Others I started myself'}</span>
        </h2>
        <p>${zh?'经历中遇到的问题 后来变成了这些项目':'Problems I encountered along the way became projects I chose to keep working on'}</p>
        <div class="r151-transition-line" aria-hidden="true">
          <span></span><i></i><i></i><i></i><i></i>
        </div>
      </div>
    </div>

    <div class="r151-story" data-r151-active="agentlab">
      <div class="r151-stage" aria-live="polite">
        <nav class="r151-index" aria-label="${zh?'重点项目':'Featured projects'}">
          <button type="button" data-r151-jump="agentlab" aria-pressed="true" aria-label="AgentLab"><b>AgentLab</b></button>
          <button type="button" data-r151-jump="benchmark" aria-pressed="false" aria-label="LLM Benchmark"><b>LLM Benchmark</b></button>
          <button type="button" data-r151-jump="accenture" aria-pressed="false" aria-label="Accenture Automation"><b>Accenture Automation</b></button>
          <button type="button" data-r151-jump="requirement" aria-pressed="false" aria-label="Requirement Engine"><b>Requirement Engine</b></button>
        </nav>

        <article class="r151-scene r151-agent" data-r151-scene="agentlab" aria-hidden="false">
          <div class="r151-copy">
            <p class="r151-kicker">01 · AI AGENT / EVALUATION</p>
            <div class="r152-context">${zh?'独立项目 · AI Agent 评测与优化':'Independent Project · AI Agent Evaluation'}</div>
            <h3>${name(agent)}</h3>
            <p class="r151-hook">${intro(agent)}</p>
            <div class="r151-brief r152-recruiter-brief">
              <div><span>${zh?'问题':'Problem'}</span><p>${problem(agent)}</p></div>
              <div><span>${zh?'我的贡献':'My contribution'}</span><p>${role(agent)}</p></div>
              <div><span>${zh?'方法':'Method'}</span><p>${agent?esc(agent.method):''}</p></div>
              <div><span>${zh?'结果':'Evidence'}</span><p>${agent?esc(agent.result):''}</p></div>
              <div><span>${zh?'证据边界':'Scope'}</span><p>${agent?esc(agent.limit):''}</p></div>
            </div>
            <a data-nav class="r151-open" href="${url('/work/agentlab')}">${zh?'进入 AgentLab Case Study':'Open AgentLab case study'} ↗</a>
          </div>
          <div class="r151-mechanism r151-agent-mechanism" aria-hidden="true">
            <div class="r151-agent-line"></div>
            <div class="r151-agent-step s1"><small>01</small><b>Failure</b></div>
            <div class="r151-agent-step s2"><small>02</small><b>Root Cause</b></div>
            <div class="r151-agent-step s3"><small>03</small><b>Bounded Patch</b></div>
            <div class="r151-agent-step s4"><small>04</small><b>Regression</b></div>
            <div class="r151-agent-evidence"><span>${zh?'固定回归通过数':'FIXED REGRESSION PASSED'}</span><strong>5/7 → 7/7</strong><small>${zh?'7 个固定回归 Case':'7 fixed regression cases'}</small></div>
            <div class="r151-agent-evidence final"><span>${zh?'完整受控验证通过数':'CONTROLLED VALIDATION PASSED'}</span><strong>15/16 → 16/16</strong><small>${zh?'16 个受控验证 Case':'16 controlled validation cases'}</small></div>
          </div>
        </article>

        <article class="r151-scene r151-benchmark" data-r151-scene="benchmark" aria-hidden="true">
          <div class="r151-copy">
            <p class="r151-kicker">02 · LLM / BUSINESS EVALUATION</p>
            <div class="r152-context">BAYESTONE · ${zh?'2026.09—至今 · 实习':'Sep 2026–Present · Internship'}</div>
            <h3>${name(benchmark)}</h3>
            <p class="r151-hook">${intro(benchmark)}</p>
            <div class="r151-brief r152-recruiter-brief">
              <div><span>${zh?'问题':'Problem'}</span><p>${problem(benchmark)}</p></div>
              <div><span>${zh?'我的贡献':'My contribution'}</span><p>${role(benchmark)}</p></div>
              <div><span>${zh?'方法':'Method'}</span><p>${benchmark?esc(benchmark.method):''}</p></div>
              <div><span>${zh?'结果':'Evidence'}</span><p>${benchmark?esc(benchmark.result):''}</p></div>
              <div><span>${zh?'当前状态':'Current status'}</span><p>${benchmark?esc(benchmark.limit):''}</p></div>
            </div>
            <a data-nav class="r151-open" href="${url('/work/benchmark')}">${zh?'进入 LLM Benchmark Case Study':'Open LLM Benchmark case study'} ↗</a>
          </div>
          <div class="r151-mechanism r151-benchmark-mechanism" aria-hidden="true">
            <div class="r151-model-axis"><span>GPT</span><span>Claude</span><span>Qwen</span><span>DeepSeek</span></div>
            <div class="r151-capability-axis">
              <span>Instruction</span><span>Long Context</span><span>Classification</span><span>Reasoning</span><span>Knowledge</span><span>Generation</span>
            </div>
            <div class="r151-matrix">
              ${Array.from({length:24},(_,i)=>`<i class="${[1,6,10,15,19,22].includes(i)?'hot':''}"></i>`).join('')}
            </div>
            <div class="r151-benchmark-metrics"><span>QUALITY</span><span>LATENCY</span><span>COST</span></div>
            <div class="r151-big-number"><div><strong>74</strong><span>${zh?'二级能力':'CAPABILITIES'}</span></div><b>×</b><div><strong>148</strong><span>${zh?'已落地测试集':'IMPLEMENTED TEST SUITES'}</span></div></div>
          </div>
        </article>

        <article class="r151-scene r151-accenture" data-r151-scene="accenture" aria-hidden="true">
          <div class="r151-copy">
            <p class="r151-kicker">03 · ENTERPRISE / WORKFLOW AUTOMATION</p>
            <div class="r152-context">Accenture · ${zh?'2026.05—09 · 企业系统实习':'May–Sep 2026 · Enterprise Systems Internship'}</div>
            <h3>Workflow Automation</h3>
            <p class="r151-hook">${zh?'把重复协调、状态汇总和培训资料整理，变成三个可复用的内部流程工具。':'Turn repeated coordination, status reporting and training preparation into three reusable internal workflow tools.'}</p>
            <div class="r151-brief r152-recruiter-brief">
              <div><span>${zh?'问题':'Problem'}</span><p>${zh?'任务、测试状态、缺陷和培训材料分散在多个协作工具与项目文档里。':'Tasks, test status, defects and training material were scattered across collaboration tools and project documents.'}</p></div>
              <div><span>${zh?'我的贡献':'My contribution'}</span><p>${zh?'实习期间提出需求、设计流程、检查输出并迭代；部分实现使用 GitHub Copilot 辅助。':'During the internship, I defined needs, designed workflows, checked outputs and iterated; parts of implementation used GitHub Copilot assistance.'}</p></div>
              <div class="r153-detail-row"><span>${zh?'方法':'Method'}</span><div class="r153-detail-stack">
                <p><b>Task Summary</b>${task?esc(task.method):''}</p>
                <p><b>SIT / Defect Dashboard</b>${dashboard?esc(dashboard.method):''}</p>
                <p><b>Training Generator</b>${training?esc(training.method):''}</p>
              </div></div>
              <div class="r153-detail-row"><span>${zh?'结果':'Evidence'}</span><div class="r153-detail-stack">
                <p><b>Task Summary</b>${task?esc(task.result):''}</p>
                <p><b>SIT / Defect Dashboard</b>${dashboard?esc(dashboard.result):''}</p>
                <p><b>Training Generator</b>${training?esc(training.result):''}</p>
              </div></div>
              <div><span>${zh?'证据边界':'Evidence boundary'}</span><p>${zh?'Task Summary 被同事实际使用；生成的培训材料被团队使用；Dashboard 已交接，后续采用程度未确认。':'Task Summary was used by colleagues; generated training materials were used by the team; Dashboard was handed off, with later adoption unverified.'}</p></div>
            </div>
            <div class="r153-case-links" aria-label="${zh?'Accenture 子项目':'Accenture case studies'}">
              <a data-nav href="${url('/work/task-summary')}">Task Summary ↗</a>
              <a data-nav href="${url('/work/dashboard')}">SIT / Defect Dashboard ↗</a>
              <a data-nav href="${url('/work/training')}">Training Generator ↗</a>
            </div>
          </div>
          <div class="r151-mechanism r151-accenture-mechanism" aria-hidden="true">
            <div class="r151-input-cloud">
              <span>Outlook</span><span>Teams</span><span>Jira</span><span>Excel</span><span>SIT/UAT</span><span>Docs</span>
            </div>
            <div class="r151-flow-spine"><i></i><strong>${zh?'STRUCTURE':'STRUCTURE'}</strong><i></i></div>
            <div class="r151-output-world">
              <div><small>01</small><b>Task Summary</b><span>Owner · Deadline · Blocker</span></div>
              <div><small>02</small><b>SIT / Defect Dashboard</b><span>Status · Risk · Visibility</span></div>
              <div><small>03</small><b>Training Generator</b><span>Guide · Slides · Notes</span></div>
            </div>
          </div>
        </article>

        <article class="r151-scene r151-requirement" data-r151-scene="requirement" aria-hidden="true">
          <div class="r151-copy">
            <p class="r151-kicker">04 · AI PRODUCT / REQUIREMENT SYSTEM</p>
            <div class="r152-context">${zh?'独立产品 · 可运行 MVP':'Independent Product · Working MVP'}</div>
            <h3>${name(requirement)}</h3>
            <p class="r151-hook">${intro(requirement)}</p>
            <div class="r151-brief r152-recruiter-brief">
              <div><span>${zh?'问题':'Problem'}</span><p>${problem(requirement)}</p></div>
              <div><span>${zh?'我的贡献':'My contribution'}</span><p>${role(requirement)}</p></div>
              <div><span>${zh?'方法':'Method'}</span><p>${requirement?esc(requirement.method):''}</p></div>
              <div><span>${zh?'结果':'Evidence'}</span><p>${requirement?esc(requirement.result):''}</p></div>
              <div><span>${zh?'当前状态':'Current status'}</span><p>${requirement?esc(requirement.limit):''}</p></div>
            </div>
            <a data-nav class="r151-open" href="${url('/work/requirement')}">${zh?'进入 Requirement Engine Case Study':'Open Requirement Engine case study'} ↗</a>
          </div>
          <div class="r151-mechanism r151-requirement-mechanism" aria-hidden="true">
            <div class="r151-noise">
              <span>${zh?'“尽快做出来”':'“Build it quickly”'}</span>
              <span>${zh?'“要支持所有场景”':'“Support every scenario”'}</span>
              <span>${zh?'“最好不要改现有流程”':'“Do not disrupt the current flow”'}</span>
              <span>${zh?'“后面可能还会变”':'“This may change later”'}</span>
            </div>
            <div class="r151-align-flow">
              <div><small>01</small><b>${zh?'澄清':'Clarify'}</b></div>
              <i>→</i>
              <div><small>02</small><b>${zh?'影响分析':'Impact'}</b></div>
              <i>→</i>
              <div class="gate"><small>03</small><b>${zh?'人工确认':'Human confirm'}</b></div>
              <i>→</i>
              <div class="confirmed"><small>04</small><b>${zh?'可执行版本':'Executable version'}</b></div>
            </div>
            <div class="r151-version-line"><small>${zh?'需求版本':'REQUIREMENT VERSION'}</small><span>v1</span><i></i><span>v2</span><i></i><b>${zh?'已确认':'confirmed'}</b></div>
          </div>
        </article>
      </div>

      <div class="r151-beats" aria-hidden="true">
        <div data-r151-beat="agentlab"></div>
        <div data-r151-beat="benchmark"></div>
        <div data-r151-beat="accenture"></div>
        <div data-r151-beat="requirement"></div>
      </div>
    </div>

    <div class="r151-directory">
      <div class="r151-directory-head">
        <div><p class="eyebrow">${zh?'更多项目':'MORE WORK'}</p><h3>${zh?'更多项目与实验':'More projects and experiments'}</h3></div>
        <p>${zh?'其余项目都列在这里 点击可查看对应 Case Study':'Browse the remaining projects and open any case study for details'}</p>
      </div>
      <div class="r151-directory-grid">
        ${more.map(p=>{
          const contextMap={
            'content-qa':zh?'独立原型 · 营销内容质检':'Independent Prototype · Content QA',
            'airbnb':zh?'UBC 统计课程 · 小组项目':'UBC Statistics · Group Project',
            'sp500':zh?'UBC 统计研究 · 小组项目':'UBC Statistics · Group Research',
            'minecraft':zh?'UBC 课程 · 小组项目':'UBC Course · Group Project',
            'deloitte':zh?'商业策略竞赛':'Business Strategy Competition',
            'character':zh?'独立创意产品实验':'Independent Creative Product',
            'liferpg':zh?'独立产品 · Local-first 原型':'Independent Product · Local-first Prototype'
          };
          const context=contextMap[p.id]||tag(p);
          return `<a data-nav class="r151-directory-item" href="${url('/work/'+p.id)}"><small>${esc(context)}</small><strong>${name(p)}</strong><span>${intro(p)}</span><em>↗</em></a>`;
        }).join('')}
      </div>
    </div>
  </section>`;
}
function about(t,d,locale,url,esc,stars){const zh=locale==='zh',cs=d.curiosities||[],c=cs[0]||{};return `<section id="about" class="about-section" aria-labelledby="about-heading">${stars(65,'about-stars')}<div class="about-body"><p class="eyebrow">${esc(t.aboutEyebrow)}</p><h2 id="about-heading">${esc(t.aboutTitle)}</h2><p>${esc(t.aboutLead)}</p><p class="aside-quote">${zh?'主线认真打，支线也不能落下。':'Collecting side quests, one curiosity at a time.'}</p><div class="about-links"><a data-nav class="button button-main" href="${url('/life')}">${zh?'看看我的支线任务 ↗':'Explore my side quests ↗'}</a><a data-nav class="button button-ghost" href="${url('/resume')}">${zh?'简历 ↗':'Resume ↗'}</a><a class="button button-ghost" href="mailto:yihanchen0625@163.com">${zh?'邮件 ↗':'Email ↗'}</a><a class="button button-ghost" target="_blank" rel="noopener" href="https://github.com/ychen393">GitHub ↗</a></div><small>${zh?'联系邮箱：yihanchen0625@163.com':'Contact: yihanchen0625@163.com'}</small></div><div class="curiosity-orbit"><div class="curiosity-center"><strong>Curiosity</strong><span>${zh?'好奇心':'Still curious'}</span></div>${cs.map((c,i)=>`<button type="button" class="curiosity-node" data-curiosity="${c.id}" data-id="${c.id}" aria-pressed="${i===0}">${esc(c.label)}</button>`).join('')}<div class="curiosity-summary" aria-live="polite"><strong id="curiosity-focus">${esc(c.label||'')}</strong><p id="curiosity-copy">${esc(c.text||'')}</p></div></div></section>`;}
function life(t,d,locale,url,esc,header,footer){const zh=locale==='zh';return `${header(t)}<main class="life-page"><a data-nav class="life-back" href="${url()}#about">← ${zh?'回到我的宇宙':'Back to my universe'}</a><p class="eyebrow">CURIOSITY CLUSTER / ${zh?'人生支线任务':'SIDE QUESTS'}</p><h1>${zh?'总有点别的东西，想试试看。':'There is always one more thing to try.'}</h1><p class="life-page-lead">${esc(t.aboutLead)}</p><div class="life-list">${(d.curiosities||[]).map((c,i)=>`<article class="life-item"><small>0${i+1} / ${esc(c.en.toUpperCase())}</small><h2>${esc(c.label)}</h2><p>${esc(c.text)}</p><span>${esc(c.note)}</span></article>`).join('')}</div><p class="life-note">${zh?'这里是我的兴趣与愿望清单，不是履历证明。':'These are interests and wishes, not credentials.'}</p><a data-nav class="button button-ghost" href="${url()}#work">${zh?'看看我的作品 ↗':'Explore the work ↗'}</a></main>${footer(t)}`;}
function bindHome(d,locale,url){
  if(window.YihanR15&&typeof window.YihanR15.bindWork==='function')window.YihanR15.bindWork(d,locale,url);
  document.querySelectorAll('[data-curiosity]').forEach(b=>b.addEventListener('click',()=>{
    const c=d.curiosities.find(c=>c.id===b.dataset.curiosity);
    if(!c)return;
    document.querySelectorAll('[data-curiosity]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    const focus=document.getElementById('curiosity-focus');
    const copy=document.getElementById('curiosity-copy');
    if(focus)focus.textContent=c.label;
    if(copy)copy.textContent=c.text;
  }));
}
window.YihanV03={work,about,life,bindHome};
})();
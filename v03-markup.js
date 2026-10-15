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
  const hiddenIds=new Set(['agentlab','benchmark','requirement','task-summary','dashboard','training']);
  const more=d.projects.filter(p=>!hiddenIds.has(p.id));
  const tag=p=>p?esc(p.tag||''):'';
  const name=p=>p?esc(p.name||''):'';
  const intro=p=>p?esc(p.intro||''):'';
  return `<section id="work" class="work-section r15-work-section" aria-labelledby="work-heading">
    ${stars(150,'work-stars')}
    <div class="r15-work-transition" aria-labelledby="r15-transition-title">
      <div class="r15-transition-copy">
        <p class="eyebrow">JOURNEY → WORK</p>
        <h2 id="r15-transition-title">${zh?'有些路是被分配的。另一些，是我自己开出来的。':'Some paths were assigned. Others, I started myself.'}</h2>
        <p>${zh?'Journey 是已经发生过的时间线；Work 不是另一条时间线，而是一张我主动拆问题、做实验、搭系统的探索地图。':'Journey is chronological. Work is not another timeline — it is a map of problems I chose to unpack, test and build around.'}</p>
        <div class="r15-path-split" aria-hidden="true">
          <span class="r15-split-origin"></span>
          <svg viewBox="0 0 960 230" preserveAspectRatio="none">
            <path d="M480 0 C480 74 250 72 92 214"/>
            <path d="M480 0 C480 72 364 116 318 216"/>
            <path d="M480 0 C480 72 596 116 642 216"/>
            <path d="M480 0 C480 74 710 72 868 214"/>
            <circle cx="92" cy="214" r="5"/><circle cx="318" cy="216" r="5"/><circle cx="642" cy="216" r="5"/><circle cx="868" cy="214" r="5"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="r15-work-shell">
      <header class="r15-work-header">
        <div>
          <p class="eyebrow">${esc(t.workEyebrow)}</p>
          <h2 id="work-heading">${zh?'靠近一个问题，而不是翻下一张卡。':'Move closer to a problem, not to the next card.'}</h2>
        </div>
        <p>${zh?'先从四个最能代表我当前方向的系统开始：Agent 评测、LLM Benchmark、企业流程自动化、需求对齐产品。其余项目仍然保留在下方。':'Start with four systems that best represent where my work is heading now: agent evaluation, LLM benchmarking, enterprise workflow automation and requirement alignment. Everything else remains explorable below.'}</p>
      </header>

      <div id="galaxy" class="r15-universe" data-r15-focus="agentlab" aria-label="${zh?'重点项目探索区':'Featured project universe'}">
        <div class="r15-orbit-field" aria-label="${zh?'选择重点项目':'Choose a featured project'}">
          <svg class="r15-orbits" viewBox="0 0 760 720" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="380" cy="360" rx="300" ry="182" transform="rotate(-14 380 360)"/>
            <ellipse cx="380" cy="360" rx="324" ry="250" transform="rotate(25 380 360)"/>
            <ellipse cx="380" cy="360" rx="230" ry="316" transform="rotate(63 380 360)"/>
            <path class="relation" d="M380 360 C250 250 170 150 100 110"/>
            <path class="relation" d="M380 360 C530 250 610 170 680 128"/>
            <path class="relation" d="M380 360 C240 480 170 560 108 625"/>
            <path class="relation" d="M380 360 C525 475 605 560 670 625"/>
          </svg>
          <div class="r15-core"><div><strong>Yihan’s<br>Universe</strong><small>${zh?'选择一个信号':'CHOOSE A SIGNAL'}</small></div></div>

          <button type="button" class="r15-project-node" data-r15-project="agentlab" aria-pressed="true">
            <small>AI AGENT · EVALUATION</small><strong>${name(agent)}</strong><em>${agent?esc(agent.proof||agent.result):''}</em>
          </button>
          <button type="button" class="r15-project-node" data-r15-project="benchmark" aria-pressed="false">
            <small>LLM · BUSINESS EVALUATION</small><strong>${name(benchmark)}</strong><em>74 × 148</em>
          </button>
          <button type="button" class="r15-project-node" data-r15-project="accenture" aria-pressed="false">
            <small>ENTERPRISE · AUTOMATION</small><strong>Accenture Automation</strong><em>${zh?'3 个内部流程工具':'3 internal workflow tools'}</em>
          </button>
          <button type="button" class="r15-project-node" data-r15-project="requirement" aria-pressed="false">
            <small>AI PRODUCT · REQUIREMENTS</small><strong>${name(requirement)}</strong><em>${requirement?esc(requirement.proof||requirement.result):''}</em>
          </button>
        </div>

        <aside class="r15-inspector" aria-live="polite">
          <div class="r15-project-visuals" aria-hidden="true">
            <div class="r15-project-visual" data-r15-visual="agentlab">
              <span class="r15-visual-label">FAILURE → ROOT CAUSE → PATCH → REGRESSION</span>
              <div class="r15-agent-pipeline"><span>Failure</span><span>Root cause</span><span>Bounded patch</span><span>Regression</span></div>
              <div class="r15-agent-score">15/16 → 16/16<small>CONTROLLED VALIDATION</small></div>
            </div>
            <div class="r15-project-visual" data-r15-visual="benchmark">
              <span class="r15-visual-label">MODEL × CAPABILITY × BUSINESS TASK</span>
              <div class="r15-benchmark-matrix">
                <span>GPT</span><span>Claude</span><span>Qwen</span><span>DeepSeek</span>
                <span>Brief</span><span>Rules</span><span>Long text</span><span>Knowledge</span>
                <span>Quality</span><span>Latency</span><span>Cost</span><span>Errors</span>
                <span>Case</span><span>Case</span><span>Case</span><span>Case</span>
              </div>
              <div class="r15-benchmark-count">74 × 148<small>${zh?'二级能力 × 已落地测试集':'CAPABILITIES × IMPLEMENTED TEST SUITES'}</small></div>
            </div>
            <div class="r15-project-visual" data-r15-visual="accenture">
              <span class="r15-visual-label">FRAGMENTED INPUTS → ACTIONABLE STRUCTURE</span>
              <div class="r15-source-flow">
                <div class="r15-source-stack"><span>Outlook</span><span>Teams</span><span>Jira</span><span>Excel</span></div>
                <div class="r15-flow-arrow">→</div>
                <div class="r15-output-stack"><span>Owner / Deadline</span><span>Status / Blocker</span><span>Training / Summary</span></div>
              </div>
              <div class="r15-acc-tools"><span>Task Summary</span><span>SIT / Defect Dashboard</span><span>Training Material Generator</span></div>
            </div>
            <div class="r15-project-visual" data-r15-visual="requirement">
              <span class="r15-visual-label">AMBIGUOUS REQUEST → CONFIRMED VERSION</span>
              <div class="r15-requirement-flow">
                <div class="r15-requirement-card"><small>INPUT</small><strong>${zh?'模糊需求':'Ambiguous request'}</strong></div>
                <div class="r15-requirement-arrow">→</div>
                <div class="r15-requirement-card"><small>ALIGN</small><strong>${zh?'澄清 · 影响分析':'Clarify · impact'}</strong></div>
                <div class="r15-requirement-arrow">→</div>
                <div class="r15-requirement-card r15-confirm-gate"><small>HUMAN GATE</small><strong>${zh?'确认后执行':'Confirm before execution'}</strong></div>
              </div>
              <div class="r15-version-strip"><span>v1</span><span>→</span><span>v2</span><span>→</span><b>confirmed</b></div>
            </div>
          </div>

          <div class="r15-inspector-copy">
            <small id="r15-focus-eyebrow">AI AGENT · ${zh?'评测与优化':'EVALUATION'}</small>
            <h3 id="r15-focus-title">${name(agent)}</h3>
            <p class="r15-inspector-hook" id="r15-focus-hook">${intro(agent)}</p>
            <div class="r15-facts">
              <div class="r15-fact"><span>${zh?'问题':'Problem'}</span><p id="r15-focus-problem">${agent?esc(agent.problem):''}</p></div>
              <div class="r15-fact"><span>${zh?'我的贡献':'My contribution'}</span><p id="r15-focus-role">${agent?esc(agent.role):''}</p></div>
              <div class="r15-fact"><span>${zh?'证据 / 边界':'Evidence / boundary'}</span><p id="r15-focus-evidence">${agent?esc(agent.result):''}</p></div>
            </div>
            <div class="r15-inspector-actions">
              <a data-nav class="r15-case-link" id="r15-case-link" href="${url('/work/agentlab')}">${zh?'打开 Case Study ↗':'Open case study ↗'}</a>
              <div class="r15-accenture-links" id="r15-accenture-links" hidden>
                <a data-nav href="${url('/work/task-summary')}">Task Summary</a>
                <a data-nav href="${url('/work/dashboard')}">SIT Dashboard</a>
                <a data-nav href="${url('/work/training')}">Training Generator</a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div class="r15-more">
        <div class="r15-more-head">
          <h3>${zh?'继续探索其他项目':'Keep exploring'}</h3>
          <p>${zh?'重点项目只负责建立第一印象；数据分析、内容 QA 和创意实验仍然保留完整入口。':'The featured systems establish the first impression; data studies, content QA and creative experiments remain fully accessible.'}</p>
        </div>
        <div class="r15-more-grid">
          ${more.map(p=>`<a data-nav class="r15-more-card" href="${url('/work/'+p.id)}"><small>${tag(p)}</small><strong>${name(p)}</strong><span>${intro(p)}</span></a>`).join('')}
        </div>
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
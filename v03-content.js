/* Yihan's Universe V0.3 — editable bilingual editorial content. */
(function () {
  'use strict';
  const portfolio = window.PORTFOLIO;
  if (!portfolio || !portfolio.zh || !portfolio.en) return;
  Object.assign(portfolio.zh.site, {
    workEyebrow: '02 · 作品宇宙', workTitle: '每个脑洞，都有自己的轨道。',
    workLead: 'AI、企业产品、数据与策略、创意实验——四条星轨，十三种尝试。点开一个节点，看看我到底做了什么。',
    aboutEyebrow: '03 · Curiosity Cluster', aboutTitle: '人生支线任务。',
    aboutLead: '工作之外，我经常把自己安排得明明白白：运动、语言、旅行，还有突然上头想研究的各种小东西。不是每样都非得学出名堂，有时候就是觉得：世界这么大，多会一点总归挺赚的。',
  });
  Object.assign(portfolio.en.site, {
    workEyebrow: '02 · Constellation Tree', workTitle: 'One curiosity. Four constellations.',
    workLead: 'AI systems, products, data, and creative experiments. Follow a branch, find a project, and see how the work came together.',
    aboutEyebrow: '03 · Curiosity Cluster', aboutTitle: 'Side quests matter, too.',
    aboutLead: 'Outside work, my curiosity rarely takes a day off. I make time for movement, languages, places I have never been, and a growing list of things I just want to try. Not every hobby needs a five-year plan.',
  });
  portfolio.zh.journey[0].story='一开始读商科，我很喜欢从现实问题出发想事情。后来发现，自己更想弄明白那些结论究竟靠不靠谱：数据从哪儿来？假设站不站得住？有没有更严谨的解释？于是转向统计学。商业问题没有消失，只是多了一套可以验证它们的工具。';
  portfolio.zh.journey[0].points=['从 Business 转到 Science，选择 Statistics 作为主要学习方向。','持续学习统计推断、数据清洗、回归建模与编程分析。','把商科中的用户与商业视角带进后来的数据、产品和 AI 项目。'];
  portfolio.zh.journey[1].lead='视频剪完，故事才讲了一半。';
  portfolio.zh.journey[1].story='在冷酸灵，白天可能还在剪映里调视频节奏，转头就得去看巨量千川和 Excel 里的数据。我参与内容制作和发布，也整理抖音直播与投放表现：看流量从哪里来、哪些内容有人愿意点、什么时候发布效果更好。建议曾被团队参考，但我更在意的是学会了用数据反问自己的内容判断。';
  portfolio.zh.journey[1].points=['使用剪映参与抖音短视频制作，配合内容运营与发布。','整理巨量千川、直播及内容数据，关注 GMV、点击率、观看互动、流量来源和转化。','按内容、时段与用户维度复盘，针对发布时间和内容节奏提出建议；部分得到团队参考。'];
  portfolio.zh.journey[2].lead='大项目里，最怕的不是问题多，是问题说不清。';
  portfolio.zh.journey[2].story='在 SAP 项目的 SIT/UAT 阶段，我不只是执行测试脚本：还需要补充验证步骤、记录缺陷、复测问题、对齐 Jira/Tracker 状态，和开发、业务、测试同事确认谁在处理、卡在哪儿。数据准备与迁移核验、会议记录、风险汇报和培训内容，也都是每天实际会遇到的事情。在这些繁杂流程里，我开始尝试把重复汇总做成工具。';
  portfolio.zh.journey[2].points=['执行、修改 SIT/UAT 测试用例与预期结果；记录、追踪及复测缺陷。','协助测试数据准备与迁移质量核查，跟进跨团队阻塞、依赖和状态更新。','整理进度、风险、会议与培训材料；主动设计并交付三项内部流程辅助工具。'];
  portfolio.zh.journey[3].lead='别只问哪个模型最强，要问它适合做什么。';
  portfolio.zh.journey[3].story='在 BAYESTONE，我的工作从“试试模型能不能回答”变成了“怎样设计一个公平、能复现、和业务真正相关的测试”。从 Brief 理解、规则遵循到长文本与知识依据选择，我们拆分能力、建立样本和评分口径，在不同平台比较质量、延迟、成本，也追踪模型为什么遗漏信息或答非所问。';
  portfolio.zh.journey[3].points=['完成覆盖 74 项二级能力的评测分类与 148 套通用/业务测试集。','设计输入、参考输出、评分规则和硬错误，补充复杂场景与失败挑战用例。','跨模型和平台开展分能力实验，复核长文本遗漏、事实依据误用及约束违背，分析质量、延迟和成本。'];
  portfolio.en.journey[0].story='I began in business, drawn to real decisions and the people behind them. But I kept asking whether the evidence held up. That curiosity took me toward Statistics: a more rigorous way to challenge assumptions, examine data, and understand uncertainty.';
  portfolio.en.journey[0].points=['Moved from Business to Science, focusing on Statistics.','Built foundations in statistical inference, data preparation, regression, and programming.','Brought the business perspective into later analytics, AI, and product projects.'];
  portfolio.en.journey[1].lead='Editing the video was only half the story.';
  portfolio.en.journey[1].story='At Lengsuanling, I worked on Douyin content editing and operations, then looked at Qianchuan and Excel data to understand what happened after publishing. I reviewed traffic sources, engagement, GMV, click-through rates, and timing to make practical recommendations that the team considered.';
  portfolio.en.journey[1].points=['Edited and supported Douyin short-form content using Jianying.','Organized marketing and livestream data, including traffic, engagement, GMV, and conversion indicators.','Compared content and posting times; some recommendations informed team decisions.'];
  portfolio.en.journey[2].lead='In a large project, the hard part is often making the problem clear.';
  portfolio.en.journey[2].story='During SAP SIT/UAT work, I executed and revised test scripts, recorded defects, coordinated retesting, and helped teams see what was blocked. I also supported test data and migration checks, progress reporting, and training materials. Repeated reporting tasks sparked three internal workflow tools.';
  portfolio.en.journey[2].points=['Executed and updated SIT/UAT test cases, expected results, defect records and retests.','Supported test data preparation, migration checks, Jira tracking and cross-team follow-up.','Consolidated status, risks, documentation and training; helped deliver three internal workflow tools.'];
  portfolio.en.journey[3].lead='The best model is the one that fits the job.';
  portfolio.en.journey[3].story='At BAYESTONE, I moved from trying model outputs to building repeatable, business-grounded evaluations. I defined task capabilities, references, scoring rules and hard failures, then compared performance, latency and cost across models and platforms while examining error patterns.';
  portfolio.en.journey[3].points=['Built an evaluation taxonomy with 74 secondary capabilities and 148 test suites.','Defined cases, expected outputs, rubrics and critical failures.','Ran task-specific model comparisons and examined omissions, evidence misuse and constraint violations.'];
  portfolio.zh.curiosities=[
    {id:'movement',label:'动一动才舒服',en:'Movement',caption:'健身和羽毛球',text:'有空就想动一动。健身的时候专心练，打羽毛球的时候专心追球。偶尔发挥不太行，就当给下次留点进步空间。',note:'正在进行'},
    {id:'languages',label:'语言地图还没画完',en:'Languages',caption:'语言与文化',text:'对陌生语言和文化总是忍不住好奇。西班牙语、韩语都在我想认真探索的清单上，先从听懂一句新的话开始。',note:'愿望清单'},
    {id:'travel',label:'下一个地方去哪儿',en:'Travel',caption:'旅行与观察',text:'喜欢去没去过的地方，也喜欢做攻略时那种“原来还有这里”的惊喜。地图上每多去一个点，就多一段自己的故事。',note:'持续探索'},
    {id:'aesthetics',label:'审美这事挺较真',en:'Aesthetics',caption:'设计、材质与日常小发现',text:'看到喜欢的设计、配色、材质或首饰，很容易一路研究下去。也许没什么宏大用途，但好东西就是值得多看两眼。',note:'日常兴趣'},
    {id:'sidequests',label:'这也想学一下',en:'Side Quests',caption:'好奇心待解锁',text:'想学的东西还有很多：新技能、新运动，甚至开船和飞行。先把它们留在愿望清单里，等时机合适再逐个解锁。',note:'未来探索'}
  ];
  portfolio.en.curiosities=[
    {id:'movement',label:'Move, then think',en:'Movement',caption:'Fitness and badminton',text:'I like keeping moving—sometimes with weights, sometimes chasing a shuttlecock. Playing badly once in a while just gives me a reason to go back.',note:'Currently doing'},
    {id:'languages',label:'More languages, please',en:'Languages',caption:'Language and culture',text:'Different languages keep reminding me how many ways there are to see the same world. Spanish and Korean are on my list to explore more seriously.',note:'On the wishlist'},
    {id:'travel',label:'Where to next?',en:'Travel',caption:'Travel and observation',text:'I love the moment a place on a map becomes a place I actually know. Researching a trip is almost as fun as being surprised when I get there.',note:'Ongoing'},
    {id:'aesthetics',label:'Obsessed with details',en:'Aesthetics',caption:'Design, materials and everyday discoveries',text:'A beautiful detail—a color, an object, an unexpected material—can send me down a very enjoyable research rabbit hole.',note:'Everyday curiosity'},
    {id:'sidequests',label:'One more side quest',en:'Side Quests',caption:'Future skills',text:'The wishlist is long: new skills, new sports, maybe sailing or flying someday. No rush; the fun is knowing there is more to learn.',note:'Future exploration'}
  ];

  // Content QA belongs to the AI & Agent constellation, never to Enterprise.
  for(const lang of ['zh','en']){const p=portfolio[lang].projects.find(x=>x.id==='content-qa');if(p)p.group='ai';}
})();

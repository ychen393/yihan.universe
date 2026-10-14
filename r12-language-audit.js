/* R12 · Full-site language audit.
   One final copy layer for all public-facing bilingual content. */
(function(){
'use strict';
const ZP={"agentlab":{"hook":"Agent 失败之后，怎么知道问题到底出在哪？","intro":"我做的不只是一次测试，而是一套从失败定位、有限修改到回归验证的完整流程。","problem":"Agent 没通过任务时，原因可能来自模型、工具选择、流程限制或配置。只有把执行记录和失败模式拆开看，才知道下一步该改哪里。","method":"先运行固定测试并独立判断结果，再根据失败记录定位原因；只调整可以明确验证的 Prompt 或流程配置，最后用同一组测试和额外挑战做回归。","result":"固定回归从 5/7 提升到 7/7；受控完整验证从 15/16 提升到 16/16。","role":"独立完成问题定义、评测流程设计、实现和测试；开发过程中使用 AI 编程工具辅助。","limit":"已经完成确定性测试和受控模拟验证；下一步准备把同样的方法用到更多 Agent 类型和真实模型上。"},"benchmark":{"hook":"哪个模型更好，要看它具体拿来做什么。","intro":"我把真实业务任务拆成可测试的能力，再比较不同模型在质量、速度和成本上的表现。","problem":"同一个模型在 Brief 理解、分类、长文本和结构化输出等任务上的表现可能差很多，所以单一总榜很难直接支持业务选型。","method":"建立能力目录和测试集，定义输入、参考输出、评分规则和严重错误，再按具体任务比较模型表现、响应时间和调用成本。","result":"74 项二级能力和 148 套测试集已经建完并投入实际测试，模型实验和阶段报告按能力持续更新。","role":"在 BAYESTONE 负责评测结构设计、测试集建设与质检，并参与模型实验和阶段结果整理。","limit":"测试集建设已经完成；模型实验和推荐结论会随着新一轮测试持续更新。"},"requirement":{"hook":"需求先说清楚，后面的执行才不会越走越偏。","intro":"把一句模糊需求整理成可以澄清、确认、执行和验收的计划。","problem":"需求模糊、版本频繁变化时，业务方和执行方很容易各自理解成不同的东西，后续也很难追溯到底改了什么。","method":"把澄清问题、范围确认、版本差异、执行计划和验收放进同一条流程，并明确区分 AI 建议和用户确认。","result":"完成可运行 MVP，覆盖需求录入、对齐、计划、变更和验收五个主要页面。","role":"独立完成产品构思、流程设计、原型开发和验证，使用 AI 编程工具辅助开发。","limit":"目前先把需求澄清、版本追踪和人工确认这条流程跑通；后面再继续加数据持久化、账号和多人协作。"},"task-summary":{"hook":"信息可以散落在不同工具里，任务不能跟着一起散掉。","intro":"把邮件、会议和 Tracker 里的更新整理成清晰的任务、负责人、截止时间和阻塞项。","problem":"Outlook、Teams、SharePoint、Excel 和 Jira 里都有任务信息，但成员很难快速确认现在该做什么、谁负责、哪里卡住。","method":"先统一任务字段和来源，再生成统一格式的任务摘要，同时保留原始消息或文档引用，方便回到上下文核对。","result":"实习期间团队实际使用这套工作流来整理日常任务、状态、风险和依赖。","role":"在 Accenture 提出需求、设计流程、检查输出并迭代逻辑；开发使用 GitHub Copilot 辅助。","limit":"这一版先解决三件事：把多来源信息整理成任务、标清状态，并保留来源。"},"dashboard":{"hook":"测试进度和缺陷状态，最好一眼就能看明白。","intro":"把分散在不同记录里的测试进度、缺陷、风险和阻塞整理成一个更适合团队沟通的状态视图。","problem":"测试和缺陷信息分散在多个记录里，手工汇总既重复，也不方便快速判断当前项目状态。","method":"先定义数据汇总规则和团队真正需要看的状态，再设计 Dashboard，并持续对照原始记录检查结果。","result":"工具在实习结束前完成并交接给项目团队，用于集中查看测试进度、缺陷、风险和阻塞。","role":"主动识别需求，参与流程设计、实现和结果检查；开发过程中使用 AI 辅助。","limit":"本案例记录我从需求识别、设计、实现到交接的完整过程。"},"training":{"hook":"把测试资料整理成同事真正能拿去培训的内容。","intro":"把测试用例、SOP、缺陷记录和 SAP 文档整理成操作指南、PPT 内容和讲师备注。","problem":"测试资料来源多、格式杂，直接拿来培训并不好用，需要重新整理步骤、重点和注意事项。","method":"先确定输入资料、培训对象和输出格式，再生成初稿、人工检查并持续调整内容结构。","result":"团队实际使用过生成的培训操作手册、PPT 内容和讲稿来准备 UAT 培训。","role":"提出工具想法并响应培训需求，参与功能设计、部分代码修改、测试和结果检查。","limit":"这一版主要生成操作步骤、PPT 章节和讲师备注，最后由人工检查内容。"},"content-qa":{"hook":"文案不只要顺，还要符合 Brief、事实和品牌要求。","intro":"把 Brief 约束、品牌事实和风险表达拆成可检查项，再给出问题位置和修改建议。","problem":"营销内容既要符合客户要求，也要保证事实准确、表达合适；如果只靠人工逐条检查，很容易遗漏。","method":"按 Brief 符合度、事实准确性和风险表达等维度检查内容，标出具体问题，并给出可继续修改的建议。","result":"已经完成可展示原型，可以定位具体问题并给出修改建议，最终保留人工复核。","role":"负责场景定义、检查规则、交互评审和功能迭代，开发过程中使用 AI 辅助。","limit":"这一版先把问题定位、修改建议和人工复核这三个环节做完整。"},"airbnb":{"hook":"一套房源为什么会卖到这个价格？","intro":"基于 4,022 条布达佩斯 Airbnb 房源数据，分析房型、容量、评分、位置和周末等因素与房价的关系。","problem":"不同房源之间的价格差异，哪些能用可观察的房源特征解释？","method":"合并并清洗数据，对价格取对数，再使用多元回归、AIC、GVIF 和残差诊断分析结果。","result":"调整 R² 约 0.33；私人房间价格估计约低 30%，周末房源约高 6%。","role":"四人统计分析小组项目，页面重点展示共同完成的统计方法和结果。","limit":"这是观察性数据分析，因此结果按统计关联来解释；模型对高价房源存在一定低估。"},"sp500":{"hook":"最近几天的市场表现，真的能解释明天吗？","intro":"用 S&P 500 和短期国库券数据检验近期收益、均值和波动率对下一交易日超额收益的解释力。","problem":"如果只使用当天及之前的信息，近期市场状态能不能稳定解释下一交易日的超额收益？","method":"对齐 Yahoo Finance 与 FRED 数据，构建滞后收益、五日均值和五日波动率，再比较不同回归模型和稳健性。","result":"共 1,053 个完整交易日观测；表现最好的模型解释力仍远低于 1%。","role":"STAT 306 小组研究，页面重点展示特征构建、回归分析和稳健性检查。","limit":"项目的结论是这些简单市场特征解释力很弱，因此没有把结果设计成交易策略。"},"minecraft":{"hook":"哪些玩家更可能继续参与？","intro":"基于 Minecraft 服务器的玩家行为数据，分析哪些特征和继续参与游戏更相关。","problem":"在线时长、历史经验等行为特征，能不能帮助识别更可能继续参与的玩家？","method":"完成数据清洗和标准化，使用 k-NN 分类，并通过 10 折交叉验证选择参数。","result":"完成 R / tidymodels 建模和最终分析报告。","role":"UBC 课程小组项目，页面重点展示数据处理、k-NN 建模和验证流程。","limit":"作品集中展示汇总分析和建模流程，不展示玩家级别的受限数据。"},"deloitte":{"hook":"主题乐园的门票，一定只能有一个固定价格吗？","intro":"围绕客流预测、动态定价和游客体验，设计一套主题乐园票务策略方案。","problem":"固定票价难以应对不同时段的客流变化，也不容易同时兼顾收益和游客体验。","method":"围绕需求预测、动态定价、票务套餐和运营驾驶舱设计完整商业方案，并制作展示 PPT。","result":"完成并提交竞赛方案，交付内容包括需求预测、动态定价、票务套餐和运营驾驶舱。","role":"独立完成问题分析、方案结构、PPT 逻辑和展示设计。","limit":"本案例展示竞赛阶段实际完成并提交的策略和产品方案。"},"character":{"hook":"如果结果不是一个分数，而是一个更有记忆点的角色呢？","intro":"把自我探索做成一个有角色、有视觉、有分享感的互动体验。","problem":"很多问卷给完分数就结束，用户很难从结果里获得具体反馈，也缺少继续探索的动力。","method":"设计题目、计分规则、八种角色、四轴成长展示，以及结果页和分享体验。","result":"双语互动原型已经具备主要测评、结果展示和分享功能。","role":"负责产品概念、文案、交互评审和视觉方向，并使用 AI 辅助开发。","limit":"Character Genesis 定位为轻量的自我探索产品，角色和分数用于互动叙事。"},"liferpg":{"hook":"把很远的目标，拆成今天也能推进一点的任务。","intro":"用任务、技能和进度反馈，把学习、工作和兴趣变成可以持续追踪的个人成长系统。","problem":"长期目标跨度大、反馈慢，很容易只看到“还没完成”，看不到每天其实已经推进了多少。","method":"用 React / Vite 组织任务、技能和进度，并通过 localStorage 保存当前浏览器的数据。","result":"已经有可运行的 local-first 版本，可以记录任务和技能进度。","role":"负责个人产品规划、体验设计和内容结构，并使用 AI 辅助开发。","limit":"v0.1 采用 local-first 设计；账号和云端同步可以在后续版本继续扩展。"}};
const ZJ={"ubc":{"role":"统计学学习与跨学科项目","scope":"这里主要介绍我的学习方向，以及这些课程训练如何延伸到后面的数据和 AI 项目。","steps":["从 Business 转到 Science，把 Statistics 作为主要学习方向","持续学习统计推断、数据清洗、回归分析和编程","把商业问题意识带进之后的数据分析、AI 评测和产品项目","通过 Airbnb、S&P 500 和 Player Retention 等小组项目练习完整分析流程"],"facts":["逐步建立统计推断、回归分析和数据处理基础","开始更主动地检查结论背后的假设、数据和不确定性","完成 Airbnb、S&P 500 和 Player Retention 等课程项目","把商科中的用户和业务视角带进后来的统计与 AI 项目"],"take":"统计学没有改变我对商业问题的兴趣，而是让我多了一套更严谨的判断方法。"},"lengshuan":{"role":"内容运营与营销数据分析","scope":"我的工作主要包括短视频制作、投放/内容数据整理，以及基于数据做内容复盘。","steps":["使用剪映参与抖音短视频制作和发布","查看巨量千川、直播和内容表现数据","用 Excel 整理 GMV、点击率、互动和流量来源等指标","比较不同内容和发布时间的表现，并把观察结果整理成优化建议"],"facts":["实际参与短视频内容制作和运营执行","实际查看并整理投放与内容表现数据","把内容表现和发布时间放在一起做复盘","部分建议被团队用于后续内容调整"],"take":"这是我第一次把内容判断和数据反馈真正放进同一个工作流程里。"},"accenture":{"role":"SIT/UAT 测试、缺陷协作与流程改进","scope":"我主要负责测试执行、问题跟进、跨团队协调，也主动做了三项流程改进工具。","steps":["执行并修改测试脚本和预期结果，记录 PASS / FAIL / BLOCK","登记缺陷、跟进 Jira/Tracker 状态、参与复测，并和业务、开发、测试团队同步进展","整理项目状态、风险、依赖、会议记录和培训内容","主动设计三项流程辅助工具，并检查实际输出和使用反馈"],"facts":["参与真实 SAP SIT/UAT 项目流程","Task Summary Workflow 在实习期间被团队实际使用","Training Material Generator 生成的材料被团队用于 UAT 培训","SIT / Defect Dashboard 在离岗前完成并交接给项目团队"],"take":"这段经历让我开始把协作效率和信息断层也当成可以被设计和改善的问题。"},"bayestone":{"role":"LLM 评测、测试集建设与实验分析","scope":"我主要负责能力拆解、测试集建设、模型测试和阶段结果整理。","steps":["把实际工作里的任务拆成 74 项二级能力","建设通用和项目场景测试集，定义输入、参考输出、评分规则和严重错误","在多个模型与平台上按能力运行实验，复核长文本遗漏、依据误用和约束违背","整理阶段报告，比较质量、响应速度和调用成本，为模型推荐提供依据"],"facts":["74 项二级能力已经整理完成","148 套测试集已经建设并实际使用","测试覆盖国内外主流模型和多个平台","模型实验和阶段报告按能力持续更新"],"take":"模型评测真正有用的地方，不只是排出名次，而是解释哪个模型适合哪个任务。"}};
const EP={"agentlab":{"hook":"When an Agent fails, the real question is why.","intro":"I built a test-and-improvement loop that connects failure diagnosis, bounded changes, and regression validation.","problem":"A failed task can come from the model, tool routing, workflow limits, or configuration. Re-running the task alone does not explain the failure.","method":"Run fixed tests, evaluate outcomes independently, diagnose repeated failures, make only bounded changes that can be tested, then rerun the same cases plus new challenges.","result":"Fixed regression improved from 5/7 to 7/7; controlled full validation improved from 15/16 to 16/16.","role":"Independent project covering problem framing, evaluation design, implementation, and testing, with AI coding assistance.","limit":"The current stage includes deterministic and controlled mock-router validation; the next step is broader Agent and external-model testing."},"benchmark":{"hook":"There is no useful 'best model' without a specific task.","intro":"I break real business work into testable capabilities and compare models on quality, latency, and cost.","problem":"A model can perform very differently across brief understanding, classification, long context, and structured output, so one overall ranking is rarely enough for selection.","method":"Define capabilities and test suites, specify reference outputs and critical errors, then compare model behavior by task.","result":"74 secondary capabilities and 148 implemented test suites; model experiments and staged reports continue by capability.","role":"At BAYESTONE, I work on evaluation structure, test-set design and QA, model experiments, and staged analysis.","limit":"Test-suite construction is complete; model experiments and recommendations continue to evolve as new runs are added."},"requirement":{"hook":"Execution gets easier once the requirement is actually clear.","intro":"Turn an ambiguous brief into something people can clarify, confirm, execute, and review.","problem":"When requirements are vague and keep changing, business and delivery teams can easily end up working from different assumptions.","method":"Connect clarification questions, confirmed scope, version differences, execution planning, and acceptance in one workflow while separating AI suggestions from user confirmation.","result":"A runnable MVP covering intake, alignment, planning, change handling, and review.","role":"Independent product covering concept, workflow design, prototyping, and validation, with AI coding assistance.","limit":"The MVP currently focuses on the alignment loop; persistence, accounts, and team collaboration are natural next extensions."},"task-summary":{"hook":"Information can be scattered; actions should not be.","intro":"Turn updates from mail, meetings, spreadsheets, and trackers into clear tasks, owners, deadlines, and blockers.","problem":"Work items live across Outlook, Teams, SharePoint, Excel, and Jira, making it hard to see the current action, owner, or blocker quickly.","method":"Normalize task fields and sources, generate structured summaries, and keep references back to the original message, meeting, or tracker item.","result":"The team used the workflow during the internship to organize tasks, status, risks, and dependencies.","role":"At Accenture, I proposed the need, designed the workflow, reviewed outputs, and iterated the logic; GitHub Copilot supported development.","limit":"This version focuses on multi-source task structuring, status tracking, and source traceability."},"dashboard":{"hook":"Test progress and defect status should be readable at a glance.","intro":"Bring test progress, defects, risks, and blockers into one view for easier team coordination.","problem":"Status lived across multiple records, making manual consolidation repetitive and overall project state harder to read.","method":"Define aggregation rules and the status views the team actually needs, then build the dashboard and check it against source records.","result":"Completed and handed over before the end of the internship for project-status reporting.","role":"Identified the opportunity and contributed to workflow design, implementation, and output review, with AI-assisted development.","limit":"This case covers the work from identifying the reporting problem through design, implementation, review, and handoff."},"training":{"hook":"Turn testing material into training content people can actually use.","intro":"Organize test cases, SOPs, defects, and SAP documentation into guides, slide content, and trainer notes.","problem":"Testing knowledge was spread across different sources and formats, so it needed to be reorganized before it was useful for training.","method":"Define source material, audience, and output format; generate a draft, review it, and iterate the structure.","result":"Coworkers used generated operating guides, slide content, and speaker notes for UAT training preparation.","role":"Proposed the tool, responded to training needs, and contributed to feature design, code edits, testing, and output review.","limit":"The current version focuses on training-content generation with human review."},"content-qa":{"hook":"Good marketing copy still has to match the brief and the facts.","intro":"Turn brief constraints, brand facts, and risky wording into explicit checks, then show issues and revision suggestions.","problem":"Marketing content needs to be creative, accurate, and aligned with the brief; manual review can miss details across those dimensions.","method":"Check brief alignment, factual accuracy, and risky language, point to the exact issue, and keep final judgment in a human review loop.","result":"A working prototype can identify issues and suggest revisions while keeping human review in control.","role":"I defined the scenario, review dimensions, interaction patterns, and iteration direction, with AI-assisted development.","limit":"The current prototype focuses on issue identification, revision suggestions, and human review."},"airbnb":{"hook":"Why does one listing cost more than another?","intro":"Analyze how room type, capacity, ratings, location, and weekends relate to price across 4,022 Budapest Airbnb observations.","problem":"Which observable listing characteristics explain meaningful differences in price?","method":"Combine and clean the data, log-transform price, then use multiple regression, AIC selection, GVIF, and residual diagnostics.","result":"Adjusted R² ≈ 0.33; private rooms are associated with roughly 30% lower prices and weekend listings with roughly 6% higher prices.","role":"Four-person statistics group project; the case focuses on the shared analysis workflow and results.","limit":"Because the data are observational, the results are interpreted as statistical associations; higher-priced listings are also underpredicted."},"sp500":{"hook":"Can recent market behavior really explain tomorrow?","intro":"Test whether recent returns, rolling averages, and volatility explain next-day excess returns.","problem":"Using only information available by day t, do recent market features provide stable explanatory power for day t+1 excess return?","method":"Align Yahoo Finance and FRED data, construct lagged and rolling features, and compare regression variants and robustness.","result":"1,053 complete trading days; even the best model explains far less than 1% of the variance.","role":"STAT 306 group project focused on feature construction, regression analysis, and robustness checks.","limit":"The takeaway is weak explanatory power from these simple features, so the work is presented as statistical analysis rather than a trading strategy."},"minecraft":{"hook":"Which players are more likely to keep participating?","intro":"Use Minecraft server behavior to study which player features are associated with continued participation.","problem":"Can play time, prior experience, and related behavior help identify players who are more likely to return?","method":"Prepare and standardize the data, fit k-NN, and use 10-fold cross-validation to tune k.","result":"Completed the R / tidymodels analysis and final report.","role":"UBC course group project focused on data preparation, k-NN modeling, and validation.","limit":"The portfolio shows aggregate analysis and modeling workflow rather than restricted player-level records."},"deloitte":{"hook":"Does a theme-park ticket have to be one fixed price?","intro":"Design a ticketing strategy around demand forecasting, dynamic pricing, and guest experience.","problem":"Fixed pricing does not adapt well to changes in demand across time and makes it harder to balance revenue and guest experience.","method":"Build a proposal around demand forecasting, dynamic pricing, ticket bundles, pricing guardrails, and an operating cockpit.","result":"Completed and submitted the competition proposal and presentation deck.","role":"Independently developed the problem framing, strategy, presentation structure, and visual story.","limit":"This case presents the strategy and product proposal completed for the competition."},"character":{"hook":"What if the result felt like a character, not just a score?","intro":"Turn self-reflection into an interactive experience with archetypes, visuals, and shareable results.","problem":"Many quizzes end with a generic score, which makes it hard for people to see a memorable story or a useful next step.","method":"Design questions, scoring, eight archetypes, a four-axis growth view, and the result/share experience.","result":"A bilingual prototype with the main quiz, result, and share flows implemented.","role":"Product concept, writing, interaction review, and visual direction, with AI-assisted development.","limit":"Character Genesis is positioned as a lightweight self-reflection product; archetypes and scores are part of the experience design."},"liferpg":{"hook":"Make long-term goals feel like something you can move today.","intro":"Use quests, skills, and visible progress to track learning, work, and personal interests.","problem":"Long-term goals have slow feedback, so it is easy to focus on what is unfinished instead of the progress made each day.","method":"Build task, skill, and progress flows in React / Vite and persist state in the current browser with localStorage.","result":"A runnable local-first version for tracking quests and skill progress.","role":"Personal product planning, UX direction, and content structure, with AI-assisted development.","limit":"v0.1 uses a local-first design; accounts and cloud sync can be added in later versions."}};
const EJ={"ubc":{"role":"Statistics studies and interdisciplinary projects","scope":"This page focuses on my academic direction and how that training connects to later data and AI work.","steps":["Moved from Business to Science and focused my studies on Statistics","Built foundations in inference, data preparation, regression, and programming","Carried business context into later analytics, AI evaluation, and product work","Practiced end-to-end analysis through Airbnb, S&P 500, and Player Retention group projects"],"facts":["Built a stronger foundation in inference, regression, and data analysis","Became more deliberate about checking assumptions, data quality, and uncertainty","Completed course projects including Airbnb, S&P 500, and Player Retention","Carried user and business context from earlier studies into later statistics and AI work"],"take":"Statistics did not replace my interest in business problems; it gave me a more rigorous way to test them."},"lengshuan":{"role":"Content operations and marketing analytics","scope":"My work covered short-video production, performance-data organization, and content review based on the data.","steps":["Supported Douyin short-video production and publishing","Reviewed Qianchuan, livestream, and content-performance data","Organized GMV, CTR, engagement, and traffic-source metrics in Excel","Compared content and posting-time performance and summarized recommendations"],"facts":["Hands-on short-video and content-operations work","Direct use of campaign and content-performance data","Content and posting-time review based on observed performance","Some recommendations informed later team adjustments"],"take":"This was where creative work and quantitative feedback first became part of the same workflow for me."},"accenture":{"role":"SIT/UAT testing, defect coordination, and workflow improvement","scope":"My work centered on testing, issue follow-up, cross-team coordination, and three workflow-improvement tools.","steps":["Executed and edited test scripts and expected results; recorded PASS / FAIL / BLOCK","Logged defects, tracked Jira/Tracker status, retested issues, and synchronized with business/dev/test teams","Consolidated status, risks, dependencies, meeting notes, and training content","Designed three workflow-support tools and reviewed their outputs with real project use cases"],"facts":["Worked inside a real SAP SIT/UAT delivery process","The Task Summary Workflow was used by the team during the internship","Generated Training Material was used for UAT preparation","The SIT / Defect Dashboard was completed and handed over to the project team"],"take":"I began treating coordination cost and information gaps as product problems that could be improved."},"bayestone":{"role":"LLM evaluation, test-set design, and experiment analysis","scope":"My work covers capability breakdown, test-set construction, model experiments, and staged reporting.","steps":["Translate business workflows into 74 secondary capabilities","Build generic and project scenarios with inputs, references, rubrics, and critical errors","Run capability-level experiments across models/platforms and review failure patterns","Produce staged reports comparing quality, response time, and cost for model selection"],"facts":["74 secondary capabilities defined","148 test suites implemented and used","Evaluation spans leading domestic/global models and multiple platforms","Model experiments and staged reports continue by capability"],"take":"Useful evaluation is not only about ranking models; it explains which model fits which task."}};

const TAKE={
 zh:{
  agentlab:'这个项目让我把“Agent 失败”从一个结果，拆成可以定位、修改和重新验证的一连串问题。',
  benchmark:'做完这套评测后，我更确定模型选型应该从任务出发，而不是先问哪一个模型总分最高。',
  requirement:'我最在意的不是让 AI 替人做决定，而是让需求变化和人工确认变得清楚、可追溯。',
  "task-summary":'我发现真正有用的摘要不是更长，而是能让人马上知道下一步做什么、谁负责、哪里卡住。',
  dashboard:'做 Dashboard 时，我开始更关注“这个页面能不能帮助团队做判断”，而不是单纯把数字画出来。',
  training:'这个工具让我第一次系统地把复杂测试资料整理成别人能直接拿去学习和讲解的内容。',
  "content-qa":'我希望审核工具给出的不只是“哪里错了”，还要让使用者知道为什么，以及下一步怎么改。',
  airbnb:'这次分析让我更重视模型解释力本身：除了看哪些变量显著，也要看模型究竟解释了多少。',
  sp500:'这次项目让我接受一个同样有价值的结论：数据有时候就是不足以支持稳定预测。',
  minecraft:'这个项目让我意识到，真实数据分析里，数据处理、验证方式和隐私边界和模型本身一样重要。',
  deloitte:'这是我第一次把一个模型想法完整地转成业务方可以讨论的产品和策略方案。',
  character:'我想做的不是一份更花哨的问卷，而是一个让人愿意继续了解自己的互动体验。',
  liferpg:'我想把很远的目标变成每天都能看见一点进度的东西，让行动更容易持续。'
 },
 en:{
  agentlab:'This project taught me to treat Agent failure as a chain of diagnosable and testable decisions, not just a pass/fail result.',
  benchmark:'I came away convinced that model selection should start from the task, not from an overall leaderboard.',
  requirement:'The design choice I care about most is keeping AI suggestions separate from formal human confirmation.',
  "task-summary":'The most useful summary is not the longest one; it is the one that makes the next action, owner, and blocker obvious.',
  dashboard:'This project shifted my attention from “showing metrics” to designing a view that actually helps a team make decisions.',
  training:'This was my first attempt to systematically turn fragmented testing knowledge into material coworkers could immediately learn from and present.',
  "content-qa":'I want review tools to explain not just what is wrong, but why it matters and what the user can do next.',
  airbnb:'The project made me pay more attention to explanatory power itself—not just which coefficients happen to be significant.',
  sp500:'A useful result can also be finding that the data do not support a stable predictive story.',
  minecraft:'Working with behavioral data made data preparation, validation, and privacy feel just as important as the model score.',
  deloitte:'This was my first full exercise in turning a modeling idea into a product and strategy proposal a business team could discuss.',
  character:'I wanted to build something people would enjoy reflecting with, not just another quiz with a score at the end.',
  liferpg:'The idea is simple: make long-term goals feel more actionable by turning them into small, visible progress each day.'
 }
};

function applyProject(lang,map){
  const portfolio=window.PORTFOLIO?.[lang];
  const r5=window.YihanR5?.entries;
  if(!portfolio||!r5)return;
  for(const [id,c] of Object.entries(map)){
    const p=portfolio.projects.find(x=>x.id===id);
    if(p) Object.assign(p,{hook:c.hook,intro:c.intro,problem:c.problem,method:c.method,result:c.result,role:c.role,limit:c.limit});
    if(r5[id]?.[lang]){
      const d=r5[id][lang];
      d[5]=TAKE[lang]?.[id]||c.result;
      d[6]=c.limit;
    }
  }
}
function applyJourney(lang,map){
  const portfolio=window.PORTFOLIO?.[lang];
  const r7=window.YihanR7?.entries;
  if(!portfolio||!r7)return;
  for(const [id,c] of Object.entries(map)){
    const j=portfolio.journey.find(x=>x.key===id);
    if(j){
      j.take=c.take;
      if(c.steps)j.points=c.steps.slice(0,3);
    }
    if(r7[id]?.[lang]){
      Object.assign(r7[id][lang],{
        role:c.role,scope:c.scope,steps:c.steps,facts:c.facts,take:c.take,limit:c.scope
      });
    }
  }
}
applyProject('zh',ZP);applyJourney('zh',ZJ);
applyProject('en',EP);applyJourney('en',EJ);

const r5=window.YihanR5?.entries;
if(r5){
 const zhDetails={
  agentlab:[
   ['搭建可重复运行的 Commerce Agent 测试环境，并保留执行记录','独立判断测试结果，从重复失败中定位具体原因','只调整可以明确验证的 Prompt 或流程配置','用原测试集回归，并加入额外挑战检查有没有新问题'],
   ['CT6/CT7 因 workflow_step_limit 失败；max_steps 从 2 调到 3 后，结果由 5/7 提升到 7/7','自适应挑战 AC1–AC5 为 5/5；EX2 进一步暴露了工具选择问题','EX2 在确定性回退路由下返回 patch_unavailable，没有强行生成缺乏依据的修改','受控 mock-router 补充 negated-intent 规则后，完整验证由 15/16 提升到 16/16']
  ],
  benchmark:[
   ['先把真实业务任务拆成可测试的二级能力','为通用场景和项目场景设计输入、参考输出和评分规则','加入多约束、长文本、知识依据和容易失败的场景','按能力比较模型表现、错误类型、响应速度和调用成本'],
   ['74 项二级能力已经整理完成','148 套测试集已经建设并实际使用','测试覆盖国内外多个主流模型和平台','模型实验和阶段报告按能力持续更新']
  ],
  requirement:[
   ['把模糊需求整理成需要澄清的问题、范围和验收标准','明确区分 AI 建议和用户正式确认','生成执行计划，并通过版本差异追踪需求变化','当需求发生变化时，重新确认影响范围再进入后续执行'],
   ['完成工作台、新建需求、需求对齐、执行计划和任务验收五个主要界面','同时支持确定性 DEMO 和可选的结构化 LLM 模式','只有用户确认后的内容才进入后续执行','MVP 已经把需求澄清、版本追踪和人工确认这条流程跑通']
  ],
  "task-summary":[
   ['梳理邮件、会议、表格和 Tracker 里的分散任务信息','统一 task、owner、deadline、priority、status、blocker 等字段','生成每日/每周任务摘要，同时保留来源消息或文档引用','用真实工作内容检查遗漏和归属，再根据团队反馈调整逻辑'],
   ['输入覆盖 Outlook、Teams、SharePoint/Lists、Excel/CSV 和 Jira/Tracker','可以整理进行中、已完成、阻塞、风险和依赖事项','团队在实习期间实际使用过这套工作流','输出保留任务来源，方便回到原始邮件、会议或 Tracker 查看上下文']
  ],
  dashboard:[
   ['先找出 SIT 状态更新和缺陷跟踪中最重复的整理工作','设计多来源数据的汇总规则和团队真正需要看的状态','迭代进度、缺陷、风险和阻塞的呈现方式','在交接前检查汇总结果，并向团队说明使用方式'],
   ['完成测试进度和缺陷状态的自动汇总与展示','看板集中展示完成情况、缺陷、风险和阻塞','在实习结束前完成检查并交接给项目团队','页面设计围绕日常状态沟通和项目汇报展开']
  ],
  training:[
   ['汇总测试脚本、SOP、缺陷记录、SAP 文档和已有培训材料','根据培训主题和受众确定输出格式和详细程度','生成操作步骤、PPT 章节内容和讲师备注','参与修改代码、检查生成结果，并把工具分享给同事'],
   ['团队实际使用过生成的培训操作手册、PPT 内容和讲稿','输入包含测试用例、SOP、缺陷记录和 SAP 文档','输出重点是操作步骤、PPT 章节内容和讲师备注','生成内容经过人工检查后用于 UAT 培训准备']
  ],
  "content-qa":[
   ['定义 Brief 要求、品牌事实和风险表达等检查维度','把问题定位到具体文本，并给出修改建议','保留人工复核，不让系统直接替用户做最终判断','持续根据输出质量调整规则和交互'],
   ['已经有可展示的产品原型和审核规则','可以定位具体问题并给出修改建议','检查维度覆盖 Brief 要求、品牌事实和风险表达','最终判断保留人工复核']
  ],
  airbnb:[
   ['合并布达佩斯工作日和周末 Airbnb 数据，共 4,022 条观测','清洗异常值、对房价做变换，并查看主要变量分布','使用对数房价多元回归，并结合 AIC 和 GVIF 做变量选择与共线性检查','检查残差、异方差和高价房源的系统性误差'],
   ['调整 R² 约为 0.33','私人房间的估计价格约低于整套房 30%','周末房源的估计价格约高于工作日 6%','模型对高价房源存在一定低估，因此结果按统计关联解释']
  ],
  sp500:[
   ['对齐 Yahoo Finance 的 S&P 500 数据与 FRED 的短期国库券利率','构建次日超额收益、五日平均收益和五日波动率','只使用当日及更早的信息构建特征，避免前视偏差','比较不同线性模型，并检查异常观测和不同窗口对结果的影响'],
   ['最终样本包含 1,053 个完整交易日','表现最好的回归模型解释力仍远低于 1%','五日平均收益出现轻微反转信号，但对建模选择较敏感','整体结果说明这些简单市场特征对次日超额收益的解释力很弱']
  ],
  minecraft:[
   ['使用研究型 Minecraft 服务器的玩家行为数据','删除无关标识并处理类别变量和缺失值','标准化特征，通过 10 折交叉验证选择 k 值','在测试集上结合准确率和混淆矩阵分析结果'],
   ['完成玩家行为数据清洗、特征处理和分类建模','使用 10 折交叉验证选择 k-NN 参数','在测试集上查看准确率和混淆矩阵','作品集中只展示汇总分析，不展示玩家级受限数据']
  ],
  deloitte:[
   ['分析固定票价与不同时段客流变化之间的问题','提出需求预测和分场景动态定价思路','设计票务套餐、价格护栏和运营驾驶舱','整理完整展示材料，并规划分阶段试点方案'],
   ['完成并提交主题乐园 AI 智能定价方案 PPT','方案覆盖需求预测、动态定价、票务套餐和运营驾驶舱','设计价格护栏和分阶段试点思路','最终交付是一套商业策略与产品方案']
  ],
  character:[
   ['设计题目、计分维度和确定性的角色匹配规则','为八种角色设计不同的视觉符号和结果叙事','加入四轴成长展示、结果揭示动画和分享卡','持续优化双语文案、移动端布局和重新测试体验'],
   ['原型已经能够生成八类不同角色结果','结果页包含可分享卡片和四轴成长展示','角色匹配使用确定性规则，相同输入会得到稳定结果','产品定位是轻量的自我探索和创意互动']
  ],
  liferpg:[
   ['把学习、职业、技能和兴趣转成可以记录的任务','设计任务、技能和成长进度之间的互动关系','用 localStorage 把数据保存在当前浏览器','完成本地运行、静态部署和主要页面流程'],
   ['已经有可运行的 local-first 应用','支持任务和技能进度管理','使用 localStorage 保存当前浏览器的数据','可以作为静态网站部署到 Vercel']
  ]
 };
 for(const [id,[steps,facts]] of Object.entries(zhDetails)){
   if(r5[id]?.zh){r5[id].zh[3]=steps;r5[id].zh[4]=facts;r5[id].zh[5]=TAKE.zh[id]||ZP[id].result;r5[id].zh[6]=ZP[id].limit;}
 }
}

if(window.YihanR10?.data){
 const z=window.YihanR10.data.zh,e=window.YihanR10.data.en;
 if(z){
  z.summary='UBC 统计学本科生，做过内容运营、企业数字化项目和大模型评测。我喜欢先把问题弄清楚，再把需求做成可以执行、测试和继续迭代的产品或流程。';
  z.projects=[
   {id:'agentlab',name:'AgentLab',desc:'给 AI Agent 做失败定位和回归验证：固定回归 5/7 → 7/7，受控完整验证 15/16 → 16/16。'},
   {id:'requirement',name:'Requirement Alignment Engine',desc:'把模糊需求整理成可以澄清、确认、执行和验收的流程。'},
   {id:'benchmark',name:'LLM Benchmark',desc:'围绕真实业务任务建设 74 项能力、148 套测试集，并比较模型质量、速度和成本。'},
   {id:'airbnb',name:'Airbnb Price Analysis',desc:'基于 4,022 条布达佩斯房源数据做多元回归和模型诊断。'}
  ];
 }
 if(e){
  e.summary='UBC Statistics undergraduate with experience across content operations, enterprise transformation, and LLM evaluation. I like turning ambiguous problems into workflows and products that can be built, tested, and improved.';
 }
}
})();
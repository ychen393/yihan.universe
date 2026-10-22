/* Preview only — identity-first homepage hero. Runs before app.js renders. */
(function(){
  'use strict';
  var p=window.PORTFOLIO;
  if(!p||!p.zh||!p.en) return;

  Object.assign(p.zh.site,{
    heroEyebrow:'UBC · STATISTICS · 2028 届本科',
    heroTitle:'陈怡含 Winnie',
    heroTitle2:'统计学本科生',
    heroDesc:'关注 AI 产品、Agent、大模型评测与数据分析。做过内容运营、企业数字化项目和 LLM Benchmark，也在持续把想法做成可以验证的产品原型。',
    explore:'查看经历',
    jump:'查看项目',
    scroll:'继续向下'
  });

  Object.assign(p.en.site,{
    heroEyebrow:'UBC · STATISTICS · CLASS OF 2028',
    heroTitle:'Yihan (Winnie) Chen',
    heroTitle2:'Statistics Undergraduate',
    heroDesc:'Focused on AI products, Agents, LLM evaluation, and data analysis, with experience across content operations, enterprise transformation, and model benchmarking—and a growing set of independent product experiments.',
    explore:'View experience',
    jump:'Explore projects',
    scroll:'Continue'
  });
})();
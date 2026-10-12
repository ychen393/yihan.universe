# Yihan's Universe V0.3 · 验收与未验证事项

日期：2026-10-12

## 已完成的自动化检查（非真实浏览器测试）
- V0.3 的 `app.js`、`data.js`、`v03-content.js` 和 `v03-markup.js` 通过 JS 语法编译检查。
- 使用浏览器环境的最小模拟，检查中英文首页、Life 页面及 13 个项目页：**30 条路由全部生成成功**。
- 中文与英文项目分组保持 **AI 3 / Enterprise 4 / Data 4 / Creative 2**，共 13 个项目。
- Journey 有四个可选择的经历节点和四个滚动触发节点；滚动触发节点已放回同一 sticky-runway DOM 容器，修复旧版滚动停留区不匹配的结构问题。
- Work 使用带稳定项目文本链接的 Constellation Tree，旧行星卡片网格已从主页移除。
- Curiosity 有五个节点与独立的 `/zh/life`、`/en/life` 路由。
- HTML div 标签数量平衡；脚本顺序为 data → V0.3 内容 → V0.3 布局 → app。
- 旧版 Hero 与项目详情模板仍在；V0.3 无意改写既有 Case Study 的项目结论。
- 未改动任何其他项目仓库，也没有从代码中编造新增外部 Demo。

## 必须在真实浏览器 / Vercel 预览进一步确认
- 1440px / 1024px / 390px：Journey 4 个节点逐段聚焦、无空白、无文字遮挡。
- Work 四分支星图 13 个项目的 hover、键盘 focus、点击，及中英文链接。
- About 五个节点的触控切换、移动端网格布局和 Life 详情页。
- 页面内跳转、浏览器回退、语言切换保留 slug。
- 移动端性能、减少动效偏好、对比度与触摸命中区域。
- Vercel Preview 直接访问所有静态路由；正式域名和真实设备。
- 公司素材版权和脱敏、可公开简历与 Contact / LinkedIn 的最终授权链接。

**结论：已通过静态和模拟路由烟雾测试，尚未通过真实浏览器 / Vercel / 真机最终验收。**

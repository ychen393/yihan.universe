# Yihan's Universe · Interactive Portfolio V0.3

A bilingual (中文 / English), cinematic but **usable** personal portfolio. The design follows a clean sequence:

**Opening → Journey → Work Constellation Tree → Curiosity Cluster → Case Studies**

This remains a lightweight, editable **HTML / CSS / JavaScript** application. It does **not** require a Next.js build, Three.js, an external AI API, or npm packages.

## Preview locally in VS Code (Windows / macOS / Linux)

Open this repository in VS Code and run:

```bash
python serve.py
```

On some Windows machines use `py serve.py` instead.

Open:
- 中文首页: http://127.0.0.1:4184/zh
- English home: http://127.0.0.1:4184/en
- 中文兴趣页: http://127.0.0.1:4184/zh/life
- English side quests: http://127.0.0.1:4184/en/life

Keep the preview terminal open. The local `serve.py` server supports direct refreshes on bilingual project routes. Do **not** double-click `index.html` to test navigation.

## What's new in V0.3

- **Journey is independent from Work**: UBC → 冷酸灵 → Accenture → BAYESTONE, each with distinct, more specific Chinese and English content.
- **Structural scroll fix**: the Journey sticky scene and its four scroll beats now share the same runway container.
- **Work = Constellation Tree**: 13 projects across four stable branches:
  - AI & Agent (3): AgentLab, LLM Benchmark, Content Review Copilot
  - Enterprise & Product (4): Requirement Alignment Engine, Task Summary Workflow, Training Material Generator, SIT / Defect Dashboard
  - Data & Strategy (4): Airbnb, S&P 500, Player Retention, Deloitte Digital Camp
  - Creative Experiments (2): Character Genesis, Life RPG
- **Beyond Work = Curiosity Cluster / 人生支线任务**: five clickable hobby nodes, natural bilingual text, and a separate `/zh/life` / `/en/life` page.
- Preserves the previous Hero art direction and existing 13 Case Study URLs. Project content keeps attribution, evidence and limitations.
- A small-screen fallback turns the radial curiosity interface into a practical two-column list.

## Pages

- `/zh` and `/en`: Hero, four-stage Journey, Work Constellation Tree, Curiosity Cluster
- `/zh/life` and `/en/life`: expandable life-interest stories
- `/:locale/work/:slug`: 13 distinct project Case Studies; valid slugs:
  `agentlab`, `benchmark`, `requirement`, `task-summary`, `dashboard`, `training`, `content-qa`, `airbnb`, `sp500`, `minecraft`, `deloitte`, `character`, `liferpg`.

## Vercel deployment

Import `ychen393/Yihan-Universe` with **Framework Preset: Other**; project root `.`; no build command; output directory `.`. The `vercel.json` rewrites serve `index.html` on all bilingual routes.

Vercel hosts static assets, but **browser motion/performance is not guaranteed by deployment**. The starfield, scroll, and orbital motion are regular CSS and JavaScript, not a verified GPU-driven Three.js implementation.

## QA status

Static / simulated-browser route smoke tests passed: 30 paths (2 home + 2 life + 26 case-study combinations). Confirm the actual 1440px / 1024px / 390px layouts and scroll, touch, keyboard interaction, and direct-route refresh in a **real browser** and Vercel preview before describing it as production verified.

See [V0.3 QA](docs/V03_QA.md) for the checklist and open points.

## Backups and historical source

Original development repository V0.2 commit was `fe046e7ac204790fb664be60eab2fd9ea7ec0544`, historically preserved at:
- [Backup branch](https://github.com/ychen393/yihan.universe/tree/backup/production-before-v03-2026-10-12)
- [Immutable original commit](https://github.com/ychen393/Yihan-Universe/tree/fe046e7ac204790fb664be60eab2fd9ea7ec0544)

For detailed recovery instructions and the similarly named untouched repository, see [Version Archive](docs/VERSION_ARCHIVE.md).

## Authenticity and publication boundaries

- Corporate concept art is illustrative, not necessarily a real office or official company logo. Confirm branding rights before publishing externally.
- The UBC campus photo references a public Wikimedia Commons image and has a local concept-art fallback; verify credit and availability.
- Do not invent deployed agent APIs, employment impacts, finished model test rounds, live demos or quantified efficiency.
- Contact email, résumé download and LinkedIn remain unlinked until verified; do not insert dummy destinations.
- Sensitive enterprise material must be anonymized. Some group-project contributions still need confirmation.

## Canonical repository since October 12, 2026

Deployments are connected to **[ychen393/yihan.universe](https://github.com/ychen393/yihan.universe)**. The similarly named `ychen393/Yihan-Universe` remains an archived development source and must not be used for future pushes.

Original production backup: [backup/production-before-v03-2026-10-12](https://github.com/ychen393/yihan.universe/tree/backup/production-before-v03-2026-10-12).

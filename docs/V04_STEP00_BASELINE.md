# Yihan's Universe — V0.4 Step 00 Baseline

**Scope:** Design Surgery V0.4, Step 00 (safety baseline) + Step 01 (typography/responsive layout only).

- Canonical repository: `ychen393/yihan.universe`
- Baseline branch: `main`
- Baseline commit (immutable SHA): `8865ae8bde391ff975de377f9114f39f44832b53`
- Working branch: `design/v0.4-step00-01-typography`
- Historical production backup: `backup/production-before-v03-2026-10-12` (retained as-is).
- Preserve existing application architecture: static HTML + CSS + JS, no build dependency.
- Existing primary entry: `index.html`, `styles.css`, `v03.css`, `data.js`, `v03-content.js`, `v03-markup.js`, `app.js`.
- Existing routes: `/zh`, `/en`, `/{locale}/life` and 13 project slugs per locale.
- Existing narrative separation: Journey = UBC/Lengshuan/Accenture/BAYESTONE; Work = project constellations.

## Locked areas during Step 01

Do **not** change `app.js`, `data.js`, `v03-content.js`, `v03-markup.js`, `styles.css`, `v03.css`, images, motion, Work layout, Journey image mapping or Curiosity interaction. Apply typography changes as a separate, reversible stylesheet included after V0.3.

## Baseline QA and known limitations

- Prior documented V0.3 automated checks: 30 simulated bilingual routes passed (see `docs/V03_QA.md`). These are **historical checks**, not a newly repeated browser run.
- No authenticated real-device or production Vercel browser inspection completed in this task.
- The source retains a shared UBC fallback for Journey photos; deliberately deferred to Step 02.
- Resume/contact links remain pending verified destinations; deferred to a later step.
- Regression gate for Step 01: main-branch SHA unchanged; only index link + V0.4 stylesheet + step documentation on feature branch; existing JS routes, logic, images and project content unchanged.
- Browser verification targets for future review: desktop 1440px, tablet 1024px, mobile 390px; both Chinese and English; Journey titles, Work group headings and 13 case-study routes.
- Deployment: **do not merge to main, do not issue a production deploy**.

## Rollback

For a clean rollback, remove the new `/v04-typography.css` link in `index.html` (or revert the Step 01 feature-branch commit). `main` and the original backup branch remain untouched.

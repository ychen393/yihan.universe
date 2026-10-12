# V0.4 Step 01 — Bilingual Typography & Responsive Layout QA

**Review status:** branch changes complete; **static/source-level checks PASS**; visual browser QA pending.

- Branch: `design/v0.4-step00-01-typography`
- Base commit: `8865ae8bde391ff975de377f9114f39f44832b53`
- No commits to `main`; no production deployment initiated by this task.

## Code changes

1. Added `v04-typography.css`, a 176-line, reversible CSS-only override.
2. Updated `index.html` by adding one stylesheet link **after** `styles.css` and `v03.css`.
3. Added `docs/V04_STEP00_BASELINE.md` and this QA record.

No intentional changes to `app.js`, `data.js`, `v03-content.js`, `v03-markup.js`, images or Vercel configuration.

## Specific adjustments

- Hero: balanced Chinese/English display sizes, line height and letter spacing.
- Journey: tighter title scale, mixed Chinese/English label handling, responsive column widths and safer small-screen wrapping (includes BAYESTONE / 贝事音准).
- Work: reduced heading dominance; readable cluster labels/project names; preserves original category and constellation interactions.
- Curiosity/About: moderated oversized headings and paragraph rhythm; **no** node or artwork changes.
- Case Studies: fixed percentage-grid plus gap overflow risk, tightened H1/H2 scale, article text measure and 390px spacing.
- Life: reduced oversized titles; preserved all interest sections.

## Completed checks (source-level)

- New stylesheet braces matched: PASS.
- Responsive breakpoints `1200px`, `780px`, `420px`: PRESENT.
- All seven key selector targets (Hero, Journey, Work, About, Case Hero, Life, Project label): PRESENT.
- Stylesheet order: `styles.css` → `v03.css` → `v04-typography.css`: PASS.
- Compared branch `index.html` to `main`: exact equality once the new link is removed.
- 13 known project route identifiers still appear in unchanged `data.js`.
- Compare branch against base confirms only docs, `index.html` and `v04-typography.css` changed.
- Branch / production separation: `main` SHA stayed unchanged when verified.

## Not yet verified; release blocking

- **No real 1440px / 1024px / 390px screenshots or bounding-box checks**, Chinese or English.
- No real-browser route/keyboard/interactivity regression test of this CSS change.
- No live Vercel Preview verification (Vercel detailed project access returned 403 in this session).
- Cannot certify visual non-overlap or final text-wrap behavior on the user's Windows device without an actual browser run.

## Browser acceptance checklist (manual or browser-capable CI)

- [ ] `/zh` and `/en` at 1440px: Hero, four Journey titles, Work header, About header fit without unwanted word fragmentation.
- [ ] 1024px: case page columns and Journey text remain readable and unoccluded.
- [ ] 390px: `BAYESTONE · 贝事音准`, long English project titles and `/zh/life`/ `/en/life` have no clipping or horizontal scrolling.
- [ ] All 26 bilingual project routes render and retain navigation.
- [ ] Journey click/scroll controls, Work filters, Curiosity nodes, language switching and browser Back still work.
- [ ] `prefers-reduced-motion` mode unaffected.
- [ ] Any Vercel preview remains separate from production.

## Review decision

Ready for **branch preview and user typography review**, but **NOT approved for merge or production**. Step 02 (Journey photos) remains untouched and must only begin after Step 01 is reviewed.

## Revert

Remove the single new `v04-typography.css` link from `index.html` to restore V0.3 styling; no prior CSS files were overwritten.

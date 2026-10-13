# Yihan's Universe · Typography & Layout Audit (2026-10-13)

Status: **source fixes prepared on review branch; browser screenshot QA pending**.

## Scope and boundaries

Canonical production repo: `ychen393/yihan.universe`, **not** historical `Yihan-Universe`.
No changes to Hero artwork, website IA, Journey content, Work case-study data, visual assets or bilingual text.
The single correction layer `typography-pass.css` is loaded **after** `styles.css` and `v03.css` to prevent the older rules from overriding improvements.

## Diagnosed inconsistencies

| Scope | Previous source | Corrective goal |
| --- | --- | --- |
| Beyond Work | `.about-body h2` could reach **76px**; lead could be **19px/1.9** | Limit headline to 55px, readable lead 17px/1.76, softer hierarchy |
| Life `/zh/life`, `/en/life` | `.life-page h1` max **108px**; `.life-item h2` 31px; paragraphs 17px/1.9 | Headline ≤58px; card headings 23–29px; paragraphs 16px/1.74 |
| Work constellation | Branch descriptions only **11px**; project names **14px** and `overflow-wrap:anywhere` | 12px labels, 14.5px project links, sensible wrapping and 2-column link grid |
| Journey | Stage title up to **67px**, quote to 24px, dense mixed reading rhythm | Stage title ≤51px; proportionate quote, story, bullets |
| 13 Case Studies | `.case-editorial h3` up to **35px/1.65** and `.case-bottom-grid h3` up to **42px/1.5** for paragraphs | Editorial 20–24px, results 21–26px, both readable sans text |
| Case hero geometry | `grid-template-columns:56% 44%` **plus 25px gap** exceeded 100% available width | `minmax(0,1.18fr) minmax(0,1fr)` with gap included |
| Responsive | Mobile overrides independently shrink sections with inconsistent ratios | Shared 1100/780/420px hierarchy, appropriate wrapping and tighter spacing |

## Pages to visually check at 1440px / 1024px / 390px

- `/zh`, `/en`: Hero (unchanged), Journey all 4 beats, Work 4 clusters, Beyond Work 5 curiosity nodes and focus panel, footer.
- `/zh/life`, `/en/life`: large Life heading, introductory paragraph, all 5 interest cards, labels, small-screen layout.
- Case Study `/zh/work/:slug` and `/en/work/:slug` for all **13** slugs:
  `agentlab`, `benchmark`, `requirement`, `task-summary`, `dashboard`, `training`, `content-qa`, `airbnb`, `sp500`, `minecraft`, `deloitte`, `character`, `liferpg`.

## Acceptance checklist

- No unexpected horizontal scrolling at 1440, 1024, and 390px; inspect long EN case titles and mixed Chinese/Latin names.
- Beyond Work section headline visually smaller than Hero; no collision with curiosity orbit; last-row curiosity nodes do not overlap the focus/description box.
- Life headline remains legible (max ~2 lines on a comfortable desktop; natural wrap on mobile); interest card titles subordinate to section headline; no clip or excessive whitespace.
- Work four constellation panels contain every clickable project name, arrow, and category label; keyboard focus remains visible.
- Case Study hero headline/graphic fit their grid, and long problem/method/result bodies look like reading text, not banner headings.
- Journey stage headers, quotes, lists remain visible at each scroll position, including touch/keyboard behavior.
- Switch `中文 ↔ EN` and verify same route/section; reduced-motion fallback remains usable.
- No changes to factual metrics, project attribution, company logos or non-public materials.

## Source-level checks already completed

- New stylesheet is loaded after both previous stylesheets.
- 15 key section/heading selectors appear in the new stylesheet.
- CSS curly-brace balance checked; breakpoints at 1100/780/420px included.

## Not yet verified

A true browser/Playwright screenshot sweep and Vercel Preview deployment are required before merging. Source-level checks **do not** establish visual PASS. Review branch intentionally leaves production unmodified.

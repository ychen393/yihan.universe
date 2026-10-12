# Yihan's Universe V0.4 — Step 01 Typography R2: Full-site audit

Date: 2026-10-12
Branch: `design/v0.4-step00-01-typography`
Production baseline: `8865ae8bde391ff975de377f9114f39f44832b53` (unchanged when reviewed).

## Problem / root cause

The initial Step 01 CSS changed some large heading sizes but omitted other typography patterns. Most critically, `app.js` renders full **Problem**, **Approach**, and **Results** paragraphs as `h3` elements while `styles.css` styles `.case-editorial h3` and `.case-bottom-grid h3` like 30–42px display headings. The resulting pages feel oversized and uneven even if the page-level H1 is improved.

Additional omissions: `life-page h1` reaches 108px before overrides; `evidence-grid strong` reaches 64px; `work-count strong` reaches 76px; Journey company headings use a Chinese serif when mixed English/CJK fonts and width constraints; original media queries re-expand typography at narrow sizes; label styles are inconsistent across sections.

## Scope audited and corrected in v04-typography.css (R2)

| Page or element | Previous issue | R2 decision |
|---|---|---|
| Header / nav / CTA / eyebrow | Inconsistent font, tracking and label rhythm | Reusable sans UI style and restrained labels |
| Hero | Large display text and inconsistent line-height | Preserve cinematic serif, lower the scale and balance line height |
| Journey introduction | Oversized long Chinese intro heading | 32–45px desktop, 29px small mobile; neutral sans |
| Journey 4 company nodes | Mixed CJK/English font, fragmentation of BAYESTONE | 30–43px desktop; stage-specific BAYESTONE sizing; 25–33px mobile |
| Journey narrative and bullets | Scattered paragraph sizing | 15px main text, 12–13px annotations, consistent leading |
| Work headings, counts and filters | Excessive 76px count and uneven category titles | Moderate count; fit type to signal level, not decorative size |
| Work 13 clickable project names | `overflow-wrap:anywhere` splits names arbitrarily | Prefer full words and natural wrapping, keep readable links |
| About / Curiosity | Big title competing with orbit and tiny details | 34–49px title and legible node descriptions |
| Life page and interest cards | 108px heading and variable card text | 36–57px desktop / 34px mobile, cards 23–29px |
| Case study opening | 45–77px hooks, sometimes full sentences | 33–52px heading and 15–18px explanatory text |
| Case study project H2 | Long bilingual project names | 30–44px with balanced wrapping |
| Case **Problem / Approach** | Full paragraphs in 23–35px serif H3 | **18–22px sans reading text**, 1.65 line-height |
| Case **Results** | Full results paragraph in 27–42px serif H3 | **18–23px sans reading text**, 1.62 line-height |
| Case experiments | 64px numeric values and large explanations | 31–46px metrics, smaller at mobile |
| Case CTA and footer | Oversized call to action | 25–36px CTA, quiet labels and links |
| Responsive | Rules at 1200/780/420 not comprehensive | Cover 1200, 780, 420, and 359px while respecting existing layout |

No new external fonts are required; browser/system fallback is used. Short display-only Hero type remains serif. Company and long technical case headings use neutral sans to keep mixed scripts stable. No arbitrary `word-break: break-all`.

## Completed source checks

- Branch remains isolated from `main`.
- `v04-typography.css` has balanced braces (0 delta) and parentheses (0 delta).
- All 17 audited heading/label/evidence selector groups exist in R2.
- Responsive rules exist for 1200, 780, 420, 359px.
- Existing 13 project IDs and source interaction logic are unchanged.
- Git diff still limited to `index.html`, `v04-typography.css` and these documentation files; no photos, Work/Curiosity DOM, app logic or project content edited.

## Not yet independently verified in browser

- **Still needs actual rendered visual QA at 1440px, 1024px, 390px** for Chinese and English home, four Journey steps and 13 case study pages per language.
- Headline bounding rectangles, word fragmentation, overlap with visual elements, and long scrolling heights require real-browser checks.
- Preview deployment was previously reported as 404 by the user. `READY` build status is insufficient. Do not assert the public preview URL works until an actual HTTP/browser request succeeds.
- Site-specific fonts may render differently on Windows/macOS/iOS/Android due to local CJK fallbacks. Check both modes in a real browser.
- Existing V0.3 visual mapping problems (UBC fallback image in Journey) are explicitly out of scope for this typography step.

## Release decision

**R2 typography update committed for branch review only.** Not merged, not declared visually approved, and no Step 02 work started. Production remains V0.3.

## Rollback

Remove the `v04-typography.css` link from `index.html` to restore prior CSS styling without touching core files.

# V0.2 QA evidence — 12 October 2026

## Checks completed

- `node --check app.js`, `node --check data.js` — passed.
- Automated Chromium UI evaluation using injected in-memory HTML/CSS/JS because this execution environment blocks navigation to localhost and `file://` URLs. **This is not a successful test of the user-facing Windows server or Vercel.**
- Confirmed 13 project cards and 13 individual Chinese case routes rendered with corresponding titles.
- Confirmed English homepage/navigation and English project data renders; English and Chinese content defined as separate objects.
- Confirmed 4 Journey nodes and three distinct factual bullet points per experience; click changes active scene in the in-memory test.
- Confirmed category filter works (2 creative projects).
- Confirmed AgentLab's second experimental view changes the controlled result to `15/16 → 16/16`.
- Confirmed Requirements demo toggles state to `USER_CONFIRMED`.
- Confirmed Airbnb comparison switches to the ≈6% weekend association.
- Confirmed no JavaScript page errors in tested cases (0 reported).
- Confirmed no horizontal overflow at 390px for Chinese/English homepage and five main case page patterns in in-memory browser tests.
- Preview screenshots in `previews/` are from those in-memory render checks, not from Vercel.

## Not yet completed

- On-device Windows click-through test with `py serve.py` and direct browser routes.
- Vercel deployment and preview test.
- Internet fetch and fallback behavior of the external UBC photo in China's network conditions.
- Cross-browser, low-power GPU and Core Web Vitals performance checks.
- WCAG accessibility/screen-reader review, semantic data visualizations and reduced-motion regression.
- Human bilingual copyedit and public release approval for company/project assets.

## Windows preview

Use `START_HERE_WINDOWS.bat` or `py serve.py`. Port: **4184** (V0.1 used 4173).

## Final handoff check (2026-10-12)

- Rechecked JavaScript syntax (`node --check` on both source files).
- Launched the actual local Python server on `127.0.0.1:4184` and received HTTP 200 for `/zh`, `/en`, two example deep case routes, main CSS and local UBC fallback artwork. This confirms local route/file serving in this container, **not** Windows-device/browser or Vercel deployment.
- Added a local background fallback to the UBC photo container so an external image still loading cannot leave a plain grey block. This fallback is explicitly concept art; authentic campus photography still depends on external image availability.

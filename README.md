# Yihan's Universe — Interactive Prototype V0.2

This is an independent, editable **HTML/CSS/JavaScript portfolio prototype**, not yet a Next.js production implementation. It contains no npm dependencies and does not modify any existing GitHub project.

## Windows / VS Code — start here

1. Extract the entire ZIP. Do not run the `.bat` file from inside the ZIP preview.
2. Open the extracted `yihans_universe_v0_2` folder in VS Code.
3. Double-click `START_HERE_WINDOWS.bat`, or open a terminal in this folder and run `py serve.py` (or `python serve.py`).
4. **Keep the terminal window open** and visit `http://127.0.0.1:4184/zh`.
5. To view English, click `EN` or visit `http://127.0.0.1:4184/en`.

**Port 4184 is deliberate.** The previous V0.1 preview used 4173; V0.2 uses a different port so you don't accidentally see the old site if its preview terminal is still running.

If a connection is refused, copy the terminal's exact error. Check that Python is installed, the ZIP is extracted, and the process displays `Preview ready:`. A browser can't reach your localhost unless the server is actively running on *your* computer.

## What's new in V0.2

- Brighter **Midnight Mist / Warm Graphite / Champagne** visual system and true star layers. Cinematic source imagery is retained, without crushing the scene behind opaque overlays.
- Readable bilingual hero with controlled typography and natural **Chinese vs English** content, not mixed UI labels.
- **Journey** contains four chronological nodes (UBC, Lengshuan, Accenture, BAYESTONE), a sticky camera-style scene, illuminated orbital path, changing visuals, 3 factual detail points per experience and direct node jumps.
- **UBC photo**: uses a public-domain Wikimedia Commons campus photo online, falling back to the provided stylized concept artwork when unavailable. Photo: *UBC Main Mall.JPG* by Mlm42, public-domain declaration, https://commons.wikimedia.org/wiki/File:UBC_Main_Mall.JPG. Other company scenes are stylized concept art, **not authentic office photos or logo files**.
- **Work** now contains **13 navigable projects**, grouped under AI & Agents, Enterprise & Product, Data & Strategy, and Creative. Their visuals, copy and case-study content are distinct rather than empty links.
- AgentLab, Requirement Alignment Engine and Airbnb retain richer interactive evidence demonstrations; 10 other projects have different illustrated motifs and factual case details.
- No invented live demos, resume URLs, recruiter-facing email addresses or production performance claims.

## Navigation / completeness check

- `/zh` `/en` — complete localised home page, Journey, Work and About
- `/zh/work/:slug` `/en/work/:slug` for all 13 slugs:
  `agentlab`, `benchmark`, `requirement`, `task-summary`, `dashboard`, `training`, `content-qa`, `airbnb`, `sp500`, `minecraft`, `deloitte`, `character`, `liferpg`.
- The visual stories in the experience timeline are *not* mixed into project-category navigation. Accenture and BAYESTONE projects appear under Work with their provenance explicitly labeled.

## Vercel

This folder is a static web app. Use a GitHub repo with this folder as its project root, framework preset **Other**, no build step, output directory `.`. `vercel.json` contains direct-route rewrites for `/zh`, `/en`, and their project routes.

A Vercel Preview build and real-device performance test **have not yet been executed**. Browser animations are CSS and JavaScript; no runtime Three.js/GPU camera has been implemented in this release. Converting the prototype into a structured Next.js application remains an engineering phase.

## Known production blockers

- Resume download, contact email and LinkedIn URL must be supplied/verified.
- Some group projects need individual contribution confirmation and links to authentic report figures.
- Corporate content must be reviewed for confidentiality and stripped of private information.
- Older stylized concept images contain illustrative branding; official company logos/images must replace them before public publishing.
- UBC photo is fetched over the network (offline fallback supplied). For a production release, prefer licensing-safe self-hosted files when downloaded, with credit.
- `RECRUITER_REVIEW.md` records an intentionally critical hiring-manager evaluation.
- `QA_REPORT.md` records what was actually exercised and what remains to be tested in real browsers.

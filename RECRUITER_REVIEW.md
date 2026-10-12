# Yihan's Universe V0.2 — Hiring manager review

**Lens:** A recruiter or AI Product/Data hiring manager unfamiliar with the candidate. The goal is to decide whether to open one case study, read a resume and invite an interview—not merely admire an animated website. This is a simulated editorial review, not feedback from an actual human employer.

## Summary verdict

V0.2 is materially more explorable than V0.1. The story has a distinct identity, education and internships are no longer confused with projects, and 13 work entries are accessible. **It is an advanced prototype, not an application-ready professional portfolio.** Visual polish alone cannot substitute for independently verifiable work and a frictionless contact/resume path.

## What makes me continue

1. The opening cinematic image earns attention **without making the headline unreadable**; direct-to-Work navigation lets busy reviewers skip scrolling.
2. The chronological Journey shows a coherent shift from Business → Statistics → marketing/data → enterprise workflow → LLM evaluation, and each step now has specific responsibilities.
3. AgentLab has an understandable failure → patch → regression case and explicitly separates controlled results from external-model performance.
4. The model benchmark has a credible test design scale (74 capabilities / 148 suites), with the important qualifier that all model tests are not yet complete.
5. Distinct projects have actual routeable pages; they are not dead-end ‘coming soon’ placeholders.

## What would make me leave / decline (ranked)

### P0 — Must fix before sending this to recruiters

**1. I cannot immediately open a real résumé or contact the candidate.** The header correctly avoids inventing a link, but a displayed “Résumé pending” is a very poor final-state signal. Add a verified public PDF and an email/LinkedIn link. Prefer a prominent working Resume action in top-right, a direct email link in About, and optionally a one-page CV with the same tone.

**2. Many project results need independent evidence.** An impressive visual and an anecdote don't answer: “Can I verify this?” Add actual screenshots or sanitized reproducible artifacts, demo capture, report excerpt and repository link where appropriate. Remove empty/unhelpful repository links. Keep confidentiality redactions explicit.

**3. The candidate's exact contribution is too far down in some cases.** Recruiters need to distinguish the candidate from an AI coding assistant and from teammates. Above the fold of each case, add one concrete “My Role” line with role, team size if confirmed, project duration and responsible components; don't imply that generated code was hand-written.

### P1 — High-priority design and usability issues

**4. Thirteen projects can dilute the signal.** The expanded Work galaxy is honest but busy. Default to 3–4 featured projects matched to the target roles, with a visible ‘View all 13’ action and filters. For AI Product/Evaluation, consider highlighting Benchmark, AgentLab, Requirement Engine and Enterprise Task Summary.

**5. The Journey still requires too much scrolling.** Four sticky stops are memorable but a time-constrained recruiter may not wait. Keep the direct Work link and make the Journey chapter navigation clear. Offer a reduced-motion/skip-cinematic path on mobile; make click-to-jump instantaneous in its visual feedback.

**6. Some case pages still share the same content framework.** Unique diagrams and visuals are better than the original identical cards, but truly art-directed case pages should show each project's real signature artifact: a trace for AgentLab, a heatmap for Benchmark, a version diff for Requirements, a regression figure for Airbnb. Add one meaningful interactive detail per case rather than cosmetic orbital motion.

**7. Mixing true pictures with AI-stylized company scenes risks a credibility mismatch.** The public-domain UBC image is factual, but other scenes are concept art. Replace corporate scenes with rights-cleared authentic screenshots/photos or keep them explicitly abstract. Avoid generated lookalike “official logos”.

### P2 — Refinement and production

**8. Professional positioning needs one sharper line.** The Chinese opening is expressive, but I still have to infer whether the candidate targets AI Product, AI Evaluation, or Data. A short non-marketing subtitle could specify “Statistics at UBC · AI Evaluation & Product Prototypes” with no grand claim.

**9. Need verified timelines and ownership.** UBC progression, exact job titles and project dates require a final resume-backed audit. Group projects need contributions explicitly attributed; business outcomes need evidence or a clear “not measured”.

**10. Performance, accessibility and multilingual QA aren't finished.** There is no production WebGL yet (which may be beneficial), but ~310 star DOM elements on Work plus animated layers require testing on mid-range mobile devices. Test screen readers, keyboard navigation, reduced motion and Core Web Vitals. Mobile and English need editorial review by a human, not just error-free rendering.

## Recommended final recruiter pathway

Open → identify candidate and intended role within 5 seconds → Work (one click) → select one flagship case → see role, problem, representative artifact and evidence in 20–40 seconds → open resume / GitHub → contact.

**Release gate:** don't market the site as application-ready until the P0 items are resolved. Keep public claims strictly within verified test evidence.

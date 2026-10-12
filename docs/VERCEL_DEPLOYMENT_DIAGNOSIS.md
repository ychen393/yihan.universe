# Root cause of missing Vercel update — 2026-10-12

Previously, V0.3 code was pushed to `ychen393/Yihan-Universe` while the Vercel project `yihan.universe` was connected to a DIFFERENT repository, `ychen393/yihan.universe`.

Resolution: the V0.3 codebase has been migrated into Vercel's linked repository, preserving a backup of the old production version in `backup/production-before-v03-2026-10-12`.

Verify the latest production deployment's GitHub SHA, branch, READY status and production alias in Vercel. Check `/zh`, `/en`, `/zh/life`, `/en/life`, `/zh/work/agentlab`.

Static route smoke tests do not replace real-browser layout and animation QA.

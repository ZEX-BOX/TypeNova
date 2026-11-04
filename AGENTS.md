# TypeNova agent instructions

## Product contract
TypeNova is an original, complete typing-learning and productivity product for web and desktop. Windows is the first desktop target. Build structured touch-typing education, practical typing workflows, adaptive practice, measurement, and local/offline desktop use.

## Non-negotiable rules
- Build original UI, copy, lesson content, code, icons, and visual identity. References are for publicly observable product research only.
- Never bypass authentication, paywalls, anti-bot systems, access controls, or security boundaries.
- Never copy proprietary source, private APIs, protected content, branding, or third-party assets.
- Label findings verified, inferred, or unknown. Attach source URLs and observation dates.
- Never fabricate WPM, accuracy, streaks, rankings, progress, certificates, or user activity.
- No dead buttons, fake charts, placeholder flows presented as complete, or untested feature claims.
- Keep the typing engine framework-independent and deterministic.
- Preserve keyboard navigation, visible focus, semantic controls, readable contrast and reduced-motion preferences.
- Validate untrusted input on the server. Never expose secrets to frontend bundles.
- Keep offline and cloud-sync states explicit; never silently discard local sessions.

## Architecture constraints
- Monorepo with separate web and desktop apps and reusable TypeScript packages.
- Web: Next.js + React + TypeScript.
- Desktop: Tauri 2, sharing UI/domain packages where practical; Windows first.
- Styling: Tailwind CSS + accessible shadcn/ui primitives, with TypeNova-owned design tokens.
- Data: PostgreSQL + Prisma; versioned API contracts.
- Auth: Auth.js or equivalent maintained solution after threat-model review.
- Tests: Vitest, Playwright and accessibility checks.
- Do not make AI a dependency of core scoring or basic practice.

## Workflow
1. Inspect the repository before editing; never overwrite user work.
2. Read architecture and research documents before implementation.
3. Use REA tools only when installed and authorized; otherwise mark REA steps pending.
4. Research only public pages and normal user-visible flows.
5. Make small, reviewable commits.
6. Run lint, typecheck, unit tests and builds before claiming validation.
7. Report exact commands, results, limitations and next steps.
8. Ask before adding paid services, credentials, secrets, trackers or irreversible migrations.

## Public references
- https://youtype.tech/en
- https://youtype.app/
- https://www.typequicker.com/

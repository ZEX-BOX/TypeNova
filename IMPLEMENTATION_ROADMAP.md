# TypeNova Implementation Roadmap

Product: TypeNova · Platforms: Web + Windows-first Desktop · Scope: Complete platform  
Status: Planning baseline · Updated: 4 November 2026

## Phase 0 — Repository and evidence baseline
- [x] Create private GitHub repository and initialize README.
- [x] Record product principles and proposed architecture.
- [x] Begin public reference research and feature comparison.
- [ ] Run REA setup locally and verify selected agent/tool access.
- [ ] Complete page-by-page public workflow inspection.
- [ ] Review architecture and resolve launch-critical open questions.

Exit criteria: research docs reviewed, assumptions labeled, architecture decisions and acceptance criteria approved.

## Phase 1 — Engineering foundation
- [ ] pnpm monorepo, shared TypeScript, lint and formatting configuration.
- [ ] Next.js web app and Tauri 2 desktop shell.
- [ ] Shared design tokens, navigation, responsive shell and accessibility baseline.
- [ ] CI for lint, typecheck, unit tests and builds.
- [ ] Environment validation and secure configuration.

Exit criteria: web and desktop shells launch, CI is green, no secrets committed.

## Phase 2 — Typing engine and tests
- [ ] Framework-independent event model and deterministic scorer.
- [ ] Live typing surface, text modes and duration/word-count tests.
- [ ] WPM, CPM, accuracy, mistakes, correction policy and consistency.
- [ ] Results screen and session history.
- [ ] Unicode, IME, pause, paste and focus edge-case tests.

Exit criteria: same fixture event stream yields identical metrics in browser and desktop; formulas documented and tested.

## Phase 3 — Learning and adaptive practice
- [ ] Curriculum and touch-typing lessons.
- [ ] Finger/keyboard guide with layout-aware mapping.
- [ ] Weak-key and n-gram analysis with sample thresholds.
- [ ] Targeted drills and progressive difficulty.
- [ ] Course progress and review scheduling.

Exit criteria: learner can complete lessons and receive drills justified by measured mistakes.

## Phase 4 — Content and specialist modes
- [ ] Audio typing/dictation with playback controls.
- [ ] Vocabulary notebooks and spaced review.
- [ ] Original typing games and daily challenges.
- [ ] Code typing with licensed/original snippets and custom text.
- [ ] Real-world simulations for email, chat and forms.

Exit criteria: each mode has a complete workflow, content rights recorded and automated tests.

## Phase 5 — Accounts, analytics and social features
- [ ] Authentication and profile settings.
- [ ] Cloud progress sync and guest-progress migration.
- [ ] Analytics dashboard, activity calendar and replay.
- [ ] Certificates with verifiable result IDs.
- [ ] Leaderboards with anti-abuse rules and privacy controls.

Exit criteria: ownership/security tests pass; deletion/export flows exist; rankings cannot be trivially spoofed.

## Phase 6 — Desktop offline and release
- [ ] Tauri capabilities, local storage and offline lesson cache.
- [ ] Durable sync queue, conflict handling and sync UI.
- [ ] Windows installer, signing and update strategy.
- [ ] Performance, accessibility, security and restore testing.
- [ ] Web deployment, monitoring and support docs.

Exit criteria: clean Windows install works; offline sessions survive restart; sync is idempotent; release checks pass.

A phase is not complete because a page exists. Require functional acceptance tests, accessibility review, security review where relevant and verification on target platforms. Never ship fabricated statistics or inert controls.

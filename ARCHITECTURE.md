# TypeNova Technical Architecture

**Status:** Proposed baseline · 4 November 2026

## Product shape
TypeNova is a responsive web app plus a Windows-first desktop app. Both share learning, practice, typing-engine, validation and UI packages. Desktop-specific functionality lives behind a narrow native adapter. Identical event streams must produce identical scoring results.

## Monorepo
- apps/web — Next.js App Router application
- apps/desktop — Tauri 2 shell and desktop adapters
- packages/ui — design tokens and reusable components
- packages/typing-engine — pure TypeScript event model, scoring and replay
- packages/learning — curriculum and lesson progression
- packages/practice — text selection and adaptive drills
- packages/analytics — aggregation and insight calculations
- packages/database — Prisma schema and repositories
- packages/shared — types, validation, localization and utilities
- services/api — versioned server-side application services
- research — reference analysis and product specifications
- docs — ADRs, operations and contributor guidance

Use pnpm workspaces and shared TypeScript/lint configuration. Start with a modular monolith, not premature microservices.

## Web and desktop
Web uses Next.js, React, TypeScript, Tailwind and accessible shadcn/ui primitives. Server Components serve data-heavy pages; client components handle typing, audio, charts and settings. Keystroke capture must not wait on network calls or expensive React renders.

Desktop uses Tauri 2 with a Rust host and shared web frontend. Windows is first. Keep Tauri capabilities narrow; do not grant broad filesystem or shell access. Offline mode supports downloaded lessons and local practice. Rankings and cloud sync require connectivity.

## Domain modules
Identity/profile; curriculum; typing sessions/scoring; practice/adaptive drills; audio/dictation; vocabulary/review; games; code typing; analytics/replay; certificates/leaderboards; desktop/offline sync; content administration.

## Typing engine
The engine is pure TypeScript with no React, DOM, network, database or Tauri dependency.

Normalize input into insert, delete, composition, paste, focus, blur and submit events with monotonic session-relative timestamps. Track input source and target position where available. Treat paste separately and exclude it from keystroke speed unless a test explicitly permits it. Handle IME, dead keys, Unicode graphemes, virtual keyboards, pauses, tab switches and clock anomalies.

Metrics:
- Gross WPM = committed printable characters / 5 / elapsed minutes.
- CPM = committed printable characters / elapsed minutes.
- Net WPM = gross WPM adjusted by a documented error penalty; policy remains an open decision.
- Accuracy = correct evaluated character attempts / all evaluated attempts × 100, with correction policy clearly disclosed.
- Show corrected and uncorrected mistakes separately.
- Consistency must be a documented dispersion measure, not an invented score.
- Per-key and n-gram analysis needs minimum sample thresholds and sample counts.
- Finger attribution is available only for supported keyboard layouts; unknown keys remain unattributed.

Do not silently mix corrected and uncorrected accuracy. Replay uses session events. Capture only while the TypeNova typing surface is active. Avoid retaining raw custom text by default.

## Backend and data
Use PostgreSQL and Prisma behind a modular monolith/API. Initial entities: User, Account, Device, TypingSession, SessionMetric, Course, CourseModule, Lesson, LessonAttempt, PracticeSet, Snippet, CodeSnippet, WeaknessProfile, ReviewItem, Achievement, Certificate, LeaderboardSnapshot, SyncCursor and PendingSyncOperation.

Initial API boundaries: profile, sessions, lessons, practice, analytics, sync and leaderboards under /api/v1. Validate all input server-side, enforce ownership, use idempotency keys and rate limits.

## Authentication and synchronization
Guest practice works locally. Account linking must not overwrite guest progress. Desktop writes local sessions to a durable queue with UUIDs and sequence numbers. Server writes are idempotent. Submitted sessions are immutable except explicit deletion/annotation. Lesson progress merges by completed lesson IDs and validated attempts. Profile preferences use versioned conflict handling. Show last successful sync and pending count; never silently discard local history.

## Security and quality
Threat-model account takeover, malicious snippets, XSS, CSRF, SQL injection, leaderboard abuse, desktop deep links, local data exposure and supply-chain risk. Use CSP, secure cookies, secret scanning, dependency audits, least-privilege Tauri capabilities, encrypted transport, backups and tested restores.

Use Vitest for scoring and event edge cases; integration tests for authorization, persistence and idempotency; Playwright for guest practice, sign-in, lesson completion, offline queue and sync; accessibility checks for keyboard-only and screen-reader workflows.

## Open decisions
See research/OPEN_QUESTIONS.md for languages, scoring policy, content rights, pricing, identity providers, analytics retention and launch scope.

# Development Workflow

## Local prerequisites
- Node.js version supported by selected Next.js and tooling versions.
- pnpm via Corepack.
- Rust stable and Tauri 2 Windows prerequisites for desktop builds.
- PostgreSQL for backend integration tests.
- VS Code with TypeScript, ESLint and Rust tooling.

Verify versions before setup; do not assume the developer machine matches this document.

## REA-assisted research
1. Clone this repository locally.
2. Run approved REA setup from the workspace directory, following current REA documentation.
3. Review every proposed agent/configuration change and approve only required tools and permissions.
4. Restart the selected coding agent and verify REA tools are available.
5. Ask the agent to inspect repository docs first.
6. Use public reference URLs only; never bypass auth, paywalls or security controls.
7. Record source URL, date, workflow, evidence and unknowns in research docs.

REA is an agent workflow/tooling layer. It does not itself implement TypeNova or grant access to protected third-party data.

## Commit discipline
- Prefer small commits scoped to one feature or document.
- Never commit .env files, API keys, cookies, browser profiles, private user data or generated secrets.
- Do not force-push or rewrite shared history without explicit approval.
- Run relevant checks before describing a feature as complete.

## Pull request checklist
- [ ] Scope and rationale documented
- [ ] No proprietary third-party code/assets copied
- [ ] Typecheck/lint/tests pass
- [ ] Accessibility reviewed
- [ ] Security and privacy impact considered
- [ ] UI changes include screenshots or reproducible verification
- [ ] Known limitations disclosed

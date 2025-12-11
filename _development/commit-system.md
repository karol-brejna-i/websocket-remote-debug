# Commit System Proposal

Goal
----
Create a lightweight, meaningful git commit system that improves readability, traceability and reviewability without enforcing tooling.

Summary
-------
- Adopt a short, consistent commit message format inspired by Conventional Commits.
- Require a short summary line, an optional scope, a body describing why and what changed, and an optional footer for issue references and breaking changes.
- Provide branch naming guidance and PR checklist. No automated hooks required — keep adoption lightweight.

Commit Message Format
---------------------
Format: `<type>(<scope>): <short summary>`

- Summary: Keep to ~50-72 characters, explain what changed.
- Scope: optional, the module or area affected (e.g., `ws`, `console`, `ui`).
- Body: One or two paragraphs describing *why* the change was made and any important implementation notes.
- Footer: Reference issues, e.g. `Closes #123`, and include `BREAKING CHANGE:` if applicable.

Allowed Types (short list)
--------------------------
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `style` — formatting or whitespace changes
- `refactor` — code change without feature/bug change
- `perf` — performance improvements
- `test` — adding or fixing tests
- `chore` — tooling, build, dependency updates

Branch Naming
-------------
- Pattern: `<type>/<short-description>` or `<type>/<issue>-short-description`.
  - Examples: `feature/add-ws-reconnect`, `fix/324-null-pointer-console`, `chore/update-deps`
- Keep branches single-purpose and small.

PR Rules (suggested)
--------------------
- One logical change per PR; small, reviewable.
- PR description: What, Why, How to test, Linked issues.
- Include `Closes #<issue>` in PR or commit footer when applicable.

Lightweight Adoption (no tooling)
--------------------------------
- Provide a commit template file (`.gitmessage`) developers can configure locally with:

  git config commit.template .gitmessage

- Encourage using the template and the format; reviewers and CI checks enforce practices initially by code review.
- Optionally add commitlint/husky later if the team wants automation.

Examples
--------
- `feat(ui): add dark mode toggle`

  Add a toggle to switch themes and persist preference in local storage. Update CSS variables and theme service.

  Closes #102

- `fix(ws): reconnect logic on close event`

  Reconnect when socket closes unexpectedly and add exponential backoff. Add unit tests for reconnect delay.

- `docs: add contributing guidelines for commits`

Rollout
-------
1. Add this document to `_development`.
2. Add `.gitmessage` and `CONTRIBUTING.md` to the repo root.
3. Ask team to set `git config commit.template .gitmessage` and follow examples for 1–2 weeks.
4. Optionally adopt commit hooks (`commitlint` + `husky`) later once the team is comfortable.

# Contributing

Thanks for contributing! This project follows a lightweight commit and branch convention to keep history useful.

Commit Messages
---------------
Use the format: `<type>(<scope>): <short summary>`

- `type`: feat, fix, docs, style, refactor, perf, test, chore
- `scope`: optional area/module affected (e.g., ws, console, ui)
- Keep the summary short (50–72 chars). Add a body explaining *why* and any implementation notes.
- Footer: reference issues (e.g., `Closes #123`) or `BREAKING CHANGE:` text.

Example commit:

feat(ui): add dark mode toggle

Add a toggle to switch themes and persist preference in local storage. Update CSS variables and theme service.

Closes #102

Branching
---------
- Branch name pattern: `<type>/<short-description>` or `<type>/<issue>-short-description`.
  - Examples: `feature/add-ws-reconnect`, `fix/324-null-pointer-console`
- Keep branches single-purpose and small.

Main & Develop
---------------
- `main`: production branch. Protected — only merge to `main` via a reviewed PR or automated release process. Commits on `main` should be tagged (for example `v1.2.0`) and represent deployable, tested releases.
- `develop`: integration branch for the next release. Feature branches are branched off `develop` and merged back into `develop` when ready. `develop` may be deployed to staging but is not guaranteed to be production-stable.

Recommended Workflow
--------------------
- Start a feature:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/short-description
```

- Finish a feature: push branch, open a PR targeting `develop`, request review, and merge once approved.

- Release flow (example):

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.2.0
# bump version, update changelog, test
# open PR: merge release/1.2.0 into main (and back into develop if needed)
git checkout main
git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin main --tags
git checkout develop
git merge --no-ff main
git push origin develop
```

- Hotfix flow:

```bash
git checkout -b hotfix/short-description main
# fix, test
# open PR and merge into main
git checkout develop
git pull origin develop
git merge --no-ff main
git push origin develop
```

Branch protection & PR rules
----------------------------
- Protect `main` and `develop`: require at least 1 reviewer, passing CI, and any status checks the project uses before merging.
- Require PRs to include: clear description (What/Why), testing steps, and linked issues (use `Closes #<n>` when relevant).

Links
-----
- See `_development/commit-system.md` for commit message format and branch naming examples.

Pull Request Checklist
----------------------
- Describe what changed and why.
- Include short testing instructions.
- Link related issue(s) with `Closes #<n>` when applicable.
- Ensure CI passes (if present) before requesting review.

Getting Started (local)
-----------------------
To use the commit template locally, run:

```bash
git config commit.template .gitmessage
```

Then use `git commit` as usual — your editor will open with the template.

If you prefer an interactive commit helper later, we recommend `commitizen` and `commitlint` but they are optional.

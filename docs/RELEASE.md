# Release Procedure

This document describes the release process for WSTerm.

## Overview

WSTerm uses semantic versioning (MAJOR.MINOR.PATCH) and git tags as the source of truth for version numbers. The version is automatically embedded into the build at compile time.

## Version Numbering

Follow [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR**: Incompatible API changes or major rewrites
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

### Version Examples

These are illustrative examples, not actual releases:

- `1.0.0` - Initial stable release
- `1.1.0` - Added new filtering feature
- `1.1.1` - Fixed connection bug
- `2.0.0` - Complete protocol rewrite

**Note**: The actual version is auto-generated in `src/version.ts` from git tags at build time.

## Pre-Release Checklist

Before creating any release, ensure:

- [ ] All planned features/fixes are merged to `main`
- [ ] No known critical bugs
- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] Type checking passes: `npm run typecheck`
- [ ] Manual testing completed on target devices
- [ ] Documentation updated (README, docs)
- [ ] CHANGELOG updated with release notes
- [ ] Working directory is clean (no uncommitted changes)

## Release Steps

### 1. Prepare the Release

```bash
# Ensure you're on the main branch
git checkout main

# Pull latest changes
git pull origin main

# Verify clean working directory
git status
# Should show: "nothing to commit, working tree clean"

# Run all checks
npm run typecheck
npm run lint
npm test
```

### 2. Update CHANGELOG

Edit `CHANGELOG.md` to document changes:

```markdown
## [1.2.0] - 2025-12-11

### Added
- New message filtering by regex
- Command history up to 100 entries

### Fixed
- Auto-scroll behavior on mobile
- WebSocket reconnection stability

### Changed
- Improved message rendering performance
```

Commit the changelog:

```bash
git add CHANGELOG.md
git commit -m "docs: update CHANGELOG for v1.2.0"
```

### 3. Create Git Tag

```bash
# Create annotated tag with release notes
git tag -a v1.2.0 -m "Release version 1.2.0

- Added regex filtering
- Improved performance
- Bug fixes"

# Verify tag was created
git tag -l v1.2.0
git show v1.2.0
```

### 4. Build Release

```bash
# Build the project (version will be auto-generated from git tag)
npm run build

# The build output will show:
# ✓ Version generated: 1.2.0-abc123f
```

### 5. Test the Build

```bash
# Preview the production build
npm run preview

# Test in browser at http://localhost:4173
# Verify:
# - Version shown in About dialog is correct
# - All features work as expected
# - No console errors
```

### 6. Push to GitHub

```bash
# Push commits
git push origin main

# Push tags
git push origin v1.2.0

# Or push all tags
git push origin --tags
```

### 7. Create GitHub Release

1. Go to https://github.com/karol-brejna-i/websocket-remote-debug/releases
2. Click "Draft a new release"
3. Select the tag you just created (v1.2.0)
4. Release title: `v1.2.0`
5. Description: Copy from CHANGELOG
6. Attach build artifacts (optional):
   - Create zip: `cd dist && zip -r ../wsterm-v1.2.0.zip . && cd ..`
   - Upload `wsterm-v1.2.0.zip`
7. Click "Publish release"

### 8. Deploy to GitHub Pages (if configured)

If you have GitHub Actions set up for deployment:

```bash
# Deployment happens automatically on tag push
# Check Actions tab: https://github.com/karol-brejna-i/websocket-remote-debug/actions
```

Or deploy manually:

```bash
# Using gh-pages package
npm install --save-dev gh-pages
npx gh-pages -d dist
```

## Post-Release

### Update Version for Development

After release, optionally bump to next development version in `package.json`:

```bash
# If released v1.2.0, update to v1.3.0-dev
npm version 1.3.0-dev --no-git-tag-version
git add package.json
git commit -m "chore: bump version to 1.3.0-dev"
git push origin main
```

### Announce Release

- Update project website (if applicable)
- Post to relevant forums/communities
- Tweet about new features
- Update Arduino library compatibility docs

## Hotfix Releases

For urgent bug fixes on a released version:

```bash
# Create hotfix branch from tag
git checkout -b hotfix/1.2.1 v1.2.0

# Make fix
# ... edit files ...
git add .
git commit -m "fix: critical WebSocket connection issue"

# Create hotfix tag
git tag -a v1.2.1 -m "Hotfix: WebSocket connection issue"

# Merge back to main
git checkout main
git merge --no-ff hotfix/1.2.1

# Push everything
git push origin main
git push origin v1.2.1

# Clean up
git branch -d hotfix/1.2.1
```

## Version Information in Builds

The build system automatically generates version information from git:

### Version String Format

| Scenario | Example | Description |
|----------|---------|-------------|
| Clean release | `1.2.0-abc123f` | Built from tagged commit |
| Development | `1.2.0+5.abc123f` | 5 commits after v1.2.0 tag |
| Modified | `1.2.0-abc123f-dirty` | Uncommitted changes |

### What Gets Embedded

The `src/version.ts` file is auto-generated with:

```typescript
{
  version: "1.2.0",           // Semantic version from tag
  commit: "abc123f",          // Short commit hash
  branch: "main",             // Git branch name
  isDirty: false,             // Uncommitted changes?
  buildDate: "2025-12-11...", // ISO timestamp
  commitsSinceTag: 5,         // Commits since last tag
  fullVersion: "1.2.0+5.abc123f" // Full version string
}
```

This information is:
- Displayed in About dialog
- Logged to console on startup
- Available for debugging

## Rollback Procedure

If a release has critical issues:

### 1. Immediate Response

```bash
# Delete the problematic tag locally and remotely
git tag -d v1.2.0
git push origin :refs/tags/v1.2.0

# Delete GitHub release
# Go to Releases → Edit → Delete release
```

### 2. Revert and Re-release

```bash
# Revert the problematic commits
git revert <commit-hash>

# Create new patch version
git tag -a v1.2.1 -m "Fix for v1.2.0 issues"
git push origin main --tags

# Follow normal release procedure for v1.2.1
```

## Automation (Future)

Consider adding these GitHub Actions workflows:

### Release Automation
- Auto-create GitHub Release from tag
- Auto-generate changelog from commits
- Auto-build and attach artifacts

### Version Validation
- Check that version in tag matches CHANGELOG
- Ensure working directory is clean
- Verify all tests pass

## Troubleshooting

### Version Script Fails

```bash
# If generate-version.js fails:
# 1. Check you're in a git repository
git status

# 2. Check git is installed
git --version

# 3. Check you have at least one tag
git tag -l

# If no tags exist, create initial tag:
git tag -a v0.1.0 -m "Initial version"
```

### Build Shows Wrong Version

```bash
# Version is generated at build time, ensure:
# 1. Tag exists
git describe --tags

# 2. Rebuild
rm -rf dist
npm run build
```

### Working Directory Dirty Warning

This means you have uncommitted changes. Either:

```bash
# Commit your changes
git add .
git commit -m "commit message"

# Or stash them
git stash

# Then rebuild
npm run build
```

## Related Documentation

- [CHANGELOG.md](../CHANGELOG.md) - Version history
- [REQUIREMENTS.md](docs/REQUIREMENTS.md) - Feature requirements
- [GITHUB_PAGES_DEPLOYMENT.md](docs/GITHUB_PAGES_DEPLOYMENT.md) - Deployment guide
- [STATIC_BUILD.md](docs/STATIC_BUILD.md) - Build instructions

---

**Last Updated**: December 11, 2025  
**Version**: 1.0

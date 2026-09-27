# Release Process

## When to Release

### Version Numbering (SemVer)

```
MAJOR.MINOR.PATCH

MAJOR — Breaking changes (0.x.x → 1.0.0)
MINOR — New features, no breaking changes
PATCH — Bug fixes, no new features
```

### Release Triggers

| Trigger | Version Type | Example |
|---------|-------------|---------|
| Bug fix | PATCH | 0.1.0 → 0.1.1 |
| New feature | MINOR | 0.1.0 → 0.2.0 |
| Breaking change | MAJOR | 0.9.0 → 1.0.0 |
| Security patch | PATCH | 0.1.0 → 0.1.1 |

### Release Readiness Checklist

Before releasing, verify:

- [ ] All tests pass
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] CHANGELOG.md updated
- [ ] Version number bumped in package.json
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No file exceeds 200 lines
- [ ] Urdu translations complete
- [ ] Manual testing done on dev environment

---

## How to Release

### Step 1: Prepare Release

```bash
# 1. Create release branch
git checkout -b release/v0.2.0

# 2. Update version in package.json
npm version 0.2.0

# 3. Update CHANGELOG.md
# Add new version entry with all changes

# 4. Commit
git add .
git commit -m "chore: release v0.2.0"
```

### Step 2: Test Release

```bash
# 1. Build locally
npm run build

# 2. Test production build
npm start

# 3. Verify on dev environment
npx vercel --prod
```

### Step 3: Merge and Deploy

```bash
# 1. Merge to main
git checkout main
git merge release/v0.2.0

# 2. Tag the release
git tag -a v0.2.0 -m "Release v0.2.0"

# 3. Push
git push origin main --tags

# 4. Deploy to production
npx vercel --prod
```

### Step 4: Post-Release

```bash
# 1. Delete release branch
git branch -d release/v0.2.0
git push origin --delete release/v0.2.0

# 2. Create GitHub Release
# Go to GitHub → Releases → Draft new release
# Add release notes from CHANGELOG.md
```

---

## Release Types

### Patch Release (Bug Fix)

```
Trigger: Bug found in production
Version: 0.1.0 → 0.1.1
Process: Fix → Test → Release
Time: Same day
```

### Minor Release (New Feature)

```
Trigger: Feature complete and tested
Version: 0.1.0 → 0.2.0
Process: Feature → Test → Release
Time: When feature is ready
```

### Major Release (Breaking Change)

```
Trigger: Breaking API/schema change
Version: 0.9.0 → 1.0.0
Process: Migrate → Test → Release
Time: When migration is ready
```

---

## Hotfix Release

For critical production bugs:

```bash
# 1. Create hotfix from main
git checkout main
git checkout -b hotfix/critical-bug

# 2. Fix the bug
# ... make changes ...

# 3. Test and commit
git add .
git commit -m "hotfix: fix critical bug"
git push origin hotfix/critical-bug

# 4. Create PR, merge, deploy
# 5. Delete hotfix branch
```

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 0.1.0 | 2026-09-27 | Initial project setup, docs, Figma connection, logo |
| 0.2.0 | 2026-09-27 | Foundation — language system, database, UI components, layout, routes, migrations |

### Color Scheme Change
- **v0.2.0:** Primary color changed from blue (#21408C) to **green (#1a5f35)** to match Figma design

---

## Release Plans

| Version | Description | Link |
|---------|-------------|------|
| 0.3.0 | MVP — User Selection & Home | [Release Plan](releases/v0.3.0.md) |

---

## Release Automation (Future)

- [ ] GitHub Actions for automated testing on PR
- [ ] Automated version bumping
- [ ] Automated changelog generation
- [ ] Automated deployment on tag push

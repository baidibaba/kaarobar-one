# Team Collaboration Guide

## Branching Strategy

```
main (production — protected)
  │
  ├── dev (staging — protected)
  │     │
  │     ├── feature/user-selection
  │     ├── feature/pin-input
  │     ├── feature/dashboard
  │     └── bugfix/login-error
  │
  └── release/v0.3.0 (temporary)
```

## Branch Naming

| Prefix | Use Case | Example |
|--------|----------|---------|
| `feature/` | New functionality | `feature/user-selection` |
| `bugfix/` | Bug fixes | `bugfix/pin-validation` |
| `hotfix/` | Urgent production fix | `hotfix/security-patch` |
| `docs/` | Documentation | `docs/api-update` |
| `refactor/` | Code refactoring | `refactor/database-layer` |
| `release/` | Release branch | `release/v0.3.0` |

## Dividing Work

### By Feature (Recommended)

Each person owns one feature branch:

```
Person A → feature/user-selection
Person B → feature/pin-input
Person C → feature/dashboard
```

### By Layer

```
Person A → UI components (src/components/ui/)
Person B → Database layer (src/db/)
Person C → Pages and routes (src/app/)
```

### By Task Size

| Task Size | Example | Approach |
|-----------|---------|----------|
| Small (< 1 day) | Fix typo, add translation | Direct branch → PR |
| Medium (1-3 days) | Add user form | Feature branch → PR |
| Large (3+ days) | Build dashboard | Sub-tasks → separate branches |

## Daily Workflow

### Start of Day

```bash
# 1. Switch to dev and get latest
git checkout dev
git pull origin dev

# 2. Create your feature branch
git checkout -b feature/your-feature

# 3. Work on your feature
# ... make changes ...

# 4. Commit regularly
git add .
git commit -m "feat: add user selection grid"
```

### End of Day

```bash
# 1. Push your branch
git push origin feature/your-feature

# 2. Create a PR on GitHub
# Go to https://github.com/baidibaba/kaarobar-one
# Click "Compare & pull request"
```

## Pull Request Process

### Creating a PR

1. **Title:** `feat: add user selection screen`
2. **Description:**
   ```markdown
   ## What
   - User selection grid with avatars
   - PIN input with numpad

   ## Testing
   - [x] Works on mobile
   - [x] Works on desktop
   - [x] Urdu translations added

   ## Screenshots
   [attach screenshots]
   ```

3. **Request review** from a team member
4. **Address feedback** — make changes, push to same branch
5. **Merge** when approved

### Reviewing a PR

```bash
# 1. Fetch the PR branch
git fetch origin
git checkout feature/your-feature

# 2. Test locally
npm run dev

# 3. Review code
# Check: conventions, 200-line limit, translations, etc.

# 4. Approve or request changes on GitHub
```

## Avoiding Conflicts

### Rule 1: Small Commits
```bash
# GOOD: One logical change per commit
git commit -m "feat: add user selection grid"
git commit -m "feat: add PIN input numpad"
git commit -m "fix: handle empty user list"

# BAD: Everything in one commit
git commit -m "updates"
```

### Rule 2: Pull Before Push
```bash
# Always pull before pushing
git pull origin dev
git push origin feature/your-feature
```

### Rule 3: Don't Touch Same Files
```
Person A: src/components/ui/Button.tsx
Person B: src/components/ui/Input.tsx  ← Different file, no conflict
```

### Rule 4: Communicate
```
"Hey team, I'm working on the dashboard page today.
Please avoid editing src/app/(dashboard)/dashboard/"
```

## Conflict Resolution

When two people edit the same file:

```bash
# 1. Pull latest
git pull origin dev

# 2. Git will show conflict markers
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# 3. Edit the file to keep both changes
# Remove the markers, keep the code you want

# 4. Mark as resolved
git add .
git commit -m "merge: resolve conflict in dashboard"
```

## Team Roles

| Role | Responsibility |
|------|---------------|
| **Tech Lead** | Reviews PRs, merges to main, manages releases |
| **Feature Owner** | Owns a feature branch, ensures it works |
| **Reviewer** | Reviews code, tests PRs, gives feedback |
| **QA** | Tests features, reports bugs |

## Recommended Team Size

| Team Size | Approach |
|-----------|----------|
| 1-2 people | Direct to `dev`, simple PRs |
| 3-5 people | Feature branches + PR review |
| 5+ people | Feature branches + CODEOWNERS + required reviews |

## Quick Reference Commands

```bash
# Start new feature
git checkout dev && git pull && git checkout -b feature/name

# Sync with dev
git checkout dev && git pull && git checkout feature/name && git merge dev

# Push and create PR
git push origin feature/name

# After PR is merged, clean up
git checkout dev && git pull && git branch -d feature/name
```

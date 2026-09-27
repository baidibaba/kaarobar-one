# Deployment Rules

## Overview

This document defines the deployment process, rules, and checklist for deploying Kaarobar One to Vercel.

---

## 1. Deployment Environments

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| Production | `main` | kaarobar-one.vercel.app | Live application |
| Preview | Any PR | `kaarobar-one-git-[branch].vercel.app` | PR previews |
| Development | `dev` | `kaarobar-one-dev.vercel.app` | Staging/QA |

---

## 2. Pre-Deployment Checklist

Before deploying, verify:

### Code Quality
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console.log statements
- [ ] No file exceeds 200 lines

### Documentation
- [ ] CHANGELOG.md updated
- [ ] Feature docs updated (if applicable)
- [ ] API docs updated (if applicable)
- [ ] README updated (if needed)

### Security
- [ ] No secrets in code (use environment variables)
- [ ] No `.env` files committed
- [ ] Dependencies audited (`npm audit`)
- [ ] Security headers configured (in `vercel.json`)

### Database
- [ ] Migrations tested locally
- [ ] Seed data works correctly
- [ ] No breaking schema changes (or migration plan documented)

---

## 3. Deployment Process

### Automatic Deployment (Vercel)

1. **Push to `main`** → Auto-deploys to production
2. **Open a PR** → Auto-deploys preview environment
3. **Merge PR** → Production deployment triggers

### Manual Deployment (CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

---

## 4. Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_NAME` | App name | `Kaarobar One` |
| `NEXT_PUBLIC_APP_VERSION` | App version | `0.1.0` |
| `NEXT_PUBLIC_DB_NAME` | Database name | `kaarobar-one` |
| `NEXT_PUBLIC_DB_VERSION` | Database version | `1` |

### Setting Variables

**Vercel Dashboard:**
1. Go to Project → Settings → Environment Variables
2. Add variable for each environment (Production, Preview, Development)
3. Redeploy to apply

**CLI:**
```bash
vercel env add NEXT_PUBLIC_APP_NAME production
vercel env add NEXT_PUBLIC_APP_NAME preview
vercel env add NEXT_PUBLIC_APP_NAME development
```

---

## 5. Deployment Rules

### Branch Protection

| Rule | Description |
|------|-------------|
| `main` is protected | No direct pushes, PR required |
| PR approval required | At least 1 reviewer |
| CI must pass | Build + lint must succeed |
| No force push | History must be preserved |

### Deployment Triggers

| Event | Action |
|-------|--------|
| Push to `main` | Deploy to production |
| PR opened/updated | Deploy preview |
| PR merged | Deploy to production |
| Tag `v*` | Deploy to production (manual approval) |

### Rollback Rules

| Scenario | Action |
|----------|--------|
| Critical bug in production | Revert last commit, push to `main` |
| Broken build | Fix forward (new commit), never force push |
| Database issue | Disable feature flag, fix data, re-enable |

---

## 6. Post-Deployment Verification

After deploying, verify:

### Smoke Tests
- [ ] Homepage loads
- [ ] Login/onboarding works
- [ ] Dashboard loads
- [ ] Database initializes
- [ ] No console errors

### Performance
- [ ] Lighthouse score > 90
- [ ] First Load JS < 100 kB
- [ ] No render-blocking resources
- [ ] Images optimized

### PWA
- [ ] Manifest loads
- [ ] Service worker registers
- [ ] App is installable
- [ ] Offline mode works

---

## 7. Monitoring & Alerts

### Vercel Analytics
- Enable in Vercel Dashboard → Analytics
- Monitor: Page views, Web Vitals, Errors

### Error Tracking
- Check Vercel Logs for runtime errors
- Set up alerts for 5xx errors

### Performance Monitoring
- Monitor Core Web Vitals (LCP, FID, CLS)
- Set up alerts for performance degradation

---

## 8. Deployment Commands Reference

```bash
# Local development
npm run dev

# Production build test
npm run build
npm start

# Deploy to Vercel (preview)
vercel

# Deploy to Vercel (production)
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback
```

---

## 9. Emergency Procedures

### Hotfix Deployment

```bash
# 1. Create hotfix branch
git checkout -b hotfix/critical-bug

# 2. Fix the bug
# ... make changes ...

# 3. Test locally
npm run build

# 4. Commit and push
git add .
git commit -m "hotfix: fix critical bug"
git push origin hotfix/critical-bug

# 5. Create PR, get approval, merge
# 6. Vercel auto-deploys to production
```

### Rollback Procedure

```bash
# 1. Identify last good deployment
vercel ls

# 2. Rollback
vercel rollback [deployment-id]

# 3. Verify rollback
# Check production URL

# 4. Fix the issue forward
# Create new commit with fix
```

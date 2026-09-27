# Environments

## Overview

Kaarobar One has three deployment environments, each with its own branch and purpose.

---

## Environment Details

### Production

| Property | Value |
|----------|-------|
| **Branch** | `main` |
| **URL** | https://kaarobar-one.vercel.app |
| **Purpose** | Live application for end users |
| **Deployment** | Auto-deploy on push to `main` |
| **Database** | `kaarobar-one` |

**Rules:**
- Only merged PRs deploy here
- Must pass all checks (lint, build, tests)
- No direct pushes to `main`

---

### Preview

| Property | Value |
|----------|-------|
| **Branch** | Any feature branch |
| **URL** | `kaarobar-one-git-[branch-name].vercel.app` |
| **Purpose** | PR previews and testing |
| **Deployment** | Auto-deploy on PR open/update |
| **Database** | `kaarobar-one-preview` |

**Rules:**
- Auto-generated for every PR
- Deleted after PR merge
- Safe to test experimental features

---

### Development

| Property | Value |
|----------|-------|
| **Branch** | `dev` |
| **URL** | `kaarobar-one-dev.vercel.app` |
| **Purpose** | Staging and QA testing |
| **Deployment** | Auto-deploy on push to `dev` |
| **Database** | `kaarobar-one-dev` |

**Rules:**
- Push here for staging tests
- Test new features before production
- Safe to break — no real users

---

## Environment Variables

| Variable | Production | Preview | Development |
|----------|-----------|---------|-------------|
| `NEXT_PUBLIC_APP_NAME` | `Kaarobar One` | `Kaarobar One` | `Kaarobar One` |
| `NEXT_PUBLIC_APP_VERSION` | `0.1.0` | `0.1.0` | `0.1.0` |
| `NEXT_PUBLIC_DB_NAME` | `kaarobar-one` | `kaarobar-one-preview` | `kaarobar-one-dev` |
| `NEXT_PUBLIC_DB_VERSION` | `1` | `1` | `1` |

---

## Branch Workflow

```
dev (staging)
  │
  ├── feature/user-auth ──→ PR → Preview deploy
  ├── feature/transactions ──→ PR → Preview deploy
  │
  └── PR merged → dev ──→ PR merged → main (production)
```

### Step-by-Step

1. **Create feature branch** from `dev`
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature
   ```

2. **Develop and test** locally

3. **Push and create PR** to `dev`
   ```bash
   git push origin feature/your-feature
   # Create PR: feature/your-feature → dev
   ```

4. **Preview deploy** — Vercel auto-deploys preview URL

5. **Merge to `dev`** — After review, merge PR

6. **Test on staging** — Verify at `kaarobar-one-dev.vercel.app`

7. **Create PR to `main`** — When ready for production

8. **Merge to `main`** — Auto-deploys to production

---

## Vercel Project Settings

**Project:** `ubaid-ullahs-projects-86f9a46b/kaarobar-one`

**Framework:** Next.js

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: Next.js default
- Install Command: `npm install`

**Git Integration:**
- Production Branch: `main`
- Auto-deploy: Enabled
- Preview Deployments: Enabled

---

## Managing Environments

### View Deployments

```bash
# List all deployments
npx vercel ls

# View logs
npx vercel logs

# Inspect deployment
npx vercel inspect [deployment-id]
```

### Redeploy

```bash
# Redeploy production
npx vercel redeploy kaarobar-one.vercel.app --prod
```

### Rollback

```bash
# Rollback to previous deployment
npx vercel rollback
```

---

## Security Headers

Configured in `vercel.json`:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check `npm run build` locally |
| Env vars not working | Verify in Vercel Dashboard → Settings |
| Preview not deploying | Check GitHub integration settings |
| Database errors | Verify `NEXT_PUBLIC_DB_NAME` is correct |
| Stale cache | Redeploy or clear Vercel cache |

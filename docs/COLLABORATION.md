# Collaboration Guide (2 developers)

How two people build Kaarobar One in parallel without blocking each other. The workflow basics (branch names, commits, PRs) are in [Development](DEVELOPMENT.md) and [Conventions](CONVENTIONS.md). This page covers who does what and where you'll collide.

## Setup (once)

| Step | Who | Status |
|------|-----|--------|
| Repo on GitHub: `baidibaba/kaarobar-one` | — | Done |
| Add second developer as collaborator (Settings → Collaborators) | Repo admin (`@baidibaba`) | **To do** |
| Protect `main`: PR required, 1 approval, CI must pass, no force push (see [Deployment Rules](DEPLOYMENT_RULES.md#branch-protection)) | Repo admin | **To do** |
| Add second developer to `.github/CODEOWNERS` for their areas | Either, via PR | **To do** |
| Vercel project access, for PR preview links | Repo admin | **To do** |

New developer:

```bash
git clone https://github.com/baidibaba/kaarobar-one.git
cd kaarobar-one
npm install
npm run dev
```

**Use Node 20.** CI runs Node 18 and 20; Next 14 predates newer versions. If `npm install` reports blocked install scripts, run `npm install-scripts approve esbuild unrs-resolver fsevents` (needed for `npm test`).

## Source of truth: Figma

[Figma file](https://www.figma.com/design/0WHBLp0ENpllqu9P84m1cD/Kaarobar-One)

- **Components** page: shared building blocks (nav, buttons, cards, numpad, icons)
- **Page 1**: every screen, in 22 numbered sections, each with a phone version (402px) and usually a desktop version (1366px)
- **Section 19 · Navigation Model**: where every screen lives in the nav. Routes are listed in [App Shell](features/app-shell.md#navigation-map)

Icons: download SVGs unmodified into `public/icons/` and use `<Icon name="…" />`. Colours: use Tailwind tokens (`primary-600`, `primary-soft`, `surface-warm`…), not hex values.

## Work split

Split by **Figma section** (whole features), not by layer. Each person owns the UI, repository and store for their sections.

| Order | Developer A: Sales path | Developer B: Stock & credit |
|-------|-------------------------|------------------------------|
| Shared first | App shell ([PR #1](https://github.com/baidibaba/kaarobar-one/pull/1)) | Review PR #1 |
| 1 | 01 · Onboarding & Access *(in progress)* | 04 · Stock & Pricing |
| 2 | 02 · Home & Daily Overview | 05 · Stock Counts & Adjustments |
| 3 | 03 · Sales & Transactions | 06 · Purchasing & Suppliers |
| 4 | 08 · Expenses | 07 · People & Credit (Khata) |

After that: 09–11 and 20 (reports, settings, empty states), then the desktop-only sections 12–18 and 21 (labels, cameras, profitability, accounts, staff, attendance, wages, assistant).

Deferred: the first-run tour screens (section 01) sit on top of Home, Stock and Credit, so they're built after 02, 04 and 07.

Track work as GitHub Issues (templates in `.github/`). One issue per Figma frame or small group of frames.

## Daily workflow

1. `git checkout main && git pull`
2. `git checkout -b feature/<figma-frame-name>`, for example `feature/stock-overview`
3. Keep PRs small, about a day of work
4. Before pushing: `git pull --rebase origin main`, `npm run lint`, `npm run build`
5. Open a PR using the template; the other person reviews on the Vercel preview and approves
6. Squash-merge

A branch can be stacked on an unmerged one when it truly depends on it (for example, `feature/onboarding` is based on `feature/app-shell`). Say so in the PR and merge in order.

## Where you'll collide

### Database migrations
The Dexie schema version is declared in **two places**: `src/db/schema.ts` and `src/db/migrations/001-initial.ts`. If both of you add `version(2)` at once, you'll corrupt each other's local data.

**Rule:** claim the next migration number in your issue *before* writing it, and have only one schema-changing PR open at a time.

### Shared components
`src/components/ui/`, `src/components/layout/`, `tailwind.config.ts`: make changes here in their own small PR and merge it first, rather than inside a feature PR.

### `package-lock.json`
Add dependencies in a dedicated PR. On a lockfile conflict, take `main`'s version and re-run `npm install`; don't hand-merge it.

### Formatting
Turn on Prettier format-on-save, so diffs don't fill up with whitespace changes.

### Secrets
`.env.example` has nothing sensitive; keep it that way. Real values go in Vercel environment variables.

## Known issues to pick up

| Issue | Where |
|-------|-------|
| PINs stored and compared as plain text; needs hashing + migration | `src/components/business/PinInput.tsx`, `users` table |
| No route guard: dashboard pages render nothing when logged out instead of redirecting | `src/components/layout/MainLayout.tsx` |
| `npm audit`: 9 vulnerabilities (2 critical), likely in `next` 14.2.x; bump to latest 14.2 patch, **not** `npm audit fix --force` | `package.json` |
| Seed users' names differ from Figma sample people | `src/db/seed.ts` (test data, low priority) |

## Status (2026-09-27)

| Work | Branch | State |
|------|--------|-------|
| App shell | `feature/app-shell` | PR #1 open, awaiting review |
| Onboarding & Access | `feature/onboarding` | Built, not yet pushed; merge after PR #1 |

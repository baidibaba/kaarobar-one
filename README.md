# Kaarobar One

**Kaarobar One** (کاروبار ون) is a business management PWA designed for small and medium enterprises. It provides an intuitive interface for managing daily business operations, tracking finances, and coordinating team activities — with full Urdu language support.

## Features

- **User Selection & Onboarding** — Role-based access with a streamlined onboarding flow
- **Business Dashboard** — Overview of key metrics, transactions, and activities
- **Team Management** — Track who is working today and manage team roles
- **Urdu-First Interface** — Full RTL support with Noto Nastaliq Urdu typography
- **Bilingual Support** — Seamless switching between English and Urdu
- **Offline-First** — Works without internet using IndexedDB
- **PWA** — Installable on mobile and desktop

## Tech Stack

- **Framework:** Next.js (React)
- **Database:** Dexie.js / IndexedDB (offline-first local storage)
- **PWA:** Progressive Web App (installable, offline support)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Fonts:** Inter (English), Noto Nastaliq Urdu (Urdu)

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A modern browser (Chrome/Firefox/Edge)

### Setup

```bash
# Clone the repository
git clone https://github.com/baidibaba/kaarobar-one.git
cd kaarobar-one

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## How to Work on This Project

### 1. Branching Strategy

We use a simple Git flow with `main` as the production branch.

```
main (production)
  │
  ├── feature/user-auth
  ├── feature/transaction-reports
  ├── bugfix/login-error
  └── hotfix/security-patch
```

#### Branch Naming

| Prefix | Use Case | Example |
|--------|----------|---------|
| `feature/` | New functionality | `feature/user-authentication` |
| `bugfix/` | Bug fixes | `bugfix/transaction-calculation` |
| `hotfix/` | Urgent production fixes | `hotfix/security-patch` |
| `docs/` | Documentation updates | `docs/api-examples` |
| `refactor/` | Code refactoring | `refactor/database-layer` |

### 2. Creating a Branch

```bash
# Make sure you're on main and it's up to date
git checkout main
git pull origin main

# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

### 3. Making Changes

```bash
# Check what files you've changed
git status

# Stage your changes
git add .

# Or stage specific files
git add src/components/Button.tsx

# Commit with a descriptive message
git commit -m "feat: add user authentication flow"
```

#### Commit Message Format

```
<type>: <description>

[optional body]
```

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

**Examples:**
```
feat: add transaction export to CSV
fix: resolve Urdu text alignment in RTL mode
docs: update API documentation
```

### 4. Pushing Your Branch

```bash
# Push your branch to remote
git push origin feature/your-feature-name
```

### 5. Creating a Pull Request (PR)

1. Go to the GitHub repository
2. Click **"Compare & pull request"**
3. Fill in the PR template:
   - **Title**: Brief description of changes
   - **Description**: What changed and why
   - **Screenshots**: If UI changes
   - **Testing**: How you tested the changes
4. Request a review from a team member
5. Address any feedback

### 6. Merging a PR

Once approved:

```bash
# Option 1: Merge on GitHub (recommended)
# Click "Merge pull request" on the GitHub PR page

# Option 2: Merge locally
git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main
```

After merging, delete the branch:

```bash
# Delete local branch
git branch -d feature/your-feature-name

# Delete remote branch
git push origin --delete feature/your-feature-name
```

### 7. Keeping Your Branch Updated

If `main` has new commits while you're working:

```bash
# While on your feature branch
git fetch origin
git rebase origin/main

# Or merge main into your branch
git merge origin/main
```

---

## Code Review Guidelines

### Before Submitting a PR

- [ ] Code follows [Conventions](docs/CONVENTIONS.md)
- [ ] No `console.log` statements left
- [ ] TypeScript types are correct
- [ ] No hardcoded values (use constants)
- [ ] Urdu translations added where needed
- [ ] RTL layout considered for Urdu text
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds

### Reviewing Someone Else's PR

- [ ] Understand the purpose of the change
- [ ] Check for bugs and edge cases
- [ ] Verify code follows conventions
- [ ] Test the changes locally if needed
- [ ] Provide constructive feedback

---

## Project Structure

```
kaarobar-one/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes (login, onboarding)
│   │   ├── (dashboard)/        # Dashboard routes
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── transactions/   # Transaction management
│   │   │   ├── inventory/       # Inventory management
│   │   │   ├── reports/        # Reports & analytics
│   │   │   └── settings/       # Settings
│   │   └── api/                # API routes
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Layout components
│   │   ├── forms/              # Form components
│   │   └── business/           # Business-specific components
│   ├── db/                     # Dexie/IndexedDB layer
│   │   ├── migrations/         # Database migrations
│   │   └── repositories/       # Data access layer
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities, constants, i18n
│   ├── stores/                 # State management
│   ├── types/                  # TypeScript types
│   └── styles/                 # Global styles
├── public/                     # Static assets
│   ├── icons/                  # App icons
│   └── fonts/                  # Custom fonts
├── docs/                       # Project documentation
├── tests/                      # Test files
└── .github/workflows/          # CI/CD pipelines
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/ARCHITECTURE.md) | System architecture and design decisions |
| [Development](docs/DEVELOPMENT.md) | Development setup and workflow |
| [Database](docs/DATABASE.md) | Database schema and migrations |
| [Conventions](docs/CONVENTIONS.md) | Coding conventions and standards |
| [Components](docs/COMPONENTS.md) | Component library documentation |
| [API](docs/API.md) | API endpoint documentation |
| [Deployment](docs/DEPLOYMENT.md) | Deployment guide |
| [Collaboration](docs/COLLABORATION.md) | Two-developer workflow, work split by Figma section |

---

## Design

The UI/UX design is maintained in Figma:
- [Kaarobar One — Figma Design](https://www.figma.com/design/0WHBLp0ENpllqu9P84m1cD/Chota-Munshi)

---

## License

Proprietary — All rights reserved.

# Development Plan — Kaarobar One

## Lean Methodology

**Build → Measure → Learn → Repeat**

Start with the smallest viable product, validate with real users, learn from feedback, then iterate. One feature at a time.

---

## Phase 0: Foundation

**Goal:** Project setup, design system, and core infrastructure.

| Task | Description | Status |
|------|-------------|--------|
| Project setup | Next.js, TypeScript, Tailwind, Dexie | Done |
| Database schema | Users, Transactions, Inventory, Settings | Done |
| Repository pattern | Data access layer | Done |
| Design tokens | Colors, typography, spacing | Done |
| Documentation | All docs and conventions | Done |
| CI/CD | Vercel deployment, environments | Done |
| Bilingual setup | i18n system, English + Urdu translations | Done |
| Language options | Both, English only, Urdu only | Done |

**Deliverable:** Deployed foundation with working database layer and bilingual support.

---

## Phase 1: MVP — User Selection & Home

**Goal:** Core app that lets users select who they are and see a basic dashboard.

### Features

| Feature | Description | Priority |
|---------|-------------|----------|
| User Selection Screen | Grid of users, tap to select | P0 |
| User PIN | Quick access with PIN (numpad) | P0 |
| Home Dashboard | Welcome message, today's summary | P0 |
| User Management | Add/edit/delete users | P0 |
| Database Seed | Default users for testing | P0 |
| Bilingual UI | 3 options: Both, English only, Urdu only | P0 |
| Bottom Navigation | Home, Sale, Stock, People, Ledger | P0 |
| Language Selector | First-launch language selection | P0 |

### User Flow

```
App Launch → Language Selection → User Selection → PIN → Home Dashboard
                                                      │
                                               Add New User
```

### Acceptance Criteria

- [ ] User sees language selection on first launch with 3 options: Both, English only, Urdu only
- [ ] User sees a grid of user avatars on launch
- [ ] User can select a user and enter PIN via numpad
- [ ] Home dashboard shows welcome message with user name
- [ ] Bottom navigation with 5 tabs (Home, Sale, Stock, People, Ledger)
- [ ] User can add a new user (name, role, avatar, PIN)
- [ ] User can edit or delete existing users
- [ ] All text displays based on language selection (Both / English only / Urdu only)
- [ ] Language preference persists across sessions
- [ ] All data persists in IndexedDB
- [ ] App works offline

### Technical Tasks

1. Create `LanguageSelector` component (3 options: Both, English only, Urdu only)
2. Create `UserSelection` component
3. Create `PinInput` component (with numpad)
4. Create `HomeDashboard` component
5. Create `BottomNav` component
6. Create `UserForm` component
7. Add seed data for default users
8. Implement user CRUD operations
9. Add Urdu translations for all UI text
10. Implement language toggle with persistence

---

## Phase 2: Sale (Transactions)

**Goal:** Record daily business transactions (sales, purchases, expenses).

### Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Transaction List | View all transactions | P0 |
| Add Transaction | Create new transaction | P0 |
| Transaction Types | Sale, Purchase, Expense | P0 |
| Amount Input | Numpad for quick amount entry | P0 |
| Categories | Food, Rent, Salary, Utilities, Other | P1 |
| Edit/Delete | Modify existing transactions | P1 |
| Date Filtering | Filter by date range | P1 |
| Product Card | Quick product selection | P1 |
| Running Balance | Show balance after each transaction | P0 |
| Duplicate Detection | Warn about potential duplicates | P1 |
| Smart Categorization | Auto-categorize based on keywords | P1 |

### User Flow

```
Home → Sale Tab → Add Transaction → Select Type → Enter Amount → Save → List View
                                         ↓
                                   Select Product
                                         ↓
                                   Edit / Delete
```

### Acceptance Criteria

- [ ] User can add a transaction (type, amount, description, category, date)
- [ ] Transaction list shows all entries with type badges
- [ ] User can enter amount using numpad
- [ ] User can select a product from product cards
- [ ] User can edit or delete a transaction
- [ ] Running balance is calculated and displayed
- [ ] Transactions are filtered by date
- [ ] Duplicate transactions are flagged
- [ ] Smart categorization suggests categories
- [ ] All labels in English and Urdu
- [ ] All data persists offline

### Technical Tasks

1. Create `TransactionList` component
2. Create `TransactionForm` component
3. Create `TransactionItem` component
4. Create `AmountInput` component (numpad)
5. Create `ProductCard` component
6. Add transaction CRUD operations
7. Implement balance calculation
8. Add date filtering
9. Add duplicate detection logic
10. Add smart categorization
11. Add Urdu translations

---

## Phase 3: Stock (Inventory Management)

**Goal:** Track stock items, quantities, and pricing.

### Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Inventory List | View all items | P0 |
| Add Item | Create new inventory item | P0 |
| Stock Tracking | Quantity in/out | P0 |
| Pricing | Purchase and sale price | P0 |
| Categories | Organize items | P1 |
| Stock Card | Visual stock level indicator | P1 |
| Low Stock Alert | Warn when stock is low | P1 |
| Camera Integration | Scan barcode/QR for item | P2 |
| Demand Prediction | Predict which items will run out | P2 |

### User Flow

```
Home → Stock Tab → View Items → Add Item → Enter Details → Save → Stock List
                                    ↓
                              Update Stock
                                    ↓
                              Edit / Delete
```

### Acceptance Criteria

- [ ] User can add inventory items (name, quantity, unit, prices, category)
- [ ] Inventory list shows all items with stock levels
- [ ] Stock card shows visual indicator (low/medium/high)
- [ ] User can update stock quantities
- [ ] User can edit or delete items
- [ ] Low stock warnings display
- [ ] Demand predictions show for fast-moving items
- [ ] All labels in English and Urdu
- [ ] All data persists offline

### Technical Tasks

1. Create `InventoryList` component
2. Create `InventoryForm` component
3. Create `InventoryItem` component
4. Create `StockCard` component
5. Add inventory CRUD operations
6. Implement stock tracking
7. Add low stock alerts
8. Add demand prediction logic
9. Add Urdu translations

---

## Phase 4: People (Team Management)

**Goal:** Manage team members, roles, and activity.

### Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Team List | View all team members | P0 |
| Add Member | Add new team member | P0 |
| Role Management | Assign roles (admin, worker, viewer) | P0 |
| Activity Log | Track who did what and when | P1 |
| Staff Cards | Visual member cards | P1 |
| Performance | Basic performance metrics | P2 |

### User Flow

```
Home → People Tab → View Members → Add Member → Enter Details → Save → Member List
                                       ↓
                                 Assign Role
                                       ↓
                                 View Activity
```

### Acceptance Criteria

- [ ] User can add team members (name, role, avatar, PIN)
- [ ] Team list shows all members with roles
- [ ] User can assign roles (admin, worker, viewer)
- [ ] User can view member activity log
- [ ] Staff cards display member info visually
- [ ] All labels in English and Urdu
- [ ] All data persists offline

### Technical Tasks

1. Create `TeamList` component
2. Create `MemberForm` component
3. Create `MemberCard` component
4. Create `ActivityLog` component
5. Add team member CRUD operations
6. Implement role-based access
7. Add Urdu translations

---

## Phase 5: Ledger (Financial Reports)

**Goal:** Visualize business data with charts and summaries.

### Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Daily Summary | Today's sales, purchases, expenses | P0 |
| Weekly/Monthly View | Filter by time period | P0 |
| Charts | Visual representation of data | P1 |
| Review/Metric | Key business metrics | P0 |
| Review/Detail Row | Detailed transaction rows | P1 |
| Export | Export data as CSV/PDF | P2 |
| Profit/Loss | Calculate net profit | P0 |
| Spending Patterns | Show spending trends | P1 |
| Sales Forecasting | Predict future sales | P2 |

### User Flow

```
Home → Ledger Tab → View Summary → Select Period → View Charts → Export
                                      ↓
                                 View Details
```

### Acceptance Criteria

- [ ] Ledger shows daily/weekly/monthly summaries
- [ ] Key metrics display (total sales, expenses, profit)
- [ ] Charts display income vs expenses
- [ ] Profit/loss is calculated and displayed
- [ ] User can filter by date range
- [ ] Data can be exported as CSV/PDF
- [ ] Spending patterns are visualized
- [ ] Sales forecasts are displayed
- [ ] All labels in English and Urdu

### Technical Tasks

1. Create `LedgerSummary` component
2. Create `ReportChart` component
3. Create `ReviewMetric` component
4. Create `ReviewDetailRow` component
5. Add data aggregation logic
6. Implement CSV/PDF export
7. Add date range filtering
8. Add spending pattern analysis
9. Add sales forecasting
10. Add Urdu translations

---

## Phase 6: PWA & Offline

**Goal:** Installable PWA with full offline support.

### Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Service Worker | Cache app shell | P0 |
| Offline Mode | Full functionality offline | P0 |
| Install Prompt | Add to home screen | P0 |
| App Icons | All required icon sizes | P1 |
| Push Notifications | Notify about low stock, etc. | P2 |
| Background Sync | Sync data when back online | P2 |

### Acceptance Criteria

- [ ] App installs on mobile and desktop
- [ ] App works fully offline
- [ ] App shell loads from cache
- [ ] All icons display correctly
- [ ] Install prompt appears
- [ ] Background sync works

### Technical Tasks

1. Configure service worker
2. Add app manifest
3. Generate all icon sizes
4. Implement offline caching strategy
5. Add install prompt
6. Implement background sync

---

## Phase 7: Desktop Experience & UX

**Goal:** Optimize for desktop and improve overall user experience.

### Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Desktop Sidebar | Navigation sidebar for desktop | P0 |
| Responsive Layout | Adaptive layout for all screen sizes | P0 |
| Keyboard Shortcuts | Power user shortcuts (Esc, N, etc.) | P1 |
| Dark Mode | Theme toggle (light/dark) | P1 |
| Search | Global search across data | P1 |
| Sorting | Sort lists by date, amount, name | P1 |
| Notifications | Bell icon with alerts | P1 |
| Settings Page | Profile, backup, about | P1 |
| Onboarding Tutorial | First-time user walkthrough | P1 |
| Animations | Smooth transitions and micro-interactions | P1 |

### Acceptance Criteria

- [ ] Sidebar displays on desktop screens
- [ ] Layout adapts to screen size
- [ ] Keyboard shortcuts work
- [ ] Dark mode toggles correctly
- [ ] Global search finds results
- [ ] Lists can be sorted
- [ ] Notifications display in bell icon
- [ ] Settings page has all options
- [ ] Onboarding tutorial shows on first launch
- [ ] Animations are smooth (60fps)

### Technical Tasks

1. Create `DesktopSidebar` component
2. Implement responsive breakpoints
3. Add keyboard shortcut support
4. Implement dark mode with theme toggle
5. Add global search functionality
6. Add sorting to all lists
7. Create notification system
8. Create settings page
9. Add onboarding tutorial
10. Add micro-interactions and animations

---

## Phase 8: Testing, Security & Backup

**Goal:** Ensure quality, data protection, and reliability.

### Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Unit Tests | Function and component tests | P0 |
| Integration Tests | Component + database tests | P0 |
| E2E Tests | Critical user flow tests | P0 |
| Security Audit | XSS, CSRF, data protection | P0 |
| Data Export | Full backup as JSON/CSV | P0 |
| Data Import | Restore from backup | P0 |
| Error Tracking | Sentry integration | P1 |
| Analytics | Feature usage tracking | P1 |
| Performance Budget | Bundle size limits | P1 |
| Accessibility | WCAG 2.1 AA compliance | P1 |

### Acceptance Criteria

- [ ] 70%+ test coverage
- [ ] All critical flows have E2E tests
- [ ] Security audit passes
- [ ] Data can be fully exported
- [ ] Data can be restored from backup
- [ ] Errors are tracked in Sentry
- [ ] Analytics show feature usage
- [ ] Bundle size within budget
- [ ] WCAG 2.1 AA compliant

### Technical Tasks

1. Set up Vitest for unit/integration tests
2. Set up Playwright for E2E tests
3. Write tests for all repositories
4. Write tests for critical components
5. Conduct security audit
6. Implement data export (JSON/CSV)
7. Implement data import/restore
8. Set up Sentry for error tracking
9. Set up analytics
10. Accessibility audit and fixes

---

## Phase 9: Polish & Optimization

**Goal:** Performance, accessibility, and visual polish.

### Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Performance | Optimize bundle size, lazy loading | P0 |
| Accessibility | ARIA labels, keyboard navigation | P0 |
| Error Handling | Graceful error states | P0 |
| Loading States | Skeleton screens | P1 |
| Empty States | Helpful messages when no data | P1 |

### Acceptance Criteria

- [ ] Lighthouse score > 90
- [ ] All interactive elements are keyboard accessible
- [ ] Loading states are smooth
- [ ] Errors are handled gracefully
- [ ] Empty states are helpful

### Technical Tasks

1. Optimize bundle size
2. Add lazy loading
3. Implement skeleton screens
4. Add error boundaries
5. Accessibility audit

---

## Phase 10: AI Implementation (Future)

**Goal:** Add AI-powered features to enhance user experience.

### Sub-Phase 10A: Rule-Based Intelligence (No external APIs)

| Feature | Description | Trigger |
|---------|-------------|---------|
| Smart Categorization | Auto-categorize transactions | Transaction added |
| Low Stock Alerts | Warn when stock falls below threshold | Stock updated |
| Daily Reminders | Summarize day's activity | App launch |
| Duplicate Detection | Warn about potential duplicates | Transaction added |
| Spending Patterns | Show spending trends | Ledger view |

### Sub-Phase 10B: Machine Learning (On-device)

| Feature | Description | Model |
|---------|-------------|-------|
| Sales Forecasting | Predict next week/month sales | Time series |
| Demand Prediction | Predict which items will run out | Classification |
| Anomaly Detection | Flag unusual transactions | Outlier detection |
| Price Optimization | Suggest optimal sale prices | Regression |

### Sub-Phase 10C: LLM-Powered Assistant

| Feature | Description | Example Query |
|---------|-------------|---------------|
| Business Q&A | Ask questions about your data | "How much did I sell today?" |
| Voice Input | Speak to enter transactions | "Sale 5000 to Ahmed" |
| Smart Suggestions | AI suggests next actions | "Restock milk — running low" |
| Report Summary | Natural language summaries | "Summarize this week" |
| Business Insights | AI-generated recommendations | "Consider increasing milk stock" |

### AI Ethics & Privacy

1. **Transparency** — Always show when AI is being used
2. **User Control** — Users can disable AI features
3. **Data Privacy** — Minimize data sent to external APIs
4. **Explainability** — AI decisions should be explainable
5. **Fallback** — Graceful degradation when AI unavailable

### AI Integration Options

| Option | Pros | Cons |
|--------|------|------|
| OpenAI API | Powerful, well-known | Cost, privacy concerns |
| Anthropic Claude | Strong reasoning | Cost, privacy concerns |
| Ollama (local) | Privacy, no cost | Limited power, setup |
| Hybrid | Balance | Complexity |

---

## Feature Priority Matrix

| Feature | MVP | V1 | V2 | V3 | Future |
|---------|-----|----|----|----|--------|
| User Selection | P0 | | | | |
| Home Dashboard | P0 | | | | |
| Bottom Nav | P0 | | | | |
| Bilingual (3 options) | P0 | | | | |
| Sale (Transactions) | | P0 | | | |
| Stock (Inventory) | | P0 | | | |
| People (Team) | | | P0 | | |
| Ledger (Reports) | | | P0 | | |
| PWA & Offline | | | | P0 | |
| Desktop & UX | | | | P0 | |
| Testing & Security | | | | P0 | |
| Polish | | | | P0 | |
| AI (Rule-based) | | | | | P1 |
| AI (ML) | | | | | P2 |
| AI (LLM) | | | | | P3 |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Score | > 90 |
| First Load JS | < 100 kB |
| Time to Interactive | < 3s |
| Offline Functionality | 100% |
| Test Coverage | > 70% |
| AI Response Time | < 2s |
| Voice Accuracy | > 90% |

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Scope creep | Strict MVP definition, one feature at a time |
| Technical debt | 200-line limit, clean code rules |
| Performance issues | Regular Lighthouse audits |
| Offline data loss | Regular export/backup feature |
| Urdu font loading | Self-host fonts, preload |
| AI cost | Start with rule-based, upgrade gradually |
| AI privacy | Process locally when possible, anonymize data |
| Security vulnerabilities | Regular audits, npm audit in CI |

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](ARCHITECTURE.md) | System architecture and design decisions |
| [Development](DEVELOPMENT.md) | Development setup and workflow |
| [Database](DATABASE.md) | Database schema and migrations |
| [Conventions](CONVENTIONS.md) | Coding conventions and standards |
| [Component Rules](COMPONENT_RULES.md) | Component patterns and limits |
| [Clean Code](CLEAN_CODE.md) | Code quality rules |
| [Styling](STYLING.md) | Styling structure and rules |
| [Types](TYPES.md) | Type system and conventions |
| [API](API.md) | API endpoint documentation |
| [Deployment](DEPLOYMENT.md) | Deployment guide |
| [Deployment Rules](DEPLOYMENT_RULES.md) | Deployment process and checklist |
| [Environments](ENVIRONMENTS.md) | Environment configuration |
| [Components](COMPONENTS.md) | Component library |
| [Testing](TESTING.md) | Testing strategy and guidelines |
| [Security](SECURITY.md) | Security practices and policies |
| [Backup](BACKUP.md) | Data backup and export |
| [AI Roadmap](AI_ROADMAP.md) | AI implementation roadmap |
| [Documentation](DOCUMENTATION.md) | Documentation conventions |

---

## Figma Component Mapping

| Figma Component | Feature Phase |
|-----------------|---------------|
| Bottom Nav | Phase 1 (MVP) |
| Desktop Sidebar | Phase 7 (Desktop) |
| Numpad Key | Phase 1 (PIN), Phase 2 (Amount) |
| Primary Button | All phases |
| Filter Pill | Phase 2, 3, 5 |
| Product Card | Phase 2 (Sale) |
| Stock Card | Phase 3 (Stock) |
| Review/Metric | Phase 5 (Ledger) |
| Review/Detail Row | Phase 5 (Ledger) |
| Review/Field | Phase 5 (Ledger) |
| Icon / assistant | Phase 10 (AI) |
| Icon / mic | Phase 10 (AI) |
| Icon / send | Phase 10 (AI) |
| Icon / wallet | Phase 2, 5 |
| Icon / staff | Phase 4 (People) |
| Icon / camera | Phase 3 (Stock) |
| Icon / bell | Phase 7 (Notifications) |
| Icon / settings | Phase 7 (Settings) |
| Icon / lock | Phase 8 (Security) |
| Icon / info | Phase 7 (Onboarding) |
| Icon / warning | Phase 8 (Error handling) |
| Keyboard Shortcuts | Phase 7 (Desktop) |

# Development Guide

## Prerequisites

- Node.js 18+ and npm
- Git
- A modern browser (Chrome/Firefox/Edge)

## Setup

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

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Follow the [Conventions](CONVENTIONS.md) guide.

### 3. Test Your Changes

```bash
npm run lint
npm test
```

### 4. Commit

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Create a Pull Request on GitHub for code review.

## Project Structure

See [Architecture](ARCHITECTURE.md) for the full structure.

## Database

See [Database](DATABASE.md) for schema and migration docs.

## Internationalization

The app supports English and Urdu (RTL). See `src/lib/i18n/` for translation files.

## Debugging

- Use React DevTools for component inspection
- Use IndexedDB browser tools for database inspection
- Check browser console for errors

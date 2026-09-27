# Security Practices

## Overview

Security is critical for a business application handling financial data. This document defines our security practices.

## Data Protection

### PIN Storage

```ts
// NEVER store PINs in plain text
// GOOD: Hash PINs before storing
import { sha256 } from "@/lib/crypto";

const hashedPin = await sha256(pin);
await userRepository.create({ ..., pin: hashedPin });
```

### Sensitive Data

| Data | Protection |
|------|-----------|
| User PIN | Hashed with SHA-256 |
| Financial data | Encrypted at rest (IndexedDB) |
| Session tokens | Secure, httpOnly cookies |
| Environment variables | Never commit `.env` files |

## XSS Prevention

```tsx
// React automatically escapes content — always use JSX
<p>{userInput}</p>  // Safe — React escapes HTML

// NEVER use dangerouslySetInnerHTML unless sanitized
<div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
```

## CSRF Protection

- Use SameSite cookies for session management
- Validate Origin header on API requests
- Use CSRF tokens for state-changing operations

## Content Security Policy

Configured in `vercel.json`:

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
connect-src 'self';
font-src 'self';
```

## Dependency Security

```bash
# Run before every deploy
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

## Security Checklist

Before releasing:

- [ ] `npm audit` shows no critical vulnerabilities
- [ ] No hardcoded secrets in code
- [ ] All user inputs validated
- [ ] XSS prevention in place
- [ ] CSP headers configured
- [ ] HTTPS enforced
- [ ] Rate limiting on auth endpoints
- [ ] Error messages don't leak sensitive info

## Incident Response

1. **Identify** — Detect the security issue
2. **Contain** — Limit the impact
3. **Fix** — Patch the vulnerability
4. **Review** — Analyze root cause
5. **Document** — Update security docs

## Reporting

Report security issues privately to the team lead. Do not create public issues for security vulnerabilities.

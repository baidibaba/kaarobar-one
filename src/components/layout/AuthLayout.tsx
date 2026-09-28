/**
 * Layout for authentication pages (login, onboarding).
 * Phone-width column on the warm Figma background; each screen renders its own header.
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-warm">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">{children}</div>
    </div>
  );
}

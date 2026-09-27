import { cn } from "@/lib/utils";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Card container component for grouping content.
 */
export function Card({ title, children, className }: CardProps) {
  return (
    <div className={cn("rounded-lg border border-gray-200 bg-white p-4 shadow-sm", className)}>
      {title && <h3 className="mb-3 text-lg font-semibold text-gray-900">{title}</h3>}
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";
import { useLanguage } from "@/stores/languageStore";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  /** English text (used when language is English or Both) */
  children: React.ReactNode;
  /** Urdu text (used when language is Urdu or Both) */
  urduText?: string;
}

/**
 * Button component with variant, size, and bilingual text support.
 * Matches Figma Primary Button (378x60) with Urdu + English text.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  urduText,
  ...props
}: ButtonProps) {
  const { language } = useLanguage();

  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const displayText = urduText
    ? language === "ur"
      ? urduText
      : language === "both"
        ? `${urduText} (${children})`
        : children
    : children;

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {displayText}
    </button>
  );
}

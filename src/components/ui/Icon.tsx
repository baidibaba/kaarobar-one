import { cn } from "@/lib/utils";

export type IconName =
  | "house"
  | "shopping-bag"
  | "book-open"
  | "package"
  | "package-2"
  | "users"
  | "staff"
  | "chart-no-axes-column"
  | "settings"
  | "camera"
  | "wallet"
  | "mouse-pointer"
  | "chevron-left"
  | "arrow-left"
  | "check-circle";

interface IconProps {
  name: IconName;
  className?: string;
}

/**
 * Figma icon from /public/icons, masked so it takes the current text color.
 * Default size is 24px; override with size-* classes.
 */
export function Icon({ name, className }: IconProps) {
  const mask = `url(/icons/${name}.svg) center / contain no-repeat`;
  return (
    <span
      aria-hidden
      className={cn("inline-block size-6 shrink-0 bg-current", className)}
      style={{ mask, WebkitMask: mask }}
    />
  );
}

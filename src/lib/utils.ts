/**
 * Utility functions for the Kaarobar One application.
 */

/**
 * Formats a number as Pakistani Rupee currency.
 *
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "Rs. 15,000")
 *
 * @example
 * formatCurrency(15000) // "Rs. 15,000"
 * formatCurrency(0) // "Rs. 0"
 */
export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

/**
 * Formats a date for display.
 *
 * @param date - The date to format
 * @param locale - The locale for formatting (default: "en-PK")
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date("2026-09-27")) // "27 Sep 2026"
 */
export function formatDate(date: Date, locale: string = "en-PK"): string {
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Merges class names, filtering out falsy values.
 *
 * @param classes - Class names to merge
 * @returns Merged class string
 *
 * @example
 * cn("btn", isActive && "btn-active", false) // "btn btn-active"
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Generates a unique ID.
 *
 * @returns A unique string ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Debounces a function call.
 *
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

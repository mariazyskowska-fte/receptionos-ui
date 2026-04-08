import clsx, { type ClassValue } from "clsx";

/**
 * Tiny className concatenator. Re-exported as `cn` so consuming apps and
 * components inside this package have one consistent helper.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

import clsx, { type ClassValue } from "clsx";

/**
 * Combine class names conditionally.
 * Used throughout components for variant + state styling.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

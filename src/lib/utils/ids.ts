
/**
 * Generates a random ID for use in temporary records
 * @returns A random ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Formats an ID to display format if needed
 * @param id The ID to format
 * @returns Formatted ID string
 */
export function formatId(id: number | string): string {
  return String(id).padStart(5, '0');
}

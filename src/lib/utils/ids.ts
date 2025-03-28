
/**
 * Generates a random ID for use in temporary records
 * @returns A random ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Generates a random ID for use in temporary records (alias of generateId)
 * @returns A random ID string
 */
export function generateRandomId(): string {
  return generateId();
}

/**
 * Formats an ID to display format if needed
 * @param id The ID to format
 * @returns Formatted ID string
 */
export function formatId(id: number | string): string {
  return String(id).padStart(5, '0');
}

/**
 * Creates a unique document ID with optional prefix
 * @param prefix Optional prefix for the document ID
 * @returns A unique document ID string
 */
export function generateDocumentId(prefix: string = 'DOC'): string {
  const timestamp = new Date().getTime().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${timestamp}-${randomStr}`;
}

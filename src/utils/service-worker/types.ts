
/**
 * Type definitions for Service Worker utilities
 */

// Interface for toast notification options
export interface ToastOptions {
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Declare window extensions for TypeScript
declare global {
  interface Window {
    showToast?: (options: ToastOptions) => void;
    swRegistration?: ServiceWorkerRegistration;
  }
}

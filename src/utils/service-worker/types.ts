
/**
 * Type definitions for service worker functionality
 */

// Define toast variants to match the application's toast system
export type ToastVariant = "default" | "destructive" | "success" | "warning";

// Toast notification options
export interface ToastOptions {
  title: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Extend Window interface to include service worker registration
declare global {
  interface Window {
    swRegistration?: ServiceWorkerRegistration;
    showToast?: (options: ToastOptions) => void;
  }
}

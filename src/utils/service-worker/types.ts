
/**
 * Type definitions for service worker functionality
 */

// Toast notification options
export interface ToastOptions {
  title: string;
  description: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Extend Window interface to include service worker registration
declare global {
  interface Window {
    swRegistration: ServiceWorkerRegistration;
    showToast: (options: ToastOptions) => void;
  }
}

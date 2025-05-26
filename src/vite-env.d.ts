
/// <reference types="vite/client" />

// Allow importing JSON files
declare module "*.json" {
  const value: any;
  export default value;
}

// Define toast variants to be consistent across the app
type ToastVariant = "default" | "destructive" | "success" | "warning";

// Extended window interface for toast functionality
interface Window {
  showToast?: (options: {
    title: string;
    description: string;
    variant?: ToastVariant;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  }) => void;
}

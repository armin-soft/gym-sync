
import { toast } from "@/hooks/toast/toast-utils";
import { ToastVariant } from "./toast/toast-types";

/**
 * Unified toast notification hook for application-wide notifications
 */
export const useToastNotification = () => {
  // Success toast notification
  const showSuccess = (title: string, description?: string) => {
    toast({
      variant: "success",
      title,
      description,
      duration: 5000,
    });
  };

  // Error toast notification
  const showError = (title: string, description?: string) => {
    toast({
      variant: "destructive",
      title,
      description,
      duration: 5000,
    });
  };

  // Warning toast notification
  const showWarning = (title: string, description?: string) => {
    toast({
      variant: "warning",
      title,
      description,
      duration: 5000,
    });
  };

  // Info toast notification
  const showInfo = (title: string, description?: string) => {
    toast({
      variant: "default",
      title,
      description,
      duration: 5000,
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

// Export direct toast helper functions for use without the hook
export const successToast = (title: string, description?: string) => {
  toast({
    variant: "success",
    title,
    description,
    duration: 5000,
  });
};

export const errorToast = (title: string, description?: string) => {
  toast({
    variant: "destructive",
    title,
    description,
    duration: 5000,
  });
};

export const warningToast = (title: string, description?: string) => {
  toast({
    variant: "warning",
    title,
    description,
    duration: 5000,
  });
};

export const infoToast = (title: string, description?: string) => {
  toast({
    variant: "default",
    title,
    description,
    duration: 5000,
  });
};

// Re-export the base toast function and hook for direct use
export { useToast, toast } from "@/hooks/toast/toast-utils";

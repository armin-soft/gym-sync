
// Re-export the toast components from our internal hooks implementation
import { useToast, toast } from "@/hooks/toast/toast-utils";

// Additional custom toast helpers
export const useCustomToast = () => {
  const { toast: toastFn } = useToast();
  
  // Success toast
  const successToast = (title: string, description?: string) => {
    toastFn({
      title,
      description,
      variant: "default",
    });
  };
  
  // Error toast
  const errorToast = (title: string, description?: string) => {
    toastFn({
      title,
      description,
      variant: "destructive",
    });
  };
  
  // Warning toast
  const warningToast = (title: string, description?: string) => {
    toastFn({
      title,
      description,
      variant: "warning",
    });
  };
  
  return {
    toast: toastFn,
    successToast,
    errorToast,
    warningToast
  };
};

// Export the hooks and utilities
export { useToast, toast };

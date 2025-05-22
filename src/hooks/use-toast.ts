
// Re-export the toast components from our internal hooks implementation
import { useToast, toast } from "@/hooks/toast/toast-utils";
import { useToastNotification, successToast, errorToast, warningToast, infoToast } from "@/hooks/use-toast-notification";

// Export all notification functions
export {
  useToast,
  toast,
  useToastNotification,
  successToast,
  errorToast,
  warningToast,
  infoToast
};

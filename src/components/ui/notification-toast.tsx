
import { toast } from "@/hooks/use-toast";

/**
 * Displays a success toast notification
 * @param title The main message to display
 * @param description Optional additional details
 */
export const successToast = (title: string, description?: string) => {
  toast({
    variant: "success",
    title,
    description,
  });
};

/**
 * Displays an error toast notification
 * @param title The main message to display
 * @param description Optional additional details
 */
export const errorToast = (title: string, description?: string) => {
  toast({
    variant: "destructive",
    title,
    description,
  });
};

/**
 * Displays a warning toast notification
 * @param title The main message to display
 * @param description Optional additional details
 */
export const warningToast = (title: string, description?: string) => {
  toast({
    variant: "warning",
    title,
    description,
  });
};

/**
 * Displays an informational toast notification
 * @param title The main message to display
 * @param description Optional additional details
 */
export const infoToast = (title: string, description?: string) => {
  toast({
    variant: "default",
    title,
    description,
  });
};

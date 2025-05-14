
// Re-export the toast components from our internal hooks implementation
export { useToast, toast } from "@/hooks/toast/toast-utils";

// Additional custom toast helpers
export const useCustomToast = () => {
  const { toast } = useToast();
  
  // Success toast
  const successToast = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    });
  };
  
  // Error toast
  const errorToast = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };
  
  // Warning toast
  const warningToast = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "warning",
    });
  };
  
  return {
    toast,
    successToast,
    errorToast,
    warningToast
  };
};

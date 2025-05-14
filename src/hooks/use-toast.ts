
import { useToast as useToastOriginal } from "@/components/ui/use-toast";

// Re-export the toast components from our hook implementation
export { useToast, toast } from "@/components/ui/use-toast";

// Additional custom toast helpers
export const useCustomToast = () => {
  const { toast } = useToastOriginal();
  
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

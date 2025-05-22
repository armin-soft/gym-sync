
import { toast } from "@/components/ui/toast";

export const successToast = (title: string, description?: string) => {
  toast({
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

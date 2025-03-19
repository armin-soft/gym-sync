
import { toast } from "@/hooks/use-toast";

export const successToast = (title: string, description?: string) => {
  toast({
    variant: "success",
    title,
    description,
  });
};

export const errorToast = (title: string, description?: string) => {
  toast({
    variant: "destructive",
    title,
    description,
  });
};

export const warningToast = (title: string, description?: string) => {
  toast({
    variant: "warning",
    title,
    description,
  });
};

export const infoToast = (title: string, description?: string) => {
  toast({
    title,
    description,
  });
};

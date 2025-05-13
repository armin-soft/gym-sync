
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function useBrowserSupport() {
  const { toast } = useToast();
  
  // Check browser support for Speech Recognition API
  const checkBrowserSupport = () => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: "خطا",
        description: "مرورگر شما از تبدیل گفتار به نوشتار پشتیبانی نمی‌کند.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  return { checkBrowserSupport };
}

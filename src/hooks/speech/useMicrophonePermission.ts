
import { useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export function useMicrophonePermission() {
  const { toast } = useToast();
  const hasPermissionRequestedRef = useRef(false);
  
  const requestMicrophonePermission = useCallback(async () => {
    if (hasPermissionRequestedRef.current) return true;
    
    try {
      // درخواست دسترسی به میکروفون
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // رهاسازی منابع پس از دریافت دسترسی
      stream.getTracks().forEach(track => track.stop());
      
      hasPermissionRequestedRef.current = true;
      return true;
    } catch (error) {
      console.error("Error requesting microphone permission:", error);
      toast({
        title: "خطا در دسترسی به میکروفون",
        description: "لطفا دسترسی به میکروفون را اجازه دهید.",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);
  
  return { requestMicrophonePermission };
}

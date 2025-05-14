
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function useBrowserSupport() {
  const { toast } = useToast();
  const [isSupported, setIsSupported] = useState(true);
  
  // More comprehensive browser support check
  useEffect(() => {
    const checkBrowserSupport = () => {
      const SpeechRecognition = 
        window.SpeechRecognition || 
        (window as any).webkitSpeechRecognition ||
        (window as any).mozSpeechRecognition ||
        (window as any).msSpeechRecognition;
        
      // iOS Safari specific support check
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const isIOSSafari = isIOS && isSafari;
      
      // iOS 14.5+ has better support for speech recognition
      const isModernIOS = isIOS && parseInt((navigator.userAgent.match(/OS (\d+)_/) || [])[1] || '0', 10) >= 14;
      
      if (!SpeechRecognition) {
        console.error("SpeechRecognition not supported in this browser");
        setIsSupported(false);
        
        // Only show toast if not handled by a fallback
        toast({
          title: "توجه",
          description: "مرورگر شما از تبدیل گفتار به نوشتار پشتیبانی نمی‌کند. لطفاً از Chrome، Edge یا Safari استفاده کنید.",
          variant: "destructive",
        });
        return false;
      }
      
      // Show optimized guidance for iOS users
      if (isIOSSafari && !isModernIOS) {
        toast({
          title: "توجه برای کاربران iOS",
          description: "در دستگاه‌های iOS، برای عملکرد بهتر از Safari استفاده کنید و اطمینان حاصل کنید که iOS 14.5 یا بالاتر نصب شده باشد.",
          duration: 6000,
        });
      }
      
      setIsSupported(true);
      return true;
    };
    
    checkBrowserSupport();
  }, [toast]);
  
  return { isSupported, checkBrowserSupport: () => isSupported };
}


import { useEffect, useState } from "react";

export function useBrowserSupport() {
  const [isSupported, setIsSupported] = useState(true);
  const [supportDetails, setSupportDetails] = useState({
    hasSpeechRecognition: false,
    hasWebkitSpeechRecognition: false,
    hasMozillaSpeechRecognition: false,
    hasMsSpeechRecognition: false,
    hasGetUserMedia: false,
    hasMediaDevices: false,
    hasEnumerateDevices: false,
    canUseVoiceRecognition: false
  });

  const checkBrowserSupport = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    
    // بررسی پشتیبانی از تشخیص گفتار
    const hasSpeechRecognition = 'SpeechRecognition' in window;
    const hasWebkitSpeechRecognition = 'webkitSpeechRecognition' in window;
    const hasMozillaSpeechRecognition = 'mozSpeechRecognition' in window;
    const hasMsSpeechRecognition = 'msSpeechRecognition' in window;
    
    // بررسی دسترسی به میکروفون
    const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasMediaDevices = 'mediaDevices' in navigator;
    const hasEnumerateDevices = !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
    
    // آیا تشخیص گفتار کاملاً پشتیبانی می‌شود؟
    const canUseVoiceRecognition = hasSpeechRecognition || 
                                 hasWebkitSpeechRecognition || 
                                 hasMozillaSpeechRecognition ||
                                 hasMsSpeechRecognition;
    
    // ذخیره جزئیات پشتیبانی
    setSupportDetails({
      hasSpeechRecognition,
      hasWebkitSpeechRecognition,
      hasMozillaSpeechRecognition,
      hasMsSpeechRecognition,
      hasGetUserMedia,
      hasMediaDevices,
      hasEnumerateDevices,
      canUseVoiceRecognition
    });
    
    // آیا مرورگر می‌تواند از قابلیت تشخیص گفتار استفاده کند؟
    const isBrowserSupported = canUseVoiceRecognition && hasGetUserMedia;
    setIsSupported(isBrowserSupported);
    
    return isBrowserSupported;
  };
  
  // بررسی پشتیبانی مرورگر در زمان بارگذاری
  useEffect(() => {
    checkBrowserSupport();
  }, []);
  
  return {
    isSupported,
    supportDetails,
    checkBrowserSupport
  };
}

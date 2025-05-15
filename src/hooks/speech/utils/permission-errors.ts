
import { ToastProps } from "@/hooks/use-toast";

interface BrowserInfo {
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
}

/**
 * Detects what browser the user is using
 */
export function detectBrowser(): BrowserInfo {
  if (typeof navigator === 'undefined') {
    return { isChrome: false, isFirefox: false, isSafari: false };
  }
  
  const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
  const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  return { isChrome, isFirefox, isSafari };
}

/**
 * Get browser-specific instructions for enabling microphone access
 */
export function getBrowserSpecificPermissionInstructions(): string {
  const { isChrome, isFirefox, isSafari } = detectBrowser();
  
  if (isChrome) {
    return " در Chrome، روی آیکون قفل در نوار آدرس کلیک کنید.";
  } else if (isFirefox) {
    return " در Firefox، روی آیکون دوربین در نوار آدرس کلیک کنید.";
  } else if (isSafari) {
    return " در Safari، به تنظیمات وبسایت بروید و دسترسی میکروفون را فعال کنید.";
  }
  
  return "";
}

/**
 * Generate error toast message based on the error type
 */
export function getErrorToast(error: any): ToastProps {
  if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
    const browserSpecificMsg = getBrowserSpecificPermissionInstructions();
    
    return {
      title: "دسترسی به میکروفون رد شده",
      description: "شما اجازه دسترسی به میکروفون را نداده‌اید. لطفا در تنظیمات مرورگر این دسترسی را فعال کنید." + browserSpecificMsg,
      variant: "destructive",
    };
  } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
    return {
      title: "میکروفون یافت نشد",
      description: "هیچ میکروفونی به سیستم شما متصل نیست یا توسط سیستم‌عامل شناسایی نشده است. لطفاً اتصال میکروفون خود را بررسی کنید.",
      variant: "destructive",
    };
  } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
    return {
      title: "خطای سخت‌افزاری میکروفون",
      description: "میکروفون شما قابل دسترسی نیست یا توسط برنامه دیگری استفاده می‌شود. لطفاً برنامه‌های دیگر را بسته و دوباره امتحان کنید.",
      variant: "destructive",
    };
  } 
  
  return {
    title: "خطا در دسترسی به میکروفون",
    description: "مشکلی در دسترسی به میکروفون رخ داد. لطفا مجوزهای دسترسی و اتصال میکروفون را بررسی نمایید.",
    variant: "destructive",
  };
}

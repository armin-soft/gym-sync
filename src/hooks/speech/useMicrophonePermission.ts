
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useMicrophonePermission() {
  const { toast } = useToast();
  const hasPermissionRequestedRef = useRef(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);
  const [isDeviceAvailable, setIsDeviceAvailable] = useState<boolean | null>(null);
  
  // Check if we can use the Permissions API
  const canUsePermissionsAPI = typeof navigator !== 'undefined' && 
                              'permissions' in navigator &&
                              'query' in navigator.permissions;
  
  // بررسی وجود میکروفون در دستگاه
  const checkMicrophoneAvailability = useCallback(async () => {
    if (typeof navigator === 'undefined' || !('mediaDevices' in navigator)) {
      setIsDeviceAvailable(false);
      return false;
    }

    try {
      // بررسی دسترسی به لیست دستگاه‌های رسانه‌ای
      if ('enumerateDevices' in navigator.mediaDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasAudioInput = devices.some(device => device.kind === 'audioinput');
        
        if (!hasAudioInput) {
          console.log("هیچ دستگاه ورودی صوتی یافت نشد");
          setIsDeviceAvailable(false);
          return false;
        }
        
        setIsDeviceAvailable(true);
        return true;
      } else {
        // تلاش برای دسترسی مستقیم به میکروفون در مرورگرهایی که از enumerateDevices پشتیبانی نمی‌کنند
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(track => track.stop());
          setIsDeviceAvailable(true);
          return true;
        } catch (directAccessError) {
          console.error("خطا در دسترسی مستقیم به میکروفون:", directAccessError);
          // اگر خطای دسترسی نباشد، میکروفون احتمالاً وجود ندارد
          if ((directAccessError as Error).name === 'NotFoundError' || 
              (directAccessError as Error).name === 'DevicesNotFoundError') {
            setIsDeviceAvailable(false);
            return false;
          }
          // در صورت خطای دسترسی، نمیتوان از اینجا تشخیص داد
          setIsDeviceAvailable(null);
          return null;
        }
      }
    } catch (error) {
      console.error("خطا در بررسی وجود میکروفون:", error);
      setIsDeviceAvailable(null);
      return null;
    }
  }, []);
  
  // Get current microphone permission status using Permissions API if available
  const checkMicrophonePermission = useCallback(async () => {
    if (!canUsePermissionsAPI) return null;
    
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setPermissionStatus(result.state);
      return result.state;
    } catch (error) {
      console.error("Error checking microphone permission:", error);
      return null;
    }
  }, [canUsePermissionsAPI]);
  
  // Request microphone permission with enhanced error handling
  const requestMicrophonePermission = useCallback(async () => {
    // اول بررسی وجود میکروفون
    const deviceAvailable = await checkMicrophoneAvailability();
    
    if (deviceAvailable === false) {
      toast({
        title: "میکروفون یافت نشد",
        description: "هیچ میکروفونی به سیستم متصل نیست یا توسط سیستم‌عامل شناسایی نشده است.",
        variant: "destructive",
      });
      return false;
    }
    
    if (hasPermissionRequestedRef.current) {
      // If we've already checked permissions with the API, use that status
      if (permissionStatus === 'granted') return true;
      if (permissionStatus === 'denied') {
        toast({
          title: "دسترسی رد شده",
          description: "لطفا دسترسی به میکروفون را در تنظیمات مرورگر خود فعال کنید.",
          variant: "destructive",
        });
        return false;
      }
    }
    
    try {
      // Always try to get actual access even if we checked permissions API
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      // Release resources
      stream.getTracks().forEach(track => track.stop());
      
      hasPermissionRequestedRef.current = true;
      
      // Check permissions status again after successful request
      if (canUsePermissionsAPI) {
        checkMicrophonePermission();
      }
      
      return true;
    } catch (error: any) {
      console.error("Error requesting microphone permission:", error);
      
      // بهبود پیام‌های خطا با جزئیات بیشتر و راهنمایی برای مرورگرهای مختلف
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        let browserSpecificMsg = "";
        const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
        const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        
        if (isChrome) {
          browserSpecificMsg = " در Chrome، روی آیکون قفل در نوار آدرس کلیک کنید.";
        } else if (isFirefox) {
          browserSpecificMsg = " در Firefox، روی آیکون دوربین در نوار آدرس کلیک کنید.";
        } else if (isSafari) {
          browserSpecificMsg = " در Safari، به تنظیمات وبسایت بروید و دسترسی میکروفون را فعال کنید.";
        }
        
        toast({
          title: "دسترسی به میکروفون رد شده",
          description: "شما اجازه دسترسی به میکروفون را نداده‌اید. لطفا در تنظیمات مرورگر این دسترسی را فعال کنید." + browserSpecificMsg,
          variant: "destructive",
        });
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        toast({
          title: "میکروفون یافت نشد",
          description: "هیچ میکروفونی به سیستم شما متصل نیست یا توسط سیستم‌عامل شناسایی نشده است. لطفاً اتصال میکروفون خود را بررسی کنید.",
          variant: "destructive",
        });
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        toast({
          title: "خطای سخت‌افزاری میکروفون",
          description: "میکروفون شما قابل دسترسی نیست یا توسط برنامه دیگری استفاده می‌شود. لطفاً برنامه‌های دیگر را بسته و دوباره امتحان کنید.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "خطا در دسترسی به میکروفون",
          description: "مشکلی در دسترسی به میکروفون رخ داد. لطفا مجوزهای دسترسی و اتصال میکروفون را بررسی نمایید.",
          variant: "destructive",
        });
      }
      return false;
    }
  }, [toast, permissionStatus, canUsePermissionsAPI, checkMicrophonePermission, checkMicrophoneAvailability]);
  
  // بررسی اولیه میکروفون و دسترسی‌ها در هنگام بارگذاری
  useEffect(() => {
    const initializePermissions = async () => {
      await checkMicrophoneAvailability();
      if (canUsePermissionsAPI) {
        await checkMicrophonePermission();
      }
    };
    
    initializePermissions();
  }, [canUsePermissionsAPI, checkMicrophonePermission, checkMicrophoneAvailability]);
  
  return { 
    requestMicrophonePermission, 
    permissionStatus,
    checkMicrophonePermission,
    isDeviceAvailable,
    checkMicrophoneAvailability
  };
}

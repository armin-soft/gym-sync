
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { canUsePermissionsAPI, checkMicrophoneAvailability, getMicrophonePermissionStatus } from "./utils/device-detection";
import { getErrorToast } from "./utils/permission-errors";

export interface MicrophonePermissionHook {
  requestMicrophonePermission: () => Promise<boolean>;
  permissionStatus: PermissionState | null;
  checkMicrophonePermission: () => Promise<PermissionState | null>;
  isDeviceAvailable: boolean | null;
  checkMicrophoneAvailability: () => Promise<boolean | null>;
}

export function useMicrophonePermission(): MicrophonePermissionHook {
  const { toast } = useToast();
  const hasPermissionRequestedRef = useRef(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);
  const [isDeviceAvailable, setIsDeviceAvailable] = useState<boolean | null>(null);
  
  // بررسی وجود میکروفون در دستگاه
  const checkDeviceAvailability = useCallback(async () => {
    const result = await checkMicrophoneAvailability();
    setIsDeviceAvailable(result);
    return result;
  }, []);
  
  // Get current microphone permission status using Permissions API if available
  const checkMicrophonePermission = useCallback(async () => {
    const status = await getMicrophonePermissionStatus();
    setPermissionStatus(status);
    return status;
  }, []);
  
  // Request microphone permission with enhanced error handling
  const requestMicrophonePermission = useCallback(async () => {
    // اول بررسی وجود میکروفون
    const deviceAvailable = await checkDeviceAvailability();
    
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
      // Make sure navigator.mediaDevices exists
      if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
        throw new Error('MediaDevices API not supported in this browser');
      }
      
      // Ensure getUserMedia exists before calling it
      const mediaDevices = navigator.mediaDevices;
      if (!mediaDevices || !('getUserMedia' in mediaDevices)) {
        throw new Error('getUserMedia is not available in this browser');
      }
      
      const stream = await mediaDevices.getUserMedia({ 
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
      if (canUsePermissionsAPI()) {
        checkMicrophonePermission();
      }
      
      return true;
    } catch (error: any) {
      console.error("Error requesting microphone permission:", error);
      
      // Show appropriate toast based on error
      toast(getErrorToast(error));
      return false;
    }
  }, [toast, permissionStatus, checkMicrophonePermission, checkDeviceAvailability]);
  
  // بررسی اولیه میکروفون و دسترسی‌ها در هنگام بارگذاری
  useEffect(() => {
    const initializePermissions = async () => {
      await checkDeviceAvailability();
      if (canUsePermissionsAPI()) {
        await checkMicrophonePermission();
      }
    };
    
    initializePermissions();
  }, [checkMicrophonePermission, checkDeviceAvailability]);
  
  return { 
    requestMicrophonePermission, 
    permissionStatus,
    checkMicrophonePermission,
    isDeviceAvailable,
    checkMicrophoneAvailability: checkDeviceAvailability
  };
}

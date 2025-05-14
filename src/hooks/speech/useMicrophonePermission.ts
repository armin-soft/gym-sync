
import { useCallback, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useMicrophonePermission() {
  const { toast } = useToast();
  const hasPermissionRequestedRef = useRef(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);
  
  // Check if we can use the Permissions API
  const canUsePermissionsAPI = typeof navigator !== 'undefined' && 
                              'permissions' in navigator &&
                              'query' in navigator.permissions;
  
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
      
      // More specific error messages
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        toast({
          title: "دسترسی رد شده",
          description: "شما اجازه دسترسی به میکروفون را نداده‌اید. لطفا در تنظیمات مرورگر این دسترسی را فعال کنید.",
          variant: "destructive",
        });
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        toast({
          title: "خطا",
          description: "هیچ میکروفونی در دستگاه شما پیدا نشد. لطفاً اتصال میکروفون را بررسی کنید.",
          variant: "destructive",
        });
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        toast({
          title: "خطای سخت‌افزاری",
          description: "میکروفون شما قابل دسترسی نیست یا توسط برنامه دیگری استفاده می‌شود.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "خطا در دسترسی به میکروفون",
          description: "لطفا مجوز دسترسی به میکروفون را بررسی نمایید.",
          variant: "destructive",
        });
      }
      return false;
    }
  }, [toast, permissionStatus, canUsePermissionsAPI, checkMicrophonePermission]);
  
  // Run initial permission check
  useCallback(() => {
    if (canUsePermissionsAPI) {
      checkMicrophonePermission();
    }
  }, [canUsePermissionsAPI, checkMicrophonePermission]);
  
  return { 
    requestMicrophonePermission, 
    permissionStatus,
    checkMicrophonePermission 
  };
}

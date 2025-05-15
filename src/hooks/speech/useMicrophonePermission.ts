
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export function useMicrophonePermission() {
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);

  // بررسی وجود میکروفون
  const checkMicrophoneAvailability = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasAudioInput = devices.some(device => device.kind === 'audioinput');
      return hasAudioInput;
    } catch (error) {
      console.error('خطا در بررسی دستگاه‌های ورودی صدا:', error);
      return false;
    }
  }, []);
  
  // بررسی وضعیت دسترسی میکروفون
  const checkMicrophonePermission = useCallback(async (): Promise<boolean> => {
    // بررسی پشتیبانی از API دسترسی‌ها
    if (!navigator.permissions) {
      console.warn('API دسترسی‌ها پشتیبانی نمی‌شود، در حال اجرای بررسی جایگزین');
      return true; // فرض بر این است که مجوز وجود دارد و در getUserMedia بررسی می‌شود
    }

    try {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setPermissionStatus(permission.state);
      return permission.state === 'granted';
    } catch (error) {
      console.error('خطا در بررسی دسترسی میکروفون:', error);
      setPermissionStatus(null);
      return false;
    }
  }, []);

  // درخواست دسترسی به میکروفون
  const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
    // ابتدا وجود میکروفون را بررسی می‌کنیم
    const isDeviceAvailable = await checkMicrophoneAvailability();
    if (!isDeviceAvailable) {
      toast({
        title: "میکروفون یافت نشد",
        description: "هیچ میکروفونی به دستگاه متصل نیست. لطفاً اتصال میکروفون خود را بررسی کنید.",
        variant: "destructive",
      });
      return false;
    }

    try {
      // بررسی دسترسی فعلی
      const hasPermission = await checkMicrophonePermission();
      if (hasPermission) return true;

      // درخواست دسترسی با getUserMedia
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // آزادسازی منابع پس از گرفتن دسترسی
      stream.getTracks().forEach(track => track.stop());
      
      // بروزرسانی وضعیت دسترسی
      setPermissionStatus('granted');
      return true;
    } catch (error: any) {
      console.error('Error requesting microphone permission:', error);

      // پیغام خطای بهبودیافته
      let errorMessage = "خطا در دسترسی به میکروفون";
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = "دسترسی به میکروفون توسط کاربر یا سیستم رد شد";
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage = "میکروفونی یافت نشد";
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage = "میکروفون قابل خواندن نیست، احتمالاً توسط برنامه دیگری استفاده می‌شود";
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = "میکروفون با ویژگی‌های درخواستی یافت نشد";
      } else if (error.name === 'TypeError') {
        errorMessage = "پارامترهای درخواستی نامعتبر هستند";
      }

      toast({
        title: "خطای دسترسی میکروفون",
        description: errorMessage,
        variant: "destructive",
      });

      return false;
    }
  }, [checkMicrophoneAvailability, checkMicrophonePermission, toast]);

  return {
    permissionStatus,
    requestMicrophonePermission,
    checkMicrophoneAvailability,
    isDeviceAvailable: checkMicrophoneAvailability
  };
}

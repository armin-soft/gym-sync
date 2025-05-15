
/**
 * Utility functions for device and microphone detection
 */

/**
 * Checks if the browser supports the Permissions API
 */
export function canUsePermissionsAPI(): boolean {
  return typeof navigator !== 'undefined' && 
         'permissions' in navigator &&
         'query' in navigator.permissions;
}

/**
 * Checks if a microphone is available on the device
 */
export async function checkMicrophoneAvailability(): Promise<boolean | null> {
  if (typeof navigator === 'undefined') {
    return false;
  }

  // First, check if mediaDevices exists
  if (!('mediaDevices' in navigator)) {
    return false;
  }

  try {
    // بررسی دسترسی به لیست دستگاه‌های رسانه‌ای
    if ('enumerateDevices' in navigator.mediaDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasAudioInput = devices.some(device => device.kind === 'audioinput');
      
      if (!hasAudioInput) {
        console.log("هیچ دستگاه ورودی صوتی یافت نشد");
        return false;
      }
      
      return true;
    } else {
      // تلاش برای دسترسی مستقیم به میکروفون در مرورگرهایی که از enumerateDevices پشتیبانی نمی‌کنند
      try {
        // Ensure mediaDevices exists and has getUserMedia
        if ('mediaDevices' in navigator) {
          if ('getUserMedia' in navigator.mediaDevices) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
          } else {
            console.error("getUserMedia is not available on this browser");
            return false;
          }
        }
        return false;
      } catch (directAccessError) {
        console.error("خطا در دسترسی مستقیم به میکروفون:", directAccessError);
        // اگر خطای دسترسی نباشد، میکروفون احتمالاً وجود ندارد
        if ((directAccessError as Error).name === 'NotFoundError' || 
            (directAccessError as Error).name === 'DevicesNotFoundError') {
          return false;
        }
        // در صورت خطای دسترسی، نمیتوان از اینجا تشخیص داد
        return null;
      }
    }
  } catch (error) {
    console.error("خطا در بررسی وجود میکروفون:", error);
    return null;
  }
}

/**
 * Gets microphone access from browser permissions API
 */
export async function getMicrophonePermissionStatus(): Promise<PermissionState | null> {
  if (!canUsePermissionsAPI()) return null;
  
  try {
    const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
    return result.state;
  } catch (error) {
    console.error("Error checking microphone permission:", error);
    return null;
  }
}

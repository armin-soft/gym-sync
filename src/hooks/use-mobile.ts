
import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isSmallLaptop: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
}

export const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isSmallLaptop: false,
    isDesktop: true,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isSmallLaptop: width >= 1024 && width < 1280,
        isDesktop: width >= 1280,
        screenWidth: width,
        screenHeight: height,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceInfo;
};

// Export useIsMobile for backward compatibility
export const useIsMobile = (): boolean => {
  const deviceInfo = useDeviceInfo();
  return deviceInfo.isMobile;
};

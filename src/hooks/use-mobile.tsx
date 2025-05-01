
import { useState, useEffect, createContext, useContext } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isSmallLaptop: boolean; // Added this property
  isDesktop: boolean;
}

const DeviceContext = createContext<DeviceInfo>({
  isMobile: false,
  isTablet: false,
  isSmallLaptop: false, // Added this property
  isDesktop: true
});

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isSmallLaptop: false, // Added this property
    isDesktop: true
  });

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setDeviceInfo({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isSmallLaptop: width >= 1024 && width < 1280, // Added this check
        isDesktop: width >= 1280
      });
    };

    // Initial check
    checkDeviceType();

    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceType);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
};

// The main hook to get device info
export const useDeviceInfo = () => useContext(DeviceContext);

// Add a convenience hook for mobile detection
export const useIsMobile = () => {
  const deviceInfo = useDeviceInfo();
  return deviceInfo.isMobile;
};

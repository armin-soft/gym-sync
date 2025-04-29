
import * as React from "react"

// Added additional breakpoints for more precise responsive design
export const BREAKPOINTS = {
  xs: 375, // Mobile phones
  sm: 640, // Small tablets
  md: 768, // Tablets
  lg: 1024, // Small laptops
  xl: 1280, // Laptops and desktops
  "2xl": 1400, // Large desktops
  "3xl": 1600, // Extra large desktops
  "4xl": 1920, // Ultra wide screens
};

export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const handleResize = () => {
      setIsAboveBreakpoint(window.innerWidth >= BREAKPOINTS[breakpoint]);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isAboveBreakpoint;
}

// Improved isMobile hook with additional device type detection
export function useIsMobile() {
  const [deviceType, setDeviceType] = React.useState<{
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  }>({
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceType({
        isMobile: width < BREAKPOINTS.md,
        isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
        isDesktop: width >= BREAKPOINTS.lg
      });
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType.isMobile;
}

// New hook to get detailed device information
export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = React.useState({
    isMobile: false,
    isTablet: false,
    isSmallLaptop: false,
    isDesktop: false,
    isLargeDesktop: false,
    currentWidth: 0
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceInfo({
        isMobile: width < BREAKPOINTS.sm,
        isTablet: width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg,
        isSmallLaptop: width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl,
        isDesktop: width >= BREAKPOINTS.xl && width < BREAKPOINTS["2xl"],
        isLargeDesktop: width >= BREAKPOINTS["2xl"],
        currentWidth: width
      });
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceInfo;
}

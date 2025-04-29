
import * as React from "react"

// Added XS breakpoint for better responsive design
export const BREAKPOINTS = {
  xs: 375, // Added extra small breakpoint
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400,
  "3xl": 1600,
  "4xl": 1920,
};

export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
    const onChange = () => {
      setIsAboveBreakpoint(mql.matches);
    };
    
    onChange(); // Initial check
    
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // Fallback for older browsers
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, [breakpoint]);

  return isAboveBreakpoint;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md);
    };
    
    onChange(); // Initial check
    
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // Fallback for older browsers
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, []);

  return !!isMobile;
}


import { useMemo } from 'react';
import { useTheme } from './use-theme';
import { brandColors, gradients, colorClasses } from '@/lib/theme/colors';

export const useBrandTheme = () => {
  const { theme } = useTheme();
  
  const themeColors = useMemo(() => {
    const isDark = theme === 'dark';
    
    return {
      // رنگ‌های اصلی
      primary: brandColors.primary.DEFAULT,
      secondary: brandColors.secondary.DEFAULT,
      dark: brandColors.dark.DEFAULT,
      
      // رنگ‌های با تطبیق تم
      background: isDark ? brandColors.dark[900] : '#ffffff',
      foreground: isDark ? '#ffffff' : brandColors.dark[800],
      
      // رنگ‌های کارت
      cardBg: isDark ? brandColors.dark[800] : '#ffffff',
      cardBorder: isDark ? brandColors.dark[700] : brandColors.dark[200],
      
      // رنگ‌های دکمه
      buttonPrimary: brandColors.primary.DEFAULT,
      buttonSecondary: brandColors.secondary.DEFAULT,
      buttonDark: brandColors.dark.DEFAULT,
      
      // گرادیان‌ها
      gradients: {
        primary: gradients.primary,
        dark: gradients.dark,
        accent: gradients.accent,
      },
      
      // شفافیت‌ها
      opacity: {
        light: isDark ? 0.1 : 0.05,
        medium: isDark ? 0.2 : 0.1,
        heavy: isDark ? 0.3 : 0.2,
      }
    };
  }, [theme]);
  
  const getThemeClass = (element: 'bg' | 'text' | 'border', color: 'primary' | 'secondary' | 'dark') => {
    const base = element === 'bg' ? 'bg-' : element === 'text' ? 'text-' : 'border-';
    const colorMap = {
      primary: 'brand-500',
      secondary: 'gold-500', 
      dark: 'dark-800'
    };
    
    return `${base}${colorMap[color]}`;
  };
  
  const getGradientClass = (type: 'primary' | 'dark' | 'accent') => {
    const gradientMap = {
      primary: 'bg-gradient-to-r from-brand-500 to-gold-500',
      dark: 'bg-gradient-to-r from-dark-800 to-dark-700',
      accent: 'bg-gradient-to-r from-gold-500 via-brand-500 to-dark-800'
    };
    
    return gradientMap[type];
  };
  
  return {
    colors: themeColors,
    getThemeClass,
    getGradientClass,
    colorClasses,
    isDark: theme === 'dark',
  };
};

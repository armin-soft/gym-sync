
// سیستم مدیریت رنگی مرکزی

export const brandColors = {
  // رنگ‌های اصلی
  primary: {
    DEFAULT: '#ea7500', // نارنجی اصلی
    50: '#fef7f0',
    100: '#fdeee0',
    200: '#fad6b8',
    300: '#f6b885',
    400: '#f1934f',
    500: '#ea7500',
    600: '#d65800',
    700: '#b54700',
    800: '#94380a',
    900: '#7a2e0b',
    950: '#421605',
  },
  
  secondary: {
    DEFAULT: '#f59e0b', // طلایی اصلی
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  dark: {
    DEFAULT: '#212529', // مشکی اصلی
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#1a1d20',
    950: '#0f1114',
  },
};

export const gradients = {
  primary: 'linear-gradient(135deg, #ea7500 0%, #f59e0b 100%)',
  primaryReverse: 'linear-gradient(135deg, #f59e0b 0%, #ea7500 100%)',
  dark: 'linear-gradient(135deg, #212529 0%, #343a40 100%)',
  darkLight: 'linear-gradient(135deg, #343a40 0%, #495057 100%)',
  accent: 'linear-gradient(135deg, #f59e0b 0%, #ea7500 50%, #212529 100%)',
};

export const semanticColors = {
  success: '#36b366',
  warning: '#f59e0b',
  error: '#dc2626',
  info: '#3b82f6',
};

// تابع‌های کمکی برای استفاده از رنگ‌ها
export const getColorWithOpacity = (color: string, opacity: number) => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

export const getBrandColor = (variant: 'primary' | 'secondary' | 'dark', shade?: keyof typeof brandColors.primary) => {
  if (shade) {
    return brandColors[variant][shade];
  }
  return brandColors[variant].DEFAULT;
};

export const getGradient = (type: keyof typeof gradients) => {
  return gradients[type];
};

// کلاس‌های CSS آماده
export const colorClasses = {
  // پس‌زمینه
  bgPrimary: 'bg-brand-500',
  bgSecondary: 'bg-gold-500',
  bgDark: 'bg-dark-800',
  
  // متن
  textPrimary: 'text-brand-500',
  textSecondary: 'text-gold-500',
  textDark: 'text-dark-800',
  
  // بوردر
  borderPrimary: 'border-brand-500',
  borderSecondary: 'border-gold-500',
  borderDark: 'border-dark-800',
  
  // گرادیان‌ها
  gradientPrimary: 'bg-gradient-to-r from-brand-500 to-gold-500',
  gradientDark: 'bg-gradient-to-r from-dark-800 to-dark-700',
  gradientAccent: 'bg-gradient-to-r from-gold-500 via-brand-500 to-dark-800',
};

export default {
  brandColors,
  gradients,
  semanticColors,
  getColorWithOpacity,
  getBrandColor,
  getGradient,
  colorClasses,
};

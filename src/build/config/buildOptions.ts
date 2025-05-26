
// تنظیمات ساخت پروژه
export const buildOptions = {
  outDir: 'dist',
  assetsDir: 'Assets',
  // افزایش محدودیت هشدار برای کاهش سر و صدا در هنگام ساخت
  chunkSizeWarningLimit: 1500, // افزایش به 1.5MB
  // رفع مشکل رزولوشن URL الگو
  assetsInlineLimit: 0,
  // فعال کردن تقسیم کد CSS
  cssCodeSplit: true,
  // گزینه‌های کوچک‌سازی
  minify: 'terser' as const,
  terserOptions: {
    compress: {
      drop_console: false, // فعلاً برای دیباگ، لاگ‌ها را حفظ می‌کنیم
      drop_debugger: true,
      pure_funcs: ['console.log'], // حذف console.log در تولید
      passes: 2 // دو پاس کوچک‌سازی برای بهبود
    },
    mangle: {
      safari10: true // سازگاری با Safari قدیمی
    }
  },
  // فعال کردن source maps برای تولید (می‌تواند برای کاهش حجم غیرفعال شود)
  sourcemap: false,
  // تنظیمات rollup - ساده‌سازی شده
  rollupOptions: {
    output: {
      // تقسیم‌بندی chunk ها با نام‌گذاری ثابت
      manualChunks: {
        // کتابخانه‌های اصلی React
        'react-vendor': ['react', 'react-dom'],
        // React Router
        'router': ['react-router-dom'],
        // UI کامپوننت‌ها
        'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 'framer-motion'],
        // کتابخانه‌های PDF
        'pdf-vendor': ['pdfmake'],
        // سایر کتابخانه‌های vendor
        'vendor': ['@tanstack/react-query', 'date-fns', 'zod', 'uuid']
      },
      // استفاده از نام‌های ثابت برای فایل‌های اصلی
      entryFileNames: (chunkInfo) => {
        const facadeModuleId = chunkInfo.facadeModuleId;
        if (facadeModuleId?.includes('main.tsx')) {
          return 'Assets/Script/index.js';
        }
        return 'Assets/Script/[name].js';
      },
      chunkFileNames: (chunkInfo) => {
        // استفاده از نام‌های قابل پیش‌بینی برای chunk های مهم
        if (chunkInfo.name?.includes('react-vendor')) {
          return 'Assets/Script/react-vendor.js';
        }
        if (chunkInfo.name?.includes('pdf-vendor')) {
          return 'Assets/Script/pdf-vendor.js';
        }
        if (chunkInfo.name?.includes('ui-vendor')) {
          return 'Assets/Script/ui-vendor.js';
        }
        return 'Assets/Script/[name].js';
      },
      assetFileNames: (assetInfo) => {
        const info = assetInfo.name || '';
        
        // برای فایل‌های CSS
        if (info.endsWith('.css')) {
          if (info.includes('index')) {
            return 'Assets/Style/index.css';
          }
          return 'Assets/Style/[name].[ext]';
        }
        
        // برای فایل‌های تصویر
        if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
          return 'Assets/Image/[name][extname]';
        }
        
        // برای سایر فایل‌ها
        return 'Assets/[name][extname]';
      }
    }
  }
};

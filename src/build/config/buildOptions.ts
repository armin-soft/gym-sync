
// تنظیمات ساخت پروژه
export const buildOptions = {
  outDir: 'dist',
  assetsDir: 'Assets',
  // افزایش محدودیت هشدار برای کاهش سر و صدا در هنگام ساخت
  chunkSizeWarningLimit: 1500, // افزایش به 1.5MB
  // رفع مشکل رزولوشن URL الگو
  assetsInlineLimit: 0,
  // فعال کردن تقسیم کد CSS
  cssCodeSplit: false, // غیرفعال کردن برای تولید یک فایل CSS
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
      // تقسیم‌بندی chunk ها برای بهینه‌سازی - ساده‌سازی شده
      manualChunks: {
        // کتابخانه‌های اصلی React
        'react': ['react', 'react-dom', 'react-router-dom'],
        
        // کامپوننت‌های UI
        'ui': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-tabs'],
        
        // PDF و انیمیشن
        'pdf': ['pdfmake'],
        'animation': ['framer-motion'],
        
        // ابزارها
        'utils': ['date-fns', 'uuid', 'zod', 'clsx'],
        
        // سایر کتابخانه‌ها
        'vendors': ['@tanstack/react-query', 'recharts']
      },
      entryFileNames: 'Assets/Script/[name].js',
      chunkFileNames: 'Assets/Script/[name].js',
      assetFileNames: (assetInfo: { name?: string; type?: string }) => {
        if (assetInfo.name?.endsWith('.css')) {
          return 'Assets/Style/Menu.css';
        }
        return 'Assets/[name].[ext]';
      }
    }
  }
};


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
      // ساده‌سازی تقسیم‌بندی chunk ها
      manualChunks: {
        // کتابخانه‌های اصلی React
        'react-vendor': ['react', 'react-dom'],
        // React Router
        'router': ['react-router-dom'],
        // UI کامپوننت‌ها
        'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 'framer-motion'],
        // کتابخانه‌های PDF
        'pdf-vendor': ['pdfmake', 'jspdf'],
        // سایر کتابخانه‌های vendor
        'vendor': ['@tanstack/react-query', 'date-fns', 'zod', 'uuid']
      },
      entryFileNames: 'Assets/Script/[name].js',
      chunkFileNames: 'Assets/Script/[name].js',
      assetFileNames: (assetInfo: { name?: string; type?: string }) => {
        if (assetInfo.name?.endsWith('.css')) {
          return 'Assets/Style/[name].[ext]';
        }
        return 'Assets/[name].[ext]';
      }
    }
  }
};

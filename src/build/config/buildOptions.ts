
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
  // تنظیمات rollup - یکبار تعریف شده
  rollupOptions: {
    output: {
      // تقسیم‌بندی chunk ها برای بهینه‌سازی
      manualChunks: {
        'Utils': ['src/lib/utils'],
        'Vendors': ['react', 'react-dom', '@tanstack/react-query'],
        'Animation': ['framer-motion'],
        'PDF-Core': ['jspdf'],
        'PDF-Fonts': ['pdfmake'],
        'PDF-Export': ['jspdf-autotable'],
        'UI': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        'Routing': ['react-router-dom'],
        'Data-Management': ['zod', '@hookform/resolvers'],
        'Page-Exercises': ['src/pages/exercises'],
        'Feature-Exercises': ['src/components/exercises'],
        'Page-Index': ['src/pages/Index'],
        'Page-Students': ['src/pages/students'],
        'Feature-Nutrition': ['src/components/nutrition'],
        'Page-Diet': ['src/pages/diet'],
        'Page-Supplements': ['src/pages/supplements'],
        'Page-Trainer': ['src/pages/trainer'],
        'Page-Backup': ['src/pages/backup'],
        'Page-Student-program': ['src/pages/student-program'],
        'Page-Student-history': ['src/pages/student-history'],
        'React': ['react', 'react-dom']
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

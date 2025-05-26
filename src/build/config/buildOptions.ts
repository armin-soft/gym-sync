
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
      // تقسیم‌بندی chunk ها برای بهینه‌سازی - اصلاح شده برای رفع خطای build
      manualChunks: (id: string) => {
        // کتابخانه‌های اصلی React
        if (id.includes('node_modules/react/') || 
            id.includes('node_modules/react-dom/') || 
            id.includes('node_modules/scheduler/')) {
          return 'React';
        }
        
        // React Router و مرتبط‌ها
        if (id.includes('node_modules/react-router') || 
            id.includes('node_modules/@remix-run')) {
          return 'Routing';
        }
        
        // کامپوننت‌های UI - Radix UI, shadcn
        if (id.includes('node_modules/@radix-ui/') || 
            id.includes('/components/ui/')) {
          return 'UI';
        }
        
        // کتابخانه‌های انیمیشن
        if (id.includes('framer-motion') || 
            id.includes('animation') || 
            id.includes('gsap')) {
          return 'Animation';
        }
        
        // تقسیم بهتر کتابخانه‌های PDF - جداسازی pdfmake
        if (id.includes('node_modules/pdfmake/build/pdfmake')) {
          return 'PDF-Core';
        }
        
        if (id.includes('node_modules/pdfmake/build/vfs_fonts')) {
          return 'PDF-Fonts';
        }
        
        if (id.includes('jspdf') || 
            id.includes('pdf-lib') || 
            id.includes('pdfmake')) {
          return 'PDF-Export';
        }
        
        // مدیریت داده (Tanstack Query)
        if (id.includes('@tanstack/react-query')) {
          return 'Data-Management';
        }
        
        // کتابخانه‌های ابزاری - حذف مسیر خاص src/lib/utils
        if (id.includes('node_modules/date-fns') || 
            id.includes('node_modules/uuid') || 
            id.includes('node_modules/zod') ||
            id.includes('node_modules/clsx') ||
            id.includes('node_modules/class-variance-authority') ||
            id.includes('node_modules/tailwind-merge')) {
          return 'Utils';
        }
        
        // تقسیم کد بر اساس قابلیت‌ها برای کد برنامه
        if (id.includes('/src/pages/')) {
          const page = id.split('/src/pages/')[1].split('/')[0];
          // ایجاد نام با حرف اول بزرگ
          const capitalizedPage = page.charAt(0).toUpperCase() + page.slice(1);
          return `Page-${capitalizedPage}`;
        }
        
        if (id.includes('/src/components/exercises/')) {
          return 'Feature-Exercises';
        }
        
        if (id.includes('/src/components/students/')) {
          return 'Feature-Students';
        }
        
        if (id.includes('/src/components/diet/') || 
            id.includes('/src/components/nutrition/')) {
          return 'Feature-Nutrition';
        }
        
        // جداسازی ماژول‌های PDF داخلی
        if (id.includes('/src/lib/utils/pdf-export/')) {
          return 'PDF-Export';
        }
        
        // سایر node_modules
        if (id.includes('node_modules/')) {
          return 'Vendors';
        }
        
        // کد اصلی برنامه (همه موارد دیگر شامل src/lib/utils)
        return 'App';
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

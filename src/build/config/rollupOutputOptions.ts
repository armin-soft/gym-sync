
// تنظیمات خروجی برای rollup
export const rollupOutputOptions = {
  // تنظیم ساختار خروجی
  entryFileNames: 'Assets/Script/[name].js',
  chunkFileNames: 'Assets/Script/[name].js',
  assetFileNames: (assetInfo: { name?: string }) => {
    const info = assetInfo.name || '';
    
    // برای فایل‌های CSS
    if (info.endsWith('.css')) {
      return 'Assets/Style/Menu.css';
    }
    
    // برای فایل‌های تصویر
    if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
      return 'Assets/Image/[name][extname]';
    }
    
    // برای سایر فایل‌ها
    return 'Assets/[name][extname]';
  },
  // استراتژی تقسیم کد به چانک‌های بهینه‌تر
  manualChunks: (id: string) => {
    // رفع مشکل .tsx.js - حذف .tsx از نام چانک‌ها
    const cleanId = id.replace(/\.tsx$/, '');
    
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
    
    // کتابخانه‌های نمودار
    if (id.includes('recharts') || 
        id.includes('chart.js') || 
        id.includes('d3')) {
      return 'Charts';
    }
    
    // تولید PDF
    if (id.includes('jspdf') || 
        id.includes('pdf-lib') || 
        id.includes('pdfmake')) {
      return 'PDF';
    }
    
    // کتابخانه‌های انیمیشن
    if (id.includes('framer-motion') || 
        id.includes('animation') || 
        id.includes('gsap')) {
      return 'Animation';
    }
    
    // مدیریت داده (Tanstack Query)
    if (id.includes('@tanstack/react-query')) {
      return 'Data-Management';
    }
    
    // کتابخانه‌های ابزاری
    if (id.includes('node_modules/date-fns') || 
        id.includes('node_modules/uuid') || 
        id.includes('node_modules/zod') ||
        id.includes('node_modules/clsx')) {
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
    
    // سایر node_modules
    if (id.includes('node_modules/')) {
      return 'Vendors';
    }
    
    // کد اصلی برنامه (همه موارد دیگر)
    return 'App';
  }
};

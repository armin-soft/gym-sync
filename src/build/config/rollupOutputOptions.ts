
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
  }
  // حذف manualChunks از اینجا تا از تداخل جلوگیری شود
};

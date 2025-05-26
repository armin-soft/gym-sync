
// تنظیمات خروجی برای rollup - ساده‌سازی شده
export const rollupOutputOptions = {
  // تنظیم ساختار خروجی
  entryFileNames: 'Assets/Script/[name].js',
  chunkFileNames: 'Assets/Script/[name].js',
  assetFileNames: (assetInfo: { name?: string }) => {
    const info = assetInfo.name || '';
    
    // برای فایل‌های CSS
    if (info.endsWith('.css')) {
      return 'Assets/Style/[name].[ext]';
    }
    
    // برای فایل‌های تصویر
    if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
      return 'Assets/Image/[name][extname]';
    }
    
    // برای سایر فایل‌ها
    return 'Assets/[name][extname]';
  }
};


// تنظیمات خروجی برای rollup - بهینه‌شده برای نسخه 3.3.7
export const rollupOutputOptions = {
  // تنظیم ساختار خروجی بهینه
  entryFileNames: 'assets/index.js',
  chunkFileNames: 'assets/[name].js',
  assetFileNames: (assetInfo: { name?: string }) => {
    const info = assetInfo.name || '';
    
    // برای فایل‌های CSS
    if (info.endsWith('.css')) {
      return 'assets/index.css';
    }
    
    // برای فایل‌های تصویر
    if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
      return 'assets/images/[name].[ext]';
    }
    
    // برای فونت‌ها
    if (info.match(/\.(woff|woff2|ttf|eot)$/)) {
      return 'assets/fonts/[name].[ext]';
    }
    
    // برای سایر فایل‌ها
    return 'assets/[name].[ext]';
  }
};

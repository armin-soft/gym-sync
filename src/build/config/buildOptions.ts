
// تنظیمات ساخت پروژه - بهینه‌شده برای نسخه 3.3.7
export const buildOptions = {
  outDir: 'dist',
  assetsDir: 'assets',
  chunkSizeWarningLimit: 1500,
  assetsInlineLimit: 0,
  cssCodeSplit: false,
  minify: 'terser' as const,
  terserOptions: {
    compress: {
      drop_console: false,
      drop_debugger: true,
      pure_funcs: [],
      passes: 2
    },
    mangle: {
      safari10: true
    }
  },
  sourcemap: false,
  rollupOptions: {
    output: {
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
        
        // برای سایر فایل‌ها
        return 'assets/[name].[ext]';
      }
    }
  }
};


// تنظیمات ساخت پروژه - ساده‌شده برای نسخه 3.3.6
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
      pure_funcs: ['console.log'],
      passes: 2
    },
    mangle: {
      safari10: true
    }
  },
  sourcemap: false
};

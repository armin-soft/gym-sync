
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFilesPlugin } from './src/build/plugins/copyFilesPlugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        babel: {
          plugins: [
            ['@babel/plugin-transform-react-jsx', {
              runtime: 'automatic',
              importSource: 'react'
            }]
          ]
        }
      }),
      copyFilesPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8080,
      host: "::",
      open: false
    },
    build: {
      outDir: 'dist',
      assetsDir: 'Assets',
      chunkSizeWarningLimit: 2000,
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
          pure_funcs: mode === 'production' ? ['console.log'] : [],
          passes: 2
        },
        mangle: {
          safari10: true
        }
      },
      sourcemap: false,
      rollupOptions: {
        output: {
          // تنظیمات نام‌گذاری بدون hash
          entryFileNames: 'Scripts/Main-App.js',
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            const chunkName = facadeModuleId ? facadeModuleId.replace(/\.[^/.]+$/, '') : chunkInfo.name;
            const formattedName = chunkName
              .split(/[-_]/)
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join('-');
            return `Scripts/Components/${formattedName}.js`;
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name || '';
            
            // برای فایل‌های CSS با نام‌گذاری مناسب
            if (info.endsWith('.css')) {
              const cssName = info.replace('.css', '')
                .split(/[-_]/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join('-');
              return `Styles/${cssName}.css`;
            }
            
            // برای فایل‌های تصویر
            if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
              const imageName = info.replace(/\.[^/.]+$/, '')
                .split(/[-_]/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join('-');
              const ext = info.split('.').pop();
              return `Images/${imageName}.${ext}`;
            }
            
            // برای فونت‌ها
            if (info.match(/\.(woff|woff2|ttf|eot)$/)) {
              const fontName = info.replace(/\.[^/.]+$/, '')
                .split(/[-_]/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join('-');
              const ext = info.split('.').pop();
              return `Fonts/${fontName}.${ext}`;
            }
            
            // برای سایر فایل‌ها
            const fileName = info.replace(/\.[^/.]+$/, '')
              .split(/[-_]/)
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join('-');
            const ext = info.split('.').pop();
            return `Assets/${fileName}.${ext}`;
          },
          manualChunks: {
            'React-Core': ['react', 'react-dom'],
            'UI-Components': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-select',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast'
            ],
            'Router-Query': ['react-router-dom', '@tanstack/react-query'],
            'Utils-Libraries': ['framer-motion', 'lucide-react', 'date-fns', 'date-fns-jalali']
          }
        }
      }
    },
    publicDir: 'public'
  };
})

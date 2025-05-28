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
      chunkSizeWarningLimit: 1000, // کاهش حد هشدار
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
          manualChunks: (id) => {
            // بهینه‌سازی chunk splitting برای کاهش اندازه فایل اصلی
            
            // React و کتابخانه‌های اصلی
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'React-Core';
            }
            
            // Radix UI Components
            if (id.includes('node_modules/@radix-ui')) {
              return 'UI-Components';
            }
            
            // Router و Query
            if (id.includes('node_modules/react-router') || id.includes('node_modules/@tanstack/react-query')) {
              return 'Router-Query';
            }
            
            // Framer Motion
            if (id.includes('node_modules/framer-motion')) {
              return 'Animations';
            }
            
            // Lucide Icons
            if (id.includes('node_modules/lucide-react')) {
              return 'Icons';
            }
            
            // Date utilities
            if (id.includes('node_modules/date-fns')) {
              return 'Date-Utils';
            }
            
            // Form libraries
            if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/@hookform')) {
              return 'Forms';
            }
            
            // PDF و Canvas
            if (id.includes('node_modules/jspdf') || id.includes('node_modules/canvas') || id.includes('node_modules/html2canvas')) {
              return 'PDF-Canvas';
            }
            
            // Chart libraries
            if (id.includes('node_modules/recharts')) {
              return 'Charts';
            }
            
            // Other vendor libraries
            if (id.includes('node_modules/')) {
              return 'Vendor-Libs';
            }
            
            // صفحات اصلی
            if (id.includes('src/pages/')) {
              if (id.includes('src/pages/students')) {
                return 'Students-Pages';
              }
              if (id.includes('src/pages/exercises')) {
                return 'Exercises-Pages';
              }
              if (id.includes('src/pages/diet')) {
                return 'Diet-Pages';
              }
              if (id.includes('src/pages/supplements')) {
                return 'Supplements-Pages';
              }
              return 'Other-Pages';
            }
            
            // کامپوننت‌های بزرگ
            if (id.includes('src/components/students')) {
              return 'Students-Components';
            }
            if (id.includes('src/components/exercises')) {
              return 'Exercises-Components';
            }
            if (id.includes('src/components/diet')) {
              return 'Diet-Components';
            }
            if (id.includes('src/components/supplements')) {
              return 'Supplements-Components';
            }
            
            // سایر کامپوننت‌ها
            if (id.includes('src/components/')) {
              return 'UI-Components-Custom';
            }
            
            // Hooks و utilities
            if (id.includes('src/hooks/') || id.includes('src/lib/') || id.includes('src/utils/')) {
              return 'Utils-Hooks';
            }
          }
        }
      }
    },
    publicDir: 'public',
    // تنظیمات جدید Vite 6
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'framer-motion',
        'lucide-react'
      ]
    }
  };
})

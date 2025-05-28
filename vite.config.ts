
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
      chunkSizeWarningLimit: 500, // کاهش بیشتر حد هشدار
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
          // تنظیمات نام‌گذاری دقیق بدون hash
          entryFileNames: 'Scripts/Main-App.js',
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            const chunkName = facadeModuleId ? facadeModuleId.replace(/\.[^/.]+$/, '') : chunkInfo.name;
            
            // نام‌گذاری دقیق‌تر بر اساس محتوا
            if (chunkName.includes('React') || chunkInfo.name === 'React-Core') {
              return 'Scripts/Libraries/React-Core.js';
            }
            if (chunkName.includes('UI') || chunkInfo.name === 'UI-Components') {
              return 'Scripts/Libraries/UI-Components.js';
            }
            if (chunkName.includes('Router') || chunkInfo.name === 'Router-Query') {
              return 'Scripts/Libraries/Router-Query.js';
            }
            if (chunkName.includes('Animation') || chunkInfo.name === 'Animations') {
              return 'Scripts/Libraries/Framer-Motion.js';
            }
            if (chunkName.includes('Icon') || chunkInfo.name === 'Icons') {
              return 'Scripts/Libraries/Lucide-Icons.js';
            }
            if (chunkName.includes('Date') || chunkInfo.name === 'Date-Utils') {
              return 'Scripts/Utilities/Date-Functions.js';
            }
            if (chunkName.includes('Form') || chunkInfo.name === 'Forms') {
              return 'Scripts/Libraries/Form-Libraries.js';
            }
            if (chunkName.includes('PDF') || chunkInfo.name === 'PDF-Canvas') {
              return 'Scripts/Libraries/PDF-Canvas.js';
            }
            if (chunkName.includes('Chart') || chunkInfo.name === 'Charts') {
              return 'Scripts/Libraries/Recharts.js';
            }
            if (chunkName.includes('Vendor') || chunkInfo.name === 'Vendor-Libs') {
              return 'Scripts/Libraries/Other-Vendors.js';
            }
            if (chunkName.includes('Students') || chunkInfo.name.includes('Students')) {
              return 'Scripts/Pages/Students-Manager.js';
            }
            if (chunkName.includes('Exercise') || chunkInfo.name.includes('Exercise')) {
              return 'Scripts/Pages/Exercise-Manager.js';
            }
            if (chunkName.includes('Diet') || chunkInfo.name.includes('Diet')) {
              return 'Scripts/Pages/Diet-Manager.js';
            }
            if (chunkName.includes('Supplement') || chunkInfo.name.includes('Supplement')) {
              return 'Scripts/Pages/Supplement-Manager.js';
            }
            if (chunkName.includes('Utils') || chunkInfo.name === 'Utils-Hooks') {
              return 'Scripts/Utilities/Hooks-Utils.js';
            }
            if (chunkName.includes('Component') || chunkInfo.name.includes('Component')) {
              return 'Scripts/Components/Custom-Components.js';
            }
            if (chunkName.includes('Page') || chunkInfo.name.includes('Page')) {
              return 'Scripts/Pages/Other-Pages.js';
            }
            
            // نام پیش‌فرض
            const formattedName = chunkName
              .split(/[-_]/)
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join('-');
            return `Scripts/Components/${formattedName}.js`;
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name || '';
            
            // برای فایل‌های CSS با نام‌گذاری دقیق
            if (info.endsWith('.css')) {
              if (info.includes('index') || info.includes('main')) {
                return 'Styles/Main-App.css';
              }
              if (info.includes('component')) {
                return 'Styles/Components.css';
              }
              if (info.includes('page')) {
                return 'Styles/Pages.css';
              }
              
              const cssName = info.replace('.css', '')
                .split(/[-_]/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join('-');
              return `Styles/${cssName}.css`;
            }
            
            // برای فایل‌های تصویر با دسته‌بندی
            if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
              if (info.toLowerCase().includes('logo')) {
                return `Images/Branding/${info}`;
              }
              if (info.toLowerCase().includes('avatar') || info.toLowerCase().includes('profile')) {
                return `Images/Profiles/${info}`;
              }
              if (info.toLowerCase().includes('icon')) {
                return `Images/Icons/${info}`;
              }
              if (info.toLowerCase().includes('background') || info.toLowerCase().includes('bg')) {
                return `Images/Backgrounds/${info}`;
              }
              
              return `Images/General/${info}`;
            }
            
            // برای فونت‌ها با دسته‌بندی
            if (info.match(/\.(woff|woff2|ttf|eot)$/)) {
              if (info.toLowerCase().includes('vazir')) {
                return `Fonts/Vazir/${info}`;
              }
              if (info.toLowerCase().includes('noto')) {
                return `Fonts/Noto/${info}`;
              }
              
              return `Fonts/Other/${info}`;
            }
            
            // برای سایر فایل‌ها
            const fileName = info.replace(/\.[^/.]+$/, '')
              .split(/[-_]/)
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join('-');
            const ext = info.split('.').pop();
            return `Assets/Other/${fileName}.${ext}`;
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

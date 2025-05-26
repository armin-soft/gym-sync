
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
      assetsDir: 'assets',
      chunkSizeWarningLimit: 800, // کاهش حد هشدار
      assetsInlineLimit: 0,
      cssCodeSplit: true, // فعال‌سازی تقسیم CSS
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
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/[name].[hash].css';
            }
            if (assetInfo.name?.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
              return 'assets/images/[name].[ext]';
            }
            return 'assets/[name].[hash].[ext]';
          },
          // تقسیم‌بندی دستی chunk ها برای بهینه‌سازی
          manualChunks: {
            // کتابخانه‌های اصلی React
            'react-vendor': ['react', 'react-dom'],
            
            // کتابخانه‌های UI
            'ui-vendor': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-select',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast',
              '@radix-ui/react-popover',
              '@radix-ui/react-accordion'
            ],
            
            // کتابخانه‌های روتینگ و حالت
            'router-vendor': ['react-router-dom', '@tanstack/react-query'],
            
            // کتابخانه‌های انیمیشن و آیکون
            'animation-vendor': ['framer-motion', 'lucide-react'],
            
            // کتابخانه‌های PDF و چارت
            'utility-vendor': ['pdfmake', 'jspdf', 'recharts', 'date-fns', 'date-fns-jalali'],
            
            // کامپوننت‌های صفحات اصلی
            'pages': [
              'src/pages/Index.tsx',
              'src/pages/students.tsx',
              'src/pages/exercises.tsx',
              'src/pages/diet/index.tsx',
              'src/pages/supplements/index.tsx',
              'src/pages/trainer.tsx',
              'src/pages/backup.tsx'
            ],
            
            // کامپوننت‌های دانش‌آموز
            'students': [
              'src/components/students/StudentCard.tsx',
              'src/components/students/StudentDialog.tsx',
              'src/components/students/StudentForm.tsx'
            ],
            
            // کامپوننت‌های تمرین
            'exercises': [
              'src/components/exercises/ExerciseCard.tsx',
              'src/components/exercises/ExerciseDialog.tsx',
              'src/components/exercises/ExerciseTable.tsx'
            ]
          }
        }
      }
    },
    publicDir: 'public'
  };
})

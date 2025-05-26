
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
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/[name]-[hash].css';
            }
            if (assetInfo.name?.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
              return 'assets/images/[name].[ext]';
            }
            return 'assets/[name]-[hash].[ext]';
          },
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-ui': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-select',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast'
            ],
            'vendor-router': ['react-router-dom', '@tanstack/react-query'],
            'vendor-utils': ['framer-motion', 'lucide-react', 'date-fns', 'date-fns-jalali']
          }
        }
      }
    },
    publicDir: 'public'
  };
})

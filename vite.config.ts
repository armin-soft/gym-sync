
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFilesPlugin } from './src/build/plugins/copyFilesPlugin'
import { buildOptions } from './src/build/config/buildOptions'

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
    ].filter(Boolean),
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
      ...buildOptions,
      // حذف تنظیمات experimental که باعث مشکل می‌شود
      rollupOptions: {
        output: {
          entryFileNames: 'Assets/Script/[name].js',
          chunkFileNames: 'Assets/Script/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'Assets/Style/[name].[ext]';
            }
            return 'Assets/[name].[ext]';
          },
          manualChunks: buildOptions.rollupOptions?.output?.manualChunks
        }
      }
    }
  };
})

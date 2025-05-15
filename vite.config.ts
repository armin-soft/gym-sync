
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFilesPlugin } from './src/build/plugins/copyFilesPlugin'
import { buildOptions } from './src/build/config/buildOptions'
import { rollupOutputOptions } from './src/build/config/rollupOutputOptions'
import { componentTagger } from 'lovable-tagger'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // تنظیمات ساخت را با گزینه‌های rollup ترکیب می‌کنیم
  const buildWithRollupOptions = {
    ...buildOptions,
    rollupOptions: {
      output: rollupOutputOptions
    }
  };

  return {
    plugins: [
      react({
        // رفع هشدار useLayoutEffect در React 18 در SSR/build
        jsxRuntime: 'automatic',
        babel: {
          // افزودن این مورد برای رفع خطای useLayoutEffect
          plugins: [
            ['@babel/plugin-transform-react-jsx', {
              runtime: 'automatic',
              importSource: 'react'
            }]
          ]
        }
      }),
      mode === 'development' && componentTagger(),
      copyFilesPlugin()
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8080,
      host: "::"
    },
    build: buildWithRollupOptions
  };
})

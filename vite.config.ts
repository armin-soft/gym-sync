
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFilesPlugin } from './src/build/plugins/copyFilesPlugin'
import { buildOptions } from './src/build/config/buildOptions'
import { rollupOutputOptions } from './src/build/config/rollupOutputOptions'

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
      ...buildOptions,
      rollupOptions: {
        output: {
          ...rollupOutputOptions,
          // اطمینان از دسترسی به React در chunks
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
          }
        },
        external: [],
        // اطمینان از صحیح bundling شدن React
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
          }
          warn(warning);
        }
      }
    },
    publicDir: 'public',
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'framer-motion',
        'lucide-react'
      ],
      // جلوگیری از خطاهای useLayoutEffect
      force: true
    },
    define: {
      // اطمینان از دسترسی جهانی React
      global: 'globalThis',
      // اضافه کردن React به global scope
      'process.env.NODE_ENV': JSON.stringify(mode),
      // تعریف React hooks به صورت global
      'globalThis.React': 'React'
    },
    esbuild: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      loader: 'tsx'
    }
  };
})

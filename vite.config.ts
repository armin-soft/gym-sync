import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { componentTagger } from 'lovable-tagger'

// Custom plugin to handle file copying
const copyFilesPlugin = () => {
  return {
    name: 'copy-files',
    closeBundle: () => {
      // Ensure directories exist
      if (!fs.existsSync('dist/Assets')) {
        fs.mkdirSync('dist/Assets', { recursive: true });
      }
      if (!fs.existsSync('dist/Assets/Image')) {
        fs.mkdirSync('dist/Assets/Image', { recursive: true });
      }

      // Copy Manifest.json from src to the root of dist, avoiding duplication
      if (fs.existsSync('src/Manifest.json')) {
        fs.copyFileSync('src/Manifest.json', 'dist/Manifest.json');
        console.log('Copied Manifest.json from src to dist root');
      } else if (fs.existsSync('public/Manifest.json')) {
        fs.copyFileSync('public/Manifest.json', 'dist/Manifest.json');
        console.log('Copied Manifest.json from public to dist root');
      }

      // Copy service-worker.js to the root of dist
      if (fs.existsSync('service-worker.js')) {
        fs.copyFileSync('service-worker.js', 'dist/service-worker.js');
        console.log('Copied service-worker.js to dist root');
      }

      // Copy Logo.ico to Assets/Image if it exists
      if (fs.existsSync('src/Logo.ico')) {
        fs.copyFileSync('src/Logo.ico', 'dist/Assets/Image/Logo.ico');
      }
      
      // Copy Logo.png to Assets/Image
      if (fs.existsSync('src/Logo.png')) {
        fs.copyFileSync('src/Logo.png', 'dist/Assets/Image/Logo.png');
      } else if (fs.existsSync('public/Assets/Image/Logo.png')) {
        // Ensure destination directory exists
        fs.mkdirSync('dist/Assets/Image', { recursive: true });
        fs.copyFileSync('public/Assets/Image/Logo.png', 'dist/Assets/Image/Logo.png');
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Fixing React 18 useLayoutEffect warning in SSR/build
      jsxRuntime: 'automatic',
      babel: {
        // Add this to fix the useLayoutEffect error
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
    port: 8080
  },
  build: {
    outDir: 'dist',
    assetsDir: 'Assets',
    // Increase the warning limit to reduce noise during build
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Customize the output structure
        entryFileNames: 'Assets/Script/[name]-[hash].js',
        chunkFileNames: 'Assets/Script/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Handle different asset types
          const info = assetInfo.name || '';
          
          // For CSS files
          if (info.endsWith('.css')) {
            return 'Assets/Style/Menu-[hash].css';
          }
          
          // For image files
          if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
            return 'Assets/Image/[name]-[hash][extname]';
          }
          
          // For other files
          return 'Assets/[name]-[hash][extname]';
        },
        // Improved manual chunks strategy to better split code
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/scheduler/')) {
            return 'react-core';
          }
          
          // React Router and related
          if (id.includes('node_modules/react-router') || 
              id.includes('node_modules/@remix-run')) {
            return 'routing';
          }
          
          // UI Components - Radix UI, shadcn
          if (id.includes('node_modules/@radix-ui/') || 
              id.includes('/components/ui/')) {
            return 'ui-components';
          }
          
          // Chart libraries
          if (id.includes('recharts') || 
              id.includes('chart.js') || 
              id.includes('d3')) {
            return 'charts';
          }
          
          // PDF generation
          if (id.includes('jspdf') || 
              id.includes('pdf-lib') || 
              id.includes('pdfmake')) {
            return 'pdf';
          }
          
          // Animation libraries
          if (id.includes('framer-motion') || 
              id.includes('animation') || 
              id.includes('gsap')) {
            return 'animations';
          }
          
          // Data management (Tanstack Query)
          if (id.includes('@tanstack/react-query')) {
            return 'data-management';
          }
          
          // Utils libraries
          if (id.includes('node_modules/date-fns') || 
              id.includes('node_modules/uuid') || 
              id.includes('node_modules/zod') ||
              id.includes('node_modules/clsx')) {
            return 'utils';
          }
          
          // Feature-based code splitting for app code
          if (id.includes('/src/pages/')) {
            const page = id.split('/src/pages/')[1].split('/')[0];
            return `page-${page}`;
          }
          
          if (id.includes('/src/components/exercises/')) {
            return 'feature-exercises';
          }
          
          if (id.includes('/src/components/students/')) {
            return 'feature-students';
          }
          
          if (id.includes('/src/components/diet/') || 
              id.includes('/src/components/nutrition/')) {
            return 'feature-nutrition';
          }
          
          // Other node_modules
          if (id.includes('node_modules/')) {
            return 'vendors';
          }
          
          // Main app code (everything else)
          return 'app';
        },
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Enable source maps for production (can be disabled to reduce size)
    sourcemap: false
  },
}))

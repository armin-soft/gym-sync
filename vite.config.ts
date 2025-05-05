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
      try {
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

        // Copy Service-Worker.js to the root of dist
        if (fs.existsSync('Service-Worker.js')) {
          fs.copyFileSync('Service-Worker.js', 'dist/Service-Worker.js');
          console.log('Copied Service-Worker.js to dist root');
        }

        // Copy Logo.png to Assets/Image
        if (fs.existsSync('src/Logo.png')) {
          fs.copyFileSync('src/Logo.png', 'dist/Assets/Image/Logo.png');
          console.log('Copied Logo.png from src to dist/Assets/Image');
        } else if (fs.existsSync('public/Assets/Image/Logo.png')) {
          fs.copyFileSync('public/Assets/Image/Logo.png', 'dist/Assets/Image/Logo.png');
          console.log('Copied Logo.png from public to dist/Assets/Image');
        }
        
        console.log('All files copied successfully!');
      } catch (error) {
        console.error('Error during file copying:', error);
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
    // Fix pattern URL resolution issue
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Customize the output structure
        entryFileNames: 'Assets/Script/[name].js',
        chunkFileNames: 'Assets/Script/[name].js',
        assetFileNames: (assetInfo) => {
          // Handle different asset types
          const info = assetInfo.name || '';
          
          // For CSS files
          if (info.endsWith('.css')) {
            return 'Assets/Style/Menu.css';
          }
          
          // For image files
          if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
            return 'Assets/Image/[name][extname]';
          }
          
          // For other files
          return 'Assets/[name][extname]';
        },
        // Improved manual chunks strategy to better split code
        manualChunks: (id) => {
          // Fix for the .tsx.js issue - strip the .tsx from chunk names
          const cleanId = id.replace(/\.tsx$/, '');
          
          // Core React libraries
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/scheduler/')) {
            return 'React';
          }
          
          // React Router and related
          if (id.includes('node_modules/react-router') || 
              id.includes('node_modules/@remix-run')) {
            return 'Routing';
          }
          
          // UI Components - Radix UI, shadcn
          if (id.includes('node_modules/@radix-ui/') || 
              id.includes('/components/ui/')) {
            return 'UI';
          }
          
          // Chart libraries
          if (id.includes('recharts') || 
              id.includes('chart.js') || 
              id.includes('d3')) {
            return 'Charts';
          }
          
          // PDF generation
          if (id.includes('jspdf') || 
              id.includes('pdf-lib') || 
              id.includes('pdfmake')) {
            return 'PDF';
          }
          
          // Animation libraries
          if (id.includes('framer-motion') || 
              id.includes('animation') || 
              id.includes('gsap')) {
            return 'Animation';
          }
          
          // Data management (Tanstack Query)
          if (id.includes('@tanstack/react-query')) {
            return 'Data-Management';
          }
          
          // Utils libraries
          if (id.includes('node_modules/date-fns') || 
              id.includes('node_modules/uuid') || 
              id.includes('node_modules/zod') ||
              id.includes('node_modules/clsx')) {
            return 'Utils';
          }
          
          // Feature-based code splitting for app code
          if (id.includes('/src/pages/')) {
            const page = id.split('/src/pages/')[1].split('/')[0];
            // ایجاد نام با حرف اول بزرگ
            const capitalizedPage = page.charAt(0).toUpperCase() + page.slice(1);
            return `Page-${capitalizedPage}`;
          }
          
          if (id.includes('/src/components/exercises/')) {
            return 'Feature-Exercises';
          }
          
          if (id.includes('/src/components/students/')) {
            return 'Feature-Students';
          }
          
          if (id.includes('/src/components/diet/') || 
              id.includes('/src/components/nutrition/')) {
            return 'Feature-Nutrition';
          }
          
          // Other node_modules
          if (id.includes('node_modules/')) {
            return 'Vendors';
          }
          
          // Main app code (everything else)
          return 'App';
        },
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // فعلاً برای دیباگ، لاگ‌ها را حفظ می‌کنیم
        drop_debugger: true
      }
    },
    // Enable source maps for production (can be disabled to reduce size)
    sourcemap: false
  },
}))

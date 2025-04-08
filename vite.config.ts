
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from 'fs';

// Create necessary directories for output structure
const createOutputDirectories = () => {
  const dirs = [
    'dist',
    'dist/Assets',
    'dist/Assets/Image',
    'dist/Assets/Scripts',
    'dist/Assets/Styles'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Create output directories
  createOutputDirectories();
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'Assets',
      minify: 'terser', 
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      },
      sourcemap: mode !== 'production',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name?.split('.').pop()?.toLowerCase();
            
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
              return './Assets/Image/[name].[ext]';
            }
            
            if (/css/i.test(extType || '')) {
              return './Assets/Styles/[name].[ext]';
            }
            
            return './Assets/[name].[ext]';
          },
          
          chunkFileNames: './Assets/Scripts/[name].js',
          entryFileNames: './Assets/Scripts/Main.js',
          
          manualChunks: {
            'React': ['react', 'react-dom'],
            'Animation': ['framer-motion'],
            'Charts': ['recharts'],
            'PDF': ['jspdf', 'html2canvas', 'jspdf-autotable'],
            'UI': ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-aspect-ratio', 
                  '@radix-ui/react-avatar', '@radix-ui/react-checkbox', '@radix-ui/react-collapsible', 
                  '@radix-ui/react-context-menu', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu',
                  '@radix-ui/react-hover-card', '@radix-ui/react-label', '@radix-ui/react-menubar',
                  '@radix-ui/react-navigation-menu', '@radix-ui/react-popover', '@radix-ui/react-progress',
                  '@radix-ui/react-radio-group', '@radix-ui/react-scroll-area', '@radix-ui/react-select',
                  '@radix-ui/react-separator', '@radix-ui/react-slider', '@radix-ui/react-slot',
                  '@radix-ui/react-switch', '@radix-ui/react-tabs', '@radix-ui/react-toast',
                  '@radix-ui/react-toggle', '@radix-ui/react-toggle-group', '@radix-ui/react-tooltip'],
            'Other': ['date-fns', 'clsx', 'zod']
          }
        }
      }
    },
    // Make sure Vite can handle static assets properly
    publicDir: 'public',
  };
});

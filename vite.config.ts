
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    assetsDir: 'Assets',
    minify: 'terser', // Use more aggressive minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true
      }
    },
    sourcemap: false, // Disable sourcemaps for production
    chunkSizeWarningLimit: 1000, // Increase the warning limit
    rollupOptions: {
      output: {
        // Define directory structure for assets with proper capitalized names
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop()?.toLowerCase();
          
          // Images - ensure all images go to Assets/Image with proper capitalization
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return 'Assets/Image/[name].[hash].[ext]'; // Add hash for better caching
          }
          
          // CSS files - capitalize first letter
          if (/css/i.test(extType || '')) {
            return 'Assets/Style/Style.[hash].[ext]'; // Add hash for better caching
          }
          
          // Default for other assets
          return 'Assets/[name].[hash].[ext]';
        },
        
        // Define directory structure for JS chunks with proper capitalization
        chunkFileNames: 'Assets/Script/[name]-Bundle.[hash].js',
        entryFileNames: 'Assets/Script/Main-Bundle.[hash].js',
        
        // Make filenames more descriptive with proper capitalization
        manualChunks: (id) => {
          // Optimize chunk splitting for better performance
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'Vendor-React';
            }
            if (id.includes('@radix-ui')) {
              return 'Vendor-Ui';
            }
            if (id.includes('recharts')) {
              return 'Vendor-Charts';
            }
            if (id.includes('date-fns') || id.includes('clsx') || id.includes('zod')) {
              return 'Vendor-Utils';
            }
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'Vendor-Pdf';
            }
            if (id.includes('framer-motion')) {
              return 'Vendor-Animation';
            }
            // Group remaining node_modules
            return 'Vendor-Other';
          }
        }
      }
    }
  }
}));

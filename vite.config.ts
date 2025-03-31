
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
    rollupOptions: {
      output: {
        // Define directory structure for assets with proper capitalized names
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop()?.toLowerCase();
          
          // Images - ensure all images go to Assets/Image with proper capitalization
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return 'Assets/Image/[name].[ext]';
          }
          
          // CSS files - capitalize first letter
          if (/css/i.test(extType || '')) {
            return 'Assets/Style/Style.[ext]';
          }
          
          // Default for other assets
          return 'Assets/[name].[ext]';
        },
        
        // Define directory structure for JS chunks with proper capitalization
        chunkFileNames: 'Assets/Script/[name]-Bundle.js',
        entryFileNames: 'Assets/Script/Main-Bundle.js',
        
        // Make filenames more descriptive with proper capitalization
        manualChunks: {
          'Vendor-React': ['react', 'react-dom'],
          'Vendor-Ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast'
          ],
          'Vendor-Charts': ['recharts'],
          'Vendor-Utils': ['date-fns', 'clsx', 'zod'],
          'Vendor-Pdf': ['jspdf', 'jspdf-autotable', 'html2canvas']
        }
      }
    }
  }
}));

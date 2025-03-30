
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Define directory structure for assets
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(1);
          
          // Images
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          
          // CSS files
          if (/css/i.test(extType)) {
            return 'assets/styles/[name]-[hash].[ext]';
          }
          
          // Default for other assets
          return 'assets/[name]-[hash].[ext]';
        },
        
        // Define directory structure for JS chunks
        chunkFileNames: 'assets/scripts/[name]-chunk-[hash].js',
        entryFileNames: 'assets/scripts/[name]-bundle-[hash].js',
        
        // Make filenames more descriptive
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast'
          ],
          'vendor-charts': ['recharts'],
          'vendor-utils': ['date-fns', 'clsx', 'zod'],
          'vendor-pdf': ['jspdf', 'jspdf-autotable', 'html2canvas']
        }
      }
    }
  }
}));

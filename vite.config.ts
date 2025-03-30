
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
    assetsDir: 'Assets',
    rollupOptions: {
      output: {
        // Define directory structure for assets without hash
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop()?.toLowerCase();
          
          // Images - ensure all images go to Assets/Image
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return 'Assets/Image/[name].[ext]';
          }
          
          // CSS files
          if (/css/i.test(extType || '')) {
            return 'Assets/Style/[name].[ext]';
          }
          
          // Default for other assets
          return 'Assets/[name].[ext]';
        },
        
        // Define directory structure for JS chunks without hash
        chunkFileNames: 'Assets/Script/[name]-Chunk.js',
        entryFileNames: 'Assets/Script/[name]-Bundle.js',
        
        // Make filenames more descriptive
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

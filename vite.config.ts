
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
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop()?.toLowerCase();
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return 'Assets/Images/[name].[ext]';
          }
          
          if (/css/i.test(extType || '')) {
            return 'Assets/Styles/[name].[ext]';
          }
          
          return 'Assets/[name].[ext]';
        },
        
        chunkFileNames: 'Assets/Scripts/[name].js',
        entryFileNames: 'Assets/Scripts/Main.js',
        
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'VendorReact';
            }
            if (id.includes('@radix-ui')) {
              return 'VendorUi';
            }
            if (id.includes('recharts')) {
              return 'VendorCharts';
            }
            if (id.includes('date-fns') || id.includes('clsx') || id.includes('zod')) {
              return 'VendorUtils';
            }
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'VendorPdf';
            }
            if (id.includes('framer-motion')) {
              return 'VendorAnimation';
            }
            return 'VendorOther';
          }
        }
      }
    }
  }
}));

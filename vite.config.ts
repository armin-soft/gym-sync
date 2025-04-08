
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
            return 'Assets/Image/[name].[ext]';
          }
          
          if (/css/i.test(extType || '')) {
            return 'Assets/Styles/[name].[ext]';
          }
          
          return 'Assets/[name].[ext]';
        },
        
        chunkFileNames: 'Assets/Scripts/[name].js',
        entryFileNames: 'Assets/Scripts/Main.js',
        
        manualChunks: {
          'React': ['react', 'react-dom'],
          'Animation': ['framer-motion'],
          'Charts': ['recharts'],
          'PDF': ['jspdf', 'html2canvas', 'jspdf-autotable'],
          'UI': ['@radix-ui'],
          'Other': ['date-fns', 'clsx', 'zod']
        }
      }
    }
  }
}));

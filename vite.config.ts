
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
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
    rollupOptions: {
      output: {
        entryFileNames: 'public/Assets/Script/[name].js',
        chunkFileNames: 'public/Assets/Script/[name].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return 'public/Assets/Image/[name][extname]';
          }
          
          if (/css/i.test(extType)) {
            return 'public/Assets/Style/[name][extname]';
          }
          
          if (/manifest\.json/i.test(assetInfo.name)) {
            return 'public/Assets/[name][extname]';
          }
          
          return 'public/Assets/[name][extname]';
        },
      },
    },
  },
}));

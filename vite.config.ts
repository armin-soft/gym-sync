
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

      // Copy Manifest.json directly to the root of dist, avoiding duplication
      if (fs.existsSync('src/Manifest.json')) {
        fs.copyFileSync('src/Manifest.json', 'dist/Manifest.json');
      }

      // Copy service-worker.js to the root
      if (fs.existsSync('dist/assets/src/service-worker.js')) {
        fs.copyFileSync('dist/assets/src/service-worker.js', 'dist/service-worker.js');
      }

      // Copy Logo.ico to Assets/Image if it exists
      if (fs.existsSync('src/Logo.ico')) {
        fs.copyFileSync('src/Logo.ico', 'dist/Assets/Image/Logo.ico');
      }
      
      // Create Logo.png in Assets/Image from src if it exists
      if (fs.existsSync('src/Logo.png')) {
        fs.copyFileSync('src/Logo.png', 'dist/Assets/Image/Logo.png');
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
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
        // Customize chunk names based on imports
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'React';
            }
            if (id.includes('chart') || id.includes('recharts')) {
              return 'Charts';
            }
            if (id.includes('pdf') || id.includes('jspdf')) {
              return 'PDF';
            }
            if (id.includes('framer-motion') || id.includes('animation')) {
              return 'Animation';
            }
            if (id.includes('@radix-ui') || id.includes('component')) {
              return 'UI';
            }
            return 'Other';
          }
          // Main application code
          return 'Main';
        },
      }
    },
  },
}))

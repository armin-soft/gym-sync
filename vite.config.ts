
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

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

      // Copy Manifest.json to the root
      if (fs.existsSync('dist/Assets/Manifest.json')) {
        fs.copyFileSync('dist/Assets/Manifest.json', 'dist/Manifest.json');
        fs.unlinkSync('dist/Assets/Manifest.json');
      }

      // Copy Service-Worker.js to the root
      if (fs.existsSync('dist/Assets/Script/Service-Worker.js')) {
        fs.copyFileSync('dist/Assets/Script/Service-Worker.js', 'dist/Service-Worker.js');
        fs.unlinkSync('dist/Assets/Script/Service-Worker.js');
      }

      // Copy Logo.ico and Logo.png to Assets/Image if they exist
      if (fs.existsSync('src/Logo.ico')) {
        fs.copyFileSync('src/Logo.ico', 'dist/Assets/Image/Logo.ico');
      }
      
      // Ensure Logo.png is in the right place
      if (fs.existsSync('public/Assets/Image/Logo.png')) {
        fs.copyFileSync('public/Assets/Image/Logo.png', 'dist/Assets/Image/Logo.png');
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyFilesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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
})

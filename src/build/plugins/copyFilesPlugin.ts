
import fs from 'fs';
import path from 'path';
import { rm } from 'fs/promises';

// پلاگین برای کپی فایل‌ها به پوشه dist و حذف پوشه src اضافی
export const copyFilesPlugin = () => {
  return {
    name: 'copy-files',
    closeBundle: async () => {
      try {
        // اطمینان از وجود پوشه‌ها
        if (!fs.existsSync('dist/Assets')) {
          fs.mkdirSync('dist/Assets', { recursive: true });
        }
        if (!fs.existsSync('dist/Assets/Image')) {
          fs.mkdirSync('dist/Assets/Image', { recursive: true });
        }
        if (!fs.existsSync('dist/Assets/Script')) {
          fs.mkdirSync('dist/Assets/Script', { recursive: true });
        }
        
        // کپی Manifest.json از src به ریشه dist، جلوگیری از تکرار
        if (fs.existsSync('src/Manifest.json')) {
          fs.copyFileSync('src/Manifest.json', 'dist/Manifest.json');
          console.log('Copied Manifest.json from src to dist root');
        } else if (fs.existsSync('public/Manifest.json')) {
          fs.copyFileSync('public/Manifest.json', 'dist/Manifest.json');
          console.log('Copied Manifest.json from public to dist root');
        }

        // کپی Service-Worker.js به dist root 
        fs.copyFileSync('Service-Worker.js', 'dist/Service-Worker.js');
        console.log('Copied Service-Worker.js to dist root');

        // کپی همچنین به مسیر Assets/Script
        fs.copyFileSync('Service-Worker.js', 'dist/Assets/Script/ServiceWorker.js');
        console.log('Copied Service-Worker.js to Assets/Script/ServiceWorker.js');
        
        // کپی Logo.png به Assets/Image
        if (fs.existsSync('src/Logo.png')) {
          fs.copyFileSync('src/Logo.png', 'dist/Assets/Image/Logo.png');
          console.log('Copied Logo.png from src to dist/Assets/Image');
        } else if (fs.existsSync('public/Assets/Image/Logo.png')) {
          fs.copyFileSync('public/Assets/Image/Logo.png', 'dist/Assets/Image/Logo.png');
          console.log('Copied Logo.png from public to dist/Assets/Image');
        }
        
        // کپی Offline.html برای حالت آفلاین
        if (fs.existsSync('public/Offline.html')) {
          fs.copyFileSync('public/Offline.html', 'dist/Offline.html');
          console.log('Copied Offline.html to dist root');
        }
        
        // حذف فایل Manifest اضافی در Assets
        const extraManifestPath = 'dist/Assets/Manifest.json';
        if (fs.existsSync(extraManifestPath)) {
          fs.unlinkSync(extraManifestPath);
          console.log('Removed duplicate Manifest.json from dist/Assets/');
        }

        console.log('All service worker files copied successfully!');
      } catch (error) {
        console.error('Error during file copying:', error);
      }
    },
  };
};

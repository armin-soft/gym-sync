
import fs from 'fs';
import path from 'path';
import { rm } from 'fs/promises';

// پلاگین برای کپی فایل‌ها به پوشه dist و حذف پوشه src اضافی
export const copyFilesPlugin = () => {
  return {
    name: 'copy-files',
    closeBundle: async () => {
      try {
        // اطمینان از وجود پوشه‌ها با حروف بزرگ اول (Pascal Case)
        if (!fs.existsSync('dist/Assets')) {
          fs.mkdirSync('dist/Assets', { recursive: true });
        }
        if (!fs.existsSync('dist/Assets/Image')) {
          fs.mkdirSync('dist/Assets/Image', { recursive: true });
        }
        if (!fs.existsSync('dist/Assets/Script')) {
          fs.mkdirSync('dist/Assets/Script', { recursive: true });
        }
        
        // ایجاد پوشه‌ها با حروف بزرگ برای سرویس ورکر
        if (!fs.existsSync('dist/Service-Worker')) {
          fs.mkdirSync('dist/Service-Worker', { recursive: true });
        }
        if (!fs.existsSync('dist/Service-Worker/Event-Handlers')) {
          fs.mkdirSync('dist/Service-Worker/Event-Handlers', { recursive: true });
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

        // کپی ماژول‌های سرویس ورکر اصلی با نام‌های جدید
        const serviceWorkerFiles = [
          { source: 'public/service-worker/cache-strategies.js', dest: 'dist/Service-Worker/Cache-Strategies.js' },
          { source: 'public/service-worker/config.js', dest: 'dist/Service-Worker/Config.js' },
          { source: 'public/service-worker/event-handlers.js', dest: 'dist/Service-Worker/Event-Handlers.js' },
          { source: 'public/service-worker/utils.js', dest: 'dist/Service-Worker/Utils.js' }
        ];
        
        // کپی فایل‌های event handler با نام‌های جدید
        const eventHandlerFiles = [
          { source: 'public/service-worker/event-handlers/activate-handler.js', dest: 'dist/Service-Worker/Event-Handlers/Activate-Handler.js' },
          { source: 'public/service-worker/event-handlers/fetch-handler.js', dest: 'dist/Service-Worker/Event-Handlers/Fetch-Handler.js' },
          { source: 'public/service-worker/event-handlers/install-handler.js', dest: 'dist/Service-Worker/Event-Handlers/Install-Handler.js' },
          { source: 'public/service-worker/event-handlers/message-handler.js', dest: 'dist/Service-Worker/Event-Handlers/Message-Handler.js' },
          { source: 'public/service-worker/event-handlers/sync-handler.js', dest: 'dist/Service-Worker/Event-Handlers/Sync-Handler.js' }
        ];
        
        // کپی فایل‌های سرویس ورکر اصلی
        for (const file of serviceWorkerFiles) {
          if (fs.existsSync(file.source)) {
            fs.copyFileSync(file.source, file.dest);
            console.log(`Copied service worker file: ${file.source} -> ${file.dest}`);
          } else {
            console.log(`Warning: Source file not found: ${file.source}`);
          }
        }
        
        // کپی فایل‌های event handler
        for (const file of eventHandlerFiles) {
          if (fs.existsSync(file.source)) {
            fs.copyFileSync(file.source, file.dest);
            console.log(`Copied event handler: ${file.source} -> ${file.dest}`);
          } else {
            console.log(`Warning: Source file not found: ${file.source}`);
          }
        }

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

        console.log('All service worker files copied successfully with proper casing!');
      } catch (error) {
        console.error('Error during file copying:', error);
      }
    },
  };
};

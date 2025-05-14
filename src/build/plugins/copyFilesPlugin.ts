
import fs from 'fs';
import path from 'path';

// پلاگین برای کپی فایل‌ها به پوشه dist
export const copyFilesPlugin = () => {
  return {
    name: 'copy-files',
    closeBundle: () => {
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
        // ایجاد پوشه برای service-worker با حروف بزرگ
        if (!fs.existsSync('dist/Assets/Script/ServiceWorker')) {
          fs.mkdirSync('dist/Assets/Script/ServiceWorker', { recursive: true });
        }

        // کپی Manifest.json از src به ریشه dist، جلوگیری از تکرار
        if (fs.existsSync('src/Manifest.json')) {
          fs.copyFileSync('src/Manifest.json', 'dist/Manifest.json');
          console.log('Copied Manifest.json from src to dist root');
        } else if (fs.existsSync('public/Manifest.json')) {
          fs.copyFileSync('public/Manifest.json', 'dist/Manifest.json');
          console.log('Copied Manifest.json from public to dist root');
        }

        // کپی Service-Worker.js با نام بزرگ
        if (fs.existsSync('Service-Worker.js')) {
          fs.copyFileSync('Service-Worker.js', 'dist/Service-Worker.js');
          // همچنین کپی به مسیر جدید
          fs.copyFileSync('Service-Worker.js', 'dist/Assets/Script/ServiceWorker.js');
          console.log('Copied Service-Worker.js to dist root and Assets/Script/ServiceWorker.js');
        }
        
        // کپی ماژول‌های سرویس ورکر با نام‌های بزرگ
        const serviceWorkerModules = [
          { source: 'cache-config.js', dest: 'CacheConfig.js' },
          { source: 'cache-strategies.js', dest: 'CacheStrategies.js' },
          { source: 'fetch-handler.js', dest: 'FetchHandler.js' },
          { source: 'message-handler.js', dest: 'MessageHandler.js' }
        ];
        
        for (const module of serviceWorkerModules) {
          const sourcePath = `src/service-worker/${module.source}`;
          // مسیر قدیمی برای سازگاری
          const oldDestPath = `dist/src/service-worker/${module.source}`;
          // مسیر جدید با نام بزرگ
          const newDestPath = `dist/Assets/Script/ServiceWorker/${module.dest}`;
          
          // ایجاد پوشه‌های لازم در مسیر قدیمی برای سازگاری
          const oldDir = path.dirname(oldDestPath);
          if (!fs.existsSync(oldDir)) {
            fs.mkdirSync(oldDir, { recursive: true });
          }
          
          if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, oldDestPath);
            fs.copyFileSync(sourcePath, newDestPath);
            console.log(`Copied ${module.source} to ${newDestPath}`);
          }
        }

        // کپی Logo.png به Assets/Image
        if (fs.existsSync('src/Logo.png')) {
          fs.copyFileSync('src/Logo.png', 'dist/Assets/Image/Logo.png');
          console.log('Copied Logo.png from src to dist/Assets/Image');
        } else if (fs.existsSync('public/Assets/Image/Logo.png')) {
          fs.copyFileSync('public/Assets/Image/Logo.png', 'dist/Assets/Image/Logo.png');
          console.log('Copied Logo.png from public to dist/Assets/Image');
        }
        
        // حذف فایل Manifest اضافی در Assets
        const extraManifestPath = 'dist/Assets/Manifest.json';
        if (fs.existsSync(extraManifestPath)) {
          fs.unlinkSync(extraManifestPath);
          console.log('Removed duplicate Manifest.json from dist/Assets/');
        }
        
        console.log('All files copied successfully!');
      } catch (error) {
        console.error('Error during file copying:', error);
      }
    },
  };
};

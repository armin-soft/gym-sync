
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
        // پوشه سرویس ورکر
        if (!fs.existsSync('dist/src/service-worker/core')) {
          fs.mkdirSync('dist/src/service-worker/core', { recursive: true });
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
        
        // کپی ماژول‌های سرویس ورکر
        const serviceWorkerFiles = [
          { source: 'src/service-worker/core/config.js', dest: 'dist/src/service-worker/core/config.js' },
          { source: 'src/service-worker/core/install.js', dest: 'dist/src/service-worker/core/install.js' },
          { source: 'src/service-worker/core/activate.js', dest: 'dist/src/service-worker/core/activate.js' },
          { source: 'src/service-worker/core/fetch.js', dest: 'dist/src/service-worker/core/fetch.js' },
          { source: 'src/service-worker/core/message.js', dest: 'dist/src/service-worker/core/message.js' },
          { source: 'src/service-worker/core/periodic-sync.js', dest: 'dist/src/service-worker/core/periodic-sync.js' },
          { source: 'src/service-worker/utils.js', dest: 'dist/src/service-worker/utils.js' },
        ];
        
        for (const file of serviceWorkerFiles) {
          if (fs.existsSync(file.source)) {
            // ایجاد پوشه‌های لازم
            const dir = path.dirname(file.dest);
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            
            fs.copyFileSync(file.source, file.dest);
            console.log(`Copied ${file.source} to ${file.dest}`);
          } else {
            console.warn(`Source file not found: ${file.source}`);
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

        // حذف پوشه src از dist بعد از کپی فایل‌های لازم - بجز پوشه سرویس ورکر
        /* این کد غیرفعال شده تا فایل‌های سرویس ورکر در مسیر صحیح باقی بمانند
        if (fs.existsSync('dist/src')) {
          try {
            await rm('dist/src', { recursive: true, force: true });
            console.log('Successfully deleted dist/src directory');
          } catch (err) {
            console.error('Error removing dist/src directory:', err);
          }
        }
        */
        
        console.log('All files copied successfully!');
      } catch (error) {
        console.error('Error during file copying:', error);
      }
    },
  };
};

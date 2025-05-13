
import fs from 'fs';

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
        if (!fs.existsSync('dist/src/service-worker')) {
          fs.mkdirSync('dist/src/service-worker', { recursive: true });
        }

        // کپی Manifest.json از src به ریشه dist، جلوگیری از تکرار
        if (fs.existsSync('src/Manifest.json')) {
          fs.copyFileSync('src/Manifest.json', 'dist/Manifest.json');
          console.log('Copied Manifest.json from src to dist root');
        } else if (fs.existsSync('public/Manifest.json')) {
          fs.copyFileSync('public/Manifest.json', 'dist/Manifest.json');
          console.log('Copied Manifest.json from public to dist root');
        }

        // کپی Service-Worker.js و ماژول‌های آن
        if (fs.existsSync('Service-Worker.js')) {
          fs.copyFileSync('Service-Worker.js', 'dist/Service-Worker.js');
          console.log('Copied Service-Worker.js to dist root');
        }
        
        // کپی ماژول‌های سرویس ورکر
        const serviceWorkerModules = [
          'cache-config.js',
          'cache-strategies.js',
          'fetch-handler.js',
          'message-handler.js'
        ];
        
        for (const module of serviceWorkerModules) {
          const sourcePath = `src/service-worker/${module}`;
          const destPath = `dist/src/service-worker/${module}`;
          
          if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`Copied ${module} to dist/src/service-worker/`);
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
        
        console.log('All files copied successfully!');
      } catch (error) {
        console.error('Error during file copying:', error);
      }
    },
  };
};

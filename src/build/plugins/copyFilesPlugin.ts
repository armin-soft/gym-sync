
import fs from 'fs';
import path from 'path';

// پلاگین ساده شده برای کپی فایل‌ها
export const copyFilesPlugin = () => {
  return {
    name: 'copy-files',
    closeBundle: async () => {
      try {
        // کپی Service-Worker.js از public
        if (fs.existsSync('public/Service-Worker.js')) {
          fs.copyFileSync('public/Service-Worker.js', 'dist/Service-Worker.js');
          console.log('کپی Service-Worker.js به dist');
        } else {
          console.log('Service-Worker.js در public پیدا نشد');
        }

        // کپی Manifest.json از public
        if (fs.existsSync('public/Manifest.json')) {
          fs.copyFileSync('public/Manifest.json', 'dist/Manifest.json');
          console.log('کپی Manifest.json به dist');
        }

        console.log('فایل‌ها با موفقیت کپی شدند!');
      } catch (error) {
        console.log('خطا در کپی فایل‌ها:', error);
      }
    },
  };
};

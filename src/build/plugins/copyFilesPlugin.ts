
import fs from 'fs';
import path from 'path';

export const copyFilesPlugin = () => {
  return {
    name: 'copy-files',
    closeBundle: async () => {
      try {
        // کپی Service-Worker.js از public
        if (fs.existsSync('public/Service-Worker.js')) {
          fs.copyFileSync('public/Service-Worker.js', 'dist/Service-Worker.js');
          console.log('کپی Service-Worker.js به dist');
        }

        // کپی Manifest.json از public
        if (fs.existsSync('public/Manifest.json')) {
          fs.copyFileSync('public/Manifest.json', 'dist/Manifest.json');
          console.log('کپی Manifest.json به dist');
        }

        // بازنویسی index.html با مسیرهای صحیح
        const distIndexPath = 'dist/index.html';
        if (fs.existsSync(distIndexPath)) {
          const indexContent = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="سیستم مدیریت برنامه های تمرینی و تغذیه ورزشکاران - نسخه 3.3.7" />
    <meta name="theme-color" content="#7c3aed" />
    <title>مدیریت برنامه - نسخه 3.3.7</title>

    <!-- Favicon and PWA -->
    <link rel="icon" type="image/png" href="./Assets/Image/Logo.png" />
    <link rel="apple-touch-icon" href="./Assets/Image/Logo.png" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <link rel="manifest" href="./Manifest.json" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&display=swap"
      rel="stylesheet"
    />
    
    <!-- CSS -->
    <link rel="stylesheet" href="./assets/index.css" />
  </head>

  <body>
    <div id="root"></div>

    <!-- Scripts -->
    <script src="./assets/index.js" type="module"></script>
    
    <noscript>برای استفاده از این برنامه، لطفا جاوااسکریپت مرورگر خود را فعال کنید.</noscript>
  </body>
</html>`;
          
          fs.writeFileSync(distIndexPath, indexContent);
          console.log('index.html با مسیرهای صحیح بازنویسی شد');
        }

        console.log('فایل‌ها با موفقیت کپی و بهینه‌سازی شدند برای نسخه 3.3.7!');
      } catch (error) {
        console.log('خطا در کپی یا بهینه‌سازی فایل‌ها:', error);
      }
    },
  };
};


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

        // بهینه‌سازی index.html در dist برای حل مشکل صفحه سفید
        const distIndexPath = 'dist/index.html';
        if (fs.existsSync(distIndexPath)) {
          let indexContent = fs.readFileSync(distIndexPath, 'utf-8');
          
          // تنظیم مسیرهای مطلق برای سازگاری بهتر - نسخه 3.3.6
          const indexTemplate = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="سیستم مدیریت برنامه های تمرینی و تغذیه ورزشکاران - نسخه 3.3.6" />
    <meta name="theme-color" content="#7c3aed" />
    <title>مدیریت برنامه - نسخه 3.3.6</title>

    <!-- Favicon and PWA -->
    <link rel="icon" type="image/png" href="/Assets/Image/Logo.png" />
    <link rel="apple-touch-icon" href="/Assets/Image/Logo.png" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <link rel="manifest" href="/Manifest.json" />

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

    <!-- Styles -->
    <link rel="stylesheet" crossorigin href="/Assets/Style/Menu.css" />

    <!-- Module Preloads - simplified for version 3.3.6 -->
    <link rel="modulepreload" href="/Assets/Script/react.js" />
    <link rel="modulepreload" href="/Assets/Script/ui.js" />
    <link rel="modulepreload" href="/Assets/Script/pdf.js" />
    <link rel="modulepreload" href="/Assets/Script/utils.js" />
    <link rel="modulepreload" href="/Assets/Script/vendors.js" />

    <!-- Main JS Entry -->
    <script type="module" crossorigin src="/Assets/Script/index.js"></script>
  </head>

  <body>
    <div id="root"></div>

    <!-- Lovable required script -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>

    <noscript>برای استفاده از این برنامه، لطفا جاوااسکریپت مرورگر خود را فعال کنید.</noscript>
  </body>
</html>`;
          
          fs.writeFileSync(distIndexPath, indexTemplate);
          console.log('index.html بهینه‌سازی شد برای نسخه 3.3.6');
        }

        console.log('فایل‌ها با موفقیت کپی و بهینه‌سازی شدند برای نسخه 3.3.6!');
      } catch (error) {
        console.log('خطا در کپی یا بهینه‌سازی فایل‌ها:', error);
      }
    },
  };
};

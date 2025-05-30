
import fs from 'fs';

export const generateIndexHtml = (cssFileName: string, jsFileName: string): string => {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="سیستم مدیریت برنامه های تمرینی و تغذیه ورزشکاران" />
    <meta name="theme-color" content="#7c3aed" />
    <title>مدیریت برنامه</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./Assets/Images/Logo.png" />
    <link rel="apple-touch-icon" href="./Assets/Images/Logo.png" />

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
    <link rel="stylesheet" href="./${cssFileName}" />
  </head>

  <body>
    <div id="root"></div>

    <!-- Scripts -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script src="./${jsFileName}" type="module"></script>
    
    <noscript>برای استفاده از این برنامه، لطفاً جاوااسکریپت مرورگر خود را فعال کنید.</noscript>
  </body>
</html>`;
};

export const writeIndexHtml = (distIndexPath: string, content: string): void => {
  fs.writeFileSync(distIndexPath, content);
  console.log('✅ index.html با مسیرهای صحیح بازنویسی شد');
};

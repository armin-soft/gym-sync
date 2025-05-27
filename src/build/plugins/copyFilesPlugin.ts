
import fs from 'fs';
import path from 'path';

export const copyFilesPlugin = () => {
  return {
    name: 'copy-files',
    closeBundle: async () => {
      try {
        console.log('شروع کپی فایل‌ها و بهینه‌سازی برای نسخه 3.3.9...');

        // اطمینان از وجود پوشه‌های مقصد
        const assetsDir = 'dist/assets';
        const imagesDir = 'dist/assets/images';
        
        if (!fs.existsSync(assetsDir)) {
          fs.mkdirSync(assetsDir, { recursive: true });
        }
        if (!fs.existsSync(imagesDir)) {
          fs.mkdirSync(imagesDir, { recursive: true });
        }

        // کپی تصاویر از public/Assets/Image به dist/assets/images
        const publicImagesPath = 'public/Assets/Image';
        if (fs.existsSync(publicImagesPath)) {
          const imageFiles = fs.readdirSync(publicImagesPath);
          imageFiles.forEach(file => {
            const sourcePath = path.join(publicImagesPath, file);
            const destPath = path.join(imagesDir, file);
            if (fs.statSync(sourcePath).isFile()) {
              fs.copyFileSync(sourcePath, destPath);
              console.log(`کپی تصویر: ${file}`);
            }
          });
        }

        // کپی فایل Offline.html
        if (fs.existsSync('public/Offline.html')) {
          fs.copyFileSync('public/Offline.html', 'dist/Offline.html');
          console.log('کپی Offline.html');
        }

        // پیدا کردن فایل‌های CSS و JS بدون استفاده از glob
        const getFilesWithExtension = (dir: string, ext: string): string[] => {
          if (!fs.existsSync(dir)) return [];
          return fs.readdirSync(dir)
            .filter(file => file.endsWith(ext))
            .map(file => path.join(dir, file));
        };

        const cssFiles = getFilesWithExtension('dist/assets', '.css');
        const jsFiles = getFilesWithExtension('dist/assets', '.js');
        
        // پیدا کردن فایل اصلی
        const mainCssFile = cssFiles.find(file => file.includes('index')) || cssFiles[0];
        const mainJsFile = jsFiles.find(file => file.includes('index')) || jsFiles[0];

        const cssFileName = mainCssFile ? path.basename(mainCssFile) : 'index.css';
        const jsFileName = mainJsFile ? path.basename(mainJsFile) : 'index.js';

        // بازنویسی index.html با مسیرهای صحیح
        const distIndexPath = 'dist/index.html';
        if (fs.existsSync(distIndexPath)) {
          const indexContent = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="سیستم مدیریت برنامه های تمرینی و تغذیه ورزشکاران - نسخه 3.3.9" />
    <meta name="theme-color" content="#7c3aed" />
    <title>مدیریت برنامه - نسخه 3.3.9</title>

    <!-- Favicon and PWA -->
    <link rel="icon" type="image/png" href="./assets/images/Logo.png" />
    <link rel="apple-touch-icon" href="./assets/images/Logo.png" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />

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
    <link rel="stylesheet" href="./assets/${cssFileName}" />
  </head>

  <body>
    <div id="root"></div>

    <!-- Scripts -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script src="./assets/${jsFileName}" type="module"></script>
    
    <noscript>برای استفاده از این برنامه، لطفا جاوااسکریپت مرورگر خود را فعال کنید.</noscript>
  </body>
</html>`;
          
          fs.writeFileSync(distIndexPath, indexContent);
          console.log('index.html با مسیرهای بهینه‌شده بازنویسی شد');
        }

        // ایجاد فایل .htaccess
        const htaccessContent = `Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

<filesMatch "\\.(css|js)$">
  ExpiresActive On
  ExpiresDefault "access plus 1 year"
</filesMatch>

<filesMatch "\\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
</filesMatch>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>`;

        fs.writeFileSync('dist/.htaccess', htaccessContent);
        console.log('فایل .htaccess ایجاد شد');

        console.log('✅ تمام فایل‌ها با موفقیت کپی و بهینه‌سازی شدند برای نسخه 3.3.9!');

      } catch (error) {
        console.error('❌ خطا در کپی یا بهینه‌سازی فایل‌ها:', error);
      }
    },
  };
};

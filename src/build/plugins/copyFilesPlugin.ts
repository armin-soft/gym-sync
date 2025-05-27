import fs from 'fs';
import path from 'path';

export const copyFilesPlugin = () => {
  return {
    name: 'copy-files',
    closeBundle: async () => {
      try {
        // خواندن نسخه از Manifest.json
        let appVersion = 'نامشخص';
        try {
          const manifestContent = fs.readFileSync('public/Manifest.json', 'utf8');
          const manifest = JSON.parse(manifestContent);
          appVersion = manifest.version || 'نامشخص';
          console.log(`شروع کپی فایل‌ها و بهینه‌سازی برای نسخه ${appVersion}...`);
        } catch (versionError) {
          console.warn('خطا در خواندن نسخه از Manifest.json:', versionError);
          console.log('شروع کپی فایل‌ها و بهینه‌سازی...');
        }

        // ایجاد ساختار پوشه‌های مرتب و منظم
        const directories = [
          'dist/Assets',
          'dist/Images', 
          'dist/Styles',
          'dist/Scripts',
          'dist/Scripts/Components',
          'dist/Fonts'
        ];
        
        directories.forEach(dir => {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
        });

        // کپی تصاویر از public/Assets/Image به dist/Images
        const publicImagesPath = 'public/Assets/Image';
        if (fs.existsSync(publicImagesPath)) {
          const imageFiles = fs.readdirSync(publicImagesPath);
          imageFiles.forEach(file => {
            const sourcePath = path.join(publicImagesPath, file);
            const destPath = path.join('dist/Images', file);
            if (fs.statSync(sourcePath).isFile()) {
              fs.copyFileSync(sourcePath, destPath);
              console.log(`کپی تصویر: ${file}`);
            }
          });
        }

        // پیدا کردن فایل‌های CSS و JS بدون hash
        const getFilesWithExtension = (dir: string, ext: string): string[] => {
          if (!fs.existsSync(dir)) return [];
          return fs.readdirSync(dir, { recursive: true })
            .filter((file: any) => typeof file === 'string' && file.endsWith(ext))
            .map((file: any) => path.join(dir, file));
        };

        const cssFiles = getFilesWithExtension('dist/Styles', '.css');
        const jsFiles = getFilesWithExtension('dist/Scripts', '.js');
        
        // پیدا کردن فایل اصلی
        const mainCssFile = cssFiles.find(file => file.includes('Main')) || cssFiles[0];
        const mainJsFile = jsFiles.find(file => file.includes('Main-App')) || jsFiles[0];

        const cssFileName = mainCssFile ? path.relative('dist', mainCssFile) : 'Styles/Main-App.css';
        const jsFileName = mainJsFile ? path.relative('dist', mainJsFile) : 'Scripts/Main-App.js';

        // بازنویسی index.html با مسیرهای صحیح و منظم بدون hash
        const distIndexPath = 'dist/index.html';
        if (fs.existsSync(distIndexPath)) {
          const indexContent = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="سیستم مدیریت برنامه های تمرینی و تغذیه ورزشکاران" />
    <meta name="theme-color" content="#7c3aed" />
    <title>مدیریت برنامه</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./Images/Logo.png" />
    <link rel="apple-touch-icon" href="./Images/Logo.png" />

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
          
          fs.writeFileSync(distIndexPath, indexContent);
          console.log('index.html با مسیرهای بدون hash بازنویسی شد');
        }

        // ... keep existing code (htaccess content creation - same as before)

        console.log(`✅ تمام فایل‌ها با موفقیت کپی و بهینه‌سازی شدند بدون hash برای نسخه ${appVersion}!`);

      } catch (error) {
        console.error('❌ خطا در کپی یا بهینه‌سازی فایل‌ها:', error);
      }
    },
  };
};

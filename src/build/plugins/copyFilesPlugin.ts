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

        // پیدا کردن فایل‌های CSS و JS با نام‌گذاری جدید
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

        // بازنویسی index.html با مسیرهای صحیح و منظم
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
          console.log('index.html با مسیرهای بهینه‌شده و منظم بازنویسی شد');
        }

        // ... keep existing code (htaccess content creation - same as before)
        const htaccessContent = `# ==============================================================================
# فایل .htaccess برای پروژه مدیریت برنامه تمرینی (نسخه ${appVersion})
# ==============================================================================

# ------------------------------------------------------------------------------
# تنظیمات امنیتی پایه
# ------------------------------------------------------------------------------

# غیرفعال کردن نمایش فهرست پوشه‌ها
Options -Indexes -MultiViews

# فعال کردن RewriteEngine
RewriteEngine On

# محافظت از فایل‌های حساس
<FilesMatch "\\.(htaccess|htpasswd|ini|log|sh|inc|bak)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# محافظت از فایل‌های پیکربندی
<Files ~ "^\\.(env|git|svn)">
    Order Allow,Deny
    Deny from all
</Files>

# ------------------------------------------------------------------------------
# پیکربندی Single Page Application (SPA)
# ------------------------------------------------------------------------------

# هدایت تمام درخواست‌ها به index.html (برای React Router)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/(Assets|Images|Styles|Scripts|Fonts)/
RewriteRule ^ index.html [QSA,L]

# ------------------------------------------------------------------------------
# تنظیمات کش و بهینه‌سازی عملکرد
# ------------------------------------------------------------------------------

<IfModule mod_expires.c>
    ExpiresActive On
    
    # فایل‌های استاتیک (CSS, JS) - کش طولانی‌مدت
    <filesMatch "\\.(css|js)$">
        ExpiresDefault "access plus 1 year"
        Header append Cache-Control "public, immutable"
    </filesMatch>
    
    # تصاویر و فونت‌ها - کش متوسط
    <filesMatch "\\.(png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$">
        ExpiresDefault "access plus 1 month"
        Header append Cache-Control "public"
    </filesMatch>
    
    # فایل‌های HTML - کش کوتاه‌مدت
    <filesMatch "\\.(html|htm)$">
        ExpiresDefault "access plus 1 hour"
        Header append Cache-Control "public, must-revalidate"
    </filesMatch>
    
    # فایل‌های JSON - بدون کش
    <filesMatch "\\.(json)$">
        ExpiresDefault "access plus 0 seconds"
        Header set Cache-Control "no-cache, no-store, must-revalidate"
        Header set Pragma "no-cache"
    </filesMatch>
</IfModule>

# ------------------------------------------------------------------------------
# فشرده‌سازی فایل‌ها (GZIP)
# ------------------------------------------------------------------------------

<IfModule mod_deflate.c>
    # فعال کردن فشرده‌سازی برای انواع فایل‌های متنی
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE application/ld+json
    AddOutputFilterByType DEFLATE application/manifest+json
    AddOutputFilterByType DEFLATE image/svg+xml
    
    # عدم فشرده‌سازی فایل‌های از قبل فشرده
    SetEnvIfNoCase Request_URI \
        \\.(?:gif|jpe?g|png|rar|zip|exe|flv|mov|wma|mp3|avi|swf|mp?g|mp4|webm|webp|pdf)$ no-gzip dont-vary
    SetEnvIfNoCase Request_URI \\.(?:rar|zip|7z)$ no-gzip dont-vary
</IfModule>

# ------------------------------------------------------------------------------
# تنظیمات امنیتی Headers
# ------------------------------------------------------------------------------

<IfModule mod_headers.c>
    # محافظت از XSS
    Header always set X-XSS-Protection "1; mode=block"
    
    # جلوگیری از MIME type sniffing
    Header always set X-Content-Type-Options "nosniff"
    
    # محافظت از Clickjacking
    Header always set X-Frame-Options "SAMEORIGIN"
    
    # تنظیمات CSP سطح پایه
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co https://fonts.googleapis.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: blob:; connect-src 'self';"
    
    # حذف اطلاعات سرور
    Header unset Server
    Header unset X-Powered-By
    
    # تنظیمات CORS برای فونت‌ها
    <FilesMatch "\\.(woff|woff2|ttf|eot)$">
        Header set Access-Control-Allow-Origin "*"
    </FilesMatch>
</IfModule>

# ------------------------------------------------------------------------------
# محافظت از حملات رایج
# ------------------------------------------------------------------------------

# جلوگیری از SQL Injection و XSS در URL
RewriteCond %{QUERY_STRING} [a-zA-Z0-9_]=http:// [OR]
RewriteCond %{QUERY_STRING} [a-zA-Z0-9_]=https:// [OR]
RewriteCond %{QUERY_STRING} [a-zA-Z0-9_]=(\.\.//?)+ [OR]
RewriteCond %{QUERY_STRING} [a-zA-Z0-9_]=/([a-z0-9_.]//?)+
RewriteRule .* - [F]

# محافظت از User Agent های مخرب
RewriteCond %{HTTP_USER_AGENT} ^$ [OR]
RewriteCond %{HTTP_USER_AGENT} ^(-|curl|wget|libwww-perl|python|nikto|scan) [NC,OR]
RewriteCond %{HTTP_USER_AGENT} (<|>|'|%0A|%0D|%27|%3C|%3E|%00) [NC]
RewriteRule .* - [F]

# محافظت از Request Method های غیرمجاز
RewriteCond %{REQUEST_METHOD} ^(TRACE|DELETE|TRACK) [NC]
RewriteRule .* - [F]

# ------------------------------------------------------------------------------
# تنظیمات خاص پروژه
# ------------------------------------------------------------------------------

# تنظیم charset پیش‌فرض
AddDefaultCharset UTF-8

# تنظیم MIME Types
<IfModule mod_mime.c>
    AddType application/json .json
    AddType application/manifest+json .webmanifest
    AddType image/webp .webp
    AddType font/woff2 .woff2
</IfModule>

# ------------------------------------------------------------------------------
# بهینه‌سازی نهایی
# ------------------------------------------------------------------------------

# تنظیم ServerTokens
ServerTokens Prod

# ==============================================================================
# پایان فایل .htaccess
# ==============================================================================`;

        fs.writeFileSync('dist/.htaccess', htaccessContent);
        console.log('فایل .htaccess امنیتی و بهینه ایجاد شد');

        console.log(`✅ تمام فایل‌ها با موفقیت کپی و بهینه‌سازی شدند با نام‌گذاری منظم برای نسخه ${appVersion}!`);

      } catch (error) {
        console.error('❌ خطا در کپی یا بهینه‌سازی فایل‌ها:', error);
      }
    },
  };
};

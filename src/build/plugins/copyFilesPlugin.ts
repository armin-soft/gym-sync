
import fs from 'fs';
import path from 'path';
import { rm } from 'fs/promises';

// پلاگین برای کپی فایل‌ها به پوشه dist با رفع مشکل فایل‌های تکراری
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
        
        // کپی فقط یک نسخه از Manifest.json به ریشه dist
        if (fs.existsSync('Manifest.json')) {
          fs.copyFileSync('Manifest.json', 'dist/Manifest.json');
          console.log('Copied Manifest.json to dist root');
        } else {
          console.log('Warning: Manifest.json not found in project root');
        }

        // کپی فقط یک نسخه از Service-Worker.js به ریشه dist
        if (fs.existsSync('Service-Worker.js')) {
          fs.copyFileSync('Service-Worker.js', 'dist/Service-Worker.js');
          console.log('Copied Service-Worker.js to dist root');
        } else if (fs.existsSync('public/Service-Worker.js')) {
          fs.copyFileSync('public/Service-Worker.js', 'dist/Service-Worker.js');
          console.log('Copied Service-Worker.js from public to dist root');
        } else {
          // اگر فایل در مسیر اصلی وجود نداشت، یک فایل پیش‌فرض ایجاد کن
          const defaultServiceWorkerContent = `
// سرویس ورکر پیش‌فرض - ایجاد شده توسط فرآیند بیلد
self.addEventListener('install', (event) => {
  console.log('[Service Worker] نصب سرویس ورکر');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] فعال‌سازی سرویس ورکر');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // پردازش درخواست‌های شبکه
  if (event.request.method !== 'GET') return;
  
  // درخواست‌های API را رد می‌کنیم
  if (event.request.url.includes('/api/')) return;
  
  event.respondWith(fetch(event.request).catch(() => {
    return new Response('آفلاین - داده در دسترس نیست');
  }));
});

console.log('[Service Worker] سرویس ورکر پیش‌فرض راه‌اندازی شد');
          `;
          fs.writeFileSync('dist/Service-Worker.js', defaultServiceWorkerContent);
          console.log('Created default Service-Worker.js in dist root');
        }

        // کپی Logo.png به Assets/Image
        if (fs.existsSync('src/Logo.png')) {
          fs.copyFileSync('src/Logo.png', 'dist/Assets/Image/Logo.png');
          console.log('Copied Logo.png from src to dist/Assets/Image');
        } else if (fs.existsSync('public/Assets/Image/Logo.png')) {
          fs.copyFileSync('public/Assets/Image/Logo.png', 'dist/Assets/Image/Logo.png');
          console.log('Copied Logo.png from public to dist/Assets/Image');
        } else {
          console.log('Warning: Logo.png not found in src or public directories');
        }
        
        // کپی Offline.html برای حالت آفلاین
        if (fs.existsSync('public/Offline.html')) {
          fs.copyFileSync('public/Offline.html', 'dist/Offline.html');
          console.log('Copied Offline.html to dist root');
        } else {
          console.log('Warning: Offline.html not found in public directory');
        }
        
        // حذف فایل‌های تکراری
        const filesToRemove = [
          'dist/Assets/Manifest.json',
          'dist/Assets/Script/ServiceWorker.js',
          'dist/Assets/Script/Service-Worker.js'
        ];
        
        for (const filePath of filesToRemove) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Removed duplicate file: ${filePath}`);
          }
        }

        console.log('All files copied successfully with no duplicates!');
      } catch (error) {
        console.error('Error during file copying:', error);
      }
    },
  };
};

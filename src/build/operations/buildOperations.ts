
import path from 'path';
import { BUILD_DIRECTORIES, SOURCE_PATHS } from '../config/fileStructure';
import { createDirectories, copyImages, getFilesWithExtension, readVersion } from '../utils/fileUtils';
import { generateIndexHtml, writeIndexHtml } from '../utils/htmlGenerator';

// تعریف پوشه‌های جدید
const EXTENDED_BUILD_DIRECTORIES = [
  'dist/Assets',
  'dist/Images',
  'dist/Images/Branding',
  'dist/Images/Profiles', 
  'dist/Images/Icons',
  'dist/Images/Backgrounds',
  'dist/Images/General',
  'dist/Styles',
  'dist/Scripts',
  'dist/Scripts/Libraries',
  'dist/Scripts/Pages',
  'dist/Scripts/Components',
  'dist/Scripts/Utilities',
  'dist/Fonts',
  'dist/Fonts/Vazir',
  'dist/Fonts/Noto',
  'dist/Fonts/Other'
] as const;

export const performBuildOperations = async (): Promise<void> => {
  try {
    // خواندن نسخه از Manifest.json
    const appVersion = readVersion(SOURCE_PATHS.manifest);
    console.log(`شروع کپی فایل‌ها و بهینه‌سازی برای نسخه ${appVersion}...`);

    // ایجاد ساختار پوشه‌های مرتب و منظم
    createDirectories(EXTENDED_BUILD_DIRECTORIES);

    // کپی تصاویر
    copyImages(SOURCE_PATHS.publicImages);

    // پیدا کردن فایل‌های CSS و JS بدون hash
    const cssFiles = getFilesWithExtension('dist/Styles', '.css');
    const jsFiles = getFilesWithExtension('dist/Scripts', '.js');
    
    // پیدا کردن فایل اصلی
    const mainCssFile = cssFiles.find(file => file.includes('Main-App')) || cssFiles[0];
    const mainJsFile = jsFiles.find(file => file.includes('Main-App')) || jsFiles[0];

    const cssFileName = mainCssFile ? path.relative('dist', mainCssFile) : 'Styles/Main-App.css';
    const jsFileName = mainJsFile ? path.relative('dist', mainJsFile) : 'Scripts/Main-App.js';

    // بازنویسی index.html
    const indexContent = generateIndexHtml(cssFileName, jsFileName);
    writeIndexHtml(SOURCE_PATHS.distIndex, indexContent);

    console.log(`✅ تمام فایل‌ها با موفقیت کپی و بهینه‌سازی شدند بدون hash برای نسخه ${appVersion}!`);
    console.log(`📁 ساختار پوشه‌ها:`);
    console.log(`  └── Scripts/`);
    console.log(`      ├── Libraries/ (کتابخانه‌های خارجی)`);
    console.log(`      ├── Pages/ (صفحات اصلی)`);
    console.log(`      ├── Components/ (کامپوننت‌ها)`);
    console.log(`      └── Utilities/ (ابزارها و hooks)`);
    console.log(`  └── Images/`);
    console.log(`      ├── Branding/ (لوگو و برندینگ)`);
    console.log(`      ├── Profiles/ (تصاویر پروفایل)`);
    console.log(`      ├── Icons/ (آیکون‌ها)`);
    console.log(`      └── General/ (تصاویر عمومی)`);

  } catch (error) {
    console.error('❌ خطا در کپی یا بهینه‌سازی فایل‌ها:', error);
  }
};

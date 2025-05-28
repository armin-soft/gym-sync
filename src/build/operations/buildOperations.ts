
import path from 'path';
import { BUILD_DIRECTORIES, SOURCE_PATHS } from '../config/fileStructure';
import { createDirectories, copyImages, getFilesWithExtension, readVersion } from '../utils/fileUtils';
import { generateIndexHtml, writeIndexHtml } from '../utils/htmlGenerator';

// تعریف ساختار پوشه‌های جدید - همه چیز در Assets
const UNIFIED_BUILD_DIRECTORIES = [
  'dist/Assets',
  'dist/Assets/Images',
  'dist/Assets/Images/Branding',
  'dist/Assets/Images/Profiles', 
  'dist/Assets/Images/Icons',
  'dist/Assets/Images/Backgrounds',
  'dist/Assets/Images/General',
  'dist/Assets/Styles',
  'dist/Assets/Scripts',
  'dist/Assets/Scripts/Libraries',
  'dist/Assets/Scripts/Pages',
  'dist/Assets/Scripts/Components',
  'dist/Assets/Scripts/Utilities',
  'dist/Assets/Other'
] as const;

export const performBuildOperations = async (): Promise<void> => {
  try {
    const appVersion = readVersion(SOURCE_PATHS.manifest);
    console.log(`شروع کپی فایل‌ها و بهینه‌سازی برای نسخه ${appVersion}...`);

    // ایجاد ساختار یکپارچه در Assets
    createDirectories(UNIFIED_BUILD_DIRECTORIES);

    // کپی تصاویر به Assets/Images
    copyImages(SOURCE_PATHS.publicImages, 'dist/Assets/Images');

    // پیدا کردن فایل‌های CSS و JS
    const cssFiles = getFilesWithExtension('dist/Assets/Styles', '.css');
    const jsFiles = getFilesWithExtension('dist/Assets/Scripts', '.js');
    
    const mainCssFile = cssFiles.find(file => file.includes('Main-App')) || cssFiles[0];
    const mainJsFile = jsFiles.find(file => file.includes('Main-App')) || jsFiles[0];

    const cssFileName = mainCssFile ? path.relative('dist', mainCssFile) : 'Assets/Styles/Main-App.css';
    const jsFileName = mainJsFile ? path.relative('dist', mainJsFile) : 'Assets/Scripts/Main-App.js';

    // بازنویسی index.html
    const indexContent = generateIndexHtml(cssFileName, jsFileName);
    writeIndexHtml(SOURCE_PATHS.distIndex, indexContent);

    console.log(`✅ تمام فایل‌ها با موفقیت در ساختار یکپارچه Assets سازماندهی شدند برای نسخه ${appVersion}!`);
    console.log(`📁 ساختار یکپارچه:`);
    console.log(`  └── Assets/`);
    console.log(`      ├── Scripts/`);
    console.log(`      │   ├── Libraries/ (کتابخانه‌های خارجی)`);
    console.log(`      │   ├── Pages/ (صفحات اصلی)`);
    console.log(`      │   ├── Components/ (کامپوننت‌ها)`);
    console.log(`      │   └── Utilities/ (ابزارها و hooks)`);
    console.log(`      ├── Images/`);
    console.log(`      │   ├── Branding/ (لوگو و برندینگ)`);
    console.log(`      │   ├── Profiles/ (تصاویر پروفایل)`);
    console.log(`      │   ├── Icons/ (آیکون‌ها)`);
    console.log(`      │   └── General/ (تصاویر عمومی)`);
    console.log(`      ├── Styles/ (فایل‌های CSS)`);
    console.log(`      └── Other/ (سایر فایل‌ها)`);

  } catch (error) {
    console.error('❌ خطا در سازماندهی فایل‌ها:', error);
  }
};

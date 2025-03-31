
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// رنگ‌های متن برای نمایش بهتر در کنسول
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.magenta}=== شروع فرایند ساخت APK برای Gym-Sync ===${colors.reset}`);

try {
  // مرحله 1: ساخت پروژه وب
  console.log(`\n${colors.cyan}مرحله 1: ساخت پروژه وب...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  
  // بررسی آیا پوشه dist ایجاد شده است
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    throw new Error('ساخت پروژه وب با مشکل مواجه شد، پوشه dist ایجاد نشد.');
  }
  
  // مرحله 2: افزودن پلتفرم اندروید اگر وجود نداشته باشد
  console.log(`\n${colors.cyan}مرحله 2: بررسی و افزودن پلتفرم اندروید...${colors.reset}`);
  if (!fs.existsSync(path.join(__dirname, 'android'))) {
    console.log(`${colors.yellow}پوشه اندروید یافت نشد. در حال اضافه کردن پلتفرم اندروید...${colors.reset}`);
    execSync('npx cap add android', { stdio: 'inherit' });
  } else {
    console.log(`${colors.green}پوشه اندروید موجود است.${colors.reset}`);
  }
  
  // مرحله 3: همگام‌سازی تغییرات با پروژه اندروید
  console.log(`\n${colors.cyan}مرحله 3: همگام‌سازی تغییرات با پروژه اندروید...${colors.reset}`);
  execSync('npx cap sync android', { stdio: 'inherit' });
  
  // مرحله 4: ساخت APK
  console.log(`\n${colors.cyan}مرحله 4: ساخت فایل APK...${colors.reset}`);
  console.log(`${colors.yellow}توجه: برای ساخت APK نیاز به Android Studio دارید.${colors.reset}`);
  console.log(`${colors.bright}لطفاً به دستورالعمل زیر توجه کنید:${colors.reset}`);
  console.log(`
  ${colors.green}1. برای باز کردن پروژه در Android Studio، دستور زیر را اجرا کنید:${colors.reset}
     npx cap open android
  
  ${colors.green}2. در Android Studio، از منوی Build گزینه Build Bundle(s) / APK(s) را انتخاب کنید و سپس Build APK(s) را انتخاب کنید.${colors.reset}
  
  ${colors.green}3. پس از اتمام فرآیند ساخت، فایل APK در مسیر زیر قابل دسترسی خواهد بود:${colors.reset}
     android/app/build/outputs/apk/debug/app-debug.apk
  `);
  
  console.log(`\n${colors.bright}${colors.green}عملیات با موفقیت انجام شد!${colors.reset}`);
  
} catch (error) {
  console.error(`\n${colors.bright}${colors.red}خطا در فرایند ساخت:${colors.reset}`, error.message);
  process.exit(1);
}

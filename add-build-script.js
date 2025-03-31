
const fs = require('fs');
const path = require('path');

// آدرس فایل package.json
const packageJsonPath = path.join(__dirname, 'package.json');

try {
  // خواندن محتوای فایل package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // افزودن اسکریپت جدید برای ساخت APK
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['build:apk'] = 'node build-apk.js';
  
  // ذخیره تغییرات
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('اسکریپت build:apk با موفقیت به package.json اضافه شد.');
} catch (error) {
  console.error('خطا در افزودن اسکریپت به package.json:', error);
}

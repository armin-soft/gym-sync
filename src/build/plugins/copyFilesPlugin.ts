
import fs from 'fs';
import path from 'path';

// پلاگین ساده شده برای کپی فایل‌ها و بهینه‌سازی index.html
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

        // بهینه‌سازی index.html در dist
        const distIndexPath = 'dist/index.html';
        if (fs.existsSync(distIndexPath)) {
          let indexContent = fs.readFileSync(distIndexPath, 'utf-8');
          
          // اضافه کردن modulepreload links برای فایل‌های JS
          const jsFiles = [
            'Utils.js', 'Vendors.js', 'Animation.js', 'PDF-Core.js', 'PDF-Fonts.js',
            'PDF-Export.js', 'UI.js', 'Routing.js', 'Data-Management.js',
            'Page-Exercises.js', 'Feature-Exercises.js', 'Page-Index.tsx.js',
            'Page-Students.js', 'Page-Students.tsx.js', 'Feature-Nutrition.js',
            'Page-Diet.js', 'Page-Supplements.js', 'Page-Trainer.tsx.js',
            'Page-Backup.js', 'Page-Student-program.js', 'Page-Student-history.tsx.js',
            'React.js'
          ];
          
          // ایجاد modulepreload links
          const modulePreloads = jsFiles.map(file => 
            `    <link rel="modulepreload" href="/Assets/Script/${file}" />`
          ).join('\n');
          
          // اضافه کردن CSS link
          const cssLink = '    <link rel="stylesheet" crossorigin href="/Assets/Style/Menu.css" />';
          
          // جایگذاری در head
          indexContent = indexContent.replace(
            '</head>',
            `
    <!-- Styles -->
${cssLink}

    <!-- Module Preloads -->
${modulePreloads}

    <!-- Main JS Entry (Only once) -->
    <script type="module" crossorigin src="/Assets/Script/index.js"></script>
  </head>`
          );
          
          fs.writeFileSync(distIndexPath, indexContent);
          console.log('بهینه‌سازی index.html در dist انجام شد');
        }

        console.log('فایل‌ها با موفقیت کپی و بهینه‌سازی شدند!');
      } catch (error) {
        console.log('خطا در کپی یا بهینه‌سازی فایل‌ها:', error);
      }
    },
  };
};

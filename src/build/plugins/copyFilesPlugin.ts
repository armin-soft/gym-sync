
import fs from 'fs';
import path from 'path';

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
          
          // تبدیل همه مسیرها به relative
          indexContent = indexContent.replace(/href="\/([^"]+)"/g, 'href="./$1"');
          indexContent = indexContent.replace(/src="\/([^"]+)"/g, 'src="./$1"');
          
          // اضافه کردن modulepreload links و CSS
          const additionalLinks = `
    <!-- Styles -->
    <link rel="stylesheet" crossorigin href="./Assets/Style/Menu.css" />

    <!-- Module Preloads -->
    <link rel="modulepreload" href="./Assets/Script/Utils.js" />
    <link rel="modulepreload" href="./Assets/Script/Vendors.js" />
    <link rel="modulepreload" href="./Assets/Script/Animation.js" />
    <link rel="modulepreload" href="./Assets/Script/PDF-Core.js" />
    <link rel="modulepreload" href="./Assets/Script/PDF-Fonts.js" />
    <link rel="modulepreload" href="./Assets/Script/PDF-Export.js" />
    <link rel="modulepreload" href="./Assets/Script/UI.js" />
    <link rel="modulepreload" href="./Assets/Script/Routing.js" />
    <link rel="modulepreload" href="./Assets/Script/Data-Management.js" />
    <link rel="modulepreload" href="./Assets/Script/Page-Exercises.js" />
    <link rel="modulepreload" href="./Assets/Script/Feature-Exercises.js" />
    <link rel="modulepreload" href="./Assets/Script/Page-Index.js" />
    <link rel="modulepreload" href="./Assets/Script/Page-Students.js" />
    <link rel="modulepreload" href="./Assets/Script/Feature-Nutrition.js" />
    <link rel="modulepreload" href="./Assets/Script/Page-Diet.js" />
    <link rel="modulepreload" href="./Assets/Script/Page-Supplements.js" />
    <link rel="modulepreload" href="./Assets/Script/Page-Trainer.js" />
    <link rel="modulepreload" href="./Assets/Script/Page-Backup.js" />
    <link rel="modulepreload" href="./Assets/Script/Page-Student-program.js" />
    <link rel="modulepreload" href="./Assets/Script/Page-Student-history.js" />
    <link rel="modulepreload" href="./Assets/Script/React.js" />

    <!-- Main JS Entry -->
    <script type="module" crossorigin src="./Assets/Script/index.js"></script>`;
          
          // اضافه کردن قبل از </head>
          indexContent = indexContent.replace('</head>', `${additionalLinks}\n  </head>`);
          
          fs.writeFileSync(distIndexPath, indexContent);
          console.log('بهینه‌سازی index.html برای relative paths انجام شد');
        }

        console.log('فایل‌ها با موفقیت کپی و بهینه‌سازی شدند!');
      } catch (error) {
        console.log('خطا در کپی یا بهینه‌سازی فایل‌ها:', error);
      }
    },
  };
};

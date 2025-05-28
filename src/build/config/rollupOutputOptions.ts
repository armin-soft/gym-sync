
// تنظیمات خروجی برای rollup - GymSync ویژه
export const rollupOutputOptions = {
  entryFileNames: 'Assets/Scripts/Main-App.js',
  // chunkFileNames و assetFileNames کاملاً وابسته به منطق فعلی
  chunkFileNames: (chunkInfo: any) => {
    const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
    const chunkName = facadeModuleId ? (facadeModuleId as string).replace(/\.[^/.]+$/, '') : chunkInfo.name;
    
    if (chunkName.includes('React') || chunkInfo.name === 'React-Core') {
      return 'Assets/Scripts/Libraries/React-Core.js';
    }
    if (chunkName.includes('UI') || chunkInfo.name === 'UI-Components') {
      return 'Assets/Scripts/Libraries/UI-Components.js';
    }
    if (chunkName.includes('Router') || chunkInfo.name === 'Router-Query') {
      return 'Assets/Scripts/Libraries/Router-Query.js';
    }
    if (chunkName.includes('Animation') || chunkInfo.name === 'Animations') {
      return 'Assets/Scripts/Libraries/Framer-Motion.js';
    }
    if (chunkName.includes('Icon') || chunkInfo.name === 'Icons') {
      return 'Assets/Scripts/Libraries/Lucide-Icons.js';
    }
    if (chunkName.includes('Date') || chunkInfo.name === 'Date-Utils') {
      return 'Assets/Scripts/Utilities/Date-Functions.js';
    }
    if (chunkName.includes('Form') || chunkInfo.name === 'Forms') {
      return 'Assets/Scripts/Libraries/Form-Libraries.js';
    }
    if (chunkName.includes('PDF') || chunkInfo.name === 'PDF-Canvas') {
      return 'Assets/Scripts/Libraries/PDF-Canvas.js';
    }
    if (chunkName.includes('Chart') || chunkInfo.name === 'Charts') {
      return 'Assets/Scripts/Libraries/Recharts.js';
    }
    if (chunkName.includes('Students') || chunkInfo.name.includes('Students')) {
      return 'Assets/Scripts/Pages/Students-Manager.js';
    }
    if (chunkName.includes('Exercise') || chunkInfo.name.includes('Exercise')) {
      return 'Assets/Scripts/Pages/Exercise-Manager.js';
    }
    if (chunkName.includes('Diet') || chunkInfo.name.includes('Diet')) {
      return 'Assets/Scripts/Pages/Diet-Manager.js';
    }
    if (chunkName.includes('Supplement') || chunkInfo.name.includes('Supplement')) {
      return 'Assets/Scripts/Pages/Supplement-Manager.js';
    }
    if (chunkName.includes('Utils') || chunkInfo.name === 'Utils-Hooks') {
      return 'Assets/Scripts/Utilities/Hooks-Utils.js';
    }
    if (chunkName.includes('Component') || chunkInfo.name.includes('Component')) {
      return 'Assets/Scripts/Components/Custom-Components.js';
    }
    if (chunkName.includes('Page') || chunkInfo.name.includes('Page')) {
      return 'Assets/Scripts/Pages/Other-Pages.js';
    }
    
    const formattedName = chunkName
      .split(/[-_]/)
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('-');
    return `Assets/Scripts/Components/${formattedName}.js`;
  },
  assetFileNames: (assetInfo: any) => {
    const info = assetInfo.name || '';
    
    // برای فایل‌های CSS
    if (info.endsWith('.css')) {
      if (info.includes('index') || info.includes('main')) {
        return 'Assets/Styles/Main-App.css';
      }
      if (info.includes('component')) {
        return 'Assets/Styles/Components.css';
      }
      if (info.includes('page')) {
        return 'Assets/Styles/Pages.css';
      }
      
      const cssName = info.replace('.css', '')
        .split(/[-_]/)
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('-');
      return `Assets/Styles/${cssName}.css`;
    }
    
    // برای فایل‌های تصویر
    if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
      if (info.toLowerCase().includes('logo')) {
        return `Assets/Images/Branding/${info}`;
      }
      if (info.toLowerCase().includes('avatar') || info.toLowerCase().includes('profile')) {
        return `Assets/Images/Profiles/${info}`;
      }
      if (info.toLowerCase().includes('icon')) {
        return `Assets/Images/Icons/${info}`;
      }
      if (info.toLowerCase().includes('background') || info.toLowerCase().includes('bg')) {
        return `Assets/Images/Backgrounds/${info}`;
      }
      
      return `Assets/Images/General/${info}`;
    }
    
    // برای فونت‌ها - فقط در صورت وجود فایل
    if (info.match(/\.(woff|woff2|ttf|eot)$/)) {
      if (info.toLowerCase().includes('vazir')) {
        return `Assets/Fonts/Vazir/${info}`;
      }
      if (info.toLowerCase().includes('noto')) {
        return `Assets/Fonts/Noto/${info}`;
      }
      
      return `Assets/Fonts/Other/${info}`;
    }
    
    // برای سایر فایل‌ها
    const fileName = info.replace(/\.[^/.]+$/, '')
      .split(/[-_]/)
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('-');
    const ext = info.split('.').pop();
    return `Assets/Other/${fileName}.${ext}`;
  },
  manualChunks: (id: string) => {
    // React and React-DOM must always be bundled together for hooks to work correctly
    if (
      id.includes('node_modules/react') ||
      id.includes('node_modules/react-dom')
    ) {
      return 'React-Core';
    }
    
    if (id.includes('node_modules/@radix-ui')) {
      return 'UI-Components';
    }
    
    if (
      id.includes('node_modules/react-router') ||
      id.includes('node_modules/@tanstack/react-query')
    ) {
      return 'Router-Query';
    }
    
    if (id.includes('node_modules/framer-motion')) {
      return 'Animations';
    }
    
    if (id.includes('node_modules/lucide-react')) {
      return 'Icons';
    }
    
    if (id.includes('node_modules/date-fns')) {
      return 'Date-Utils';
    }
    
    if (
      id.includes('node_modules/react-hook-form') ||
      id.includes('node_modules/@hookform')
    ) {
      return 'Forms';
    }
    
    if (
      id.includes('node_modules/jspdf') ||
      id.includes('node_modules/canvas') ||
      id.includes('node_modules/html2canvas')
    ) {
      return 'PDF-Canvas';
    }
    
    if (id.includes('node_modules/recharts')) {
      return 'Charts';
    }

    // Only put non-React related packages in Vendor-Libs
    if (
      id.includes('node_modules/') &&
      !id.includes('node_modules/react') &&
      !id.includes('node_modules/react-dom') &&
      !id.includes('node_modules/@radix-ui') &&
      !id.includes('node_modules/react-router') &&
      !id.includes('node_modules/@tanstack/react-query') &&
      !id.includes('node_modules/framer-motion') &&
      !id.includes('node_modules/lucide-react') &&
      !id.includes('node_modules/date-fns') &&
      !id.includes('node_modules/react-hook-form') &&
      !id.includes('node_modules/@hookform') &&
      !id.includes('node_modules/jspdf') &&
      !id.includes('node_modules/canvas') &&
      !id.includes('node_modules/html2canvas') &&
      !id.includes('node_modules/recharts')
    ) {
      return 'Vendor-Libs';
    }

    if (id.includes('src/pages/')) {
      if (id.includes('src/pages/students')) {
        return 'Students-Pages';
      }
      if (id.includes('src/pages/exercises')) {
        return 'Exercises-Pages';
      }
      if (id.includes('src/pages/diet')) {
        return 'Diet-Pages';
      }
      if (id.includes('src/pages/supplements')) {
        return 'Supplements-Pages';
      }
      return 'Other-Pages';
    }

    if (id.includes('src/components/students')) {
      return 'Students-Components';
    }
    if (id.includes('src/components/exercises')) {
      return 'Exercises-Components';
    }
    if (id.includes('src/components/diet')) {
      return 'Diet-Components';
    }
    if (id.includes('src/components/supplements')) {
      return 'Supplements-Components';
    }
    if (id.includes('src/components/')) {
      return 'UI-Components-Custom';
    }
    if (
      id.includes('src/hooks/') ||
      id.includes('src/lib/') ||
      id.includes('src/utils/')
    ) {
      return 'Utils-Hooks';
    }
  }
};


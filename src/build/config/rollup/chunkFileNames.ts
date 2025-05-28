
/**
 * Logic for Rollup's chunkFileNames option.
 */
export function getChunkFileName(chunkInfo: any): string {
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
}

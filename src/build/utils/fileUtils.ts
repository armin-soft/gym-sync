
import fs from 'fs';
import path from 'path';

export const createDirectories = (directories: readonly string[]): void => {
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

export const copyImages = (sourcePath: string): void => {
  if (!fs.existsSync(sourcePath)) return;
  
  const imageFiles = fs.readdirSync(sourcePath);
  imageFiles.forEach(file => {
    const sourceFilePath = path.join(sourcePath, file);
    const destPath = path.join('dist/Images', file);
    if (fs.statSync(sourceFilePath).isFile()) {
      fs.copyFileSync(sourceFilePath, destPath);
      console.log(`کپی تصویر: ${file}`);
    }
  });
};

export const getFilesWithExtension = (dir: string, ext: string): string[] => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { recursive: true })
    .filter((file: any) => typeof file === 'string' && file.endsWith(ext))
    .map((file: any) => path.join(dir, file));
};

export const readVersion = (manifestPath: string): string => {
  try {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);
    return manifest.version || 'نامشخص';
  } catch (error) {
    console.warn('خطا در خواندن نسخه از Manifest.json:', error);
    return 'نامشخص';
  }
};

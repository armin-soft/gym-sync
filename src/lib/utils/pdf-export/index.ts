
import { Student } from '@/components/students/StudentTypes';
import { generateHTMLExport, exportStudentProgramToHTML } from './html-export';

// تولید پیش‌نمایش HTML
export const previewStudentProgramHTML = (student: Student): string => {
  try {
    return generateHTMLExport(student);
  } catch (error) {
    console.error("خطا در ایجاد پیش‌نمایش HTML:", error);
    throw error;
  }
};

// صادر کردن HTML
export const exportStudentProgramToHtml = async (student: Student): Promise<void> => {
  try {
    exportStudentProgramToHTML(student);
  } catch (error) {
    console.error("خطا در صدور HTML:", error);
    throw error;
  }
};

// صادر کردن همه ماژول‌ها
export * from './types';
export * from './data-helpers';
export * from './html-export';

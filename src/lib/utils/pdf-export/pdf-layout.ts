import jsPDF from 'jspdf';
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { toPersianNumbers } from '../numbers';
import { getCurrentPersianDate } from '../persianDate';
import { writeRTLText, toPersianDigits, addFontToPdf } from './pdf-fonts';

// دریافت نسخه از Manifest.json
async function getAppVersion(): Promise<string> {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    return manifest.version;
  } catch (error) {
    console.error('خطا در بارگیری نسخه از manifest:', error);
    
    try {
      // تلاش مجدد بدون کش
      const retryResponse = await fetch('./Manifest.json', { cache: 'no-store' });
      const retryData = await retryResponse.json();
      return retryData.version;
    } catch (retryError) {
      console.error('خطا در تلاش مجدد بارگیری نسخه:', retryError);
      
      // آخرین تلاش: تلاش برای دریافت نسخه از localStorage در صورت ذخیره
      const cachedVersion = localStorage.getItem('app_version');
      if (cachedVersion) {
        return cachedVersion;
      }
      
      return '';
    }
  }
}

// ایجاد هدر برای هر صفحه
export function createDocumentHeader(doc: jsPDF, student: Student, trainerProfile: TrainerProfile, pageTitle: string) {
  try {
    // اطمینان از اضافه شدن فونت وزیر
    addFontToPdf(doc);
    
    // پس‌زمینه برای هدر - جلوه گرادیان
    doc.setFillColor(124, 58, 237); // رنگ اصلی
    doc.rect(0, 0, 210, 50, 'F');
    doc.setFillColor(100, 40, 200); // رنگ ثانویه
    doc.rect(0, 35, 210, 15, 'F');
    
    // افزودن لوگو/نام باشگاه
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    writeRTLText(doc, trainerProfile.gymName || "باشگاه بدنسازی", 105, 20, { align: 'center' });
    
    // افزودن نام مربی
    doc.setFontSize(14);
    doc.setTextColor(230, 230, 230);
    writeRTLText(doc, `مربی: ${trainerProfile.name || "-"}`, 105, 30, { align: 'center' });
    
    // افزودن عنوان صفحه با سبک شبیه به نشان
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(75, 42, 60, 10, 5, 5, 'F');
    doc.setFontSize(14);
    doc.setTextColor(124, 58, 237);
    writeRTLText(doc, pageTitle, 105, 48, { align: 'center' });
    
    // افزودن خط جداکننده
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(15, 60, 195, 60);
    
    // افزودن بخش اطلاعات دانش‌آموز با استایل مدرن
    doc.setFillColor(250, 250, 255);
    doc.roundedRect(15, 65, 180, 25, 3, 3, 'F');
    
    doc.setFontSize(13);
    doc.setTextColor(80, 80, 80);
    
    // نام دانش‌آموز با نشانگر شبیه به نماد
    doc.setFillColor(124, 58, 237, 0.1);
    doc.circle(30, 72, 3, 'F');
    writeRTLText(doc, `نام: ${student.name || "-"}`, 40, 73);
    
    // جنسیت با نشانگر شبیه به نماد
    if (student.gender) {
      const genderText = student.gender === 'male' ? 'مرد' : 'زن';
      doc.setFillColor(124, 58, 237, 0.1);
      doc.circle(30, 82, 3, 'F');
      writeRTLText(doc, `جنسیت: ${genderText}`, 40, 83);
    }
    
    // تاریخ با نشانگر شبیه به نماد
    const today = getCurrentPersianDate();
    doc.setFillColor(124, 58, 237, 0.1);
    doc.circle(120, 82, 3, 'F');
    writeRTLText(doc, `تاریخ: ${today}`, 130, 83);
    
    // افزودن اندازه‌گیری‌ها در یک کارت شیک
    if (student.height && student.weight) {
      doc.setFillColor(250, 250, 255);
      doc.roundedRect(15, 95, 180, 15, 3, 3, 'F');
      
      // قد
      doc.setFontSize(11);
      doc.setTextColor(90, 90, 90);
      writeRTLText(doc, `قد: ${toPersianDigits(student.height)} سانتی‌متر`, 40, 103);
      
      // وزن
      writeRTLText(doc, `وزن: ${toPersianDigits(student.weight)} کیلوگرم`, 110, 103);
      
      // محاسبه BMI
      if (student.height && student.weight) {
        const height = Number(student.height);
        const weight = Number(student.weight);
        if (height > 0 && weight > 0) {
          const bmi = weight / ((height / 100) * (height / 100));
          writeRTLText(doc, `شاخص توده بدنی: ${toPersianDigits(bmi.toFixed(1))}`, 180, 103);
        }
      }
    }
  } catch (error) {
    console.error("خطا در ایجاد هدر سند:", error);
  }
}

// افزودن پاورقی به هر صفحه
export async function addPageFooter(doc: jsPDF, trainerProfile: TrainerProfile) {
  try {
    // اطمینان از استفاده از فونت وزیر
    addFontToPdf(doc);
    
    const pageCount = doc.getNumberOfPages();
    const currentPage = doc.getCurrentPageInfo().pageNumber;
    const appVersion = await getAppVersion();
    
    // پس‌زمینه پاورقی
    doc.setFillColor(250, 250, 255);
    doc.rect(0, 275, 210, 22, 'F');
    
    // افزودن شماره صفحه با استایل مدرن
    doc.setFontSize(10);
    doc.setTextColor(124, 58, 237);
    
    // نشانگر شماره صفحه
    doc.setFillColor(124, 58, 237, 0.1);
    doc.roundedRect(90, 279, 30, 6, 3, 3, 'F');
    writeRTLText(doc, 
      `صفحه ${toPersianDigits(currentPage)} از ${toPersianDigits(pageCount)}`, 
      105, 
      283, 
      { align: 'center' }
    );
    
    // افزودن اطلاعات برنامه و تماس مربی
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    writeRTLText(doc, `تهیه شده توسط نرم‌افزار GymSync نسخه ${toPersianDigits(appVersion)}`, 105, 290, { align: 'center' });
    
    // افزودن اطلاعات تماس مربی در صورت وجود
    if (trainerProfile.phone) {
      writeRTLText(doc, `شماره تماس: ${toPersianDigits(trainerProfile.phone)}`, 30, 290);
    }
  } catch (error) {
    console.error("خطا در افزودن پاورقی صفحه:", error);
  }
}

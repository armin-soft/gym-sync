
import jsPDF from 'jspdf';
import { Student } from '@/components/students/StudentTypes';
import { TrainerProfile } from './types';
import { toPersianNumbers } from '../numbers';
import { getCurrentPersianDate } from '../persianDate';
import { addFontToPdf, writeRTLText, toPersianDigits } from './pdf-fonts';

// Get version from Manifest.json
async function getAppVersion(): Promise<string> {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    return manifest.version;
  } catch (error) {
    console.error('Error loading version from manifest:', error);
    
    try {
      // Try fetching again with no cache
      const retryResponse = await fetch('./Manifest.json', { cache: 'no-store' });
      const retryData = await retryResponse.json();
      return retryData.version;
    } catch (retryError) {
      console.error('Error on retry loading version:', retryError);
      
      // Last attempt: try to get version from localStorage if saved
      const cachedVersion = localStorage.getItem('app_version');
      if (cachedVersion) {
        return cachedVersion;
      }
      
      return '';
    }
  }
}

// Create the header for each page
export function createDocumentHeader(doc: jsPDF, student: Student, trainerProfile: TrainerProfile, pageTitle: string) {
  try {
    // Ensure proper font setup for Persian text
    addFontToPdf(doc);
    
    // Background for header - gradient effect
    doc.setFillColor(124, 58, 237); // Primary color
    doc.rect(0, 0, 210, 50, 'F');
    doc.setFillColor(100, 40, 200); // Secondary color
    doc.rect(0, 35, 210, 15, 'F');
    
    // Add gym logo/name
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    writeRTLText(doc, trainerProfile.gymName || "باشگاه بدنسازی", 105, 20, { align: 'center' });
    
    // Add trainer name
    doc.setFontSize(14);
    doc.setTextColor(230, 230, 230);
    writeRTLText(doc, `مربی: ${trainerProfile.name || "-"}`, 105, 30, { align: 'center' });
    
    // Add page title with badge-like style
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(75, 42, 60, 10, 5, 5, 'F');
    doc.setFontSize(14);
    doc.setTextColor(124, 58, 237);
    writeRTLText(doc, pageTitle, 105, 48, { align: 'center' });
    
    // Add divider line
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(15, 60, 195, 60);
    
    // Add student info section with modern styling
    doc.setFillColor(250, 250, 255);
    doc.roundedRect(15, 65, 180, 25, 3, 3, 'F');
    
    doc.setFontSize(13);
    doc.setTextColor(80, 80, 80);
    
    // Student name with icon-like indicator
    doc.setFillColor(124, 58, 237, 0.1);
    doc.circle(30, 72, 3, 'F');
    writeRTLText(doc, `نام: ${student.name || "-"}`, 40, 73);
    
    // Gender with icon-like indicator
    if (student.gender) {
      const genderText = student.gender === 'male' ? 'مرد' : 'زن';
      doc.setFillColor(124, 58, 237, 0.1);
      doc.circle(30, 82, 3, 'F');
      writeRTLText(doc, `جنسیت: ${genderText}`, 40, 83);
    }
    
    // Date with icon-like indicator
    const today = getCurrentPersianDate();
    doc.setFillColor(124, 58, 237, 0.1);
    doc.circle(120, 82, 3, 'F');
    writeRTLText(doc, `تاریخ: ${today}`, 130, 83);
    
    // Add measurements in an elegant card
    if (student.height && student.weight) {
      doc.setFillColor(250, 250, 255);
      doc.roundedRect(15, 95, 180, 15, 3, 3, 'F');
      
      // Height
      doc.setFontSize(11);
      doc.setTextColor(90, 90, 90);
      writeRTLText(doc, `قد: ${toPersianDigits(student.height)} سانتی‌متر`, 40, 103);
      
      // Weight
      writeRTLText(doc, `وزن: ${toPersianDigits(student.weight)} کیلوگرم`, 110, 103);
      
      // BMI calculation
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
    console.error("Error creating document header:", error);
  }
}

// Add footer to each page
export async function addPageFooter(doc: jsPDF, trainerProfile: TrainerProfile) {
  try {
    const pageCount = doc.getNumberOfPages();
    const currentPage = doc.getCurrentPageInfo().pageNumber;
    const appVersion = await getAppVersion();
    
    // Footer background
    doc.setFillColor(250, 250, 255);
    doc.rect(0, 275, 210, 22, 'F');
    
    // Add page number with modern style
    doc.setFontSize(10);
    doc.setTextColor(124, 58, 237);
    
    // Page number pill
    doc.setFillColor(124, 58, 237, 0.1);
    doc.roundedRect(90, 279, 30, 6, 3, 3, 'F');
    writeRTLText(doc, 
      `صفحه ${toPersianDigits(currentPage)} از ${toPersianDigits(pageCount)}`, 
      105, 
      283, 
      { align: 'center' }
    );
    
    // Add app info and trainer contact
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    writeRTLText(doc, `تهیه شده توسط نرم‌افزار GymSync نسخه ${toPersianDigits(appVersion)}`, 105, 290, { align: 'center' });
    
    // Add trainer contact info if available
    if (trainerProfile.phone) {
      writeRTLText(doc, `شماره تماس: ${toPersianDigits(trainerProfile.phone)}`, 30, 290);
    }
  } catch (error) {
    console.error("Error adding page footer:", error);
  }
}

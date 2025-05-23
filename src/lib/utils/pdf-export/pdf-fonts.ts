
import jsPDF from 'jspdf';

// Add Vazirmatn font for Persian text
export const addFontToPdf = (doc: jsPDF): jsPDF => {
  try {
    // استفاده از فونت آنلاین به جای فونت‌های محلی
    doc.addFont("https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/ttf/Vazirmatn-Regular.ttf", "Vazirmatn", "normal");
    doc.addFont("https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/ttf/Vazirmatn-Bold.ttf", "Vazirmatn", "bold");
    
    // Set default font
    doc.setFont("Vazirmatn", "normal");
    
    // Set font size for better readability
    doc.setFontSize(12);
  } catch (e) {
    console.error("Failed to load custom font:", e);
    // Fallback to standard font if custom font fails
    doc.setFont("helvetica");
  }
  
  return doc;
};

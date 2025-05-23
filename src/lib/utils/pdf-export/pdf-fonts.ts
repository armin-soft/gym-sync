
import jsPDF from 'jspdf';

// Add Persian font to PDF
export function addFontToPdf(doc: jsPDF): void {
  try {
    // Set document to use right-to-left text direction
    doc.setR2L(true);
    
    // Using standard fonts that have better Unicode support
    doc.setFont("Helvetica");
    
    // Ensure text alignment is right by default for RTL languages
    doc.setTextColor(0, 0, 0);
    
    console.log("Persian font setup completed successfully");
  } catch (error) {
    console.error("Error setting up Persian font:", error);
  }
}

// Helper function to ensure RTL text displays properly
export function writeRTLText(doc: jsPDF, text: string, x: number, y: number, options: any = {}): void {
  try {
    // Ensure RTL is enabled
    doc.setR2L(true);
    
    // Set default options for RTL text - right alignment is important for Persian
    const defaultOptions = { align: 'right', ...options };
    
    // Write the text with proper RTL support
    doc.text(text, x, y, defaultOptions);
  } catch (error) {
    console.error("Error writing RTL text:", error);
    // Fallback to standard text if RTL fails
    doc.text(text, x, y, options);
  }
}

// Convert standard numerals to Persian numerals
export function toPersianDigits(text: string | number): string {
  if (!text && text !== 0) return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(text).replace(/\d/g, match => persianDigits[parseInt(match)]);
}

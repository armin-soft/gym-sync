
import jsPDF from 'jspdf';
import { TableThemeOptions } from './types';

// Configure table styles for consistent look
export function configureTableStyles(theme: string = 'primary'): any {
  const themes: Record<string, TableThemeOptions> = {
    primary: {
      headColor: [124, 58, 237],
      altColor: [245, 240, 255]
    },
    success: {
      headColor: [39, 174, 96],
      altColor: [240, 250, 240]
    },
    warning: {
      headColor: [230, 126, 34],
      altColor: [253, 242, 233]
    },
    info: {
      headColor: [52, 152, 219],
      altColor: [235, 245, 255]
    }
  };
  
  const themeConfig = themes[theme] || themes.primary;
  
  return {
    headStyles: {
      fillColor: themeConfig.headColor,
      textColor: [255, 255, 255],
      halign: 'center',
      fontStyle: 'bold',
      fontSize: 12,
      cellPadding: 3,
    },
    bodyStyles: {
      halign: 'center',
      fontSize: 10,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: themeConfig.altColor,
    },
    theme: 'grid',
    margin: { right: 15, left: 15 },
    tableWidth: 'auto',
    styles: {
      overflow: 'linebreak',
      cellWidth: 'wrap',
      fontSize: 10,
      direction: 'rtl',
    },
  };
}

// Create a styled section header
export function createSectionHeader(doc: jsPDF, title: string, yPos: number, color: number[]): number {
  try {
    // Add styled section header
    doc.setFillColor(color[0], color[1], color[2], 0.1);
    doc.roundedRect(15, yPos, 180, 10, 3, 3, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(title, 105, yPos + 7, { align: 'center' });
    
    return yPos + 15; // Return updated Y position
  } catch (error) {
    console.error("Error creating section header:", error);
    return yPos + 15; // Return default position in case of error
  }
}

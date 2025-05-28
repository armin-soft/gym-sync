
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PdfDocDefinition } from './types';

// Initialize pdfMake with fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const createPdfDocument = (content: any[]): PdfDocDefinition => {
  return {
    content,
    pageMargins: [40, 60, 40, 60],
    pageSize: 'A4',
    pageOrientation: 'portrait',
    defaultStyle: {
      font: 'Roboto',
      fontSize: 11,
      direction: 'rtl',
      alignment: 'right'
    }
  };
};

export const generatePDF = async (docDefinition: any, fileName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.download(fileName);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

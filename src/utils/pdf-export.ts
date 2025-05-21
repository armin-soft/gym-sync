import { PrintExportOptions, ExportDataOptions } from "@/components/ui/PrintExportButton";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { generateDocumentId } from "@/lib/utils/ids";

export async function generateOutput(options: ExportDataOptions) {
  console.log("Generating output with options:", options);
  
  const { 
    contentId, 
    format, 
    paperSize, 
    orientation, 
    colorMode, 
    quality, 
    includeHeader, 
    includeFooter, 
    includeLogo,
    filename,
    includeFull 
  } = options;

  // Get content element by ID or use document.body if not specified
  const content = contentId ? document.getElementById(contentId) : document.body;
  
  if (!content) {
    console.error("Content element not found:", contentId);
    throw new Error("Content element not found");
  }

  console.log("Content element found:", content);

  if (format === "pdf") {
    console.log("Generating PDF...");
    // Generate PDF
    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: colorMode === "bw" ? "#ffffff" : null
    });

    console.log("Canvas created with dimensions:", canvas.width, "x", canvas.height);

    const imgData = canvas.toDataURL(`image/jpeg`, quality / 100);
    
    // Set PDF dimensions based on paperSize and orientation
    let width, height;
    if (paperSize === "a4") {
      width = orientation === "portrait" ? 210 : 297;
      height = orientation === "portrait" ? 297 : 210;
    } else if (paperSize === "a5") {
      width = orientation === "portrait" ? 148 : 210;
      height = orientation === "portrait" ? 210 : 148;
    } else { // letter
      width = orientation === "portrait" ? 216 : 279;
      height = orientation === "portrait" ? 279 : 216;
    }
    
    console.log("Creating PDF with dimensions:", width, "x", height);
    
    const pdf = new jsPDF(orientation, 'mm', [width, height]);
    
    // Calculate image dimensions to maintain aspect ratio
    const imgWidth = width - 20; // 10mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add header if requested
    if (includeHeader) {
      pdf.setFontSize(14);
      pdf.text(filename, width / 2, 10, { align: 'center' });
    }
    
    // Add logo if requested
    if (includeLogo) {
      // This is a placeholder for logo implementation
      // Would typically load an image and add it to the PDF
    }
    
    // Add the content image
    console.log("Adding image to PDF");
    pdf.addImage(imgData, 'JPEG', 10, includeHeader ? 20 : 10, imgWidth, imgHeight);
    
    // Add footer if requested
    if (includeFooter) {
      pdf.setFontSize(8);
      const now = new Date();
      const dateString = now.toLocaleDateString();
      pdf.text(`Generated on ${dateString} | ${generateDocumentId()}`, width / 2, height - 5, { align: 'center' });
    }
    
    // Save the PDF
    const uniqueFilename = `${filename.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    console.log("Saving PDF as:", uniqueFilename);
    pdf.save(uniqueFilename);
    
    return uniqueFilename;
  } else if (format === "print") {
    console.log("Opening print window...");
    // Handle direct printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error("Could not open print window");
      throw new Error("Could not open print window. Please check if pop-ups are blocked.");
    }
    
    // Create a simplified version for printing
    printWindow.document.write('<html><head><title>' + filename + '</title>');
    printWindow.document.write('<style>body { font-family: Arial; }');
    
    if (colorMode === "bw") {
      printWindow.document.write('body { filter: grayscale(100%); }');
    }
    
    printWindow.document.write('</style></head><body>');
    
    if (includeHeader) {
      printWindow.document.write('<h1 style="text-align: center;">' + filename + '</h1>');
    }
    
    if (includeLogo) {
      // Placeholder for logo in print version
    }
    
    // Clone the content to avoid modifying the original
    const contentClone = content.cloneNode(true) as HTMLElement;
    printWindow.document.write(contentClone.innerHTML);
    
    if (includeFooter) {
      const now = new Date();
      const dateString = now.toLocaleDateString();
      printWindow.document.write('<footer style="text-align: center; font-size: 10px; margin-top: 20px;">');
      printWindow.document.write(`Generated on ${dateString} | ${generateDocumentId()}`);
      printWindow.document.write('</footer>');
    }
    
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      console.log("Print window loaded, printing...");
      printWindow.print();
    };
    
    return "print";
  }
  
  throw new Error("Invalid format specified");
}

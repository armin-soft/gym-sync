
import { PrintExportOptions } from "@/components/ui/PrintExportModal";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export interface ExportDataOptions extends PrintExportOptions {
  filename?: string;
  contentId?: string;
}

/**
 * Creates a PDF from an HTML element or prints it
 */
export async function generateOutput(options: ExportDataOptions): Promise<void> {
  try {
    const { 
      format, 
      paperSize, 
      orientation, 
      colorMode, 
      quality, 
      includeHeader, 
      includeFooter, 
      includeLogo,
      filename = "export", 
      contentId 
    } = options;

    // Get content to export
    const contentElement = contentId 
      ? document.getElementById(contentId) 
      : document.querySelector(".print-content");

    if (!contentElement) {
      throw new Error("Content element not found");
    }

    // Create a clone of the element to modify for printing/pdf
    const exportContainer = document.createElement("div");
    exportContainer.innerHTML = contentElement.outerHTML;
    exportContainer.style.position = "absolute";
    exportContainer.style.left = "-9999px";
    exportContainer.style.top = "-9999px";
    
    // Apply necessary styles for printing or PDF export
    const contentClone = exportContainer.firstChild as HTMLElement;
    if (contentClone) {
      // Apply print-specific styling
      contentClone.style.width = paperSize === "a4" 
        ? "210mm" 
        : paperSize === "a5" 
          ? "148mm" 
          : "215.9mm"; // Letter size
      
      contentClone.style.padding = "10mm";
      contentClone.style.backgroundColor = "white";
      contentClone.style.boxSizing = "border-box";
      
      // Handle orientation
      if (orientation === "landscape") {
        contentClone.style.transformOrigin = "center center";
        contentClone.style.transform = "rotate(90deg)";
        
        // Swap width and height for landscape
        const tempWidth = contentClone.style.width;
        contentClone.style.width = contentClone.style.height;
        contentClone.style.height = tempWidth;
      }
      
      // Handle color mode
      if (colorMode === "bw") {
        contentClone.style.filter = "grayscale(100%)";
      }
      
      // Add or remove header/footer/logo
      const headerElements = contentClone.querySelectorAll(".print-header");
      headerElements.forEach(header => {
        (header as HTMLElement).style.display = includeHeader ? "block" : "none";
      });
      
      const footerElements = contentClone.querySelectorAll(".print-footer");
      footerElements.forEach(footer => {
        (footer as HTMLElement).style.display = includeFooter ? "block" : "none";
      });
      
      const logoElements = contentClone.querySelectorAll(".print-logo");
      logoElements.forEach(logo => {
        (logo as HTMLElement).style.display = includeLogo ? "block" : "none";
      });
    }

    // Append to the document for rendering
    document.body.appendChild(exportContainer);

    if (format === "pdf") {
      // Convert to canvas
      const canvas = await html2canvas(contentClone, {
        scale: quality / 100 * 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Create PDF with proper dimensions
      const imgData = canvas.toDataURL("image/jpeg", quality / 100);
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: paperSize === "letter" ? "letter" : paperSize
      });

      // Calculate dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Add image to PDF (scaled to fit the page)
      const ratio = canvas.width / canvas.height;
      const imgWidth = pdfWidth;
      const imgHeight = imgWidth / ratio;
      
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      
      // Download PDF
      pdf.save(`${filename}.pdf`);
    } else if (format === "print") {
      // Open print dialog
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>پرینت</title>
              <style>
                @media print {
                  body {
                    margin: 0;
                    padding: 0;
                  }
                  * {
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                    print-color-adjust: exact !important;
                  }
                }
              </style>
            </head>
            <body>
              ${contentClone.outerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        
        // Give time for styles to apply
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }

    // Clean up the temporary elements
    document.body.removeChild(exportContainer);

  } catch (error) {
    console.error("Error generating output:", error);
    throw error;
  }
}

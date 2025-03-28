
import { PrintExportOptions } from "@/components/ui/PrintExportModal";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { generateDocumentId } from "@/lib/utils/ids";

export interface ExportDataOptions extends PrintExportOptions {
  filename?: string;
  contentId?: string;
  documentId?: string;
  includeFull?: boolean; // New option to include comprehensive data
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
      contentId,
      documentId = generateDocumentId(),
      includeFull = true // Default to include comprehensive data
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
    exportContainer.setAttribute("data-document-id", documentId);
    
    // Apply necessary styles for printing or PDF export
    const contentClone = exportContainer.firstChild as HTMLElement;
    if (contentClone) {
      // Apply print-specific styling
      contentClone.style.width = paperSize === "a4" 
        ? "210mm" 
        : paperSize === "a5" 
          ? "148mm" 
          : "215.9mm"; // Letter size
      
      contentClone.style.padding = "15mm";
      contentClone.style.backgroundColor = "white";
      contentClone.style.boxSizing = "border-box";
      contentClone.style.borderRadius = "0";
      contentClone.style.overflow = "hidden";
      
      // Handle orientation
      if (orientation === "landscape") {
        contentClone.style.transformOrigin = "center center";
        contentClone.style.transform = "rotate(90deg)";
        
        // Swap width and height for landscape
        const tempWidth = contentClone.style.width;
        contentClone.style.width = contentClone.style.height || "297mm";
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
      
      // If includeFull is true, inject the trainer profile and comprehensive data
      if (includeFull) {
        injectTrainerProfileData(contentClone);
      }
      
      // Add document ID watermark (very light)
      const watermarkDiv = document.createElement("div");
      watermarkDiv.style.position = "absolute";
      watermarkDiv.style.bottom = "5mm";
      watermarkDiv.style.right = "5mm";
      watermarkDiv.style.fontSize = "8px";
      watermarkDiv.style.color = "rgba(0,0,0,0.15)";
      watermarkDiv.textContent = documentId;
      contentClone.appendChild(watermarkDiv);
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
        backgroundColor: "#FFFFFF",
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
      
      // Add metadata to PDF
      pdf.setProperties({
        title: filename,
        subject: "Generated Document",
        author: "Fitness App",
        keywords: "pdf, export, document",
        creator: "Fitness App PDF Generator",
      });
      
      // Download PDF
      pdf.save(`${filename}.pdf`);
    } else if (format === "print") {
      // Open print dialog
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html dir="rtl">
            <head>
              <title>پرینت ${filename}</title>
              <style>
                @media print {
                  body {
                    margin: 0;
                    padding: 0;
                    direction: rtl;
                  }
                  * {
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                    print-color-adjust: exact !important;
                  }
                  @page {
                    size: ${paperSize} ${orientation};
                    margin: 0;
                  }
                }
                body {
                  direction: rtl;
                  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
              </style>
            </head>
            <body>
              ${contentClone.outerHTML}
              <script>
                setTimeout(() => {
                  window.print();
                  setTimeout(() => window.close(), 500);
                }, 500);
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }

    // Clean up the temporary elements
    document.body.removeChild(exportContainer);

  } catch (error) {
    console.error("Error generating output:", error);
    throw error;
  }
}

/**
 * Inject trainer profile and comprehensive student data into the print content
 */
function injectTrainerProfileData(contentElement: HTMLElement): void {
  try {
    // Get trainer profile from localStorage
    const trainerProfileData = localStorage.getItem('trainerProfile');
    if (!trainerProfileData) return;
    
    const trainerProfile = JSON.parse(trainerProfileData);
    
    // Create trainer profile section
    const trainerSection = document.createElement("div");
    trainerSection.className = "trainer-profile-section print-section";
    trainerSection.style.marginBottom = "20px";
    trainerSection.style.padding = "15px";
    trainerSection.style.borderRadius = "8px";
    trainerSection.style.backgroundColor = "#f8fafc";
    trainerSection.style.border = "1px solid #e2e8f0";
    
    // Create header
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.marginBottom = "15px";
    
    // Add profile image if available
    if (trainerProfile.image) {
      const profileImg = document.createElement("img");
      profileImg.src = trainerProfile.image;
      profileImg.alt = trainerProfile.fullName || "مربی";
      profileImg.style.width = "60px";
      profileImg.style.height = "60px";
      profileImg.style.borderRadius = "50%";
      profileImg.style.objectFit = "cover";
      profileImg.style.marginLeft = "15px";
      profileImg.style.border = "2px solid #4f46e5";
      header.appendChild(profileImg);
    }
    
    // Add name and title
    const nameTitle = document.createElement("div");
    nameTitle.style.flexGrow = "1";
    
    const name = document.createElement("h2");
    name.textContent = trainerProfile.fullName || "مربی";
    name.style.margin = "0";
    name.style.fontSize = "18px";
    name.style.fontWeight = "bold";
    name.style.color = "#1e293b";
    
    const title = document.createElement("p");
    title.textContent = trainerProfile.title || "مربی بدنسازی";
    title.style.margin = "5px 0 0";
    title.style.fontSize = "14px";
    title.style.color = "#64748b";
    
    nameTitle.appendChild(name);
    nameTitle.appendChild(title);
    header.appendChild(nameTitle);
    
    trainerSection.appendChild(header);
    
    // Create gym info
    if (trainerProfile.gymName) {
      const gymInfo = document.createElement("div");
      gymInfo.style.backgroundColor = "#f1f5f9";
      gymInfo.style.padding = "10px";
      gymInfo.style.borderRadius = "6px";
      gymInfo.style.marginBottom = "15px";
      
      const gymName = document.createElement("h3");
      gymName.textContent = trainerProfile.gymName;
      gymName.style.margin = "0";
      gymName.style.fontSize = "16px";
      gymName.style.fontWeight = "600";
      gymName.style.color = "#334155";
      
      const gymDescription = document.createElement("p");
      gymDescription.textContent = trainerProfile.gymDescription || "";
      gymDescription.style.margin = "5px 0 0";
      gymDescription.style.fontSize = "13px";
      gymDescription.style.color = "#64748b";
      
      gymInfo.appendChild(gymName);
      gymInfo.appendChild(gymDescription);
      
      if (trainerProfile.gymAddress) {
        const gymAddress = document.createElement("p");
        gymAddress.textContent = `آدرس: ${trainerProfile.gymAddress}`;
        gymAddress.style.margin = "5px 0 0";
        gymAddress.style.fontSize = "13px";
        gymAddress.style.color = "#64748b";
        gymInfo.appendChild(gymAddress);
      }
      
      trainerSection.appendChild(gymInfo);
    }
    
    // Create contact info
    const contactInfo = document.createElement("div");
    contactInfo.style.display = "flex";
    contactInfo.style.flexWrap = "wrap";
    contactInfo.style.gap = "10px";
    
    if (trainerProfile.phone) {
      const phone = document.createElement("div");
      phone.style.flex = "1";
      phone.style.minWidth = "150px";
      phone.style.padding = "8px";
      phone.style.backgroundColor = "#eff6ff";
      phone.style.borderRadius = "6px";
      phone.style.fontSize = "13px";
      phone.style.color = "#3b82f6";
      phone.textContent = `تلفن: ${trainerProfile.phone}`;
      contactInfo.appendChild(phone);
    }
    
    if (trainerProfile.email) {
      const email = document.createElement("div");
      email.style.flex = "1";
      email.style.minWidth = "150px";
      email.style.padding = "8px";
      email.style.backgroundColor = "#f0fdf4";
      email.style.borderRadius = "6px";
      email.style.fontSize = "13px";
      email.style.color = "#22c55e";
      email.textContent = `ایمیل: ${trainerProfile.email}`;
      contactInfo.appendChild(email);
    }
    
    if (trainerProfile.instagram) {
      const instagram = document.createElement("div");
      instagram.style.flex = "1";
      instagram.style.minWidth = "150px";
      instagram.style.padding = "8px";
      instagram.style.backgroundColor = "#fef2f2";
      instagram.style.borderRadius = "6px";
      instagram.style.fontSize = "13px";
      instagram.style.color = "#ef4444";
      instagram.textContent = `اینستاگرام: ${trainerProfile.instagram}`;
      contactInfo.appendChild(instagram);
    }
    
    if (contactInfo.children.length > 0) {
      trainerSection.appendChild(contactInfo);
    }
    
    // Add trainer section to the beginning of the content
    contentElement.insertBefore(trainerSection, contentElement.firstChild);
    
    // Add a modern divider
    const divider = document.createElement("div");
    divider.style.height = "5px";
    divider.style.background = "linear-gradient(to right, #4f46e5, #3b82f6)";
    divider.style.borderRadius = "2.5px";
    divider.style.margin = "25px 0";
    contentElement.insertBefore(divider, trainerSection.nextSibling);
    
    // Get student data if this is a student document
    injectStudentManagementData(contentElement);
    
  } catch (error) {
    console.error("Error injecting trainer profile:", error);
  }
}

/**
 * Inject comprehensive student management data
 */
function injectStudentManagementData(contentElement: HTMLElement): void {
  try {
    // Check if we can get student data (this assumes we have a studentId somewhere in the DOM)
    // This is a simplified approach - in a real app, we would need a more robust way to identify the student
    const studentIdElement = contentElement.querySelector('[data-student-id]');
    if (!studentIdElement) return;
    
    const studentId = studentIdElement.getAttribute('data-student-id');
    if (!studentId) return;
    
    // Get students, exercises, meals, and supplements from localStorage
    const studentsData = localStorage.getItem('students');
    const exercisesData = localStorage.getItem('exercises');
    const mealsData = localStorage.getItem('meals');
    const supplementsData = localStorage.getItem('supplements');
    
    if (!studentsData) return;
    
    const students = JSON.parse(studentsData);
    const exercises = exercisesData ? JSON.parse(exercisesData) : [];
    const meals = mealsData ? JSON.parse(mealsData) : [];
    const supplements = supplementsData ? JSON.parse(supplementsData) : [];
    
    // Find the current student
    const student = students.find((s: any) => s.id.toString() === studentId);
    if (!student) return;
    
    // Create student management sections
    createExerciseManagementSection(contentElement, student, exercises);
    createDietManagementSection(contentElement, student, meals);
    createSupplementManagementSection(contentElement, student, supplements);
    
  } catch (error) {
    console.error("Error injecting student management data:", error);
  }
}

/**
 * Create exercise management section
 */
function createExerciseManagementSection(contentElement: HTMLElement, student: any, exercises: any[]): void {
  if (!student.exercises || student.exercises.length === 0) return;
  
  // Get student exercises
  const studentExercises = student.exercises.map((id: number) => 
    exercises.find((ex: any) => ex.id === id)
  ).filter(Boolean);
  
  if (studentExercises.length === 0) return;
  
  // Create section
  const exerciseSection = document.createElement("div");
  exerciseSection.className = "exercise-management-section print-section";
  exerciseSection.style.marginBottom = "25px";
  exerciseSection.style.padding = "15px";
  exerciseSection.style.borderRadius = "8px";
  exerciseSection.style.backgroundColor = "#fffbeb";
  exerciseSection.style.border = "1px solid #fef3c7";
  
  // Add header
  const header = document.createElement("h2");
  header.textContent = "مدیریت تمرین‌های شاگرد";
  header.style.margin = "0 0 15px";
  header.style.fontSize = "18px";
  header.style.fontWeight = "bold";
  header.style.color = "#92400e";
  header.style.paddingBottom = "8px";
  header.style.borderBottom = "2px solid #fbbf24";
  
  exerciseSection.appendChild(header);
  
  // Create exercise table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.fontSize = "14px";
  
  // Create table header
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th style="border: 1px solid #fde68a; padding: 8px; text-align: right; background-color: #fef3c7; color: #92400e;">نام تمرین</th>
      <th style="border: 1px solid #fde68a; padding: 8px; text-align: right; background-color: #fef3c7; color: #92400e;">دسته‌بندی</th>
      <th style="border: 1px solid #fde68a; padding: 8px; text-align: right; background-color: #fef3c7; color: #92400e;">توضیحات</th>
    </tr>
  `;
  
  table.appendChild(thead);
  
  // Create table body
  const tbody = document.createElement("tbody");
  
  studentExercises.forEach((exercise: any) => {
    const tr = document.createElement("tr");
    
    const nameTd = document.createElement("td");
    nameTd.textContent = exercise.name || "";
    nameTd.style.border = "1px solid #fde68a";
    nameTd.style.padding = "8px";
    
    const categoryTd = document.createElement("td");
    categoryTd.textContent = exercise.category || "";
    categoryTd.style.border = "1px solid #fde68a";
    categoryTd.style.padding = "8px";
    
    const descriptionTd = document.createElement("td");
    descriptionTd.textContent = exercise.description || "";
    descriptionTd.style.border = "1px solid #fde68a";
    descriptionTd.style.padding = "8px";
    
    tr.appendChild(nameTd);
    tr.appendChild(categoryTd);
    tr.appendChild(descriptionTd);
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  exerciseSection.appendChild(table);
  
  // Add to content
  contentElement.appendChild(exerciseSection);
}

/**
 * Create diet management section
 */
function createDietManagementSection(contentElement: HTMLElement, student: any, meals: any[]): void {
  if (!student.meals || student.meals.length === 0) return;
  
  // Get student meals
  const studentMeals = student.meals.map((id: number) => 
    meals.find((meal: any) => meal.id === id)
  ).filter(Boolean);
  
  if (studentMeals.length === 0) return;
  
  // Create section
  const dietSection = document.createElement("div");
  dietSection.className = "diet-management-section print-section";
  dietSection.style.marginBottom = "25px";
  dietSection.style.padding = "15px";
  dietSection.style.borderRadius = "8px";
  dietSection.style.backgroundColor = "#f0fdf4";
  dietSection.style.border = "1px solid #dcfce7";
  
  // Add header
  const header = document.createElement("h2");
  header.textContent = "مدیریت برنامه غذایی شاگرد";
  header.style.margin = "0 0 15px";
  header.style.fontSize = "18px";
  header.style.fontWeight = "bold";
  header.style.color = "#166534";
  header.style.paddingBottom = "8px";
  header.style.borderBottom = "2px solid #4ade80";
  
  dietSection.appendChild(header);
  
  // Create meals table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.fontSize = "14px";
  
  // Create table header
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th style="border: 1px solid #86efac; padding: 8px; text-align: right; background-color: #dcfce7; color: #166534;">نام غذا</th>
      <th style="border: 1px solid #86efac; padding: 8px; text-align: right; background-color: #dcfce7; color: #166534;">دسته‌بندی</th>
      <th style="border: 1px solid #86efac; padding: 8px; text-align: right; background-color: #dcfce7; color: #166534;">توضیحات</th>
    </tr>
  `;
  
  table.appendChild(thead);
  
  // Create table body
  const tbody = document.createElement("tbody");
  
  studentMeals.forEach((meal: any) => {
    const tr = document.createElement("tr");
    
    const nameTd = document.createElement("td");
    nameTd.textContent = meal.name || "";
    nameTd.style.border = "1px solid #86efac";
    nameTd.style.padding = "8px";
    
    const categoryTd = document.createElement("td");
    categoryTd.textContent = meal.category || "";
    categoryTd.style.border = "1px solid #86efac";
    categoryTd.style.padding = "8px";
    
    const descriptionTd = document.createElement("td");
    descriptionTd.textContent = meal.description || "";
    descriptionTd.style.border = "1px solid #86efac";
    descriptionTd.style.padding = "8px";
    
    tr.appendChild(nameTd);
    tr.appendChild(categoryTd);
    tr.appendChild(descriptionTd);
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  dietSection.appendChild(table);
  
  // Add to content
  contentElement.appendChild(dietSection);
}

/**
 * Create supplement management section
 */
function createSupplementManagementSection(contentElement: HTMLElement, student: any, supplements: any[]): void {
  if (!student.supplements || student.supplements.length === 0) return;
  
  // Get student supplements
  const studentSupplements = student.supplements.map((id: number) => 
    supplements.find((sup: any) => sup.id === id)
  ).filter(Boolean);
  
  if (studentSupplements.length === 0) return;
  
  // Create section
  const supplementSection = document.createElement("div");
  supplementSection.className = "supplement-management-section print-section";
  supplementSection.style.marginBottom = "25px";
  supplementSection.style.padding = "15px";
  supplementSection.style.borderRadius = "8px";
  supplementSection.style.backgroundColor = "#faf5ff";
  supplementSection.style.border = "1px solid #f3e8ff";
  
  // Add header
  const header = document.createElement("h2");
  header.textContent = "مدیریت مکمل‌های شاگرد";
  header.style.margin = "0 0 15px";
  header.style.fontSize = "18px";
  header.style.fontWeight = "bold";
  header.style.color = "#6b21a8";
  header.style.paddingBottom = "8px";
  header.style.borderBottom = "2px solid #a855f7";
  
  supplementSection.appendChild(header);
  
  // Create supplements table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.fontSize = "14px";
  
  // Create table header
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th style="border: 1px solid #d8b4fe; padding: 8px; text-align: right; background-color: #f3e8ff; color: #6b21a8;">نام مکمل</th>
      <th style="border: 1px solid #d8b4fe; padding: 8px; text-align: right; background-color: #f3e8ff; color: #6b21a8;">نوع</th>
      <th style="border: 1px solid #d8b4fe; padding: 8px; text-align: right; background-color: #f3e8ff; color: #6b21a8;">میزان مصرف</th>
      <th style="border: 1px solid #d8b4fe; padding: 8px; text-align: right; background-color: #f3e8ff; color: #6b21a8;">زمان مصرف</th>
    </tr>
  `;
  
  table.appendChild(thead);
  
  // Create table body
  const tbody = document.createElement("tbody");
  
  studentSupplements.forEach((supplement: any) => {
    const tr = document.createElement("tr");
    
    const nameTd = document.createElement("td");
    nameTd.textContent = supplement.name || "";
    nameTd.style.border = "1px solid #d8b4fe";
    nameTd.style.padding = "8px";
    
    const typeTd = document.createElement("td");
    typeTd.textContent = supplement.type || "";
    typeTd.style.border = "1px solid #d8b4fe";
    typeTd.style.padding = "8px";
    
    const dosageTd = document.createElement("td");
    dosageTd.textContent = supplement.dosage || "";
    dosageTd.style.border = "1px solid #d8b4fe";
    dosageTd.style.padding = "8px";
    
    const timingTd = document.createElement("td");
    timingTd.textContent = supplement.timing || "";
    timingTd.style.border = "1px solid #d8b4fe";
    timingTd.style.padding = "8px";
    
    tr.appendChild(nameTd);
    tr.appendChild(typeTd);
    tr.appendChild(dosageTd);
    tr.appendChild(timingTd);
    
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  supplementSection.appendChild(table);
  
  // Add to content
  contentElement.appendChild(supplementSection);
}

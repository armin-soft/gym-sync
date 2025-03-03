
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrainerProfile } from "@/types/trainer";

// Add type declarations for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

interface StudentData {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image?: string;
  exercises?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
}

export const generateStudentPDF = (
  student: StudentData, 
  exercises: any[], 
  meals: any[], 
  supplements: any[],
  trainerProfile: TrainerProfile
): jsPDF => {
  // Create PDF with jsPDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Add fancy header with gradient effect
  const addGradientHeader = (doc: jsPDF) => {
    // Create gradient background for header
    const width = doc.internal.pageSize.getWidth();
    const height = 50;
    
    // Draw gradient manually (since jsPDF doesn't support gradients directly)
    for (let i = 0; i < height; i++) {
      const opacity = 1 - (i / height * 0.7);
      doc.setFillColor(48, 63, 159); // Indigo base color
      doc.setGlobalAlpha(opacity);
      doc.rect(0, i, width, 1, 'F');
    }
    
    doc.setGlobalAlpha(1);
    
    // Add white text for gym name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    
    // Add gym name with stylish presentation
    doc.text(`${trainerProfile.gymName}`, 15, 20);
    
    // Add white separator line
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(15, 24, 100, 24);
    
    // Add gym contact info in slightly smaller text
    doc.setFontSize(10);
    doc.text(`آدرس: ${trainerProfile.gymAddress}`, 15, 32);
    
    if (trainerProfile.phone) {
      doc.text(`تلفن: ${toPersianNumbers(trainerProfile.phone)}`, 15, 38);
    }
    
    if (trainerProfile.website || trainerProfile.instagram) {
      let socialText = '';
      if (trainerProfile.website) socialText += `وب‌سایت: ${trainerProfile.website}`;
      if (trainerProfile.instagram) {
        if (socialText) socialText += ' | ';
        socialText += `اینستاگرام: ${trainerProfile.instagram}`;
      }
      doc.text(socialText, 15, 44);
    }
    
    // Add trainer info on the right side
    if (trainerProfile.fullName) {
      doc.setFontSize(12);
      const trainerText = `مربی: ${trainerProfile.fullName}`;
      const trainerTextWidth = doc.getStringUnitWidth(trainerText) * 12 / doc.internal.scaleFactor;
      doc.text(trainerText, width - 15 - trainerTextWidth, 20);
    }
  };
  
  addGradientHeader(doc);
  
  // Add student profile header with stylish design
  doc.setFillColor(63, 81, 181, 0.1); // Light indigo
  doc.setDrawColor(63, 81, 181);      // Indigo border
  doc.setLineWidth(0.5);
  doc.roundedRect(15, 60, doc.internal.pageSize.getWidth() - 30, 15, 5, 5, 'FD');
  
  // Add student name with stylish presentation
  doc.setTextColor(40, 53, 147); // Dark indigo
  doc.setFontSize(16);
  doc.text(`پروفایل شاگرد: ${student.name}`, 20, 70);
  
  let currentY = 85;

  // Personal information with modern card styling
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(220, 220, 240);
  doc.roundedRect(15, currentY, doc.internal.pageSize.getWidth() - 30, 50, 5, 5, 'FD');
  
  // Add stylish section header
  doc.setFillColor(63, 81, 181);
  doc.roundedRect(25, currentY - 5, 40, 10, 5, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text("اطلاعات فردی", 45, currentY);
  
  // Add horizontal separator line
  doc.setDrawColor(230, 230, 240);
  doc.setLineWidth(0.5);
  doc.line(25, currentY + 10, doc.internal.pageSize.getWidth() - 25, currentY + 10);
  
  // Two-column personal data layout with icons (simulated)
  const personalInfoWidth = doc.internal.pageSize.getWidth() - 50;
  const colWidth = personalInfoWidth / 2;
  currentY += 20;
  
  // Left column - Name
  doc.setFillColor(63, 81, 181, 0.1);
  doc.roundedRect(25, currentY - 7, colWidth - 10, 12, 3, 3, 'F');
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(10);
  doc.text("نام:", 30, currentY);
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.text(student.name || '-', 45, currentY);
  
  // Right column - Phone
  doc.setFillColor(63, 81, 181, 0.1);
  doc.roundedRect(25 + colWidth, currentY - 7, colWidth - 10, 12, 3, 3, 'F');
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(10);
  doc.text("شماره تماس:", 30 + colWidth, currentY);
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.text(student.phone ? toPersianNumbers(student.phone) : '-', 60 + colWidth, currentY);
  
  currentY += 15;
  
  // Left column - Height
  doc.setFillColor(63, 81, 181, 0.1);
  doc.roundedRect(25, currentY - 7, colWidth - 10, 12, 3, 3, 'F');
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(10);
  doc.text("قد (سانتی‌متر):", 30, currentY);
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.text(student.height ? toPersianNumbers(student.height) : '-', 60, currentY);
  
  // Right column - Weight
  doc.setFillColor(63, 81, 181, 0.1);
  doc.roundedRect(25 + colWidth, currentY - 7, colWidth - 10, 12, 3, 3, 'F');
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(10);
  doc.text("وزن (کیلوگرم):", 30 + colWidth, currentY);
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.text(student.weight ? toPersianNumbers(student.weight) : '-', 60 + colWidth, currentY);
  
  currentY += 35;

  // Exercise program with visual card
  if (student.exercises && student.exercises.length > 0 && exercises && exercises.length > 0) {
    // Add card with gradient background
    const drawExerciseCard = () => {
      // Create card with gradient background
      const width = doc.internal.pageSize.getWidth() - 30;
      const height = Math.min(student.exercises!.length * 15 + 20, 150);
      
      // Draw gradient background
      for (let i = 0; i < height; i++) {
        const opacity = 0.05 + (i / height * 0.05);
        doc.setFillColor(63, 81, 181); // Indigo base color
        doc.setGlobalAlpha(opacity);
        doc.roundedRect(15, currentY + i, width, 1, 0, 0, 'F');
      }
      
      doc.setGlobalAlpha(1);
      doc.setDrawColor(63, 81, 181);
      doc.setLineWidth(0.5);
      doc.roundedRect(15, currentY, width, height, 5, 5, 'S');
      
      // Add header with fill
      doc.setFillColor(63, 81, 181);
      doc.roundedRect(25, currentY - 5, 35, 10, 5, 5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.text("برنامه تمرینی", 42, currentY);
      
      // Add horizontal separator line
      doc.setDrawColor(63, 81, 181, 0.3);
      doc.setLineWidth(0.5);
      doc.line(25, currentY + 10, width - 10, currentY + 10);
      
      return height;
    };
    
    const cardHeight = drawExerciseCard();
    
    currentY += 20;
    
    const studentExercises = exercises.filter(exercise => 
      student.exercises && student.exercises.includes(exercise.id)
    );
    
    // Add items with colored badges and structured layout
    doc.setFontSize(10);
    studentExercises.forEach((exercise, index) => {
      // Check if we need a new page
      if (currentY > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        currentY = 20;
        addGradientHeader(doc);
        currentY = 80;
        drawExerciseCard();
        currentY += 20;
      }
      
      // Add exercise item with colored badge
      doc.setFillColor(63, 81, 181);
      doc.circle(25, currentY, 2, 'F');
      
      // Add exercise name with light background
      doc.setFillColor(240, 242, 255);
      doc.roundedRect(30, currentY - 6, 150, 12, 2, 2, 'F');
      
      // Add text
      doc.setTextColor(40, 40, 40);
      doc.text(exercise.name || "", 35, currentY);
      
      if (exercise.description) {
        currentY += 6;
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(exercise.description, 35, currentY, { maxWidth: 140 });
        doc.setFontSize(10);
        currentY += 5;
      } else {
        currentY += 10;
      }
    });
    
    currentY += 10;
  }

  // Diet program with visual card
  if (student.meals && student.meals.length > 0 && meals && meals.length > 0) {
    // Add new page if near bottom
    if (currentY > doc.internal.pageSize.getHeight() - 50) {
      doc.addPage();
      currentY = 20;
      addGradientHeader(doc);
      currentY = 80;
    }
    
    // Draw card with gradient background for meals
    const drawMealCard = () => {
      // Create card with gradient background
      const width = doc.internal.pageSize.getWidth() - 30;
      const height = Math.min(student.meals!.length * 15 + 20, 150);
      
      // Draw gradient background
      for (let i = 0; i < height; i++) {
        const opacity = 0.05 + (i / height * 0.05);
        doc.setFillColor(76, 175, 80); // Green base color
        doc.setGlobalAlpha(opacity);
        doc.roundedRect(15, currentY + i, width, 1, 0, 0, 'F');
      }
      
      doc.setGlobalAlpha(1);
      doc.setDrawColor(76, 175, 80);
      doc.setLineWidth(0.5);
      doc.roundedRect(15, currentY, width, height, 5, 5, 'S');
      
      // Add header with fill
      doc.setFillColor(76, 175, 80);
      doc.roundedRect(25, currentY - 5, 35, 10, 5, 5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.text("برنامه غذایی", 42, currentY);
      
      // Add horizontal separator line
      doc.setDrawColor(76, 175, 80, 0.3);
      doc.setLineWidth(0.5);
      doc.line(25, currentY + 10, width - 10, currentY + 10);
      
      return height;
    };
    
    const cardHeight = drawMealCard();
    
    currentY += 20;
    
    const studentMeals = meals.filter(meal => 
      student.meals && student.meals.includes(meal.id)
    );
    
    // Add items with colored badges and structured layout
    doc.setFontSize(10);
    studentMeals.forEach((meal, index) => {
      // Check if we need a new page
      if (currentY > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        currentY = 20;
        addGradientHeader(doc);
        currentY = 80;
        drawMealCard();
        currentY += 20;
      }
      
      // Add meal item with colored badge
      doc.setFillColor(76, 175, 80);
      doc.circle(25, currentY, 2, 'F');
      
      // Add meal name with light background
      doc.setFillColor(240, 250, 240);
      doc.roundedRect(30, currentY - 6, 150, 12, 2, 2, 'F');
      
      // Add text
      doc.setTextColor(40, 40, 40);
      doc.text(meal.name || "", 35, currentY);
      
      if (meal.description) {
        currentY += 6;
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(meal.description, 35, currentY, { maxWidth: 140 });
        doc.setFontSize(10);
        currentY += 5;
      } else {
        currentY += 10;
      }
    });
    
    currentY += 10;
  }

  // Supplements and vitamins with visual card
  if ((student.supplements && student.supplements.length > 0) || 
      (student.vitamins && student.vitamins.length > 0) && 
      supplements && supplements.length > 0) {
    
    // Add new page if near bottom
    if (currentY > doc.internal.pageSize.getHeight() - 50) {
      doc.addPage();
      currentY = 20;
      addGradientHeader(doc);
      currentY = 80;
    }
    
    const supplementItems = supplements
      .filter(supplement => 
        (student.supplements && student.supplements.includes(supplement.id)) || 
        (student.vitamins && student.vitamins.includes(supplement.id))
      );
      
    if (supplementItems.length > 0) {
      // Draw card with gradient background for supplements
      const drawSupplementCard = () => {
        // Create card with gradient background
        const width = doc.internal.pageSize.getWidth() - 30;
        const height = Math.min(supplementItems.length * 15 + 20, 150);
        
        // Draw gradient background
        for (let i = 0; i < height; i++) {
          const opacity = 0.05 + (i / height * 0.05);
          doc.setFillColor(156, 39, 176); // Purple base color
          doc.setGlobalAlpha(opacity);
          doc.roundedRect(15, currentY + i, width, 1, 0, 0, 'F');
        }
        
        doc.setGlobalAlpha(1);
        doc.setDrawColor(156, 39, 176);
        doc.setLineWidth(0.5);
        doc.roundedRect(15, currentY, width, height, 5, 5, 'S');
        
        // Add header with fill
        doc.setFillColor(156, 39, 176);
        doc.roundedRect(25, currentY - 5, 55, 10, 5, 5, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.text("مکمل‌ها و ویتامین‌ها", 55, currentY);
        
        // Add horizontal separator line
        doc.setDrawColor(156, 39, 176, 0.3);
        doc.setLineWidth(0.5);
        doc.line(25, currentY + 10, width - 10, currentY + 10);
        
        return height;
      };
      
      const cardHeight = drawSupplementCard();
      
      currentY += 20;
      
      // Add items with colored badges and structured layout
      doc.setFontSize(10);
      supplementItems.forEach((supplement, index) => {
        // Check if we need a new page
        if (currentY > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          currentY = 20;
          addGradientHeader(doc);
          currentY = 80;
          drawSupplementCard();
          currentY += 20;
        }
        
        // Add supplement item with colored badge
        doc.setFillColor(156, 39, 176);
        doc.circle(25, currentY, 2, 'F');
        
        // Add supplement name with light background
        doc.setFillColor(250, 240, 250);
        doc.roundedRect(30, currentY - 6, 150, 12, 2, 2, 'F');
        
        // Add text
        doc.setTextColor(40, 40, 40);
        doc.text(supplement.name || "", 35, currentY);
        
        if (supplement.description) {
          currentY += 6;
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text(supplement.description, 35, currentY, { maxWidth: 140 });
          doc.setFontSize(10);
          currentY += 5;
        } else {
          currentY += 10;
        }
      });
    }
  }

  // Add stylish footer to all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Add gradient footer
    const footerHeight = 15;
    const width = doc.internal.pageSize.getWidth();
    
    for (let j = 0; j < footerHeight; j++) {
      const opacity = 0.1 + (j / footerHeight * 0.1);
      doc.setFillColor(63, 81, 181); // Indigo color
      doc.setGlobalAlpha(opacity);
      doc.rect(0, doc.internal.pageSize.getHeight() - footerHeight + j, width, 1, 'F');
    }
    
    doc.setGlobalAlpha(1);
    
    // Add page numbers
    doc.setFontSize(9);
    doc.setTextColor(63, 81, 181);
    const pageText = `صفحه ${toPersianNumbers(i)} از ${toPersianNumbers(pageCount)}`;
    const textWidth = doc.getStringUnitWidth(pageText) * 9 / doc.internal.scaleFactor;
    doc.text(pageText, width - 15 - textWidth, doc.internal.pageSize.getHeight() - 8);
    
    // Add gym name
    doc.text(trainerProfile.gymName, 15, doc.internal.pageSize.getHeight() - 8);
  }

  return doc;
};

export const openPrintWindow = (
  student: StudentData, 
  exercises: any[], 
  meals: any[], 
  supplements: any[],
  trainerProfile: TrainerProfile
): Window | null => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    return null;
  }

  // Get student data
  const studentExercises = exercises.filter(exercise => 
    student.exercises && student.exercises.includes(exercise.id)
  );
  
  const studentMeals = meals.filter(meal => 
    student.meals && student.meals.includes(meal.id)
  );
  
  const studentSupplements = supplements.filter(supplement => 
    (student.supplements && student.supplements.includes(supplement.id)) || 
    (student.vitamins && student.vitamins.includes(supplement.id))
  );

  // HTML content for printing with modern styling
  printWindow.document.write(`
    <html dir="rtl">
    <head>
      <title>اطلاعات شاگرد: ${student.name}</title>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
        
        @media print {
          @page { 
            size: A4 portrait; 
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-button {
            display: none !important;
          }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Vazirmatn', 'Tahoma', 'Arial', sans-serif;
          color: #333;
          background-color: #f5f7fd;
          padding: 0;
          margin: 0;
          direction: rtl;
          line-height: 1.5;
        }
        
        .document {
          max-width: 800px;
          margin: 20px auto;
          background: white;
          box-shadow: 0 10px 25px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
          overflow: hidden;
          border-radius: 8px;
        }
        
        .header {
          background: linear-gradient(135deg, #3f51b5 0%, #3949ab 100%);
          color: white;
          padding: 25px 35px;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: -10px;
          right: -10px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          z-index: 0;
        }
        
        .header::after {
          content: '';
          position: absolute;
          bottom: -40px;
          left: -40px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          z-index: 0;
        }
        
        .header-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
        }
        
        .gym-info {
          flex: 2;
        }
        
        .trainer-info {
          flex: 1;
          text-align: left;
          padding-left: 20px;
          position: relative;
        }
        
        .trainer-info::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10%;
          height: 80%;
          width: 1px;
          background: rgba(255, 255, 255, 0.3);
        }
        
        .gym-name {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          position: relative;
          display: inline-block;
        }
        
        .gym-name::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 40px;
          height: 2px;
          background: #fff;
        }
        
        .gym-detail {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .trainer-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .trainer-title {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .student-header {
          background-color: #f0f4ff;
          padding: 15px 35px;
          border-bottom: 1px solid #e0e7ff;
        }
        
        .student-title {
          color: #303f9f;
          font-size: 20px;
          font-weight: 600;
          position: relative;
          display: inline-block;
          padding-right: 20px;
        }
        
        .student-title::before {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          background: #3f51b5;
          border-radius: 50%;
        }
        
        .content {
          padding: 30px 35px;
        }
        
        .card {
          margin-bottom: 35px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .card-header {
          padding: 12px 20px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .card-body {
          padding: 20px;
          background: white;
        }
        
        .personal-card .card-header {
          background: linear-gradient(to right, #3f51b5, #5c6bc0);
        }
        
        .exercise-card .card-header {
          background: linear-gradient(to right, #3f51b5, #5c6bc0);
        }
        
        .meal-card .card-header {
          background: linear-gradient(to right, #43a047, #66bb6a);
        }
        
        .supplement-card .card-header {
          background: linear-gradient(to right, #7b1fa2, #9c27b0);
        }
        
        .icon {
          width: 24px;
          height: 24px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          font-size: 14px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        
        .info-item {
          padding: 10px 15px;
          border-radius: 8px;
          background-color: #f8f9ff;
          display: flex;
          flex-direction: column;
          border: 1px solid #eceefb;
        }
        
        .info-label {
          font-size: 13px;
          color: #666;
          margin-bottom: 4px;
        }
        
        .info-value {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
        
        .items-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        
        .item {
          padding: 12px 15px;
          border-radius: 8px;
          position: relative;
          padding-right: 30px;
          transition: transform 0.2s;
        }
        
        .item:hover {
          transform: translateY(-2px);
        }
        
        .exercise-item {
          background-color: #f0f4ff;
          border: 1px solid #dce1fb;
        }
        
        .meal-item {
          background-color: #f0f9f0;
          border: 1px solid #daeeda;
        }
        
        .supplement-item {
          background-color: #f8f0fb;
          border: 1px solid #edd6f3;
        }
        
        .item::before {
          content: '';
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .exercise-item::before {
          background-color: #3f51b5;
        }
        
        .meal-item::before {
          background-color: #43a047;
        }
        
        .supplement-item::before {
          background-color: #7b1fa2;
        }
        
        .item-name {
          font-weight: 500;
          font-size: 14px;
        }
        
        .item-description {
          margin-top: 5px;
          font-size: 12px;
          color: #666;
        }
        
        .footer {
          text-align: center;
          padding: 20px;
          background: #f4f5fb;
          color: #666;
          font-size: 12px;
          border-top: 1px solid #e0e4f6;
        }
        
        .print-button {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(to right, #3f51b5, #5c6bc0);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 30px;
          font-family: 'Vazirmatn', sans-serif;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(63, 81, 181, 0.4);
          display: flex;
          align-items: center;
          transition: all 0.2s;
        }
        
        .print-button:hover {
          box-shadow: 0 8px 20px rgba(63, 81, 181, 0.6);
          transform: translateX(-50%) translateY(-2px);
        }
        
        .print-icon {
          margin-left: 8px;
          display: inline-block;
          width: 18px;
          height: 18px;
        }
        
        .empty-message {
          padding: 15px;
          text-align: center;
          background-color: #f9f9f9;
          border-radius: 8px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="document">
        <div class="header">
          <div class="header-content">
            <div class="gym-info">
              <h1 class="gym-name">${trainerProfile.gymName}</h1>
              <div class="gym-detail">آدرس: ${trainerProfile.gymAddress}</div>
              ${trainerProfile.phone ? `<div class="gym-detail">تلفن: ${toPersianNumbers(trainerProfile.phone)}</div>` : ''}
              ${trainerProfile.website ? `<div class="gym-detail">وب‌سایت: ${trainerProfile.website}</div>` : ''}
              ${trainerProfile.instagram ? `<div class="gym-detail">اینستاگرام: ${trainerProfile.instagram}</div>` : ''}
            </div>
            <div class="trainer-info">
              ${trainerProfile.fullName ? `
                <div class="trainer-name">${trainerProfile.fullName}</div>
                <div class="trainer-title">مربی</div>
              ` : ''}
            </div>
          </div>
        </div>
        
        <div class="student-header">
          <h2 class="student-title">پروفایل شاگرد: ${student.name}</h2>
        </div>
        
        <div class="content">
          <div class="card personal-card">
            <div class="card-header">
              <span class="icon">P</span>
              اطلاعات فردی
            </div>
            <div class="card-body">
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">نام</div>
                  <div class="info-value">${student.name || '-'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">شماره موبایل</div>
                  <div class="info-value" dir="ltr">${student.phone ? toPersianNumbers(student.phone) : '-'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">قد (سانتی‌متر)</div>
                  <div class="info-value">${student.height ? toPersianNumbers(student.height) : '-'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">وزن (کیلوگرم)</div>
                  <div class="info-value">${student.weight ? toPersianNumbers(student.weight) : '-'}</div>
                </div>
              </div>
            </div>
          </div>
          
          ${studentExercises.length > 0 ? `
            <div class="card exercise-card">
              <div class="card-header">
                <span class="icon">E</span>
                برنامه تمرینی
              </div>
              <div class="card-body">
                <div class="items-list">
                  ${studentExercises.map(exercise => `
                    <div class="item exercise-item">
                      <div class="item-name">${exercise.name || ''}</div>
                      ${exercise.description ? `<div class="item-description">${exercise.description}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}
          
          ${studentMeals.length > 0 ? `
            <div class="card meal-card">
              <div class="card-header">
                <span class="icon">M</span>
                برنامه غذایی
              </div>
              <div class="card-body">
                <div class="items-list">
                  ${studentMeals.map(meal => `
                    <div class="item meal-item">
                      <div class="item-name">${meal.name || ''}</div>
                      ${meal.description ? `<div class="item-description">${meal.description}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}
          
          ${studentSupplements.length > 0 ? `
            <div class="card supplement-card">
              <div class="card-header">
                <span class="icon">S</span>
                مکمل‌ها و ویتامین‌ها
              </div>
              <div class="card-body">
                <div class="items-list">
                  ${studentSupplements.map(supplement => `
                    <div class="item supplement-item">
                      <div class="item-name">${supplement.name || ''}</div>
                      ${supplement.description ? `<div class="item-description">${supplement.description}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="footer">
          ${trainerProfile.gymName} © ${new Date().getFullYear()}
        </div>
      </div>
      
      <button onclick="window.print();" class="print-button">
        <svg class="print-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
        </svg>
        چاپ
      </button>
    </body>
    </html>
  `);

  printWindow.document.close();
  
  // Auto-trigger print after window loads
  printWindow.onload = function() {
    setTimeout(() => {
      printWindow.focus();
      // Let user see the preview first
    }, 1000);
  };

  return printWindow;
};


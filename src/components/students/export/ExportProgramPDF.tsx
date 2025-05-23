
import React from 'react';
import { Student } from "@/components/students/StudentTypes";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getCurrentPersianDate } from "@/lib/utils/persianDate";

interface ExportProgramPDFProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: any[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExportProgramPDF: React.FC<ExportProgramPDFProps> = ({
  student,
  exercises,
  meals,
  supplements,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;
  
  const handleGeneratePDF = async () => {
    try {
      const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{}');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // فارسی‌سازی و راست‌چین کردن متون
      doc.addFont("src/assets/fonts/Vazirmatn-Regular.ttf", "Vazirmatn", "normal");
      doc.setFont("Vazirmatn");
      doc.setR2L(true);
      
      // صفحه اول - برنامه تمرینی
      createPDFHeader(doc, trainerProfile, student, "برنامه تمرینی");
      await generateExercisePage(doc, student, exercises);
      
      // صفحه دوم - برنامه غذایی
      doc.addPage();
      createPDFHeader(doc, trainerProfile, student, "برنامه غذایی");
      generateDietPage(doc, student, meals);
      
      // صفحه سوم - مکمل و ویتامین
      doc.addPage();
      createPDFHeader(doc, trainerProfile, student, "مکمل و ویتامین");
      generateSupplementPage(doc, student, supplements);

      // ذخیره PDF
      doc.save(`برنامه_${student.name}_${getCurrentPersianDate(false).replace(/\s/g, '_')}.pdf`);
      onClose();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("خطا در تولید PDF. لطفا مجدد تلاش کنید.");
      onClose();
    }
  };

  // ایجاد هدر صفحات PDF
  const createPDFHeader = (
    doc: jsPDF, 
    trainerProfile: any, 
    student: Student, 
    pageTitle: string
  ) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // طراحی هدر با رنگ گرادیان
    doc.setFillColor(90, 58, 237);  // رنگ اصلی
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // اطلاعات باشگاه
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text(trainerProfile.gymName || "باشگاه بدنسازی", pageWidth / 2, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`مربی: ${trainerProfile.name || ""}`, pageWidth / 2, 22, { align: "center" });
    doc.text(`تلفن: ${toPersianNumbers(trainerProfile.phone || "")}`, pageWidth / 2, 28, { align: "center" });
    
    // عنوان صفحه
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);
    doc.text(pageTitle, pageWidth / 2, 50, { align: "center" });
    
    // اطلاعات شاگرد
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    
    const infoY = 65;
    doc.text(`نام شاگرد: ${student.name}`, 20, infoY);
    if (student.phone) {
      doc.text(`تلفن: ${toPersianNumbers(student.phone)}`, pageWidth - 20, infoY, { align: "right" });
    }
    
    if (student.startDate) {
      doc.text(`تاریخ شروع: ${toPersianNumbers(student.startDate)}`, 20, infoY + 8);
    }
    
    if (student.weight || student.height) {
      const physicalInfo = [];
      if (student.weight) physicalInfo.push(`وزن: ${toPersianNumbers(student.weight)} کیلوگرم`);
      if (student.height) physicalInfo.push(`قد: ${toPersianNumbers(student.height)} سانتی‌متر`);
      doc.text(physicalInfo.join(' - '), pageWidth - 20, infoY + 8, { align: "right" });
    }
    
    // تاریخ صدور
    doc.setFontSize(10);
    doc.text(`تاریخ صدور: ${getCurrentPersianDate(true)}`, pageWidth / 2, infoY + 16, { align: "center" });
    
    // خط جداکننده
    doc.setDrawColor(200, 200, 200);
    doc.line(15, infoY + 20, pageWidth - 15, infoY + 20);
  };

  // تولید صفحه برنامه تمرینی
  const generateExercisePage = async (doc: jsPDF, student: Student, exercises: any[]) => {
    const startY = 90;
    
    // برای هر روز جدول جداگانه ایجاد می‌کنیم
    for (let day = 1; day <= 5; day++) {
      const dayKey = `exercisesDay${day}` as keyof Student;
      const setsKey = `exerciseSetsDay${day}` as keyof Student;
      const repsKey = `exerciseRepsDay${day}` as keyof Student;
      
      if (student[dayKey] && Array.isArray(student[dayKey]) && student[dayKey].length > 0) {
        const dayExercises = student[dayKey] as number[];
        const daySets = student[setsKey] as Record<number, number> || {};
        const dayReps = student[repsKey] as Record<number, string> || {};
        
        // عنوان روز
        const dayName = getDayName(day);
        doc.setFontSize(14);
        doc.setTextColor(60, 60, 60);
        doc.text(`روز ${toPersianNumbers(day)}: ${dayName}`, 20, startY + (day - 1) * 50);
        
        // جدول تمرینات
        const exerciseData = dayExercises.map(id => {
          const exercise = exercises.find(ex => ex.id === id);
          return [
            exercise ? exercise.name : "تمرین نامشخص",
            toPersianNumbers(daySets[id] || 3),
            dayReps[id] ? toPersianNumbers(dayReps[id]) : toPersianNumbers("12"),
          ];
        });
        
        autoTable(doc, {
          startY: startY + 5 + (day - 1) * 50,
          head: [['تمرین', 'ست', 'تکرار']],
          body: exerciseData,
          theme: 'grid',
          headStyles: {
            fillColor: [120, 80, 220],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center'
          },
          styles: {
            font: 'Vazirmatn',
            halign: 'right',
            cellPadding: 3,
            fontSize: 10
          },
          columnStyles: {
            0: { cellWidth: 100 },
            1: { cellWidth: 20, halign: 'center' },
            2: { cellWidth: 30, halign: 'center' }
          },
          margin: { right: 15, left: 15 }
        });
      }
    }
  };
  
  // تولید صفحه برنامه غذایی
  const generateDietPage = (doc: jsPDF, student: Student, meals: any[]) => {
    const startY = 90;
    const weekDays = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
    
    for (let day = 1; day <= 7; day++) {
      const dayKey = `mealsDay${day}` as keyof Student;
      
      if (student[dayKey] && Array.isArray(student[dayKey]) && student[dayKey].length > 0) {
        const dayMeals = student[dayKey] as number[];
        
        // عنوان روز
        doc.setFontSize(14);
        doc.setTextColor(60, 60, 60);
        doc.text(`روز ${toPersianNumbers(day)}: ${weekDays[day-1]}`, 20, startY + (day - 1) * 30);
        
        // دسته‌بندی وعده‌های غذایی
        const breakfast = dayMeals.filter(id => {
          const meal = meals.find(m => m.id === id);
          return meal && meal.type === 'صبحانه';
        });
        
        const lunch = dayMeals.filter(id => {
          const meal = meals.find(m => m.id === id);
          return meal && meal.type === 'ناهار';
        });
        
        const dinner = dayMeals.filter(id => {
          const meal = meals.find(m => m.id === id);
          return meal && meal.type === 'شام';
        });
        
        const snacks = dayMeals.filter(id => {
          const meal = meals.find(m => m.id === id);
          return meal && meal.type === 'میان‌وعده';
        });
        
        // تولید جدول وعده‌های غذایی
        const mealTypes = [
          { title: 'صبحانه', items: breakfast },
          { title: 'ناهار', items: lunch },
          { title: 'شام', items: dinner },
          { title: 'میان‌وعده', items: snacks }
        ];
        
        const tableData = mealTypes.map(type => [
          type.title,
          type.items.map(id => {
            const meal = meals.find(m => m.id === id);
            return meal ? meal.name : '';
          }).join('، ')
        ]);
        
        autoTable(doc, {
          startY: startY + 5 + (day - 1) * 30,
          body: tableData,
          theme: 'grid',
          styles: {
            font: 'Vazirmatn',
            halign: 'right',
            cellPadding: 3,
            fontSize: 10,
            overflow: 'linebreak'
          },
          columnStyles: {
            0: { cellWidth: 30, fillColor: [180, 210, 255] },
            1: { cellWidth: 'auto' }
          },
          margin: { right: 15, left: 15 }
        });
      }
    }
    
    // نمایش نکات رژیم غذایی
    if (student.mealNotes) {
      const finalY = doc.lastAutoTable?.finalY || 280;
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text('نکات تغذیه‌ای:', 20, finalY + 10);
      
      doc.setFontSize(10);
      doc.text(student.mealNotes, 20, finalY + 18, { 
        maxWidth: 170,
        align: 'justify'
      });
    }
  };
  
  // تولید صفحه مکمل و ویتامین
  const generateSupplementPage = (doc: jsPDF, student: Student, supplements: any[]) => {
    const startY = 90;
    
    // عنوان مکمل‌ها و ویتامین‌ها
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text('مکمل‌های تجویز شده', 20, startY);
    
    // دریافت مکمل‌های شاگرد
    const studentSupplements = student.supplements || [];
    const studentVitamins = student.vitamins || [];
    
    // جدول مکمل‌ها
    if (studentSupplements.length > 0) {
      const supplementData = studentSupplements.map(id => {
        const supplement = supplements.find(s => s.id === id);
        return [
          supplement ? supplement.name : 'نامشخص',
          supplement && supplement.description ? supplement.description : '-'
        ];
      });
      
      autoTable(doc, {
        startY: startY + 5,
        head: [['نام مکمل', 'نحوه مصرف']],
        body: supplementData,
        theme: 'grid',
        headStyles: {
          fillColor: [100, 150, 100],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: {
          font: 'Vazirmatn',
          halign: 'right',
          cellPadding: 3,
          fontSize: 10
        },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 'auto' }
        },
        margin: { right: 15, left: 15 }
      });
    }
    
    // جدول ویتامین‌ها
    if (studentVitamins.length > 0) {
      const vitaminY = (doc.lastAutoTable?.finalY || startY) + 20;
      
      doc.setFontSize(14);
      doc.text('ویتامین‌های تجویز شده', 20, vitaminY);
      
      const vitaminData = studentVitamins.map(id => {
        const vitamin = supplements.find(s => s.id === id);
        return [
          vitamin ? vitamin.name : 'نامشخص',
          vitamin && vitamin.description ? vitamin.description : '-'
        ];
      });
      
      autoTable(doc, {
        startY: vitaminY + 5,
        head: [['نام ویتامین', 'نحوه مصرف']],
        body: vitaminData,
        theme: 'grid',
        headStyles: {
          fillColor: [150, 100, 150],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: {
          font: 'Vazirmatn',
          halign: 'right',
          cellPadding: 3,
          fontSize: 10
        },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 'auto' }
        },
        margin: { right: 15, left: 15 }
      });
    }
    
    // نمایش نکات مکمل و ویتامین
    if (student.notes) {
      const finalY = doc.lastAutoTable?.finalY || 280;
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      doc.text('نکات مکمل و ویتامین:', 20, finalY + 10);
      
      doc.setFontSize(10);
      doc.text(student.notes, 20, finalY + 18, { 
        maxWidth: 170,
        align: 'justify'
      });
    }
  };
  
  // کمک‌کننده: تبدیل شماره روز به نام روز هفته
  const getDayName = (dayNumber: number): string => {
    switch(dayNumber) {
      case 1: return "شنبه";
      case 2: return "یکشنبه";
      case 3: return "دوشنبه";
      case 4: return "سه‌شنبه";
      case 5: return "چهارشنبه";
      default: return "روز نامشخص";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-lg w-full">
        <h2 className="text-xl font-bold text-center mb-6">در حال آماده‌سازی خروجی PDF</h2>
        
        <div className="flex flex-col items-center gap-6 mb-8">
          <p className="text-center">
            PDF شامل سه صفحه خواهد بود:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-3 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg">
              <span className="font-medium text-purple-700 dark:text-purple-300">صفحه ۱: برنامه تمرینی</span>
            </div>
            <div className="px-4 py-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
              <span className="font-medium text-green-700 dark:text-green-300">صفحه ۲: برنامه غذایی</span>
            </div>
            <div className="px-4 py-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
              <span className="font-medium text-amber-700 dark:text-amber-300">صفحه ۳: مکمل و ویتامین</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-3">
          <button
            onClick={handleGeneratePDF}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            تولید PDF
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

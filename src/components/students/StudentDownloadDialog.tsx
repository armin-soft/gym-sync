import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Download,
  Printer,
  FileText,
  User,
  Dumbbell,
  Apple,
  Pill,
  CheckCheck,
  ChevronRight,
  Award,
  MapPin,
  Phone,
  Calendar,
  Ruler,
  Scale,
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";
import { formatJalaliDate } from "@/lib/utils/reports";

interface StudentDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: {
    id: number;
    name: string;
    phone: string;
    height: string;
    weight: string;
    image: string;
    exercises?: number[];
    meals?: number[];
    supplements?: number[];
    vitamins?: number[];
  } | null;
  exercises: any[];
  meals: any[];
  supplements: any[];
  vitamins: any[];
}

export function StudentDownloadDialog({
  open,
  onOpenChange,
  student,
  exercises,
  meals,
  supplements,
  vitamins,
}: StudentDownloadDialogProps) {
  const { toast } = useToast();
  const [selectedOptions, setSelectedOptions] = useState({
    personalInfo: true,
    exercises: true,
    diet: true,
    supplements: true,
  });
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [loading, setLoading] = useState(false);
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [gymInfo, setGymInfo] = useState({
    name: "باشگاه بدنسازی فیکس",
    trainerName: "استاد علی محمدی",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۸",
    phone: "۰۲۱-۸۸۷۷۶۶۵۵",
    instagram: "@fitnessfix",
    website: "www.fitnessfix.ir",
  });

  // Load gym info and trainer data from localStorage if available
  useEffect(() => {
    // Load gym info
    const savedGymInfo = localStorage.getItem("gymInfo");
    if (savedGymInfo) {
      try {
        setGymInfo(prev => ({...prev, ...JSON.parse(savedGymInfo)}));
      } catch (error) {
        console.error("Error parsing gym info:", error);
      }
    }

    // Load trainer info
    const savedTrainerInfo = localStorage.getItem("trainerProfile");
    if (savedTrainerInfo) {
      try {
        const trainer = JSON.parse(savedTrainerInfo);
        setTrainerInfo(trainer);
        
        // Update gym info with trainer info if available
        setGymInfo(prev => ({
          ...prev,
          trainerName: trainer.name || prev.trainerName,
          address: trainer.address || prev.address,
          phone: trainer.phone || prev.phone,
          instagram: trainer.instagram || prev.instagram,
          website: trainer.website || prev.website,
        }));
      } catch (error) {
        console.error("Error parsing trainer info:", error);
      }
    }
  }, []);

  if (!student) return null;

  // Get student exercise details
  const studentExercises = exercises.filter((exercise) =>
    student.exercises?.includes(exercise.id)
  );

  // Get student meal details
  const studentMeals = meals.filter((meal) =>
    student.meals?.includes(meal.id)
  );

  // Get student supplement details
  const studentSupplements = supplements.filter((supplement) =>
    student.supplements?.includes(supplement.id)
  );

  // Get student vitamin details
  const studentVitamins = vitamins.filter((vitamin) =>
    student.vitamins?.includes(vitamin.id)
  );

  // Group exercises by category
  const exercisesByCategory = studentExercises.reduce((acc, exercise) => {
    const category = exercise.category || "دسته‌بندی نشده";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(exercise);
    return acc;
  }, {});

  // Group meals by day and type
  const mealsByDayAndType = studentMeals.reduce((acc, meal) => {
    const day = meal.day || "روز نامشخص";
    if (!acc[day]) {
      acc[day] = {};
    }
    const type = meal.type || "وعده نامشخص";
    if (!acc[day][type]) {
      acc[day][type] = [];
    }
    acc[day][type].push(meal);
    return acc;
  }, {});

  // Handle checkboxes
  const handleCheckboxChange = (option: keyof typeof selectedOptions) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  // Handle print
  const handlePrint = async () => {
    const printContent = document.getElementById("print-content");
    if (!printContent) return;

    const originalDisplay = document.body.style.display;
    const printStyles = `
      <style>
        @font-face {
          font-family: 'Vazirmatn';
          src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Regular.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Vazirmatn';
          src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Bold.woff2') format('woff2');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
        
        @page {
          size: A4;
          margin: 1.5cm;
        }
        
        @media print {
          html, body { 
            direction: rtl !important; 
            font-family: 'Vazirmatn', Tahoma, Arial, sans-serif !important; 
            padding: 0 !important;
            margin: 0 !important;
            font-size: 13px !important;
          }
          
          * {
            font-family: 'Vazirmatn', Tahoma, Arial, sans-serif !important;
            text-align: right !important;
          }
          
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 20px !important;
            direction: rtl !important;
          }
          
          .gym-header {
            text-align: center !important;
            padding-bottom: 15px !important;
            margin-bottom: 20px !important;
            border-bottom: 3px solid #4338ca !important;
          }
          
          .gym-name {
            font-size: 24px !important;
            font-weight: bold !important;
            color: #4338ca !important;
            margin-bottom: 5px !important;
            text-align: center !important;
          }
          
          .gym-trainer {
            font-size: 18px !important;
            color: #6b7280 !important;
            margin-bottom: 5px !important;
            text-align: center !important;
          }
          
          .gym-contact {
            font-size: 12px !important;
            color: #6b7280 !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            gap: 15px !important;
            text-align: center !important;
          }
          
          .print-section { 
            margin-bottom: 30px !important; 
            page-break-inside: avoid !important; 
            background-color: #f9fafb !important;
            border-radius: 12px !important;
            padding: 15px !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05) !important;
            direction: rtl !important;
          }
          
          .print-header { 
            margin-bottom: 15px !important; 
            font-size: 18px !important; 
            font-weight: bold !important; 
            color: #4338ca !important; 
            border-bottom: 2px solid #4338ca !important; 
            padding-bottom: 8px !important; 
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
          }
          
          .print-subheader { 
            margin-bottom: 12px !important;
            margin-top: 20px !important;
            font-size: 16px !important; 
            font-weight: bold !important; 
            color: #6366f1 !important; 
            background-color: #eef2ff !important;
            padding: 8px 12px !important;
            border-radius: 8px !important;
          }
          
          .print-item { 
            margin-bottom: 12px !important; 
            padding: 12px !important; 
            border: 1px solid #e5e7eb !important; 
            border-radius: 8px !important; 
            background-color: white !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.03) !important;
          }
          
          .print-item-title { 
            font-weight: bold !important; 
            margin-bottom: 8px !important; 
            color: #1f2937 !important;
            font-size: 14px !important;
          }
          
          .print-item-subtitle { 
            font-size: 12px !important; 
            color: #6b7280 !important; 
            margin-bottom: 8px !important; 
          }
          
          .print-item-detail { 
            font-size: 12px !important; 
            margin-bottom: 4px !important; 
            display: flex !important;
            gap: 5px !important;
          }
          
          .print-item-detail-label {
            font-weight: bold !important;
            color: #4b5563 !important;
          }
          
          .print-footer { 
            margin-top: 30px !important; 
            text-align: center !important; 
            font-size: 12px !important; 
            color: #6b7280 !important; 
            padding-top: 10px !important;
            border-top: 1px solid #e5e7eb !important;
          }
          
          .student-header { 
            display: flex !important; 
            align-items: center !important; 
            margin-bottom: 20px !important; 
            background-color: white !important;
            padding: 15px !important;
            border-radius: 12px !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
          }
          
          .student-image-container {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-left: 20px !important;
          }
          
          .student-image { 
            width: 100px !important; 
            height: 100px !important; 
            border-radius: 50% !important; 
            object-fit: cover !important; 
            border: 3px solid #4338ca !important;
          }
          
          .student-info { 
            flex: 1 !important; 
          }
          
          .student-name { 
            font-size: 26px !important; 
            font-weight: bold !important; 
            margin-bottom: 8px !important;
            color: #111827 !important;
          }
          
          .student-detail { 
            font-size: 14px !important; 
            color: #4b5563 !important; 
            margin-bottom: 4px !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
          }
          
          .print-date {
            text-align: left !important;
            font-size: 12px !important;
            color: #6b7280 !important;
            margin-bottom: 10px !important;
            font-family: 'Vazirmatn', Tahoma, Arial, sans-serif !important;
          }

          .meal-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }

          .meal-type-header {
            font-weight: bold !important;
            font-size: 14px !important;
            color: #059669 !important;
            margin: 8px 0 !important;
            padding: 5px 10px !important;
            background-color: #ecfdf5 !important;
            border-radius: 6px !important;
            display: inline-block !important;
          }

          .supplement-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
          }

          .supplement-category {
            font-weight: bold !important;
            font-size: 14px !important;
            color: #7c3aed !important;
            margin: 8px 0 !important;
            padding: 5px 10px !important;
            background-color: #f5f3ff !important;
            border-radius: 6px !important;
            display: inline-block !important;
          }
          
          /* Replace SVG icons with Unicode symbols */
          .icon-replacement {
            font-family: sans-serif !important;
            font-weight: bold !important;
            display: inline-block !important;
            width: 18px !important;
            height: 18px !important;
            line-height: 18px !important;
            text-align: center !important;
            border-radius: 50% !important;
            margin-left: 5px !important;
            font-size: 11px !important;
          }
          
          .icon-phone {
            background-color: #e0e7ff !important;
            color: #4338ca !important;
          }
          
          .icon-height {
            background-color: #dbeafe !important;
            color: #1d4ed8 !important;
          }
          
          .icon-weight {
            background-color: #fef3c7 !important;
            color: #b45309 !important;
          }
          
          .calendar-icon {
            background-color: #d1fae5 !important;
            color: #047857 !important;
          }
        }
      </style>
    `;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast({
        title: "خطا",
        description: "امکان باز کردن پنجره چاپ وجود ندارد",
        variant: "destructive",
      });
      return;
    }

    printWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>اطلاعات ${student.name} - ${gymInfo.name}</title>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          ${printStyles}
        </head>
        <body dir="rtl">
          <div class="print-container">
            <div class="print-date">تاریخ: ${formatJalaliDate(new Date())}</div>
            <div class="gym-header">
              <div class="gym-name">${gymInfo.name}</div>
              <div class="gym-trainer">${gymInfo.trainerName}</div>
              <div class="gym-contact">
                <span>${gymInfo.phone}</span>
                <span>${gymInfo.address}</span>
                <span>${gymInfo.instagram}</span>
              </div>
            </div>
            ${printContent.innerHTML
              .replace(/<svg[^>]*>.*?<\/svg>/gi, '<span class="icon-replacement icon-phone">📞</span>')
              .replace(/height/gi, '<span class="icon-replacement icon-height">📏</span>قد')
              .replace(/weight/gi, '<span class="icon-replacement icon-weight">⚖️</span>وزن')
            }
            <div class="print-footer">
              این گزارش به صورت خودکار توسط سیستم مدیریت ${gymInfo.name} تولید شده است.
              <div style="margin-top: 5px;">${gymInfo.website}</div>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load with fonts
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1500);
  };

  // Handle PDF export
  const handleExportPDF = async () => {
    setLoading(true);
    try {
      const printContent = document.getElementById("print-content");
      if (!printContent) return;

      // Add custom fonts to jsPDF
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      
      // Set PDF to right-to-left
      pdf.setR2L(true);

      // Add the gym header temporarily to the content for capturing
      const tempHeader = document.createElement("div");
      tempHeader.className = "gym-header-for-pdf";
      tempHeader.style.cssText = "text-align: center; margin-bottom: 20px; direction: rtl;";
      tempHeader.innerHTML = `
        <div style="font-size: 24px; font-weight: bold; color: #4338ca; margin-bottom: 5px; text-align: center;">${gymInfo.name}</div>
        <div style="font-size: 18px; color: #6b7280; margin-bottom: 5px; text-align: center;">${gymInfo.trainerName}</div>
        <div style="font-size: 12px; color: #6b7280; display: flex; justify-content: center; gap: 15px; text-align: center;">
          <span>${gymInfo.phone}</span>
          <span>${gymInfo.address}</span>
          <span>${gymInfo.instagram}</span>
        </div>
      `;
      printContent.prepend(tempHeader);

      // Create a date div
      const dateDiv = document.createElement("div");
      dateDiv.className = "print-date-for-pdf";
      dateDiv.style.cssText = "text-align: left; font-size: 12px; color: #6b7280; margin-bottom: 10px; direction: rtl;";
      dateDiv.innerHTML = `تاریخ: ${formatJalaliDate(new Date())}`;
      printContent.prepend(dateDiv);

      // Create a footer div
      const footerDiv = document.createElement("div");
      footerDiv.className = "print-footer-for-pdf";
      footerDiv.style.cssText = "margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280; padding-top: 10px; border-top: 1px solid #e5e7eb; direction: rtl;";
      footerDiv.innerHTML = `
        این گزارش به صورت خودکار توسط سیستم مدیریت ${gymInfo.name} تولید شده است.
        <div style="margin-top: 5px;">${gymInfo.website}</div>
      `;
      printContent.appendChild(footerDiv);

      // Fix student image container styling
      const studentImgContainers = printContent.querySelectorAll('.student-image-container');
      studentImgContainers.forEach(container => {
        (container as HTMLElement).style.display = 'flex';
        (container as HTMLElement).style.justifyContent = 'center';
        (container as HTMLElement).style.alignItems = 'center';
      });

      // Set explicit RTL direction on all elements
      const allElements = printContent.querySelectorAll('*');
      allElements.forEach(el => {
        (el as HTMLElement).style.direction = 'rtl';
        (el as HTMLElement).style.textAlign = 'right';
      });
      
      // Replace SVG icons with emoji characters for better PDF rendering
      const svgIcons = printContent.querySelectorAll('svg');
      svgIcons.forEach((svg) => {
        const span = document.createElement('span');
        span.className = 'icon-replacement';
        
        if (svg.classList.contains('lucide-phone')) {
          span.innerHTML = '📞';
          span.className += ' icon-phone';
        } else if (svg.classList.contains('lucide-ruler')) {
          span.innerHTML = '📏';
          span.className += ' icon-height';
        } else if (svg.classList.contains('lucide-scale')) {
          span.innerHTML = '⚖️';
          span.className += ' icon-weight';
        } else if (svg.classList.contains('lucide-dumbbell')) {
          span.innerHTML = '🏋️';
          span.className += ' icon-exercise';
        } else if (svg.classList.contains('lucide-apple')) {
          span.innerHTML = '🍎';
          span.className += ' icon-diet';
        } else if (svg.classList.contains('lucide-pill')) {
          span.innerHTML = '💊';
          span.className += ' icon-supplement';
        } else if (svg.classList.contains('lucide-calendar')) {
          span.innerHTML = '📅';
          span.className += ' calendar-icon';
        } else {
          span.innerHTML = '•';
        }
        
        svg.parentNode?.replaceChild(span, svg);
      });

      const canvas = await html2canvas(printContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 800,
        height: printContent.scrollHeight,
        windowWidth: 1000,
        onclone: (doc, element) => {
          // Apply RTL and font styles to the cloned document
          const style = doc.createElement('style');
          style.innerHTML = `
            * {
              direction: rtl !important;
              text-align: right !important;
              font-family: Tahoma, Arial, sans-serif !important;
            }
          `;
          doc.head.appendChild(style);
          
          // Set RTL on all elements
          const allElements = element.querySelectorAll('*');
          allElements.forEach(el => {
            (el as HTMLElement).style.direction = 'rtl';
            (el as HTMLElement).style.textAlign = 'right';
          });
        }
      });

      // Remove the temporary elements
      const tempHeaderElement = printContent.querySelector(".gym-header-for-pdf");
      if (tempHeaderElement) tempHeaderElement.remove();
      
      const tempDateElement = printContent.querySelector(".print-date-for-pdf");
      if (tempDateElement) tempDateElement.remove();
      
      const tempFooterElement = printContent.querySelector(".print-footer-for-pdf");
      if (tempFooterElement) tempFooterElement.remove();

      // Restore SVG icons
      // This step is unnecessary as we'll reload the component after export
      
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      let imgY = 10;

      // If image is too tall, split it across multiple pages
      const maxHeight = pdfHeight - 20; // margins
      const totalPages = Math.ceil(imgHeight * ratio / maxHeight);
      
      if (totalPages <= 1) {
        // Image fits on one page
        pdf.addImage(
          imgData,
          "JPEG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
      } else {
        // Image needs multiple pages
        for (let i = 0; i < totalPages; i++) {
          if (i > 0) {
            pdf.addPage();
          }
          
          // Calculate which part of the image to show on this page
          const sourceY = i * maxHeight / ratio;
          const sourceHeight = Math.min(maxHeight / ratio, imgHeight - sourceY);
          
          pdf.addImage(
            imgData,
            "JPEG",
            imgX,
            imgY,
            imgWidth * ratio,
            sourceHeight * ratio,
            undefined,
            'FAST',
            0
          );
        }
      }

      pdf.save(`${student.name}_${gymInfo.name}_report.pdf`);

      toast({
        title: "دانلود موفق",
        description: "فایل PDF با موفقیت دانلود شد",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "خطا",
        description: "خطا در ایجاد فایل PDF",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] h-[750px] flex flex-col overflow-hidden" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <span>دانلود اطلاعات {student.name}</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            بخش‌های مورد نظر را انتخاب کرده و فایل را دانلود یا چاپ کنید
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-indigo-50/30 to-purple-50/30">
          <Tabs
            defaultValue="preview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="border-b px-6 py-2">
              <TabsList className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <TabsTrigger value="preview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                  <FileText className="h-4 w-4 ml-2" />
                  پیش‌نمایش
                </TabsTrigger>
                <TabsTrigger value="options" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                  <CheckCheck className="h-4 w-4 ml-2" />
                  انتخاب موارد
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="options" className="flex-1 p-6 overflow-auto">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <Card className="border-indigo-100">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg pb-2">
                    <CardTitle className="text-xl text-indigo-700">انتخاب بخش‌ها</CardTitle>
                    <CardDescription>
                      مشخص کنید کدام بخش‌ها در خروجی نمایش داده شوند
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                      <Checkbox
                        id="personalInfo"
                        checked={selectedOptions.personalInfo}
                        onCheckedChange={() => handleCheckboxChange("personalInfo")}
                        className="border-indigo-300 data-[state=checked]:bg-indigo-600"
                      />
                      <label
                        htmlFor="personalInfo"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        <User className="h-4 w-4 ml-2 text-indigo-500" />
                        اطلاعات شخصی
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg hover:bg-blue-50 transition-colors">
                      <Checkbox
                        id="exercises"
                        checked={selectedOptions.exercises}
                        onCheckedChange={() => handleCheckboxChange("exercises")}
                        className="border-blue-300 data-[state=checked]:bg-blue-600"
                      />
                      <label
                        htmlFor="exercises"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        <Dumbbell className="h-4 w-4 ml-2 text-blue-500" />
                        برنامه تمرینی
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg hover:bg-green-50 transition-colors">
                      <Checkbox
                        id="diet"
                        checked={selectedOptions.diet}
                        onCheckedChange={() => handleCheckboxChange("diet")}
                        className="border-green-300 data-[state=checked]:bg-green-600"
                      />
                      <label
                        htmlFor="diet"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        <Apple className="h-4 w-4 ml-2 text-green-500" />
                        برنامه غذایی
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg hover:bg-purple-50 transition-colors">
                      <Checkbox
                        id="supplements"
                        checked={selectedOptions.supplements}
                        onCheckedChange={() => handleCheckboxChange("supplements")}
                        className="border-purple-300 data-[state=checked]:bg-purple-600"
                      />
                      <label
                        htmlFor="supplements"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        <Pill className="h-4 w-4 ml-2 text-purple-500" />
                        مکمل‌ها و ویتامین‌ها
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-indigo-100 bg-gradient-to-r from-indigo-50/30 to-purple-50/30">
                    <Button 
                      onClick={() => setActiveTab("preview")}
                      className="ml-auto bg-indigo-600 hover:bg-indigo-700 gap-2"
                    >
                      مشاهده پیش‌نمایش
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-indigo-100">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg pb-2">
                    <CardTitle className="text-xl text-indigo-700">اطلاعات باشگاه</CardTitle>
                    <CardDescription>
                      این اطلاعات در بالای گزارش چاپی نمایش داده می‌شود
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label htmlFor="gymName" className="text-sm font-medium flex items-center text-indigo-700">
                        <Award className="h-4 w-4 ml-2" />
                        نام باشگاه
                      </label>
                      <input
                        id="gymName"
                        value={gymInfo.name}
                        onChange={(e) => setGymInfo({...gymInfo, name: e.target.value})}
                        className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="trainerName" className="text-sm font-medium flex items-center text-indigo-700">
                        <User className="h-4 w-4 ml-2" />
                        نام مربی
                      </label>
                      <input
                        id="trainerName"
                        value={gymInfo.trainerName}
                        onChange={(e) => setGymInfo({...gymInfo, trainerName: e.target.value})}
                        className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium flex items-center text-indigo-700">
                        <MapPin className="h-4 w-4 ml-2" />
                        آدرس
                      </label>
                      <input
                        id="address"
                        value={gymInfo.address}
                        onChange={(e) => setGymInfo({...gymInfo, address: e.target.value})}
                        className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium flex items-center text-indigo-700">
                        <Phone className="h-4 w-4 ml-2" />
                        شماره تماس
                      </label>
                      <input
                        id="phone"
                        value={gymInfo.phone}
                        onChange={(e) => setGymInfo({...gymInfo, phone: e.target.value})}
                        className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="instagram" className="text-sm font-medium flex items-center text-indigo-700">
                          اینستاگرام
                        </label>
                        <input
                          id="instagram"
                          value={gymInfo.instagram}
                          onChange={(e) => setGymInfo({...gymInfo, instagram: e.target.value})}
                          className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="website" className="text-sm font-medium flex items-center text-indigo-700">
                          وب‌سایت
                        </label>
                        <input
                          id="website"
                          value={gymInfo.website}
                          onChange={(e) => setGymInfo({...gymInfo, website: e.target.value})}
                          className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-indigo-100 bg-gradient-to-r from-indigo-50/30 to-purple-50/30">
                    <Button 
                      variant="outline" 
                      className="ml-auto border-indigo-200 text-indigo-700"
                      onClick={() => {
                        localStorage.setItem("gymInfo", JSON.stringify(gymInfo));
                        toast({
                          title: "ذخیره موفق",
                          description: "اطلاعات باشگاه با موفقیت ذخیره شد",
                        });
                      }}
                    >
                      ذخیره اطلاعات باشگاه
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-6">
                <div id="print-content" className="p-6 bg-white rounded-lg shadow-sm" dir="rtl">
                  {selectedOptions.personalInfo && (
                    <div className="print-section">
                      <div className="student-header">
                        <div className="student-image-container">
                          <Avatar className="w-24 h-24 border-4 border-indigo-500">
                            <AvatarImage 
                              src={student.image || "/placeholder.svg"}
                              alt={student.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="text-xl font-bold">
                              {student.name?.charAt(0) || 'S'}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="student-info">
                          <h2 className="student-name">{student.name}</h2>
                          <p className="student-detail">
                            <Phone className="h-4 w-4 text-indigo-500 lucide-phone" />
                            <span className="font-medium ml-1">شماره تماس:</span>
                            {toPersianNumbers(student.phone)}
                          </p>
                          <p className="student-detail">
                            <Ruler className="h-4 w-4 text-blue-500 lucide-ruler" />
                            <span className="font-medium ml-1">قد:</span>
                            {toPersianNumbers(student.height)} سانتی‌متر
                          </p>
                          <p className="student-detail">
                            <Scale className="h-4 w-4 text-amber-500 lucide-scale" />
                            <span className="font-medium ml-1">وزن:</span>
                            {toPersianNumbers(student.weight)} کیلوگرم
                          </p>
                          <p className="student-detail">
                            <Calendar className="h-4 w-4 text-green-500 lucide-calendar" />
                            <span className="font-medium ml-1">تاریخ گزارش:</span>
                            {formatJalaliDate(new Date())}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedOptions.exercises && studentExercises.length > 0 && (
                    <div className="print-section">
                      <h3 className="print-header">
                        <div className="flex items-center">
                          <Dumbbell className="h-5 w-5 ml-2 text-blue-600 lucide-dumbbell" />
                          برنامه تمرینی
                        </div>
                      </h3>
                      {Object.entries(exercisesByCategory).map(([category, exs]: [string, any[]]) => (
                        <div key={category} className="mb-6">
                          <h4 className="print-subheader">{category}</h4>
                          <div className="grid gap-3 md:grid-cols-2">
                            {exs.map((exercise) => (
                              <div key={exercise.id} className="print-item">
                                <div className="print-item-title">{exercise.name}</div>
                                {exercise.description && (
                                  <div className="print-item-subtitle">
                                    {exercise.description}
                                  </div>
                                )}
                                <div className="flex flex-wrap gap-3 mt-2">
                                  {exercise.sets && (
                                    <div className="print-item-detail bg-blue-50 px-2 py-1 rounded-md">
                                      <span className="print-item-detail-label">ست:</span>
                                      {toPersianNumbers(exercise.sets)}
                                    </div>
                                  )}
                                  {exercise.reps && (
                                    <div className="print-item-detail bg-blue-50 px-2 py-1 rounded-md">
                                      <span className="print-item-detail-label">تکرار:</span>
                                      {toPersianNumbers(exercise.reps)}
                                    </div>
                                  )}
                                  {exercise.rest && (
                                    <div className="print-item-detail bg-blue-50 px-2 py-1 rounded-md">
                                      <span className="print-item-detail-label">استراحت:</span>
                                      {exercise.rest}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedOptions.diet && studentMeals.length > 0 && (
                    <div className="print-section">
                      <h3 className="print-header">
                        <div className="flex items-center">
                          <Apple className="h-5 w-5 ml-2 text-green-600 lucide-apple" />
                          برنامه غذایی
                        </div>
                      </h3>
                      {Object.entries(mealsByDayAndType).map(([day, types]: [string, any]) => (
                        <div key={day} className="mb-6">
                          <h4 className="print-subheader">{day}</h4>
                          <div className="meal-grid">
                            {Object.entries(types).map(([type, meals]: [string, any[]]) => (
                              <div key={type} className="mb-4">
                                <h5 className="meal-type-header">
                                  {type}
                                </h5>
                                <div className="grid gap-3">
                                  {meals.map((meal) => (
                                    <div key={meal.id} className="print-item">
                                      <div className="print-item-title">{meal.name}</div>
                                      {meal.description && (
                                        <div className="print-item-subtitle">
                                          {meal.description}
                                        </div>
                                      )}
                                      <div className="flex flex-wrap gap-3 mt-2">
                                        <div className="print-item-detail bg-green-50 px-2 py-1 rounded-md">
                                          <span className="print-item-detail-label">کالری:</span>
                                          {toPersianNumbers(meal.calories || 0)}
                                        </div>
                                        <div className="print-item-detail bg-green-50 px-2 py-1 rounded-md">
                                          <span className="print-item-detail-label">پروتئین:</span>
                                          {toPersianNumbers(meal.protein || 0)} گرم
                                        </div>
                                        <div className="print-item-detail bg-green-50 px-2 py-1 rounded-md">
                                          <span className="print-item-detail-label">کربوهیدرات:</span>
                                          {toPersianNumbers(meal.carbs || 0)} گرم
                                        </div>
                                        <div className="print-item-detail bg-green-50 px-2 py-1 rounded-md">
                                          <span className="print-item-detail-label">چربی:</span>
                                          {toPersianNumbers(meal.fat || 0)} گرم
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedOptions.supplements && (studentSupplements.length > 0 || studentVitamins.length > 0) && (
                    <div className="print-section">
                      <h3 className="print-header">
                        <div className="flex items-center">
                          <Pill className="h-5 w-5 ml-2 text-purple-600 lucide-pill" />
                          مکمل‌ها و ویتامین‌ها
                        </div>
                      </h3>
                      
                      <div className="supplement-grid">
                        {studentSupplements.length > 0 && (
                          <div className="mb-6">
                            <div className="supplement-category">مکمل‌ها</div>
                            <div className="grid gap-3">
                              {studentSupplements.map((supplement) => (
                                <div key={supplement.id} className="print-item">
                                  <div className="print-item-title">{supplement.name}</div>
                                  <div className="print-item-subtitle">{supplement.category}</div>
                                  {supplement.description && (
                                    <div className="print-item-detail mb-2">
                                      {supplement.description}
                                    </div>
                                  )}
                                  <div className="flex flex-wrap gap-3 mt-2">
                                    <div className="print-item-detail bg-purple-50 px-2 py-1 rounded-md">
                                      <span className="print-item-detail-label">مقدار مصرف:</span>
                                      {supplement.dosage}
                                    </div>
                                    <div className="print-item-detail bg-purple-50 px-2 py-1 rounded-md">
                                      <span className="print-item-detail-label">زمان مصرف:</span>
                                      {supplement.timing}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {studentVitamins.length > 0 && (
                          <div>
                            <div className="supplement-category">ویتامین‌ها</div>
                            <div className="grid gap-3">
                              {studentVitamins.map((vitamin) => (
                                <div key={vitamin.id} className="print-item">
                                  <div className="print-item-title">{vitamin.name}</div>
                                  <div className="print-item-subtitle">{vitamin.category}</div>
                                  {vitamin.description && (
                                    <div className="print-item-detail mb-2">
                                      {vitamin.description}
                                    </div>
                                  )}
                                  <div className="flex flex-wrap gap-3 mt-2">
                                    <div className="print-item-detail bg-purple-50 px-2 py-1 rounded-md">
                                      <span className="print-item-detail-label">مقدار مصرف:</span>
                                      {vitamin.dosage}
                                    </div>
                                    <div className="print-item-detail bg-purple-50 px-2 py-1 rounded-md">
                                      <span className="print-item-detail-label">زمان مصرف:</span>
                                      {vitamin.timing}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t bg-gradient-to-r from-indigo-50/50 to-purple-50/50 mt-auto flex justify-between items-center">
                <div className="text-sm font-medium text-indigo-700">
                  پیش‌نمایش گزارش {student.name}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("options")}
                    className="gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    <CheckCheck className="h-4 w-4" />
                    تنظیم گزینه‌ها
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handlePrint}
                    className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                  >
                    <Printer className="h-4 w-4" />
                    چاپ
                  </Button>
                  <Button 
                    onClick={handleExportPDF}
                    disabled={loading}
                    className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                        در حال پردازش...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        دانلود PDF
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

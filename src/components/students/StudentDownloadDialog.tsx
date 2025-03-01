
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
  const [gymInfo, setGymInfo] = useState({
    name: "باشگاه بدنسازی حرفه‌ای فیتنس پلاس",
    trainerName: "استاد علی محمدی",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۸",
    phone: "۰۲۱-۸۸۷۷۶۶۵۵",
    instagram: "@fitnessplus",
    website: "www.fitnessplus.ir",
  });

  // Load gym info from localStorage if available
  useEffect(() => {
    const savedGymInfo = localStorage.getItem("gymInfo");
    if (savedGymInfo) {
      try {
        setGymInfo(JSON.parse(savedGymInfo));
      } catch (error) {
        console.error("Error parsing gym info:", error);
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
        }
        
        @font-face {
          font-family: 'Vazirmatn';
          src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Bold.woff2') format('woff2');
          font-weight: bold;
          font-style: normal;
        }
        
        @media print {
          body { 
            direction: rtl; 
            font-family: 'Vazirmatn', sans-serif; 
            padding: 0;
            margin: 0;
          }
          
          .print-container {
            padding: 20px;
          }
          
          .gym-header {
            text-align: center;
            padding-bottom: 15px;
            margin-bottom: 20px;
            border-bottom: 3px solid #4338ca;
          }
          
          .gym-name {
            font-size: 24px;
            font-weight: bold;
            color: #4338ca;
            margin-bottom: 5px;
          }
          
          .gym-trainer {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 5px;
          }
          
          .gym-contact {
            font-size: 12px;
            color: #6b7280;
            display: flex;
            justify-content: center;
            gap: 15px;
          }
          
          .print-section { 
            margin-bottom: 30px; 
            page-break-inside: avoid; 
            background-color: #f9fafb;
            border-radius: 12px;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }
          
          .print-header { 
            margin-bottom: 15px; 
            font-size: 18px; 
            font-weight: bold; 
            color: #4338ca; 
            border-bottom: 2px solid #4338ca; 
            padding-bottom: 8px; 
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .print-subheader { 
            margin-bottom: 12px;
            margin-top: 20px;
            font-size: 16px; 
            font-weight: bold; 
            color: #6366f1; 
            background-color: #eef2ff;
            padding: 8px 12px;
            border-radius: 8px;
          }
          
          .print-item { 
            margin-bottom: 12px; 
            padding: 12px; 
            border: 1px solid #e5e7eb; 
            border-radius: 8px; 
            background-color: white;
            box-shadow: 0 1px 4px rgba(0,0,0,0.03);
          }
          
          .print-item-title { 
            font-weight: bold; 
            margin-bottom: 8px; 
            color: #1f2937;
            font-size: 14px;
          }
          
          .print-item-subtitle { 
            font-size: 12px; 
            color: #6b7280; 
            margin-bottom: 8px; 
          }
          
          .print-item-detail { 
            font-size: 12px; 
            margin-bottom: 4px; 
            display: flex;
            gap: 5px;
          }
          
          .print-item-detail-label {
            font-weight: bold;
            color: #4b5563;
          }
          
          .print-footer { 
            margin-top: 30px; 
            text-align: center; 
            font-size: 12px; 
            color: #6b7280; 
            padding-top: 10px;
            border-top: 1px solid #e5e7eb;
          }
          
          .student-header { 
            display: flex; 
            align-items: center; 
            margin-bottom: 20px; 
            background-color: white;
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          }
          
          .student-image { 
            width: 100px; 
            height: 100px; 
            border-radius: 50%; 
            margin-left: 20px; 
            object-fit: cover; 
            border: 3px solid #4338ca;
          }
          
          .student-info { 
            flex: 1; 
          }
          
          .student-name { 
            font-size: 26px; 
            font-weight: bold; 
            margin-bottom: 8px;
            color: #111827;
          }
          
          .student-detail { 
            font-size: 14px; 
            color: #4b5563; 
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .print-date {
            text-align: left;
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 10px;
          }

          .meal-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .meal-type-header {
            font-weight: bold;
            font-size: 14px;
            color: #059669;
            margin: 8px 0;
            padding: 5px 10px;
            background-color: #ecfdf5;
            border-radius: 6px;
            display: inline-block;
          }

          .supplement-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .supplement-category {
            font-weight: bold;
            font-size: 14px;
            color: #7c3aed;
            margin: 8px 0;
            padding: 5px 10px;
            background-color: #f5f3ff;
            border-radius: 6px;
            display: inline-block;
          }

          @page {
            size: A4;
            margin: 1.5cm;
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
      <html>
        <head>
          <title>اطلاعات ${student.name} - ${gymInfo.name}</title>
          <meta charset="UTF-8">
          ${printStyles}
        </head>
        <body>
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
            ${printContent.innerHTML}
            <div class="print-footer">
              این گزارش به صورت خودکار توسط سیستم مدیریت باشگاه ${gymInfo.name} تولید شده است.
              <div style="margin-top: 5px;">${gymInfo.website}</div>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  };

  // Handle PDF export
  const handleExportPDF = async () => {
    setLoading(true);
    try {
      const printContent = document.getElementById("print-content");
      if (!printContent) return;

      // Add the gym header temporarily to the content for capturing
      const tempHeader = document.createElement("div");
      tempHeader.className = "gym-header-for-pdf";
      tempHeader.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 24px; font-weight: bold; color: #4338ca; margin-bottom: 5px;">${gymInfo.name}</div>
          <div style="font-size: 18px; color: #6b7280; margin-bottom: 5px;">${gymInfo.trainerName}</div>
          <div style="font-size: 12px; color: #6b7280; display: flex; justify-content: center; gap: 15px;">
            <span>${gymInfo.phone}</span>
            <span>${gymInfo.address}</span>
            <span>${gymInfo.instagram}</span>
          </div>
        </div>
      `;
      printContent.prepend(tempHeader);

      // Create a date div
      const dateDiv = document.createElement("div");
      dateDiv.className = "print-date-for-pdf";
      dateDiv.style.textAlign = "left";
      dateDiv.style.fontSize = "12px";
      dateDiv.style.color = "#6b7280";
      dateDiv.style.marginBottom = "10px";
      dateDiv.innerHTML = `تاریخ: ${formatJalaliDate(new Date())}`;
      printContent.prepend(dateDiv);

      // Create a footer div
      const footerDiv = document.createElement("div");
      footerDiv.className = "print-footer-for-pdf";
      footerDiv.style.marginTop = "30px";
      footerDiv.style.textAlign = "center";
      footerDiv.style.fontSize = "12px";
      footerDiv.style.color = "#6b7280";
      footerDiv.style.paddingTop = "10px";
      footerDiv.style.borderTop = "1px solid #e5e7eb";
      footerDiv.innerHTML = `
        این گزارش به صورت خودکار توسط سیستم مدیریت باشگاه ${gymInfo.name} تولید شده است.
        <div style="margin-top: 5px;">${gymInfo.website}</div>
      `;
      printContent.appendChild(footerDiv);

      const canvas = await html2canvas(printContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1200,
        width: 1200,
      });

      // Remove the temporary elements
      const tempHeaderElement = printContent.querySelector(".gym-header-for-pdf");
      if (tempHeaderElement) tempHeaderElement.remove();
      
      const tempDateElement = printContent.querySelector(".print-date-for-pdf");
      if (tempDateElement) tempDateElement.remove();
      
      const tempFooterElement = printContent.querySelector(".print-footer-for-pdf");
      if (tempFooterElement) tempFooterElement.remove();

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });
      
      // Set PDF to right-to-left
      pdf.setR2L(true);
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(
        imgData,
        "JPEG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

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
                        <img
                          src={student.image || "/placeholder.svg"}
                          alt={student.name}
                          className="student-image"
                        />
                        <div className="student-info">
                          <h2 className="student-name">{student.name}</h2>
                          <p className="student-detail">
                            <Phone className="h-4 w-4 text-indigo-500" />
                            <span className="font-medium ml-1">شماره تماس:</span>
                            {toPersianNumbers(student.phone)}
                          </p>
                          <p className="student-detail">
                            <span className="font-medium ml-1">قد:</span>
                            {toPersianNumbers(student.height)} سانتی‌متر
                          </p>
                          <p className="student-detail">
                            <span className="font-medium ml-1">وزن:</span>
                            {toPersianNumbers(student.weight)} کیلوگرم
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedOptions.exercises && studentExercises.length > 0 && (
                    <div className="print-section">
                      <h3 className="print-header">
                        <div className="flex items-center">
                          <Dumbbell className="h-5 w-5 ml-2 text-blue-600" />
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
                          <Apple className="h-5 w-5 ml-2 text-green-600" />
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
                          <Pill className="h-5 w-5 ml-2 text-purple-600" />
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


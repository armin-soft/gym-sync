
import React, { useState } from "react";
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
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";

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
        @media print {
          body { direction: rtl; font-family: 'Vazirmatn', sans-serif; }
          .print-section { margin-bottom: 20px; page-break-inside: avoid; }
          .print-header { margin-bottom: 15px; font-size: 18px; font-weight: bold; color: #4338ca; border-bottom: 2px solid #4338ca; padding-bottom: 5px; }
          .print-subheader { margin-bottom: 10px; font-size: 16px; font-weight: bold; color: #6366f1; }
          .print-item { margin-bottom: 10px; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; }
          .print-item-title { font-weight: bold; margin-bottom: 5px; }
          .print-item-subtitle { font-size: 12px; color: #6b7280; margin-bottom: 5px; }
          .print-item-detail { font-size: 12px; margin-bottom: 2px; }
          .print-footer { margin-top: 20px; text-align: center; font-size: 12px; color: #6b7280; }
          .student-header { display: flex; align-items: center; margin-bottom: 20px; }
          .student-image { width: 80px; height: 80px; border-radius: 50%; margin-left: 15px; object-fit: cover; }
          .student-info { flex: 1; }
          .student-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
          .student-detail { font-size: 14px; color: #4b5563; margin-bottom: 2px; }
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
          <title>اطلاعات ${student.name}</title>
          ${printStyles}
        </head>
        <body>
          ${printContent.innerHTML}
          <div class="print-footer">
            این گزارش به صورت خودکار توسط سیستم مدیریت باشگاه تولید شده است.
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

      const canvas = await html2canvas(printContent, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      
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

      pdf.save(`${student.name}_report.pdf`);

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
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
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
              <TabsList className="bg-indigo-50">
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
              <Card>
                <CardHeader>
                  <CardTitle>انتخاب بخش‌ها</CardTitle>
                  <CardDescription>
                    مشخص کنید کدام بخش‌ها در خروجی نمایش داده شوند
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="personalInfo"
                      checked={selectedOptions.personalInfo}
                      onCheckedChange={() => handleCheckboxChange("personalInfo")}
                    />
                    <label
                      htmlFor="personalInfo"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                    >
                      <User className="h-4 w-4 ml-2 text-indigo-500" />
                      اطلاعات شخصی
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="exercises"
                      checked={selectedOptions.exercises}
                      onCheckedChange={() => handleCheckboxChange("exercises")}
                    />
                    <label
                      htmlFor="exercises"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                    >
                      <Dumbbell className="h-4 w-4 ml-2 text-blue-500" />
                      برنامه تمرینی
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="diet"
                      checked={selectedOptions.diet}
                      onCheckedChange={() => handleCheckboxChange("diet")}
                    />
                    <label
                      htmlFor="diet"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                    >
                      <Apple className="h-4 w-4 ml-2 text-green-500" />
                      برنامه غذایی
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="supplements"
                      checked={selectedOptions.supplements}
                      onCheckedChange={() => handleCheckboxChange("supplements")}
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
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="ml-auto" 
                    onClick={() => setActiveTab("preview")}
                  >
                    مشاهده پیش‌نمایش
                    <ChevronRight className="h-4 w-4 mr-2" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-6">
                <div id="print-content" className="p-6 bg-white rounded-lg shadow-sm">
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
                            <span className="font-medium ml-2">شماره تماس:</span>
                            {toPersianNumbers(student.phone)}
                          </p>
                          <p className="student-detail">
                            <span className="font-medium ml-2">قد:</span>
                            {toPersianNumbers(student.height)} سانتی‌متر
                          </p>
                          <p className="student-detail">
                            <span className="font-medium ml-2">وزن:</span>
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
                          <div className="grid gap-3">
                            {exs.map((exercise) => (
                              <div key={exercise.id} className="print-item">
                                <div className="print-item-title">{exercise.name}</div>
                                {exercise.description && (
                                  <div className="print-item-subtitle">
                                    {exercise.description}
                                  </div>
                                )}
                                {exercise.sets && (
                                  <div className="print-item-detail">
                                    <span className="font-medium ml-1">تعداد ست:</span>
                                    {toPersianNumbers(exercise.sets)}
                                  </div>
                                )}
                                {exercise.reps && (
                                  <div className="print-item-detail">
                                    <span className="font-medium ml-1">تکرار:</span>
                                    {toPersianNumbers(exercise.reps)}
                                  </div>
                                )}
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
                          {Object.entries(types).map(([type, meals]: [string, any[]]) => (
                            <div key={type} className="mb-4">
                              <h5 className="text-sm font-semibold mb-2 text-green-700">
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
                                    <div className="print-item-detail">
                                      <span className="font-medium ml-1">کالری:</span>
                                      {toPersianNumbers(meal.calories || 0)}
                                    </div>
                                    <div className="print-item-detail">
                                      <span className="font-medium ml-1">پروتئین:</span>
                                      {toPersianNumbers(meal.protein || 0)} گرم
                                    </div>
                                    <div className="print-item-detail">
                                      <span className="font-medium ml-1">کربوهیدرات:</span>
                                      {toPersianNumbers(meal.carbs || 0)} گرم
                                    </div>
                                    <div className="print-item-detail">
                                      <span className="font-medium ml-1">چربی:</span>
                                      {toPersianNumbers(meal.fat || 0)} گرم
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
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
                      
                      {studentSupplements.length > 0 && (
                        <div className="mb-6">
                          <h4 className="print-subheader">مکمل‌ها</h4>
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
                                <div className="print-item-detail">
                                  <span className="font-medium ml-1">مقدار مصرف:</span>
                                  {supplement.dosage}
                                </div>
                                <div className="print-item-detail">
                                  <span className="font-medium ml-1">زمان مصرف:</span>
                                  {supplement.timing}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {studentVitamins.length > 0 && (
                        <div>
                          <h4 className="print-subheader">ویتامین‌ها</h4>
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
                                <div className="print-item-detail">
                                  <span className="font-medium ml-1">مقدار مصرف:</span>
                                  {vitamin.dosage}
                                </div>
                                <div className="print-item-detail">
                                  <span className="font-medium ml-1">زمان مصرف:</span>
                                  {vitamin.timing}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t bg-white mt-auto flex justify-between items-center">
                <div className="text-sm font-medium text-muted-foreground">
                  پیش‌نمایش گزارش {student.name}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("options")}
                    className="gap-2"
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

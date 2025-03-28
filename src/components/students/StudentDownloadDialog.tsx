
import { Button } from "@/components/ui/button";
import { Download, Printer, FileText, X, Check, Palette, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { TrainerProfile } from "@/types/trainer";
import { generateStudentPDF, openPrintWindow } from "@/lib/utils/export";
import { StudentSummary } from "./StudentSummary";
import { ProfileWarning } from "./ProfileWarning";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { StudentExerciseListWrapper } from "../exercises/StudentExerciseListWrapper";

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
    payment: string;
  } | null;
  exercises: any[];
  meals: any[];
  supplements: any[];
  vitamins: any[];
}

export const StudentDownloadDialog = ({ 
  open, 
  onOpenChange, 
  student, 
  exercises, 
  meals, 
  supplements, 
  vitamins 
}: StudentDownloadDialogProps) => {
  const { toast } = useToast();
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [isSuccess, setIsSuccess] = useState<{download: boolean, print: boolean}>({download: false, print: false});
  const [progress, setProgress] = useState(0);
  const [exportStyle, setExportStyle] = useState<"modern" | "classic" | "minimal">("modern");

  useEffect(() => {
    if (open) {
      try {
        const savedProfile = localStorage.getItem('trainerProfile');
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setTrainerProfile(profile);
          
          setIsProfileComplete(
            !!profile && 
            !!profile.gymName && profile.gymName.trim() !== '' && 
            !!profile.gymAddress && profile.gymAddress.trim() !== ''
          );
        }
      } catch (error) {
        console.error("Error loading trainer profile:", error);
      }
      
      // Reset states when dialog opens
      setProgress(0);
      setIsSuccess({download: false, print: false});
      setActiveTab("summary");
    }
  }, [open]);

  const resetSuccess = () => {
    setTimeout(() => {
      setIsSuccess({download: false, print: false});
    }, 3000);
  };

  const simulateProgress = (type: 'download' | 'print') => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      if (type === 'download') {
        setIsDownloading(false);
        setIsSuccess(prev => ({...prev, download: true}));
      } else {
        setIsPrinting(false);
        setIsSuccess(prev => ({...prev, print: true}));
      }
      resetSuccess();
    }, 1200);
  };

  const handleDownload = async () => {
    if (!student) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اطلاعات شاگرد موجود نیست."
      });
      return;
    }

    if (!trainerProfile || !isProfileComplete) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً ابتدا اطلاعات باشگاه خود را در بخش پروفایل تکمیل کنید."
      });
      return;
    }

    try {
      setIsDownloading(true);
      simulateProgress('download');
      
      // Use the selected style for PDF generation
      const doc = generateStudentPDF(student, exercises, meals, supplements, trainerProfile, exportStyle);
      
      // Create Persian filename with current date
      const persianDate = new Date().toLocaleDateString('fa-IR').replace(/\//g, '-');
      const fileName = `برنامه_${student.name}_${persianDate}.pdf`;
      
      doc.save(fileName);
      
      toast({
        title: "دانلود موفق",
        description: "فایل پی‌دی‌اف با موفقیت دانلود شد."
      });
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsDownloading(false);
      setProgress(0);
      
      toast({
        variant: "destructive",
        title: "خطا",
        description: "در هنگام دانلود فایل پی‌دی‌اف خطایی رخ داد."
      });
    }
  };

  const handlePrint = async () => {
    if (!student) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "اطلاعات شاگرد موجود نیست."
      });
      return;
    }

    if (!trainerProfile || !isProfileComplete) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً ابتدا اطلاعات باشگاه خود را در بخش پروفایل تکمیل کنید."
      });
      return;
    }

    try {
      setIsPrinting(true);
      simulateProgress('print');
      
      // Use the selected style for print window
      const printWindow = openPrintWindow(student, exercises, meals, supplements, trainerProfile, exportStyle);
      
      if (!printWindow) {
        setIsPrinting(false);
        setProgress(0);
        
        toast({
          variant: "destructive",
          title: "خطا",
          description: "امکان باز کردن پنجره چاپ وجود ندارد."
        });
        return;
      }
      
      toast({
        title: "آماده برای چاپ",
        description: "صفحه چاپ با موفقیت آماده شد."
      });
    } catch (error) {
      console.error("Error preparing print:", error);
      setIsPrinting(false);
      setProgress(0);
      
      toast({
        variant: "destructive",
        title: "خطا",
        description: "در آماده‌سازی چاپ خطایی رخ داد."
      });
    }
  };

  const studentExercises = student?.exercises?.map(id => 
    exercises.find(ex => ex.id === id)
  ).filter(Boolean) || [];
  
  const studentMeals = student?.meals?.map(id => 
    meals.find(meal => meal.id === id)
  ).filter(Boolean) || [];
  
  const studentSupplements = student?.supplements?.map(id => 
    supplements.find(sup => sup.id === id)
  ).filter(Boolean) || [];

  const studentVitamins = student?.vitamins?.map(id => 
    vitamins.find(vitamin => vitamin.id === id)
  ).filter(Boolean) || [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden flex flex-col" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-white to-white/95 dark:from-gray-950 dark:to-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                خروجی و چاپ اطلاعات
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                دانلود و چاپ اطلاعات کامل شاگرد به همراه تمام برنامه‌ها با قالب‌بندی حرفه‌ای
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-10 w-10 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <StudentExerciseListWrapper className="relative">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start h-12 bg-muted/30 p-1 gap-1">
              <TabsTrigger 
                value="summary" 
                className="flex items-center gap-2 data-[state=active]:bg-background"
              >
                <FileText className="h-4 w-4" />
                خلاصه اطلاعات
              </TabsTrigger>
              <TabsTrigger 
                value="export" 
                className="flex items-center gap-2 data-[state=active]:bg-background"
              >
                <Download className="h-4 w-4" />
                دانلود
              </TabsTrigger>
              <TabsTrigger 
                value="print" 
                className="flex items-center gap-2 data-[state=active]:bg-background"
              >
                <Printer className="h-4 w-4" />
                چاپ
              </TabsTrigger>
            </TabsList>

            <div className="mt-6 px-6">
              <TabsContent value="summary" className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    خلاصه اطلاعات شاگرد
                  </h2>
                  <ProfileWarning isProfileComplete={isProfileComplete} className="mb-4" />
                  {student && <StudentSummary 
                    student={student} 
                    exercises={exercises} 
                    meals={meals} 
                    supplements={supplements} 
                  />}
                </div>
              </TabsContent>

              <TabsContent value="export" className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Download className="h-5 w-5 text-indigo-600" />
                    دانلود فایل PDF
                  </h2>
                  <ProfileWarning isProfileComplete={isProfileComplete} className="mb-4" />
                  
                  <div className="space-y-4">
                    <div className="bg-muted/20 rounded-lg p-4 border">
                      <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                        <Palette className="h-4 w-4 text-indigo-500" />
                        انتخاب قالب
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div 
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            exportStyle === "modern"
                              ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => setExportStyle("modern")}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">مدرن</span>
                            {exportStyle === "modern" && (
                              <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">قالب مدرن با طراحی متریال دیزاین و رنگ‌های متنوع</p>
                        </div>
                        <div 
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            exportStyle === "classic"
                              ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => setExportStyle("classic")}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">کلاسیک</span>
                            {exportStyle === "classic" && (
                              <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">قالب کلاسیک با طراحی ساده و رسمی برای محیط‌های آموزشی</p>
                        </div>
                        <div 
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            exportStyle === "minimal"
                              ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => setExportStyle("minimal")}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">مینیمال</span>
                            {exportStyle === "minimal" && (
                              <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">قالب ساده و مینیمال با تمرکز بر محتوا و حداقل عناصر گرافیکی</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 rounded-lg p-4 border">
                      <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                        <Database className="h-4 w-4 text-indigo-500" />
                        اطلاعات مورد استفاده
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">برنامه تمرینی</span>
                            <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                              {toPersianNumbers(studentExercises.length)} تمرین
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">برنامه غذایی</span>
                            <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                              {toPersianNumbers(studentMeals.length)} وعده
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">مکمل‌ها</span>
                            <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded-full">
                              {toPersianNumbers(studentSupplements.length)} مکمل
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">ویتامین‌ها</span>
                            <div className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                              {toPersianNumbers(studentVitamins.length)} ویتامین
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleDownload} 
                      disabled={isDownloading || !isProfileComplete || !student}
                      className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white gap-2"
                    >
                      {isDownloading ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full"></div>
                          در حال آماده‌سازی فایل...
                        </>
                      ) : isSuccess.download ? (
                        <>
                          <Check className="h-5 w-5" />
                          دانلود با موفقیت انجام شد
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          دانلود فایل PDF
                        </>
                      )}
                    </Button>
                    
                    {isDownloading && (
                      <div className="space-y-2">
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-center text-muted-foreground">
                          {toPersianNumbers(progress)}٪ تکمیل شده
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="print" className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Printer className="h-5 w-5 text-indigo-600" />
                    چاپ برنامه
                  </h2>
                  <ProfileWarning isProfileComplete={isProfileComplete} className="mb-4" />
                  
                  <div className="space-y-4">
                    <div className="bg-muted/20 rounded-lg p-4 border">
                      <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                        <Palette className="h-4 w-4 text-indigo-500" />
                        انتخاب قالب چاپ
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div 
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            exportStyle === "modern"
                              ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => setExportStyle("modern")}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">مدرن</span>
                            {exportStyle === "modern" && (
                              <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">قالب مدرن با طراحی متریال دیزاین و رنگ‌های متنوع</p>
                        </div>
                        <div 
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            exportStyle === "classic"
                              ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => setExportStyle("classic")}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">کلاسیک</span>
                            {exportStyle === "classic" && (
                              <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">قالب کلاسیک با طراحی ساده و رسمی برای محیط‌های آموزشی</p>
                        </div>
                        <div 
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            exportStyle === "minimal"
                              ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => setExportStyle("minimal")}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">مینیمال</span>
                            {exportStyle === "minimal" && (
                              <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">قالب ساده و مینیمال با تمرکز بر محتوا و حداقل عناصر گرافیکی</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 rounded-lg p-4 border">
                      <h3 className="text-base font-medium mb-2 flex items-center gap-2">
                        <Database className="h-4 w-4 text-indigo-500" />
                        اطلاعات مورد استفاده
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">برنامه تمرینی</span>
                            <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                              {toPersianNumbers(studentExercises.length)} تمرین
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">برنامه غذایی</span>
                            <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                              {toPersianNumbers(studentMeals.length)} وعده
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">مکمل‌ها</span>
                            <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded-full">
                              {toPersianNumbers(studentSupplements.length)} مکمل
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">ویتامین‌ها</span>
                            <div className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                              {toPersianNumbers(studentVitamins.length)} ویتامین
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={handlePrint}
                      disabled={isPrinting || !isProfileComplete || !student}
                      className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white gap-2"
                    >
                      {isPrinting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full"></div>
                          در حال آماده‌سازی چاپ...
                        </>
                      ) : isSuccess.print ? (
                        <>
                          <Check className="h-5 w-5" />
                          آماده‌سازی چاپ با موفقیت انجام شد
                        </>
                      ) : (
                        <>
                          <Printer className="h-5 w-5" />
                          پیش‌نمایش و چاپ
                        </>
                      )}
                    </Button>
                    
                    {isPrinting && (
                      <div className="space-y-2">
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-center text-muted-foreground">
                          {toPersianNumbers(progress)}٪ تکمیل شده
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </StudentExerciseListWrapper>
      </div>
    </div>
  );
};

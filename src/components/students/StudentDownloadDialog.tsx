
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Download, Printer, FileText, FileCheck, X, Check, ChevronDown, CheckCheck, Database, Palette, Sparkles, Maximize2, Minimize2, Copy, FileOutput, LayoutGrid } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TrainerProfile } from "@/types/trainer";
import { generateStudentPDF, openPrintWindow } from "@/lib/utils/export";
import { StudentSummary } from "./StudentSummary";
import { ProfileWarning } from "./ProfileWarning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
  const [isFullScreen, setIsFullScreen] = useState(true);

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
      
      // Generate PDF and open print window
      openPrintWindow(student, exercises, meals, supplements, vitamins, trainerProfile, exportStyle);
      
      toast({
        title: "چاپ",
        description: "پنجره چاپ با موفقیت باز شد."
      });
      
    } catch (error) {
      console.error("Error opening print window:", error);
      setIsPrinting(false);
      setProgress(0);
      
      toast({
        variant: "destructive",
        title: "خطا",
        description: "در هنگام باز کردن پنجره چاپ خطایی رخ داد."
      });
    }
  };
  
  const renderContent = () => {
    if (isFullScreen) {
      return (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent className="w-full p-0 sm:max-w-full flex flex-col border-0" dir="rtl">
            <div className="flex flex-col h-full overflow-hidden bg-gradient-to-b from-background/80 to-background/60">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-md">
                    <FileOutput className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{student?.name || "خروجی اطلاعات"}</h2>
                    <p className="text-sm font-medium text-muted-foreground">دانلود و چاپ اطلاعات شاگرد</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setIsFullScreen(false)}
                    className="h-9 w-9 border-muted transition-colors"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onOpenChange(false)}
                    className="h-9 w-9"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col overflow-hidden p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-3 mb-4">
                    <TabsTrigger value="summary" className="rounded-lg py-3">
                      <Database className="h-4 w-4 mr-2" />
                      خلاصه اطلاعات
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="rounded-lg py-3">
                      <FileText className="h-4 w-4 mr-2" />
                      پیش نمایش
                    </TabsTrigger>
                    <TabsTrigger value="style" className="rounded-lg py-3">
                      <Palette className="h-4 w-4 mr-2" />
                      سبک خروجی
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border rounded-xl shadow-sm">
                    {!isProfileComplete ? (
                      <ProfileWarning />
                    ) : (
                      <StudentSummary 
                        student={student} 
                        exercises={exercises}
                        meals={meals}
                        supplements={supplements}
                        vitamins={vitamins}
                      />
                    )}
                  </TabsContent>
                  
                  <TabsContent value="preview" className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border rounded-xl shadow-sm">
                    {!isProfileComplete ? (
                      <ProfileWarning />
                    ) : (
                      <div className="w-full h-96 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed">
                        <div className="text-center">
                          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-semibold mb-2">پیش نمایش اطلاعات</h3>
                          <p className="text-muted-foreground mx-auto max-w-md">
                            این قسمت پیش نمایش اطلاعاتی است که در فایل خروجی نمایش داده خواهد شد.
                          </p>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="style" className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${exportStyle === "modern" ? "ring-2 ring-primary ring-offset-2 bg-primary/5" : "hover:bg-muted/20"}`}
                        onClick={() => setExportStyle("modern")}
                      >
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg mb-3 overflow-hidden shadow-sm">
                          <div className="w-full h-1/6 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">مدرن</h3>
                          {exportStyle === "modern" && <Check className="h-4 w-4 text-primary" />}
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${exportStyle === "classic" ? "ring-2 ring-primary ring-offset-2 bg-primary/5" : "hover:bg-muted/20"}`}
                        onClick={() => setExportStyle("classic")}
                      >
                        <div className="aspect-video bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 rounded-lg mb-3 overflow-hidden shadow-sm">
                          <div className="w-full h-1/6 bg-gradient-to-r from-amber-500 to-yellow-600"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">کلاسیک</h3>
                          {exportStyle === "classic" && <Check className="h-4 w-4 text-primary" />}
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${exportStyle === "minimal" ? "ring-2 ring-primary ring-offset-2 bg-primary/5" : "hover:bg-muted/20"}`}
                        onClick={() => setExportStyle("minimal")}
                      >
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900 dark:to-slate-900 rounded-lg mb-3 overflow-hidden shadow-sm">
                          <div className="w-full h-1/6 bg-gradient-to-r from-gray-500 to-slate-600"></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">مینیمال</h3>
                          {exportStyle === "minimal" && <Check className="h-4 w-4 text-primary" />}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">ویژگی‌های سبک {exportStyle === "modern" ? "مدرن" : exportStyle === "classic" ? "کلاسیک" : "مینیمال"}</h3>
                      
                      {exportStyle === "modern" && (
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>طراحی مدرن با رنگ‌های گرادیان</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>سربرگ مدرن با جزئیات بیشتر</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>جدول‌های رنگی با مرزهای گرد</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>استفاده از آیکون‌های متنوع</span>
                          </li>
                        </ul>
                      )}
                      
                      {exportStyle === "classic" && (
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>طراحی کلاسیک و رسمی</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>سربرگ با لوگو و مهر باشگاه</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>جدول‌های خطی سنتی</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>استفاده از فونت‌های رسمی</span>
                          </li>
                        </ul>
                      )}
                      
                      {exportStyle === "minimal" && (
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>طراحی ساده و مینیمال</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>فضای سفید بیشتر برای خوانایی بهتر</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>جدول‌های ساده بدون حاشیه اضافی</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>تمرکز بر محتوا با حداقل تزئینات</span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="p-6 border-t bg-muted/20">
                <div className="flex flex-col gap-4">
                  {(isDownloading || isPrinting) && (
                    <div className="flex items-center gap-4">
                      <Progress 
                        value={progress} 
                        variant="gradient" 
                        size="lg" 
                        className="flex-1" 
                        showValue={true}
                      />
                      <span className="text-sm font-medium">
                        {toPersianNumbers(progress)}%
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AnimatePresence mode="wait">
                        {isSuccess.download && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 py-1.5 px-3 text-sm"
                          >
                            <CheckCheck className="h-4 w-4 mr-1" />
                            دانلود با موفقیت انجام شد
                          </motion.div>
                        )}
                        
                        {isSuccess.print && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-500 py-1.5 px-3 text-sm"
                          >
                            <CheckCheck className="h-4 w-4 mr-1" />
                            ارسال به پرینتر
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        بستن
                      </Button>
                      
                      <Button
                        onClick={handlePrint}
                        disabled={isPrinting || !isProfileComplete}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
                      >
                        {isPrinting ? (
                          <>آماده‌سازی برای چاپ...</>
                        ) : (
                          <>
                            <Printer className="h-4 w-4" />
                            چاپ اطلاعات
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={handleDownload}
                        disabled={isDownloading || !isProfileComplete}
                        className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
                      >
                        {isDownloading ? (
                          <>آماده‌سازی فایل...</>
                        ) : (
                          <>
                            <Download className="h-4 w-4" />
                            دانلود اطلاعات
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      );
    } else {
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden">
            <DialogHeader className="px-6 py-4 border-b bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-sm">
                    <FileOutput className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-base font-semibold">
                      {student?.name || "خروجی اطلاعات"}
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                      دانلود و چاپ اطلاعات شاگرد
                    </DialogDescription>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setIsFullScreen(true)}
                  className="h-9 w-9 border-muted transition-colors"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-4">
                  <TabsTrigger value="summary" className="text-xs py-2">
                    <Database className="h-3 w-3 mr-1" />
                    خلاصه
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="text-xs py-2">
                    <FileText className="h-3 w-3 mr-1" />
                    پیش نمایش
                  </TabsTrigger>
                  <TabsTrigger value="style" className="text-xs py-2">
                    <Palette className="h-3 w-3 mr-1" />
                    سبک
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="p-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border rounded-lg shadow-sm">
                  {!isProfileComplete ? (
                    <ProfileWarning />
                  ) : (
                    <StudentSummary 
                      student={student} 
                      exercises={exercises}
                      meals={meals}
                      supplements={supplements}
                      vitamins={vitamins}
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="preview" className="p-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border rounded-lg shadow-sm">
                  {!isProfileComplete ? (
                    <ProfileWarning />
                  ) : (
                    <div className="w-full h-72 flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed">
                      <div className="text-center">
                        <FileText className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                        <h3 className="text-base font-semibold mb-1">پیش نمایش</h3>
                        <p className="text-muted-foreground text-sm mx-auto max-w-xs">
                          پیش نمایش اطلاعات خروجی
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="style" className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div 
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${exportStyle === "modern" ? "ring-2 ring-primary ring-offset-2 bg-primary/5" : "hover:bg-muted/20"}`}
                      onClick={() => setExportStyle("modern")}
                    >
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded mb-2 overflow-hidden shadow-sm">
                        <div className="w-full h-1/6 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">مدرن</h3>
                        {exportStyle === "modern" && <Check className="h-3 w-3 text-primary" />}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${exportStyle === "classic" ? "ring-2 ring-primary ring-offset-2 bg-primary/5" : "hover:bg-muted/20"}`}
                      onClick={() => setExportStyle("classic")}
                    >
                      <div className="aspect-video bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 rounded mb-2 overflow-hidden shadow-sm">
                        <div className="w-full h-1/6 bg-gradient-to-r from-amber-500 to-yellow-600"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">کلاسیک</h3>
                        {exportStyle === "classic" && <Check className="h-3 w-3 text-primary" />}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${exportStyle === "minimal" ? "ring-2 ring-primary ring-offset-2 bg-primary/5" : "hover:bg-muted/20"}`}
                      onClick={() => setExportStyle("minimal")}
                    >
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900 dark:to-slate-900 rounded mb-2 overflow-hidden shadow-sm">
                        <div className="w-full h-1/6 bg-gradient-to-r from-gray-500 to-slate-600"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">مینیمال</h3>
                        {exportStyle === "minimal" && <Check className="h-3 w-3 text-primary" />}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="p-4 border-t bg-muted/20">
              <div className="flex flex-col gap-3">
                {(isDownloading || isPrinting) && (
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={progress} 
                      variant="gradient" 
                      size="sm" 
                      className="flex-1" 
                    />
                    <span className="text-xs font-medium">
                      {toPersianNumbers(progress)}%
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <AnimatePresence mode="wait">
                      {isSuccess.download && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 py-1 px-2 text-xs"
                        >
                          <CheckCheck className="h-3 w-3 mr-1" />
                          دانلود شد
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenChange(false)}
                      className="gap-1 text-xs h-8"
                    >
                      <X className="h-3 w-3" />
                      بستن
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={handlePrint}
                      disabled={isPrinting || !isProfileComplete}
                      className="gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
                    >
                      <Printer className="h-3 w-3" />
                      چاپ
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={handleDownload}
                      disabled={isDownloading || !isProfileComplete}
                      className="gap-1 bg-purple-600 hover:bg-purple-700 text-white text-xs h-8"
                    >
                      <Download className="h-3 w-3" />
                      دانلود
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
  };

  return renderContent();
};

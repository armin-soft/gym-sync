
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

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Helper function to render the dialog content
  const renderDialogContent = () => {
    return (
      <>
        <div className="sticky top-0 z-20 bg-gradient-to-b from-white to-white/95 dark:from-gray-950 dark:to-gray-950/95 backdrop-blur-sm shadow-md">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                  <FileOutput className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">
                  خروجی و چاپ اطلاعات
                </span>
              </DialogTitle>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleFullScreen}
                className="ml-2"
              >
                {isFullScreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </Button>
            </div>
            <DialogDescription className="text-base mt-2 text-gray-600 dark:text-gray-300">
              دانلود و چاپ اطلاعات کامل شاگرد به همراه تمام برنامه‌ها با قالب‌بندی حرفه‌ای
            </DialogDescription>
          </DialogHeader>
          
          <Tabs 
            defaultValue="summary" 
            className="w-full px-6"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 w-full bg-indigo-50/80 dark:bg-indigo-950/50 rounded-full p-1 my-4 shadow-md backdrop-blur-sm">
              <TabsTrigger 
                value="summary" 
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-md transition-all duration-300"
              >
                <span className="flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5" />
                  داده‌های برنامه
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-md transition-all duration-300"
              >
                <span className="flex items-center gap-1.5">
                  <FileCheck className="h-3.5 w-3.5" />
                  پیش‌نمایش خروجی
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="style" 
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-md transition-all duration-300"
              >
                <span className="flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5" />
                  سبک خروجی
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
            
        <div className={`overflow-y-auto ${isFullScreen ? "max-h-[calc(100vh-180px)]" : "max-h-[calc(80vh-180px)]"}`}>
          <AnimatePresence mode="wait">
            {!isProfileComplete && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 px-6"
              >
                <ProfileWarning isProfileComplete={isProfileComplete} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <TabsContent value="summary" className="mt-0 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-2xl shadow-sm border border-indigo-100/50 dark:border-indigo-900/30">
                <StudentSummary 
                  student={student} 
                  exercises={exercises} 
                  meals={meals} 
                  supplements={supplements} 
                />
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0 p-6">
            <motion.div 
              className="rounded-xl border-0 shadow-lg bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/40 dark:to-purple-950/40 overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-6 border-b border-indigo-100 dark:border-indigo-900/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <h3 className="font-semibold text-lg text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900 shadow-sm">
                    <FileCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  پیش‌نمایش قالب {
                    exportStyle === 'modern' ? 'مدرن' : 
                    exportStyle === 'classic' ? 'کلاسیک' : 
                    'مینیمال'
                  }
                </h3>
                
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setExportStyle("modern")}
                    className={`gap-1.5 transition-all ${exportStyle === "modern" ? "bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700" : ""}`}
                  >
                    <Sparkles className={`h-3.5 w-3.5 ${exportStyle === "modern" ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                    مدرن
                    {exportStyle === "modern" && <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setExportStyle("classic")}
                    className={`gap-1.5 transition-all ${exportStyle === "classic" ? "bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700" : ""}`}
                  >
                    <FileText className={`h-3.5 w-3.5 ${exportStyle === "classic" ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                    کلاسیک
                    {exportStyle === "classic" && <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setExportStyle("minimal")}
                    className={`gap-1.5 transition-all ${exportStyle === "minimal" ? "bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700" : ""}`}
                  >
                    <LayoutGrid className={`h-3.5 w-3.5 ${exportStyle === "minimal" ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                    مینیمال
                    {exportStyle === "minimal" && <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />}
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 shadow-lg">
                {student && (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className="h-16 w-16 rounded-xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-800 flex-shrink-0 shadow-md">
                            <img 
                              src={student.image || "/placeholder.svg"} 
                              alt={student.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white">{student.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 persian-numbers mt-1">
                              قد: {toPersianNumbers(student.height)} سانتی‌متر - وزن: {toPersianNumbers(student.weight)} کیلوگرم
                            </p>
                          </div>
                        </div>
                        {trainerProfile && (
                          <div className="text-left">
                            <p className="font-bold text-gray-900 dark:text-white">{trainerProfile.gymName}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{trainerProfile.fullName}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {studentExercises.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-indigo-50/30 to-blue-50/30 dark:from-indigo-950/20 dark:to-blue-950/20 p-5 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30"
                      >
                        <h4 className="text-lg font-medium mb-3 bg-gradient-to-r from-indigo-700 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-1.5 flex-shrink-0">
                            <Check className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          برنامه تمرینی
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                          {studentExercises.slice(0, 4).map((exercise: any) => (
                            <div key={exercise.id} className="border border-indigo-200/70 dark:border-indigo-800/30 rounded-lg p-3 text-sm bg-white/80 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-2">
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-1.5 flex-shrink-0">
                                  <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                {exercise.name}
                              </div>
                            </div>
                          ))}
                          {studentExercises.length > 4 && (
                            <div className="border border-dashed border-indigo-300/50 dark:border-indigo-700/30 rounded-lg p-3 text-sm text-gray-500 flex items-center justify-center gap-2 bg-indigo-50/50 dark:bg-indigo-900/10">
                              <ChevronDown className="h-4 w-4" />
                              و <span className="persian-numbers">{toPersianNumbers(studentExercises.length - 4)}</span> مورد دیگر...
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    
                    {studentMeals.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-green-50/30 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/20 p-5 rounded-xl border border-green-100/50 dark:border-green-900/30"
                      >
                        <h4 className="text-lg font-medium mb-3 bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
                          <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1.5 flex-shrink-0">
                            <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                          </div>
                          برنامه غذایی
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                          {studentMeals.slice(0, 4).map((meal: any) => (
                            <div key={meal.id} className="border border-green-200/70 dark:border-green-800/30 rounded-lg p-3 text-sm bg-white/80 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-2">
                                <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1.5 flex-shrink-0">
                                  <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                </div>
                                {meal.name}
                              </div>
                            </div>
                          ))}
                          {studentMeals.length > 4 && (
                            <div className="border border-dashed border-green-300/50 dark:border-green-700/30 rounded-lg p-3 text-sm text-gray-500 flex items-center justify-center gap-2 bg-green-50/50 dark:bg-green-900/10">
                              <ChevronDown className="h-4 w-4" />
                              و <span className="persian-numbers">{toPersianNumbers(studentMeals.length - 4)}</span> مورد دیگر...
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    
                    {(studentSupplements.length > 0 || studentVitamins.length > 0) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-purple-50/30 to-violet-50/30 dark:from-purple-950/20 dark:to-violet-950/20 p-5 rounded-xl border border-purple-100/50 dark:border-purple-900/30"
                      >
                        <h4 className="text-lg font-medium mb-3 bg-gradient-to-r from-purple-700 to-violet-600 dark:from-purple-400 dark:to-violet-400 bg-clip-text text-transparent flex items-center gap-2">
                          <div className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-1.5 flex-shrink-0">
                            <Check className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                          </div>
                          مکمل‌ها و ویتامین‌ها
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                          {[...studentSupplements, ...studentVitamins].slice(0, 4).map((item: any) => (
                            <div key={item.id} className="border border-purple-200/70 dark:border-purple-800/30 rounded-lg p-3 text-sm bg-white/80 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-1.5 flex-shrink-0">
                                    <Check className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  {item.name}
                                </div>
                                <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full">
                                  {item.type === 'supplement' ? 'مکمل' : 'ویتامین'}
                                </span>
                              </div>
                            </div>
                          ))}
                          {(studentSupplements.length + studentVitamins.length) > 4 && (
                            <div className="border border-dashed border-purple-300/50 dark:border-purple-700/30 rounded-lg p-3 text-sm text-gray-500 flex items-center justify-center gap-2 bg-purple-50/50 dark:bg-purple-900/10">
                              <ChevronDown className="h-4 w-4" />
                              و <span className="persian-numbers">{toPersianNumbers(studentSupplements.length + studentVitamins.length - 4)}</span> مورد دیگر...
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    
                    <motion.div 
                      className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      این یک پیش‌نمایش از خروجی پی‌دی‌اف و چاپ است. خروجی نهایی شامل تمامی جزئیات برنامه خواهد بود.
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="style" className="mt-0 p-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
                  <h3 className="font-semibold text-lg text-purple-800 dark:text-purple-300 flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900 shadow-sm">
                      <Palette className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    انتخاب قالب خروجی
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white dark:bg-gray-900 rounded-xl p-5 border cursor-pointer transition-all shadow-sm ${exportStyle === 'modern' ? 'border-indigo-400 dark:border-indigo-500 shadow-xl ring-2 ring-indigo-200 dark:ring-indigo-800/30' : 'border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800/50'}`}
                      onClick={() => setExportStyle('modern')}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">قالب مدرن</h4>
                        {exportStyle === 'modern' && (
                          <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-1">
                            <CheckCheck className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <div className="h-32 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-lg flex items-center justify-center mb-3 overflow-hidden shadow-md">
                        <div className="w-full p-3">
                          <div className="h-3 w-24 bg-indigo-200 dark:bg-indigo-700 rounded-full mb-2"></div>
                          <div className="h-2 w-16 bg-indigo-100 dark:bg-indigo-800 rounded-full mb-4"></div>
                          <div className="flex gap-1 mb-2">
                            <div className="h-4 w-4 rounded-full bg-indigo-300 dark:bg-indigo-600"></div>
                            <div className="h-4 w-20 bg-indigo-200 dark:bg-indigo-700 rounded-md"></div>
                          </div>
                          <div className="flex gap-1">
                            <div className="h-4 w-4 rounded-full bg-indigo-300 dark:bg-indigo-600"></div>
                            <div className="h-4 w-20 bg-indigo-200 dark:bg-indigo-700 rounded-md"></div>
                          </div>
                        </div>
                        <Sparkles className="absolute h-6 w-6 text-indigo-500/40 dark:text-indigo-400/40" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        طراحی متریال با استفاده از رنگ‌های متنوع و گرادیان‌ها همراه با نمودارهای کاربردی
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white dark:bg-gray-900 rounded-xl p-5 border cursor-pointer transition-all shadow-sm ${exportStyle === 'classic' ? 'border-indigo-400 dark:border-indigo-500 shadow-xl ring-2 ring-indigo-200 dark:ring-indigo-800/30' : 'border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800/50'}`}
                      onClick={() => setExportStyle('classic')}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">قالب کلاسیک</h4>
                        {exportStyle === 'classic' && (
                          <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-1">
                            <CheckCheck className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <div className="h-32 bg-white dark:bg-gray-950 rounded-lg border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center mb-3 overflow-hidden shadow-md">
                        <div className="w-full p-3">
                          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded-sm mb-2"></div>
                          <div className="h-2 w-16 bg-gray-200 dark:bg-gray-800 rounded-sm mb-4"></div>
                          <div className="flex gap-1 mb-2">
                            <div className="h-4 w-4 rounded-sm bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600"></div>
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded-sm border border-gray-300 dark:border-gray-700"></div>
                          </div>
                          <div className="flex gap-1">
                            <div className="h-4 w-4 rounded-sm bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600"></div>
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded-sm border border-gray-300 dark:border-gray-700"></div>
                          </div>
                        </div>
                        <FileText className="absolute h-6 w-6 text-gray-500/40 dark:text-gray-400/40" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        طراحی رسمی و حرفه‌ای با فونت‌های سریف و خطوط واضح برای استفاده در محیط‌های آموزشی
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white dark:bg-gray-900 rounded-xl p-5 border cursor-pointer transition-all shadow-sm ${exportStyle === 'minimal' ? 'border-indigo-400 dark:border-indigo-500 shadow-xl ring-2 ring-indigo-200 dark:ring-indigo-800/30' : 'border-gray-200 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800/50'}`}
                      onClick={() => setExportStyle('minimal')}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">قالب مینیمال</h4>
                        {exportStyle === 'minimal' && (
                          <span className="text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-1">
                            <CheckCheck className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <div className="h-32 bg-gray-50 dark:bg-gray-950 rounded-lg flex items-center justify-center mb-3 overflow-hidden shadow-sm">
                        <div className="w-full p-3">
                          <div className="h-2 w-20 bg-gray-200 dark:bg-gray-800 rounded-sm mb-2"></div>
                          <div className="h-2 w-12 bg-gray-100 dark:bg-gray-900 rounded-sm mb-4"></div>
                          <div className="flex gap-1 mb-2">
                            <div className="h-3 w-3 rounded-sm bg-gray-200 dark:bg-gray-800"></div>
                            <div className="h-3 w-16 bg-gray-100 dark:bg-gray-900 rounded-sm"></div>
                          </div>
                          <div className="flex gap-1">
                            <div className="h-3 w-3 rounded-sm bg-gray-200 dark:bg-gray-800"></div>
                            <div className="h-3 w-16 bg-gray-100 dark:bg-gray-900 rounded-sm"></div>
                          </div>
                        </div>
                        <LayoutGrid className="absolute h-6 w-6 text-gray-400/30 dark:text-gray-500/30" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        طراحی ساده و کاربردی با حداقل عناصر تزئینی، مناسب برای چاپ و مصرف کمتر جوهر
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
                  <h3 className="font-semibold text-lg text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900 shadow-sm">
                      <FileOutput className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    پیش‌نمایش خروجی نهایی
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="relative h-52 bg-gradient-to-br from-gray-50 to-blue-50/20 dark:from-gray-900 dark:to-blue-900/10 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center overflow-hidden mb-4">
                    <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none flex items-center justify-center">
                      <div className="w-72 h-96 bg-white dark:bg-gray-800 rounded-md shadow-2xl transform rotate-12 -translate-x-6 translate-y-4"></div>
                      <div className="w-72 h-96 bg-white dark:bg-gray-800 rounded-md shadow-2xl transform -rotate-6 translate-x-4 -translate-y-2"></div>
                    </div>
                    <div className="text-center z-10 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg">
                      <FileOutput className="h-12 w-12 mx-auto mb-3 text-blue-500 dark:text-blue-400" />
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        خروجی نهایی با کیفیت بالا
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        فایل PDF و نسخه چاپی با قالب‌بندی حرفه‌ای و متناسب با نیاز شما
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                          <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">دانلود PDF</h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        خروجی PDF با قابلیت ذخیره و به‌اشتراک‌گذاری آسان
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-grow h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 dark:bg-blue-600 w-3/4"></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 persian-numbers">
                          {toPersianNumbers('75')}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                          <Printer className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">چاپ مستقیم</h4>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        امکان چاپ مستقیم با انتخاب تنظیمات دلخواه
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-grow h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 dark:bg-purple-600 w-1/2"></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 persian-numbers">
                          {toPersianNumbers('50')}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </div>
        
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/30 rounded-b-lg sticky bottom-0 shadow-md backdrop-blur-sm">
          {(isDownloading || isPrinting) && (
            <div className="mb-4">
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-1.5">
                <span>{isDownloading ? 'در حال آماده‌سازی خروجی پی‌دی‌اف...' : 'در حال آماده‌سازی برای چاپ...'}</span>
                <span className="persian-numbers">{toPersianNumbers(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-2 bg-gray-200 dark:bg-gray-800" 
                indicatorColor="bg-indigo-600 dark:bg-indigo-500" 
                variant="gradient"
                size="md"
              />
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="gap-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
              بستن
            </Button>
            
            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  onClick={handlePrint}
                  className={`${
                    isSuccess.print 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  } text-white flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all`}
                  disabled={!isProfileComplete || isPrinting || isDownloading}
                  size="sm"
                >
                  {isPrinting ? (
                    <div className="h-4 w-4 border-2 border-white border-r-transparent rounded-full animate-spin ml-1"></div>
                  ) : isSuccess.print ? (
                    <CheckCheck size={16} />
                  ) : (
                    <Printer size={16} />
                  )}
                  {isPrinting ? "در حال آماده‌سازی..." : isSuccess.print ? "چاپ شد" : "چاپ"}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  onClick={handleDownload}
                  className={`${
                    isSuccess.download 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                  } text-white flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all`}
                  disabled={!isProfileComplete || isDownloading || isPrinting}
                  size="sm"
                >
                  {isDownloading ? (
                    <div className="h-4 w-4 border-2 border-white border-r-transparent rounded-full animate-spin ml-1"></div>
                  ) : isSuccess.download ? (
                    <CheckCheck size={16} />
                  ) : (
                    <Download size={16} />
                  )}
                  {isDownloading ? "در حال آماده‌سازی..." : isSuccess.download ? "دانلود شد" : "دانلود پی‌دی‌اف"}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Select which component to render based on fullscreen state
  if (isFullScreen) {
    return (
      <Sheet 
        open={open} 
        onOpenChange={(newState) => {
          if (!newState) setIsFullScreen(false);
          onOpenChange(newState);
        }}
      >
        <SheetContent 
          className="p-0 overflow-hidden bg-white dark:bg-gray-950 border-0 rtl w-full h-full"
          side="bottom"
        >
          {renderDialogContent()}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newState) => {
        if (!newState) setIsFullScreen(false);
        onOpenChange(newState);
      }}
    >
      <DialogContent 
        className="p-0 overflow-hidden bg-white dark:bg-gray-950 border-0 rtl sm:max-w-[650px] rounded-xl shadow-xl"
      >
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

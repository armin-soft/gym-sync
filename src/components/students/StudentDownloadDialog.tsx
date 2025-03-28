
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Printer, 
  FileText, 
  X, 
  Check, 
  CheckCheck, 
  Database, 
  Palette, 
  Settings, 
  FileCheck, 
  Share,
  Layers,
  PanelTop,
  ScissorsSquare,
  Camera,
  Crown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { TrainerProfile } from "@/types/trainer";
import { generateStudentPDF, openPrintWindow } from "@/lib/utils/export";
import { StudentSummary } from "./StudentSummary";
import { ProfileWarning } from "./ProfileWarning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
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
  const [paperSize, setPaperSize] = useState<"a4" | "a5" | "letter">("a4");
  const [colorScheme, setColorScheme] = useState<"color" | "grayscale" | "minimal">("color");
  const [includeHeader, setIncludeHeader] = useState(true);
  const [includeFooter, setIncludeFooter] = useState(true);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

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

  // Full screen dialog content
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50/95 via-white to-purple-50/90 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900/95 z-50 overflow-hidden rtl">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-grid-slate-800/30" />
      
      <div className="flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-indigo-100 dark:border-gray-800 shadow-sm">
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
              className="h-10 w-10 rounded-full hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-6">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full max-w-3xl mx-auto mb-6 justify-center h-14 bg-white/50 dark:bg-gray-800/30 p-1.5 gap-2 border border-indigo-100/50 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">
                <TabsTrigger 
                  value="summary" 
                  className="flex-1 flex items-center gap-2 data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-indigo-50/50 dark:data-[state=active]:from-gray-800 dark:data-[state=active]:to-gray-700/50"
                >
                  <FileCheck className="h-4 w-4" />
                  خلاصه اطلاعات
                </TabsTrigger>
                <TabsTrigger 
                  value="export" 
                  className="flex-1 flex items-center gap-2 data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-indigo-50/50 dark:data-[state=active]:from-gray-800 dark:data-[state=active]:to-gray-700/50"
                >
                  <Download className="h-4 w-4" />
                  دانلود PDF
                </TabsTrigger>
                <TabsTrigger 
                  value="print" 
                  className="flex-1 flex items-center gap-2 data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-indigo-50/50 dark:data-[state=active]:from-gray-800 dark:data-[state=active]:to-gray-700/50"
                >
                  <Printer className="h-4 w-4" />
                  چاپ برنامه
                </TabsTrigger>
              </TabsList>

              <div className="max-w-4xl mx-auto">
                <TabsContent value="summary" className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-indigo-100 dark:border-gray-800 shadow-md overflow-hidden"
                  >
                    <div className="p-1">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/20 rounded-lg">
                            <FileCheck className="h-6 w-6" />
                          </div>
                          <h2 className="text-xl font-bold">
                            خلاصه اطلاعات شاگرد
                          </h2>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <ProfileWarning isProfileComplete={isProfileComplete} className="mb-6" />
                      
                      {student ? (
                        <StudentSummary 
                          student={student} 
                          exercises={exercises} 
                          meals={meals} 
                          supplements={supplements} 
                        />
                      ) : (
                        <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                          <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                          <p>اطلاعات شاگرد در دسترس نیست</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="export" className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-indigo-100 dark:border-gray-800 shadow-md overflow-hidden"
                  >
                    <div className="p-1">
                      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/20 rounded-lg">
                            <Download className="h-6 w-6" />
                          </div>
                          <h2 className="text-xl font-bold">
                            دانلود فایل PDF
                          </h2>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <ProfileWarning isProfileComplete={isProfileComplete} className="mb-6" />
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <div className="bg-indigo-50/50 dark:bg-gray-800/30 rounded-xl p-5 border border-indigo-100/50 dark:border-gray-700/50">
                              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Palette className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                انتخاب قالب خروجی
                              </h3>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div 
                                  className={`group relative overflow-hidden border rounded-xl cursor-pointer transition-all ${
                                    exportStyle === "modern"
                                      ? "border-indigo-300 ring-2 ring-indigo-500/30 dark:border-indigo-600 dark:ring-indigo-500/20"
                                      : "hover:border-indigo-200 dark:hover:border-indigo-700 border-gray-200 dark:border-gray-700"
                                  }`}
                                  onClick={() => setExportStyle("modern")}
                                >
                                  <div className="h-28 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center">
                                      <PanelTop className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                  </div>
                                  
                                  <div className="p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">مدرن</span>
                                      {exportStyle === "modern" && (
                                        <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                          <Check className="h-3 w-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">قالب مدرن با طراحی متریال دیزاین</p>
                                  </div>
                                  
                                  {exportStyle === "modern" && (
                                    <div className="absolute top-2 left-2 bg-indigo-500 text-white text-xs py-0.5 px-2 rounded-full">
                                      انتخاب شده
                                    </div>
                                  )}
                                </div>
                                
                                <div 
                                  className={`group relative overflow-hidden border rounded-xl cursor-pointer transition-all ${
                                    exportStyle === "classic"
                                      ? "border-indigo-300 ring-2 ring-indigo-500/30 dark:border-indigo-600 dark:ring-indigo-500/20"
                                      : "hover:border-indigo-200 dark:hover:border-indigo-700 border-gray-200 dark:border-gray-700"
                                  }`}
                                  onClick={() => setExportStyle("classic")}
                                >
                                  <div className="h-28 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center">
                                      <Layers className="h-8 w-8 text-amber-500 dark:text-amber-400" />
                                    </div>
                                  </div>
                                  
                                  <div className="p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">کلاسیک</span>
                                      {exportStyle === "classic" && (
                                        <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                          <Check className="h-3 w-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">طراحی کلاسیک و رسمی</p>
                                  </div>
                                  
                                  {exportStyle === "classic" && (
                                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs py-0.5 px-2 rounded-full">
                                      انتخاب شده
                                    </div>
                                  )}
                                </div>
                                
                                <div 
                                  className={`group relative overflow-hidden border rounded-xl cursor-pointer transition-all ${
                                    exportStyle === "minimal"
                                      ? "border-indigo-300 ring-2 ring-indigo-500/30 dark:border-indigo-600 dark:ring-indigo-500/20"
                                      : "hover:border-indigo-200 dark:hover:border-indigo-700 border-gray-200 dark:border-gray-700"
                                  }`}
                                  onClick={() => setExportStyle("minimal")}
                                >
                                  <div className="h-28 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/40 dark:to-slate-800/40 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center">
                                      <ScissorsSquare className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                                    </div>
                                  </div>
                                  
                                  <div className="p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">مینیمال</span>
                                      {exportStyle === "minimal" && (
                                        <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                                          <Check className="h-3 w-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">طراحی ساده و مینیمال</p>
                                  </div>
                                  
                                  {exportStyle === "minimal" && (
                                    <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs py-0.5 px-2 rounded-full">
                                      انتخاب شده
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="mt-5">
                                <button
                                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                                  className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                                >
                                  <Settings className="h-3.5 w-3.5" />
                                  {showAdvancedOptions ? "پنهان کردن تنظیمات پیشرفته" : "نمایش تنظیمات پیشرفته"}
                                </button>
                                
                                <AnimatePresence>
                                  {showAdvancedOptions && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-4 pt-4 border-t border-indigo-100 dark:border-gray-700 space-y-4">
                                        <div>
                                          <h4 className="text-sm font-medium mb-2">اندازه کاغذ</h4>
                                          <div className="flex gap-3">
                                            <button
                                              onClick={() => setPaperSize("a4")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                paperSize === "a4" 
                                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              A4
                                            </button>
                                            <button
                                              onClick={() => setPaperSize("a5")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                paperSize === "a5" 
                                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              A5
                                            </button>
                                            <button
                                              onClick={() => setPaperSize("letter")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                paperSize === "letter" 
                                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              Letter
                                            </button>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <h4 className="text-sm font-medium mb-2">طرح رنگی</h4>
                                          <div className="flex gap-3">
                                            <button
                                              onClick={() => setColorScheme("color")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                colorScheme === "color" 
                                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              رنگی
                                            </button>
                                            <button
                                              onClick={() => setColorScheme("grayscale")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                colorScheme === "grayscale" 
                                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              سیاه و سفید
                                            </button>
                                            <button
                                              onClick={() => setColorScheme("minimal")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                colorScheme === "minimal" 
                                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              ساده
                                            </button>
                                          </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                          <div className="flex items-center gap-2">
                                            <input 
                                              type="checkbox" 
                                              id="includeHeader" 
                                              checked={includeHeader}
                                              onChange={(e) => setIncludeHeader(e.target.checked)}
                                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor="includeHeader" className="text-sm">
                                              نمایش سربرگ
                                            </label>
                                          </div>
                                          
                                          <div className="flex items-center gap-2">
                                            <input 
                                              type="checkbox" 
                                              id="includeFooter" 
                                              checked={includeFooter}
                                              onChange={(e) => setIncludeFooter(e.target.checked)}
                                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor="includeFooter" className="text-sm">
                                              نمایش پاورقی
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="bg-purple-50/50 dark:bg-purple-900/10 rounded-xl p-5 border border-purple-100/50 dark:border-purple-800/30 h-full">
                              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                اطلاعات خروجی
                              </h3>
                              
                              <div className="space-y-3">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-100 dark:border-purple-900/30 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      برنامه تمرینی
                                    </span>
                                    <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                                      {toPersianNumbers(studentExercises.length)} تمرین
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-100 dark:border-purple-900/30 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                      برنامه غذایی
                                    </span>
                                    <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                      {toPersianNumbers(studentMeals.length)} وعده
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-100 dark:border-purple-900/30 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                      مکمل‌ها
                                    </span>
                                    <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded-full">
                                      {toPersianNumbers(studentSupplements.length)} مکمل
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-100 dark:border-purple-900/30 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                      ویتامین‌ها
                                    </span>
                                    <div className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                                      {toPersianNumbers(studentVitamins.length)} ویتامین
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="overflow-hidden rounded-xl">
                            <div className="relative group">
                              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                  <div className="bg-white/90 dark:bg-gray-900/90 w-full max-w-xs rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                                    <div className="h-8 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center px-3">
                                      <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                                      <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                                      <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                                    </div>
                                    <div className="p-3">
                                      <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                      <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <div className="h-2 w-12 bg-indigo-200 dark:bg-indigo-700 rounded mb-1"></div>
                                          <div className="h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded"></div>
                                        </div>
                                        <div>
                                          <div className="h-2 w-12 bg-purple-200 dark:bg-purple-700 rounded mb-1"></div>
                                          <div className="h-8 bg-purple-100 dark:bg-purple-900/50 rounded"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="relative z-10 p-4 text-white text-lg font-bold flex items-center gap-3">
                                  <Camera className="h-6 w-6" />
                                  <span>پیش‌نمایش خروجی</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/90 to-indigo-600/0"></div>
                              </div>
                            </div>
                          </div>
                          
                          {exportStyle === "modern" && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs py-0.5 px-2 rounded-lg shadow-md flex items-center gap-1.5">
                              <Crown className="h-3 w-3" />
                              <span>توصیه شده</span>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          onClick={handleDownload} 
                          disabled={isDownloading || !isProfileComplete || !student}
                          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white gap-2 rounded-xl"
                        >
                          {isDownloading ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full"></div>
                              در حال آماده‌سازی فایل...
                            </>
                          ) : isSuccess.download ? (
                            <>
                              <CheckCheck className="h-5 w-5" />
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
                            <Progress value={progress} className="h-2 bg-gray-100 dark:bg-gray-800">
                              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                            </Progress>
                            <p className="text-xs text-center text-muted-foreground">
                              {toPersianNumbers(progress)}٪ تکمیل شده
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="print" className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-indigo-100 dark:border-gray-800 shadow-md overflow-hidden"
                  >
                    <div className="p-1">
                      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/20 rounded-lg">
                            <Printer className="h-6 w-6" />
                          </div>
                          <h2 className="text-xl font-bold">
                            چاپ برنامه شاگرد
                          </h2>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <ProfileWarning isProfileComplete={isProfileComplete} className="mb-6" />
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100/50 dark:border-blue-800/30">
                              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Palette className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                انتخاب قالب چاپ
                              </h3>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div 
                                  className={`group relative overflow-hidden border rounded-xl cursor-pointer transition-all ${
                                    exportStyle === "modern"
                                      ? "border-blue-300 ring-2 ring-blue-500/30 dark:border-blue-600 dark:ring-blue-500/20"
                                      : "hover:border-blue-200 dark:hover:border-blue-700 border-gray-200 dark:border-gray-700"
                                  }`}
                                  onClick={() => setExportStyle("modern")}
                                >
                                  <div className="h-28 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center">
                                      <PanelTop className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                                    </div>
                                  </div>
                                  
                                  <div className="p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">مدرن</span>
                                      {exportStyle === "modern" && (
                                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                          <Check className="h-3 w-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">قالب مدرن با طراحی متریال دیزاین</p>
                                  </div>
                                  
                                  {exportStyle === "modern" && (
                                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs py-0.5 px-2 rounded-full">
                                      انتخاب شده
                                    </div>
                                  )}
                                </div>
                                
                                <div 
                                  className={`group relative overflow-hidden border rounded-xl cursor-pointer transition-all ${
                                    exportStyle === "classic"
                                      ? "border-blue-300 ring-2 ring-blue-500/30 dark:border-blue-600 dark:ring-blue-500/20"
                                      : "hover:border-blue-200 dark:hover:border-blue-700 border-gray-200 dark:border-gray-700"
                                  }`}
                                  onClick={() => setExportStyle("classic")}
                                >
                                  <div className="h-28 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center">
                                      <Layers className="h-8 w-8 text-amber-500 dark:text-amber-400" />
                                    </div>
                                  </div>
                                  
                                  <div className="p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">کلاسیک</span>
                                      {exportStyle === "classic" && (
                                        <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                          <Check className="h-3 w-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">طراحی کلاسیک و رسمی</p>
                                  </div>
                                  
                                  {exportStyle === "classic" && (
                                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs py-0.5 px-2 rounded-full">
                                      انتخاب شده
                                    </div>
                                  )}
                                </div>
                                
                                <div 
                                  className={`group relative overflow-hidden border rounded-xl cursor-pointer transition-all ${
                                    exportStyle === "minimal"
                                      ? "border-blue-300 ring-2 ring-blue-500/30 dark:border-blue-600 dark:ring-blue-500/20"
                                      : "hover:border-blue-200 dark:hover:border-blue-700 border-gray-200 dark:border-gray-700"
                                  }`}
                                  onClick={() => setExportStyle("minimal")}
                                >
                                  <div className="h-28 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/40 dark:to-slate-800/40 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center">
                                      <ScissorsSquare className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                                    </div>
                                  </div>
                                  
                                  <div className="p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">مینیمال</span>
                                      {exportStyle === "minimal" && (
                                        <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                                          <Check className="h-3 w-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">طراحی ساده و مینیمال</p>
                                  </div>
                                  
                                  {exportStyle === "minimal" && (
                                    <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs py-0.5 px-2 rounded-full">
                                      انتخاب شده
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="mt-5">
                                <button
                                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                                  className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                  <Settings className="h-3.5 w-3.5" />
                                  {showAdvancedOptions ? "پنهان کردن تنظیمات پیشرفته" : "نمایش تنظیمات پیشرفته"}
                                </button>
                                
                                <AnimatePresence>
                                  {showAdvancedOptions && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-4 pt-4 border-t border-blue-100 dark:border-gray-700 space-y-4">
                                        <div>
                                          <h4 className="text-sm font-medium mb-2">اندازه کاغذ</h4>
                                          <div className="flex gap-3">
                                            <button
                                              onClick={() => setPaperSize("a4")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                paperSize === "a4" 
                                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              A4
                                            </button>
                                            <button
                                              onClick={() => setPaperSize("a5")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                paperSize === "a5" 
                                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              A5
                                            </button>
                                            <button
                                              onClick={() => setPaperSize("letter")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                paperSize === "letter" 
                                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              Letter
                                            </button>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <h4 className="text-sm font-medium mb-2">طرح رنگی</h4>
                                          <div className="flex gap-3">
                                            <button
                                              onClick={() => setColorScheme("color")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                colorScheme === "color" 
                                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              رنگی
                                            </button>
                                            <button
                                              onClick={() => setColorScheme("grayscale")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                colorScheme === "grayscale" 
                                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              سیاه و سفید
                                            </button>
                                            <button
                                              onClick={() => setColorScheme("minimal")}
                                              className={`px-3 py-1 rounded-md text-sm ${
                                                colorScheme === "minimal" 
                                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                              }`}
                                            >
                                              ساده
                                            </button>
                                          </div>
                                        </div>
                                        
                                        <div className="flex gap-6">
                                          <div className="flex items-center gap-2">
                                            <input 
                                              type="checkbox" 
                                              id="includeHeader" 
                                              checked={includeHeader}
                                              onChange={(e) => setIncludeHeader(e.target.checked)}
                                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor="includeHeader" className="text-sm">
                                              نمایش سربرگ
                                            </label>
                                          </div>
                                          
                                          <div className="flex items-center gap-2">
                                            <input 
                                              type="checkbox" 
                                              id="includeFooter" 
                                              checked={includeFooter}
                                              onChange={(e) => setIncludeFooter(e.target.checked)}
                                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor="includeFooter" className="text-sm">
                                              نمایش پاورقی
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="bg-teal-50/50 dark:bg-teal-900/10 rounded-xl p-5 border border-teal-100/50 dark:border-teal-800/30 h-full">
                              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Database className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                اطلاعات چاپ
                              </h3>
                              
                              <div className="space-y-3">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-teal-100 dark:border-teal-900/30 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      برنامه تمرینی
                                    </span>
                                    <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                                      {toPersianNumbers(studentExercises.length)} تمرین
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-teal-100 dark:border-teal-900/30 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                      برنامه غذایی
                                    </span>
                                    <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                      {toPersianNumbers(studentMeals.length)} وعده
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-teal-100 dark:border-teal-900/30 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                      مکمل‌ها
                                    </span>
                                    <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded-full">
                                      {toPersianNumbers(studentSupplements.length)} مکمل
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-teal-100 dark:border-teal-900/30 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                      ویتامین‌ها
                                    </span>
                                    <div className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                                      {toPersianNumbers(studentVitamins.length)} ویتامین
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="overflow-hidden rounded-xl">
                            <div className="relative group">
                              <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                  <div className="bg-white/90 dark:bg-gray-900/90 w-full max-w-xs rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                                    <div className="h-8 bg-gradient-to-r from-blue-500 to-teal-500 flex items-center px-3">
                                      <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                                      <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                                      <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                                    </div>
                                    <div className="p-3">
                                      <div className="h-2.5 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                      <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <div className="h-2 w-12 bg-blue-200 dark:bg-blue-700 rounded mb-1"></div>
                                          <div className="h-8 bg-blue-100 dark:bg-blue-900/50 rounded"></div>
                                        </div>
                                        <div>
                                          <div className="h-2 w-12 bg-teal-200 dark:bg-teal-700 rounded mb-1"></div>
                                          <div className="h-8 bg-teal-100 dark:bg-teal-900/50 rounded"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="relative z-10 p-4 text-white text-lg font-bold flex items-center gap-3">
                                  <Printer className="h-6 w-6" />
                                  <span>پیش‌نمایش چاپ</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-blue-600/0"></div>
                              </div>
                            </div>
                          </div>
                          
                          {exportStyle === "modern" && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xs py-0.5 px-2 rounded-lg shadow-md flex items-center gap-1.5">
                              <Crown className="h-3 w-3" />
                              <span>توصیه شده</span>
                            </div>
                          )}
                        </div>
                        
                        <Button
                          onClick={handlePrint}
                          disabled={isPrinting || !isProfileComplete || !student}
                          className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white gap-2 rounded-xl"
                        >
                          {isPrinting ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full"></div>
                              در حال آماده‌سازی چاپ...
                            </>
                          ) : isSuccess.print ? (
                            <>
                              <CheckCheck className="h-5 w-5" />
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
                            <Progress value={progress} className="h-2 bg-gray-100 dark:bg-gray-800">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                            </Progress>
                            <p className="text-xs text-center text-muted-foreground">
                              {toPersianNumbers(progress)}٪ تکمیل شده
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

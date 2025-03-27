import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Download, Printer, FileText, FileCheck, X, 
  Check, ChevronDown, CheckCheck, Database,
  Shield, ShieldCheck, Calendar, Clock, User
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
import { formatPersianDateForFilename } from "@/lib/utils/persianDate";

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
  const [progressValue, setProgressValue] = useState(0);
  const [currentDate] = useState(formatPersianDateForFilename());

  useEffect(() => {
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
  }, [open]);

  useEffect(() => {
    if (isDownloading || isPrinting) {
      const interval = setInterval(() => {
        setProgressValue(prev => {
          const newValue = prev + 5;
          if (newValue >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newValue;
        });
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setProgressValue(0);
    }
  }, [isDownloading, isPrinting]);

  const resetSuccess = () => {
    setTimeout(() => {
      setIsSuccess({download: false, print: false});
    }, 3000);
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
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const doc = generateStudentPDF(student, exercises, meals, supplements, trainerProfile);
      
      doc.save(`profile_${student.name}_${formatPersianDateForFilename()}.pdf`);
      
      setIsSuccess(prev => ({...prev, download: true}));
      resetSuccess();
      
      toast({
        title: "دانلود موفق",
        description: "فایل PDF با موفقیت دانلود شد.",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
      });
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "در هنگام دانلود فایل PDF خطایی رخ داد."
      });
    } finally {
      setIsDownloading(false);
      setProgressValue(0);
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
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const printWindow = openPrintWindow(student, exercises, meals, supplements, trainerProfile);
      
      if (!printWindow) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "امکان باز کردن پنجره چاپ وجود ندارد."
        });
        return;
      }

      setIsSuccess(prev => ({...prev, print: true}));
      resetSuccess();
      
      toast({
        title: "آماده برای چاپ",
        description: "صفحه چاپ با موفقیت آماده شد.",
        className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none"
      });
    } catch (error) {
      console.error("Error preparing print:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "در آماده‌سازی چاپ خطایی رخ داد."
      });
    } finally {
      setIsPrinting(false);
      setProgressValue(0);
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

  const calculateCompleteness = () => {
    if (!student) return 0;
    
    let score = 0;
    let totalItems = 5; // Basic profile items
    
    if (student.name) score++;
    if (student.phone) score++;
    if (student.height) score++;
    if (student.weight) score++;
    if (student.payment) score++;
    
    if (studentExercises.length > 0) {
      score += 1;
      totalItems += 1;
    }
    
    if (studentMeals.length > 0) {
      score += 1;
      totalItems += 1;
    }
    
    if (studentSupplements.length > 0) {
      score += 1;
      totalItems += 1;
    }
    
    return Math.round((score / totalItems) * 100);
  };
  
  const completenessPercent = calculateCompleteness();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white/90 dark:bg-gray-950/90 backdrop-blur-md rounded-xl shadow-xl border-0">
        <div className="sticky top-0 z-20 bg-gradient-to-b from-white to-white/95 dark:from-gray-950 dark:to-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
          <DialogHeader className="p-6 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/30">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <div>
                <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                  <span className="bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    خروجی و چاپ اطلاعات
                  </span>
                </DialogTitle>
                <DialogDescription className="text-base mt-1 text-gray-600 dark:text-gray-300">
                  دانلود و چاپ اطلاعات کامل شاگرد با قالب‌بندی حرفه‌ای
                </DialogDescription>
              </div>
            </div>
            
            <div className="mt-5 flex items-center gap-3">
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">تکمیل اطلاعات</span>
                  <span className="font-medium">{completenessPercent}%</span>
                </div>
                <Progress value={completenessPercent} className="h-2.5 bg-gray-100 dark:bg-gray-800">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      completenessPercent < 40 ? 'bg-red-500' : 
                      completenessPercent < 70 ? 'bg-amber-500' : 
                      'bg-green-500'
                    }`}
                    style={{ transform: `translateX(-${100 - completenessPercent}%)` }}
                  />
                </Progress>
              </div>
              
              <div className="flex items-center gap-2 text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5">
                <Calendar className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{currentDate}</span>
              </div>
            </div>
          </DialogHeader>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full px-6"
          >
            <TabsList className="grid grid-cols-2 w-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-full p-1 my-4">
              <TabsTrigger 
                value="summary" 
                className="rounded-full text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-400"
              >
                خلاصه برنامه‌ها
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="rounded-full text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-400"
              >
                پیش‌نمایش خروجی
              </TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto max-h-[calc(80vh-210px)] p-6 pt-0 custom-scrollbar">
              <AnimatePresence mode="wait">
                {!isProfileComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProfileWarning isProfileComplete={isProfileComplete} className="mb-6" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <TabsContent value="summary" className="mt-0 space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <StudentSummary 
                    student={student} 
                    exercises={exercises} 
                    meals={meals} 
                    supplements={supplements} 
                  />
                </motion.div>
              </TabsContent>
              
              <TabsContent value="preview" className="mt-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col space-y-6"
                >
                  <div className="rounded-xl border overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 border-b">
                      <h3 className="font-semibold text-base text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/50">
                          <FileCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        پیش‌نمایش پرینت و PDF
                      </h3>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-900 p-5">
                      {student && (
                        <motion.div 
                          className="space-y-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
                            <div className="flex items-center space-x-4 space-x-reverse">
                              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-indigo-200 dark:border-indigo-800 flex-shrink-0 shadow-md">
                                <img 
                                  src={student.image || "/placeholder.svg"} 
                                  alt={student.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">{student.name}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span>قد:</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{student.height} سانتی‌متر</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span>وزن:</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{student.weight} کیلوگرم</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {trainerProfile && (
                              <div className="text-left bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-3 rounded-lg">
                                <p className="font-bold text-gray-900 dark:text-white">{trainerProfile.gymName}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{trainerProfile.fullName}</p>
                              </div>
                            )}
                          </div>
                          
                          {studentExercises.length > 0 ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="space-y-3"
                            >
                              <h4 className="text-base font-medium flex items-center gap-2 bg-gradient-to-r from-indigo-700 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                                <div className="p-1 rounded-md bg-indigo-100 dark:bg-indigo-900/50">
                                  <Check className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                برنامه تمرینی
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {studentExercises.slice(0, 4).map((exercise: any) => (
                                  <div key={exercise.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-sm bg-white/50 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2">
                                      <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-1.5 flex-shrink-0">
                                        <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                                      </div>
                                      <span className="text-gray-800 dark:text-gray-200 font-medium">{exercise.name}</span>
                                    </div>
                                  </div>
                                ))}
                                {studentExercises.length > 4 && (
                                  <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-500 flex items-center justify-center gap-2">
                                    <ChevronDown className="h-4 w-4" />
                                    و {studentExercises.length - 4} مورد دیگر...
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center"
                            >
                              <p className="text-gray-500 dark:text-gray-400 text-sm">برنامه تمرینی برای این شاگرد تعریف نشده است</p>
                            </motion.div>
                          )}
                          
                          {studentMeals.length > 0 ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="space-y-3"
                            >
                              <h4 className="text-base font-medium flex items-center gap-2 bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                <div className="p-1 rounded-md bg-green-100 dark:bg-green-900/50">
                                  <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                </div>
                                برنامه غذایی
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {studentMeals.slice(0, 4).map((meal: any) => (
                                  <div key={meal.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-sm bg-white/50 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2">
                                      <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1.5 flex-shrink-0">
                                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                      </div>
                                      <span className="text-gray-800 dark:text-gray-200 font-medium">{meal.name}</span>
                                    </div>
                                  </div>
                                ))}
                                {studentMeals.length > 4 && (
                                  <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-500 flex items-center justify-center gap-2">
                                    <ChevronDown className="h-4 w-4" />
                                    و {studentMeals.length - 4} مورد دیگر...
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center"
                            >
                              <p className="text-gray-500 dark:text-gray-400 text-sm">برنامه غذایی برای این شاگرد تعریف نشده است</p>
                            </motion.div>
                          )}
                          
                          {studentSupplements.length > 0 ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="space-y-3"
                            >
                              <h4 className="text-base font-medium flex items-center gap-2 bg-gradient-to-r from-purple-700 to-violet-600 dark:from-purple-400 dark:to-violet-400 bg-clip-text text-transparent">
                                <div className="p-1 rounded-md bg-purple-100 dark:bg-purple-900/50">
                                  <Check className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                                </div>
                                مکمل‌ها و ویتامین‌ها
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {studentSupplements.slice(0, 4).map((supplement: any) => (
                                  <div key={supplement.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-sm bg-white/50 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2">
                                      <div className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-1.5 flex-shrink-0">
                                        <Check className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                      </div>
                                      <span className="text-gray-800 dark:text-gray-200 font-medium">{supplement.name}</span>
                                    </div>
                                  </div>
                                ))}
                                {studentSupplements.length > 4 && (
                                  <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-500 flex items-center justify-center gap-2">
                                    <ChevronDown className="h-4 w-4" />
                                    و {studentSupplements.length - 4} مورد دیگر...
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center"
                            >
                              <p className="text-gray-500 dark:text-gray-400 text-sm">مکمل و ویتامین برای این شاگرد تعریف نشده است</p>
                            </motion.div>
                          )}
                          
                          <motion.div 
                            className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 flex justify-center items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Database className="h-3.5 w-3.5" />
                            <span>این یک پیش‌نمایش از خروجی PDF و چاپ است. خروجی نهایی شامل تمامی جزئیات برنامه خواهد بود.</span>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="rounded-lg border bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-4">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/50">
                          <Printer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        خروجی چاپی
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        خروجی چاپی با قالب‌بندی مناسب برای چاپ روی کاغذ A4
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <Shield className="h-3.5 w-3.5" />
                        <span>با امکان ذخیره و چاپ مستقیم</span>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-100/50 dark:from-indigo-950/30 dark:to-purple-900/20 p-4">
                      <h4 className="font-medium text-indigo-800 dark:text-indigo-300 flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/50">
                          <Download className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        خروجی PDF
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        فایل PDF با کیفیت بالا و قابل ذخیره روی تمام دستگاه‌ها
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>با قابلیت اشتراک‌گذاری آسان</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/30 rounded-b-lg">
          {(isDownloading || isPrinting) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3"
            >
              <div className="flex justify-between text-xs mb-1">
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  {isDownloading ? 'در حال آماده‌سازی PDF...' : 'در حال آماده‌سازی چاپ...'}
                </span>
                <span className="text-gray-500">{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-1.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                  style={{ transform: `translateX(-${100 - progressValue}%)` }}
                />
              </Progress>
            </motion.div>
          )}
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="gap-1 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                  } text-white flex items-center gap-1 shadow-md hover:shadow-lg transition-all`}
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
                  } text-white flex items-center gap-1 shadow-md hover:shadow-lg transition-all`}
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
                  {isDownloading ? "در حال آماده‌سازی..." : isSuccess.download ? "دانلود شد" : "دانلود PDF"}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

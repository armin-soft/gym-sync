
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, FileText, FileCheck, X, Check, ChevronDown, CheckCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { TrainerProfile } from "@/types/trainer";
import { generateStudentPDF, openPrintWindow } from "@/lib/utils/export";
import { StudentSummary } from "./StudentSummary";
import { ProfileWarning } from "./ProfileWarning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

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
      
      const doc = generateStudentPDF(student, exercises, meals, supplements, trainerProfile);
      
      doc.save(`profile_${student.name}.pdf`);
      
      setIsSuccess(prev => ({...prev, download: true}));
      resetSuccess();
      
      toast({
        title: "دانلود موفق",
        description: "فایل PDF با موفقیت دانلود شد."
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
        description: "صفحه چاپ با موفقیت آماده شد."
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white dark:bg-gray-950 rounded-lg shadow-xl border-0">
        <div className="sticky top-0 z-20 bg-gradient-to-b from-white to-white/95 dark:from-gray-950 dark:to-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">
                خروجی و چاپ اطلاعات
              </span>
            </DialogTitle>
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
            <TabsList className="grid grid-cols-2 w-full bg-indigo-50 dark:bg-indigo-950/50 rounded-full p-1 my-4">
              <TabsTrigger 
                value="summary" 
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm"
              >
                خلاصه برنامه‌ها
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm"
              >
                پیش‌نمایش خروجی
              </TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto max-h-[calc(80vh-180px)] p-6 pt-0">
              <ProfileWarning isProfileComplete={isProfileComplete} className="mb-6" />
              
              <TabsContent value="summary" className="mt-0 space-y-4">
                <StudentSummary 
                  student={student} 
                  exercises={exercises} 
                  meals={meals} 
                  supplements={supplements} 
                />
              </TabsContent>
              
              <TabsContent value="preview" className="mt-0">
                <div className="flex flex-col space-y-6">
                  <div className="rounded-xl border p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
                    <h3 className="font-semibold text-lg mb-3 text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900">
                        <FileCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      پیش‌نمایش پرینت و PDF
                    </h3>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-5 border border-indigo-100 dark:border-indigo-900">
                      {student && (
                        <motion.div 
                          className="space-y-5"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-indigo-200 dark:border-indigo-800 flex-shrink-0">
                                  <img 
                                    src={student.image || "/placeholder.svg"} 
                                    alt={student.name} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">{student.name}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    قد: {student.height} سانتی‌متر - وزن: {student.weight} کیلوگرم
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
                            >
                              <h4 className="text-lg font-medium mb-3 bg-gradient-to-r from-indigo-700 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">برنامه تمرینی</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {studentExercises.slice(0, 4).map((exercise: any) => (
                                  <div key={exercise.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-sm bg-white/50 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2">
                                      <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-full p-1.5 flex-shrink-0">
                                        <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                                      </div>
                                      {exercise.name}
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
                          )}
                          
                          {studentMeals.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <h4 className="text-lg font-medium mb-3 bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">برنامه غذایی</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {studentMeals.slice(0, 4).map((meal: any) => (
                                  <div key={meal.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-sm bg-white/50 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2">
                                      <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1.5 flex-shrink-0">
                                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                      </div>
                                      {meal.name}
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
                          )}
                          
                          {studentSupplements.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <h4 className="text-lg font-medium mb-3 bg-gradient-to-r from-purple-700 to-violet-600 dark:from-purple-400 dark:to-violet-400 bg-clip-text text-transparent">مکمل‌ها و ویتامین‌ها</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {studentSupplements.slice(0, 4).map((supplement: any) => (
                                  <div key={supplement.id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-sm bg-white/50 dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2">
                                      <div className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-1.5 flex-shrink-0">
                                        <Check className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                      </div>
                                      {supplement.name}
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
                          )}
                          
                          <motion.div 
                            className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            این یک پیش‌نمایش از خروجی PDF و چاپ است. خروجی نهایی شامل تمامی جزئیات برنامه خواهد بود.
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/30 rounded-b-lg">
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
                  disabled={!isProfileComplete || isPrinting}
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
                  disabled={!isProfileComplete || isDownloading}
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

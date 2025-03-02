
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, FileText, FileCheck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { TrainerProfile } from "@/types/trainer";
import { generateStudentPDF, openPrintWindow } from "@/lib/utils/export";
import { StudentSummary } from "./StudentSummary";
import { ProfileWarning } from "./ProfileWarning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    payment?: string;
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

  // The key fix is in the structure below - we need to make sure TabsContent is properly nested inside Tabs component
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white dark:bg-gray-950 rounded-lg">
        <div className="sticky top-0 z-20 bg-gradient-to-b from-white to-white/95 dark:from-gray-950 dark:to-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span>خروجی و چاپ اطلاعات</span>
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              دانلود و چاپ اطلاعات کامل شاگرد به همراه تمام برنامه‌ها
            </DialogDescription>
          </DialogHeader>
          
          <Tabs 
            defaultValue="summary" 
            className="w-full px-6"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 w-full bg-indigo-50 dark:bg-indigo-950/50 rounded-lg">
              <TabsTrigger value="summary" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                خلاصه برنامه‌ها
              </TabsTrigger>
              <TabsTrigger value="preview" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                پیش‌نمایش خروجی
              </TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto max-h-[calc(80vh-150px)] p-6 pt-4">
              <ProfileWarning isProfileComplete={isProfileComplete} className="mb-4" />
              
              <TabsContent value="summary" className="mt-0 space-y-4">
                <StudentSummary 
                  student={student} 
                  exercises={exercises} 
                  meals={meals} 
                  supplements={supplements} 
                />
              </TabsContent>
              
              <TabsContent value="preview" className="mt-0">
                <div className="flex flex-col space-y-4">
                  <div className="rounded-lg border p-4 bg-indigo-50/50 dark:bg-indigo-950/30">
                    <h3 className="font-semibold text-lg mb-3 text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900">
                        <FileCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      پیش‌نمایش پرینت و PDF
                    </h3>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-5 border border-indigo-100 dark:border-indigo-900">
                      {student && (
                        <div className="space-y-4">
                          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-200 dark:border-indigo-800">
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
                            <div>
                              <h4 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">برنامه تمرینی</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {studentExercises.slice(0, 4).map((exercise: any) => (
                                  <div key={exercise.id} className="border border-gray-200 dark:border-gray-800 rounded p-2 text-sm">
                                    {exercise.name}
                                  </div>
                                ))}
                                {studentExercises.length > 4 && (
                                  <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded p-2 text-sm text-gray-500">
                                    و {studentExercises.length - 4} مورد دیگر...
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {studentMeals.length > 0 && (
                            <div>
                              <h4 className="text-lg font-medium mb-2 text-green-700 dark:text-green-400">برنامه غذایی</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {studentMeals.slice(0, 4).map((meal: any) => (
                                  <div key={meal.id} className="border border-gray-200 dark:border-gray-800 rounded p-2 text-sm">
                                    {meal.name}
                                  </div>
                                ))}
                                {studentMeals.length > 4 && (
                                  <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded p-2 text-sm text-gray-500">
                                    و {studentMeals.length - 4} مورد دیگر...
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {studentSupplements.length > 0 && (
                            <div>
                              <h4 className="text-lg font-medium mb-2 text-purple-700 dark:text-purple-400">مکمل‌ها و ویتامین‌ها</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {studentSupplements.slice(0, 4).map((supplement: any) => (
                                  <div key={supplement.id} className="border border-gray-200 dark:border-gray-800 rounded p-2 text-sm">
                                    {supplement.name}
                                  </div>
                                ))}
                                {studentSupplements.length > 4 && (
                                  <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded p-2 text-sm text-gray-500">
                                    و {studentSupplements.length - 4} مورد دیگر...
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
                            این یک پیش‌نمایش از خروجی PDF و چاپ است. خروجی نهایی حاوی تمامی جزئیات خواهد بود.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="gap-1"
            >
              <X className="h-4 w-4" />
              بستن
            </Button>
            
            <div className="flex gap-2">
              <Button 
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1" 
                disabled={!isProfileComplete || isPrinting}
                size="sm"
              >
                {isPrinting ? (
                  <div className="h-4 w-4 border-2 border-white border-r-transparent rounded-full animate-spin ml-1"></div>
                ) : (
                  <Printer size={16} />
                )}
                {isPrinting ? "در حال آماده‌سازی..." : "چاپ"}
              </Button>
              
              <Button 
                onClick={handleDownload}
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1" 
                disabled={!isProfileComplete || isDownloading}
                size="sm"
              >
                {isDownloading ? (
                  <div className="h-4 w-4 border-2 border-white border-r-transparent rounded-full animate-spin ml-1"></div>
                ) : (
                  <Download size={16} />
                )}
                {isDownloading ? "در حال آماده‌سازی..." : "دانلود PDF"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

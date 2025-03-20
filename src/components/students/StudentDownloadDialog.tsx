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
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, FileText, Download, Dumbbell, Apple, Pill, UserRound, Printer } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";

interface StudentDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  exercises: any[];
  meals: any[];
  supplements: any[];
  vitamins: any[];
}

export const StudentDownloadDialog: React.FC<StudentDownloadDialogProps> = ({
  open,
  onOpenChange,
  student,
  exercises,
  meals,
  supplements,
  vitamins
}) => {
  const { toast } = useToast();
  const [selectedOptions, setSelectedOptions] = useState({
    info: true,
    exercises: true,
    diet: true,
    supplements: true
  });
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [isDownloading, setIsDownloading] = useState(false);

  if (!student) return null;

  const studentExercises = exercises.filter(exercise => 
    student.exercises?.includes(exercise.id) || 
    student.exercisesDay1?.includes(exercise.id) ||
    student.exercisesDay2?.includes(exercise.id) ||
    student.exercisesDay3?.includes(exercise.id) ||
    student.exercisesDay4?.includes(exercise.id)
  );
  
  const studentMeals = meals.filter(meal => student.meals?.includes(meal.id));
  
  const studentSupplements = supplements.filter(
    supplement => student.supplements?.includes(supplement.id)
  );
  
  const studentVitamins = vitamins.filter(
    vitamin => student.vitamins?.includes(vitamin.id)
  );

  const toggleOption = (option: keyof typeof selectedOptions) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleDownload = async () => {
    if (!student) return;

    try {
      setIsDownloading(true);
      
      const contentElement = document.getElementById('download-content');
      if (!contentElement) return;

      const canvas = await html2canvas(contentElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`برنامه_${student.name.replace(/\s+/g, '_')}.pdf`);
      
      toast({
        title: "دانلود موفق",
        description: "اطلاعات شاگرد با موفقیت دانلود شد"
      });
      
      setIsDownloading(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        variant: "destructive",
        title: "خطا در دانلود",
        description: "مشکلی در دانلود اطلاعات پیش آمد. لطفا مجدد تلاش کنید."
      });
      setIsDownloading(false);
    }
  };

  const renderPreviewContent = () => (
    <div id="download-content" className="bg-white rounded-lg p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">برنامه اختصاصی {student.name}</h1>
        <p className="text-gray-500">تهیه شده در تاریخ {new Date().toLocaleDateString('fa-IR')}</p>
      </div>

      {selectedOptions.info && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="size-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <UserRound className="size-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">اطلاعات شخصی</h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">نام و نام خانوادگی:</span>
              <span className="font-medium">{student.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">شماره تماس:</span>
              <span className="font-medium" dir="ltr">{toPersianNumbers(student.phone)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">قد:</span>
              <span className="font-medium">{toPersianNumbers(student.height)} سانتی‌متر</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">وزن:</span>
              <span className="font-medium">{toPersianNumbers(student.weight)} کیلوگرم</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">مبلغ پرداختی:</span>
              <span className="font-medium">{toPersianNumbers(student.payment)} تومان</span>
            </div>
          </div>
        </div>
      )}

      {selectedOptions.exercises && studentExercises.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Dumbbell className="size-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">برنامه تمرینی</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises
              .filter(exercise => student.exercisesDay1?.includes(exercise.id))
              .length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-3 pb-2 border-b border-blue-200">روز اول</h3>
                <div className="space-y-3">
                  {exercises
                    .filter(exercise => student.exercisesDay1?.includes(exercise.id))
                    .map(exercise => (
                      <div key={exercise.id} className="bg-white p-3 rounded-md shadow-sm">
                        <div className="font-medium text-gray-800">{exercise.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {exercise.sets && exercise.reps && (
                            <span>{toPersianNumbers(exercise.sets)} ست × {toPersianNumbers(exercise.reps)} تکرار</span>
                          )}
                          {exercise.description && (
                            <p className="mt-1 text-xs text-gray-500">{exercise.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {exercises
              .filter(exercise => student.exercisesDay2?.includes(exercise.id))
              .length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-3 pb-2 border-b border-blue-200">روز دوم</h3>
                <div className="space-y-3">
                  {exercises
                    .filter(exercise => student.exercisesDay2?.includes(exercise.id))
                    .map(exercise => (
                      <div key={exercise.id} className="bg-white p-3 rounded-md shadow-sm">
                        <div className="font-medium text-gray-800">{exercise.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {exercise.sets && exercise.reps && (
                            <span>{toPersianNumbers(exercise.sets)} ست × {toPersianNumbers(exercise.reps)} تکرار</span>
                          )}
                          {exercise.description && (
                            <p className="mt-1 text-xs text-gray-500">{exercise.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {exercises
              .filter(exercise => student.exercisesDay3?.includes(exercise.id))
              .length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-3 pb-2 border-b border-blue-200">روز سوم</h3>
                <div className="space-y-3">
                  {exercises
                    .filter(exercise => student.exercisesDay3?.includes(exercise.id))
                    .map(exercise => (
                      <div key={exercise.id} className="bg-white p-3 rounded-md shadow-sm">
                        <div className="font-medium text-gray-800">{exercise.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {exercise.sets && exercise.reps && (
                            <span>{toPersianNumbers(exercise.sets)} ست × {toPersianNumbers(exercise.reps)} تکرار</span>
                          )}
                          {exercise.description && (
                            <p className="mt-1 text-xs text-gray-500">{exercise.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {exercises
              .filter(exercise => student.exercisesDay4?.includes(exercise.id))
              .length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-3 pb-2 border-b border-blue-200">روز چهارم</h3>
                <div className="space-y-3">
                  {exercises
                    .filter(exercise => student.exercisesDay4?.includes(exercise.id))
                    .map(exercise => (
                      <div key={exercise.id} className="bg-white p-3 rounded-md shadow-sm">
                        <div className="font-medium text-gray-800">{exercise.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {exercise.sets && exercise.reps && (
                            <span>{toPersianNumbers(exercise.sets)} ست × {toPersianNumbers(exercise.reps)} تکرار</span>
                          )}
                          {exercise.description && (
                            <p className="mt-1 text-xs text-gray-500">{exercise.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {exercises
              .filter(exercise => student.exercises?.includes(exercise.id))
              .length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-3 pb-2 border-b border-blue-200">سایر تمرین‌ها</h3>
                <div className="space-y-3">
                  {exercises
                    .filter(exercise => student.exercises?.includes(exercise.id))
                    .map(exercise => (
                      <div key={exercise.id} className="bg-white p-3 rounded-md shadow-sm">
                        <div className="font-medium text-gray-800">{exercise.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {exercise.sets && exercise.reps && (
                            <span>{toPersianNumbers(exercise.sets)} ست × {toPersianNumbers(exercise.reps)} تکرار</span>
                          )}
                          {exercise.description && (
                            <p className="mt-1 text-xs text-gray-500">{exercise.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedOptions.diet && studentMeals.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="size-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <Apple className="size-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">برنامه غذایی</h2>
          </div>

          <div className="bg-green-50 rounded-lg p-4 space-y-4">
            {studentMeals.map(meal => (
              <div key={meal.id} className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-medium text-gray-800 border-b border-green-100 pb-2 mb-2">{meal.name}</h3>
                <div className="text-sm text-gray-600">
                  {meal.description && <p>{meal.description}</p>}
                  {meal.calories && (
                    <div className="mt-2 text-xs bg-green-50 inline-block px-2 py-1 rounded text-green-700">
                      {toPersianNumbers(meal.calories)} کالری
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedOptions.supplements && (studentSupplements.length > 0 || studentVitamins.length > 0) && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="size-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <Pill className="size-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">مکمل‌ها و ویتامین‌ها</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentSupplements.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-bold text-purple-800 mb-3 pb-2 border-b border-purple-200">مکمل‌ها</h3>
                <div className="space-y-3">
                  {studentSupplements.map(supplement => (
                    <div key={supplement.id} className="bg-white p-3 rounded-md shadow-sm">
                      <div className="font-medium text-gray-800">{supplement.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>دوز: {supplement.dosage}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>زمان مصرف: {supplement.timing}</span>
                      </div>
                      {supplement.description && (
                        <p className="mt-1 text-xs text-gray-500">{supplement.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {studentVitamins.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-bold text-purple-800 mb-3 pb-2 border-b border-purple-200">ویتامین‌ها</h3>
                <div className="space-y-3">
                  {studentVitamins.map(vitamin => (
                    <div key={vitamin.id} className="bg-white p-3 rounded-md shadow-sm">
                      <div className="font-medium text-gray-800">{vitamin.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>دوز: {vitamin.dosage}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>زمان مصرف: {vitamin.timing}</span>
                      </div>
                      {vitamin.description && (
                        <p className="mt-1 text-xs text-gray-500">{vitamin.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.100/20%),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.indigo.900/20%),transparent_70%)]" />
        
        <DialogHeader className="px-6 pt-6 pb-2 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <FileDown className="size-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <DialogTitle className="text-xl">دانلود اطلاعات شاگرد</DialogTitle>
          </div>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            انتخاب کنید چه اطلاعاتی از {student.name} در خروجی گنجانده شود
          </DialogDescription>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="bg-indigo-50/50 dark:bg-indigo-950/50 p-1 h-auto border border-indigo-100/50 dark:border-indigo-900/50">
              <TabsTrigger 
                value="options" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 data-[state=active]:shadow-sm rounded-md"
              >
                <div className="flex items-center gap-2">
                  <FileText className="size-4" />
                  <span>تنظیمات خروجی</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300 data-[state=active]:shadow-sm rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Printer className="size-4" />
                  <span>پیش‌نمایش</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </DialogHeader>

        <div className="relative min-h-[500px] max-h-[70vh]">
          <TabsContent value="options" className="flex-grow mt-0 p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <Card className="p-4 border-indigo-100 dark:border-indigo-800">
                <div className="flex items-start space-x-2 space-x-reverse">
                  <Checkbox 
                    id="info" 
                    checked={selectedOptions.info}
                    onCheckedChange={() => toggleOption('info')}
                    className="mt-1 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="info"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                    >
                      <UserRound className="size-5 text-indigo-600 dark:text-indigo-400" />
                      اطلاعات شخصی
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      نام، شمار�� تماس، قد، وزن و مبلغ پرداختی
                    </p>
                  </div>
                </div>
              </Card>

              <Card className={`p-4 border-blue-100 dark:border-blue-800/70 ${studentExercises.length === 0 ? 'opacity-60' : ''}`}>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <Checkbox 
                    id="exercises" 
                    checked={selectedOptions.exercises}
                    onCheckedChange={() => toggleOption('exercises')}
                    disabled={studentExercises.length === 0}
                    className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="exercises"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                    >
                      <Dumbbell className="size-5 text-blue-600 dark:text-blue-400" />
                      برنامه تمرینی
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {studentExercises.length > 0 
                        ? `${toPersianNumbers(studentExercises.length)} تمرین به شاگرد اختصاص داده شده است` 
                        : "هیچ تمرینی به شاگرد اختصاص داده نشده است"}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className={`p-4 border-green-100 dark:border-green-800/70 ${studentMeals.length === 0 ? 'opacity-60' : ''}`}>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <Checkbox 
                    id="diet" 
                    checked={selectedOptions.diet}
                    onCheckedChange={() => toggleOption('diet')}
                    disabled={studentMeals.length === 0}
                    className="mt-1 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="diet"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                    >
                      <Apple className="size-5 text-green-600 dark:text-green-400" />
                      برنامه غذایی
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {studentMeals.length > 0 
                        ? `${toPersianNumbers(studentMeals.length)} وعده غذایی به شاگرد اختصاص داده شده است` 
                        : "هیچ وعده غذایی به شاگرد اختصاص داده نشده است"}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className={`p-4 border-purple-100 dark:border-purple-800/70 ${studentSupplements.length === 0 && studentVitamins.length === 0 ? 'opacity-60' : ''}`}>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <Checkbox 
                    id="supplements" 
                    checked={selectedOptions.supplements}
                    onCheckedChange={() => toggleOption('supplements')}
                    disabled={studentSupplements.length === 0 && studentVitamins.length === 0}
                    className="mt-1 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="supplements"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                    >
                      <Pill className="size-5 text-purple-600 dark:text-purple-400" />
                      مکمل‌ها و ویتامین‌ها
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {studentSupplements.length > 0 || studentVitamins.length > 0
                        ? `${toPersianNumbers(studentSupplements.length)} مکمل و ${toPersianNumbers(studentVitamins.length)} ویتامین به شاگرد اختصاص داده شده است` 
                        : "هیچ مکمل یا ویتامینی به شاگرد اختصاص داده نشده است"}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="preview" className="flex-grow mt-0 overflow-y-auto max-h-[70vh]">
            <ScrollArea className="h-[70vh]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-4 overflow-x-hidden"
              >
                {renderPreviewContent()}
              </motion.div>
            </ScrollArea>
          </TabsContent>
        </div>

        <DialogFooter className="px-6 py-4 bg-gray-50/80 dark:bg-gray-900/40 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              تمامی اطلاعات به صورت فایل PDF ذخیره خواهد شد
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                انصراف
              </Button>
              <Button 
                onClick={handleDownload}
                disabled={isDownloading || (
                  (!selectedOptions.info && !selectedOptions.exercises && !selectedOptions.diet && !selectedOptions.supplements) ||
                  (selectedOptions.exercises && studentExercises.length === 0) ||
                  (selectedOptions.diet && studentMeals.length === 0) ||
                  (selectedOptions.supplements && studentSupplements.length === 0 && studentVitamins.length === 0)
                )}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
              >
                {isDownloading ? (
                  <>
                    <Spinner


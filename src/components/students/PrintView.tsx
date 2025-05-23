
import React, { useRef } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getCurrentPersianDate } from "@/lib/utils/persianDate";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PrintViewProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: any[];
  onClose: () => void;
  trainerInfo?: {
    name: string;
    gymName: string;
    phone: string;
    logo?: string;
  };
}

const PrintView: React.FC<PrintViewProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onClose,
  trainerInfo
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  
  // Handle print function using react-to-print
  const handlePrint = useReactToPrint({
    documentTitle: `برنامه-${student.name}-${new Date().getTime()}`,
    onAfterPrint: () => {
      console.log("Print completed");
    },
    // Fix: Use the ref directly instead of a function returning the ref
    content: () => printRef.current
  });

  // Find exercise details by ID
  const getExerciseById = (id: number) => {
    return exercises.find(ex => ex.id === id) || { name: "نامشخص", categoryId: 0 };
  };

  // Find meal details by ID
  const getMealById = (id: number) => {
    return meals.find(meal => meal.id === id) || { name: "نامشخص", type: "نامشخص" };
  };

  // Find supplement details by ID
  const getSupplementById = (id: number) => {
    return supplements.find(supp => supp.id === id) || { name: "نامشخص", type: "نامشخص" };
  };

  // Get all exercises for the student across all days
  const getAllExercises = () => {
    const result = [];
    
    // Add exercises for each day
    for (let day = 1; day <= 5; day++) {
      const dayExercises = student[`exercisesDay${day}` as keyof Student] as number[] | undefined;
      const dayReps = student[`exerciseRepsDay${day}` as keyof Student] as Record<number, string> | undefined;
      const daySets = student[`exerciseSetsDay${day}` as keyof Student] as Record<number, number> | undefined;
      
      if (dayExercises && dayExercises.length > 0) {
        result.push({
          day,
          exercises: dayExercises.map(id => {
            const exercise = getExerciseById(id);
            return {
              id,
              name: exercise.name,
              category: exercise.categoryId,
              sets: daySets ? daySets[id] || 3 : 3,
              reps: dayReps ? dayReps[id] || "12" : "12"
            };
          })
        });
      }
    }
    
    // If no day-specific exercises, add general exercises
    if (result.length === 0 && student.exercises && student.exercises.length > 0) {
      result.push({
        day: 1,
        exercises: student.exercises.map(id => {
          const exercise = getExerciseById(id);
          return {
            id,
            name: exercise.name,
            category: exercise.categoryId,
            sets: student.exerciseSets ? student.exerciseSets[id] || 3 : 3,
            reps: student.exerciseReps ? student.exerciseReps[id] || "12" : "12"
          };
        })
      });
    }
    
    return result;
  };

  // Get all meals for the student across all days
  const getAllMeals = () => {
    const result = [];
    
    // Add meals for each day of the week
    for (let day = 1; day <= 7; day++) {
      const dayMeals = student[`mealsDay${day}` as keyof Student] as number[] | undefined;
      
      if (dayMeals && dayMeals.length > 0) {
        result.push({
          day,
          dayName: getDayName(day),
          meals: dayMeals.map(id => {
            const meal = getMealById(id);
            return {
              id,
              name: meal.name,
              type: meal.type
            };
          })
        });
      }
    }
    
    // If no day-specific meals, add general meals
    if (result.length === 0 && student.meals && student.meals.length > 0) {
      result.push({
        day: 0,
        dayName: "همه روزها",
        meals: student.meals.map(id => {
          const meal = getMealById(id);
          return {
            id,
            name: meal.name,
            type: meal.type
          };
        })
      });
    }
    
    return result;
  };

  // Get all supplements and vitamins for the student
  const getAllSupplements = () => {
    const result = {
      supplements: [] as { id: number; name: string; type: string }[],
      vitamins: [] as { id: number; name: string; type: string }[]
    };
    
    // Add supplements
    if (student.supplements && student.supplements.length > 0) {
      result.supplements = student.supplements.map(id => {
        const supplement = getSupplementById(id);
        return {
          id,
          name: supplement.name,
          type: supplement.type
        };
      });
    }
    
    // Add vitamins
    if (student.vitamins && student.vitamins.length > 0) {
      result.vitamins = student.vitamins.map(id => {
        const vitamin = getSupplementById(id);
        return {
          id,
          name: vitamin.name,
          type: vitamin.type
        };
      });
    }
    
    return result;
  };

  // Get Persian day name
  const getDayName = (day: number) => {
    const dayNames = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
    return dayNames[day - 1] || "نامشخص";
  };

  // Get all data for the print view
  const exerciseData = getAllExercises();
  const mealData = getAllMeals();
  const supplementData = getAllSupplements();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
        <h2 className="text-lg font-bold">پیش‌نمایش چاپ برنامه {student.name}</h2>
        <div className="flex gap-2">
          <Button
            onClick={handlePrint}
            variant="secondary"
            className="bg-white text-indigo-700 hover:bg-indigo-100 gap-2"
          >
            <Printer className="h-4 w-4" />
            چاپ برنامه
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white/20"
          >
            بازگشت
          </Button>
        </div>
      </div>

      {/* Print Preview */}
      <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-8">
        <div className="w-[210mm] mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          <div ref={printRef} className="p-8 print:p-6 text-right rtl">
            {/* Header with gym and trainer info */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 print:mb-8">
              <div className="flex justify-between items-center">
                <div className="text-right">
                  <h1 className="text-2xl font-bold print:text-3xl">برنامه تمرینی {student.name}</h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    تاریخ صدور: {getCurrentPersianDate()}
                  </p>
                </div>
                {trainerInfo && (
                  <div className="text-left print:text-right">
                    <div className="flex items-center gap-3">
                      {trainerInfo.logo && (
                        <img src={trainerInfo.logo} alt="لوگو باشگاه" className="h-14 w-14 object-contain" />
                      )}
                      <div>
                        <h3 className="font-bold">{trainerInfo.gymName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">مربی: {trainerInfo.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">تلفن: {toPersianNumbers(trainerInfo.phone)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Student info */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8">
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <span className="font-bold">نام:</span>
                <span>{student.name}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <span className="font-bold">شماره تماس:</span>
                <span>{toPersianNumbers(student.phone)}</span>
              </div>
              {student.age && (
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <span className="font-bold">سن:</span>
                  <span>{toPersianNumbers(student.age)} سال</span>
                </div>
              )}
              {student.height && (
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <span className="font-bold">قد:</span>
                  <span>{toPersianNumbers(student.height)} سانتی‌متر</span>
                </div>
              )}
              {student.weight && (
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <span className="font-bold">وزن:</span>
                  <span>{toPersianNumbers(student.weight)} کیلوگرم</span>
                </div>
              )}
              {student.goal && (
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <span className="font-bold">هدف:</span>
                  <span>{student.goal}</span>
                </div>
              )}
            </div>

            {/* Page 1: Exercise Program */}
            <div className="exercise-page page-break-after mb-10">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-t-lg print:bg-blue-700">
                <h2 className="text-xl font-bold">برنامه تمرینی</h2>
              </div>
              
              {exerciseData.length > 0 ? (
                exerciseData.map((dayProgram, index) => (
                  <div key={`day-${dayProgram.day}`} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-bold mb-3 border-r-4 border-blue-500 pr-2">
                      روز {toPersianNumbers(dayProgram.day)}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">#</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">نام حرکت</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">ست</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">تکرار</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dayProgram.exercises.map((exercise, i) => (
                            <tr key={`exercise-${exercise.id}`} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}>
                              <td className="border border-gray-200 dark:border-gray-700 p-2">{toPersianNumbers(i + 1)}</td>
                              <td className="border border-gray-200 dark:border-gray-700 p-2">{exercise.name}</td>
                              <td className="border border-gray-200 dark:border-gray-700 p-2">{toPersianNumbers(exercise.sets)}</td>
                              <td className="border border-gray-200 dark:border-gray-700 p-2">{toPersianNumbers(exercise.reps)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  برنامه تمرینی تعریف نشده است
                </div>
              )}
            </div>

            {/* Page 2: Diet Program */}
            <div className="diet-page page-break-after page-break-before mb-10">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-3 rounded-t-lg print:bg-green-700">
                <h2 className="text-xl font-bold">برنامه غذایی</h2>
              </div>
              
              {mealData.length > 0 ? (
                mealData.map((dayMeals, index) => (
                  <div key={`meal-day-${dayMeals.day}`} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-bold mb-3 border-r-4 border-green-500 pr-2">
                      {dayMeals.dayName}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">#</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">وعده غذایی</th>
                            <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">نوع</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dayMeals.meals.map((meal, i) => (
                            <tr key={`meal-${meal.id}`} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}>
                              <td className="border border-gray-200 dark:border-gray-700 p-2">{toPersianNumbers(i + 1)}</td>
                              <td className="border border-gray-200 dark:border-gray-700 p-2">{meal.name}</td>
                              <td className="border border-gray-200 dark:border-gray-700 p-2">{meal.type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  برنامه غذایی تعریف نشده است
                </div>
              )}
              
              {student.mealNotes && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                  <h4 className="font-bold mb-2">توضیحات تکمیلی رژیم غذایی:</h4>
                  <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{student.mealNotes}</p>
                </div>
              )}
            </div>

            {/* Page 3: Supplements and Vitamins */}
            <div className="supplements-page page-break-before">
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-3 rounded-t-lg print:bg-orange-700">
                <h2 className="text-xl font-bold">مکمل‌ها و ویتامین‌ها</h2>
              </div>
              
              {(supplementData.supplements.length > 0 || supplementData.vitamins.length > 0) ? (
                <div>
                  {/* Supplements */}
                  {supplementData.supplements.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold mb-3 border-r-4 border-orange-500 pr-2">مکمل‌ها</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                              <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">#</th>
                              <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">نام مکمل</th>
                              <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">نوع</th>
                            </tr>
                          </thead>
                          <tbody>
                            {supplementData.supplements.map((supplement, i) => (
                              <tr key={`supplement-${supplement.id}`} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{toPersianNumbers(i + 1)}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{supplement.name}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{supplement.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {/* Vitamins */}
                  {supplementData.vitamins.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold mb-3 border-r-4 border-amber-500 pr-2">ویتامین‌ها</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                              <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">#</th>
                              <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">نام ویتامین</th>
                              <th className="border border-gray-200 dark:border-gray-700 p-2 text-right">نوع</th>
                            </tr>
                          </thead>
                          <tbody>
                            {supplementData.vitamins.map((vitamin, i) => (
                              <tr key={`vitamin-${vitamin.id}`} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800/50"}>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{toPersianNumbers(i + 1)}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{vitamin.name}</td>
                                <td className="border border-gray-200 dark:border-gray-700 p-2">{vitamin.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  مکمل و ویتامین تعریف نشده است
                </div>
              )}
              
              {student.notes && (
                <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                  <h4 className="font-bold mb-2">توضیحات تکمیلی مکمل‌ها:</h4>
                  <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{student.notes}</p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 text-sm print:fixed print:bottom-0 print:left-0 print:right-0 print:bg-white dark:print:bg-gray-800">
              <p>تهیه شده توسط نرم‌افزار مدیریت باشگاه جیم سینک</p>
              <p className="text-xs mt-1">www.gymsync.ir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintView;

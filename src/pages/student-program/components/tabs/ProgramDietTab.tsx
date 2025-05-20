
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, Utensils } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentDietSelector from "@/components/students/program/StudentDietSelector";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ProgramDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
}

const weekDays = [
  { id: 1, name: "شنبه" },
  { id: 2, name: "یکشنبه" },
  { id: 3, name: "دوشنبه" },
  { id: 4, name: "سه شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنج شنبه" },
  { id: 7, name: "جمعه" },
];

const ProgramDietTab: React.FC<ProgramDietTabProps> = ({
  student,
  meals,
  onSaveDiet
}) => {
  const { toast } = useToast();
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Cache for storing meals for each day
  const mealsCacheRef = React.useRef<Record<number, number[]>>({
    1: [], // شنبه
    2: [], // یکشنبه
    3: [], // دوشنبه
    4: [], // سه شنبه
    5: [], // چهارشنبه
    6: [], // پنج شنبه
    7: []  // جمعه
  });
  
  // Initialize cache with student data
  useEffect(() => {
    const cachedMeals = { ...mealsCacheRef.current };
    
    if (student.mealsDay1) cachedMeals[1] = [...student.mealsDay1];
    if (student.mealsDay2) cachedMeals[2] = [...student.mealsDay2];
    if (student.mealsDay3) cachedMeals[3] = [...student.mealsDay3];
    if (student.mealsDay4) cachedMeals[4] = [...student.mealsDay4];
    if (student.mealsDay5) cachedMeals[5] = [...student.mealsDay5];
    if (student.mealsDay6) cachedMeals[6] = [...student.mealsDay6];
    if (student.mealsDay7) cachedMeals[7] = [...student.mealsDay7];
    
    // If no day-specific meals found, use general meals for all days
    if (student.meals && student.meals.length > 0) {
      for (let i = 1; i <= 7; i++) {
        if (!cachedMeals[i].length) {
          cachedMeals[i] = [...student.meals];
        }
      }
    }
    
    mealsCacheRef.current = cachedMeals;
    
    // Don't set selected meals initially - wait for day selection
  }, [student]);

  // Handle day selection - load meals from cache
  useEffect(() => {
    if (currentDay === null) {
      setSelectedMeals([]);
      return;
    }
    
    // Save current day meals to cache before changing if we had a previous day selected
    if (selectedMeals.length > 0) {
      mealsCacheRef.current = {
        ...mealsCacheRef.current,
        [currentDay]: [...selectedMeals]
      };
    }
    
    // Load meals from cache for the selected day
    setSelectedMeals(mealsCacheRef.current[currentDay] || []);
  }, [currentDay]);

  const handleSave = async () => {
    if (currentDay === null) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفا ابتدا یک روز از هفته را انتخاب کنید"
      });
      return;
    }
    
    setIsSaving(true);
    try {
      // Save to cache
      const updatedCache = {
        ...mealsCacheRef.current,
        [currentDay]: [...selectedMeals]
      };
      mealsCacheRef.current = updatedCache;
      
      const success = onSaveDiet(selectedMeals, currentDay);
      
      if (success) {
        toast({
          title: "ذخیره موفق",
          description: `برنامه غذایی روز ${weekDays.find(d => d.id === currentDay)?.name} با موفقیت ذخیره شد`
        });
      } else {
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره‌سازی برنامه غذایی پیش آمد."
        });
      }
    } catch (error) {
      console.error("Error saving meals:", error);
      toast({
        variant: "destructive",
        title: "خطای سیستمی",
        description: "خطایی در هنگام ذخیره‌سازی رخ داد. لطفا مجدد تلاش کنید."
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4 rtl" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <Utensils className="h-5 w-5 ml-2 text-green-500" />
          برنامه غذایی
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving || currentDay === null}
          className="flex items-center gap-1 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          {isSaving ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>ذخیره</span>
        </Button>
      </div>
      
      <Card className="flex-1 overflow-auto">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="text-center mb-6 mt-2">
            <h3 className="text-lg font-medium mb-3">انتخاب روز هفته</h3>
            <ScrollArea className="w-full" orientation="horizontal">
              <div className="flex justify-center items-center space-x-1 space-x-reverse">
                {weekDays.map((day) => (
                  <motion.button
                    key={day.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentDay(day.id)}
                    className={cn(
                      "h-10 px-5 py-2 rounded-md border text-sm transition-all",
                      currentDay === day.id 
                        ? "bg-green-500 text-white border-green-500" 
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    {day.name}
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {currentDay !== null ? (
            <motion.div
              key={`day-${currentDay}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <h4 className="font-medium text-green-700">
                  وعده‌های غذایی روز {weekDays.find(d => d.id === currentDay)?.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {toPersianNumbers(selectedMeals.length)} وعده انتخاب شده
                </p>
              </div>
              
              <StudentDietSelector 
                meals={meals}
                selectedMeals={selectedMeals}
                setSelectedMeals={setSelectedMeals}
                currentDay={currentDay}
              />
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
              <Utensils className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg text-gray-600 font-medium">لطفا یک روز از هفته را انتخاب کنید</p>
              <p className="text-sm text-gray-400 mt-2 max-w-md">
                برای مشاهده و تنظیم برنامه غذایی، ابتدا روز مورد نظر را انتخاب کنید
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramDietTab;

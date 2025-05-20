
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentDietSelector from "@/components/students/program/StudentDietSelector";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ProgramDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
}

const ProgramDietTab: React.FC<ProgramDietTabProps> = ({
  student,
  meals,
  onSaveDiet
}) => {
  const { toast } = useToast();
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  
  // คัชเดิเระิฑาทร่อย่างเพื่อเพิ่มประสิทธิภาพการใช้งาน
  const mealsCacheRef = React.useRef<Record<number, number[]>>({
    1: [], // شنبه
    2: [], // یکشنبه
    3: [], // دوشنبه
    4: [], // سه شنبه
    5: [], // چهارشنبه
    6: [], // پنج شنبه
    7: []  // جمعه
  });
  
  // Initializing cache once on load
  useEffect(() => {
    const cachedMeals = { ...mealsCacheRef.current };
    
    if (student.mealsDay1) {
      cachedMeals[1] = [...student.mealsDay1];
    }
    
    if (student.mealsDay2) {
      cachedMeals[2] = [...student.mealsDay2];
    }
    
    if (student.mealsDay3) {
      cachedMeals[3] = [...student.mealsDay3];
    }
    
    if (student.mealsDay4) {
      cachedMeals[4] = [...student.mealsDay4];
    }
    
    if (student.mealsDay5) {
      cachedMeals[5] = [...student.mealsDay5];
    }
    
    if (student.mealsDay6) {
      cachedMeals[6] = [...student.mealsDay6];
    }
    
    if (student.mealsDay7) {
      cachedMeals[7] = [...student.mealsDay7];
    }
    
    // If no day-specific meals found, use general meals for all days
    if (student.meals && student.meals.length > 0) {
      for (let i = 1; i <= 7; i++) {
        if (!cachedMeals[i].length) {
          cachedMeals[i] = [...student.meals];
        }
      }
    }
    
    mealsCacheRef.current = cachedMeals;
    
    // Set first day meals initially
    setSelectedMeals(cachedMeals[1]);
  }, [student]);

  // Side effect for managing day changes - save to and load from cache
  useEffect(() => {
    // Save current day meals to cache before changing
    const currentMeals = [...selectedMeals];
    mealsCacheRef.current = {
      ...mealsCacheRef.current,
      [currentDay]: currentMeals
    };
    
    // Load meals from cache for the new day
    setSelectedMeals(mealsCacheRef.current[currentDay] || []);
  }, [currentDay]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to cache before sending to server
      const updatedCache = {
        ...mealsCacheRef.current,
        [currentDay]: [...selectedMeals]
      };
      mealsCacheRef.current = updatedCache;
      
      const success = onSaveDiet(selectedMeals, currentDay);
      
      if (success) {
        toast({
          title: "ذخیره موفق",
          description: `برنامه غذایی روز ${getWeekdayName(currentDay)} با موفقیت ذخیره شد`
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
  
  const getWeekdayName = (day: number): string => {
    switch(day) {
      case 1: return "شنبه";
      case 2: return "یکشنبه";
      case 3: return "دوشنبه";
      case 4: return "سه شنبه";
      case 5: return "چهارشنبه";
      case 6: return "پنج شنبه";
      case 7: return "جمعه";
      default: return "روز نامشخص";
    }
  };
  
  // Day buttons with animation for better UX
  const DayButton = ({ day }: { day: number }) => (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setCurrentDay(day)}
      className={cn(
        "h-10 px-6 rounded-md border-0",
        currentDay === day 
          ? "bg-green-500 text-white" 
          : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      )}
    >
      {getWeekdayName(day)}
    </motion.button>
  );

  return (
    <div className="flex flex-col h-full space-y-4 rtl" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          برنامه غذایی روز {getWeekdayName(currentDay)}
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
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
      
      <div className="flex items-center justify-center mb-4">
        <motion.div 
          className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ScrollArea orientation="horizontal" className="w-full">
            <div className="flex">
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <DayButton key={day} day={day} />
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      </div>
      
      <motion.div 
        className="flex-1 overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        key={`day-${currentDay}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <StudentDietSelector 
          meals={meals}
          selectedMeals={selectedMeals}
          setSelectedMeals={setSelectedMeals}
          currentDay={currentDay}
        />
      </motion.div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center p-2">
        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span>{toPersianNumbers(selectedMeals.length)} وعده غذایی انتخاب شده</span>
        </span>
      </div>
    </div>
  );
};

export default ProgramDietTab;


import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import type { Meal, MealType, WeekDay } from "@/types/meal";
import { DayTabs } from "./DayTabs";
import { DayContent } from "./DayContent";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface DayMealsProps {
  meals: Meal[];
  mealTypes: MealType[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: number) => void;
}

// تعریف روزهای هفته با ترتیب صحیح از شنبه تا جمعه
const weekDays: WeekDay[] = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه شنبه', 
  'چهارشنبه', 
  'پنج شنبه', 
  'جمعه'
];

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  // استفاده از شنبه به عنوان روز پیش‌فرض
  const [selectedDay, setSelectedDay] = useState<WeekDay>('شنبه');
  const deviceInfo = useDeviceInfo();
  
  // تشخیص اینکه آیا کامپوننت هنوز نمایش داده می‌شود
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // اطلاعات دیباگ
    console.log("=== DAY MEALS COMPONENT DEBUG ===");
    console.log("Total meals received:", meals.length);
    console.log("All meals from localStorage:", meals);
    console.log("Selected day:", selectedDay);
    console.log("Meal types:", mealTypes);
    
    return () => {
      setIsMounted(false);
    };
  }, [meals, selectedDay, mealTypes]);
  
  // دریافت روزهای دارای محتوا از وعده‌های غذایی
  const daysWithContent = Array.from(
    new Set(meals.map(meal => meal.day).filter(Boolean))
  ) as WeekDay[];
  
  console.log("Days with content from localStorage:", daysWithContent);
  
  // یک تابع برای تبدیل مناسب رشته به نوع WeekDay
  const handleDayChange = (value: string) => {
    if (isMounted) {
      setSelectedDay(value as WeekDay);
      console.log("Changed day to:", value);
    }
  };
  
  // نمایش تمام غذاهای مربوط به روز انتخاب شده
  const getDayMeals = (day: WeekDay): Meal[] => {
    const dayMeals = meals.filter(meal => {
      // بررسی مستقیم بدون استفاده از normalizeDay
      const isMatch = meal.day === day;
      console.log(`Checking meal ${meal.name}: meal.day="${meal.day}", selected day="${day}", match=${isMatch}`);
      return isMatch;
    });
    console.log(`*** FILTERED MEALS FOR ${day} FROM LOCALSTORAGE: ${dayMeals.length} items ***`, dayMeals);
    return dayMeals;
  };
  
  // نمایش پیام مناسب اگر داده‌ای وجود ندارد
  if (meals.length === 0) {
    return (
      <div dir="rtl" className="relative text-right h-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-full"
        >
          <div className="text-center py-12 h-full flex items-center justify-center" dir="rtl">
            <div className="bg-muted/50 rounded-lg p-8 text-right">
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                هیچ وعده غذایی در دیتابیس محلی یافت نشد
              </h3>
              <p className="text-muted-foreground mb-4">
                برای شروع، وعده غذایی جدید اضافه کنید
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div dir="rtl" className="relative text-right h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full flex flex-col"
      >
        <Tabs value={selectedDay} onValueChange={handleDayChange} className="w-full h-full flex flex-col" dir="rtl">
          {/* Header with tabs - fixed at top */}
          <div className="flex-shrink-0 mb-4">
            <DayTabs 
              weekDays={weekDays} 
              selectedDay={selectedDay} 
              onDayChange={setSelectedDay}
              daysWithContent={daysWithContent}
            />
          </div>
          
          {/* Scrollable content area with fixed height to enable scrolling */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-280px)] w-full">
              <div className="p-1" dir="rtl">
                {weekDays.map((day) => {
                  const dayMeals = getDayMeals(day);
                  console.log(`*** PASSING TO DayContent for ${day} from localStorage:`, dayMeals.length, 'meals');
                  
                  return (
                    <TabsContent 
                      key={day} 
                      value={day} 
                      className="mt-0 relative text-right data-[state=active]:block data-[state=inactive]:hidden"
                      dir="rtl"
                    >
                      <DayContent
                        key={`day-content-${day}-${dayMeals.length}`}
                        day={day}
                        mealTypes={mealTypes}
                        meals={dayMeals}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </TabsContent>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};

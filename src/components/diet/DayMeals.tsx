
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

// تعریف روزهای هفته با نوع صحیح
const weekDays: WeekDay[] = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه‌شنبه', 
  'چهارشنبه', 
  'پنجشنبه', 
  'جمعه'
];

export const DayMeals = ({ meals, mealTypes, onEdit, onDelete }: DayMealsProps) => {
  // دریافت روزهای دارای محتوا از وعده‌های غذایی
  const daysWithContent = Array.from(new Set(meals.map(meal => meal.day))).filter(Boolean) as WeekDay[];
  
  // استفاده از اولین روز هفته به عنوان روز پیش‌فرض
  const [selectedDay, setSelectedDay] = useState<WeekDay>(weekDays[0]);
  const deviceInfo = useDeviceInfo();
  
  // تشخیص اینکه آیا کامپوننت هنوز نمایش داده می‌شود
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // اطلاعات دیباگ
    console.log("Total meals:", meals.length);
    console.log("Days with content:", daysWithContent);
    console.log("All meals:", meals);
    
    return () => {
      setIsMounted(false);
    };
  }, [meals, daysWithContent]);
  
  // یک تابع برای تبدیل مناسب رشته به نوع WeekDay
  const handleDayChange = (value: string) => {
    if (isMounted) {
      setSelectedDay(value as WeekDay);
      console.log("Changed day to:", value);
    }
  };
  
  // نمایش تمام غذاهای مربوط به روز انتخاب شده
  const getDayMeals = (day: WeekDay): Meal[] => {
    const dayMeals = meals.filter(meal => meal.day === day);
    console.log(`Filtered meals for ${day}: ${dayMeals.length} items`);
    return dayMeals;
  };
  
  return (
    <div dir="rtl" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Tabs value={selectedDay} onValueChange={handleDayChange} className="w-full">
          <ScrollArea 
            className="w-full overflow-hidden" 
            orientation="horizontal"
          >
            <div className="min-h-[600px] pb-4">
              <DayTabs 
                weekDays={weekDays} 
                selectedDay={selectedDay} 
                onDayChange={setSelectedDay}
                daysWithContent={daysWithContent}
              >
                {weekDays.map((day) => {
                  const dayMeals = getDayMeals(day);
                  
                  return (
                    <TabsContent 
                      key={day} 
                      value={day} 
                      className="mt-6 relative"
                    >
                      <DayContent
                        key={`day-content-${day}`}
                        day={day}
                        mealTypes={mealTypes}
                        meals={dayMeals}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </TabsContent>
                  );
                })}
              </DayTabs>
            </div>
          </ScrollArea>
        </Tabs>
      </motion.div>
    </div>
  );
};

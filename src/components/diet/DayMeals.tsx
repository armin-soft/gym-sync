
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

// تابع کمکی برای استاندارد کردن نام روزها - اصلاح شده
const normalizeDay = (day: string): string => {
  if (!day) return '';
  
  // حذف تمام فضاهای خالی و تبدیل به حروف کوچک
  const cleanDay = day.trim().replace(/\s+/g, '').toLowerCase();
  
  // نگاشت برای استاندارد کردن نوشتار روزها
  const dayMap: Record<string, WeekDay> = {
    'شنبه': 'شنبه',
    'یکشنبه': 'یکشنبه',
    'يکشنبه': 'یکشنبه', // یای عربی
    'یک‌شنبه': 'یکشنبه',
    'یکشنبه': 'یکشنبه',
    'دوشنبه': 'دوشنبه',
    'دو‌شنبه': 'دوشنبه',
    'سه‌شنبه': 'سه شنبه',
    'سهشنبه': 'سه شنبه',
    'سه‌ شنبه': 'سه شنبه',
    'سه شنبه': 'سه شنبه',
    'چهارشنبه': 'چهارشنبه',
    'چهار‌شنبه': 'چهارشنبه',
    'چهار شنبه': 'چهارشنبه',
    'پنج‌شنبه': 'پنج شنبه',
    'پنجشنبه': 'پنج شنبه',
    'پنج شنبه': 'پنج شنبه',
    'جمعه': 'جمعه'
  };
  
  // جستجو در نگاشت
  for (const [variant, standard] of Object.entries(dayMap)) {
    if (variant.replace(/\s+/g, '').toLowerCase() === cleanDay) {
      return standard;
    }
  }
  
  // اگر پیدا نشد، همان مقدار اصلی را برگردان
  return day;
};

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
  // دریافت روزهای دارای محتوا از وعده‌های غذایی و استاندارد کردن آن‌ها
  const daysWithContent = Array.from(
    new Set(meals.map(meal => normalizeDay(meal.day || '')))
  ).filter(Boolean) as WeekDay[];
  
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
    console.log("All meals:", meals);
    console.log("Days with content:", daysWithContent);
    console.log("Selected day:", selectedDay);
    console.log("Meal types:", mealTypes);
    
    // بررسی هر روز
    weekDays.forEach(day => {
      const dayMeals = meals.filter(meal => {
        const normalizedMealDay = normalizeDay(meal.day || '');
        const normalizedSelectedDay = normalizeDay(day);
        const matches = normalizedMealDay === normalizedSelectedDay;
        console.log(`Meal day "${meal.day}" normalized to "${normalizedMealDay}", comparing with "${normalizedSelectedDay}": ${matches}`);
        return matches;
      });
      console.log(`Day ${day} has ${dayMeals.length} meals:`, dayMeals);
    });
    
    console.log("=== END DAY MEALS COMPONENT DEBUG ===");
    
    return () => {
      setIsMounted(false);
    };
  }, [meals, daysWithContent, selectedDay, mealTypes]);
  
  // یک تابع برای تبدیل مناسب رشته به نوع WeekDay
  const handleDayChange = (value: string) => {
    if (isMounted) {
      setSelectedDay(value as WeekDay);
      console.log("Changed day to:", value);
    }
  };
  
  // نمایش تمام غذاهای مربوط به روز انتخاب شده با در نظر گرفتن استاندارد کردن نام روزها
  const getDayMeals = (day: WeekDay): Meal[] => {
    const normalizedSelectedDay = normalizeDay(day);
    const dayMeals = meals.filter(meal => {
      const normalizedMealDay = normalizeDay(meal.day || '');
      const isMatch = normalizedMealDay === normalizedSelectedDay;
      console.log(`Filtering: meal day "${meal.day}" (normalized: "${normalizedMealDay}") vs selected "${day}" (normalized: "${normalizedSelectedDay}") = ${isMatch}`);
      return isMatch;
    });
    console.log(`Filtered meals for ${day}: ${dayMeals.length} items`, dayMeals);
    return dayMeals;
  };
  
  // نمایش پیام مناسب اگر داده‌ای وجود ندارد
  if (meals.length === 0) {
    return (
      <div dir="rtl" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <div className="text-center py-12">
            <div className="bg-muted/50 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                هیچ وعده غذایی یافت نشد
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

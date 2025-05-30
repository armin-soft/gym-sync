
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

// تابع کمکی برای استاندارد کردن نام روزها
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
    'دوشنبه': 'دوشنبه',
    'دو‌شنبه': 'دوشنبه',
    'سه‌شنبه': 'سه شنبه',
    'سهشنبه': 'سه شنبه',
    'سه‌ شنبه': 'سه شنبه',
    'چهارشنبه': 'چهار شنبه',
    'چهار‌شنبه': 'چهار شنبه',
    'چهار شنبه': 'چهار شنبه',
    'پنج‌شنبه': 'پنج شنبه',
    'پنجشنبه': 'پنج شنبه',
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

// تعریف روزهای هفته با ترتیب صحیح و نام‌های استاندارد
const weekDays: WeekDay[] = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه شنبه', 
  'چهار شنبه', 
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
    console.log("All meals:", meals);
    console.log("Selected day:", selectedDay);
    console.log("Meal types:", mealTypes);
    
    return () => {
      setIsMounted(false);
    };
  }, [meals, selectedDay, mealTypes]);
  
  // دریافت روزهای دارای محتوا از وعده‌های غذایی
  const daysWithContent = Array.from(
    new Set(meals.map(meal => normalizeDay(meal.day || '')))
  ).filter(Boolean) as WeekDay[];
  
  console.log("Days with content after normalization:", daysWithContent);
  
  // یک تابع برای تبدیل مناسب رشته به نوع WeekDay
  const handleDayChange = (value: string) => {
    if (isMounted) {
      setSelectedDay(value as WeekDay);
      console.log("Changed day to:", value);
    }
  };
  
  // نمایش تمام غذاهای مربوط به روز انتخاب شده
  const getDayMeals = (day: WeekDay): Meal[] => {
    const normalizedSelectedDay = normalizeDay(day);
    const dayMeals = meals.filter(meal => {
      const normalizedMealDay = normalizeDay(meal.day || '');
      const isMatch = normalizedMealDay === normalizedSelectedDay;
      return isMatch;
    });
    console.log(`*** FILTERED MEALS FOR ${day}: ${dayMeals.length} items ***`, dayMeals);
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
                  console.log(`*** PASSING TO DayContent for ${day}:`, dayMeals.length, 'meals');
                  
                  return (
                    <TabsContent 
                      key={day} 
                      value={day} 
                      className="mt-6 relative"
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
              </DayTabs>
            </div>
          </ScrollArea>
        </Tabs>
      </motion.div>
    </div>
  );
};

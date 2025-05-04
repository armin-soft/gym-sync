
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Meal, MealType, WeekDay } from "@/types/meal";

// تابع کمکی برای استاندارد کردن نام روزها
const normalizeDay = (day: string): string => {
  return day.replace(/\s+/g, '‌');
}

export const useDietState = () => {
  const { toast } = useToast();
  
  // بارگیری وعده‌های غذایی از localStorage یا شروع با آرایه خالی
  const [meals, setMeals] = useState<Meal[]>(() => {
    try {
      const savedMeals = localStorage.getItem('meals');
      const parsedMeals = savedMeals ? JSON.parse(savedMeals) : [];
      console.log("Loaded meals from localStorage:", parsedMeals.length);
      return parsedMeals;
    } catch (error) {
      console.error('Error loading meals:', error);
      return [];
    }
  });
  
  // حالت دیالوگ
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | undefined>();
  
  // جستجو و فیلتر حالت
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // ذخیره وعده‌های غذایی در localStorage
  const saveMeals = (newMeals: Meal[]) => {
    try {
      // استاندارد کردن روزهای هفته قبل از ذخیره‌سازی
      const normalizedMeals = newMeals.map(meal => ({
        ...meal,
        day: meal.day ? normalizeDay(meal.day) as WeekDay : meal.day
      }));
      
      localStorage.setItem('meals', JSON.stringify(normalizedMeals));
      setMeals(normalizedMeals);
    } catch (error) {
      console.error('Error saving meals:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره سازی",
        description: "مشکلی در ذخیره برنامه غذایی پیش آمده است"
      });
    }
  };
  
  // تغییر ترتیب مرتب‌سازی
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };
  
  // مدیریت باز کردن دیالوگ
  const handleOpen = () => {
    setSelectedMeal(undefined);
    setOpen(true);
  };
  
  // مدیریت ویرایش وعده غذایی
  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  };
  
  // مدیریت حذف وعده غذایی
  const handleDelete = (id: number) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    saveMeals(updatedMeals);
    toast({
      title: "حذف موفق",
      description: "وعده غذایی با موفقیت حذف شد",
    });
  };
  
  // بررسی تکراری بودن وعده غذایی در همان روز و همان نوع وعده - با دقت بیشتر
  const isMealDuplicate = (data: Omit<Meal, "id">, mealId?: number): boolean => {
    // لاگ برای دیباگ
    console.log("Checking for duplicate meal:", data);
    
    const duplicate = meals.some(existingMeal => {
      // استاندارد کردن نام روزها قبل از مقایسه
      const normalizedExistingDay = normalizeDay(existingMeal.day || '');
      const normalizedNewDay = normalizeDay(data.day || '');
      
      const isDuplicate = 
        existingMeal.name.trim().toLowerCase() === data.name.trim().toLowerCase() && 
        existingMeal.type === data.type && 
        normalizedExistingDay === normalizedNewDay &&
        existingMeal.id !== mealId;
      
      if (isDuplicate) {
        console.log("Found duplicate:", existingMeal);
      }
      
      return isDuplicate;
    });
    
    console.log("Duplicate found:", duplicate);
    return duplicate;
  };
  
  // مدیریت ذخیره وعده غذایی
  const handleSave = (data: Omit<Meal, "id">) => {
    // پیش‌پردازش داده‌ها - حذف فاصله‌های اضافی
    const cleanData = {
      ...data,
      name: data.name.trim(),
      description: "",
      // استاندارد کردن نام روز
      day: data.day ? normalizeDay(data.day) as WeekDay : data.day
    };
    
    console.log("Attempting to save meal:", cleanData);
    
    // بررسی تکراری بودن وعده غذایی در همان روز و همان نوع وعده
    if (isMealDuplicate(cleanData, selectedMeal?.id)) {
      toast({
        variant: "destructive",
        title: "خطا در ثبت وعده غذایی",
        description: "این وعده غذایی قبلاً برای این روز و نوع وعده ثبت شده است",
      });
      return false;
    }
    
    let newMeals: Meal[];
    
    if (selectedMeal) {
      // ویرایش وعده غذایی موجود
      newMeals = meals.map(m => 
        m.id === selectedMeal.id 
          ? { ...cleanData, id: m.id }
          : m
      );
      
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی با موفقیت ویرایش شد",
      });
    } else {
      // ایجاد وعده غذایی جدید
      const newMeal = {
        ...cleanData,
        id: Math.max(0, ...meals.map(m => m.id)) + 1
      };
      
      newMeals = [...meals, newMeal];
      
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی جدید با موفقیت اضافه شد",
      });
    }
    
    saveMeals(newMeals);
    console.log("Saved meals:", newMeals);
    setOpen(false);
    return true;
  };
  
  // فیلتر وعده‌های غذایی بر اساس جستجو
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = 
      !searchQuery || 
      meal.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      meal.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });
  
  return {
    meals,
    setMeals,
    open,
    setOpen,
    selectedMeal,
    setSelectedMeal,
    searchQuery,
    setSearchQuery,
    selectedDay,
    setSelectedDay,
    sortOrder,
    setSortOrder,
    toggleSortOrder,
    filteredMeals,
    handleOpen,
    handleEdit,
    handleDelete,
    handleSave,
  };
};

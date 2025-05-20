
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { weekDays } from "./constants";

export const useDietState = (
  student: Student,
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean
) => {
  const { toast } = useToast();
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Cache for storing meals for each day
  const mealsCacheRef = useRef<Record<number, number[]>>({
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
  }, [student]);

  // Handle day selection - load meals from cache
  useEffect(() => {
    if (currentDay === null) {
      setSelectedMeals([]);
      return;
    }
    
    // Save current day meals to cache before changing if we had a previous day selected
    if (selectedMeals.length > 0 && currentDay !== null) {
      mealsCacheRef.current = {
        ...mealsCacheRef.current,
        [currentDay]: [...selectedMeals]
      };
    }
    
    // Load meals from cache for the selected day
    setSelectedMeals(currentDay !== null ? (mealsCacheRef.current[currentDay] || []) : []);
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

  return {
    selectedMeals,
    setSelectedMeals,
    currentDay,
    setCurrentDay,
    isSaving,
    mealsCacheRef,
    handleSave
  };
};

export default useDietState;

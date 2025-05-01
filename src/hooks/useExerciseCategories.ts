
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExerciseCategory, defaultCategories } from "@/types/exercise";

export const useExerciseCategories = (selectedType: string | null) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ name: "", type: selectedType || "" });

  // بارگذاری اطلاعات از localStorage
  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem("exerciseCategories");
      if (!savedCategories || savedCategories === "[]") {
        // اگر داده‌ای در localStorage نبود، از داده‌های پیش‌فرض استفاده کن
        setCategories(defaultCategories);
        localStorage.setItem("exerciseCategories", JSON.stringify(defaultCategories));
      } else {
        const cats = JSON.parse(savedCategories);
        setCategories(cats);
      }
    } catch (error) {
      console.error("Error loading categories from localStorage:", error);
    }
  }, []);

  // به‌روزرسانی فرم با نوع انتخاب شده
  useEffect(() => {
    setCategoryFormData(prev => ({ ...prev, type: selectedType || "" }));
  }, [selectedType]);

  // ذخیره اطلاعات در localStorage
  useEffect(() => {
    try {
      localStorage.setItem("exerciseCategories", JSON.stringify(categories));
    } catch (error) {
      console.error("Error saving categories to localStorage:", error);
    }
  }, [categories]);

  // ذخیره یا ویرایش دسته‌بندی
  const handleSaveCategory = useCallback(async (data: { name: string; type: string }) => {
    if (!data.name.trim() || !data.type) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام و نوع دسته‌بندی را وارد کنید"
      });
      return Promise.reject("اطلاعات ناقص");
    }

    try {
      if (selectedCategory) {
        // ویرایش دسته‌بندی موجود
        const categoryExists = categories.some(cat =>
          cat.name === data.name && cat.type === data.type && cat.id !== selectedCategory.id
        );

        if (categoryExists) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "دسته‌بندی با این نام و نوع قبلاً اضافه شده است"
          });
          return Promise.reject("تکراری");
        }

        const updatedCategories = categories.map(cat =>
          cat.id === selectedCategory.id ? { ...cat, name: data.name, type: data.type } : cat
        );
        
        setCategories(updatedCategories);
        setIsCategoryDialogOpen(false);
        setSelectedCategory(null);
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت ویرایش شد"
        });
      } else {
        // افزودن دسته‌بندی جدید
        const categoryExists = categories.some(cat =>
          cat.name === data.name && cat.type === data.type
        );

        if (categoryExists) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "دسته‌بندی با این نام و نوع قبلاً اضافه شده است"
          });
          return Promise.reject("تکراری");
        }

        const timestamp = Date.now();
        const newCategory: ExerciseCategory = {
          id: timestamp,
          name: data.name,
          type: data.type
        };
        
        setCategories(prev => [...prev, newCategory]);
        setIsCategoryDialogOpen(false);
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی جدید با موفقیت اضافه شد"
        });
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی دسته‌بندی"
      });
      return Promise.reject(error);
    }
  }, [categories, selectedCategory]);

  // حذف دسته‌بندی
  const handleDeleteCategory = useCallback((category: ExerciseCategory, exercises: any[] = []) => {
    const exercisesInCategory = exercises.filter(ex => ex.categoryId === category.id);
    
    if (exercisesInCategory.length > 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "ابتدا باید حرکات موجود در این دسته‌بندی را حذف کنید"
      });
      return;
    }
    
    setCategories(prev => prev.filter(cat => cat.id !== category.id));
    
    toast({
      title: "موفقیت",
      description: "دسته‌بندی با موفقیت حذف شد"
    });
  }, []);

  return {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    categoryFormData,
    setCategoryFormData,
    handleSaveCategory,
    handleDeleteCategory
  };
};

export default useExerciseCategories;


import { useState, useEffect, useCallback } from "react";
import { ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

export const useExerciseCategories = (selectedType: string) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ name: "" });

  // بارگذاری دسته‌بندی‌ها از localStorage
  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem("exerciseCategories");
      const cats = savedCategories ? JSON.parse(savedCategories) : [];
      setCategories(cats);
    } catch (error) {
      console.error("Error loading categories from localStorage:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در بارگذاری دسته‌بندی‌ها"
      });
    }
  }, []);

  // ذخیره دسته‌بندی‌ها در localStorage
  useEffect(() => {
    try {
      localStorage.setItem("exerciseCategories", JSON.stringify(categories));
    } catch (error) {
      console.error("Error saving categories to localStorage:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره سازی دسته‌بندی‌ها"
      });
    }
  }, [categories]);

  // دسته‌بندی‌های مرتبط با نوع حرکت انتخاب شده
  const filteredCategories = useCallback(() => {
    return categories.filter(cat => cat.type === selectedType);
  }, [categories, selectedType]);

  // افزودن دسته‌بندی جدید
  const handleSaveCategory = useCallback(() => {
    if (!categoryFormData.name) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام دسته بندی را وارد کنید"
      });
      return;
    }

    // بررسی تکراری بودن نام دسته‌بندی
    const categoryExists = categories.some(
      cat => cat.name.toLowerCase() === categoryFormData.name.toLowerCase() && cat.type === selectedType
    );
    
    if (categoryExists) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "این دسته بندی قبلاً در این نوع حرکت اضافه شده است"
      });
      return;
    }

    const newCategory: ExerciseCategory = {
      id: Math.max(0, ...categories.map(c => c.id)) + 1,
      name: categoryFormData.name,
      type: selectedType
    };

    setCategories(prevCategories => [...prevCategories, newCategory]);
    setIsCategoryDialogOpen(false);
    setCategoryFormData({ name: "" });
    
    toast({
      title: "موفقیت",
      description: "دسته بندی جدید با موفقیت اضافه شد"
    });
  }, [categories, categoryFormData.name, selectedType]);

  // حذف دسته‌بندی
  const handleDeleteCategory = useCallback((category: ExerciseCategory, exercises: any[]) => {
    if (exercises.some(ex => ex.categoryId === category.id)) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "ابتدا باید تمام حرکات این دسته بندی را حذف کنید"
      });
      return;
    }
    setCategories(prevCategories => prevCategories.filter(c => c.id !== category.id));
    toast({
      title: "موفقیت",
      description: "دسته بندی با موفقیت حذف شد"
    });
  }, []);

  return {
    categories,
    setCategories,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    categoryFormData,
    setCategoryFormData,
    filteredCategories,
    handleSaveCategory,
    handleDeleteCategory
  };
};

export default useExerciseCategories;

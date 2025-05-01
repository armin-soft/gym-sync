
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExerciseCategory } from "@/types/exercise";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useExerciseCategories = (selectedType: string | null) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ name: "", type: selectedType || "" });

  // بارگذاری اطلاعات از localStorage با استفاده از React Query
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      try {
        console.log("Loading categories");
        const savedCategories = localStorage.getItem("exerciseCategories");
        if (!savedCategories) {
          console.log("No categories found in localStorage");
          return [];
        }
        const cats = JSON.parse(savedCategories);
        console.log("Loaded categories:", cats);
        return cats;
      } catch (error) {
        console.error("Error loading categories from localStorage:", error);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در بارگذاری دسته‌بندی‌ها"
        });
        return [];
      }
    }
  });

  // به‌روزرسانی فرم با نوع انتخاب شده
  useEffect(() => {
    setCategoryFormData(prev => ({ ...prev, type: selectedType || "" }));
  }, [selectedType]);

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
      let updatedCategories;
      
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

        updatedCategories = categories.map(cat =>
          cat.id === selectedCategory.id ? { ...cat, name: data.name, type: data.type } : cat
        );
        
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
        
        updatedCategories = [...categories, newCategory];
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی جدید با موفقیت اضافه شد"
        });
      }
      
      // ذخیره در localStorage و به‌روزرسانی کش react-query
      localStorage.setItem("exerciseCategories", JSON.stringify(updatedCategories));
      queryClient.setQueryData(["exerciseCategories"], updatedCategories);
      
      setIsCategoryDialogOpen(false);
      setSelectedCategory(null);
      
      console.log("Updated categories:", updatedCategories);
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
  }, [categories, selectedCategory, queryClient, toast]);

  // حذف دسته‌بندی
  const handleDeleteCategory = useCallback((category: ExerciseCategory, exercises: any[] = []) => {
    try {
      const exercisesInCategory = exercises.filter(ex => ex.categoryId === category.id);
      
      if (exercisesInCategory.length > 0) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "ابتدا باید حرکات موجود در این دسته‌بندی را حذف کنید"
        });
        return;
      }
      
      const updatedCategories = categories.filter(cat => cat.id !== category.id);
      
      // ذخیره در localStorage و به‌روزرسانی کش react-query
      localStorage.setItem("exerciseCategories", JSON.stringify(updatedCategories));
      queryClient.setQueryData(["exerciseCategories"], updatedCategories);
      
      toast({
        title: "موفقیت",
        description: "دسته‌بندی با موفقیت حذف شد"
      });
      
      console.log("Updated categories after deletion:", updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف دسته‌بندی"
      });
    }
  }, [categories, queryClient, toast]);

  return {
    categories,
    setCategories: (newCategories: ExerciseCategory[]) => {
      localStorage.setItem("exerciseCategories", JSON.stringify(newCategories));
      queryClient.setQueryData(["exerciseCategories"], newCategories);
    },
    selectedCategory,
    setSelectedCategory,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    categoryFormData,
    setCategoryFormData,
    handleSaveCategory,
    handleDeleteCategory,
    isLoading
  };
};

export default useExerciseCategories;

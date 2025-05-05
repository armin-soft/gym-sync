
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Supplement, SupplementCategory } from "@/types/supplement";
import type { SupplementType } from "./types";

export const useCategoryManagement = (
  supplements: Supplement[],
  setSupplements: React.Dispatch<React.SetStateAction<Supplement[]>>,
  categories: SupplementCategory[],
  setCategories: React.Dispatch<React.SetStateAction<SupplementCategory[]>>,
  activeTab: SupplementType
) => {
  const { toast } = useToast();

  // Category operations
  const handleAddCategory = (name: string) => {
    const newCategory: SupplementCategory = {
      id: Math.max(0, ...categories.map((c) => c.id)) + 1,
      name,
      type: activeTab,
    };
    setCategories([...categories, newCategory]);
    toast({
      title: "افزودن دسته بندی",
      description: "دسته بندی جدید با موفقیت اضافه شد",
    });
    return newCategory;
  };

  const handleUpdateCategory = (categoryId: number, name: string) => {
    const oldCategory = categories.find(c => c.id === categoryId);
    if (!oldCategory) return;
    
    const updatedCategories = categories.map((category) =>
      category.id === categoryId ? { ...category, name } : category
    );
    setCategories(updatedCategories);
    
    const updatedSupplements = supplements.map((supplement) =>
      supplement.category === oldCategory.name
        ? { ...supplement, category: name }
        : supplement
    );
    setSupplements(updatedSupplements);

    toast({
      title: "ویرایش دسته بندی",
      description: "دسته بندی مورد نظر با موفقیت ویرایش شد",
    });
  };

  const handleDeleteCategory = (category: SupplementCategory) => {
    setCategories(categories.filter((c) => c.id !== category.id));
    setSupplements(supplements.filter((s) => s.category !== category.name));
    
    toast({
      title: "حذف دسته بندی",
      description: "دسته بندی مورد نظر با موفقیت حذف شد",
    });
  };

  return {
    addCategory: handleAddCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
  };
};

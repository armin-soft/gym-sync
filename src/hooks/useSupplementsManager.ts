
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Supplement, SupplementCategory } from "@/types/supplement";

export const useSupplementsManager = (initialTab: 'supplement' | 'vitamin' = 'supplement') => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  // Filter supplements by type and selected category
  const filteredSupplements = supplements.filter((s) => {
    const typeMatch = s.type === activeTab;
    if (!selectedCategory) return typeMatch;
    return typeMatch && s.category === selectedCategory;
  });

  // Categories related to the active tab
  const relevantCategories = categories.filter(c => c.type === activeTab);

  // Load data from localStorage
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          const savedSupplements = localStorage.getItem('supplements');
          const savedCategories = localStorage.getItem('supplementCategories');
  
          if (savedSupplements) {
            const parsedSupplements = JSON.parse(savedSupplements);
            setSupplements(parsedSupplements);
          }
  
          if (savedCategories) {
            const parsedCategories = JSON.parse(savedCategories);
            setCategories(parsedCategories);
            
            const relevantCats = parsedCategories.filter((c: SupplementCategory) => c.type === activeTab);
            if (relevantCats.length > 0) {
              setSelectedCategory(relevantCats[0].name);
            } else {
              setSelectedCategory("");
            }
          }
          setIsLoading(false);
        }, 700); // Simulate loading delay
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری اطلاعات",
          description: "مشکلی در بارگذاری اطلاعات پیش آمده است"
        });
        setIsLoading(false);
      }
    };

    loadData();
  }, [activeTab, toast]);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('supplements', JSON.stringify(supplements));
      localStorage.setItem('supplementCategories', JSON.stringify(categories));
    }
  }, [supplements, categories, isLoading]);

  // Category operations
  const handleAddCategory = (name: string) => {
    const existingCategory = categories.find(cat => 
      cat.name.toLowerCase() === name.toLowerCase() && cat.type === activeTab
    );
    
    if (existingCategory) {
      toast({
        variant: "destructive",
        title: "خطا در افزودن دسته‌بندی",
        description: "دسته‌بندی با این نام قبلاً وجود دارد"
      });
      return null;
    }
    
    const newCategory: SupplementCategory = {
      id: Math.max(0, ...categories.map((c) => c.id)) + 1,
      name,
      type: activeTab,
    };
    setCategories([...categories, newCategory]);
    setSelectedCategory(name);
    toast({
      title: "افزودن دسته بندی",
      description: "دسته بندی جدید با موفقیت اضافه شد",
    });
    return newCategory;
  };

  const handleUpdateCategory = (categoryId: number, name: string) => {
    const oldCategory = categories.find(c => c.id === categoryId);
    if (!oldCategory) return;
    
    // Check for duplicate name
    const existingCategory = categories.find(cat => 
      cat.name.toLowerCase() === name.toLowerCase() && 
      cat.type === activeTab &&
      cat.id !== categoryId
    );
    
    if (existingCategory) {
      toast({
        variant: "destructive",
        title: "خطا در ویرایش دسته‌بندی",
        description: "دسته‌بندی با این نام قبلاً وجود دارد"
      });
      return;
    }
    
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
    
    // If the selected category was updated, select the new name
    if (selectedCategory === oldCategory.name) {
      setSelectedCategory(name);
    }

    toast({
      title: "ویرایش دسته بندی",
      description: "دسته بندی مورد نظر با موفقیت ویرایش شد",
    });
  };

  const handleDeleteCategory = (category: SupplementCategory) => {
    const hasSupplements = supplements.some(s => 
      s.category === category.name && s.type === category.type
    );
    
    if (hasSupplements) {
      toast({
        variant: "destructive",
        title: "خطا در حذف دسته‌بندی",
        description: "این دسته‌بندی دارای مکمل یا ویتامین است و نمی‌توان آن را حذف کرد"
      });
      return;
    }
    
    setCategories(categories.filter((c) => c.id !== category.id));
    
    // If the selected category was deleted, clear the selection or select another category
    if (selectedCategory === category.name) {
      const remainingCategories = categories.filter(
        c => c.type === activeTab && c.id !== category.id
      );
      
      setSelectedCategory(remainingCategories.length > 0 ? remainingCategories[0].name : "");
    }
    
    toast({
      title: "حذف دسته بندی",
      description: "دسته بندی مورد نظر با موفقیت حذف شد",
    });
  };

  // Supplement operations
  const handleAddSupplement = (data: Omit<Supplement, "id" | "type">) => {
    const newSupplement: Supplement = {
      ...data,
      id: Math.max(0, ...supplements.map((s) => s.id)) + 1,
      type: activeTab,
    };
    setSupplements([...supplements, newSupplement]);
    toast({
      title: `افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
      description: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید با موفقیت اضافه شد`,
    });
    return newSupplement;
  };

  const handleUpdateSupplement = (supplementId: number, data: Omit<Supplement, "id" | "type">) => {
    setSupplements(
      supplements.map((supplement) =>
        supplement.id === supplementId
          ? { ...data, id: supplement.id, type: supplement.type }
          : supplement
      )
    );
    toast({
      title: `ویرایش ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
      description: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} مورد نظر با موفقیت ویرایش شد`,
    });
  };

  const handleDeleteSupplement = (id: number) => {
    const supplementToDelete = supplements.find(s => s.id === id);
    if (!supplementToDelete) return;
    
    setSupplements(supplements.filter((s) => s.id !== id));
    toast({
      title: `حذف ${supplementToDelete.type === 'supplement' ? 'مکمل' : 'ویتامین'}`,
      description: `${supplementToDelete.type === 'supplement' ? 'مکمل' : 'ویتامین'} مورد نظر با موفقیت حذف شد`,
    });
  };

  const changeTab = (tab: 'supplement' | 'vitamin') => {
    setActiveTab(tab);
    setSelectedCategory("");
  };

  return {
    // State
    supplements,
    categories,
    filteredSupplements,
    relevantCategories,
    activeTab,
    selectedCategory,
    isLoading,
    
    // Tab actions
    setActiveTab: changeTab,
    setSelectedCategory,
    
    // Category actions
    addCategory: handleAddCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    
    // Supplement actions
    addSupplement: handleAddSupplement,
    updateSupplement: handleUpdateSupplement,
    deleteSupplement: handleDeleteSupplement
  };
};

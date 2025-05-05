
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

  // استخراج دسته‌بندی‌های منحصر به فرد از مکمل‌ها
  const extractCategoriesFromSupplements = (supplements: Supplement[]): SupplementCategory[] => {
    const uniqueCategories = new Map<string, {name: string, type: 'supplement' | 'vitamin'}>();
    
    supplements.forEach(supplement => {
      const key = `${supplement.category}-${supplement.type}`;
      if (!uniqueCategories.has(key)) {
        uniqueCategories.set(key, {
          name: supplement.category,
          type: supplement.type
        });
      }
    });
    
    return Array.from(uniqueCategories.values()).map((cat, index) => ({
      id: index + 1,
      name: cat.name,
      type: cat.type
    }));
  };

  // Load data from localStorage
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        console.log("Loading supplements and categories from localStorage");
        const savedSupplements = localStorage.getItem('supplements');
        const savedCategories = localStorage.getItem('supplementCategories');

        console.log("Raw supplements from storage:", savedSupplements);
        console.log("Raw categories from storage:", savedCategories);

        let loadedSupplements: Supplement[] = [];
        if (savedSupplements) {
          loadedSupplements = JSON.parse(savedSupplements);
          console.log("Parsed supplements:", loadedSupplements);
          setSupplements(loadedSupplements);
        } else {
          console.log("No supplements found in localStorage");
          setSupplements([]);
        }

        if (savedCategories) {
          const parsedCategories = JSON.parse(savedCategories);
          console.log("Parsed categories:", parsedCategories);
          if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
            setCategories(parsedCategories);
            
            const relevantCats = parsedCategories.filter((c: SupplementCategory) => c.type === activeTab);
            if (relevantCats.length > 0) {
              setSelectedCategory(relevantCats[0].name);
            }
          } else {
            // اگر دسته‌بندی‌ها وجود نداشتند، از مکمل‌ها استخراج می‌کنیم
            const extractedCategories = extractCategoriesFromSupplements(loadedSupplements);
            console.log("Extracted categories from supplements:", extractedCategories);
            setCategories(extractedCategories);
            
            const relevantCats = extractedCategories.filter(c => c.type === activeTab);
            if (relevantCats.length > 0) {
              setSelectedCategory(relevantCats[0].name);
            }
          }
        } else {
          console.log("No categories found in localStorage, extracting from supplements");
          const extractedCategories = extractCategoriesFromSupplements(loadedSupplements);
          console.log("Extracted categories from supplements:", extractedCategories);
          setCategories(extractedCategories);
          
          const relevantCats = extractedCategories.filter(c => c.type === activeTab);
          if (relevantCats.length > 0) {
            setSelectedCategory(relevantCats[0].name);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          variant: "destructive",
          title: "خطا در بارگذاری اطلاعات",
          description: "مشکلی در بارگذاری اطلاعات پیش آمده است"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [activeTab, toast]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('supplements', JSON.stringify(supplements));
    localStorage.setItem('supplementCategories', JSON.stringify(categories));
  }, [supplements, categories]);

  // Category operations
  const handleAddCategory = (name: string) => {
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
    setSupplements(supplements.filter((s) => s.id !== id));
    toast({
      title: `حذف ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
      description: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} مورد نظر با موفقیت حذف شد`,
    });
  };

  const changeTab = (tab: 'supplement' | 'vitamin') => {
    setActiveTab(tab);
    
    // در تغییر تب، دسته‌بندی مناسب را انتخاب می‌کنیم
    const relevantCats = categories.filter(c => c.type === tab);
    if (relevantCats.length > 0) {
      setSelectedCategory(relevantCats[0].name);
    } else {
      setSelectedCategory("");
    }
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

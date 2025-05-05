
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Supplement, SupplementCategory } from "@/types/supplement";
import type { SupplementType } from "./types";

export const useLocalStorage = (initialTab: SupplementType = 'supplement') => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<SupplementType>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // استخراج دسته‌بندی‌های منحصر به فرد از مکمل‌ها
  const extractCategoriesFromSupplements = (supplements: Supplement[]): SupplementCategory[] => {
    const uniqueCategories = new Map<string, {name: string, type: SupplementType}>();
    
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
    if (!isLoading) {
      localStorage.setItem('supplements', JSON.stringify(supplements));
      localStorage.setItem('supplementCategories', JSON.stringify(categories));
    }
  }, [supplements, categories, isLoading]);

  const changeTab = (tab: SupplementType) => {
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
    supplements,
    setSupplements,
    categories,
    setCategories,
    activeTab,
    selectedCategory,
    isLoading,
    setActiveTab: changeTab,
    setSelectedCategory,
  };
};

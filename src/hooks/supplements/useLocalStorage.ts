
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Supplement, SupplementCategory } from "@/types/supplement";
import type { SupplementType } from "./types";
import { safeJSONParse, safeJSONSave } from "@/utils/database";

export const useLocalStorage = (initialTab: SupplementType = 'supplement') => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<SupplementType>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Extract unique categories from supplements
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
        
        // Load supplements from localStorage
        const loadedSupplements = safeJSONParse<Supplement[]>('supplements', []);
        console.log("Parsed supplements:", loadedSupplements);
        setSupplements(loadedSupplements);
        
        // Load categories from localStorage or extract from supplements
        const loadedCategories = safeJSONParse<SupplementCategory[]>('supplementCategories', []);
        
        if (Array.isArray(loadedCategories) && loadedCategories.length > 0) {
          console.log("Parsed categories:", loadedCategories);
          setCategories(loadedCategories);
        } else if (loadedSupplements.length > 0) {
          // Extract categories from supplements if categories don't exist
          const extractedCategories = extractCategoriesFromSupplements(loadedSupplements);
          console.log("Extracted categories from supplements:", extractedCategories);
          setCategories(extractedCategories);
          safeJSONSave('supplementCategories', extractedCategories);
        }
        
        // Set selected category based on active tab
        const relevantCats = (loadedCategories.length > 0 ? loadedCategories : extractCategoriesFromSupplements(loadedSupplements))
          .filter(c => c.type === activeTab);
          
        if (relevantCats.length > 0) {
          setSelectedCategory(relevantCats[0].name);
        } else {
          setSelectedCategory("");
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
      safeJSONSave('supplements', supplements);
      safeJSONSave('supplementCategories', categories);
    }
  }, [supplements, categories, isLoading]);

  const changeTab = (tab: SupplementType) => {
    setActiveTab(tab);
    
    // Select appropriate category when changing tabs
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


import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

export interface Supplement {
  id: number;
  name: string;
  type: 'supplement' | 'vitamin';
  category: string;
  dosage?: string;
  timing?: string;
  description?: string;
  benefits?: string[];
  sideEffects?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  type: 'supplement' | 'vitamin';
  description?: string;
  createdAt: string;
}

export const useSupplementManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedSupplements = localStorage.getItem('supplements');
      const savedCategories = localStorage.getItem('supplementCategories');
      
      if (savedSupplements) {
        setSupplements(JSON.parse(savedSupplements));
      } else {
        // Initialize with real Iranian supplements and vitamins
        const initialSupplements: Supplement[] = [
          {
            id: 1,
            name: "پروتئین وی",
            type: "supplement",
            category: "پروتئین",
            dosage: "۳۰ گرم",
            timing: "بعد از تمرین",
            description: "پروتئین با کیفیت بالا برای رشد عضلات",
            benefits: ["رشد عضلات", "بهبود بازیابی", "افزایش قدرت"],
            sideEffects: ["ممکن است باعث ناراحتی معده شود"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 2,
            name: "کراتین مونوهیدرات",
            type: "supplement",
            category: "عملکردی",
            dosage: "۵ گرم",
            timing: "قبل یا بعد از تمرین",
            description: "برای افزایش قدرت و عملکرد ورزشی",
            benefits: ["افزایش قدرت", "بهبود عملکرد", "افزایش حجم عضلات"],
            sideEffects: ["نیاز به مصرف آب بیشتر"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        setSupplements(initialSupplements);
        localStorage.setItem('supplements', JSON.stringify(initialSupplements));
      }
      
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      } else {
        // Initialize with real categories
        const initialCategories: Category[] = [
          {
            id: 1,
            name: "پروتئین",
            type: "supplement",
            description: "مکمل‌های پروتئینی برای رشد عضلات",
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            name: "عملکردی",
            type: "supplement",
            description: "مکمل‌های بهبود عملکرد ورزشی",
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            name: "ویتامین‌های محلول در آب",
            type: "vitamin",
            description: "ویتامین‌های B و C",
            createdAt: new Date().toISOString()
          }
        ];
        setCategories(initialCategories);
        localStorage.setItem('supplementCategories', JSON.stringify(initialCategories));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "خطا در بارگذاری داده‌ها",
        description: "مشکلی در بارگذاری اطلاعات پیش آمد",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Filter supplements by active tab
  const filteredSupplements = useMemo(() => {
    let filtered = supplements.filter(s => s.type === activeTab);
    if (selectedCategory) {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }
    return filtered;
  }, [supplements, activeTab, selectedCategory]);

  // Filter categories by active tab
  const filteredCategories = useMemo(() => {
    return categories.filter(c => c.type === activeTab);
  }, [categories, activeTab]);

  const addSupplement = (supplementData: Omit<Supplement, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSupplement: Supplement = {
      ...supplementData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedSupplements = [...supplements, newSupplement];
    setSupplements(updatedSupplements);
    localStorage.setItem('supplements', JSON.stringify(updatedSupplements));
    
    toast({
      title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید افزوده شد`,
      description: `${newSupplement.name} با موفقیت اضافه شد`
    });
  };

  const updateSupplement = (id: number, supplementData: Partial<Supplement>) => {
    const updatedSupplements = supplements.map(s => 
      s.id === id ? { ...s, ...supplementData, updatedAt: new Date().toISOString() } : s
    );
    setSupplements(updatedSupplements);
    localStorage.setItem('supplements', JSON.stringify(updatedSupplements));
    
    toast({
      title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} ویرایش شد`,
      description: "تغییرات با موفقیت ذخیره شد"
    });
  };

  const deleteSupplement = (id: number) => {
    const supplementToDelete = supplements.find(s => s.id === id);
    const updatedSupplements = supplements.filter(s => s.id !== id);
    setSupplements(updatedSupplements);
    localStorage.setItem('supplements', JSON.stringify(updatedSupplements));
    
    toast({
      title: `${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} حذف شد`,
      description: `${supplementToDelete?.name} با موفقیت حذف شد`
    });
  };

  const addCategory = (categoryData: Omit<Category, 'id' | 'createdAt'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('supplementCategories', JSON.stringify(updatedCategories));
    
    toast({
      title: "دسته‌بندی جدید افزوده شد",
      description: `${newCategory.name} با موفقیت اضافه شد`
    });
  };

  const updateCategory = (id: number, categoryData: Partial<Category>) => {
    const updatedCategories = categories.map(c => 
      c.id === id ? { ...c, ...categoryData } : c
    );
    setCategories(updatedCategories);
    localStorage.setItem('supplementCategories', JSON.stringify(updatedCategories));
    
    toast({
      title: "دسته‌بندی ویرایش شد",
      description: "تغییرات با موفقیت ذخیره شد"
    });
  };

  const deleteCategory = (id: number) => {
    const categoryToDelete = categories.find(c => c.id === id);
    const updatedCategories = categories.filter(c => c.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem('supplementCategories', JSON.stringify(updatedCategories));
    
    // Clear selected category if it was deleted
    if (selectedCategory === categoryToDelete?.name) {
      setSelectedCategory(null);
    }
    
    toast({
      title: "دسته‌بندی حذف شد",
      description: `${categoryToDelete?.name} با موفقیت حذف شد`
    });
  };

  return {
    activeTab,
    setActiveTab,
    supplements: filteredSupplements,
    allSupplements: supplements,
    categories: filteredCategories,
    allCategories: categories,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    addSupplement,
    updateSupplement,
    deleteSupplement,
    addCategory,
    updateCategory,
    deleteCategory
  };
};

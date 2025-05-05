
import React, { useMemo } from "react";
import { Tabs } from "@/components/ui/tabs";
import { TabHeader } from "./TabHeader";
import { TabContent } from "./TabContent";
import type { Supplement, SupplementCategory } from "@/types/supplement";

interface SupplementTabsProps {
  activeTab: 'supplement' | 'vitamin';
  onTabChange: (value: string) => void;
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const SupplementTabs: React.FC<SupplementTabsProps> = ({
  activeTab,
  onTabChange,
  isLoading,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  setSelectedCategory,
}) => {
  console.log("SupplementTabs received supplements:", supplements);
  console.log("SupplementTabs categories:", categories);
  
  // فیلتر مکمل‌ها براساس تب فعال و دسته‌بندی انتخاب شده
  const filteredSupplements = useMemo(() => {
    let filtered = supplements;
    
    // فیلتر براساس نوع (مکمل یا ویتامین)
    filtered = filtered.filter(item => item.type === activeTab);
    
    // فیلتر براساس دسته‌بندی انتخاب شده
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    console.log(`Filtered ${activeTab}s:`, filtered);
    return filtered;
  }, [supplements, activeTab, selectedCategory]);

  return (
    <Tabs 
      defaultValue="supplement" 
      value={activeTab}
      onValueChange={onTabChange} 
      className="flex-1 flex flex-col"
    >
      <TabHeader activeTab={activeTab} />
      
      <TabContent 
        isLoading={isLoading}
        categories={categories}
        onAddCategory={onAddCategory}
        onEditCategory={onEditCategory}
        onDeleteCategory={onDeleteCategory}
        supplements={filteredSupplements}
        onAddSupplement={onAddSupplement}
        onEditSupplement={onEditSupplement}
        onDeleteSupplement={onDeleteSupplement}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </Tabs>
  );
};

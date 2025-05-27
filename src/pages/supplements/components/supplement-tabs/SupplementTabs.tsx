
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { SupplementCategory } from "@/types/supplement";
import { TabsHeader } from "./TabsHeader";
import { TabContent } from "./TabContent";

interface SupplementTabsProps {
  activeTab: 'supplement' | 'vitamin';
  onTabChange: (value: string) => void;
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: any[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: any) => void;
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
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary m-auto"></div>
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col overflow-hidden rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 bg-white/50 dark:bg-gray-950/50 shadow-lg backdrop-blur-sm">
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange} 
        className="flex flex-col h-full w-full"
      >
        {/* Header */}
        <TabsHeader activeTab={activeTab} />
        
        {/* Content for each tab */}
        <div className="flex-1 overflow-hidden">
          <TabContent
            activeTab={activeTab}
            categories={categories.filter(c => c.type === activeTab)}
            onAddCategory={onAddCategory}
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            supplements={supplements.filter(s => s.type === activeTab)}
            onAddSupplement={onAddSupplement}
            onEditSupplement={onEditSupplement}
            onDeleteSupplement={onDeleteSupplement}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </Tabs>
    </div>
  );
};

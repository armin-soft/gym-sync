
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1 h-full w-full overflow-hidden"
    >
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange} 
        className="flex flex-col flex-1 h-full w-full"
      >
        {/* Header */}
        <TabsHeader activeTab={activeTab} />
        
        {/* Content for each tab */}
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
      </Tabs>
    </motion.div>
  );
};

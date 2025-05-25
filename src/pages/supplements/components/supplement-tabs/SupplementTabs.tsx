
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { SupplementCategory } from "@/types/supplement";
import { TabsHeader } from "./TabsHeader";
import { TabContent } from "./TabContent";
import { Card } from "@/components/ui/card";

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
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden h-full">
        <div className="flex items-center justify-center h-full">
          <div className="space-y-4 text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 border-b-blue-600 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">در حال بارگذاری...</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">لطفاً صبر کنید</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col flex-1 h-full w-full overflow-hidden"
    >
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden h-full flex flex-col">
        <Tabs 
          value={activeTab} 
          onValueChange={onTabChange} 
          className="flex flex-col flex-1 h-full w-full p-4 sm:p-6"
          dir="rtl"
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
      </Card>
    </motion.div>
  );
};

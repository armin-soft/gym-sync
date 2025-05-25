
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TabsContent } from "@/components/ui/tabs";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { CategoryTable } from "@/components/supplements/CategoryTable";
import { SupplementContent } from "../supplement-content";

interface TabContentProps {
  activeTab: 'supplement' | 'vitamin';
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <TabsContent value={activeTab} className="m-0 flex-1 flex flex-col space-y-4 sm:space-y-6 overflow-hidden">
      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="z-10"
      >
        <Card className="bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden">
          <CategoryTable 
            categories={categories}
            onAdd={onAddCategory}
            onEdit={onEditCategory}
            onDelete={onDeleteCategory}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </Card>
      </motion.div>
      
      {/* Supplements Content Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 overflow-hidden"
      >
        <Card className={cn(
          "h-full shadow-xl border-0 backdrop-blur-sm rounded-xl overflow-hidden",
          activeTab === "supplement" 
            ? "bg-gradient-to-br from-purple-50/80 via-white/80 to-violet-50/80 dark:from-purple-950/40 dark:via-slate-800/80 dark:to-violet-950/40" 
            : "bg-gradient-to-br from-blue-50/80 via-white/80 to-indigo-50/80 dark:from-blue-950/40 dark:via-slate-800/80 dark:to-indigo-950/40"
        )}>
          {/* Header gradient */}
          <div className={cn(
            "h-1 bg-gradient-to-r",
            activeTab === "supplement" 
              ? "from-purple-400 via-purple-500 to-violet-500" 
              : "from-blue-400 via-blue-500 to-indigo-500"
          )}></div>
          
          <div className="p-4 sm:p-6 h-full">
            <SupplementContent 
              supplements={supplements}
              onAddSupplement={onAddSupplement}
              onEditSupplement={onEditSupplement}
              onDeleteSupplement={onDeleteSupplement}
              activeTab={activeTab}
            />
          </div>
        </Card>
      </motion.div>
    </TabsContent>
  );
};

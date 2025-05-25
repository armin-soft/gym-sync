
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
    <TabsContent value={activeTab} className="m-0 flex-1 flex flex-col space-y-6 overflow-hidden">
      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10"
      >
        <CategoryTable 
          categories={categories}
          onAdd={onAddCategory}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </motion.div>
      
      {/* Supplements Content Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 overflow-hidden"
      >
        <Card className={cn(
          "h-full shadow-2xl border border-slate-200/30 dark:border-slate-700/30 backdrop-blur-xl rounded-3xl overflow-hidden",
          "bg-white/90 dark:bg-slate-800/90"
        )}>
          {/* Decorative Header */}
          <div className={cn(
            "h-2 bg-gradient-to-r",
            activeTab === "supplement" 
              ? "from-emerald-400 via-emerald-500 to-blue-500" 
              : "from-blue-400 via-blue-500 to-purple-500"
          )}></div>
          
          <div className="p-6 md:p-8 h-full">
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

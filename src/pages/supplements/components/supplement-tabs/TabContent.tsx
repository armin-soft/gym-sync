
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
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
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 overflow-hidden"
      >
        <Card className={cn(
          "h-full shadow-md border-muted/30",
          activeTab === "supplement" 
            ? "bg-gradient-to-br from-purple-50/50 to-violet-100/50 dark:from-purple-950/20 dark:to-violet-900/20" 
            : "bg-gradient-to-br from-blue-50/50 to-indigo-100/50 dark:from-blue-950/20 dark:to-indigo-900/20"
        )}>
          <div className="p-4 h-full">
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

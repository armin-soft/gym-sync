
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { SupplementCategory } from "@/types/supplement";
import { SupplementStage } from "./SupplementStage";

interface TabContentProps {
  activeTab: 'supplement' | 'vitamin';
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: any[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: any) => void;
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
    <>
      <TabsContent value="supplement" className="mt-0 flex-1 h-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <SupplementStage
            type="supplement"
            categories={categories}
            onAddCategory={onAddCategory}
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            supplements={supplements}
            onAddSupplement={onAddSupplement}
            onEditSupplement={onEditSupplement}
            onDeleteSupplement={onDeleteSupplement}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="vitamin" className="mt-0 flex-1 h-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <SupplementStage
            type="vitamin"
            categories={categories}
            onAddCategory={onAddCategory}
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            supplements={supplements}
            onAddSupplement={onAddSupplement}
            onEditSupplement={onEditSupplement}
            onDeleteSupplement={onDeleteSupplement}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </motion.div>
      </TabsContent>
    </>
  );
};

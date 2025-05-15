
import { motion, AnimatePresence } from "framer-motion";
import { LoadingState } from "./LoadingState";
import { SupplementTabContent } from "./SupplementTabContent";
import type { Supplement, SupplementCategory } from "@/types/supplement";

interface TabContentProps {
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

export const TabContent: React.FC<TabContentProps> = ({
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
  return (
    <div className="flex-1 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <LoadingState />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="h-full flex flex-col"
          >
            <SupplementTabContent
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
              onSelectCategory={setSelectedCategory}
            />
            
            <SupplementTabContent
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
              onSelectCategory={setSelectedCategory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

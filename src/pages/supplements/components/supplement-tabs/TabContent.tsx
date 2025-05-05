
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
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
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingState />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4 sm:space-y-6 flex-1 flex flex-col"
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
  );
};

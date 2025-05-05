
import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { CategoryTable } from "@/components/supplements/CategoryTable";
import { SupplementContent } from "../SupplementContent";
import type { Supplement, SupplementCategory } from "@/types/supplement";

interface SupplementTabContentProps {
  type: 'supplement' | 'vitamin';
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

export const SupplementTabContent: React.FC<SupplementTabContentProps> = ({
  type,
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
    <TabsContent value={type} className="space-y-4 sm:space-y-6 m-0 flex-1 flex flex-col">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <CategoryTable 
          categories={categories.filter(c => c.type === type)}
          onAdd={onAddCategory}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1"
      >
        <SupplementContent 
          type={type}
          supplements={supplements}
          onAdd={onAddSupplement}
          onEdit={onEditSupplement}
          onDelete={onDeleteSupplement}
        />
      </motion.div>
    </TabsContent>
  );
};

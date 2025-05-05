
import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { CategoryTable } from "@/components/supplements/CategoryTable";
import { SupplementContent } from "../SupplementContent";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useState } from "react";
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
  const deviceInfo = useDeviceInfo();
  const [searchQuery, setSearchQuery] = useState('');

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  
  const getTabContentClass = () => {
    return cn(
      "space-y-4 sm:space-y-6 m-0 flex-1 flex flex-col",
      "rounded-xl overflow-hidden"
    );
  };

  // Filter categories for this tab
  const tabCategories = categories.filter(c => c.type === type);
  
  return (
    <TabsContent value={type} className={getTabContentClass()}>
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col h-full space-y-4 sm:space-y-6"
      >
        <motion.div 
          variants={itemVariants}
          className={cn(
            "flex-1 relative overflow-hidden transition-all rounded-3xl",
            deviceInfo.isMobile ? "-mt-2" : "-mt-3"
          )}
        >
          <div className={cn(
            "absolute inset-0",
            type === "supplement" 
              ? "bg-gradient-to-br from-violet-50/30 to-indigo-100/30 dark:from-violet-950/10 dark:to-indigo-900/10" 
              : "bg-gradient-to-br from-blue-50/30 to-indigo-100/30 dark:from-blue-950/10 dark:to-indigo-900/10"
          )} />
          
          <motion.div 
            className="relative h-full z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <SupplementContent 
              type={type}
              supplements={supplements}
              onAdd={onAddSupplement}
              onEdit={onEditSupplement}
              onDelete={onDeleteSupplement}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

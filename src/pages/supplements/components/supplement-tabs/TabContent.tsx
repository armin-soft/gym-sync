
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SupplementCategory } from "@/types/supplement";
import { CategorySection } from "./CategorySection";
import { SupplementContent } from "../supplement-content";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="flex-1 overflow-hidden" dir="rtl">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className="h-full"
        >
          <TabsContent value={activeTab} className="mt-0 h-full flex flex-col">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 h-full">
              {/* Categories Section */}
              <motion.div variants={itemVariants} className="xl:col-span-1">
                <Card className="h-full bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 backdrop-blur-sm border-2 border-white/60 shadow-2xl rounded-3xl overflow-hidden">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-indigo-500/5" />
                    <div className="relative p-4 sm:p-6 h-full">
                      <CategorySection
                        activeTab={activeTab}
                        categories={categories}
                        onAddCategory={onAddCategory}
                        onEditCategory={onEditCategory}
                        onDeleteCategory={onDeleteCategory}
                        selectedCategory={selectedCategory}
                        onSelectCategory={onSelectCategory}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Supplements Section */}
              <motion.div variants={itemVariants} className="xl:col-span-2">
                <Card className="h-full bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 backdrop-blur-sm border-2 border-white/60 shadow-2xl rounded-3xl overflow-hidden">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5" />
                    <div className="relative p-4 sm:p-6 h-full">
                      <SupplementContent
                        supplements={supplements}
                        onAddSupplement={onAddSupplement}
                        onEditSupplement={onEditSupplement}
                        onDeleteSupplement={onDeleteSupplement}
                        activeTab={activeTab}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

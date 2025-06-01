
import React from "react";
import { motion } from "framer-motion";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { ModernCategoryManagement } from "./ModernCategoryManagement";
import { ModernSupplementGrid } from "./ModernSupplementGrid";
import { EmptyStateCard } from "./EmptyStateCard";
import { Card } from "@/components/ui/card";

interface SupplementsTabContentProps {
  type: "supplement" | "vitamin";
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (id: number) => void;
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const SupplementsTabContent: React.FC<SupplementsTabContentProps> = ({
  type,
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
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter supplements by type and search
  const filteredSupplements = supplements.filter(supplement => {
    const matchesType = supplement.type === type;
    const matchesSearch = !searchQuery || 
      supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplement.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || supplement.category === selectedCategory;
    
    return matchesType && matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20" dir="rtl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Categories Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="p-6">
            <ModernCategoryManagement
              categories={categories}
              onAddCategory={onAddCategory}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              type={type}
            />
          </div>
        </Card>
      </motion.div>

      {/* Supplements Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="p-6">
            {categories.length === 0 ? (
              <EmptyStateCard
                type="category"
                supplementType={type}
                onAction={onAddCategory}
              />
            ) : (
              <ModernSupplementGrid
                supplements={filteredSupplements}
                onEditSupplement={onEditSupplement}
                onDeleteSupplement={onDeleteSupplement}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddSupplement={onAddSupplement}
                activeTab={type}
              />
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

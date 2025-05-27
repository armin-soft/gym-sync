
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SupplementCategory } from "@/types/supplement";
import { SupplementCard } from "./SupplementCard";
import { CategoryCard } from "./CategoryCard";
import { Button } from "@/components/ui/button";
import { Plus, Pill, ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

interface SupplementStageProps {
  type: 'supplement' | 'vitamin';
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

export const SupplementStage: React.FC<SupplementStageProps> = ({
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const typeLabel = type === 'supplement' ? 'مکمل' : 'ویتامین';
  const TypeIcon = type === 'supplement' ? Pill : ShieldCheck;

  // Filter supplements by selected category
  const filteredSupplements = selectedCategory 
    ? supplements.filter(s => s.categoryId.toString() === selectedCategory)
    : supplements;

  if (categories.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <EmptyState
          icon={type === 'supplement' ? "Pill" : "ShieldCheck"}
          title={`هیچ دسته‌بندی برای ${typeLabel}ها وجود ندارد`}
          description={`برای شروع، ابتدا یک دسته‌بندی برای ${typeLabel}ها ایجاد کنید`}
          action={{
            label: `افزودن دسته‌بندی`,
            onClick: onAddCategory
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header with actions */}
      <div className="p-3 sm:p-4 md:p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-950/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
              <TypeIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{typeLabel}ها</h2>
              <p className="text-sm text-muted-foreground">
                مدیریت {typeLabel}های ورزشی
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={onAddCategory}
              variant="outline"
              size="sm"
              className="bg-white/80 dark:bg-gray-900/80 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            >
              <Plus className="h-4 w-4 mr-2" />
              دسته‌بندی جدید
            </Button>
            
            <Button
              onClick={onAddSupplement}
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              {typeLabel} جدید
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="p-3 sm:p-4 md:p-6 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">دسته‌بندی‌ها</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CategoryCard
              category={{ id: 'all', name: `همه ${typeLabel}ها`, type }}
              isSelected={!selectedCategory}
              onClick={() => onSelectCategory('')}
              count={supplements.length}
            />
          </motion.div>
          
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CategoryCard
                category={category}
                isSelected={selectedCategory === category.id.toString()}
                onClick={() => onSelectCategory(category.id.toString())}
                onEdit={() => onEditCategory(category)}
                onDelete={() => onDeleteCategory(category)}
                count={supplements.filter(s => s.categoryId === category.id).length}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Supplements List */}
      <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
        {filteredSupplements.length === 0 ? (
          <EmptyState
            icon={type === 'supplement' ? "Pill" : "ShieldCheck"}
            title={`هیچ ${typeLabel}ی در این دسته‌بندی وجود ندارد`}
            description={`${typeLabel} جدیدی به این دسته‌بندی اضافه کنید`}
            action={{
              label: `افزودن ${typeLabel}`,
              onClick: onAddSupplement
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSupplements.map((supplement) => (
              <motion.div
                key={supplement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SupplementCard
                  supplement={supplement}
                  onEdit={() => onEditSupplement(supplement)}
                  onDelete={() => onDeleteSupplement(supplement.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

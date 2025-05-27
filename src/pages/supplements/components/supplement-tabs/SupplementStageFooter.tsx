
import React from "react";

interface SupplementStageFooterProps {
  filteredSupplements: any[];
  supplements: any[];
  selectedCategory: string;
  categories: any[];
}

export const SupplementStageFooter: React.FC<SupplementStageFooterProps> = ({
  filteredSupplements,
  supplements,
  selectedCategory,
  categories,
}) => {
  if (filteredSupplements.length === 0) return null;

  return (
    <div className="border-t border-indigo-100/50 dark:border-indigo-900/30 bg-white/50 dark:bg-gray-950/50 px-4 py-2">
      <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
        <span>
          {filteredSupplements.length} از {supplements.length} مورد نمایش داده شده
        </span>
        <span>
          {selectedCategory !== 'all' && 
            `دسته: ${categories.find(c => c && c.id !== undefined && c.id.toString() === selectedCategory)?.name || ''}`
          }
        </span>
      </div>
    </div>
  );
};

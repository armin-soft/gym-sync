
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Supplement } from "@/types/supplement";
import SupplementCard from "./SupplementCard";
import EmptyState from "./EmptyState";

interface SupplementGridProps {
  filteredItems: Supplement[];
  selectedItems: number[];
  toggleItem: (id: number) => void;
  searchQuery: string;
  selectedCategory: string | null;
  clearFilters: () => void;
}

export const SupplementGrid: React.FC<SupplementGridProps> = ({
  filteredItems,
  selectedItems,
  toggleItem,
  searchQuery,
  selectedCategory,
  clearFilters
}) => {
  // Check if an item is selected
  const isSelected = (id: number) => {
    return selectedItems.includes(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <AnimatePresence>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <SupplementCard
              key={item.id}
              item={item}
              isSelected={isSelected(item.id)}
              onSelect={() => toggleItem(item.id)}
            />
          ))
        ) : (
          <EmptyState 
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            clearFilters={clearFilters}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupplementGrid;

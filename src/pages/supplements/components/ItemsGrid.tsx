
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Supplement } from "@/types/supplement";
import { ItemsHeader } from "./ItemsGrid/ItemsHeader";
import { ItemsSearch } from "./ItemsGrid/ItemsSearch";
import { ItemCard } from "./ItemsGrid/ItemCard";
import { EmptyItemsState } from "./ItemsGrid/EmptyItemsState";

interface ItemsGridProps {
  items: Supplement[];
  onEdit: (item: Supplement) => void;
  onDelete: (id: number) => void;
  activeTab: "supplement" | "vitamin";
  selectedCategory: string | null;
}

export const ItemsGrid: React.FC<ItemsGridProps> = ({
  items,
  onEdit,
  onDelete,
  activeTab,
  selectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems = items.filter(item => {
    const matchesType = item.type === activeTab;
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      dir="rtl"
    >
      <ItemsHeader
        activeTab={activeTab}
        filteredItemsCount={filteredItems.length}
        selectedCategory={selectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <ItemsSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
      />

      {filteredItems.length === 0 ? (
        <EmptyItemsState
          activeTab={activeTab}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      ) : (
        <motion.div
          layout
          className={`gap-4 sm:gap-6 ${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col"
          }`}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                activeTab={activeTab}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

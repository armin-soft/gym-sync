
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence } from "framer-motion";
import { SupplementEmptyState } from "./SupplementEmptyState";
import { SupplementListView } from "./SupplementListView";
import { SupplementGridView } from "./SupplementGridView";
import type { Supplement } from "@/types/supplement";

interface SupplementContentProps {
  filteredItems: Supplement[];
  activeTab: "supplements" | "vitamins";
  isSelected: (id: number) => boolean;
  toggleItem: (id: number) => void;
  viewMode: "grid" | "list";
}

export const SupplementContent: React.FC<SupplementContentProps> = ({
  filteredItems,
  activeTab,
  isSelected,
  toggleItem,
  viewMode
}) => {
  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full w-full">
        {filteredItems.length === 0 ? (
          <SupplementEmptyState activeTab={activeTab} />
        ) : viewMode === "grid" ? (
          <SupplementGridView 
            filteredItems={filteredItems}
            isSelected={isSelected}
            toggleItem={toggleItem}
            activeTab={activeTab}
          />
        ) : (
          <SupplementListView
            filteredItems={filteredItems}
            isSelected={isSelected}
            toggleItem={toggleItem}
            activeTab={activeTab}
          />
        )}
      </ScrollArea>
    </div>
  );
};

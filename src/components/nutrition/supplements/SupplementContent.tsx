
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SupplementGridView } from "./SupplementGridView";
import { SupplementListView } from "./SupplementListView";
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
    <ScrollArea className="h-full w-full">
      {viewMode === "grid" ? (
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
  );
};

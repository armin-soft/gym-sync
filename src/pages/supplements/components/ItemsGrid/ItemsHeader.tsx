
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid, List, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ItemsHeaderProps {
  activeTab: "supplement" | "vitamin";
  filteredItemsCount: number;
  selectedCategory: string | null;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const ItemsHeader: React.FC<ItemsHeaderProps> = ({
  activeTab,
  filteredItemsCount,
  selectedCategory,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8" dir="rtl">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={cn(
          "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center",
          activeTab === 'supplement'
            ? "bg-emerald-100 text-emerald-600"
            : "bg-blue-100 text-blue-600"
        )}>
          <Package className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        
        <div className="text-right">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1">
            {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'} - {selectedCategory}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
              {toPersianNumbers(filteredItemsCount)} مورد
            </Badge>
            <span className="text-xs sm:text-sm text-gray-500">
              در این دسته‌بندی
            </span>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center bg-gray-100 rounded-lg p-1">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('grid')}
          className={cn(
            "h-8 w-8 p-0 rounded-md",
            viewMode === 'grid' && "bg-white shadow-sm"
          )}
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('list')}
          className={cn(
            "h-8 w-8 p-0 rounded-md",
            viewMode === 'list' && "bg-white shadow-sm"
          )}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

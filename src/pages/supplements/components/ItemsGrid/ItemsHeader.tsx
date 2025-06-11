
import React from "react";
import { Grid, List, Pill, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const getGradientColors = () => {
    return activeTab === "supplement"
      ? "from-emerald-500 to-teal-600"
      : "from-cyan-500 to-blue-600";
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className={`p-3 bg-gradient-to-br ${getGradientColors()} rounded-2xl`}>
          {activeTab === "supplement" ? (
            <Pill className="w-6 h-6 text-white" />
          ) : (
            <Heart className="w-6 h-6 text-white" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === "supplement" ? "مکمل‌های غذایی" : "ویتامین‌ها"}
          </h2>
          <p className="text-gray-500">
            {toPersianNumbers(filteredItemsCount)} مورد
            {selectedCategory && ` در دسته‌بندی "${selectedCategory}"`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-gray-100 rounded-2xl p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={`h-10 w-10 p-0 rounded-xl ${
              viewMode === "grid" ? `bg-gradient-to-r ${getGradientColors()} text-white` : ""
            }`}
          >
            <Grid className="w-5 h-5" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className={`h-10 w-10 p-0 rounded-xl ${
              viewMode === "list" ? `bg-gradient-to-r ${getGradientColors()} text-white` : ""
            }`}
          >
            <List className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

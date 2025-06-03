
import React from "react";
import { Pill, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface GridHeaderProps {
  activeTab: "supplement" | "vitamin";
  filteredCount: number;
  hasCategories: boolean;
  onAddSupplement: () => void;
}

export const GridHeader: React.FC<GridHeaderProps> = ({
  activeTab,
  filteredCount,
  hasCategories,
  onAddSupplement,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        {activeTab === 'supplement' ? (
          <Pill className="w-5 h-5 text-green-600" />
        ) : (
          <Heart className="w-5 h-5 text-purple-600" />
        )}
        {activeTab === 'supplement' ? 'مکمل‌های غذایی' : 'ویتامین‌ها'}
        <Badge variant="secondary" className="mr-2">
          {toPersianNumbers(filteredCount)}
        </Badge>
      </h2>

      {hasCategories && (
        <Button
          onClick={onAddSupplement}
          className={`${
            activeTab === 'supplement'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-purple-500 hover:bg-purple-600'
          } text-white rounded-lg`}
        >
          <Plus className="w-4 h-4 ml-2" />
          افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
        </Button>
      )}
    </div>
  );
};

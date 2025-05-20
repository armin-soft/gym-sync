
import React from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementStatisticsProps {
  filteredItemsCount: number;
  selectedItemsCount: number;
  activeTab: 'supplement' | 'vitamin';
}

export const SupplementStatistics: React.FC<SupplementStatisticsProps> = ({
  filteredItemsCount,
  selectedItemsCount,
  activeTab
}) => {
  return (
    <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
      <span>
        {toPersianNumbers(filteredItemsCount)} {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} نمایش داده شده
      </span>
      <span>
        {toPersianNumbers(selectedItemsCount)} مورد انتخاب شده
      </span>
    </div>
  );
};

export default SupplementStatistics;

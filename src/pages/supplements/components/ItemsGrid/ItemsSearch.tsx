
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ItemsSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: "supplement" | "vitamin";
}

export const ItemsSearch: React.FC<ItemsSearchProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
}) => {
  return (
    <div className="relative max-w-md mb-6 sm:mb-8" dir="rtl">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      <Input
        placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pr-10 sm:pr-12 text-right border-gray-300 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm sm:text-base"
        dir="rtl"
      />
    </div>
  );
};

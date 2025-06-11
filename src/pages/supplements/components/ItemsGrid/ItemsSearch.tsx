
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
    <div className="relative mb-6">
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <Input
        placeholder={`جستجو در ${activeTab === "supplement" ? "مکمل‌ها" : "ویتامین‌ها"}...`}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pr-12 text-right border-2 border-gray-200 focus:border-emerald-400 rounded-2xl h-12"
        dir="rtl"
      />
    </div>
  );
};

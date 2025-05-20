
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SupplementSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: 'supplement' | 'vitamin';
}

export const SupplementSearch: React.FC<SupplementSearchProps> = ({
  searchQuery,
  setSearchQuery,
  activeTab
}) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder={`جستجوی ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-3 pr-10"
      />
    </div>
  );
};

export default SupplementSearch;

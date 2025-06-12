
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentMealSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClear?: () => void;
}

const StudentMealSearch: React.FC<StudentMealSearchProps> = ({
  searchQuery,
  setSearchQuery,
  onClear
}) => {
  const handleClear = () => {
    setSearchQuery("");
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="p-4 border-b bg-white/50 dark:bg-gray-900/50">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="جستجو در وعده‌های غذایی..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 text-right"
          dir="rtl"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default StudentMealSearch;

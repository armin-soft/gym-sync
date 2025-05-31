
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface StudentMealSearchProps {
  searchQuery: string;
  onSearchChange?: (query: string) => void;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  activeFilters?: string[];
  onFilterToggle?: (filter: string) => void;
  onClearFilters?: () => void;
}

const filterOptions = [
  { id: "صبحانه", label: "صبحانه", color: "brand-bg-primary" },
  { id: "ناهار", label: "ناهار", color: "brand-bg-secondary" },
  { id: "شام", label: "شام", color: "brand-bg-dark" },
  { id: "میان‌وعده", label: "میان‌وعده", color: "bg-brand-gradient" }
];

const StudentMealSearch: React.FC<StudentMealSearchProps> = ({
  searchQuery,
  onSearchChange,
  setSearchQuery,
  activeFilters = [],
  onFilterToggle,
  onClearFilters
}) => {
  const handleSearchChange = (query: string) => {
    if (onSearchChange) {
      onSearchChange(query);
    } else if (setSearchQuery) {
      setSearchQuery(query);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gradient-to-r from-orange-50 to-gold-50 dark:from-orange-950/20 dark:to-gold-950/20 rounded-lg border border-orange-200/50 dark:border-orange-800/30">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 brand-text-primary" />
        <Input
          placeholder="جستجو در وعده‌های غذایی..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pr-10 brand-input transition-all duration-200 focus:shadow-brand-orange"
        />
      </div>

      {/* Filters */}
      {onFilterToggle && (
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4 brand-text-primary" />
            <span className="text-sm font-medium brand-text-dark dark:text-white">فیلترها:</span>
          </div>
          
          {filterOptions.map((filter) => (
            <motion.div
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  activeFilters.includes(filter.id)
                    ? `${filter.color} text-white shadow-sm hover:shadow-md`
                    : "border-orange-200 hover:border-orange-300 hover-brand-orange"
                }`}
                onClick={() => onFilterToggle(filter.id)}
              >
                {filter.label}
              </Badge>
            </motion.div>
          ))}
          
          {activeFilters.length > 0 && onClearFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-xs hover-brand-orange px-2 py-1"
            >
              پاک کردن همه
            </Button>
          )}
        </div>
      )}

      {/* Active filters count */}
      {activeFilters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs brand-text-primary font-medium"
        >
          {activeFilters.length} فیلتر فعال
        </motion.div>
      )}
    </div>
  );
};

export default StudentMealSearch;

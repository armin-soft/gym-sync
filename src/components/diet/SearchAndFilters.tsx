
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { motion } from "framer-motion";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: () => void;
}

export const SearchAndFilters = ({
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortOrderChange,
}: SearchAndFiltersProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex flex-col sm:flex-row items-stretch gap-3 mb-4"
    >
      <div className="relative flex-1">
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground/70 transition-colors" />
        <Input 
          placeholder="جستجو در وعده های غذایی..." 
          className="pr-10 h-11 text-base focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-300 bg-card/80 backdrop-blur-sm text-right" 
          value={searchQuery} 
          onChange={e => onSearchChange(e.target.value)} 
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 border-border/50 bg-card/80 backdrop-blur-sm"
          onClick={onSortOrderChange}
        >
          {sortOrder === "asc" ? (
            <SortAsc className="h-5 w-5 text-primary" />
          ) : (
            <SortDesc className="h-5 w-5 text-primary" />
          )}
        </Button>
      </div>
    </motion.div>
  );
};

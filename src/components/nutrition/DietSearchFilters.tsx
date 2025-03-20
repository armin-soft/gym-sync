
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, SortAsc, SortDesc, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MealType } from "@/types/meal";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DietSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  categories: any[];
  filteredCategories: any[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  selectedMealType: MealType | null;
  setSelectedMealType: (type: MealType | null) => void;
  mealTypes: MealType[];
}

export const DietSearchFilters: React.FC<DietSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategoryId,
  setSelectedCategoryId,
  categories,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
  selectedMealType,
  setSelectedMealType,
  mealTypes
}) => {
  return (
    <div className="space-y-4 p-6 pt-2">
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground/70" />
          <Input
            placeholder="جستجو در غذاها..."
            className="pr-10 h-10 bg-white border-gray-200 focus:border-primary/50 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full hover:bg-gray-100"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>

        <div className="w-full sm:w-48 xl:w-64">
          <Select
            value={selectedMealType || ""}
            onValueChange={(value) => setSelectedMealType(value ? value as MealType : null)}
          >
            <SelectTrigger className="h-10 bg-white border-gray-200 focus:border-primary/50 focus:ring-primary/50">
              <SelectValue placeholder="نوع وعده" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">همه وعده‌ها</SelectItem>
              {mealTypes.map((type) => (
                <SelectItem key={type} value={type} className="flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 border-gray-200 hover:bg-gray-100 hover:text-primary"
          onClick={toggleSortOrder}
        >
          {sortOrder === "asc" ? (
            <SortAsc className="h-5 w-5" />
          ) : (
            <SortDesc className="h-5 w-5" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {filteredCategories.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-2 overflow-hidden"
          >
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full text-xs font-medium transition-all duration-200 ${
                selectedCategoryId === null
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategoryId(null)}
            >
              همه
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                className={`rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategoryId === category.id
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(searchQuery || selectedCategoryId !== null || selectedMealType !== null) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="text-sm text-gray-500">فیلترهای فعال:</div>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge
                  variant="outline"
                  className="gap-1 px-2 py-1 bg-background hover:bg-background border-primary/20"
                >
                  <span>{searchQuery}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-red-500/10 hover:text-red-500"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedCategoryId !== null && (
                <Badge
                  variant="outline"
                  className="gap-1 px-2 py-1 bg-background hover:bg-background border-primary/20"
                >
                  <span>
                    دسته:{" "}
                    {
                      categories.find((cat) => cat.id === selectedCategoryId)
                        ?.name
                    }
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-red-500/10 hover:text-red-500"
                    onClick={() => setSelectedCategoryId(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedMealType !== null && (
                <Badge
                  variant="outline"
                  className="gap-1 px-2 py-1 bg-background hover:bg-background border-primary/20"
                >
                  <span>وعده: {selectedMealType}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-red-500/10 hover:text-red-500"
                    onClick={() => setSelectedMealType(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-xs text-gray-500 hover:text-red-500 hover:bg-red-500/10"
              onClick={handleClearSearch}
            >
              پاک کردن همه
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

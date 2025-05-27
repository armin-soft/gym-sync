
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Grid, List, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface SupplementStageHeaderProps {
  type: 'supplement' | 'vitamin';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: any[];
  onAddCategory: () => void;
  onAddSupplement: () => void;
  handleClearSearch: () => void;
}

export const SupplementStageHeader: React.FC<SupplementStageHeaderProps> = ({
  type,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortOrder,
  toggleSortOrder,
  showAdvancedFilters,
  setShowAdvancedFilters,
  selectedCategory,
  onSelectCategory,
  categories,
  onAddCategory,
  onAddSupplement,
  handleClearSearch,
}) => {
  return (
    <div className="p-4 border-b border-indigo-100/50 dark:border-indigo-900/30 bg-gradient-to-r from-indigo-50/30 to-violet-50/30 dark:from-indigo-950/20 dark:to-violet-950/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={onAddCategory}
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md"
          >
            <Plus className="h-4 w-4 mr-1" />
            دسته‌بندی جدید
          </Button>
          
          <Button
            onClick={onAddSupplement}
            size="sm"
            variant="outline"
            className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          >
            <Plus className="h-4 w-4 mr-1" />
            {type === 'supplement' ? 'مکمل جدید' : 'ویتامین جدید'}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-900 p-1">
            <Button
              size="sm"
              variant={viewMode === "grid" ? "default" : "ghost"}
              className={`h-7 px-2 ${viewMode === "grid" ? "bg-indigo-600 text-white" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "ghost"}
              className={`h-7 px-2 ${viewMode === "list" ? "bg-indigo-600 text-white" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Sort Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={toggleSortOrder}
            className="border-indigo-200 dark:border-indigo-800"
          >
            <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
            {sortOrder === 'asc' ? 'الف-ی' : 'ی-الف'}
          </Button>

          {/* Filter Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-indigo-200 dark:border-indigo-800"
              >
                <Filter className="h-3.5 w-3.5 mr-1" />
                فیلتر
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                فیلترهای پیشرفته
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClearSearch}>
                پاک کردن همه فیلترها
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={`جستجو در ${type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 pl-4 text-right border-indigo-200 dark:border-indigo-800"
        />
      </div>

      {/* Active Filters */}
      {(searchQuery || selectedCategory !== 'all') && (
        <div className="flex flex-wrap gap-2 mt-3">
          {searchQuery && (
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              جستجو: {searchQuery}
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1 hover:text-indigo-900"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              دسته: {categories.find(c => c && c.id !== undefined && c.id.toString() === selectedCategory)?.name}
              <button
                onClick={() => onSelectCategory('all')}
                className="ml-1 hover:text-indigo-900"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

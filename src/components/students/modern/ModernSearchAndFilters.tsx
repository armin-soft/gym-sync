
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  X,
  SortAsc,
  SortDesc,
  Grid3X3,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernSearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
  onClearSearch: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  totalResults: number;
}

export const ModernSearchAndFilters: React.FC<ModernSearchAndFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  sortField = "name",
  sortOrder = "asc",
  onSortChange,
  onClearSearch,
  viewMode,
  onViewModeChange,
  totalResults
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 mb-6"
      dir="rtl"
    >
      <Card className="p-4 border-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجو در نام، شماره تماس، و سایر اطلاعات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 pl-4 h-11 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSearch}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Sort */}
            <Select value={sortField} onValueChange={onSortChange}>
              <SelectTrigger className="w-40 h-11">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">نام</SelectItem>
                <SelectItem value="phone">شماره تماس</SelectItem>
                <SelectItem value="height">قد</SelectItem>
                <SelectItem value="weight">وزن</SelectItem>
                <SelectItem value="progress">پیشرفت</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Direction */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => onSortChange?.(sortField)}
              className="h-11 w-11"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>

            {/* Filters Toggle */}
            <Button
              variant={showFilters ? "default" : "outline"}
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="h-11 w-11"
            >
              <Filter className="h-4 w-4" />
            </Button>

            {/* View Mode */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => onViewModeChange("grid")}
                className="h-11 w-11 rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => onViewModeChange("list")}
                className="h-11 w-11 rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {totalResults} شاگرد
            </Badge>
            {searchQuery && (
              <Badge variant="outline">
                جستجو: {searchQuery}
              </Badge>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="active">فعال</SelectItem>
                  <SelectItem value="pending">در انتظار</SelectItem>
                  <SelectItem value="completed">تکمیل شده</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="نوع برنامه" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="exercise">برنامه تمرینی</SelectItem>
                  <SelectItem value="diet">برنامه غذایی</SelectItem>
                  <SelectItem value="supplement">مکمل و ویتامین</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="تاریخ عضویت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="this-week">این هفته</SelectItem>
                  <SelectItem value="this-month">این ماه</SelectItem>
                  <SelectItem value="last-month">ماه گذشته</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

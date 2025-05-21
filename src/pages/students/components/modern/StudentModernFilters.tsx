
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  List,
  Kanban,
  Filter,
  SlidersHorizontal,
  ChevronsUpDown,
  SortDesc,
  SortAsc,
  Check,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

interface StudentModernFiltersProps {
  viewMode: "table" | "grid" | "kanban";
  setViewMode: (mode: "table" | "grid" | "kanban") => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  toggleSort: (field: string) => void;
}

export const StudentModernFilters = ({
  viewMode,
  setViewMode,
  sortField,
  sortOrder,
  toggleSort,
}: StudentModernFiltersProps) => {
  const deviceInfo = useDeviceInfo();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  // Get icon based on view mode
  const getViewIcon = () => {
    switch (viewMode) {
      case "table":
        return <List className="h-4 w-4" />;
      case "grid":
        return <LayoutGrid className="h-4 w-4" />;
      case "kanban":
        return <Kanban className="h-4 w-4" />;
    }
  };

  // Get appropriate sort icon
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <SortAsc className="h-3 w-3 ml-2" /> : <SortDesc className="h-3 w-3 ml-2" />;
  };

  // Toggle a filter
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      {/* View Mode Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size={deviceInfo.isMobile ? "icon" : "default"}
            className="bg-card/60 backdrop-blur-sm border-gray-200 dark:border-gray-800"
          >
            {deviceInfo.isMobile ? (
              getViewIcon()
            ) : (
              <>
                {getViewIcon()}
                <span className="ml-2 hidden sm:inline-flex">نمایش</span>
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200 dark:border-gray-800">
          <DropdownMenuLabel>حالت نمایش</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setViewMode("grid")} 
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span>کارت</span>
            </div>
            {viewMode === "grid" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setViewMode("table")}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span>جدول</span>
            </div>
            {viewMode === "table" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setViewMode("kanban")}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Kanban className="h-4 w-4" />
              <span>کانبان</span>
            </div>
            {viewMode === "kanban" && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size={deviceInfo.isMobile ? "icon" : "default"}
            className="bg-card/60 backdrop-blur-sm border-gray-200 dark:border-gray-800"
          >
            {deviceInfo.isMobile ? (
              <ChevronsUpDown className="h-4 w-4" />
            ) : (
              <>
                <ChevronsUpDown className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline-flex">مرتب‌سازی</span>
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200 dark:border-gray-800">
          <DropdownMenuLabel>مرتب‌سازی بر اساس</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => toggleSort("name")} className="flex items-center justify-between">
            <span>نام</span>
            {getSortIcon("name")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSort("progress")} className="flex items-center justify-between">
            <span>پیشرفت</span>
            {getSortIcon("progress")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSort("payment")} className="flex items-center justify-between">
            <span>پرداخت</span>
            {getSortIcon("payment")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSort("weight")} className="flex items-center justify-between">
            <span>وزن</span>
            {getSortIcon("weight")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSort("height")} className="flex items-center justify-between">
            <span>قد</span>
            {getSortIcon("height")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filters Popover */}
      <Popover open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size={deviceInfo.isMobile ? "icon" : "default"}
            className={`bg-card/60 backdrop-blur-sm border-gray-200 dark:border-gray-800 ${activeFilters.length > 0 ? 'border-primary text-primary' : ''}`}
          >
            {deviceInfo.isMobile ? (
              <Filter className="h-4 w-4" />
            ) : (
              <>
                <Filter className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline-flex">فیلتر</span>
              </>
            )}
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 rounded-full px-1.5">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">فیلترهای پیشرفته</h3>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={clearFilters}
              className="h-8 px-2 text-xs text-muted-foreground"
              disabled={activeFilters.length === 0}
            >
              <X className="h-3 w-3 mr-1" />
              پاک کردن
            </Button>
          </div>

          <div className="space-y-3">
            {/* وضعیت پیشرفت */}
            <div className="space-y-2">
              <label className="text-xs font-medium">وضعیت پیشرفت:</label>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={activeFilters.includes('high-progress') ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => toggleFilter('high-progress')}
                >
                  پیشرفت بالا
                </Badge>
                <Badge 
                  variant={activeFilters.includes('medium-progress') ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => toggleFilter('medium-progress')}
                >
                  پیشرفت متوسط
                </Badge>
                <Badge 
                  variant={activeFilters.includes('low-progress') ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => toggleFilter('low-progress')}
                >
                  پیشرفت کم
                </Badge>
              </div>
            </div>

            {/* وضعیت پرداخت */}
            <div className="space-y-2">
              <label className="text-xs font-medium">وضعیت پرداخت:</label>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={activeFilters.includes('paid') ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => toggleFilter('paid')}
                >
                  پرداخت شده
                </Badge>
                <Badge 
                  variant={activeFilters.includes('unpaid') ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => toggleFilter('unpaid')}
                >
                  پرداخت نشده
                </Badge>
              </div>
            </div>

            {/* وضعیت برنامه */}
            <div className="space-y-2">
              <label className="text-xs font-medium">وضعیت برنامه:</label>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={activeFilters.includes('has-exercise') ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => toggleFilter('has-exercise')}
                >
                  دارای برنامه تمرینی
                </Badge>
                <Badge 
                  variant={activeFilters.includes('has-diet') ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => toggleFilter('has-diet')}
                >
                  دارای برنامه غذایی
                </Badge>
              </div>
            </div>
          </div>

          <Button className="w-full mt-4" onClick={() => setIsAdvancedFilterOpen(false)}>
            اعمال فیلترها
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

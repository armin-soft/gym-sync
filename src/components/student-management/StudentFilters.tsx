
import React from "react";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc, SortDesc, Users, UserCheck, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StudentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: string) => void;
  genderFilter: "all" | "male" | "female";
  onGenderFilterChange: (gender: "all" | "male" | "female") => void;
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  onClearFilters: () => void;
}

export const StudentFilters: React.FC<StudentFiltersProps> = ({
  searchQuery,
  onSearchChange,
  sortField,
  sortOrder,
  onSortChange,
  genderFilter,
  onGenderFilterChange,
  totalStudents,
  maleStudents,
  femaleStudents,
  onClearFilters
}) => {
  const sortOptions = [
    { field: "name", label: "نام" },
    { field: "age", label: "سن" },
    { field: "height", label: "قد" },
    { field: "weight", label: "وزن" },
    { field: "payment", label: "شهریه" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8"
    >
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="جستجو در شاگردان..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
        />
        {searchQuery && (
          <Button
            onClick={() => onSearchChange("")}
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </Button>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Gender Filter Tabs */}
        <Tabs value={genderFilter} onValueChange={onGenderFilterChange as any} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              همه ({totalStudents})
            </TabsTrigger>
            <TabsTrigger value="male" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              آقایان ({maleStudents})
            </TabsTrigger>
            <TabsTrigger value="female" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              بانوان ({femaleStudents})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sort Dropdown */}
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                مرتب‌سازی
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.field}
                  onClick={() => onSortChange(option.field)}
                  className="cursor-pointer"
                >
                  <span className={sortField === option.field ? "font-semibold text-blue-600" : ""}>
                    {option.label}
                  </span>
                  {sortField === option.field && (
                    <Badge variant="secondary" className="mr-2">
                      {sortOrder === "asc" ? "صعودی" : "نزولی"}
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onClearFilters} className="cursor-pointer text-red-600">
                پاک کردن فیلترها
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters */}
      {(searchQuery || genderFilter !== "all") && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600 ml-2">فیلترهای فعال:</span>
          
          {searchQuery && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              جستجو: {searchQuery}
            </Badge>
          )}
          
          {genderFilter !== "all" && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              جنسیت: {genderFilter === "male" ? "آقایان" : "بانوان"}
            </Badge>
          )}
          
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            پاک کردن همه
          </Button>
        </div>
      )}
    </motion.div>
  );
};

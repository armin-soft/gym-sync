
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Filter, X, Users, UserCheck, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGender: "all" | "male" | "female";
  onGenderChange: (gender: "all" | "male" | "female") => void;
  sortBy: "name" | "age" | "createdAt";
  sortOrder: "asc" | "desc";
  onSortChange: (field: "name" | "age" | "createdAt", order: "asc" | "desc") => void;
}

export const StudentsFilters: React.FC<StudentsFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedGender,
  onGenderChange,
  sortBy,
  sortOrder,
  onSortChange
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const genderOptions = [
    { value: "all", label: "همه شاگردان", icon: Users },
    { value: "male", label: "شاگردان آقا", icon: User },
    { value: "female", label: "شاگردان خانم", icon: UserCheck },
  ];

  const clearSearch = () => {
    onSearchChange("");
  };

  return (
    <div className="w-full space-y-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        {/* کادر جستجو */}
        <Card className="flex-1 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-md">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="جستجو در نام، شماره تلفن یا کد شاگرد..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10 pl-10 bg-transparent border-0 focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </Card>

        {/* فیلترهای جنسیت */}
        <Card className="p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-md">
          <div className="flex rounded-lg bg-slate-50 dark:bg-slate-800 p-1">
            {genderOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedGender === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onGenderChange(option.value as any)}
                className={`flex-1 ${
                  selectedGender === option.value
                    ? "student-gradient-bg text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <option.icon className="ml-2 h-4 w-4" />
                {option.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* مرتب‌سازی */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Filter className="ml-2 h-4 w-4" />
              مرتب‌سازی
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
            <DropdownMenuItem
              onClick={() => onSortChange("name", sortOrder === "asc" ? "desc" : "asc")}
              className="cursor-pointer"
            >
              بر اساس نام {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSortChange("age", sortOrder === "asc" ? "desc" : "asc")}
              className="cursor-pointer"
            >
              بر اساس سن {sortBy === "age" && (sortOrder === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSortChange("createdAt", sortOrder === "asc" ? "desc" : "asc")}
              className="cursor-pointer"
            >
              بر اساس تاریخ ثبت {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </div>
  );
};

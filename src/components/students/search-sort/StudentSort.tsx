
import React from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentSortProps } from "./StudentSearchSortTypes";
import { cn } from "@/lib/utils";

export const StudentSort = ({
  sortField,
  sortOrder,
  toggleSort,
}: StudentSortProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "h-full md:w-auto gap-2 py-2.5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-gray-900",
            sortField && "border-indigo-500 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="font-medium">مرتب‌سازی</span>
          {sortField && (
            <span className="flex items-center gap-1 text-xs bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
              {sortField === "name" ? "نام" : sortField === "weight" ? "وزن" : "قد"}
              <span className="size-3.5 flex items-center justify-center">
                {sortOrder === "asc" ? "↑" : "↓"}
              </span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <DropdownMenuItem 
          onClick={() => toggleSort("name")}
          className={`gap-2 ${sortField === "name" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
        >
          <span>بر اساس نام</span>
          {sortField === "name" && (
            <div className="ml-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
              {sortOrder === "asc" ? "↑" : "↓"}
            </div>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => toggleSort("weight")}
          className={`gap-2 ${sortField === "weight" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
        >
          <span>بر اساس وزن</span>
          {sortField === "weight" && (
            <div className="ml-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
              {sortOrder === "asc" ? "↑" : "↓"}
            </div>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => toggleSort("height")}
          className={`gap-2 ${sortField === "height" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
        >
          <span>بر اساس قد</span>
          {sortField === "height" && (
            <div className="ml-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
              {sortOrder === "asc" ? "↑" : "↓"}
            </div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

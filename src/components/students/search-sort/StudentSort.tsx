
import React from "react";
import { Button } from "@/components/ui/button";
import { ListFilter, UserRound, Scale, Ruler, ArrowUp, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentSortProps } from "./StudentSearchSortTypes";

export const StudentSort = ({
  sortField,
  sortOrder,
  toggleSort,
}: StudentSortProps) => {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto gap-2 h-[3.25rem] border-indigo-100 dark:border-indigo-900 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
          >
            <ListFilter className="h-4 w-4" />
            مرتب‌سازی
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52 border-indigo-100 dark:border-indigo-900 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg">
          <DropdownMenuItem 
            onClick={() => toggleSort("name")}
            className={`gap-2 ${sortField === "name" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
          >
            <UserRound className="h-4 w-4" />
            <span>بر اساس نام</span>
            {sortField === "name" && (
              <div className="mr-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                {sortOrder === "asc" ? <ArrowUp className="h-3 w-3 text-indigo-700 dark:text-indigo-300" /> : <ArrowDown className="h-3 w-3 text-indigo-700 dark:text-indigo-300" />}
              </div>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => toggleSort("weight")}
            className={`gap-2 ${sortField === "weight" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
          >
            <Scale className="h-4 w-4" />
            <span>بر اساس وزن</span>
            {sortField === "weight" && (
              <div className="mr-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                {sortOrder === "asc" ? <ArrowUp className="h-3 w-3 text-indigo-700 dark:text-indigo-300" /> : <ArrowDown className="h-3 w-3 text-indigo-700 dark:text-indigo-300" />}
              </div>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => toggleSort("height")}
            className={`gap-2 ${sortField === "height" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
          >
            <Ruler className="h-4 w-4" />
            <span>بر اساس قد</span>
            {sortField === "height" && (
              <div className="mr-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                {sortOrder === "asc" ? <ArrowUp className="h-3 w-3 text-indigo-700 dark:text-indigo-300" /> : <ArrowDown className="h-3 w-3 text-indigo-700 dark:text-indigo-300" />}
              </div>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

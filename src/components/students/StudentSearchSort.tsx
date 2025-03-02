
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilter, Search, UserRound, Scale, Ruler, ArrowUp, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface StudentSearchSortProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: "name" | "weight" | "height";
  sortOrder: "asc" | "desc";
  toggleSort: (field: "name" | "weight" | "height") => void;
}

export const StudentSearchSort = ({
  searchQuery,
  setSearchQuery,
  sortField,
  sortOrder,
  toggleSort,
}: StudentSearchSortProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid sm:grid-cols-[1fr_auto] gap-4"
    >
      <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-indigo-100/30 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-md hover:bg-white/70 dark:hover:bg-slate-900/70 overflow-hidden">
        <div className="relative p-3">
          <div className="absolute right-5 top-1/2 -translate-y-1/2 size-8 flex items-center justify-center rounded-full bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400">
            <Search className="h-4 w-4" />
          </div>
          <Input
            placeholder="جستجو بر اساس نام یا شماره موبایل..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="pl-4 pr-14 py-6 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-indigo-500/20 placeholder:text-slate-400"
          />
        </div>
      </Card>
      
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
    </motion.div>
  );
};

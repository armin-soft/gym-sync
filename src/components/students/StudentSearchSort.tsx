
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StudentSearchSortProps } from "./search-sort/StudentSearchSortTypes";
import { cn } from "@/lib/utils";

export const StudentSearchSort = ({
  searchQuery,
  setSearchQuery,
}: StudentSearchSortProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
    >
      <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 p-1.5">
        <div className="relative flex-1">
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <Search className="h-4.5 w-4.5" />
          </div>
          <Input
            placeholder="جستجو بر اساس نام یا شماره موبایل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-11 py-6 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-indigo-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-800 dark:text-gray-200"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

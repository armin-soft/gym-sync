
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { StudentSearchProps } from "./StudentSearchSortTypes";

export const StudentSearch = ({
  searchQuery,
  setSearchQuery,
}: StudentSearchProps) => {
  return (
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
  );
};

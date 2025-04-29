
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudentSearchProps } from "./StudentSearchSortTypes";
import { motion } from "framer-motion";

export const StudentSearch = ({
  searchQuery,
  setSearchQuery,
}: StudentSearchProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
      >
        <Search className="h-4.5 w-4.5" />
      </motion.div>
      <Input
        placeholder="جستجو بر اساس نام یا شماره موبایل..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-4 pr-11 py-6 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-indigo-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-800 dark:text-gray-200"
      />
      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </>
  );
};

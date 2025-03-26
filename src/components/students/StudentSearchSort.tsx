
import React from "react";
import { motion } from "framer-motion";
import { StudentSearch } from "./search-sort/StudentSearch";
import { StudentSort } from "./search-sort/StudentSort";
import { StudentSearchSortProps } from "./search-sort/StudentSearchSortTypes";

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
      <StudentSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="flex flex-col sm:flex-row gap-2">
        <StudentSort
          sortField={sortField}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
        />
      </div>
    </motion.div>
  );
};

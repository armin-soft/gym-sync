
import { useState } from "react";
import { LayoutGrid, LayoutList } from "lucide-react";
import { motion } from "framer-motion";

interface StudentsViewToggleProps {
  viewMode: "grid" | "table";
  onChange: (mode: "grid" | "table") => void;
}

export const StudentsViewToggle = ({ viewMode, onChange }: StudentsViewToggleProps) => {
  const handleToggle = (mode: "grid" | "table") => {
    onChange(mode);
  };

  return (
    <motion.div 
      className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-lg h-[50px]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => handleToggle("grid")}
        className={`relative flex items-center justify-center p-2.5 flex-1 h-full min-w-[60px] transition-colors overflow-hidden rounded-l-lg ${
          viewMode === "grid" ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        }`}
      >
        {viewMode === "grid" && (
          <motion.div
            layoutId="viewToggleHighlight"
            className="absolute inset-0 bg-indigo-50 dark:bg-indigo-950/30 z-0"
            initial={false}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center">
          <LayoutGrid className={`h-5 w-5 ${viewMode === "grid" ? "stroke-[2.5px]" : "stroke-[1.5px]"}`} />
        </span>
      </button>
      
      <div className="w-px h-5 bg-gray-200 dark:bg-gray-800" />
      
      <button
        onClick={() => handleToggle("table")}
        className={`relative flex items-center justify-center p-2.5 flex-1 h-full min-w-[60px] transition-colors overflow-hidden rounded-r-lg ${
          viewMode === "table" ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        }`}
      >
        {viewMode === "table" && (
          <motion.div
            layoutId="viewToggleHighlight"
            className="absolute inset-0 bg-indigo-50 dark:bg-indigo-950/30 z-0"
            initial={false}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center">
          <LayoutList className={`h-5 w-5 ${viewMode === "table" ? "stroke-[2.5px]" : "stroke-[1.5px]"}`} />
        </span>
      </button>
    </motion.div>
  );
};

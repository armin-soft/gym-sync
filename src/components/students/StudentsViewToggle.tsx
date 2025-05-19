
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GridIcon, List } from "lucide-react";
import { motion } from 'framer-motion';

interface StudentsViewToggleProps {
  viewMode: "table" | "grid";
  onChange: (value: "table" | "grid") => void;
}

export const StudentsViewToggle: React.FC<StudentsViewToggleProps> = ({ viewMode, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <ToggleGroup 
        type="single" 
        value={viewMode} 
        onValueChange={(value) => {
          if (value) onChange(value as "table" | "grid");
        }}
        className="border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm"
      >
        <ToggleGroupItem 
          value="grid" 
          aria-label="نمایش گرید"
          className="data-[state=on]:bg-indigo-100 data-[state=on]:text-indigo-600 dark:data-[state=on]:bg-indigo-900/30 dark:data-[state=on]:text-indigo-400"
        >
          <GridIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="table" 
          aria-label="نمایش جدول"
          className="data-[state=on]:bg-indigo-100 data-[state=on]:text-indigo-600 dark:data-[state=on]:bg-indigo-900/30 dark:data-[state=on]:text-indigo-400"
        >
          <List className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </motion.div>
  );
};

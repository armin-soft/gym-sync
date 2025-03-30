
import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentsViewToggleProps {
  viewMode: "table" | "grid";
  onChange: (mode: "table" | "grid") => void;
}

export const StudentsViewToggle: React.FC<StudentsViewToggleProps> = ({ viewMode, onChange }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1 shadow-sm hidden md:flex">
      <Button
        variant={viewMode === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("table")}
        className={`relative h-10 px-3 ${
          viewMode === "table" 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-transparent hover:text-foreground"
        }`}
      >
        {viewMode === "table" && (
          <motion.div
            layoutId="active-view-pill"
            className="absolute inset-0 bg-primary rounded-lg"
            initial={false}
            transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
          />
        )}
        <span className="relative flex items-center gap-2">
          <LayoutList className="h-4 w-4" />
          <span className="font-medium">جدول</span>
        </span>
      </Button>
      
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("grid")}
        className={`relative h-10 px-3 ${
          viewMode === "grid" 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-transparent hover:text-foreground"
        }`}
      >
        {viewMode === "grid" && (
          <motion.div
            layoutId="active-view-pill"
            className="absolute inset-0 bg-primary rounded-lg"
            initial={false}
            transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
          />
        )}
        <span className="relative flex items-center gap-2">
          <LayoutGrid className="h-4 w-4" />
          <span className="font-medium">کارت</span>
        </span>
      </Button>
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ExerciseViewControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

export const ExerciseViewControls: React.FC<ExerciseViewControlsProps> = ({
  viewMode,
  setViewMode,
  toggleSortOrder,
  sortOrder
}) => {
  return (
    <div className="flex border rounded overflow-hidden shadow-sm">
      <Button 
        variant="ghost" 
        size="sm"
        className={`h-8 w-8 p-0 rounded-none ${viewMode === "grid" ? "bg-gray-100" : ""}`}
        onClick={() => setViewMode("grid")}
        title="نمایش گرید"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        className={`h-8 w-8 p-0 rounded-none ${viewMode === "list" ? "bg-gray-100" : ""}`}
        onClick={() => setViewMode("list")}
        title="نمایش لیست"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        className="h-8 w-8 p-0 rounded-none"
        onClick={toggleSortOrder}
        title={sortOrder === "asc" ? "مرتب‌سازی نزولی" : "مرتب‌سازی صعودی"}
      >
        {sortOrder === "asc" ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
      </Button>
    </div>
  );
};

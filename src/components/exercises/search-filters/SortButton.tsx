
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
  className?: string;
}

export const SortButton: React.FC<SortButtonProps> = ({ 
  sortOrder, 
  toggleSortOrder,
  className = ""
}) => {
  return (
    <Card className={`p-2 ${className}`}>
      <Button 
        onClick={toggleSortOrder} 
        size="sm" 
        variant="ghost" 
        className={`h-8 px-2 text-sm hover:bg-indigo-50 ${sortOrder === "asc" ? "text-indigo-600" : "text-amber-600"}`}
      >
        <ArrowUpDown className="h-4 w-4 mr-1" />
        <span>
          {sortOrder === "asc" ? "صعودی" : "نزولی"}
        </span>
      </Button>
    </Card>
  );
};

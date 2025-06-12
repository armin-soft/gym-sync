
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface StudentMealListWrapperProps {
  children: React.ReactNode;
  maxHeight?: string;
  toggleSortOrder?: () => void;
  sortOrder?: "asc" | "desc";
  showControls?: boolean;
}

const StudentMealListWrapper: React.FC<StudentMealListWrapperProps> = ({
  children,
  maxHeight = "400px",
  toggleSortOrder,
  sortOrder = "asc",
  showControls = false
}) => {
  return (
    <div className="flex flex-col h-full">
      {showControls && toggleSortOrder && (
        <div className="p-4 border-b bg-gray-50/50 dark:bg-gray-900/50 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSortOrder}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            مرتب‌سازی {sortOrder === "asc" ? "صعودی" : "نزولی"}
          </Button>
        </div>
      )}
      
      <ScrollArea style={{ maxHeight }} className="flex-1">
        {children}
      </ScrollArea>
    </div>
  );
};

export default StudentMealListWrapper;

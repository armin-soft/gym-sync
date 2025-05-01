
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
}

export const SortButton: React.FC<SortButtonProps> = ({
  sortOrder,
  toggleSortOrder
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            onClick={toggleSortOrder}
            className="h-11 w-11 rounded-xl bg-white/50 dark:bg-slate-800/50 border-muted hover:border-muted-foreground/50 transition-all duration-300"
          >
            <svg 
              width="15" 
              height="15" 
              viewBox="0 0 15 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={cn("h-5 w-5 transform transition-transform", 
                sortOrder === "asc" ? "rotate-0" : "rotate-180"
              )}
            >
              <path 
                d="M7.5 3C7.77614 3 8 3.22386 8 3.5L8 11.2929L10.1464 9.14645C10.3417 8.95118 10.6583 8.95118 10.8536 9.14645C11.0488 9.34171 11.0488 9.65829 10.8536 9.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L4.14645 9.85355C3.95118 9.65829 3.95118 9.34171 4.14645 9.14645C4.34171 8.95118 4.65829 8.95118 4.85355 9.14645L7 11.2929L7 3.5C7 3.22386 7.22386 3 7.5 3Z" 
                fill="currentColor" 
                fillRule="evenodd" 
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {sortOrder === "asc" ? "مرتب‌سازی صعودی" : "مرتب‌سازی نزولی"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

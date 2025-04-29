
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid, List, SortAsc, SortDesc } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExerciseViewControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

const ExerciseViewControls: React.FC<ExerciseViewControlsProps> = ({
  viewMode,
  setViewMode,
  toggleSortOrder,
  sortOrder,
}) => {
  const buttonVariants = {
    active: {
      backgroundColor: "rgb(var(--primary) / 0.1)",
      color: "rgb(var(--primary))",
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    inactive: {
      backgroundColor: "transparent",
      color: "rgb(var(--muted-foreground))",
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center justify-end gap-1 p-1 bg-muted/40 rounded-lg border border-border/30">
        <motion.div 
          className="flex"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                variants={buttonVariants}
                animate={sortOrder === "asc" ? "active" : "inactive"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-md",
                    sortOrder === "asc" && "text-primary bg-primary/10"
                  )}
                  onClick={toggleSortOrder}
                >
                  <SortAsc className="h-4 w-4" />
                  <span className="sr-only">مرتب‌سازی صعودی</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">مرتب‌سازی صعودی</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                variants={buttonVariants}
                animate={sortOrder === "desc" ? "active" : "inactive"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-md",
                    sortOrder === "desc" && "text-primary bg-primary/10"
                  )}
                  onClick={toggleSortOrder}
                >
                  <SortDesc className="h-4 w-4" />
                  <span className="sr-only">مرتب‌سازی نزولی</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">مرتب‌سازی نزولی</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
        
        <span className="w-px h-6 bg-border/50 mx-1"></span>
        
        <motion.div 
          className="flex"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                variants={buttonVariants}
                animate={viewMode === "grid" ? "active" : "inactive"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-md",
                    viewMode === "grid" && "text-primary bg-primary/10"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">نمایش شبکه‌ای</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">نمایش شبکه‌ای</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                variants={buttonVariants}
                animate={viewMode === "list" ? "active" : "inactive"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-md",
                    viewMode === "list" && "text-primary bg-primary/10"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">نمایش لیستی</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">نمایش لیستی</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </div>
    </TooltipProvider>
  );
};

export default ExerciseViewControls;

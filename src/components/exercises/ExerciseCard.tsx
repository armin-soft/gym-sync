
import React from "react";
import { cn } from "@/lib/utils";
import { Dumbbell, CheckCircle } from "lucide-react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ExerciseCardProps {
  exercise: Exercise;
  category?: ExerciseCategory;
  onClick?: () => void;
  isSelected: boolean;
  viewMode: "grid" | "list";
}

export const ExerciseCard = ({
  exercise,
  category,
  onClick,
  isSelected,
  viewMode,
}: ExerciseCardProps) => {
  const { name, description, targetMuscle, equipment } = exercise;
  
  const cardClasses = cn(
    "group relative rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer",
    viewMode === "grid" 
      ? "h-auto" 
      : "flex flex-row items-center gap-3 py-2.5 px-3",
    isSelected 
      ? "border-primary/50 bg-primary/5 dark:border-primary/30 dark:bg-primary/10" 
      : "border-border bg-card hover:border-primary/30 hover:bg-primary/[0.03] dark:hover:bg-primary/5"
  );

  const gridView = viewMode === "grid";

  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
    >
      {/* شاخص انتخاب شده */}
      {isSelected && (
        <motion.div 
          className="absolute top-2 right-2 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <CheckCircle className="h-5 w-5 text-primary bg-white dark:bg-gray-900 rounded-full" />
        </motion.div>
      )}

      {/* محتوای کارت */}
      <div className={cn(
        "flex",
        gridView ? "flex-col" : "flex-row gap-3 items-center w-full"
      )}>
        {/* آیکون تمرین */}
        <div className={cn(
          "flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 text-primary",
          gridView ? "py-6 w-full" : "h-12 w-12 rounded-lg"
        )}>
          <Dumbbell className={gridView ? "h-8 w-8" : "h-6 w-6"} />
        </div>

        {/* اطلاعات تمرین */}
        <div className={cn(
          "flex flex-col",
          gridView ? "w-full p-3" : "flex-1"
        )}>
          <div className="flex items-center justify-between gap-2">
            <h3 className={cn(
              "font-medium group-hover:text-primary transition-colors line-clamp-1",
              gridView ? "text-base" : "text-sm"
            )}>
              {name}
            </h3>
            
            {!gridView && category && (
              <Badge variant="outline" className="h-5 text-2xs bg-muted/20">
                {category.name}
              </Badge>
            )}
          </div>
          
          {gridView && description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          
          <div className={cn(
            "flex items-center gap-2 mt-1.5",
            gridView ? "flex-wrap" : "flex-nowrap"
          )}>
            {targetMuscle && (
              <Badge variant="secondary" className="h-5 text-2xs bg-secondary/10 text-secondary-foreground">
                {targetMuscle}
              </Badge>
            )}
            
            {category && gridView && (
              <Badge variant="outline" className="h-5 text-2xs bg-muted/20">
                {category.name}
              </Badge>
            )}
            
            {equipment && (
              <Badge variant="outline" className="h-5 text-2xs bg-muted/20">
                {equipment}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

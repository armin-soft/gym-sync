
import React from "react";
import { cn } from "@/lib/utils";
import { Dumbbell, CheckCircle, Activity, Edit, Trash2 } from "lucide-react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ExerciseCardProps {
  exercise: Exercise;
  category?: ExerciseCategory;
  onClick?: () => void;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ExerciseCard = ({
  exercise,
  category,
  onClick,
  isSelected,
  viewMode,
  onEdit,
  onDelete
}: ExerciseCardProps) => {
  const { name, description, targetMuscle, equipment } = exercise;
  
  const cardClasses = cn(
    "group relative rounded-xl overflow-hidden border transition-all duration-300",
    viewMode === "grid" 
      ? "h-full" 
      : "flex flex-row items-center gap-3 py-2.5 px-3",
    isSelected 
      ? "border-primary/50 bg-primary/5 dark:border-primary/30 dark:bg-primary/10 shadow-md shadow-primary/5" 
      : "border-border bg-card hover:border-primary/30 hover:bg-primary/[0.03] dark:hover:bg-primary/5 hover:shadow-md"
  );

  const gridView = viewMode === "grid";
  
  // انیمیشن برای کارت
  const cardVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { 
      y: -5, 
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
    }
  };

  return (
    <motion.div 
      className={cardClasses} 
      onClick={onClick}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* شاخص انتخاب شده */}
      {isSelected && (
        <motion.div 
          className="absolute top-2 right-2 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <CheckCircle className="h-5 w-5 text-primary bg-white dark:bg-gray-900 rounded-full shadow-sm" />
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
          gridView 
            ? "py-6 w-full" 
            : "h-12 w-12 rounded-lg"
        )}>
          {gridView 
            ? <Dumbbell className="h-8 w-8" />
            : <Activity className="h-6 w-6" />
          }
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

        {/* دکمه‌های عملیات */}
        {(onEdit || onDelete) && (
          <div className={cn(
            "flex",
            gridView 
              ? "absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity" 
              : "flex-shrink-0"
          )}>
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="h-7 w-7 hover:bg-background/80 hover:text-primary"
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExerciseCard;

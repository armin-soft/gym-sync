
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { Edit, Trash2, Activity, Dumbbell, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseCardProps {
  exercise: Exercise;
  category?: ExerciseCategory;
  isSelected?: boolean;
  viewMode: "grid" | "list";
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  category,
  isSelected = false,
  viewMode,
  onClick,
  onEdit,
  onDelete,
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  if (viewMode === "list") {
    return (
      <Card 
        onClick={onClick}
        className={cn(
          "cursor-pointer hover:shadow-md transition-all duration-300 mb-2 border-l-4",
          isSelected 
            ? "bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-900/80 border-indigo-500 dark:border-indigo-400" 
            : "border-transparent hover:border-indigo-300 dark:hover:border-indigo-700"
        )}
      >
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center gap-3 text-right">
            {isSelected ? (
              <div className="flex-shrink-0 bg-indigo-500 p-2 rounded-full shadow-md shadow-indigo-200 dark:shadow-indigo-900/30">
                <Check className="h-4 w-4 text-white" />
              </div>
            ) : (
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                <Dumbbell className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            )}
            
            <div className="space-y-1">
              <h4 className={cn(
                "font-medium",
                isSelected 
                  ? "text-indigo-700 dark:text-indigo-300" 
                  : "text-gray-700 dark:text-gray-300"
              )}>
                {exercise.name}
              </h4>
              {category && (
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground">
                    {category.name}
                  </span>
                  
                  {isSelected && (
                    <div className="flex items-center ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                      <Activity className="h-3 w-3 text-indigo-500 dark:text-indigo-400 mr-1" />
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">انتخاب شده</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {onEdit && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            
            {onDelete && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      onClick={onClick}
      className={cn(
        "cursor-pointer overflow-hidden h-full border-0 shadow-md hover:shadow-xl transition-all duration-300",
        isSelected 
          ? "bg-gradient-to-br from-indigo-50/90 to-white dark:from-indigo-900/20 dark:to-gray-900/80" 
          : "bg-white dark:bg-gray-900"
      )}
    >
      <CardHeader className={cn(
        "p-3 pb-2 border-b",
        isSelected 
          ? "bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-900/20 border-indigo-200 dark:border-indigo-800/50" 
          : "bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900/30 border-gray-100 dark:border-gray-800/30"
      )}>
        <div className="flex items-center justify-between">
          <div className={cn(
            "p-1.5 rounded-full",
            isSelected 
              ? "bg-indigo-500/20 dark:bg-indigo-500/10" 
              : "bg-white/80 dark:bg-gray-800/80"
          )}>
            <Dumbbell className={cn(
              "h-4 w-4", 
              isSelected 
                ? "text-indigo-600 dark:text-indigo-400" 
                : "text-gray-600 dark:text-gray-400"
            )} />
          </div>
          
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            isSelected 
              ? "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300" 
              : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300"
          )}>
            {category?.name || "دسته‌بندی نشده"}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 pt-2 text-center relative">
        <h4 className={cn(
          "font-medium line-clamp-2 min-h-[2.5rem]",
          isSelected 
            ? "text-indigo-700 dark:text-indigo-300" 
            : "text-gray-700 dark:text-gray-300"
        )}>
          {exercise.name}
        </h4>
        
        {isSelected && (
          <div className="absolute -top-6 -right-6">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full animate-ping"></div>
              <div className="relative h-12 w-12 bg-indigo-500 dark:bg-indigo-600 rounded-full flex items-center justify-center shadow-lg rotate-12">
                <Check className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      {(onEdit || onDelete) && (
        <CardFooter className={cn(
          "p-2 flex justify-center gap-2 border-t",
          isSelected 
            ? "border-indigo-100 dark:border-indigo-900/30" 
            : "border-gray-100 dark:border-gray-800/30"
        )}>
          {onEdit && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              onClick={handleEdit}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
          )}
          
          {onDelete && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
              onClick={handleDelete}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

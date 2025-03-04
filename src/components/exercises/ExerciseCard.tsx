
import React from "react";
import { Exercise } from "@/types/exercise";
import { Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ExerciseCardProps {
  exercise: Exercise;
  category: any;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  category,
  isSelected,
  viewMode,
  onClick,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer",
        viewMode === "grid" ? "w-full aspect-square" : "w-full h-24",
        isSelected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br",
        isSelected ? "from-primary/10 to-primary/30" : "from-gray-50 to-gray-100"
      )}>
        <div className={cn(
          "absolute inset-0 flex flex-col",
          viewMode === "grid" ? "items-center justify-center p-4" : "p-3"
        )}>
          {viewMode === "grid" ? (
            <>
              <div className={cn(
                "mb-3 p-3 rounded-full",
                isSelected ? "bg-primary text-white" : "bg-gray-200/80 text-gray-700"
              )}>
                <Dumbbell className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-center line-clamp-2">{exercise.name}</h3>
              {category && (
                <Badge variant={isSelected ? "default" : "outline"} className="mt-2">
                  {category.name}
                </Badge>
              )}
            </>
          ) : (
            <div className="flex items-center w-full h-full">
              <div className={cn(
                "p-3 mr-3 rounded-full shrink-0",
                isSelected ? "bg-primary text-white" : "bg-gray-200/80 text-gray-700"
              )}>
                <Dumbbell className="w-6 h-6" />
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <h3 className="font-semibold text-lg line-clamp-1">{exercise.name}</h3>
                <div className="flex items-center mt-1">
                  {category && (
                    <Badge variant={isSelected ? "default" : "outline"} className="mr-2">
                      {category.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

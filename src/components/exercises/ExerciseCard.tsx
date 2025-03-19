
import React from "react";
import { Exercise } from "@/types/exercise";
import { Dumbbell, Plus, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ExerciseCardProps {
  exercise: Exercise;
  category: any;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onClick: () => void;
  onAddToWorkout?: () => void;
  onSave?: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  category,
  isSelected,
  viewMode,
  onClick,
  onAddToWorkout,
  onSave,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border w-full",
        viewMode === "list" ? "h-auto" : "h-24",
        isSelected 
          ? "ring-2 ring-primary shadow-lg border-primary/50" 
          : "hover:shadow-md border-gray-100 hover:border-gray-200"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br",
        isSelected ? "from-primary/10 to-primary/30" : "from-gray-50 to-gray-100"
      )}>
        <div className="absolute inset-0 flex items-center p-3">
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
            
            {isSelected && (viewMode === "list") && (
              <div className="flex mt-3 space-x-2 rtl:space-x-reverse">
                {onAddToWorkout && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white hover:bg-white/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToWorkout();
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    افزودن به تمرین
                  </Button>
                )}
                
                {onSave && (
                  <Button 
                    size="sm" 
                    className="bg-primary/90 hover:bg-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSave();
                    }}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    ذخیره
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

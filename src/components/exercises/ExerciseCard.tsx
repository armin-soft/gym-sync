
import React from "react";
import { Exercise } from "@/types/exercise";
import { Dumbbell, Check } from "lucide-react";
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
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  if (viewMode === "list") {
    return (
      <motion.div
        layout
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border w-full h-12 sm:h-14",
          isSelected 
            ? "ring-2 ring-primary shadow-lg border-primary/50 bg-primary/5" 
            : "hover:shadow-md border-gray-100 hover:border-gray-200 hover:bg-gray-50/80"
        )}
        onClick={onClick}
      >
        <div className="absolute inset-0 flex items-center p-1.5 sm:p-2">
          <div className={cn(
            "p-1.5 sm:p-2 ml-1 sm:mr-2 rounded-full shrink-0 transition-all duration-300",
            isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
          )}>
            {isSelected ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4" />}
          </div>
          <div className="flex items-center justify-between flex-1 overflow-hidden">
            <div className="flex flex-col mr-2">
              <h3 className="font-semibold text-xs sm:text-sm line-clamp-1 text-gray-900 dark:text-white">
                {exercise.name}
              </h3>
              <p className="text-2xs sm:text-xs text-gray-700 dark:text-gray-300 line-clamp-1 font-medium">
                {exercise.description || (category ? `دسته: ${category.name}` : '')}
              </p>
            </div>
            {category && (
              <Badge variant={isSelected ? "default" : "outline"} className="mr-1 whitespace-nowrap text-2xs sm:text-xs font-bold">
                {category.name}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border w-full h-20 sm:h-24",
        isSelected 
          ? "ring-2 ring-primary shadow-lg border-primary/50" 
          : "hover:shadow-md border-gray-100 hover:border-gray-200"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br transition-all duration-300",
        isSelected ? "from-primary/10 to-primary/30" : "from-gray-50 to-gray-100/80 hover:from-gray-100/50 hover:to-gray-200/50"
      )}>
        <div className="absolute inset-0 flex flex-col justify-between p-2 sm:p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className={cn(
                "p-1.5 sm:p-2 mr-1.5 rounded-full shrink-0 transition-all duration-300",
                isSelected ? "bg-primary text-white" : "bg-white/90 text-gray-700 shadow-sm"
              )}>
                {isSelected ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4" />}
              </div>
              <h3 className="font-bold text-xs sm:text-sm line-clamp-1 mr-1 sm:mr-2 text-gray-900 dark:text-white">
                {exercise.name}
              </h3>
            </div>
            {isSelected && (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-2xs sm:text-xs font-bold">
                انتخاب شده
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-1.5">
            {exercise.description && (
              <p className="text-2xs sm:text-xs text-gray-700 dark:text-gray-200 line-clamp-1 mr-8 font-medium">
                {exercise.description}
              </p>
            )}
            {category && (
              <Badge variant={isSelected ? "default" : "outline"} className="mr-auto text-2xs sm:text-xs font-bold">
                {category.name}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseCard;

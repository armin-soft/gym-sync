
import React from "react";
import { Utensils, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MealCardProps {
  meal: any;
  category: any;
  isSelected: boolean;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
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
          "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border w-full h-16",
          isSelected 
            ? "ring-2 ring-primary shadow-lg border-primary/50 bg-primary/5" 
            : "hover:shadow-md border-gray-100 hover:border-gray-200 hover:bg-gray-50/80"
        )}
        onClick={onClick}
      >
        <div className="absolute inset-0 flex items-center p-2">
          <div className={cn(
            "p-2 mr-2 rounded-full shrink-0 transition-all duration-300",
            isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
          )}>
            {isSelected ? <Check className="w-4 h-4" /> : <Utensils className="w-4 h-4" />}
          </div>
          <div className="flex items-center justify-between flex-1 overflow-hidden">
            <div className="flex flex-col">
              <h3 className="font-semibold text-base line-clamp-1 text-gray-900 dark:text-white">{meal.name}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1 font-medium">
                {meal.description || (category ? `دسته: ${category.name}` : '')}
              </p>
            </div>
            {category && (
              <Badge variant={isSelected ? "default" : "outline"} className="mr-2 whitespace-nowrap text-xs font-bold">
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
        "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border w-full h-28",
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
        <div className="absolute inset-0 flex flex-col justify-between p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className={cn(
                "p-2.5 mr-2 rounded-full shrink-0 transition-all duration-300",
                isSelected ? "bg-primary text-white" : "bg-white/90 text-gray-700 shadow-sm"
              )}>
                {isSelected ? <Check className="w-5 h-5" /> : <Utensils className="w-5 h-5" />}
              </div>
              <h3 className="font-bold text-lg line-clamp-1 mr-2 text-gray-900 dark:text-white">{meal.name}</h3>
            </div>
            {isSelected && (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-bold">
                انتخاب شده
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-2">
            {meal.description && (
              <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-1 mr-12 font-medium">{meal.description}</p>
            )}
            {category && (
              <Badge variant={isSelected ? "default" : "outline"} className="mr-auto font-bold">
                {category.name}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

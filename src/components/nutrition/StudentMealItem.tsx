
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Meal, MealType } from "@/types/meal";
import { getMealTypeColor, getMealTypeIcon } from "@/components/nutrition/StudentMealFilters";

interface StudentMealItemProps {
  meal: Meal;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

const StudentMealItem: React.FC<StudentMealItemProps> = ({ 
  meal, 
  isSelected, 
  onToggle 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div 
        className={`p-4 rounded-xl border shadow-sm hover:shadow transition-all cursor-pointer text-right
          ${isSelected ? "border-primary/30 bg-primary/5 dark:bg-primary/10" : "border-border hover:border-primary/20 bg-card hover:bg-muted/50"}`} 
        onClick={() => onToggle(meal.id)} 
        dir="rtl"
      >
        <div className="flex gap-3 items-start">
          <div className={`w-5 h-5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${isSelected ? "bg-primary" : "border-2 border-muted-foreground/30"}`}>
            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
          </div>
          
          <div className="space-y-2 text-right flex-1">
            <div>
              <h4 className="font-medium text-base text-foreground">{meal.name}</h4>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getMealTypeColor(meal.type)}`}>
                  {getMealTypeIcon(meal.type)}
                  <span>{meal.type}</span>
                </span>
              </div>
              
              {meal.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{meal.description}</p>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentMealItem;

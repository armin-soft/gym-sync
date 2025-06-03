
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getMealTypeIcon, getMealTypeStyle } from "./MealTypeUtils";
import type { MealType } from "@/types/meal";
import { motion } from "framer-motion";

interface MealTypeHeaderProps {
  type: MealType;
  count: number;
}

export const MealTypeHeader = ({ type, count }: MealTypeHeaderProps) => {
  const styles = getMealTypeStyle(type);
  
  return (
    <div className={`p-3 sm:p-4 ${styles?.bg} border-b ${styles?.border} backdrop-blur-sm`}>
      <div className="flex items-center gap-3 justify-start">
        <motion.div 
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${styles?.iconBg}`}
        >
          <div className={`${styles?.icon}`}>
            {getMealTypeIcon(type)}
          </div>
        </motion.div>
        <div className="text-right">
          <h3 className="text-sm sm:text-base font-semibold text-foreground/90">
            {type}
          </h3>
          <p className="text-2xs sm:text-xs text-muted-foreground">
            {toPersianNumbers(count)} وعده غذایی
          </p>
        </div>
        <Badge variant="outline" className={cn("mr-auto bg-background/50 shadow-sm", styles?.border)}>
          {toPersianNumbers(count)} مورد
        </Badge>
      </div>
    </div>
  );
};


import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getMealTypeIcon, getMealTypeStyle } from "./MealTypeUtils";
import type { MealType } from "@/types/meal";

interface MealTypeHeaderProps {
  type: MealType;
  count: number;
}

export const MealTypeHeader = ({ type, count }: MealTypeHeaderProps) => {
  const styles = getMealTypeStyle(type);
  
  return (
    <div className={`p-2 sm:p-4 ${styles?.bg} rounded-t-xl border-b ${styles?.border}`}>
      <div className="flex items-center gap-2">
        <div className={`${styles?.icon}`}>
          {getMealTypeIcon(type)}
        </div>
        <h3 className="text-sm sm:text-base font-medium text-foreground/90">
          {type}
        </h3>
        <Badge variant="outline" className={cn("mr-2 bg-background/50", styles?.border)}>
          {toPersianNumbers(count)} مورد
        </Badge>
      </div>
    </div>
  );
};

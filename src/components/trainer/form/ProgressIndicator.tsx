
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProgressIndicatorProps {
  completionPercentage: number;
  progressColor: string;
}

export const ProgressIndicator = ({ completionPercentage, progressColor }: ProgressIndicatorProps) => {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-sm text-white/70 mb-2">
        <span>پیشرفت تکمیل پروفایل</span>
        <span>{toPersianNumbers(completionPercentage.toString())}%</span>
      </div>
      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div 
          className={cn("h-full bg-gradient-to-r", progressColor, "rounded-full")}
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
    </div>
  );
};

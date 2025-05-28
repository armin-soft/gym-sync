
import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { TrendingUp, Filter, Search } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementStageFooterProps {
  filteredSupplements: any[];
  supplements: any[];
  selectedCategory: string;
  categories: any[];
}

export const SupplementStageFooter: React.FC<SupplementStageFooterProps> = ({
  filteredSupplements,
  supplements,
  selectedCategory,
  categories,
}) => {
  const totalSupplements = supplements.length;
  const filteredCount = filteredSupplements.length;
  const isFiltered = selectedCategory !== 'all' || filteredCount !== totalSupplements;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50"
      dir="rtl"
    >
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 bg-white/80 dark:bg-gray-900/80">
            <TrendingUp className="h-3 w-3" />
            کل موارد: {toPersianNumbers(totalSupplements.toString())}
          </Badge>
          
          {isFiltered && (
            <Badge variant="outline" className="gap-1.5 bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700">
              <Filter className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              فیلتر شده: {toPersianNumbers(filteredCount.toString())}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Search className="h-3 w-3" />
          <span>نتایج به‌روزرسانی شده</span>
        </div>
      </div>
    </motion.div>
  );
};

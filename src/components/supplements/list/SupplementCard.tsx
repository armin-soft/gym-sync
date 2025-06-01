
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Supplement } from "@/types/supplement";
import { 
  FlaskConical, 
  Pill, 
  Edit2, 
  Trash2, 
  Clock, 
  Beaker,
  Tag
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementCardProps {
  supplement: Supplement;
  onEdit: () => void;
  onDelete: () => void;
}

export const SupplementCard: React.FC<SupplementCardProps> = ({
  supplement,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      dir="rtl"
    >
      <Card className="group relative overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
        {/* Header با آیکون نوع */}
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {supplement.type === 'supplement' ? (
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Pill className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="text-right">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 leading-tight">
                  {supplement.name}
                </h3>
                <Badge 
                  variant="outline" 
                  className="mt-1 text-xs bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {supplement.category}
                </Badge>
              </div>
            </div>

            {/* دکمه‌های عملیات */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* محتوای اصلی */}
        <div className="px-4 pb-4 space-y-3">
          {/* دوز مصرف */}
          {supplement.dosage && (
            <div className="flex items-center justify-end gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200/50 dark:border-green-800/50">
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {toPersianNumbers(supplement.dosage)}
              </span>
              <span className="text-xs text-green-700 dark:text-green-400 font-medium">
                دوز مصرف:
              </span>
              <Beaker className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          )}

          {/* زمان مصرف */}
          {supplement.timing && (
            <div className="flex items-center justify-end gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200/50 dark:border-orange-800/50">
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {supplement.timing}
              </span>
              <span className="text-xs text-orange-700 dark:text-orange-400 font-medium">
                زمان مصرف:
              </span>
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
          )}
        </div>

        {/* نشانگر نوع */}
        <div className={cn(
          "absolute top-0 right-0 w-1 h-full",
          supplement.type === 'supplement' 
            ? "bg-gradient-to-b from-purple-500 to-indigo-600" 
            : "bg-gradient-to-b from-blue-500 to-purple-600"
        )} />
      </Card>
    </motion.div>
  );
};

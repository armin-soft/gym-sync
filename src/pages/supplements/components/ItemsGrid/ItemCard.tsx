
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Supplement } from "@/types/supplement";
import { Edit2, Trash2, Pill, Heart, Clock, Beaker } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ItemCardProps {
  item: Supplement;
  onEdit: (item: Supplement) => void;
  onDelete: (id: number) => void;
  activeTab: "supplement" | "vitamin";
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  activeTab,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group relative overflow-hidden bg-white border-2 border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-lg p-4 sm:p-5 lg:p-6" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={cn(
              "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center",
              activeTab === 'supplement'
                ? "bg-emerald-100 text-emerald-600"
                : "bg-blue-100 text-blue-600"
            )}>
              {activeTab === 'supplement' ? (
                <Pill className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
            
            <div className="text-right">
              <h4 className="font-bold text-sm sm:text-base lg:text-lg text-gray-800 leading-tight">
                {item.name}
              </h4>
              <Badge 
                variant="outline" 
                className="mt-1 text-xs bg-gray-50 border-gray-200 text-gray-700"
              >
                {item.category}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(item)}
              className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600"
            >
              <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item.id)}
              className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 sm:space-y-3">
          {/* Dosage */}
          {item.dosage && (
            <div className="flex items-center justify-end gap-2 p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200/50">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">
                {toPersianNumbers(item.dosage)}
              </span>
              <span className="text-xs text-green-700 font-medium">
                دوز مصرف:
              </span>
              <Beaker className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            </div>
          )}

          {/* Timing */}
          {item.timing && (
            <div className="flex items-center justify-end gap-2 p-2 sm:p-3 bg-orange-50 rounded-lg border border-orange-200/50">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">
                {item.timing}
              </span>
              <span className="text-xs text-orange-700 font-medium">
                زمان مصرف:
              </span>
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
            </div>
          )}
        </div>

        {/* Type Indicator */}
        <div className={cn(
          "absolute top-0 right-0 w-1 h-full",
          activeTab === 'supplement' 
            ? "bg-gradient-to-b from-emerald-500 to-emerald-600" 
            : "bg-gradient-to-b from-blue-500 to-blue-600"
        )} />
      </Card>
    </motion.div>
  );
};

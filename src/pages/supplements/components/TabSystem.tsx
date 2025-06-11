
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pill, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface TabSystemProps {
  activeTab: "supplement" | "vitamin";
  onTabChange: (tab: "supplement" | "vitamin") => void;
  supplementCount: number;
  vitaminCount: number;
  onAddClick: () => void;
}

export const TabSystem: React.FC<TabSystemProps> = ({
  activeTab,
  onTabChange,
  supplementCount,
  vitaminCount,
  onAddClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      dir="rtl"
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-right">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
              انتخاب نوع محصول
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              مکمل‌ها یا ویتامین‌های مورد نظر خود را انتخاب کنید
            </p>
          </div>
          
          <Button
            onClick={onAddClick}
            className={cn(
              "flex items-center gap-2 text-white shadow-lg px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all",
              activeTab === 'supplement'
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            )}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">
              افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
            </span>
            <span className="sm:hidden">
              افزودن
            </span>
          </Button>
        </div>

        {/* Tab Buttons */}
        <div className="bg-gray-100 rounded-lg sm:rounded-xl p-1.5 sm:p-2 w-full">
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange('supplement')}
              className={cn(
                "flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-4 sm:px-6 rounded-md sm:rounded-lg transition-all text-sm sm:text-base font-medium",
                activeTab === 'supplement'
                  ? "bg-white text-emerald-700 shadow-md"
                  : "text-gray-600 hover:bg-white/50"
              )}
            >
              <Pill className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>مکمل‌ها</span>
              <Badge 
                variant={activeTab === 'supplement' ? "default" : "secondary"}
                className="text-xs px-2 py-1"
              >
                {toPersianNumbers(supplementCount)}
              </Badge>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange('vitamin')}
              className={cn(
                "flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-4 sm:px-6 rounded-md sm:rounded-lg transition-all text-sm sm:text-base font-medium",
                activeTab === 'vitamin'
                  ? "bg-white text-blue-700 shadow-md"
                  : "text-gray-600 hover:bg-white/50"
              )}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>ویتامین‌ها</span>
              <Badge 
                variant={activeTab === 'vitamin' ? "default" : "secondary"}
                className="text-xs px-2 py-1"
              >
                {toPersianNumbers(vitaminCount)}
              </Badge>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

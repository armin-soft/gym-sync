
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 mb-8" dir="rtl">
      <div className="grid grid-cols-2 gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTabChange("supplement")}
          className={`relative p-6 rounded-2xl transition-all duration-300 ${
            activeTab === "supplement"
              ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl"
              : "bg-gray-50 hover:bg-gray-100 text-gray-700"
          }`}
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div
              animate={activeTab === "supplement" ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Pill className="w-8 h-8" />
            </motion.div>
            <div className="text-right">
              <h3 className="text-xl font-bold mb-1">مکمل‌های غذایی</h3>
              <div className="flex items-center gap-2">
                <Badge
                  variant={activeTab === "supplement" ? "secondary" : "outline"}
                  className={`text-sm ${
                    activeTab === "supplement" 
                      ? "bg-white/20 text-white border-white/30" 
                      : "bg-emerald-100 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {toPersianNumbers(supplementCount)} مکمل
                </Badge>
              </div>
            </div>
          </div>
          {activeTab === "supplement" && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 left-3"
            >
              <div className="w-3 h-3 bg-white rounded-full" />
            </motion.div>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTabChange("vitamin")}
          className={`relative p-6 rounded-2xl transition-all duration-300 ${
            activeTab === "vitamin"
              ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl"
              : "bg-gray-50 hover:bg-gray-100 text-gray-700"
          }`}
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div
              animate={activeTab === "vitamin" ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-8 h-8" />
            </motion.div>
            <div className="text-right">
              <h3 className="text-xl font-bold mb-1">ویتامین‌ها</h3>
              <div className="flex items-center gap-2">
                <Badge
                  variant={activeTab === "vitamin" ? "secondary" : "outline"}
                  className={`text-sm ${
                    activeTab === "vitamin" 
                      ? "bg-white/20 text-white border-white/30" 
                      : "bg-cyan-100 text-cyan-700 border-cyan-200"
                  }`}
                >
                  {toPersianNumbers(vitaminCount)} ویتامین
                </Badge>
              </div>
            </div>
          </div>
          {activeTab === "vitamin" && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 left-3"
            >
              <div className="w-3 h-3 bg-white rounded-full" />
            </motion.div>
          )}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mt-4"
      >
        <Button
          onClick={onAddClick}
          className={`${
            activeTab === "supplement"
              ? "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800"
              : "bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800"
          } text-white shadow-lg rounded-2xl px-8 py-3 text-lg font-semibold`}
        >
          <Plus className="w-6 h-6 ml-2" />
          افزودن {activeTab === "supplement" ? "مکمل" : "ویتامین"} جدید
        </Button>
      </motion.div>
    </div>
  );
};

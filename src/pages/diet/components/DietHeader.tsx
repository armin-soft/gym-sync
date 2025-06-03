
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ChefHat, Plus, BarChart3 } from "lucide-react";

interface DietHeaderProps {
  activeView: "weekly" | "meals";
  setActiveView: (view: "weekly" | "meals") => void;
}

export const DietHeader: React.FC<DietHeaderProps> = ({
  activeView,
  setActiveView,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Main Title */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              مدیریت برنامه غذایی
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              طراحی و مدیریت برنامه‌های غذایی حرفه‌ای
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Card className="p-2 bg-white/80 backdrop-blur-sm border-emerald-200">
        <div className="flex gap-2">
          <Button
            variant={activeView === "weekly" ? "default" : "ghost"}
            onClick={() => setActiveView("weekly")}
            className={`flex-1 h-14 text-lg font-medium transition-all duration-300 ${
              activeView === "weekly"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-emerald-50"
            }`}
          >
            <Calendar className="w-5 h-5 ml-2" />
            برنامه هفتگی
          </Button>
          <Button
            variant={activeView === "meals" ? "default" : "ghost"}
            onClick={() => setActiveView("meals")}
            className={`flex-1 h-14 text-lg font-medium transition-all duration-300 ${
              activeView === "meals"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-emerald-50"
            }`}
          >
            <BarChart3 className="w-5 h-5 ml-2" />
            مدیریت وعده‌ها
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex justify-center gap-4">
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 h-auto text-lg font-medium shadow-lg">
          <Plus className="w-5 h-5 ml-2" />
          افزودن وعده جدید
        </Button>
      </div>
    </motion.div>
  );
};

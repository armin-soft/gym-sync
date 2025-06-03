
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ChefHat, Utensils, Calendar } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DietHeaderProps {
  onAddMeal: () => void;
}

export const DietHeader: React.FC<DietHeaderProps> = ({ onAddMeal }) => {
  const today = new Date();
  const persianDate = new Intl.DateTimeFormat('fa-IR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(today);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-emerald-600 via-cyan-600 to-blue-600 p-8 text-white shadow-2xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4">
          <Utensils className="w-32 h-32 rotate-12" />
        </div>
        <div className="absolute bottom-4 left-4">
          <ChefHat className="w-24 h-24 -rotate-12" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="text-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-2"
          >
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm">
              <Calendar className="w-4 h-4 ml-1" />
              {persianDate}
            </Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
          >
            مدیریت برنامه غذایی
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            طراحی و مدیریت برنامه‌های غذایی هوشمند برای دستیابی به اهداف سلامتی
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onAddMeal}
            size="lg"
            className="bg-white text-emerald-600 hover:bg-white/90 hover:text-emerald-700 shadow-lg transition-all duration-300 text-lg px-8 py-4 rounded-2xl group"
          >
            <Plus className="w-6 h-6 ml-2 transition-transform group-hover:rotate-90 duration-300" />
            افزودن وعده غذایی جدید
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

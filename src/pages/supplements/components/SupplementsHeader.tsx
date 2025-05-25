
import { motion } from "framer-motion";
import { FlaskConical, Pill, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export const SupplementsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
      dir="rtl"
    >
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4" dir="rtl">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-xl sm:rounded-2xl"></div>
              <FlaskConical className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white relative z-10" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0 text-right">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                مدیریت مکمل‌ها و ویتامین‌ها
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-blue-100">
                سازماندهی و مدیریت حرفه‌ای مکمل‌های غذایی و ویتامین‌ها
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <FlaskConical className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-medium">مکمل‌ها</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <Pill className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-medium">ویتامین‌ها</span>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient */}
        <div className="h-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400"></div>
      </Card>
    </motion.div>
  );
};

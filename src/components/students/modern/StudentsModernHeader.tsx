
import { motion } from "framer-motion";
import { Users, Plus, RefreshCw, Sparkles, Star, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentsModernHeaderProps {
  onAddStudent: () => void;
  onRefresh: () => void;
  lastRefreshTime?: Date | null;
  studentsCount: number;
}

export const StudentsModernHeader = ({ 
  onAddStudent, 
  onRefresh, 
  lastRefreshTime, 
  studentsCount 
}: StudentsModernHeaderProps) => {
  return (
    <motion.div 
      className="text-center space-y-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Professional Badge */}
      <motion.div
        className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full px-6 py-3 shadow-xl border border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Crown className="h-5 w-5 text-yellow-300" fill="currentColor" />
        </motion.div>
        <span className="font-bold">مدیریت شاگردان</span>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
        </div>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
          شاگردان
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          مدیریت کامل شاگردان خود را انجام دهید و پیشرفت آنها را پیگیری کنید
        </p>
        
        {/* Student Count Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full px-4 py-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-emerald-700 dark:text-emerald-300 font-medium">
            {toPersianNumbers(studentsCount)} شاگرد
          </span>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onAddStudent}
            className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <div className="relative z-10 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              <span>افزودن شاگرد</span>
            </div>
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onRefresh}
            variant="outline"
            className="relative overflow-hidden border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 font-medium py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              <span>به‌روزرسانی</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Features */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { icon: Users, text: "مدیریت آسان", color: "from-emerald-500 to-teal-600" },
          { icon: Zap, text: "دسترسی سریع", color: "from-cyan-500 to-blue-600" },
          { icon: Sparkles, text: "امکانات پیشرفته", color: "from-purple-500 to-indigo-600" }
        ].map((feature, index) => (
          <motion.div
            key={feature.text}
            className={`flex items-center gap-2 bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <feature.icon className="h-4 w-4" />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Line */}
      <motion.div
        className="flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent flex-1 max-w-24" />
        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
        <div className="h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent flex-1 max-w-24" />
      </motion.div>
    </motion.div>
  );
};

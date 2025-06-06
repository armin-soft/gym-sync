
import React from "react";
import { motion } from "framer-motion";
import { User, Shield, Crown, Star, Zap } from "lucide-react";

export const TrainerProfileHeader: React.FC = () => {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* نشان حرفه‌ای */}
      <motion.div
        className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 via-sky-600 to-slate-600 text-white rounded-full px-8 py-4 shadow-2xl border border-white/20 mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Crown className="h-6 w-6 text-yellow-300" fill="currentColor" />
        </motion.div>
        <span className="font-bold text-lg">مربی حرفه‌ای معتمد</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* عنوان اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-emerald-600 via-sky-600 to-slate-600 bg-clip-text text-transparent leading-tight">
          پروفایل مربی
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
          مدیریت جامع اطلاعات شخصی و حرفه‌ای با امکانات پیشرفته
        </p>
      </motion.div>

      {/* ویژگی‌های کلیدی */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {[
          { icon: Shield, text: "امنیت بالا", color: "from-emerald-500 to-emerald-600" },
          { icon: Zap, text: "به‌روزرسانی فوری", color: "from-sky-500 to-sky-600" },
          { icon: User, text: "رابط کاربرپسند", color: "from-slate-500 to-slate-600" }
        ].map((feature, index) => (
          <motion.div
            key={feature.text}
            className={`flex items-center gap-3 bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-full text-base font-bold shadow-xl`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <feature.icon className="h-5 w-5" />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* خط جداکننده تزئینی */}
      <motion.div
        className="flex items-center justify-center gap-6 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent flex-1 max-w-32" />
        <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-full shadow-lg" />
        <div className="h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent flex-1 max-w-32" />
      </motion.div>
    </motion.div>
  );
};

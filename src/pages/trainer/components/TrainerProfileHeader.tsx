
import React from "react";
import { motion } from "framer-motion";
import { User, Star, Crown, Shield } from "lucide-react";

export const TrainerProfileHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      {/* Professional badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-600 text-white rounded-full px-8 py-4 shadow-2xl mb-8"
      >
        <Crown className="w-6 h-6 text-yellow-300" fill="currentColor" />
        <span className="font-bold text-lg">مربی حرفه‌ای معتمد</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          ))}
        </div>
      </motion.div>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          پروفایل مربی
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          مدیریت کامل اطلاعات شخصی و حرفه‌ای خود را به بهترین شکل تجربه کنید
        </p>
      </motion.div>

      {/* Feature badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-8"
      >
        {[
          { icon: Shield, text: "امنیت بالا", color: "from-emerald-500 to-green-600" },
          { icon: User, text: "کاربرپسند", color: "from-blue-500 to-indigo-600" },
          { icon: Star, text: "کیفیت برتر", color: "from-amber-500 to-orange-600" }
        ].map((feature, index) => (
          <motion.div
            key={feature.text}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
            className={`flex items-center gap-2 bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-default`}
          >
            <feature.icon className="w-5 h-5" />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

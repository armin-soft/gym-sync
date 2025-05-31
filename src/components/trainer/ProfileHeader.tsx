
import { motion } from "framer-motion";
import { User, Shield, Star, Crown, Zap } from "lucide-react";

export const ProfileHeader = () => {
  return (
    <motion.div 
      className="text-center space-y-6"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Professional Badge */}
      <motion.div
        className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full px-6 py-3 shadow-xl border border-white/20"
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
        <span className="font-bold">مربی حرفه‌ای معتمد</span>
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          پروفایل مربی
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          اطلاعات شخصی و حرفه‌ای خود را مدیریت کرده و پروفایل کاملی از خود ایجاد کنید
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {[
          { icon: Shield, text: "امنیت بالا", color: "from-green-500 to-emerald-600" },
          { icon: Zap, text: "به‌روزرسانی سریع", color: "from-orange-500 to-red-600" },
          { icon: User, text: "کاربرپسند", color: "from-blue-500 to-indigo-600" }
        ].map((feature, index) => (
          <motion.div
            key={feature.text}
            className={`flex items-center gap-2 bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
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
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent flex-1 max-w-24" />
        <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full" />
        <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-24" />
      </motion.div>
    </motion.div>
  );
};

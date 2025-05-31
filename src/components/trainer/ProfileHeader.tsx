
import { motion } from "framer-motion";
import { User, Shield, Star } from "lucide-react";

export const ProfileHeader = () => {
  return (
    <motion.div 
      className="text-center space-y-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-full px-4 py-2 shadow-sm"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Shield className="h-4 w-4 text-indigo-600" />
        <span className="text-sm font-medium text-gray-700">مربی معتمد</span>
        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
          پروفایل مربی
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          اطلاعات شخصی و حرفه‌ای خود را مدیریت کرده و پروفایل کاملی از خود ایجاد کنید
        </p>
      </motion.div>

      {/* Decorative Line */}
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mx-auto"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </motion.div>
  );
};

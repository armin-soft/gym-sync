
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export const SelectionHeader = () => {
  return (
    <div className="space-y-6">
      {/* Simple Logo */}
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Crown className="w-8 h-8 text-white" />
      </motion.div>
      
      {/* Simple Title */}
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          انتخاب نوع ورود
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          لطفا نوع کاربری خود را برای ورود به سیستم انتخاب کنید
        </p>
      </div>
    </div>
  );
};


import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function BackupPageHeader() {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={itemVariants} className="text-center mb-6 sm:mb-8 lg:mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-gold-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6">
        <Shield className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gold-600 via-gold-500 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
        مدیریت پشتیبان‌گیری و بازیابی
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
        سیستم پیشرفته حفاظت از اطلاعات شما با امکان پشتیبان‌گیری کامل و بازیابی آسان در هر زمان
      </p>
    </motion.div>
  );
}

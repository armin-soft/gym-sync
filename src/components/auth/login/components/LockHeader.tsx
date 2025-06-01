
import { motion } from "framer-motion";

export const LockHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-red-300 to-orange-300 bg-clip-text text-transparent mb-3">
        حساب کاربری موقتاً قفل شده
      </h1>
      
      <motion.p 
        className="text-white/70 text-sm leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        دسترسی شما به دلیل تلاش‌های ناموفق متعدد محدود شده است
      </motion.p>

      {/* Decorative line */}
      <motion.div
        className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-red-400/50 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      />
    </motion.div>
  );
};

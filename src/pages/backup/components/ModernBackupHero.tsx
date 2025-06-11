
import { motion } from "framer-motion";
import { Shield, Database, Lock, Sparkles } from "lucide-react";

export function ModernBackupHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-sky-50 to-slate-50 dark:from-emerald-950 dark:via-sky-950 dark:to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-emerald-400/20 to-sky-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-sky-400/20 to-emerald-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-24" dir="rtl">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-6 lg:mb-8"
          >
            <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-sky-500 to-slate-600 rounded-2xl lg:rounded-3xl shadow-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            
            {/* Floating Icons */}
            <motion.div
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg flex items-center justify-center"
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Database className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full shadow-lg flex items-center justify-center"
              animate={{ y: [3, -3, 3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </motion.div>
            
            <motion.div
              className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 lg:mb-6"
          >
            <span className="bg-gradient-to-r from-emerald-600 via-sky-600 to-slate-700 bg-clip-text text-transparent">
              مرکز پشتیبان‌گیری هوشمند
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-6 lg:mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            حفاظت پیشرفته از اطلاعات با تکنولوژی‌های نوین امنیت داده
          </motion.p>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4"
          >
            {[
              { text: "رمزگذاری AES-256", color: "from-emerald-500 to-emerald-700" },
              { text: "پشتیبان‌گیری خودکار", color: "from-sky-500 to-sky-700" },
              { text: "بازیابی سریع", color: "from-slate-500 to-slate-700" },
              { text: "امنیت چندلایه", color: "from-emerald-600 to-sky-600" }
            ].map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r ${badge.color} text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg`}
              >
                {badge.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

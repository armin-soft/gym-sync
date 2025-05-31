
import { FileArchive, Sparkles, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function BackupSectionHeader() {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 p-6 sm:p-8 md:p-12 overflow-hidden">
      {/* Advanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl" />
        
        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              right: `${10 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6" dir="rtl">
        {/* Main icon with advanced effects */}
        <motion.div 
          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 group"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          
          {/* Inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-2xl sm:rounded-3xl" />
          
          <FileArchive className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
          
          {/* Floating micro icons */}
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-lg flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-2.5 h-2.5 text-white" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-2 h-2 text-white" />
          </motion.div>
        </motion.div>

        <div className="flex-1 min-w-0 text-right">
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3 leading-tight"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="relative">
              پشتیبان‌گیری کامل و هوشمند
              <motion.div
                className="absolute -inset-1 bg-white/10 blur-lg rounded-lg"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            تمام اطلاعات شما با بالاترین سطح امنیت و فشرده‌سازی در یک فایل محفوظ ذخیره می‌شود
          </motion.p>

          {/* Feature indicators */}
          <motion.div 
            className="flex flex-wrap items-center gap-2 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { icon: Shield, text: "امنیت ۲۵۶-bit" },
              { icon: Zap, text: "فشرده‌سازی هوشمند" },
              { icon: Sparkles, text: "بهینه‌سازی خودکار" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 text-xs sm:text-sm text-white/90">
                <feature.icon className="w-3 h-3" />
                <span>{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

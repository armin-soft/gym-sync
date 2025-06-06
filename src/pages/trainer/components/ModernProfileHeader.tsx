
import { motion } from "framer-motion";
import { Crown, Shield, Star, Zap, Award, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernProfileHeaderProps {
  deviceInfo: any;
}

export const ModernProfileHeader = ({ deviceInfo }: ModernProfileHeaderProps) => {
  const features = [
    { icon: Shield, text: "امنیت بالا", gradient: "from-emerald-500 to-teal-600" },
    { icon: Zap, text: "به‌روزرسانی آنی", gradient: "from-orange-500 to-red-600" },
    { icon: TrendingUp, text: "تحلیل پیشرفته", gradient: "from-blue-500 to-indigo-600" },
    { icon: Award, text: "کیفیت حرفه‌ای", gradient: "from-purple-500 to-pink-600" }
  ];

  return (
    <motion.div 
      className="text-center space-y-8"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* نشان حرفه‌ای */}
      <motion.div
        className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl px-8 py-4 shadow-2xl border border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Crown className="h-7 w-7 text-yellow-300" fill="currentColor" />
        </motion.div>
        
        <div className="text-right">
          <div className="font-bold text-lg">مربی حرفه‌ای معتمد</div>
          <div className="text-sm text-blue-100">سطح طلایی - مجوز رسمی</div>
        </div>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* عنوان اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="space-y-6"
      >
        <h1 className={`font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent leading-tight ${
          deviceInfo.isMobile ? 'text-4xl' : 'text-5xl lg:text-7xl'
        }`}>
          پروفایل مربی حرفه‌ای
        </h1>
        
        <p className={`text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed ${
          deviceInfo.isMobile ? 'text-base' : 'text-lg lg:text-xl'
        }`}>
          سامانه جامع مدیریت اطلاعات مربیان با قابلیت‌های پیشرفته و امکانات حرفه‌ای
        </p>
      </motion.div>

      {/* ویژگی‌ها */}
      <motion.div
        className={`flex flex-wrap items-center justify-center gap-4 ${
          deviceInfo.isMobile ? 'gap-3' : 'gap-6'
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.text}
            className={`flex items-center gap-3 bg-gradient-to-r ${feature.gradient} text-white rounded-xl px-4 py-3 shadow-lg ${
              deviceInfo.isMobile ? 'text-sm' : 'text-base'
            } font-medium`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <feature.icon className={`${deviceInfo.isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* خط تزیینی */}
      <motion.div
        className="flex items-center justify-center gap-6"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-32" />
        <motion.div 
          className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-32" />
      </motion.div>
    </motion.div>
  );
};


import { motion } from "framer-motion";
import { Crown, Sparkles, Shield, Award, Star } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const NewTrainerProfileHeader = () => {
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div 
      className="text-center space-y-8 mb-12"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* لوگو و نشان حرفه‌ای */}
      <motion.div
        className="relative inline-flex items-center justify-center mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative">
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-emerald-600 via-sky-600 to-emerald-700 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center"
            whileHover={{ scale: 1.05, rotateY: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Crown className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
          </motion.div>
          
          {/* نشان‌های کناری */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-3 h-3 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* عنوان اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="space-y-4 sm:space-y-6"
      >
        <h1 className={`font-black leading-tight ${
          deviceInfo.isMobile 
            ? 'text-3xl' 
            : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
        }`}>
          <span className="bg-gradient-to-l from-emerald-700 via-sky-700 to-emerald-800 bg-clip-text text-transparent">
            پروفایل مربی حرفه‌ای
          </span>
        </h1>
        
        <p className={`text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed ${
          deviceInfo.isMobile 
            ? 'text-sm' 
            : 'text-base sm:text-lg md:text-xl lg:text-2xl'
        }`}>
          سامانه مدیریت پیشرفته اطلاعات مربیان با رابط کاربری مدرن و امکانات حرفه‌ای
        </p>
      </motion.div>

      {/* نشان‌های ویژگی */}
      <motion.div
        className={`flex flex-wrap items-center justify-center gap-4 ${
          deviceInfo.isMobile ? 'gap-3' : 'gap-6'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {[
          { icon: Shield, text: "تایید شده", gradient: "from-emerald-500 to-teal-600" },
          { icon: Award, text: "حرفه‌ای", gradient: "from-sky-500 to-blue-600" },
          { icon: Star, text: "ممتاز", gradient: "from-purple-500 to-pink-600" }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-2 bg-gradient-to-r ${feature.gradient} text-white rounded-xl px-4 py-2 shadow-lg`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <feature.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>
      
      {/* خط جداکننده */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
        className="mx-auto mt-8 h-px max-w-md bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-600 to-transparent"
      />
    </motion.div>
  );
};


import { motion } from "framer-motion";
import { Crown, Sparkles, Shield } from "lucide-react";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    },
  },
};

export const SelectionHeader = () => {
  return (
    <motion.div variants={itemVariants} className="space-y-8">
      {/* Logo Section */}
      <div className="relative">
        <motion.div 
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl mb-6 border border-white/20"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Crown className="w-10 h-10 text-yellow-300" fill="currentColor" />
        </motion.div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full border border-white shadow-md"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      
      {/* Main Title */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
          انتخاب نوع ورود
        </h1>
        <div className="flex items-center justify-center gap-3 text-gray-300">
          <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent flex-1 max-w-20" />
          <Sparkles className="h-5 w-5 text-violet-400" />
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 max-w-20" />
        </div>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          لطفا نوع کاربری خود را برای ورود به سیستم انتخاب کنید
        </p>
      </div>

      {/* Features Badge */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {[
          { icon: Shield, text: "امنیت بالا", color: "from-green-500 to-emerald-600" },
          { icon: Sparkles, text: "تجربه مدرن", color: "from-violet-500 to-purple-600" },
          { icon: Crown, text: "کیفیت حرفه‌ای", color: "from-yellow-500 to-orange-600" }
        ].map((feature, index) => (
          <motion.div
            key={feature.text}
            className={`flex items-center gap-2 bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm border border-white/20`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <feature.icon className="h-4 w-4" />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

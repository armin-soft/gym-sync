
import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";

export const ModernSelectionHeader = () => {
  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div variants={headerVariants} className="space-y-8">
      {/* Logo/Icon Section */}
      <div className="relative inline-block">
        <motion.div
          className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Crown className="w-12 h-12 text-white" />
        </motion.div>
        
        {/* Floating Sparkles */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400"
          animate={{ 
            rotate: 360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-2 -left-2 w-4 h-4 text-cyan-400"
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, delay: 0.5 }
          }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </div>
      
      {/* Main Title */}
      <div className="space-y-4">
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          انتخاب نوع ورود
        </motion.h1>
        
        <motion.div
          className="mx-auto h-1 w-32 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 0.6, duration: 1 }}
        />
      </div>
      
      {/* Subtitle */}
      <motion.p 
        className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        لطفا نوع کاربری خود را انتخاب کنید تا به پنل مناسب هدایت شوید
      </motion.p>
      
      {/* Professional Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white/90"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <Crown className="w-5 h-5 text-yellow-400" />
        <span className="font-medium">سیستم مدیریت حرفه‌ای</span>
        <Crown className="w-5 h-5 text-yellow-400" />
      </motion.div>
    </motion.div>
  );
};

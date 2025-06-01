
import { motion } from "framer-motion";
import { Pill, Heart, Sparkles, FlaskConical } from "lucide-react";

export const SupplementsPageHeader = () => {
  return (
    <div className="relative bg-gradient-to-l from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-10 right-20 text-white/20"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Pill className="h-16 w-16" />
      </motion.div>
      
      <motion.div 
        className="absolute top-32 left-32 text-white/20"
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Heart className="h-12 w-12" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 right-40 text-white/20"
        animate={{ 
          y: [0, -8, 0],
          x: [0, 5, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <FlaskConical className="h-14 w-14" />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm"
            >
              <Sparkles className="h-10 w-10" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold"
            >
              مکمل‌ها و ویتامین‌ها
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed"
          >
            مدیریت کامل مکمل‌ها و ویتامین‌های مورد نیاز ورزشکاران
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center justify-center gap-6 text-white/80"
          >
            <div className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              <span className="font-medium">مکمل‌های غذایی</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="font-medium">ویتامین‌ها</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              <span className="font-medium">دسته‌بندی‌ها</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

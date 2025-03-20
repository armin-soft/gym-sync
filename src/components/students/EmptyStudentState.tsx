
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, UsersRound, XCircle, School, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStudentStateProps {
  isSearching: boolean;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const EmptyStudentState = ({ 
  isSearching, 
  onAddStudent, 
  onClearSearch 
}: EmptyStudentStateProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const floatingCircle = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  if (isSearching) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center text-center space-y-6 py-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="relative">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -inset-10 bg-amber-500/10 rounded-full opacity-75" 
          />
          <div className="relative flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-600/20 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-amber-400/30 to-amber-600/30 flex items-center justify-center">
                <motion.div 
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20"
                  animate={{
                    boxShadow: [
                      "0 10px 15px -3px rgba(251, 191, 36, 0.3)",
                      "0 20px 30px -6px rgba(251, 191, 36, 0.4)",
                      "0 10px 15px -3px rgba(251, 191, 36, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <XCircle className="h-10 w-10 text-white" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div variants={item} className="space-y-3 max-w-md">
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            نتیجه‌ای یافت نشد
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            با معیارهای جستجوی فعلی هیچ شاگردی پیدا نشد. لطفاً معیارهای جستجو را تغییر دهید.
          </p>
        </motion.div>
        <motion.div 
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            onClick={onClearSearch}
            className="px-6 py-2 h-14 rounded-full border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow gap-2 group"
          >
            <Search className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">پاک کردن جستجو</span>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center space-y-8 py-16"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="relative">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -inset-12 bg-indigo-500/10 rounded-full opacity-75" 
        />
        <div className="relative flex items-center justify-center">
          <motion.div
            variants={floatingCircle}
            animate="animate"
            className="absolute -top-12 -right-6 w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400/60 to-sky-400/60"
          />
          <motion.div
            variants={floatingCircle}
            animate="animate"
            transition={{ delay: 1 }}
            className="absolute -bottom-10 -left-8 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400/60 to-indigo-400/60"
          />
          
          <div className="w-36 h-36 rounded-full bg-gradient-to-r from-indigo-400/20 to-indigo-600/20 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-400/30 to-indigo-600/30 flex items-center justify-center">
              <motion.div 
                className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20"
                animate={{
                  boxShadow: [
                    "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
                    "0 20px 30px -6px rgba(99, 102, 241, 0.4)",
                    "0 10px 15px -3px rgba(99, 102, 241, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <School className="h-10 w-10 text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div variants={item} className="space-y-4 max-w-md">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
          هیچ شاگردی یافت نشد
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          برای شروع، اولین شاگرد خود را اضافه کنید تا برنامه‌های تمرینی و غذایی را مدیریت کنید
        </p>
      </motion.div>
      <motion.div 
        variants={item}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onAddStudent}
          className="px-8 py-7 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 text-lg font-medium relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/10 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/20 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_2s_infinite]"></span>
          <div className="relative flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            افزودن شاگرد جدید
          </div>
        </Button>
      </motion.div>
    </motion.div>
  );
};

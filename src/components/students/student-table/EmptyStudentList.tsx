
import React from "react";
import { motion } from "framer-motion";
import { User, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStudentListProps {
  searchQuery: string;
  onClearSearch: () => void;
  onAddStudent: () => void;
}

export const EmptyStudentList: React.FC<EmptyStudentListProps> = ({
  searchQuery,
  onClearSearch,
  onAddStudent
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-16 text-muted-foreground"
    >
      <motion.div 
        variants={itemVariants}
        className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 opacity-50" />
        <User className="h-10 w-10 text-slate-400 relative z-10" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 to-violet-100/40 dark:from-indigo-900/20 dark:to-violet-900/20"
          animate={{ 
            rotate: [0, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5, 
            ease: "linear"
          }}
        />
      </motion.div>
      
      <motion.p 
        variants={itemVariants}
        className="font-medium text-lg mb-3"
      >
        هیچ شاگردی یافت نشد
      </motion.p>
      
      <motion.p 
        variants={itemVariants}
        className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center max-w-sm"
      >
        {searchQuery 
          ? "هیچ شاگردی با عبارت جستجو شده مطابقت ندارد. جستجوی دیگری انجام دهید یا فیلترها را پاک کنید."
          : "شما هنوز هیچ شاگردی اضافه نکرده‌اید. برای شروع، شاگرد جدیدی اضافه کنید."
        }
      </motion.p>
      
      {searchQuery ? (
        <motion.div variants={itemVariants}>
          <Button 
            variant="outline" 
            onClick={onClearSearch}
            className="gap-2 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FilterX className="h-4 w-4" />
            پاک کردن جستجو
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={onAddStudent}
            className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/30 transition-all duration-300"
          >
            <User className="h-4 w-4" />
            افزودن شاگرد جدید
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

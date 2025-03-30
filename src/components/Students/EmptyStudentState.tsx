
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Filter, X } from "lucide-react";

interface EmptyStudentStateProps {
  isSearching: boolean;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const EmptyStudentState: React.FC<EmptyStudentStateProps> = ({
  isSearching,
  onAddStudent,
  onClearSearch
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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

  if (isSearching) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-10 py-16 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-muted bg-muted/30"
      >
        <motion.div 
          variants={itemVariants}
          className="relative mb-4"
        >
          <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-3xl opacity-30"></div>
          <div className="w-20 h-20 rounded-full bg-amber-400/10 flex items-center justify-center relative">
            <Search className="h-10 w-10 text-amber-500" />
          </div>
        </motion.div>
        
        <motion.h3 variants={itemVariants} className="text-xl font-bold text-foreground mb-2">
          جستجوی شما نتیجه‌ای نداشت
        </motion.h3>
        
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-md mb-6">
          شاگردی با این مشخصات یافت نشد. لطفاً معیارهای جستجو را تغییر دهید یا شاگرد جدیدی اضافه کنید.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex gap-3">
          <Button 
            onClick={onClearSearch}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <X className="h-5 w-5" />
            <span>پاک کردن جستجو</span>
          </Button>
          
          <Button 
            onClick={onAddStudent}
            size="lg"
            className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-primary/20"
          >
            <UserPlus className="h-5 w-5" />
            <span>افزودن شاگرد جدید</span>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-10 py-16 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-muted bg-muted/30"
    >
      <motion.div 
        variants={itemVariants}
        className="relative mb-4"
      >
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center relative">
          <UserPlus className="h-10 w-10 text-primary" />
        </div>
      </motion.div>
      
      <motion.h3 variants={itemVariants} className="text-xl font-bold text-foreground mb-2">
        هنوز هیچ شاگردی اضافه نکرده‌اید
      </motion.h3>
      
      <motion.p variants={itemVariants} className="text-muted-foreground max-w-md mb-6">
        برای شروع مدیریت شاگردان باشگاه، اولین شاگرد خود را اضافه کنید.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <Button 
          onClick={onAddStudent}
          size="lg"
          className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-primary/20"
        >
          <UserPlus className="h-5 w-5" />
          <span>افزودن شاگرد جدید</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

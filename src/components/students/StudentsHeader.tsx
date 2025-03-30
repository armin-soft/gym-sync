
import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Star, Medal } from "lucide-react";
import { motion } from "framer-motion";

interface StudentsHeaderProps {
  onAddStudent: () => void;
}

export const StudentsHeader: React.FC<StudentsHeaderProps> = ({ onAddStudent }) => {
  const headerIconVariants = {
    initial: { scale: 0.8, opacity: 0, rotateY: -30 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotateY: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.1
      }
    }
  };

  const headerTextVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.3
      }
    },
    hover: { 
      scale: 1.05, 
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-6">
          <motion.div
            variants={headerIconVariants}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 relative z-10 overflow-hidden border-2 border-white dark:border-gray-800">
              <div className="absolute inset-0 w-full h-full bg-white/10 transform scale-0 hover:scale-100 transition-transform duration-500 origin-bottom-right" />
              
              <div className="absolute top-2 right-2">
                <Star className="h-3 w-3 fill-white text-white opacity-70" />
              </div>
              
              <GraduationCap className="h-10 w-10" strokeWidth={1.5} />
              
              <div className="absolute -bottom-1 -left-1">
                <Medal className="h-6 w-6 text-amber-200" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-indigo-500/20 blur-xl rounded-full -z-10 scale-[0.7] translate-y-1/4"></div>
          </motion.div>
          
          <div className="flex flex-col">
            <motion.h1 
              variants={headerTextVariants}
              initial="initial"
              animate="animate"
              className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-gray-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent"
            >
              مدیریت شاگردان
            </motion.h1>
            
            <motion.p 
              variants={headerTextVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="text-slate-500 dark:text-slate-400 mt-2 text-lg"
            >
              مدیریت اطلاعات، برنامه‌های تمرینی و غذایی شاگردان
            </motion.p>
          </div>
        </div>
        
        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={onAddStudent}
            size="lg"
            className="relative h-14 pr-6 pl-12 bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 rounded-xl"
          >
            <span className="absolute left-0 top-0 bottom-0 w-12 bg-white/20 rounded-l-xl flex items-center justify-center">
              <Plus className="h-6 w-6" strokeWidth={2.5} />
            </span>
            <span className="font-medium text-base">افزودن شاگرد جدید</span>
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 flex items-center justify-start"
      >
        <div className="h-1 w-28 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></div>
        <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full"></div>
      </motion.div>
    </div>
  );
};

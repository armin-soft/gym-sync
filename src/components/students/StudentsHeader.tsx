
import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

interface StudentsHeaderProps {
  onAddStudent: () => void;
}

export const StudentsHeader = ({ onAddStudent }: StudentsHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex items-start gap-5">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25 relative z-10 overflow-hidden">
              <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-right"></div>
              <GraduationCap className="h-10 w-10" strokeWidth={1.5} />
            </div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-indigo-500/20 blur-xl rounded-full -z-10 scale-[0.7] translate-y-1/4"></div>
          </motion.div>
          
          <div className="flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent"
            >
              مدیریت شاگردان
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-500 dark:text-slate-400 mt-2 text-lg"
            >
              مدیریت اطلاعات، برنامه‌های تمرینی و غذایی شاگردان
            </motion.p>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            onClick={onAddStudent}
            size="lg"
            className="relative h-14 pr-6 pl-12 bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-700 hover:to-violet-800 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group rounded-xl"
          >
            <span className="absolute -left-2 -top-2 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-6 w-6" strokeWidth={2.5} />
            </span>
            <span className="font-medium text-base">افزودن شاگرد جدید</span>
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 flex items-center justify-start"
      >
        <div className="h-1 w-28 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></div>
        <div className="h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full"></div>
      </motion.div>
    </motion.div>
  );
};

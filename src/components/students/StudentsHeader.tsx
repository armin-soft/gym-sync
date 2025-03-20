
import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Users, School, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

interface StudentsHeaderProps {
  onAddStudent: () => void;
}

export const StudentsHeader = ({ onAddStudent }: StudentsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/0 via-indigo-400/20 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_2s_infinite]"></div>
          <School className="h-8 w-8 z-10 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent"
          >
            شاگردان
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-500 dark:text-slate-400 mt-1 text-lg"
          >
            مدیریت و پیگیری پیشرفت شاگردان
          </motion.p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onAddStudent}
          size="lg"
          className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/20 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_2s_infinite]"></span>
          <div className="relative flex items-center">
            <UserPlus className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-medium">افزودن شاگرد جدید</span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};

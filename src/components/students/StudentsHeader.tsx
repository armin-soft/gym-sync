
import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Users } from "lucide-react";
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
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
          <GraduationCap className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent">
            شاگردان
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            مدیریت و پیگیری پیشرفت شاگردان
          </p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          onClick={onAddStudent}
          size="lg"
          className="bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1"
        >
          <Plus className="ml-2 h-5 w-5" />
          افزودن شاگرد جدید
        </Button>
      </motion.div>
    </div>
  );
};

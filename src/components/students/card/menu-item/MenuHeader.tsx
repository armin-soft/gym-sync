
import React from "react";
import { motion } from "framer-motion";
import { Student } from "../../StudentTypes";

interface MenuHeaderProps {
  student: Student;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({ student }) => {
  return (
    <motion.div 
      className="px-2 py-1.5 mb-1 border-b border-slate-100 dark:border-slate-800/90"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">{student.name}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">منوی مدیریت شاگرد</p>
    </motion.div>
  );
};

export default MenuHeader;

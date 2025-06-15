
import React from "react";
import { motion } from "framer-motion";

const StudentDiet = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8"
      dir="rtl"
    >
      <div className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/30">
        <h1 className="text-3xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-2">
          برنامه غذایی
        </h1>
        <p className="text-lg text-muted-foreground">
          رژیم غذایی و وعده‌های اختصاص‌داده‌شده
        </p>
      </div>
      
      <div className="text-center text-muted-foreground">
        <p>صفحه برنامه غذایی شاگرد در حال توسعه است...</p>
      </div>
    </motion.div>
  );
};

export default StudentDiet;

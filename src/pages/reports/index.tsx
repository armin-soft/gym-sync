
import React from "react";
import { motion } from "framer-motion";
import { ReportsContainer } from "./components/ReportsContainer";
import { ReportsHeader } from "./components/ReportsHeader";
import { ReportsContent } from "./components/ReportsContent";

const ReportsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40"
      dir="rtl"
    >
      <ReportsContainer>
        <ReportsHeader />
        <ReportsContent />
      </ReportsContainer>
    </motion.div>
  );
};

export default ReportsPage;

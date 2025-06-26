import React from "react";
import { motion } from "framer-motion";

export const NavigationFooter: React.FC = () => {
  return (
    <motion.div
      className="mt-6 pt-4 border-t border-emerald-200/30 dark:border-emerald-700/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
    </motion.div>
  );
};

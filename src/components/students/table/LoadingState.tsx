
import React from "react";
import { motion } from "framer-motion";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "در حال بارگذاری..." 
}) => {
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      key="loading"
      variants={loadingVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-[400px] flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-100 dark:border-slate-700"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-blue-500 animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          {message}
        </p>
      </div>
    </motion.div>
  );
};

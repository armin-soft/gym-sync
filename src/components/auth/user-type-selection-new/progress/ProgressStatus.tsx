
import React from "react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProgressStatusProps {
  currentStep: number;
  totalSteps: number;
  stepDescription: string;
}

export const ProgressStatus: React.FC<ProgressStatusProps> = ({ 
  currentStep, 
  totalSteps, 
  stepDescription 
}) => {
  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50"
    >
      <div className="flex items-center justify-center gap-3 mb-3">
        <motion.div
          className="w-2 h-2 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-slate-700 dark:text-slate-200 font-medium">
          {stepDescription}
        </span>
      </div>
      
      <p className="text-sm text-slate-500 dark:text-slate-400">
        مرحله {toPersianNumbers(currentStep.toString())} از {toPersianNumbers(totalSteps.toString())}
      </p>
    </motion.div>
  );
};

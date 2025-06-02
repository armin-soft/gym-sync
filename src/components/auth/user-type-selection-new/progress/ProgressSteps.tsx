
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProgressStep {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepsProps {
  steps: ProgressStep[];
  currentStep: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative mb-12">
      {/* خط پس‌زمینه */}
      <div className="absolute top-6 right-6 left-6 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
      
      {/* خط پیشرفت */}
      <motion.div
        className="absolute top-6 right-6 h-1 bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* مراحل */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 ${
                currentStep > step.id
                  ? 'bg-green-500 border-green-500'
                  : currentStep === step.id
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-slate-200 dark:bg-slate-700 border-slate-200 dark:border-slate-700'
              }`}
              animate={currentStep === step.id ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              {currentStep > step.id ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : currentStep === step.id ? (
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <span className="text-slate-500 dark:text-slate-400 font-bold">
                  {toPersianNumbers(step.id.toString())}
                </span>
              )}
            </motion.div>
            
            <div className="mt-4 text-center">
              <div className={`text-sm font-semibold ${
                currentStep >= step.id 
                  ? 'text-slate-900 dark:text-white' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {step.title}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

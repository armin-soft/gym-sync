
import React from "react";
import { motion } from "framer-motion";
import { Check, Loader, ArrowRight } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  selectedType: 'management' | 'student' | null;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  selectedType
}) => {
  const getTypeGradient = () => {
    return selectedType === 'management' 
      ? 'from-emerald-600 to-sky-600' 
      : 'from-sky-600 to-emerald-600';
  };

  const getStepIcon = (stepId: number) => {
    if (stepId < currentStep) return Check;
    if (stepId === currentStep) return Loader;
    return ArrowRight;
  };

  return (
    <div className="space-y-4 mb-8">
      {steps.map((step, index) => {
        const Icon = getStepIcon(step.id);
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`
              flex items-center gap-4 p-4 rounded-xl transition-all duration-300
              ${isActive 
                ? `bg-gradient-to-r ${getTypeGradient()} text-white shadow-lg` 
                : isCompleted
                ? 'bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }
            `}
          >
            <div className={`
              p-2 rounded-full transition-all duration-300
              ${isActive 
                ? 'bg-white/20' 
                : isCompleted
                ? 'bg-green-200 dark:bg-green-800'
                : 'bg-slate-200 dark:bg-slate-700'
              }
            `}>
              {isActive ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
              ) : (
                <Icon className="w-4 h-4" />
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-sm">{step.title}</h4>
              <p className={`
                text-xs mt-1 
                ${isActive 
                  ? 'text-white/80' 
                  : isCompleted
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-slate-500 dark:text-slate-400'
                }
              `}>
                {step.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

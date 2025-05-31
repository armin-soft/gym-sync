
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SelectionStep } from "./TypeDaySelection";

interface SelectionNavigationProps {
  currentStep: SelectionStep;
  canGoBack: boolean;
  onBack: () => void;
}

export const SelectionNavigation: React.FC<SelectionNavigationProps> = ({
  currentStep,
  canGoBack,
  onBack
}) => {
  if (!canGoBack) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center"
    >
      <Button
        variant="outline"
        onClick={onBack}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg"
      >
        <ArrowRight className="w-4 h-4 ml-2" />
        بازگشت به انتخاب نوع تمرین
      </Button>
    </motion.div>
  );
};

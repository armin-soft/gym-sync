
import React from "react";
import { Plus, Download, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ExercisePageHeaderProps {
  onAddExercise?: () => void;
  onDownload?: () => void;
  onRefresh?: () => void;
  exerciseCount?: number;
}

export const ExercisePageHeader: React.FC<ExercisePageHeaderProps> = ({
  onAddExercise,
  onDownload,
  onRefresh,
  exerciseCount = 0
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
      <div className="flex flex-col items-center sm:items-start">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold brand-text-gradient"
        >
          مدیریت تمرینات
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-sm text-muted-foreground mt-1"
        >
          مجموعاً {exerciseCount} تمرین ثبت شده
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-center gap-3"
      >
        {onRefresh && (
          <Button
            size="sm"
            variant="outline"
            onClick={onRefresh}
            className="flex items-center gap-1.5 border-orange-200/80 dark:border-orange-700/80 hover:border-orange-300 dark:hover:border-orange-600/60 hover:shadow-brand-orange transition-all duration-300"
          >
            <RotateCw className="h-4 w-4 mr-1 brand-text-primary" />
            <span>بروزرسانی</span>
          </Button>
        )}
        
        {onDownload && (
          <Button
            size="sm"
            variant="outline"
            onClick={onDownload}
            className="flex items-center gap-1.5 border-gold-200/80 dark:border-gold-700/80 hover:border-gold-300 dark:hover:border-gold-600/60 hover:shadow-brand-gold transition-all duration-300"
          >
            <Download className="h-4 w-4 mr-1 brand-text-secondary" />
            <span>خروجی</span>
          </Button>
        )}
        
        {onAddExercise && (
          <Button
            size="sm"
            onClick={onAddExercise}
            className="flex items-center gap-1.5 brand-bg-primary hover:bg-orange-600 shadow-brand-orange hover:shadow-lg transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>افزودن تمرین</span>
          </Button>
        )}
      </motion.div>
    </div>
  );
};

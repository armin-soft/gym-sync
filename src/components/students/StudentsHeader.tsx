
import React from "react";
import { Plus, RotateCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useBrandTheme } from "@/hooks/use-brand-theme";

interface StudentsHeaderProps {
  onAddStudent: () => void;
  onRefresh?: () => void;
  lastRefreshTime?: Date;
  onDownload?: () => void;
}

export const StudentsHeader: React.FC<StudentsHeaderProps> = ({ 
  onAddStudent,
  onRefresh,
  onDownload
}) => {
  const { getGradientClass, colors } = useBrandTheme();
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
      <div className="flex flex-col items-center sm:items-start">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold bg-gradient-to-br from-brand-primary to-brand-secondary bg-clip-text text-transparent"
        >
          شاگردان
        </motion.h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {onDownload && (
            <Button
              size="sm"
              variant="outline"
              onClick={onDownload}
              className="flex items-center gap-1.5 border-brand-primary/20 hover:border-brand-primary/40 hover:bg-brand-primary/10 shadow-sm transition-all duration-300"
            >
              <Download className="h-4 w-4 mr-1 text-brand-primary" />
              <span>خروجی برنامه</span>
            </Button>
          )}
          
          {onRefresh && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRefresh}
              className="flex items-center gap-1.5 border-brand-dark/20 hover:border-brand-dark/40 hover:bg-brand-dark/10 shadow-sm transition-all duration-300"
            >
              <RotateCw className="h-4 w-4 mr-1 text-brand-dark" />
              <span>بروزرسانی</span>
            </Button>
          )}
          
          <Button
            size="sm"
            variant="gradient"
            onClick={onAddStudent}
            className="flex items-center gap-1.5 shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>افزودن شاگرد</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

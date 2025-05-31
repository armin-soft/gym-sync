
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useBrandTheme } from "@/hooks/use-brand-theme";

interface StudentCardFooterProps {
  onEdit: () => void;
}

export const StudentCardFooter: React.FC<StudentCardFooterProps> = ({ onEdit }) => {
  const { colors } = useBrandTheme();
  
  return (
    <div className="w-full">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onEdit}
          variant="ghost"
          className="w-full rounded-lg justify-between bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 
                   hover:from-brand-primary/10 hover:to-brand-secondary/10 border border-brand-primary/20 
                   dark:from-brand-primary/10 dark:to-brand-secondary/10 dark:hover:from-brand-primary/20 dark:hover:to-brand-secondary/20 
                   dark:border-brand-primary/30 dark:hover:border-brand-primary/40 text-sm"
        >
          <span className="text-brand-dark">مشاهده جزئیات</span>
          <ArrowUpRight className="h-4 w-4 text-brand-primary" />
        </Button>
      </motion.div>
    </div>
  );
};

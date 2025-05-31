
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface StudentCardFooterProps {
  onEdit: () => void;
}

export const StudentCardFooter: React.FC<StudentCardFooterProps> = ({ onEdit }) => {
  return (
    <div className="w-full">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onEdit}
          variant="ghost"
          className="w-full rounded-lg justify-between bg-gradient-to-r from-black-50 to-black-100 
                   hover:from-orange-50 hover:to-gold-50 border border-black-200 
                   dark:from-black-800/50 dark:to-black-900/50 dark:hover:from-orange-900/20 dark:hover:to-gold-800/20 
                   dark:border-black-700/50 dark:hover:border-orange-800/40 text-sm"
        >
          <span>مشاهده جزئیات</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
};

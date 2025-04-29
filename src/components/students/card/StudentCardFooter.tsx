
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { motion } from "framer-motion";

interface StudentCardFooterProps {
  onEdit: () => void;
}

export const StudentCardFooter: React.FC<StudentCardFooterProps> = ({ onEdit }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onEdit}
        className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
      >
        <Edit className="mr-1 h-3.5 w-3.5" />
        ویرایش شاگرد
      </Button>
    </motion.div>
  );
};


import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, CheckCircle } from "lucide-react";

interface CardIconProps {
  Icon: LucideIcon;
  gradient: string;
  isSelected: boolean;
}

export const CardIcon: React.FC<CardIconProps> = ({ Icon, gradient, isSelected }) => {
  return (
    <motion.div
      className="flex justify-center mb-6"
      animate={isSelected ? { rotate: [0, 5, -5, 0] } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className={`relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${gradient} rounded-2xl shadow-xl flex items-center justify-center`}>
        <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        
        {/* نشان انتخاب */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

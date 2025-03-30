
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

// A custom component that wraps the Clock icon with animation
const Motion: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.div
      animate={{ 
        rotate: [0, 15, 0, -15, 0], 
        scale: [1, 1.05, 1, 1.05, 1] 
      }}
      transition={{ 
        duration: 1.5, 
        ease: "easeInOut", 
        repeat: Infinity, 
        repeatDelay: 1 
      }}
      className={className}
    >
      <Clock className="w-full h-full" />
    </motion.div>
  );
};

export default Motion;


import React from "react";
import { motion } from "framer-motion";
import { Pill, ShieldCheck } from "lucide-react";

interface SupplementsLoadingProps {
  type?: 'supplement' | 'vitamin';
}

export const SupplementsLoading: React.FC<SupplementsLoadingProps> = ({ type = 'supplement' }) => {
  const Icon = type === 'supplement' ? Pill : ShieldCheck;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="space-y-4 text-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="h-12 w-12 mx-auto bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center"
        >
          <Icon className="h-6 w-6 text-white" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg font-medium text-indigo-700 dark:text-indigo-300">
            در حال بارگذاری...
          </p>
          <p className="text-sm text-muted-foreground">
            لطفاً کمی صبر کنید
          </p>
        </motion.div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-indigo-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

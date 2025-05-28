
import React from "react";
import { motion } from "framer-motion";
import { FlaskConical, Pill, Sparkles } from "lucide-react";

interface SupplementsLoadingProps {
  type: 'supplement' | 'vitamin';
}

export const SupplementsLoading: React.FC<SupplementsLoadingProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8" dir="rtl">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.1 
        }}
        className="relative mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
          {type === 'supplement' ? (
            <FlaskConical className="w-12 h-12 text-white" />
          ) : (
            <Pill className="w-12 h-12 text-white" />
          )}
        </div>
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          در حال بارگذاری {type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          لطفاً صبر کنید تا اطلاعات بارگذاری شود...
        </p>
      </motion.div>

      {/* Loading animation dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-2 mt-6"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

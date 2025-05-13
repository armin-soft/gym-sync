
import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ExerciseDialogLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 dark:text-gray-400 font-medium"
      >
        در حال بارگذاری تمرین‌ها...
      </motion.p>
    </div>
  );
};

export default ExerciseDialogLoading;

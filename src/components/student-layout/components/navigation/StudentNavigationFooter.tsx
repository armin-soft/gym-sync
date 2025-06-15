
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const StudentNavigationFooter: React.FC = () => {
  return (
    <motion.div
      className="mt-6 pt-4 border-t border-emerald-200/30 dark:border-emerald-700/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
          <Heart className="h-4 w-4 fill-current" />
          <span className="text-xs font-medium">ساخته شده با عشق</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          نسخه {toPersianNumbers("7.0.2")}
        </p>
      </div>
    </motion.div>
  );
};

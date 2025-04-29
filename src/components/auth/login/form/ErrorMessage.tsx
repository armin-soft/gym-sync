
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="p-2 sm:p-3 rounded-md bg-red-600/15 border-2 border-red-600/30 text-red-700 text-xs sm:text-sm font-medium shadow-sm"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

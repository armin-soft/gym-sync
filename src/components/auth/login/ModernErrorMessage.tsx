
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ModernErrorMessageProps {
  error: string;
}

export const ModernErrorMessage = ({ error }: ModernErrorMessageProps) => {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative p-4 border border-red-400/30 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-red-200 font-medium">{error}</p>
              </div>
            </div>
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-red-400/50"
              animate={{
                borderColor: ["rgba(248, 113, 113, 0.3)", "rgba(248, 113, 113, 0.6)", "rgba(248, 113, 113, 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

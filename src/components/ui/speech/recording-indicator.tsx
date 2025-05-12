
import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface RecordingIndicatorProps {
  isRecording: boolean;
}

export const RecordingIndicator = ({ isRecording }: RecordingIndicatorProps) => {
  return (
    <AnimatePresence>
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-center"
        >
          <Badge 
            variant="outline" 
            className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 flex items-center gap-1.5"
          >
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            در حال ضبط صدا...
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

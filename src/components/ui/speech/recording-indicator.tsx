
import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";

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
            className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 flex items-center gap-1.5 py-1 px-2"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center"
            >
              <Mic className="h-3 w-3" />
            </motion.div>
            در حال ضبط صدا به فارسی...
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

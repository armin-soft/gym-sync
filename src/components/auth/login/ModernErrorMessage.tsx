
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ModernErrorMessageProps {
  error: string;
}

export const ModernErrorMessage = ({ error }: ModernErrorMessageProps) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.4
          }}
          className="mb-6"
        >
          <div className="relative overflow-hidden rounded-2xl">
            {/* Glass morphism background */}
            <div className="absolute inset-0 bg-red-500/20 backdrop-blur-xl border border-red-400/30 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-orange-400/10 to-yellow-400/10 rounded-2xl"></div>
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-red-400/40"
              animate={{
                borderColor: [
                  "rgba(248, 113, 113, 0.4)",
                  "rgba(251, 146, 60, 0.6)",
                  "rgba(248, 113, 113, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <div className="relative z-10 p-4">
              <div className="flex items-start gap-3">
                {/* Icon container */}
                <motion.div
                  className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-xl flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <AlertTriangle className="h-4 w-4 text-red-200" />
                </motion.div>
                
                {/* Error text */}
                <div className="flex-1 min-w-0">
                  <motion.p 
                    className="text-red-100 text-sm font-medium leading-relaxed text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {error}
                  </motion.p>
                </div>
                
                {/* Pulse indicator */}
                <motion.div
                  className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              
              {/* Bottom accent line */}
              <motion.div
                className="mt-3 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BackupActionButtonProps {
  onBackup: () => void;
  isLoading: boolean;
  backupSuccess: boolean;
}

export function BackupActionButton({ onBackup, isLoading, backupSuccess }: BackupActionButtonProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Button
        onClick={onBackup}
        disabled={isLoading}
        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 hover:from-emerald-600 hover:via-sky-600 hover:to-emerald-700 text-white border-0 shadow-2xl rounded-2xl transition-all duration-500 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3"
            >
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>در حال پشتیبان‌گیری...</span>
            </motion.div>
          ) : backupSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="w-6 h-6" />
              <span>پشتیبان‌گیری موفق!</span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3"
            >
              <Download className="w-6 h-6" />
              <span>شروع پشتیبان‌گیری</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </Button>
    </motion.div>
  );
}

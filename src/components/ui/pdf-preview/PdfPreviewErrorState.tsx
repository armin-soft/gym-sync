
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfPreviewErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const PdfPreviewErrorState: React.FC<PdfPreviewErrorStateProps> = ({
  error,
  onRetry,
}) => {
  return (
    <div className="flex-1 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Error Icon with Animation */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 0.6, repeat: Infinity, repeatDelay: 2 },
            scale: { duration: 1, repeat: Infinity, repeatDelay: 1.5 }
          }}
          className="relative mb-8 mx-auto w-24 h-24"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-orange-200 dark:from-red-800/50 dark:to-orange-800/50 rounded-full blur-xl opacity-60"></div>
          <div className="relative w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center border-4 border-red-200 dark:border-red-800/50">
            <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center justify-center gap-2">
            <FileX className="w-6 h-6 text-red-500" />
            خطا در بارگیری
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-2 font-medium">
            {error}
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            لطفاً اتصال اینترنت خود را بررسی کرده و مجدداً تلاش کنید
          </p>
        </motion.div>

        {/* Retry Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            onClick={onRetry}
            className="gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-red-500/30 transition-all duration-200 px-8 py-3 text-lg font-medium relative overflow-hidden group"
          >
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            
            <div className="relative flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              <span>تلاش مجدد</span>
            </div>
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-red-200/30 to-orange-200/30 dark:from-red-800/20 dark:to-orange-800/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 dark:from-orange-800/20 dark:to-yellow-800/20 rounded-full blur-2xl"></div>
      </motion.div>
    </div>
  );
};

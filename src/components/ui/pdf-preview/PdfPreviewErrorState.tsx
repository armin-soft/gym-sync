
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
    <div className="flex-1 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center">
              <FileX className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            
            {/* Warning indicator */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            >
              <AlertTriangle className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
            خطا در بارگیری پیش‌نمایش
          </h3>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-4 mb-4">
            <p className="text-red-700 dark:text-red-400 text-sm">
              {error}
            </p>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            لطفاً مجدداً تلاش کنید یا با پشتیبانی تماس بگیرید.
          </p>
        </div>

        {/* Retry Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onRetry}
            size="lg"
            className="gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-200 px-8"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-medium">تلاش مجدد</span>
          </Button>
        </motion.div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-xl">
          <p className="text-blue-700 dark:text-blue-400 text-sm">
            💡 اگر مشکل ادامه داشت، از اتصال اینترنت خود اطمینان حاصل کنید.
          </p>
        </div>
      </motion.div>
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface PdfPreviewActionsProps {
  onExport: () => void;
  onPrint: () => void;
  isExporting: boolean;
}

export const PdfPreviewActions: React.FC<PdfPreviewActionsProps> = ({
  onExport,
  onPrint,
  isExporting,
}) => {
  const actionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-gradient-to-l from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 border-t border-slate-200/50 dark:border-slate-800/50"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Info Section */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-lg">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              آماده برای دانلود و چاپ
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              برنامه کامل شما با کیفیت بالا تهیه شده است
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <motion.div
            custom={0}
            variants={actionVariants}
            initial="hidden"
            animate="visible"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={onPrint}
              className="gap-2 bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 px-6"
            >
              <Printer className="w-5 h-5" />
              <span className="font-medium">چاپ برنامه</span>
            </Button>
          </motion.div>

          <motion.div
            custom={1}
            variants={actionVariants}
            initial="hidden"
            animate="visible"
          >
            <Button
              size="lg"
              onClick={onExport}
              disabled={isExporting}
              className="gap-2 bg-gradient-to-l from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:via-emerald-800 hover:to-emerald-900 text-white border-0 shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 px-6 relative overflow-hidden group"
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-l from-emerald-400/20 via-emerald-500/20 to-emerald-600/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              
              <div className="relative flex items-center gap-2">
                {isExporting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium">در حال دانلود...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span className="font-medium">دانلود PDF</span>
                  </>
                )}
              </div>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


import React from "react";
import { motion } from "framer-motion";
import { FileText, Eye } from "lucide-react";

interface PdfPreviewContentProps {
  pdfUrl: string;
}

export const PdfPreviewContent: React.FC<PdfPreviewContentProps> = ({
  pdfUrl,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-6"
    >
      <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative">
        {/* Preview Header */}
        <div className="bg-gradient-to-l from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-750 p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
              <Eye className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                پیش‌نمایش مستند
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                نمایش فایل PDF در حالت تمام‌صفحه
              </p>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="h-[calc(100%-80px)] relative">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0 bg-white dark:bg-slate-900"
            title="پیش‌نمایش PDF"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            }}
          />
          
          {/* Loading Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-slate-100/90 dark:from-slate-900/90 dark:to-slate-950/90 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                در حال بارگذاری...
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

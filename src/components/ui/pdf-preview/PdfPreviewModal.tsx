
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Student } from "../../students/StudentTypes";
import { previewStudentProgramPDF, exportStudentProgramToPdf } from "@/lib/utils/pdf-export";
import { useToast } from "@/hooks/use-toast";
import { PdfPreviewHeader } from "./PdfPreviewHeader";
import { PdfPreviewContent } from "./PdfPreviewContent";
import { PdfPreviewActions } from "./PdfPreviewActions";
import { PdfPreviewLoadingState } from "./PdfPreviewLoadingState";
import { PdfPreviewErrorState } from "./PdfPreviewErrorState";
import { motion, AnimatePresence } from "framer-motion";

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);
      setPdfUrl("");

      previewStudentProgramPDF(student)
        .then((url) => {
          setPdfUrl(url);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error generating PDF preview:", err);
          setError("خطا در بارگیری پیش‌نمایش PDF");
          setIsLoading(false);
          
          toast({
            title: "خطا در ایجاد پیش‌نمایش",
            description: "متأسفانه مشکلی در ایجاد پیش‌نمایش PDF پیش آمد.",
            variant: "destructive",
          });
        });
    } else {
      setPdfUrl("");
      setError(null);
      setIsExporting(false);
    }
  }, [isOpen, student, toast]);

  const handleExport = async () => {
    setIsExporting(true);
    
    toast({
      title: "در حال آماده‌سازی دانلود",
      description: `برنامه ${student.name} در حال تولید است...`,
    });

    try {
      await exportStudentProgramToPdf(student);
      
      toast({
        title: "دانلود موفقیت‌آمیز",
        description: `برنامه ${student.name} با موفقیت دانلود شد`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error exporting program:", error);
      toast({
        variant: "destructive",
        title: "خطا در دانلود",
        description: "مشکلی در دانلود برنامه پیش آمد. لطفاً مجدداً تلاش کنید.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, '_blank');
      if (printWindow) {
        printWindow.print();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] w-[98vw] h-[98vh] p-0 gap-0 overflow-hidden bg-transparent border-0 shadow-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "modal" : "closed"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden"
          >
            {/* Header */}
            <PdfPreviewHeader
              studentName={student.name}
              onClose={onClose}
            />

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <PdfPreviewLoadingState key="loading" />
                ) : error ? (
                  <PdfPreviewErrorState
                    key="error"
                    error={error}
                    onRetry={() => window.location.reload()}
                  />
                ) : (
                  <PdfPreviewContent
                    key="content"
                    pdfUrl={pdfUrl}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Actions Footer - Only show when PDF is loaded */}
            <AnimatePresence>
              {!isLoading && !error && pdfUrl && (
                <PdfPreviewActions
                  onExport={handleExport}
                  onPrint={handlePrint}
                  isExporting={isExporting}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

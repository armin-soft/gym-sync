
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Student } from "../../students/StudentTypes";
import { Button } from "@/components/ui/button";
import { X, Download, Printer, FileText, Share2, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { previewStudentProgramPDF, exportStudentProgramToPdf } from "@/lib/utils/pdf-export";
import { useToast } from "@/hooks/use-toast";
import { PdfPreviewHeader } from "./PdfPreviewHeader";
import { PdfPreviewContent } from "./PdfPreviewContent";
import { PdfPreviewActions } from "./PdfPreviewActions";
import { PdfPreviewLoadingState } from "./PdfPreviewLoadingState";
import { PdfPreviewErrorState } from "./PdfPreviewErrorState";

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
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
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
    }
  }, [isOpen, student, toast]);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      toast({
        title: "در حال آماده‌سازی PDF",
        description: "لطفاً کمی صبر کنید...",
      });
      
      await exportStudentProgramToPdf(student);
      
      toast({
        title: "دانلود موفقیت‌آمیز",
        description: "فایل PDF با موفقیت دانلود شد.",
        variant: "default",
      });
    } catch (error) {
      console.error("خطا در صدور PDF:", error);
      toast({
        title: "خطا در دانلود",
        description: "متأسفانه مشکلی در دانلود فایل PDF پیش آمد.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, "_blank");
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          setTimeout(() => {
            printWindow.print();
          }, 500);
        });
        
        toast({
          title: "ارسال به چاپگر",
          description: "فایل برای چاپ آماده شد.",
        });
      } else {
        toast({
          title: "خطا در چاپ",
          description: "لطفاً اجازه باز شدن پنجره‌های جدید را فعال کنید.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    
    previewStudentProgramPDF(student)
      .then((url) => {
        setPdfUrl(url);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("خطا در بارگیری پیش‌نمایش PDF");
        setIsLoading(false);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 gap-0 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 rounded-2xl border-2 border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <PdfPreviewHeader
                studentName={student.name}
                onClose={onClose}
              />

              {/* Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {isLoading ? (
                  <PdfPreviewLoadingState />
                ) : error ? (
                  <PdfPreviewErrorState
                    error={error}
                    onRetry={handleRetry}
                  />
                ) : (
                  <PdfPreviewContent pdfUrl={pdfUrl} />
                )}
              </div>

              {/* Actions */}
              {!isLoading && !error && (
                <PdfPreviewActions
                  onExport={handleExport}
                  onPrint={handlePrint}
                  isExporting={isExporting}
                />
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

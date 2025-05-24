
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Student } from "../students/StudentTypes";
import { Button } from "@/components/ui/button";
import { X, Download, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { previewStudentProgramPDF, exportStudentProgramToPdf } from "@/lib/utils/pdf-export";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);

      console.log("در حال ایجاد پیش‌نمایش PDF با pdfmake");
      
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
    }
  }, [isOpen, student, toast]);

  const handleExport = async () => {
    try {
      toast({
        title: "در حال آماده‌سازی PDF",
        description: "لطفاً منتظر بمانید...",
      });
      
      await exportStudentProgramToPdf(student);
      
      toast({
        title: "دانلود PDF",
        description: "فایل PDF با موفقیت دانلود شد.",
        variant: "success",
      });
    } catch (error) {
      console.error("خطا در صدور PDF:", error);
      toast({
        title: "خطا در صدور فایل",
        description: "متأسفانه مشکلی در صدور فایل PDF پیش آمد.",
        variant: "destructive",
      });
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
      } else {
        toast({
          title: "خطا در چاپ",
          description: "لطفاً اجازه باز شدن پنجره‌های جدید را فعال کنید.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-white dark:bg-gray-950 rounded-lg">
        <div className="flex flex-col h-[80vh] max-h-[800px]">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">پیش‌نمایش برنامه {student.name}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>دانلود PDF</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                <span>چاپ</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-t-violet-500 border-violet-200 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">در حال بارگذاری پیش‌نمایش...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
                  <p>{error}</p>
                  <Button 
                    className="mt-4" 
                    variant="outline" 
                    onClick={() => {
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
                    }}
                  >
                    تلاش مجدد
                  </Button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center h-full bg-gray-100 dark:bg-gray-900"
              >
                <iframe 
                  src={pdfUrl} 
                  className="w-full h-full border-0 rounded shadow-lg"
                  title="PDF Preview"
                />
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

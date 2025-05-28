
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, VisuallyHidden } from "@/components/ui/dialog";
import { Student } from "../../students/StudentTypes";
import { previewStudentProgramPDF2Pages } from "@/lib/utils/pdf-export/previewStudentProgramPDF2Pages";
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
    if (isOpen && student) {
      console.log(`شروع پیش‌نمایش PDF برای ${student.name}`);
      setIsLoading(true);
      setError(null);
      setPdfUrl("");

      // تاخیر کوتاه برای اطمینان از بارگذاری کامل کامپوننت
      const timer = setTimeout(() => {
        previewStudentProgramPDF2Pages(student)
          .then((url) => {
            console.log(`پیش‌نمایش PDF برای ${student.name} آماده شد`);
            setPdfUrl(url);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("خطا در تولید پیش‌نمایش PDF:", err);
            setError("خطا در بارگیری پیش‌نمایش PDF");
            setIsLoading(false);
            
            toast({
              title: "خطا در ایجاد پیش‌نمایش",
              description: "متأسفانه مشکلی در ایجاد پیش‌نمایش PDF پیش آمد.",
              variant: "destructive",
            });
          });
      }, 300);

      return () => clearTimeout(timer);
    } else if (!isOpen) {
      setPdfUrl("");
      setError(null);
      setIsLoading(true);
    }
  }, [isOpen, student, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[95vh] p-0 gap-0 overflow-hidden bg-white rounded-lg border shadow-lg">
        <VisuallyHidden>
          <DialogTitle>پیش‌نمایش PDF برنامه {student?.name || 'شاگرد'}</DialogTitle>
          <DialogDescription>
            پیش‌نمایش فایل PDF شامل برنامه تمرینی، غذایی و مکمل‌های {student?.name || 'شاگرد'}
          </DialogDescription>
        </VisuallyHidden>
        
        <div className="flex flex-col h-full w-full">
          <div className="flex-1 w-full h-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">در حال بارگذاری پیش‌نمایش PDF...</p>
                  <p className="text-sm text-gray-500 mt-2">لطفاً صبر کنید</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button 
                    onClick={() => {
                      setError(null);
                      setIsLoading(true);
                      // تلاش مجدد
                      setTimeout(() => {
                        previewStudentProgramPDF2Pages(student)
                          .then(setPdfUrl)
                          .catch(() => setError("خطا در بارگیری مجدد"))
                          .finally(() => setIsLoading(false));
                      }, 100);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    تلاش مجدد
                  </button>
                </div>
              </div>
            ) : pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="پیش‌نمایش PDF"
                onLoad={() => console.log('PDF iframe loaded successfully')}
                onError={() => {
                  console.error('PDF iframe loading failed');
                  setError('خطا در نمایش PDF');
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">در انتظار بارگذاری...</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

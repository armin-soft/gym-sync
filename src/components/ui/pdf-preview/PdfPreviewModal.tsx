
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Student } from "../../students/StudentTypes";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { previewStudentProgramPDF } from "@/lib/utils/pdf-export";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[95vh] p-0 gap-0 overflow-hidden bg-white rounded-lg border shadow-lg">
        <div className="flex flex-col h-full">
          {/* Simple close button */}
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* PDF Content */}
          <div className="flex-1 w-full h-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">در حال بارگذاری...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    variant="outline"
                    size="sm"
                  >
                    تلاش مجدد
                  </Button>
                </div>
              </div>
            ) : (
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="پیش‌نمایش PDF"
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '@/components/students/StudentTypes';
import { previewStudentProgramPDF, exportStudentProgramToPdf } from '@/lib/utils/pdf-export';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Download, Eye, X } from 'lucide-react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  student
}) => {
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isOpen && student) {
      setIsLoading(true);
      setError(null);
      
      previewStudentProgramPDF(student)
        .then((dataUrl) => {
          setPdfDataUrl(dataUrl);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("خطا در پیش‌نمایش PDF:", err);
          setError("خطا در ایجاد پیش‌نمایش PDF. لطفاً مجدداً تلاش کنید.");
          setIsLoading(false);
        });
    } else {
      setPdfDataUrl(null);
    }
  }, [isOpen, student]);
  
  const handleDownload = async () => {
    try {
      setIsLoading(true);
      await exportStudentProgramToPdf(student);
      setIsLoading(false);
      onClose();
    } catch (err) {
      console.error("خطا در دانلود PDF:", err);
      setError("خطا در دانلود PDF. لطفاً مجدداً تلاش کنید.");
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center justify-between">
            <span>پیش‌نمایش برنامه {student?.name}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden border rounded-md bg-muted/20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <LoadingSpinner size="lg" />
              <p className="text-sm text-muted-foreground">در حال ایجاد پیش‌نمایش...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
              <div className="text-destructive text-4xl">⚠️</div>
              <p className="text-destructive font-medium">{error}</p>
              <Button variant="outline" onClick={() => setError(null)}>تلاش مجدد</Button>
            </div>
          ) : pdfDataUrl ? (
            <iframe 
              src={pdfDataUrl} 
              className="w-full h-full border-0"
              title={`پیش‌نمایش برنامه ${student?.name}`}
            />
          ) : null}
        </div>
        
        <DialogFooter className="flex justify-between items-center gap-3 sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            بستن
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="default" 
              onClick={handleDownload}
              disabled={isLoading || !!error}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              دانلود PDF
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PdfPreviewModal;

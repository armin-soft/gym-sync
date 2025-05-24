
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { previewStudentProgramHTML, exportStudentProgramToHtml } from "@/lib/utils/pdf-export";
import { useToast } from "@/hooks/use-toast";

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
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && student) {
      setIsLoading(true);
      try {
        const content = previewStudentProgramHTML(student);
        setHtmlContent(content);
      } catch (error) {
        console.error("خطا در تولید پیش‌نمایش:", error);
        toast({
          variant: "destructive",
          title: "خطا در تولید پیش‌نمایش",
          description: "مشکلی در تولید پیش‌نمایش پیش آمد."
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [isOpen, student, toast]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportStudentProgramToHtml(student);
      toast({
        title: "صدور برنامه انجام شد",
        description: "برنامه با موفقیت به صورت HTML صادر شد"
      });
    } catch (error) {
      console.error("خطا در صدور:", error);
      toast({
        variant: "destructive",
        title: "خطا در صدور برنامه",
        description: "مشکلی در صدور برنامه پیش آمد."
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>پیش‌نمایش برنامه - {student.name}</DialogTitle>
          <div className="flex gap-2">
            <Button 
              onClick={handleExport} 
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isExporting ? "در حال صدور..." : "دانلود HTML"}
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 border rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>در حال تولید پیش‌نمایش...</span>
              </div>
            </div>
          ) : (
            <iframe
              srcDoc={htmlContent}
              className="w-full h-full border-0"
              title="پیش‌نمایش برنامه"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

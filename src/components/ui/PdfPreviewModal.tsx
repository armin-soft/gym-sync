
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download, X } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
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
  const { toast } = useToast();

  const handleDownloadPdf = async () => {
    try {
      // Import the PDF export function dynamically
      const { exportStudentProgramToPdf2Pages } = await import("@/lib/utils/pdf-export/exportStudentProgramToPdf2Pages");
      
      toast({
        title: "در حال آماده سازی برنامه",
        description: "لطفا منتظر بمانید...",
      });

      await exportStudentProgramToPdf2Pages(student);
      
      toast({
        title: "صدور برنامه انجام شد",
        description: "برنامه با موفقیت به صورت PDF صادر شد",
      });
      
      onClose();
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast({
        variant: "destructive",
        title: "خطا در صدور برنامه",
        description: "مشکلی در صدور برنامه پیش آمد. لطفا مجددا تلاش کنید.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          پیش‌نمایش برنامه - {student.name}
        </DialogTitle>
        <DialogDescription>
          برنامه کامل شامل تمرینات، رژیم غذایی و مکمل‌ها برای {student.name}
        </DialogDescription>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">محتویات برنامه:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• برنامه تمرینی (6 روز)</li>
              <li>• برنامه غذایی هفتگی</li>
              <li>• مکمل‌ها و ویتامین‌ها</li>
              <li>• اطلاعات شاگرد</li>
            </ul>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button onClick={handleDownloadPdf} className="gap-2">
              <Download className="h-4 w-4" />
              دانلود PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

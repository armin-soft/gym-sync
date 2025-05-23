
import React, { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, FileDown, FileText, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { exportStudentProgramToPdf } from "@/lib/utils/pdf-export";
import { useToast } from "@/hooks/use-toast";
import { PdfPreviewModal } from "@/components/ui/PdfPreviewModal";

interface ProgramHeaderProps {
  student: Student;
  onBack: () => void;
}

const ProgramHeader: React.FC<ProgramHeaderProps> = ({ student, onBack }) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      toast({
        title: "در حال آماده‌سازی PDF",
        description: "لطفاً منتظر بمانید..."
      });
      
      await exportStudentProgramToPdf(student);
      
      toast({
        title: "برنامه با موفقیت صادر شد",
        description: "فایل PDF برای دانلود آماده است.",
        variant: "success"
      });
    } catch (error) {
      console.error("خطا در صدور PDF:", error);
      toast({
        title: "خطا در صدور برنامه",
        description: "متأسفانه مشکلی در صدور برنامه پیش آمد. لطفاً مجدداً تلاش کنید.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-800 border-b px-4 sm:px-6 py-4 sticky top-0 z-10"
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
          <div className="flex items-center gap-2">
            <Button
              onClick={onBack}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <ArrowRight className="h-4 w-4" />
              <span>بازگشت</span>
            </Button>
            <h1 className="text-lg font-semibold">برنامه {student.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setIsPreviewOpen(true)}
            >
              <FileText className="h-4 w-4" />
              <span>پیش‌نمایش برنامه</span>
            </Button>
            
            <Button
              onClick={handleExport}
              disabled={isExporting}
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              {isExporting ? (
                <span className="flex items-center gap-1">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال صدور...
                </span>
              ) : (
                <>
                  <FileDown className="h-4 w-4" />
                  <span>صدور برنامه</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
      
      <PdfPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        student={student}
      />
    </>
  );
};

export default ProgramHeader;

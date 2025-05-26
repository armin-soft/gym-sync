
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Student } from "@/components/students/StudentTypes";
import { ArrowRight, Save, FileText, Eye } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { Chip } from "@/components/ui/chip";
import { exportStudentProgramToPdf2Pages } from "@/lib/utils/pdf-export/exportStudentProgramToPdf2Pages";
import { PdfPreviewModal } from "@/components/ui/pdf-preview/PdfPreviewModal";
import { useToast } from "@/hooks/use-toast";

interface StudentProgramHeaderProps {
  student: Student;
  onClose: () => void;
  handleSaveAll: () => void;
}

const StudentProgramHeader: React.FC<StudentProgramHeaderProps> = ({
  student,
  onClose,
  handleSaveAll
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();
  
  const ageDisplay = student.age ? toPersianNumbers(student.age) : "";
  const heightDisplay = student.height ? toPersianNumbers(student.height) : "";
  const weightDisplay = student.weight ? toPersianNumbers(student.weight) : "";

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await exportStudentProgramToPdf2Pages(student);
      
      toast({
        title: "صدور PDF موفق",
        description: "فایل PDF برنامه شاگرد با موفقیت صادر شد",
      });
    } catch (error) {
      console.error('خطا در صدور PDF:', error);
      toast({
        title: "خطا در صدور PDF",
        description: "متأسفانه مشکلی در صدور فایل پیش آمد",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-border/50 rounded-xl p-4 shadow-sm backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center gap-4 text-right"
    >
      <div className="w-full sm:w-auto flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClose}
          className="flex items-center gap-1 border-border/50 hover:bg-background/80"
        >
          <ArrowRight className="h-4 w-4" />
          <span>بازگشت</span>
        </Button>
        
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">{student.name}</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {student.age && (
              <Chip variant="outline" interactive={false} className="py-0 h-5">
                <span>سن: {ageDisplay}</span>
              </Chip>
            )}
            
            {student.height && (
              <Chip variant="outline" interactive={false} className="py-0 h-5">
                <span>قد: {heightDisplay}</span>
              </Chip>
            )}
            
            {student.weight && (
              <Chip variant="outline" interactive={false} className="py-0 h-5">
                <span>وزن: {weightDisplay}</span>
              </Chip>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button 
          variant="outline"
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-2 border-border/50 hover:bg-background/80"
        >
          <Eye className="h-4 w-4" />
          <span>پیش‌نمایش</span>
        </Button>
        
        <Button
          variant="outline"
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex items-center gap-2 border-border/50 hover:bg-background/80"
        >
          <FileText className="h-4 w-4" />
          <span>{isExporting ? 'در حال صدور...' : 'صدور PDF'}</span>
        </Button>
        
        <Button 
          onClick={handleSaveAll}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-lg shadow-sm transition-all duration-300 flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          <span>ذخیره همه</span>
        </Button>
      </div>

      <PdfPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        student={student}
      />
    </motion.div>
  );
};

export default StudentProgramHeader;


import React from "react";
import { Button } from "@/components/ui/button";
import { Student } from "@/components/students/StudentTypes";
import { ArrowRight, Save } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

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
  const ageDisplay = student.age ? toPersianNumbers(student.age) : "";
  const heightDisplay = student.height ? toPersianNumbers(student.height) : "";
  const weightDisplay = student.weight ? toPersianNumbers(student.weight) : "";
  
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
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {student.age && (
              <span className="flex items-center gap-1">
                <span>سن:</span>
                <span>{ageDisplay}</span>
              </span>
            )}
            
            {student.height && (
              <span className="flex items-center gap-1">
                <span>قد:</span>
                <span>{heightDisplay}</span>
              </span>
            )}
            
            {student.weight && (
              <span className="flex items-center gap-1">
                <span>وزن:</span>
                <span>{weightDisplay}</span>
              </span>
            )}
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleSaveAll}
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-lg shadow-sm transition-all duration-300 flex items-center gap-2 w-full sm:w-auto"
      >
        <Save className="h-4 w-4" />
        <span>ذخیره همه برنامه‌ها</span>
      </Button>
    </motion.div>
  );
};

export default StudentProgramHeader;

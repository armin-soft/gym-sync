
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { useShamsiDate } from "@/hooks/useShamsiDate";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getStudentProgress } from "@/utils/studentUtils";

interface ProgramHeaderProps {
  student: Student;
  onBack: () => void;
}

const ProgramHeader: React.FC<ProgramHeaderProps> = ({ student, onBack }) => {
  const { dateInfo } = useShamsiDate();
  const progress = getStudentProgress(student);
  
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white dark:bg-gray-800 shadow-md px-4 sm:px-6 py-4 relative z-10"
    >
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-1.5">
              <ArrowRight className="h-4 w-4" />
              <span>بازگشت</span>
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {student.image ? (
                  <img 
                    src={student.image} 
                    alt={student.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              
              <div>
                <h1 className="text-lg font-bold leading-tight text-gray-800 dark:text-white">
                  مدیریت برنامه‌های {student.name}
                </h1>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded text-xs">
                    {student.gender === "male" ? "آقا" : "خانم"}
                  </span>
                  
                  {student.phone && (
                    <span className="text-xs">
                      شماره تماس: {toPersianNumbers(student.phone)}
                    </span>
                  )}
                  
                  {student.age && (
                    <span className="text-xs">
                      سن: {toPersianNumbers(student.age)} سال
                    </span>
                  )}
                  
                  <span className="text-xs">
                    تکمیل پروفایل: {toPersianNumbers(progress)}٪
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {dateInfo && (
            <div className="text-left ltr:text-right text-sm text-gray-500 dark:text-gray-400 flex flex-col items-end">
              <span>{dateInfo.Shamsi_Date}</span>
              <div className="flex items-center gap-1 text-xs">
                <span>{dateInfo.Season}</span>
                <span>{dateInfo.Season_Emoji}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramHeader;


import React from "react";
import { Button } from "@/components/ui/button";
import { Student } from "@/components/students/StudentTypes";
import { ArrowRight, Save, Sparkles, Target } from "lucide-react";
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
      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg"
      style={{ direction: "rtl" }}
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <Target className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="text-right">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              تخصیص برنامه ورزشی
            </h1>
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mt-1">
              {student.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              {student.age && (
                <span className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
                  سن: {ageDisplay} سال
                </span>
              )}
              
              {student.height && (
                <span className="bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg border border-green-200/50 dark:border-green-700/50">
                  قد: {heightDisplay} سانتی‌متر
                </span>
              )}
              
              {student.weight && (
                <span className="bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-lg border border-purple-200/50 dark:border-purple-700/50">
                  وزن: {weightDisplay} کیلوگرم
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleSaveAll}
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 px-6 py-3"
          >
            <Save className="h-5 w-5" />
            <span className="font-medium">ذخیره همه تغییرات</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex items-center gap-2 border-2 border-gray-200/50 hover:bg-gray-50 rounded-xl px-4 py-3"
          >
            <ArrowRight className="h-5 w-5" />
            <span>بازگشت</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentProgramHeader;

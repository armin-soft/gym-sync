
import React from "react";
import { Button } from "@/components/ui/button";
import { Student } from "@/components/students/StudentTypes";
import { X, Save, User, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full text-right"
      dir="rtl"
    >
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl sm:rounded-3xl overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-md"></div>
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <motion.h1
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 text-right truncate"
                >
                  برنامه ورزشی {student.name}
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center gap-3 text-right"
                  dir="rtl"
                >
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    برنامه جامع
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    حرفه‌ای
                  </Badge>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <Button
                onClick={handleSaveAll}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm shadow-lg transition-all duration-300 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl"
                variant="outline"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                ذخیره همه
              </Button>
              
              <Button
                onClick={onClose}
                variant="outline"
                className="bg-white/20 hover:bg-red-500/80 text-white border-white/30 backdrop-blur-sm shadow-lg transition-all duration-300 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline mr-2">بستن</span>
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400"></div>
      </Card>
    </motion.div>
  );
};

export default StudentProgramHeader;

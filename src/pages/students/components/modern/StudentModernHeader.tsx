
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { UserPlus, Download, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentModernHeaderProps {
  onAddStudent: () => void;
  students: Student[];
}

const StudentModernHeader = ({ onAddStudent, students }: StudentModernHeaderProps) => {
  const deviceInfo = useDeviceInfo();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6"
    >
      <motion.div variants={itemVariants} className="flex-1">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          مدیریت شاگردان
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          {students.length > 0 ? (
            <span>مدیریت {toPersianNumbers(students.length)} شاگرد فعال در سیستم</span>
          ) : (
            <span>افزودن و مدیریت شاگردان باشگاه</span>
          )}
        </p>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="flex items-center gap-2 sm:gap-3"
      >
        <Button
          variant="outline"
          size={deviceInfo.isMobile ? "sm" : "default"}
          className="gap-1 hidden sm:flex"
        >
          <Download className="w-4 h-4" />
          <span>گزارش</span>
          <ChevronDown className="w-3 h-3 opacity-70" />
        </Button>
        
        <Button
          onClick={onAddStudent}
          size={deviceInfo.isMobile ? "sm" : "default"}
          className="gap-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
        >
          <UserPlus className="w-4 h-4" />
          <span>افزودن شاگرد</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default StudentModernHeader;

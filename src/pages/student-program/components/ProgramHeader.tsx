
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProgramHeaderProps {
  student: Student;
  onBack: () => void;
}

const ProgramHeader: React.FC<ProgramHeaderProps> = ({ student, onBack }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 border-b px-4 sm:px-6 py-4 sticky top-0 z-10"
    >
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
    </motion.div>
  );
};

export default ProgramHeader;

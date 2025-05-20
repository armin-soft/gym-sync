
import React from "react";
import { StudentCardAvatar } from "./StudentCardAvatar";
import { StudentCardMenu } from "./StudentCardMenu";
import { Student } from "../StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface StudentCardHeaderProps {
  student: Student;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddExercise?: () => void;
  onAddDiet?: () => void;
  onAddSupplement?: () => void;
  onDownload?: () => void;
  isProfileComplete: boolean;
}

export const StudentCardHeader: React.FC<StudentCardHeaderProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  isProfileComplete
}) => {
  const getStatusBadge = () => {
    // Check if the student has complete information
    if (isProfileComplete) {
      return (
        <Badge className="absolute top-0 right-0 z-10 bg-gradient-to-r from-emerald-500 to-emerald-600 
                        text-white text-xs border-0 px-2 py-0.5 rounded-bl-lg rounded-tr-md">
          تکمیل
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="relative flex justify-between items-start">
      {getStatusBadge()}
      
      <div className="flex space-x-4 space-x-reverse text-right">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <StudentCardAvatar image={student.image} name={student.name} />
        </motion.div>
        
        <div>
          <h3 className="font-bold text-base leading-tight text-slate-800 dark:text-slate-100 
                       group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
            {student.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 ltr:text-left rtl:text-right">
            {toPersianNumbers(student.phone)}
          </p>
        </div>
      </div>
      
      <StudentCardMenu 
        student={student}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddExercise={onAddExercise}
        onAddDiet={onAddDiet}
        onAddSupplement={onAddSupplement}
        onDownload={onDownload}
        isProfileComplete={isProfileComplete}
      />
    </div>
  );
};

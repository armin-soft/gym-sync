
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { StudentCard } from "@/components/students/StudentCard";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentGridViewProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise?: (student: Student) => void;
  onAddDiet?: (student: Student) => void;
  onAddSupplement?: (student: Student) => void;
  isProfileComplete?: boolean;
}

export const StudentGridView: React.FC<StudentGridViewProps> = ({
  students,
  setStudents,
  onEdit,
  onDelete,
  isProfileComplete = true,
}) => {
  const deviceInfo = useDeviceInfo();
  
  // Determine grid columns based on device
  const getGridColumns = () => {
    if (deviceInfo.isMobile) return "grid-cols-1";
    if (deviceInfo.isTablet) return "grid-cols-2";
    if (window.innerWidth >= 1280) return "grid-cols-4";
    return "grid-cols-3";
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="w-full h-full overflow-auto p-2 sm:p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid ${getGridColumns()} gap-4 md:gap-6`}
      >
        {students.map((student) => (
          <motion.div
            key={student.id}
            variants={itemVariants}
            layout
            className="h-full"
          >
            <StudentCard
              student={student}
              onEdit={() => onEdit(student)}
              onDelete={() => onDelete(student.id)}
              setStudents={setStudents}
              students={students}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

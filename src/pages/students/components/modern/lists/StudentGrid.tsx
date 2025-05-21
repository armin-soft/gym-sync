
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import StudentGridCard from "./StudentGridCard";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Loader } from "lucide-react";

interface StudentGridProps {
  students: Student[];
  isProfileComplete: boolean;
  loading: boolean;
  refreshTrigger: number;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
}

export const StudentGrid = ({
  students,
  isProfileComplete,
  loading,
  refreshTrigger,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
}: StudentGridProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const deviceInfo = useDeviceInfo();
  
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
  
  // Calculate grid columns based on screen size
  const getGridCols = () => {
    if (deviceInfo.isMobile) return "grid-cols-1";
    if (deviceInfo.isTablet) return "grid-cols-2";
    if (window.innerWidth >= 1280) return "grid-cols-4";
    return "grid-cols-3";
  };
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="flex flex-col items-center text-center">
          <Loader className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-full">
      <motion.div
        className={`p-4 grid ${getGridCols()} gap-4`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {students.map((student) => (
          <StudentGridCard
            key={student.id}
            student={student}
            isHovered={hoveredId === student.id}
            onHover={() => setHoveredId(student.id)}
            onBlur={() => setHoveredId(null)}
            onEdit={() => onEdit(student)}
            onDelete={() => onDelete(student.id)}
            onAddExercise={() => onAddExercise(student)}
            onAddDiet={() => onAddDiet(student)}
            onAddSupplement={() => onAddSupplement(student)}
            isProfileComplete={isProfileComplete}
          />
        ))}
      </motion.div>
    </ScrollArea>
  );
};

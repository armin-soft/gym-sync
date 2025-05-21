
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStudentProgress } from "@/utils/studentUtils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import StudentGridCard from "./StudentGridCard";
import { Loader } from "lucide-react";

interface StudentKanbanProps {
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

export const StudentKanban = ({
  students,
  isProfileComplete,
  loading,
  refreshTrigger,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
}: StudentKanbanProps) => {
  const deviceInfo = useDeviceInfo();
  
  // Group students by progress level
  const lowProgress = students.filter(s => {
    const progress = s.progress || getStudentProgress(s);
    return progress < 30;
  });
  
  const mediumProgress = students.filter(s => {
    const progress = s.progress || getStudentProgress(s);
    return progress >= 30 && progress < 70;
  });
  
  const highProgress = students.filter(s => {
    const progress = s.progress || getStudentProgress(s);
    return progress >= 70;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  // Get responsive column classes for kanban layout
  const getColumnClasses = () => {
    if (deviceInfo.isMobile) return "grid-cols-1 gap-4";
    return "grid-cols-3 gap-5";
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
      <div className="p-4">
        <motion.div
          className={`grid ${getColumnClasses()}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Low Progress Column */}
          <motion.div variants={columnVariants} className="flex flex-col gap-3">
            <div className="mb-2 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 px-3 py-2 flex items-center justify-between">
              <h3 className="font-medium text-red-700 dark:text-red-400">نیازمند توجه</h3>
              <div className="bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {lowProgress.length}
              </div>
            </div>
            <div className="space-y-3">
              {lowProgress.map(student => (
                <StudentGridCard
                  key={student.id}
                  student={student}
                  isHovered={false}
                  onHover={() => {}}
                  onBlur={() => {}}
                  onEdit={() => onEdit(student)}
                  onDelete={() => onDelete(student.id)}
                  onAddExercise={() => onAddExercise(student)}
                  onAddDiet={() => onAddDiet(student)}
                  onAddSupplement={() => onAddSupplement(student)}
                  isProfileComplete={isProfileComplete}
                />
              ))}
              {lowProgress.length === 0 && (
                <div className="text-center p-4 border border-dashed border-red-200 dark:border-red-800/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">شاگردی در این ستون وجود ندارد</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Medium Progress Column */}
          <motion.div variants={columnVariants} className="flex flex-col gap-3">
            <div className="mb-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 px-3 py-2 flex items-center justify-between">
              <h3 className="font-medium text-amber-700 dark:text-amber-400">در حال پیشرفت</h3>
              <div className="bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {mediumProgress.length}
              </div>
            </div>
            <div className="space-y-3">
              {mediumProgress.map(student => (
                <StudentGridCard
                  key={student.id}
                  student={student}
                  isHovered={false}
                  onHover={() => {}}
                  onBlur={() => {}}
                  onEdit={() => onEdit(student)}
                  onDelete={() => onDelete(student.id)}
                  onAddExercise={() => onAddExercise(student)}
                  onAddDiet={() => onAddDiet(student)}
                  onAddSupplement={() => onAddSupplement(student)}
                  isProfileComplete={isProfileComplete}
                />
              ))}
              {mediumProgress.length === 0 && (
                <div className="text-center p-4 border border-dashed border-amber-200 dark:border-amber-800/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">شاگردی در این ستون وجود ندارد</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* High Progress Column */}
          <motion.div variants={columnVariants} className="flex flex-col gap-3">
            <div className="mb-2 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 px-3 py-2 flex items-center justify-between">
              <h3 className="font-medium text-green-700 dark:text-green-400">تکمیل شده</h3>
              <div className="bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
                {highProgress.length}
              </div>
            </div>
            <div className="space-y-3">
              {highProgress.map(student => (
                <StudentGridCard
                  key={student.id}
                  student={student}
                  isHovered={false}
                  onHover={() => {}}
                  onBlur={() => {}}
                  onEdit={() => onEdit(student)}
                  onDelete={() => onDelete(student.id)}
                  onAddExercise={() => onAddExercise(student)}
                  onAddDiet={() => onAddDiet(student)}
                  onAddSupplement={() => onAddSupplement(student)}
                  isProfileComplete={isProfileComplete}
                />
              ))}
              {highProgress.length === 0 && (
                <div className="text-center p-4 border border-dashed border-green-200 dark:border-green-800/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">شاگردی در این ستون وجود ندارد</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </ScrollArea>
  );
};

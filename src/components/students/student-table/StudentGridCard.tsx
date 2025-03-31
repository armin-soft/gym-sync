
import React, { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card";
import { StudentAvatar } from "./StudentAvatar";
import { StudentProgressBar } from "./StudentProgressBar";
import { StatusBadge } from "./StatusBadge";
import { StudentActionButtons } from "./StudentActionButtons";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NeoGlow, NeoBorder } from "@/components/ui/shimmer-effect";

interface StudentGridCardProps {
  student: Student;
  index: number;
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
}

export const StudentGridCard: React.FC<StudentGridCardProps> = ({
  student,
  index,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100, 
        damping: 15
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onClick={() => onEdit(student)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden cursor-pointer group"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-70 blur-xl rounded-3xl -z-10 group-hover:opacity-100 transition-opacity duration-300 scale-[0.85] group-hover:scale-90 bg-gradient-to-tr from-indigo-100 to-violet-100 dark:from-indigo-950/40 dark:to-violet-950/40" />
      
      <GlassmorphicCard 
        variant="hover" 
        className="h-full p-6 rounded-3xl border-slate-200/50 dark:border-slate-800/50 group-hover:border-indigo-200/50 dark:group-hover:border-indigo-800/30"
      >
        <div className="absolute top-3 right-3">
          <StatusBadge student={student} />
        </div>
      
        <div className="flex flex-col items-center text-center pt-4 pb-6">
          <StudentAvatar
            name={student.name}
            image={student.image}
            size="xl"
            className="mb-4 transition-all duration-300 group-hover:shadow-md group-hover:shadow-indigo-200/30 dark:group-hover:shadow-indigo-950/30"
          />
          
          <motion.h3 
            className="font-bold text-lg mb-1 line-clamp-1 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300"
            animate={{ 
              backgroundPosition: isHovered ? ["0% 0%", "100% 0%"] : "0% 0%",
              transition: { 
                duration: 3, 
                repeat: isHovered ? Infinity : 0,
                repeatType: "reverse" 
              }
            }}
          >
            {student.name}
          </motion.h3>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 dir-ltr mb-3">
            {toPersianNumbers(student.phone)}
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-lg px-3 py-1.5 text-center backdrop-blur-sm shadow-inner group-hover:scale-105 transition-transform duration-300">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">قد</p>
              <p className="font-medium text-sm">{toPersianNumbers(student.height)}</p>
            </div>
            
            <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-lg px-3 py-1.5 text-center backdrop-blur-sm shadow-inner group-hover:scale-105 transition-transform duration-300">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">وزن</p>
              <p className="font-medium text-sm">{toPersianNumbers(student.weight)}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
          <StudentProgressBar student={student} className="mb-3" />
          
          <StudentActionButtons
            student={student}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
            onDownload={onDownload}
            onDelete={onDelete}
            isTable={false}
          />
        </div>
        
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-3 left-3 transition-opacity duration-200"
          >
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
        
        <NeoGlow />
        <NeoBorder />
      </GlassmorphicCard>
    </motion.div>
  );
};

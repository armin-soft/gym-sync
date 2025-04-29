
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Student } from "@/components/students/StudentTypes";
import { StudentCardHeader } from "./card/StudentCardHeader";
import { StudentCardStats } from "./card/StudentCardStats";
import { StudentProgressBar } from "./card/StudentProgressBar";
import { StudentStatBadges } from "./card/StudentStatBadges";
import { StudentCardFooter } from "./card/StudentCardFooter";

interface StudentCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
  isProfileComplete: boolean;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete
}) => {
  // Add some debugging to see what's happening with the meal data
  console.log(`StudentCard for ${student.name}, meals:`, student.meals);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      className="h-full"
    >
      <Card className="h-full backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800/60 hover:shadow-md transition-all duration-300">
        <CardHeader className="p-4 pb-0">
          <StudentCardHeader
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
            isProfileComplete={isProfileComplete}
          />
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          <StudentCardStats 
            height={student.height} 
            weight={student.weight} 
          />
          
          <StudentProgressBar progress={student.progress || 0} />
          
          <StudentStatBadges 
            exercises={student.exercises} 
            meals={student.meals} 
            supplements={student.supplements} 
          />
        </CardContent>
        
        <CardFooter className="p-3 pt-0 flex justify-between">
          <StudentCardFooter onEdit={onEdit} />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

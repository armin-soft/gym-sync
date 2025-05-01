
import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns-tz";
import { Trash, Edit, Dumbbell, Apple, Pill, Download, ExternalLink } from "lucide-react";
import { Student } from "./StudentTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

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
  isProfileComplete,
}) => {
  const deviceInfo = useDeviceInfo();
  
  const updatedDate = student.updatedAt 
    ? formatDistanceToNow(new Date(student.updatedAt), { addSuffix: true })
    : "تازه اضافه شده";
    
  const getInitials = (name: string) => {
    if (!name) return "؟";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const hasExercises = 
    (student.exercises?.length ?? 0) > 0 || 
    (student.exercisesDay1?.length ?? 0) > 0 ||
    (student.exercisesDay2?.length ?? 0) > 0 ||
    (student.exercisesDay3?.length ?? 0) > 0 ||
    (student.exercisesDay4?.length ?? 0) > 0;

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-950">
      <div className="flex justify-between items-start p-3 sm:p-4 mb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
            <AvatarImage src={student.picture} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-base font-medium">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.phone}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Badge variant="outline" className={cn("rounded-sm px-2 py-0 text-2xs h-5", 
            student.status === "active" ? "border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" :
            student.status === "pending" ? "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800" :
            "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
          )}>
            {student.status === "active" ? "فعال" : 
             student.status === "pending" ? "در انتظار" : "تکمیل شده"}
          </Badge>
          <span className="text-2xs text-muted-foreground mt-1">
            {updatedDate}
          </span>
        </div>
      </div>
      
      <CardContent className="px-3 sm:px-4 pb-3">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">پیشرفت</span>
            <span className="text-xs font-medium">{student.progress || 0}%</span>
          </div>
          <Progress 
            value={student.progress || 0} 
            className="h-1.5 bg-gray-100 dark:bg-gray-800" 
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 px-3 sm:px-4 pt-2 pb-3 border-t dark:border-gray-800">
        <div className="flex gap-1.5 flex-wrap">
          {/* Edit button */}
          <Button 
            onClick={onEdit} 
            variant="outline" 
            size={deviceInfo.isMobile ? "xs" : "sm"}
            className="h-8 gap-1 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            <Edit className="h-3.5 w-3.5" />
            <span className="text-xs">ویرایش</span>
          </Button>
          
          {/* Exercise button */}
          <Button 
            onClick={onAddExercise} 
            variant="outline" 
            size={deviceInfo.isMobile ? "xs" : "sm"}
            className={cn(
              "h-8 gap-1",
              hasExercises 
                ? "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 dark:border-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-900/40" 
                : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            )}
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span className="text-xs">تمرین</span>
          </Button>
          
          {/* Exercise management link */}
          {hasExercises && (
            <Button
              asChild
              variant="ghost"
              size={deviceInfo.isMobile ? "xs" : "sm"}
              className="h-8 gap-1 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
            >
              <Link to={`/students/exercises/${student.id}`}>
                <ExternalLink className="h-3 w-3" />
                <span className="text-xs">مدیریت</span>
              </Link>
            </Button>
          )}
        </div>
        
        <div className="flex gap-1.5 mr-auto">
          {/* Delete button */}
          <Button 
            onClick={onDelete}
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

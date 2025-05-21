
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getStudentProgress } from "@/utils/studentUtils";
import { 
  User, 
  Phone, 
  Ruler, 
  Weight, 
  Dumbbell, 
  UtensilsCrossed,
  Pill,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentGridCardProps {
  student: Student;
  isHovered: boolean;
  onHover: () => void;
  onBlur: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
  isProfileComplete: boolean;
}

const StudentGridCard = ({
  student,
  isHovered,
  onHover,
  onBlur,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete,
}: StudentGridCardProps) => {
  const progress = student.progress || getStudentProgress(student);

  // Progress color based on completion percentage
  const getProgressColor = () => {
    if (progress < 30) return "bg-red-500";
    if (progress < 60) return "bg-amber-500";
    if (progress < 80) return "bg-blue-500";
    return "bg-green-500";
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 500, damping: 30 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200/70 dark:border-gray-700/70 shadow-md overflow-hidden relative group"
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Header with avatar and actions */}
      <div className="relative">
        <div className="h-20 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-900/20 dark:to-violet-900/20"></div>
        <div className="absolute -bottom-10 left-4 ring-4 ring-white dark:ring-gray-800 rounded-full">
          <Avatar className="h-20 w-20 border-2 border-white dark:border-gray-800 shadow-md">
            <AvatarImage src={student.image} alt={student.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 text-xl">
              <User className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md">
              <DropdownMenuLabel>گزینه‌ها</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onEdit} className="flex items-center gap-2">
                <Pencil className="h-3.5 w-3.5" />
                <span>ویرایش</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAddExercise} className="flex items-center gap-2">
                <Dumbbell className="h-3.5 w-3.5" />
                <span>برنامه تمرینی</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAddDiet} className="flex items-center gap-2">
                <UtensilsCrossed className="h-3.5 w-3.5" />
                <span>برنامه غذایی</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onAddSupplement} className="flex items-center gap-2">
                <Pill className="h-3.5 w-3.5" />
                <span>مکمل و ویتامین</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-500 focus:text-red-500 flex items-center gap-2">
                <Trash className="h-3.5 w-3.5" />
                <span>حذف</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Body content */}
      <div className="pt-12 px-4 pb-4">
        <h3 className="font-semibold text-lg">{student.name}</h3>
        
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            <span dir="ltr">{student.phone && toPersianNumbers(student.phone)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ruler className="h-3.5 w-3.5" />
              <span>{student.height ? toPersianNumbers(student.height) : '-'} سانتی‌متر</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Weight className="h-3.5 w-3.5" />
              <span>{student.weight ? toPersianNumbers(student.weight) : '-'} کیلوگرم</span>
            </div>
          </div>
        </div>
        
        {/* Program badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge 
            variant={student.exercises?.length ? "default" : "outline"} 
            className={`gap-1 ${student.exercises?.length ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-900" : ""}`}
          >
            <Dumbbell className="h-3 w-3" />
            <span>{student.exercises?.length ? toPersianNumbers(student.exercises.length) : '۰'}</span>
          </Badge>
          
          <Badge 
            variant={student.meals?.length ? "default" : "outline"} 
            className={`gap-1 ${student.meals?.length ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900" : ""}`}
          >
            <UtensilsCrossed className="h-3 w-3" />
            <span>{student.meals?.length ? toPersianNumbers(student.meals.length) : '۰'}</span>
          </Badge>
          
          <Badge 
            variant={student.supplements?.length ? "default" : "outline"} 
            className={`gap-1 ${student.supplements?.length ? "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900" : ""}`}
          >
            <Pill className="h-3 w-3" />
            <span>{student.supplements?.length ? toPersianNumbers(student.supplements.length) : '۰'}</span>
          </Badge>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">تکمیل پروفایل</span>
            <span className="text-xs font-medium">{toPersianNumbers(progress)}٪</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
            <motion.div 
              className={`h-1.5 rounded-full ${getProgressColor()}`} 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentGridCard;

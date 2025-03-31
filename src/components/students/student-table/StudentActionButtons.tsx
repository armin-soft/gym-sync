
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Clipboard, Dumbbell, UtensilsCrossed, Pill, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Student } from "@/components/students/StudentTypes";
import { motion } from "framer-motion";

interface StudentActionButtonsProps {
  student: Student;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onDelete: (studentId: number) => void;
  isTable?: boolean;
}

export const StudentActionButtons: React.FC<StudentActionButtonsProps> = ({
  student,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onDelete,
  isTable = true,
}) => {
  const [openMenu, setOpenMenu] = React.useState(false);

  // Animation variants for quick action buttons
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  if (isTable) {
    return (
      <motion.div 
        className="flex justify-end items-center gap-1" 
        variants={container}
        initial="hidden"
        animate="show"
        onClick={e => e.stopPropagation()}
      >
        <motion.div variants={item}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-950/30"
            onClick={(e) => {
              e.stopPropagation();
              onAddExercise(student);
            }}
          >
            <Dumbbell className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div variants={item}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-500 hover:text-green-600 hover:bg-green-50 dark:text-slate-400 dark:hover:text-green-400 dark:hover:bg-green-950/30"
            onClick={(e) => {
              e.stopPropagation();
              onAddDiet(student);
            }}
          >
            <UtensilsCrossed className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div variants={item}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:text-slate-400 dark:hover:text-purple-400 dark:hover:bg-purple-950/30"
            onClick={(e) => {
              e.stopPropagation();
              onAddSupplement(student);
            }}
          >
            <Pill className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div variants={item}>
          <DropdownMenu
            open={openMenu}
            onOpenChange={setOpenMenu}
          >
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-48 z-50 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg backdrop-blur-xl animate-in zoom-in-90 duration-200"
            >
              <DropdownMenuItem 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  onDownload(student);
                  setOpenMenu(false);
                }}
              >
                <Download className="h-4 w-4" />
                <span>دانلود برنامه</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                className="flex items-center gap-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // Placeholder for future functionality
                  setOpenMenu(false);
                }}
              >
                <Clipboard className="h-4 w-4" />
                <span>پرینت برنامه</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                onClick={() => {
                  onDelete(student.id);
                  setOpenMenu(false);
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span>حذف</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </motion.div>
    );
  }
  
  // For grid view
  return (
    <div className="flex items-center justify-between">
      <div className="flex -space-x-2 rtl:space-x-reverse">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900"
          onClick={(e) => {
            e.stopPropagation();
            onAddExercise(student);
          }}
        >
          <Dumbbell className="h-3.5 w-3.5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900"
          onClick={(e) => {
            e.stopPropagation();
            onAddDiet(student);
          }}
        >
          <UtensilsCrossed className="h-3.5 w-3.5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900"
          onClick={(e) => {
            e.stopPropagation();
            onAddSupplement(student);
          }}
        >
          <Pill className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 z-50 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDownload(student);
            }}
          >
            <Download className="h-4 w-4" />
            <span>دانلود برنامه</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // Placeholder for future functionality
            }}
          >
            <Clipboard className="h-4 w-4" />
            <span>پرینت برنامه</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            className="flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(student.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
            <span>حذف</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

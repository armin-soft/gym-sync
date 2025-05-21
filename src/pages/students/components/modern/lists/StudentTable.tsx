
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStudentProgress } from "@/utils/studentUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader, User, FileCog, Dumbbell, UtensilsCrossed, Pill, Download, Pencil, Trash, Check, X } from "lucide-react";

interface StudentTableProps {
  students: Student[];
  isProfileComplete: boolean;
  loading: boolean;
  refreshTrigger: number;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
}

export const StudentTable = ({
  students,
  isProfileComplete,
  loading,
  refreshTrigger,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
}: StudentTableProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Format payment
  const formatPayment = (payment: string | number | undefined) => {
    if (!payment) return '۰';
    return toPersianNumbers(payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };
  
  // Progress color based on completion percentage
  const getProgressColor = (progress: number) => {
    if (progress < 30) return "text-red-500";
    if (progress < 60) return "text-amber-500";
    if (progress < 80) return "text-blue-500";
    return "text-green-500";
  };

  // Animation variants for rows
  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: i * 0.05 
      }
    }),
    hover: {
      backgroundColor: "rgba(245, 247, 250, 0.5)",
      transition: { duration: 0.1 }
    }
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
    <ScrollArea className="h-full w-full">
      <Table>
        <TableHeader className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-10">
          <TableRow className="border-b border-gray-200 dark:border-gray-800">
            <TableHead className="w-[50px] text-center"></TableHead>
            <TableHead className="min-w-[150px]">نام</TableHead>
            <TableHead className="min-w-[130px] text-center">شماره موبایل</TableHead>
            <TableHead className="min-w-[80px] text-center">قد</TableHead>
            <TableHead className="min-w-[80px] text-center">وزن</TableHead>
            <TableHead className="min-w-[120px] text-center">پرداخت (تومان)</TableHead>
            <TableHead className="min-w-[100px] text-center">تکمیل پروفایل</TableHead>
            <TableHead className="min-w-[100px] text-center">برنامه</TableHead>
            <TableHead className="min-w-[160px] text-center">اقدامات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => {
            const progress = student.progress || getStudentProgress(student);
            
            return (
              <motion.tr
                key={student.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onMouseEnter={() => setHoveredId(student.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="border-b border-gray-100 dark:border-gray-800/70 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
              >
                <TableCell className="text-center py-3">
                  <Avatar className="h-10 w-10 mx-auto border border-gray-200 dark:border-gray-700">
                    <AvatarImage src={student.image} alt={student.name} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                      <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                
                <TableCell>
                  <div className="font-medium">{student.name}</div>
                </TableCell>
                
                <TableCell className="text-center font-mono">
                  <span dir="ltr">{student.phone && toPersianNumbers(student.phone)}</span>
                </TableCell>
                
                <TableCell className="text-center">
                  {student.height ? toPersianNumbers(student.height) : '-'}
                </TableCell>
                
                <TableCell className="text-center">
                  {student.weight ? toPersianNumbers(student.weight) : '-'}
                </TableCell>
                
                <TableCell className="text-center">
                  {formatPayment(student.payment)}
                </TableCell>
                
                <TableCell className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                      <motion.div 
                        className={`h-1.5 rounded-full ${getProgressColor(progress)}`} 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${getProgressColor(progress)}`}>
                      {toPersianNumbers(progress)}٪
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Badge 
                      variant={student.exercises?.length ? "default" : "outline"} 
                      className={`gap-1 ${student.exercises?.length ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-900" : ""}`}
                    >
                      <Dumbbell className="h-3 w-3" />
                      {toPersianNumbers(student.exercises?.length || 0)}
                    </Badge>
                    
                    <Badge 
                      variant={student.meals?.length ? "default" : "outline"} 
                      className={`gap-1 ${student.meals?.length ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900" : ""}`}
                    >
                      <UtensilsCrossed className="h-3 w-3" />
                      {toPersianNumbers(student.meals?.length || 0)}
                    </Badge>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950" 
                      onClick={() => onEdit(student)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-amber-600 dark:text-amber-400 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950"
                      onClick={() => onAddExercise(student)}
                    >
                      <Dumbbell className="h-3.5 w-3.5" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-green-600 dark:text-green-400 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950" 
                      onClick={() => onAddDiet(student)}
                    >
                      <UtensilsCrossed className="h-3.5 w-3.5" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-violet-600 dark:text-violet-400 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950"
                      onClick={() => onAddSupplement(student)}
                    >
                      <Pill className="h-3.5 w-3.5" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={() => onDelete(student.id)}
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

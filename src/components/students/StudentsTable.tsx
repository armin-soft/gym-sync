
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "./StudentTypes";
import { Edit, Trash2, MoreVertical, User, Clipboard, Dumbbell, UtensilsCrossed, Pill, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
}

export const StudentTable = ({ 
  students, 
  onEdit, 
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload
}: StudentTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  const getStatusBadge = (student: Student) => {
    // Check if the student has any exercises, meals, or supplements
    const hasExercises = student.exercises?.length || student.exercisesDay1?.length || 
                         student.exercisesDay2?.length || student.exercisesDay3?.length || 
                         student.exercisesDay4?.length;
    const hasMeals = student.meals?.length;
    const hasSupplements = student.supplements?.length || student.vitamins?.length;
    
    if (hasExercises && hasMeals && hasSupplements) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">تکمیل</Badge>;
    } else if (hasExercises || hasMeals || hasSupplements) {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">در حال انجام</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">جدید</Badge>;
    }
  };

  const getCompletionPercentage = (student: Student) => {
    let total = 0;
    let completed = 0;
    
    // Check exercises
    total += 1;
    if (student.exercises?.length || student.exercisesDay1?.length || 
        student.exercisesDay2?.length || student.exercisesDay3?.length || 
        student.exercisesDay4?.length) {
      completed += 1;
    }
    
    // Check meals
    total += 1;
    if (student.meals?.length) completed += 1;
    
    // Check supplements
    total += 1;
    if (student.supplements?.length || student.vitamins?.length) completed += 1;
    
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950 shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-900">
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>
            <TableHead>نام و نام خانوادگی</TableHead>
            <TableHead>موبایل</TableHead>
            <TableHead>قد</TableHead>
            <TableHead>وزن</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead>پیشرفت</TableHead>
            <TableHead className="text-left">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <User className="h-8 w-8 mb-2 opacity-40" />
                  <p className="font-medium">هیچ شاگردی یافت نشد</p>
                  <p className="text-sm mt-1">برای افزودن شاگرد جدید، از دکمه بالا استفاده کنید</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            students.map((student, index) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`transition-all ${
                  hoveredRowId === student.id 
                    ? "bg-slate-50 dark:bg-slate-900/50" 
                    : "hover:bg-slate-50 dark:hover:bg-slate-900/30"
                }`}
                onMouseEnter={() => setHoveredRowId(student.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <TableCell className="font-medium">
                  {toPersianNumbers(index + 1)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={student.image} alt={student.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                        {student.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{student.name}</span>
                      {student.payment && (
                        <span className="text-xs text-muted-foreground">
                          {toPersianNumbers(student.payment.replace(/\B(?=(\d{3})+(?!\d))/g, ','))} تومان
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell dir="ltr" className="text-right font-medium text-slate-600 dark:text-slate-400">
                  {toPersianNumbers(student.phone)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700">
                    {toPersianNumbers(student.height)} سانتی‌متر
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700">
                    {toPersianNumbers(student.weight)} کیلوگرم
                  </Badge>
                </TableCell>
                <TableCell>
                  {getStatusBadge(student)}
                </TableCell>
                <TableCell className="w-[140px]">
                  <div className="flex items-center gap-2">
                    <Progress value={getCompletionPercentage(student)} className="h-2 w-full" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400 min-w-[32px]">
                      {toPersianNumbers(getCompletionPercentage(student))}٪
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(student);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddExercise(student);
                      }}
                    >
                      <Dumbbell className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-500 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddDiet(student);
                      }}
                    >
                      <UtensilsCrossed className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddSupplement(student);
                      }}
                    >
                      <Pill className="h-4 w-4" />
                    </Button>
                    
                    <DropdownMenu
                      open={openMenuId === student.id}
                      onOpenChange={(open) => {
                        setOpenMenuId(open ? student.id : null);
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 z-50 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        <DropdownMenuItem 
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => {
                            onDownload(student);
                            setOpenMenuId(null);
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
                            setOpenMenuId(null);
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
                            setOpenMenuId(null);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>حذف</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student } from "./StudentTypes";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Download,
  Check,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Card } from "@/components/ui/card";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  isProfileComplete: boolean;
}

export const StudentTable = ({
  students,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete
}: StudentTableProps) => {
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  
  const getProgressColor = (progress: number = 0) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-amber-500";
    if (progress < 75) return "bg-blue-500";
    return "bg-emerald-500";
  };
  
  const getProgressText = (progress: number = 0) => {
    if (progress === 0) return "بدون برنامه";
    if (progress < 25) return "شروع نشده";
    if (progress < 50) return "در ابتدای راه";
    if (progress < 75) return "در حال پیشرفت";
    if (progress < 100) return "تقریبا کامل";
    return "کامل شده";
  };
  
  const handleConfirmDelete = () => {
    if (deleteStudent) {
      onDelete(deleteStudent.id);
      setDeleteStudent(null);
    }
  };
  
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeInOut"
      }
    }),
    hover: { backgroundColor: "rgba(0, 0, 0, 0.02)" }
  };

  return (
    <>
      <Card className="overflow-hidden border rounded-xl">
        <div className="overflow-x-auto">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">نام و نام خانوادگی</TableHead>
                <TableHead>شماره تماس</TableHead>
                <TableHead>قد / وزن</TableHead>
                <TableHead>وضعیت برنامه‌ها</TableHead>
                <TableHead className="text-center">پیشرفت کلی</TableHead>
                <TableHead className="text-center">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {students.map((student, index) => {
                  const progress = student.progress || 0;
                  const hasExercises = Boolean(student.exercises?.length || 
                                              student.exercisesDay1?.length || 
                                              student.exercisesDay2?.length || 
                                              student.exercisesDay3?.length || 
                                              student.exercisesDay4?.length);
                  const hasMeals = Boolean(student.meals?.length);
                  const hasSupplements = Boolean(student.supplements?.length || student.vitamins?.length);
                  
                  return (
                    <motion.tr 
                      key={student.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={tableRowVariants}
                      whileHover="hover"
                      className="group border-b last:border-b-0"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={student.image || "Assets/Image/Placeholder.svg"} 
                            alt={student.name} 
                            className="w-11 h-11 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                          />
                          <div>
                            <div className="font-medium text-foreground">{student.name}</div>
                            {student.payment && (
                              <div className="text-xs text-muted-foreground mt-1">
                                مبلغ: {toPersianNumbers(student.payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))} تومان
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                            <div className="text-xs font-medium text-blue-600 dark:text-blue-400">{student.phone.substring(0, 2)}</div>
                          </div>
                          <span dir="ltr" className="font-medium">{toPersianNumbers(student.phone)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">قد:</span>
                            <span className="font-medium">{toPersianNumbers(student.height)} <span className="text-xs">سانتی‌متر</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">وزن:</span>
                            <span className="font-medium">{toPersianNumbers(student.weight)} <span className="text-xs">کیلوگرم</span></span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-3">
                          <div className="flex gap-1.5 items-center">
                            <div className={cn(
                              "w-7 h-7 rounded-full flex items-center justify-center",
                              hasExercises 
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" 
                                : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                            )}>
                              {hasExercises ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : (
                                <X className="h-3.5 w-3.5" />
                              )}
                            </div>
                            <span className={cn(
                              "text-xs font-medium",
                              hasExercises ? "text-blue-700 dark:text-blue-400" : "text-gray-500"
                            )}>
                              تمرین
                            </span>
                          </div>
                          
                          <div className="flex gap-1.5 items-center">
                            <div className={cn(
                              "w-7 h-7 rounded-full flex items-center justify-center",
                              hasMeals 
                                ? "bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400" 
                                : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                            )}>
                              {hasMeals ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : (
                                <X className="h-3.5 w-3.5" />
                              )}
                            </div>
                            <span className={cn(
                              "text-xs font-medium",
                              hasMeals ? "text-green-700 dark:text-green-400" : "text-gray-500"
                            )}>
                              تغذیه
                            </span>
                          </div>
                          
                          <div className="flex gap-1.5 items-center">
                            <div className={cn(
                              "w-7 h-7 rounded-full flex items-center justify-center",
                              hasSupplements 
                                ? "bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400" 
                                : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                            )}>
                              {hasSupplements ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : (
                                <X className="h-3.5 w-3.5" />
                              )}
                            </div>
                            <span className={cn(
                              "text-xs font-medium",
                              hasSupplements ? "text-purple-700 dark:text-purple-400" : "text-gray-500"
                            )}>
                              مکمل
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 w-40 mx-auto">
                          <Progress 
                            value={progress} 
                            className="h-2" 
                            indicatorClassName={getProgressColor(progress)}
                          />
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground">{getProgressText(progress)}</span>
                            <span className="font-medium">{toPersianNumbers(progress)}٪</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 opacity-80 group-hover:opacity-100"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56" dir="rtl">
                              <DropdownMenuItem onClick={() => onEdit(student)} className="gap-2 cursor-pointer">
                                <Edit className="h-4 w-4" />
                                <span>ویرایش اطلاعات</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator />
                              
                              <DropdownMenuItem onClick={() => onAddExercise(student)} className="gap-2 cursor-pointer">
                                <Dumbbell className="h-4 w-4 text-blue-500" />
                                <span>افزودن برنامه تمرینی</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem onClick={() => onAddDiet(student)} className="gap-2 cursor-pointer">
                                <UtensilsCrossed className="h-4 w-4 text-green-500" />
                                <span>افزودن برنامه غذایی</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem onClick={() => onAddSupplement(student)} className="gap-2 cursor-pointer">
                                <Pill className="h-4 w-4 text-purple-500" />
                                <span>افزودن مکمل و ویتامین</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator />
                              
                              <DropdownMenuItem 
                                className="gap-2 cursor-pointer"
                                disabled={!isProfileComplete || progress < 75}
                              >
                                <Download className="h-4 w-4" />
                                <span>دانلود پروفایل</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator />
                              
                              <DropdownMenuItem 
                                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                                onClick={() => setDeleteStudent(student)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>حذف شاگرد</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </Card>
      
      <AlertDialog open={!!deleteStudent} onOpenChange={() => setDeleteStudent(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف شاگرد</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از حذف {deleteStudent?.name} اطمینان دارید؟ این عمل قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

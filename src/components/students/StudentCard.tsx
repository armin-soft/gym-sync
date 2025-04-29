import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Dumbbell, UtensilsCrossed, Pill, Clipboard, User, Download } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { EditStudentButton } from "./EditStudentButton";

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
  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-orange-500";
    if (progress < 75) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const progressColor = getProgressColor(student.progress || 0);
  
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
          <div className="flex justify-between items-start">
            <div className="flex space-x-4 space-x-reverse text-right">
              <Avatar className="h-12 w-12 border-2 border-indigo-100 dark:border-indigo-900">
                {student.image ? (
                  <AvatarImage src={student.image} alt={student.name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-indigo-600 text-white">
                    {student.name?.charAt(0) || <User className="h-6 w-6" />}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-bold text-base leading-tight text-gray-900 dark:text-gray-100">{student.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 ltr:text-left rtl:text-right">
                  {toPersianNumbers(student.phone)}
                </p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  <MoreVertical className="h-4 w-4 relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200" />
                  <span className="sr-only">باز کردن منو</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 p-2 rounded-xl border-slate-200 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-xl dark:shadow-black/20 animate-in zoom-in-90 duration-100"
              >
                <div className="px-2 py-1.5 mb-1">
                  <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">عملیات</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">مدیریت اطلاعات شاگرد</p>
                </div>
                
                <div className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group/item">
                  {onEdit ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 px-3 flex-1"
                      onClick={() => onEdit(student)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      ویرایش
                    </Button>
                  ) : (
                    <EditStudentButton
                      studentId={student.id}
                      variant="ghost"
                      size="sm"
                      className="h-9 px-3 flex-1"
                    />
                  )}
                </div>
                
                <DropdownMenuItem 
                  onClick={onAddExercise} 
                  disabled={!isProfileComplete} 
                  className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group/item"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover/item:bg-indigo-200 dark:group-hover/item:bg-indigo-800/50 transition-all duration-200">
                    <Dumbbell className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors duration-200">برنامه تمرینی</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">تنظیم حرکات ورزشی</span>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={onAddDiet} 
                  disabled={!isProfileComplete} 
                  className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group/item"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/50 transition-all duration-200">
                    <UtensilsCrossed className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors duration-200">برنامه غذایی</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">تنظیم وعده‌های غذایی</span>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={onAddSupplement} 
                  disabled={!isProfileComplete} 
                  className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group/item"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover/item:bg-purple-200 dark:group-hover/item:bg-purple-800/50 transition-all duration-200">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors duration-200">مکمل و ویتامین</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">تنظیم مکمل‌های ورزشی</span>
                  </div>
                </DropdownMenuItem>
                
                <div className="h-px bg-slate-200 dark:bg-slate-700/50 my-2 mx-1"></div>
                
                <DropdownMenuItem 
                  disabled={!isProfileComplete} 
                  className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group/item"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover/item:bg-amber-200 dark:group-hover/item:bg-amber-800/50 transition-all duration-200">
                    <Download className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 transition-colors duration-200">دانلود برنامه</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">دریافت فایل PDF برنامه</span>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  disabled={!isProfileComplete} 
                  className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 focus:bg-slate-100 dark:focus:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group/item"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover/item:bg-cyan-200 dark:group-hover/item:bg-cyan-800/50 transition-all duration-200">
                    <Clipboard className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors duration-200">پرینت برنامه</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">آماده‌سازی برای چاپ</span>
                  </div>
                </DropdownMenuItem>
                
                <div className="h-px bg-slate-200 dark:bg-slate-700/50 my-2 mx-1"></div>
                
                <DropdownMenuItem 
                  onClick={onDelete} 
                  className="flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-rose-600 dark:text-rose-500 focus:bg-rose-50 dark:focus:bg-rose-900/20 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-200 group/item"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover/item:bg-rose-200 dark:group-hover/item:bg-rose-800/50 transition-all duration-200">
                    <Trash2 className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="group-hover/item:text-rose-700 dark:group-hover/item:text-rose-300 transition-colors duration-200">حذف شاگرد</span>
                    <span className="text-xs text-rose-500/70 dark:text-rose-400/70">حذف کامل اطلاعات</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
            <div className="text-right">
              <p className="text-muted-foreground text-xs">قد</p>
              <p className="font-medium">{toPersianNumbers(student.height)} سانتی‌متر</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-xs">وزن</p>
              <p className="font-medium">{toPersianNumbers(student.weight)} کیلوگرم</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between mb-1 text-xs">
              <span className="text-muted-foreground">پیشرفت برنامه</span>
              <span className="font-medium">{toPersianNumbers(student.progress || 0)}٪</span>
            </div>
            <Progress value={student.progress || 0} className="h-2" indicatorClassName={progressColor} />
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-3">
            {student.exercises && student.exercises.length > 0 && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <Dumbbell className="mr-1 h-3 w-3" />
                <span>{toPersianNumbers(student.exercises.length)} تمرین</span>
              </Badge>
            )}
            
            {student.meals && student.meals.length > 0 && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <UtensilsCrossed className="mr-1 h-3 w-3" />
                <span>{toPersianNumbers(student.meals.length)} وعده</span>
              </Badge>
            )}
            
            {student.supplements && student.supplements.length > 0 && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Pill className="mr-1 h-3 w-3" />
                <span>{toPersianNumbers(student.supplements.length)} مکمل</span>
              </Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-3 pt-0 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEdit}
            className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
          >
            <Edit className="mr-1 h-3.5 w-3.5" />
            ویرایش شاگرد
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

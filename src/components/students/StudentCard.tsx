
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Dumbbell, UtensilsCrossed, Pill, Clipboard, User } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>ویرایش اطلاعات</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={onAddExercise} disabled={!isProfileComplete} className="cursor-pointer">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  <span>برنامه تمرینی</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={onAddDiet} disabled={!isProfileComplete} className="cursor-pointer">
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  <span>برنامه غذایی</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={onAddSupplement} disabled={!isProfileComplete} className="cursor-pointer">
                  <Pill className="mr-2 h-4 w-4" />
                  <span>مکمل و ویتامین</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem disabled={!isProfileComplete} className="cursor-pointer">
                  <Clipboard className="mr-2 h-4 w-4" />
                  <span>پرینت برنامه</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>حذف</span>
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

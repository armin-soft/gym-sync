
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Phone,
  Calendar,
  TrendingUp,
  Dumbbell,
  Apple,
  Pill,
  Edit,
  Trash2,
  User
} from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface ModernStudentCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
  isProfileComplete: boolean;
}

export const ModernStudentCard: React.FC<ModernStudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete
}) => {
  const getStatusColor = () => {
    if (student.status === "active") return "bg-emerald-500";
    if (student.status === "pending") return "bg-yellow-500";
    return "bg-slate-400";
  };

  const getStatusText = () => {
    if (student.status === "active") return "فعال";
    if (student.status === "pending") return "در انتظار";
    return "تکمیل شده";
  };

  const exerciseCount = (student.exercises?.length || 0) + 
                       (student.exercisesDay1?.length || 0) + 
                       (student.exercisesDay2?.length || 0) + 
                       (student.exercisesDay3?.length || 0) + 
                       (student.exercisesDay4?.length || 0);

  const mealCount = student.meals?.length || 0;
  const supplementCount = (student.supplements?.length || 0) + (student.vitamins?.length || 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
        {/* Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-pink-500/10 rounded-lg"></div>
        
        {/* Status Indicator */}
        <div className={cn("absolute top-4 left-4 w-3 h-3 rounded-full", getStatusColor())}></div>
        
        <CardContent className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                  <AvatarImage src={student.image || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback className="bg-gradient-to-bl from-indigo-500 to-purple-600 text-white text-lg font-semibold">
                    {student.name?.substring(0, 2) || "NA"}
                  </AvatarFallback>
                </Avatar>
                <div className={cn("absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white", getStatusColor())}></div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                  {student.name || "نام نامشخص"}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {getStatusText()}
                </Badge>
                {student.phone && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{toPersianNumbers(student.phone)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="h-4 w-4 ml-2" />
                  ویرایش اطلاعات
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onAddExercise}>
                  <Dumbbell className="h-4 w-4 ml-2" />
                  برنامه تمرینی
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onAddDiet}>
                  <Apple className="h-4 w-4 ml-2" />
                  برنامه غذایی
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onAddSupplement}>
                  <Pill className="h-4 w-4 ml-2" />
                  مکمل و ویتامین
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 ml-2" />
                  حذف شاگرد
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Body Measurements */}
          {(student.height || student.weight) && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {student.height && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">قد</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {toPersianNumbers(student.height)} سانتی‌متر
                  </p>
                </div>
              )}
              {student.weight && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">وزن</p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {toPersianNumbers(student.weight)} کیلوگرم
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Progress */}
          {student.progress !== undefined && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">پیشرفت</span>
                <span className="text-sm font-bold text-indigo-600">{toPersianNumbers(student.progress)}%</span>
              </div>
              <Progress value={student.progress} className="h-2" />
            </div>
          )}

          {/* Program Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <Dumbbell className="h-5 w-5 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                {toPersianNumbers(exerciseCount)}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">تمرین</p>
            </div>
            
            <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
              <Apple className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                {toPersianNumbers(mealCount)}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">غذا</p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <Pill className="h-5 w-5 text-purple-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {toPersianNumbers(supplementCount)}
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400">مکمل</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddExercise}
              className="flex-1 text-xs"
            >
              <Dumbbell className="h-3 w-3 ml-1" />
              تمرین
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddDiet}
              className="flex-1 text-xs"
            >
              <Apple className="h-3 w-3 ml-1" />
              غذا
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddSupplement}
              className="flex-1 text-xs"
            >
              <Pill className="h-3 w-3 ml-1" />
              مکمل
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

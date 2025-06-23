
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Phone, 
  Calendar, 
  Ruler, 
  Weight, 
  DollarSign,
  Edit,
  Trash2,
  MoreVertical,
  Dumbbell,
  Apple,
  Pill
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers, formatPrice } from "@/lib/utils/numbers";

interface StudentCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onManageProgram: () => void;
  index: number;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  onManageProgram,
  index
}) => {
  const getGenderInfo = () => {
    if (student.gender === "male") {
      return { label: "آقا", color: "from-blue-500 to-purple-500" };
    } else if (student.gender === "female") {
      return { label: "خانم", color: "from-pink-500 to-rose-500" };
    }
    return { label: "نامشخص", color: "from-slate-400 to-slate-600" };
  };

  const genderInfo = getGenderInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 student-card-hover overflow-hidden">
        {/* هدر کارت */}
        <div className="relative p-6 pb-0">
          <div className="absolute top-4 left-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
                <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                  <Edit className="ml-2 h-4 w-4" />
                  ویرایش
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onManageProgram} className="cursor-pointer">
                  <Dumbbell className="ml-2 h-4 w-4" />
                  مدیریت برنامه
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600">
                  <Trash2 className="ml-2 h-4 w-4" />
                  حذف
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarImage src={student.image} alt={student.name} />
              <AvatarFallback className="student-gradient-bg text-white text-lg font-bold">
                {student.name ? student.name.charAt(0) : "؟"}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {student.name || "نام نامشخص"}
              </h3>
              <Badge className={`bg-gradient-to-r ${genderInfo.color} text-white border-0`}>
                {genderInfo.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* اطلاعات شخصی */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {student.phone && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <Phone className="h-4 w-4 text-emerald-500" />
                <span className="text-slate-600 dark:text-slate-400">
                  {toPersianNumbers(student.phone)}
                </span>
              </div>
            )}
            
            {student.age && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <Calendar className="h-4 w-4 text-sky-500" />
                <span className="text-slate-600 dark:text-slate-400">
                  {toPersianNumbers(student.age)} سال
                </span>
              </div>
            )}
            
            {student.height && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <Ruler className="h-4 w-4 text-purple-500" />
                <span className="text-slate-600 dark:text-slate-400">
                  {toPersianNumbers(student.height)} سم
                </span>
              </div>
            )}
            
            {student.weight && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <Weight className="h-4 w-4 text-orange-500" />
                <span className="text-slate-600 dark:text-slate-400">
                  {toPersianNumbers(student.weight)} کیلو
                </span>
              </div>
            )}
          </div>

          {student.payment && (
            <div className="flex items-center justify-center p-3 bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20 rounded-lg">
              <DollarSign className="h-4 w-4 text-emerald-600 ml-2" />
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                {formatPrice(student.payment)}
              </span>
            </div>
          )}

          {/* دکمه‌های عملیات */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="flex-1 bg-white/50 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <Edit className="ml-2 h-4 w-4" />
              ویرایش
            </Button>
            <Button
              onClick={onManageProgram}
              size="sm"
              className="flex-1 student-gradient-bg text-white hover:opacity-90 transition-all duration-300"
            >
              <Dumbbell className="ml-2 h-4 w-4" />
              برنامه
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

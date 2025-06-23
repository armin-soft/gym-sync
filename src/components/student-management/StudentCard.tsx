
import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Calendar, Weight, Ruler, Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Student } from '@/components/students/StudentTypes';
import { toPersianNumbers, formatPrice } from '@/lib/utils/numbers';

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onView: (student: Student) => void;
  onProgram: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  onView,
  onProgram
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="student-card-hover"
    >
      <Card className="relative overflow-hidden rounded-3xl border-0 student-glass-effect bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300">
        
        {/* Background Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-2 student-gradient-primary"></div>
        
        <div className="p-6">
          {/* Header with Avatar and Actions */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-4 border-white dark:border-slate-800 shadow-lg">
                  <AvatarImage src={student.image} alt={student.name} />
                  <AvatarFallback className="student-gradient-primary text-white text-lg font-bold">
                    {student.name?.charAt(0) || 'ش'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
                  {student.name || 'نام نامشخص'}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600 dark:text-slate-400 text-sm" dir="ltr">
                    {toPersianNumbers(student.phone || '')}
                  </span>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-slate-200 dark:border-slate-700">
                <DropdownMenuItem onClick={() => onView(student)} className="gap-2 cursor-pointer">
                  <Eye className="w-4 h-4" />
                  مشاهده جزئیات
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(student)} className="gap-2 cursor-pointer">
                  <Edit className="w-4 h-4" />
                  ویرایش
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onProgram(student)} className="gap-2 cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  برنامه تمرینی
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(student.id)} className="gap-2 cursor-pointer text-red-600 dark:text-red-400">
                  <Trash2 className="w-4 h-4" />
                  حذف
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Student Info */}
          <div className="space-y-4">
            {/* Gender Badge */}
            {student.gender && (
              <div className="flex justify-start">
                <Badge 
                  variant="outline" 
                  className={`px-3 py-1 rounded-full ${
                    student.gender === 'male' 
                      ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700/30' 
                      : 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-700/30'
                  }`}
                >
                  <User className="w-3 h-3 ml-1" />
                  {student.gender === 'male' ? 'آقا' : 'خانم'}
                </Badge>
              </div>
            )}

            {/* Physical Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-center">
                <Ruler className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-400">قد</p>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {toPersianNumbers(student.height || '0')} سانتی‌متر
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-center">
                <Weight className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-400">وزن</p>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {toPersianNumbers(student.weight || '0')} کیلوگرم
                </p>
              </div>
            </div>

            {/* Payment Info */}
            {student.payment && (
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">مبلغ پرداختی</p>
                <p className="font-bold text-emerald-700 dark:text-emerald-400 text-lg">
                  {formatPrice(student.payment)}
                </p>
              </div>
            )}

            {/* Age */}
            {student.age && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>سن: {toPersianNumbers(student.age)} سال</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-2">
            <Button
              onClick={() => onProgram(student)}
              className="flex-1 student-gradient-primary hover:opacity-90 text-white border-0 rounded-xl py-2 text-sm"
            >
              برنامه تمرینی
            </Button>
            <Button
              onClick={() => onEdit(student)}
              variant="outline"
              className="flex-1 border-2 border-slate-200 dark:border-slate-700 hover:student-gradient-secondary hover:text-white hover:border-transparent rounded-xl py-2 text-sm transition-all duration-300"
            >
              ویرایش
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

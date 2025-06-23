
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Phone, 
  Weight, 
  Ruler, 
  Calendar,
  Edit,
  Trash2,
  MoreVertical,
  Dumbbell,
  Apple,
  Pill
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-blue-200">
            <AvatarImage src={student.image} alt={student.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <User className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-bold text-lg text-gray-800">{student.name}</h3>
            {student.gender && (
              <Badge 
                variant="outline" 
                className={`mt-1 ${
                  student.gender === 'male' 
                    ? 'border-blue-200 text-blue-700 bg-blue-50' 
                    : 'border-pink-200 text-pink-700 bg-pink-50'
                }`}
              >
                {student.gender === 'male' ? 'آقا' : 'خانم'}
              </Badge>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
              <Edit className="w-4 h-4 ml-2" />
              ویرایش
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onAddExercise} className="cursor-pointer">
              <Dumbbell className="w-4 h-4 ml-2" />
              برنامه ورزشی
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onAddDiet} className="cursor-pointer">
              <Apple className="w-4 h-4 ml-2" />
              برنامه غذایی
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onAddSupplement} className="cursor-pointer">
              <Pill className="w-4 h-4 ml-2" />
              مکمل‌ها
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600">
              <Trash2 className="w-4 h-4 ml-2" />
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Phone className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">موبایل</span>
          </div>
          <span className="font-semibold text-gray-800 persian-number">
            {toPersianNumbers(student.phone)}
          </span>
        </div>

        {student.age && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">سن</span>
            </div>
            <span className="font-semibold text-gray-800 persian-number">
              {toPersianNumbers(student.age.toString())} سال
            </span>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Ruler className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">قد</span>
          </div>
          <span className="font-semibold text-gray-800 persian-number">
            {toPersianNumbers(student.height)} سم
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Weight className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-600">وزن</span>
          </div>
          <span className="font-semibold text-gray-800 persian-number">
            {toPersianNumbers(student.weight)} کیلو
          </span>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4">
        <div className="text-center">
          <span className="text-sm text-gray-600 block mb-1">شهریه</span>
          <span className="font-bold text-lg text-blue-700 persian-number">
            {formatPrice(student.payment)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div 
        className="flex gap-2"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          onClick={onAddExercise}
          size="sm" 
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
        >
          <Dumbbell className="w-4 h-4 ml-1" />
          برنامه
        </Button>
        
        <Button 
          onClick={onEdit}
          size="sm" 
          variant="outline"
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <Edit className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

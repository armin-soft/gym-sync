
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Edit, 
  Trash2, 
  Phone, 
  Ruler, 
  Weight, 
  DollarSign,
  User,
  Calendar,
  GraduationCap,
  Users
} from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers, formatPrice } from "@/lib/utils/numbers";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onManageProgram: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  onManageProgram
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 border border-blue-200/50 dark:border-blue-800/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400 to-purple-400 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full translate-y-12 -translate-x-12" />
        </div>

        <CardContent className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Avatar className="w-16 h-16 border-3 border-gradient-to-r from-blue-400 to-purple-400 shadow-lg">
                <AvatarImage src={student.image} alt={student.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {student.name}
                </h3>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Badge 
                    variant={student.gender === "male" ? "default" : "secondary"}
                    className={`${
                      student.gender === "male" 
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
                        : "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                    }`}
                  >
                    {student.gender === "male" ? "آقا" : "خانم"}
                  </Badge>
                  {student.age && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {toPersianNumbers(student.age)} ساله
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(student)}
                className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(student.id)}
                className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-3 space-x-reverse mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium" dir="ltr">
              {toPersianNumbers(student.phone)}
            </span>
          </div>

          {/* Physical Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
              <Ruler className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <span className="text-xs text-gray-600 dark:text-gray-400">قد</span>
                <p className="text-sm font-semibold">
                  {toPersianNumbers(student.height)} سم
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg">
              <Weight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <div>
                <span className="text-xs text-gray-600 dark:text-gray-400">وزن</span>
                <p className="text-sm font-semibold">
                  {toPersianNumbers(student.weight)} کیلو
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {(student.grade || student.group) && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {student.grade && (
                <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">مقطع</span>
                    <p className="text-sm font-semibold">{student.grade}</p>
                  </div>
                </div>
              )}
              {student.group && (
                <div className="flex items-center space-x-2 space-x-reverse p-2 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg">
                  <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">گروه</span>
                    <p className="text-sm font-semibold">{student.group}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Payment Info */}
          {student.payment && (
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-900 rounded-lg mb-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ برنامه:</span>
              </div>
              <span className="text-sm font-bold text-amber-800 dark:text-amber-200">
                {formatPrice(student.payment)} تومان
              </span>
            </div>
          )}

          {/* Program Management Button */}
          <Button
            onClick={() => onManageProgram(student)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            مدیریت برنامه‌ها
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

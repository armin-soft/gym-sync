
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Phone, 
  Weight, 
  Ruler, 
  Wallet, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Dumbbell
} from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers, formatPrice } from "@/lib/utils/numbers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModernStudentCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onAddProgram: () => void;
  index: number;
}

export const ModernStudentCard: React.FC<ModernStudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  onAddProgram,
  index
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const getGenderBadge = () => {
    if (student.gender === "male") {
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
          آقا
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800">
          بانو
        </Badge>
      );
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.2 } 
      }}
      className="h-full"
    >
      <Card className="h-full relative overflow-hidden bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/50 border-gray-200/60 dark:border-slate-700/60 shadow-md hover:shadow-xl transition-all duration-300 group">
        
        {/* Header Gradient */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-l from-indigo-500 via-purple-500 to-blue-500 opacity-90"></div>
        
        {/* Content */}
        <div className="relative p-5">
          
          {/* Top Section - Avatar & Actions */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-16 w-16 border-3 border-white shadow-lg ring-2 ring-white/20">
                  <AvatarImage src={student.image} alt={student.name} />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
                    {student.name?.charAt(0) || <User className="h-6 w-6" />}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1">
                  {getGenderBadge()}
                </div>
              </div>
              
              <div className="text-white">
                <h3 className="font-bold text-lg mb-1 drop-shadow-sm">{student.name}</h3>
                <div className="flex items-center gap-1 text-white/90 text-sm">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{toPersianNumbers(student.phone || "---")}</span>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                  <Edit className="h-4 w-4 ml-2" />
                  ویرایش
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onAddProgram} className="cursor-pointer">
                  <Dumbbell className="h-4 w-4 ml-2" />
                  برنامه
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600">
                  <Trash2 className="h-4 w-4 ml-2" />
                  حذف
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <StatItem
              icon={<Ruler className="h-4 w-4 text-blue-600" />}
              label="قد"
              value={`${toPersianNumbers(student.height || "---")} سم`}
              bgClass="bg-blue-50 dark:bg-blue-900/20"
            />
            <StatItem
              icon={<Weight className="h-4 w-4 text-green-600" />}
              label="وزن"
              value={`${toPersianNumbers(student.weight || "---")} کیلو`}
              bgClass="bg-green-50 dark:bg-green-900/20"
            />
          </div>

          {/* Payment Section */}
          <div className="bg-gradient-to-l from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-blue-900/20 rounded-xl p-3 mb-4 border border-purple-100 dark:border-purple-800/30">
            <div className="flex items-center gap-2 mb-1">
              <Wallet className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">مبلغ پرداختی</span>
            </div>
            <p className="text-lg font-bold text-purple-800 dark:text-purple-200">
              {formatPrice(student.payment || "0")}
            </p>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onAddProgram}
            className="w-full bg-gradient-to-l from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30"
          >
            <Calendar className="h-4 w-4 ml-2" />
            تخصیص برنامه
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgClass: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, bgClass }) => (
  <div className={`${bgClass} rounded-lg p-3 border border-white/50 dark:border-slate-700/50`}>
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </div>
    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{value}</p>
  </div>
);

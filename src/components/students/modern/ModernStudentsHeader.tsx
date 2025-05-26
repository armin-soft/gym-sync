
import React from "react";
import { Plus, Users, TrendingUp, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernStudentsHeaderProps {
  totalStudents: number;
  activeStudents: number;
  newStudentsThisWeek: number;
  onAddStudent: () => void;
  onRefresh?: () => void;
  onExportData?: () => void;
}

export const ModernStudentsHeader: React.FC<ModernStudentsHeaderProps> = ({
  totalStudents,
  activeStudents,
  newStudentsThisWeek,
  onAddStudent,
  onRefresh,
  onExportData
}) => {
  return (
    <div className="space-y-6 mb-8" dir="rtl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-l from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            مدیریت شاگردان
          </h1>
          <p className="text-muted-foreground text-lg">
            کنترل و نظارت بر پیشرفت تمامی شاگردان
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {onRefresh && (
                <DropdownMenuItem onClick={onRefresh}>
                  <TrendingUp className="h-4 w-4 ml-2" />
                  بروزرسانی داده‌ها
                </DropdownMenuItem>
              )}
              {onExportData && (
                <DropdownMenuItem onClick={onExportData}>
                  <Filter className="h-4 w-4 ml-2" />
                  خروجی اکسل
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            onClick={onAddStudent}
            className="bg-gradient-to-l from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Plus className="h-5 w-5 ml-2" />
            افزودن شاگرد جدید
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="relative overflow-hidden border-0 bg-gradient-to-bl from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  کل شاگردان
                </p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                  {toPersianNumbers(totalStudents)}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  تعداد کل ثبت شده
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-bl from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-500 to-green-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  شاگردان فعال
                </p>
                <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                  {toPersianNumbers(activeStudents)}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  در حال تمرین
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-bl from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-violet-600"></div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  عضویت این هفته
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                    {toPersianNumbers(newStudentsThisWeek)}
                  </p>
                  {newStudentsThisWeek > 0 && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                      جدید
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  ثبت‌نام اخیر
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};


import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface StudentManagementHeaderProps {
  totalStudents: number;
  activeStudents: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddStudent: () => void;
  onRefresh: () => void;
  lastRefresh?: Date;
}

export const StudentManagementHeader: React.FC<StudentManagementHeaderProps> = ({
  totalStudents,
  activeStudents,
  searchQuery,
  onSearchChange,
  onAddStudent,
  onRefresh,
  lastRefresh
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-8 mb-8 student-glass-effect border-0 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Title and Stats */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl student-gradient-primary flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold student-text-gradient">
                  مدیریت شاگردان
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  مدیریت کامل اطلاعات و برنامه‌های تمرینی شاگردان
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4">
              <Badge variant="outline" className="px-4 py-2 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700/30">
                <Users className="w-4 h-4 ml-2" />
                کل شاگردان: {toPersianNumbers(totalStudents)}
              </Badge>
              <Badge variant="outline" className="px-4 py-2 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700/30">
                فعال: {toPersianNumbers(activeStudents)}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onRefresh}
              variant="outline"
              className="gap-2 border-2 hover:student-gradient-accent hover:text-white hover:border-transparent transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              بروزرسانی
            </Button>
            
            <Button
              onClick={onAddStudent}
              className="student-gradient-primary hover:opacity-90 text-white border-0 shadow-lg gap-2 px-6 py-3 rounded-xl"
            >
              <Plus className="w-5 h-5" />
              افزودن شاگرد جدید
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mt-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="جستجو در نام، شماره تماس یا کد ملی..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-12 pl-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-slate-800"
            />
          </div>
          
          <Button
            variant="outline"
            className="gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:student-gradient-secondary hover:text-white hover:border-transparent transition-all duration-300"
          >
            <Filter className="w-4 h-4" />
            فیلترها
          </Button>
        </div>

        {/* Last Refresh Info */}
        {lastRefresh && (
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            آخرین بروزرسانی: {toPersianNumbers(lastRefresh.toLocaleTimeString('fa-IR'))}
          </div>
        )}
      </div>
    </motion.div>
  );
};


import React, { useState } from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns-jalali";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useHistory } from '../../history/useHistory';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Filter, XCircle, Trash2, Clock, User, Dumbbell, UtensilsCrossed, Pill, Pencil, RefreshCw } from "lucide-react";

interface StudentHistoryProps {
  students: Student[];
  historyEntries: HistoryEntry[];
  onClearHistory: () => void;
}

export const StudentHistory = ({
  students,
  historyEntries,
  onClearHistory,
}: StudentHistoryProps) => {
  const {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    timeRange,
    setTimeRange,
    selectedStudent,
    setSelectedStudent,
    filteredEntries,
    formatDate,
    clearFilters,
  } = useHistory(historyEntries);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: i * 0.05 
      }
    })
  };

  // Get appropriate badge color based on entry type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'add':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40';
      case 'edit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/40';
      case 'delete':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40';
      case 'exercise':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/40';
      case 'diet':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/40';
      case 'supplement':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/40';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Get icon for history entry type
  const getIcon = (type: string) => {
    switch (type) {
      case 'add':
        return <User className="h-4 w-4" />;
      case 'edit':
        return <Pencil className="h-4 w-4" />;
      case 'delete':
        return <Trash2 className="h-4 w-4" />;
      case 'exercise':
        return <Dumbbell className="h-4 w-4" />;
      case 'diet':
        return <UtensilsCrossed className="h-4 w-4" />;
      case 'supplement':
        return <Pill className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white/50 dark:bg-gray-900/50 border-b border-gray-200/70 dark:border-gray-800/70">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="جستجو در تاریخچه..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-9 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select
              className="h-9 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">همه فعالیت‌ها</option>
              <option value="add">افزودن</option>
              <option value="edit">ویرایش</option>
              <option value="delete">حذف</option>
              <option value="exercise">برنامه تمرینی</option>
              <option value="diet">برنامه غذایی</option>
              <option value="supplement">مکمل و ویتامین</option>
            </select>
            
            <select
              className="h-9 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="all">همه زمان‌ها</option>
              <option value="day">امروز</option>
              <option value="week">هفته اخیر</option>
              <option value="month">ماه اخیر</option>
            </select>
            
            <select
              className="h-9 px-3 py-1 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              value={selectedStudent === 'all' ? 'all' : selectedStudent.toString()}
              onChange={(e) => setSelectedStudent(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            >
              <option value="all">همه شاگردان</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="h-9 gap-1"
              disabled={filter === 'all' && timeRange === 'all' && searchQuery === '' && selectedStudent === 'all'}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>پاک کردن</span>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="h-9 gap-1">
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>حذف همه</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>حذف تاریخچه</AlertDialogTitle>
                  <AlertDialogDescription>
                    آیا از حذف تمام تاریخچه فعالیت‌ها اطمینان دارید؟ این عمل غیرقابل بازگشت است.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>انصراف</AlertDialogCancel>
                  <AlertDialogAction onClick={onClearHistory}>تایید</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>
      </div>
      
      <ScrollArea className="flex-1">
        {filteredEntries.length > 0 ? (
          <motion.div
            className="p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              {/* Time line */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
              
              {/* History entries */}
              <div className="space-y-5">
                {filteredEntries.map((entry, index) => (
                  <motion.div
                    key={`${entry.timestamp}-${index}`}
                    custom={index}
                    variants={itemVariants}
                    className="relative pl-14 pr-2"
                  >
                    {/* Time icon */}
                    <div className="absolute left-3 p-2 bg-white dark:bg-gray-900 rounded-full border-2 border-gray-200 dark:border-gray-800 z-10">
                      {getIcon(entry.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{entry.studentName}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{entry.details}</p>
                        </div>
                        <Badge
                          className={`${getBadgeVariant(entry.type)} text-xs`}
                        >
                          {entry.type === 'add' && 'افزودن'}
                          {entry.type === 'edit' && 'ویرایش'}
                          {entry.type === 'delete' && 'حذف'}
                          {entry.type === 'exercise' && 'تمرین'}
                          {entry.type === 'diet' && 'غذا'}
                          {entry.type === 'supplement' && 'مکمل'}
                        </Badge>
                      </div>
                      <div className="flex justify-end mt-2">
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {toPersianNumbers(formatDate(entry.timestamp))}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-3 mb-4">
                <XCircle className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">تاریخچه‌ای یافت نشد</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                هیچ فعالیتی با فیلترهای انتخاب شده یافت نشد. فیلترها را تغییر دهید یا با انجام فعالیت‌های جدید تاریخچه را ایجاد کنید.
              </p>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

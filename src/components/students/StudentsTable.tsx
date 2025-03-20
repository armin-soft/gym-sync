
import React, { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  UserRound, 
  Phone, 
  Ruler, 
  Weight, 
  Edit, 
  Trash2, 
  Dumbbell, 
  Apple, 
  Pill, 
  Download,
  Coins,
  Search,
  FileText,
  Plus,
  LayoutGrid,
  ListFilter
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyStudentState } from "./EmptyStudentState";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Student } from "@/components/students/StudentTypes";

interface StudentsTableProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger?: number;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const StudentsTable = ({
  students,
  sortedAndFilteredStudents,
  searchQuery,
  refreshTrigger = 0,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
  onClearSearch,
}: StudentsTableProps) => {
  const [key, setKey] = useState(0);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [refreshTrigger]);

  const isSearching = searchQuery !== "" && sortedAndFilteredStudents.length === 0;
  const showEmptyState = students.length === 0 || isSearching;

  console.log({
    studentsLength: students.length,
    sortedAndFilteredStudentsLength: sortedAndFilteredStudents.length,
    isSearching,
    showEmptyState
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  if (showEmptyState) {
    return (
      <div className="h-[calc(100vh-20rem)] rounded-lg border border-indigo-100/40 dark:border-indigo-900/30">
        <EmptyStudentState 
          isSearching={isSearching} 
          onAddStudent={onAddStudent} 
          onClearSearch={onClearSearch} 
        />
      </div>
    );
  }

  if (sortedAndFilteredStudents.length === 0) {
    return (
      <div className="h-[calc(100vh-20rem)] rounded-lg border border-indigo-100/40 dark:border-indigo-900/30 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="size-20 mx-auto bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
            <Search className="size-10 text-indigo-400/50" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            در حال بارگذاری...
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            لطفاً چند لحظه صبر کنید
          </p>
        </div>
      </div>
    );
  }

  const renderViewToggle = () => (
    <div className="flex items-center justify-end mb-4 gap-2">
      <Button
        variant={viewMode === 'table' ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode('table')}
        className={`h-9 w-9 p-0 rounded-lg ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'border-indigo-200 text-indigo-600 dark:border-indigo-800 dark:text-indigo-400'}`}
      >
        <ListFilter className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'grid' ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode('grid')}
        className={`h-9 w-9 p-0 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'border-indigo-200 text-indigo-600 dark:border-indigo-800 dark:text-indigo-400'}`}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );

  const renderTableView = () => (
    <ScrollArea className="h-[calc(100vh-20rem)] rounded-lg">
      <AnimatePresence mode="wait" key={key}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3 p-1"
        >
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-indigo-100/30 dark:border-indigo-900/30">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-indigo-950/20 dark:to-blue-950/20 border-b border-indigo-100 dark:border-indigo-900 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40">
                  <TableHead className="w-14 text-center">
                    <UserRound className="h-4 w-4 mx-auto text-indigo-500" />
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-indigo-100 dark:bg-indigo-900/50">
                        <UserRound className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="font-medium text-indigo-900 dark:text-indigo-300">نام و نام خانوادگی</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-blue-100 dark:bg-blue-900/50">
                        <Phone className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium text-blue-900 dark:text-blue-300">شماره موبایل</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-purple-100 dark:bg-purple-900/50">
                        <Ruler className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="font-medium text-purple-900 dark:text-purple-300">قد (سانتی متر)</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-teal-100 dark:bg-teal-900/50">
                        <Weight className="h-3 w-3 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="font-medium text-teal-900 dark:text-teal-300">وزن (کیلوگرم)</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-amber-100 dark:bg-amber-900/50">
                        <Coins className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span className="font-medium text-amber-900 dark:text-amber-300">مبلغ (تومان)</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2 justify-center">
                      <span className="font-medium text-indigo-900 dark:text-indigo-300">برنامه‌ها</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-left">
                    <span className="font-medium text-indigo-900 dark:text-indigo-300">عملیات</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAndFilteredStudents.map((student) => (
                  <motion.tr 
                    key={`${student.id}-${key}`} 
                    variants={item}
                    className="group transition-all duration-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 border-b border-indigo-100/40 dark:border-indigo-900/30"
                  >
                    <TableCell className="py-4">
                      <div className="relative w-12 h-12 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-sky-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                        <img
                          src={student.image || '/placeholder.svg'}
                          alt={student.name}
                          className="relative rounded-full object-cover w-full h-full ring-2 ring-white dark:ring-gray-800 shadow-lg group-hover:ring-indigo-200 group-hover:shadow-indigo-200/20 transition-all duration-300"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors duration-300">{student.name}</div>
                    </TableCell>
                    <TableCell dir="ltr" className="font-mono text-sm text-gray-600 dark:text-gray-400">
                      {toPersianNumbers(student.phone)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {toPersianNumbers(student.height)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {toPersianNumbers(student.weight)}
                    </TableCell>
                    <TableCell>
                      {student.payment ? (
                        <div className="text-sm font-medium text-amber-700 dark:text-amber-500">
                          {toPersianNumbers(student.payment)}
                        </div>
                      ) : (
                        <span className="inline-block py-1 px-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs rounded-full">
                          تعیین نشده
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col items-center">
                          <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-800 dark:text-blue-300 font-medium size-7 flex items-center justify-center rounded-full text-xs shadow-sm">
                            {toPersianNumbers(student.exercises?.length || 0)}
                          </div>
                          <span className="text-xs text-blue-600 dark:text-blue-400 mt-1">تمرین</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 text-green-800 dark:text-green-300 font-medium size-7 flex items-center justify-center rounded-full text-xs shadow-sm">
                            {toPersianNumbers(student.meals?.length || 0)}
                          </div>
                          <span className="text-xs text-green-600 dark:text-green-400 mt-1">غذا</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-800 dark:text-purple-300 font-medium size-7 flex items-center justify-center rounded-full text-xs shadow-sm">
                            {toPersianNumbers((student.supplements?.length || 0) + (student.vitamins?.length || 0))}
                          </div>
                          <span className="text-xs text-purple-600 dark:text-purple-400 mt-1">مکمل</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(student)}
                                className="size-8 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 rounded-full"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>ویرایش شاگرد</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(student.id)}
                                className="size-8 text-slate-600 hover:bg-red-100 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-900/50 dark:hover:text-red-400 rounded-full"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>حذف شاگرد</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onAddExercise(student)}
                                className="size-8 text-slate-600 hover:bg-blue-100 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-900/50 dark:hover:text-blue-400 rounded-full"
                              >
                                <Dumbbell className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>مدیریت تمرین‌ها</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onAddDiet(student)}
                                className="size-8 text-slate-600 hover:bg-green-100 hover:text-green-700 dark:text-slate-300 dark:hover:bg-green-900/50 dark:hover:text-green-400 rounded-full"
                              >
                                <Apple className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>مدیریت برنامه غذایی</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onAddSupplement(student)}
                                className="size-8 text-slate-600 hover:bg-purple-100 hover:text-purple-700 dark:text-slate-300 dark:hover:bg-purple-900/50 dark:hover:text-purple-400 rounded-full"
                              >
                                <Pill className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>مدیریت مکمل‌ها و ویتامین‌ها</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDownload(student)}
                                className={`size-8 text-slate-600 dark:text-slate-300 ${
                                  !student.payment 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400'
                                } rounded-full`}
                                disabled={!student.payment}
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>{!student.payment ? "برای دانلود باید مبلغ را تعیین کنید" : "دانلود اطلاعات"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </AnimatePresence>
    </ScrollArea>
  );

  const renderGridView = () => (
    <ScrollArea className="h-[calc(100vh-20rem)] rounded-lg">
      <AnimatePresence mode="wait" key={key}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-1"
        >
          {sortedAndFilteredStudents.map((student) => (
            <motion.div
              key={`${student.id}-${key}`}
              variants={item}
              className="group rounded-xl overflow-hidden bg-white/90 dark:bg-slate-900/70 border border-indigo-100/30 dark:border-indigo-900/30 shadow-sm hover:shadow-md transition-all duration-300 hover:shadow-indigo-500/5 hover:border-indigo-200/50 dark:hover:border-indigo-700/50"
            >
              <div className="relative h-24 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 dark:from-indigo-600/20 dark:to-blue-600/20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,theme(colors.indigo.500/10%),transparent_70%)]" />
                <div className="absolute -bottom-8 left-4 size-16 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-white dark:bg-slate-800">
                  <img
                    src={student.image || '/placeholder.svg'}
                    alt={student.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="p-4 pt-10">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {student.name}
                </h3>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <Phone className="h-3 w-3 mr-1" />
                  <span dir="ltr">{toPersianNumbers(student.phone)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center bg-gray-50 dark:bg-slate-800 p-2 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <Ruler className="h-3 w-3" />
                      <span>قد</span>
                    </div>
                    <div className="font-medium text-sm">
                      {toPersianNumbers(student.height)}
                    </div>
                  </div>
                  <div className="text-center bg-gray-50 dark:bg-slate-800 p-2 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <Weight className="h-3 w-3" />
                      <span>وزن</span>
                    </div>
                    <div className="font-medium text-sm">
                      {toPersianNumbers(student.weight)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-lg p-1 px-2">
                      <span className="text-xs text-blue-600 dark:text-blue-400">تمرین</span>
                      <span className="font-medium text-sm text-blue-700 dark:text-blue-300">
                        {toPersianNumbers(student.exercises?.length || 0)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/30 rounded-lg p-1 px-2">
                      <span className="text-xs text-green-600 dark:text-green-400">غذا</span>
                      <span className="font-medium text-sm text-green-700 dark:text-green-300">
                        {toPersianNumbers(student.meals?.length || 0)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-purple-50 dark:bg-purple-900/30 rounded-lg p-1 px-2">
                      <span className="text-xs text-purple-600 dark:text-purple-400">مکمل</span>
                      <span className="font-medium text-sm text-purple-700 dark:text-purple-300">
                        {toPersianNumbers((student.supplements?.length || 0) + (student.vitamins?.length || 0))}
                      </span>
                    </div>
                  </div>
                  <div>
                    {student.payment ? (
                      <div className="text-xs font-medium px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                        {toPersianNumbers(student.payment)}
                      </div>
                    ) : (
                      <div className="text-xs px-2 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                        بدون مبلغ
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(student)}
                          className="size-8 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 rounded-full"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>ویرایش شاگرد</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(student.id)}
                          className="size-8 text-slate-600 hover:bg-red-100 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-900/50 dark:hover:text-red-400 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>حذف شاگرد</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onAddExercise(student)}
                          className="size-8 text-slate-600 hover:bg-blue-100 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-900/50 dark:hover:text-blue-400 rounded-full"
                        >
                          <Dumbbell className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>مدیریت تمرین‌ها</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onAddDiet(student)}
                          className="size-8 text-slate-600 hover:bg-green-100 hover:text-green-700 dark:text-slate-300 dark:hover:bg-green-900/50 dark:hover:text-green-400 rounded-full"
                        >
                          <Apple className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>مدیریت برنامه غذایی</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onAddSupplement(student)}
                          className="size-8 text-slate-600 hover:bg-purple-100 hover:text-purple-700 dark:text-slate-300 dark:hover:bg-purple-900/50 dark:hover:text-purple-400 rounded-full"
                        >
                          <Pill className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>مدیریت مکمل‌ها و ویتامین‌ها</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDownload(student)}
                          className={`size-8 text-slate-600 dark:text-slate-300 ${
                            !student.payment 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400'
                          } rounded-full`}
                          disabled={!student.payment}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>{!student.payment ? "برای دانلود باید مبلغ را تعیین کنید" : "دانلود اطلاعات"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add new student card */}
          <motion.div
            variants={item}
            className="group rounded-xl overflow-hidden bg-gradient-to-br from-indigo-50/80 to-blue-50/80 dark:from-indigo-950/70 dark:to-blue-950/70 border border-indigo-100/50 dark:border-indigo-900/50 shadow-sm hover:shadow-md transition-all duration-300 hover:shadow-indigo-500/10 hover:border-indigo-300/50 dark:hover:border-indigo-700/70 flex flex-col items-center justify-center cursor-pointer h-[300px]"
            onClick={onAddStudent}
          >
            <div className="size-20 rounded-full bg-indigo-100/80 dark:bg-indigo-900/50 flex items-center justify-center mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/70 transition-colors">
              <Plus className="size-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-300">
              افزودن شاگرد جدید
            </h3>
            <p className="text-sm text-indigo-500/70 dark:text-indigo-400/70 mt-1">
              برای افزودن کلیک کنید
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </ScrollArea>
  );

  return (
    <>
      {renderViewToggle()}
      {viewMode === 'table' ? renderTableView() : renderGridView()}
    </>
  );
};

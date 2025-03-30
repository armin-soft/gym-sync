
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "./StudentTypes";
import { Edit, Trash2, MoreVertical, User, Clipboard, Dumbbell, UtensilsCrossed, Pill, Download, Filter, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface StudentsTableProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger: number;
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  viewMode: "table" | "grid";
}

export const StudentsTable = ({ 
  students, 
  sortedAndFilteredStudents,
  searchQuery,
  refreshTrigger,
  onEdit, 
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
  onClearSearch,
  viewMode
}: StudentsTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const getStatusBadge = (student: Student) => {
    // Check if the student has any exercises, meals, or supplements
    const hasExercises = student.exercises?.length || student.exercisesDay1?.length || 
                         student.exercisesDay2?.length || student.exercisesDay3?.length || 
                         student.exercisesDay4?.length;
    const hasMeals = student.meals?.length;
    const hasSupplements = student.supplements?.length || student.vitamins?.length;
    
    if (hasExercises && hasMeals && hasSupplements) {
      return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">تکمیل</Badge>;
    } else if (hasExercises || hasMeals || hasSupplements) {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">در حال انجام</Badge>;
    } else {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">جدید</Badge>;
    }
  };

  // Use the calculated progress from the student object if available, otherwise calculate it here
  const getCompletionPercentage = (student: Student) => {
    if (typeof student.progress === 'number') {
      return student.progress;
    }
    
    let total = 0;
    let completed = 0;
    
    // Check exercises
    total += 1;
    if (student.exercises?.length || student.exercisesDay1?.length || 
        student.exercisesDay2?.length || student.exercisesDay3?.length || 
        student.exercisesDay4?.length) {
      completed += 1;
    }
    
    // Check meals
    total += 1;
    if (student.meals?.length) completed += 1;
    
    // Check supplements
    total += 1;
    if (student.supplements?.length || student.vitamins?.length) completed += 1;
    
    return Math.round((completed / total) * 100);
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
        <User className="h-10 w-10 text-slate-400" />
      </div>
      <p className="font-medium text-lg mb-3">هیچ شاگردی یافت نشد</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center max-w-sm">
        {searchQuery 
          ? "هیچ شاگردی با عبارت جستجو شده مطابقت ندارد. جستجوی دیگری انجام دهید یا فیلترها را پاک کنید."
          : "شما هنوز هیچ شاگردی اضافه نکرده‌اید. برای شروع، شاگرد جدیدی اضافه کنید."
        }
      </p>
      {searchQuery ? (
        <Button 
          variant="outline" 
          onClick={onClearSearch}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          پاک کردن جستجو
        </Button>
      ) : (
        <Button 
          onClick={onAddStudent}
          className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
        >
          <User className="h-4 w-4" />
          افزودن شاگرد جدید
        </Button>
      )}
    </div>
  );

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-emerald-500";
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 30) return "bg-amber-500";
    return "bg-blue-500";
  };

  if (viewMode === "grid") {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAndFilteredStudents.length === 0 ? (
            <div className="col-span-full">
              {renderEmptyState()}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {sortedAndFilteredStudents.map((student, index) => (
                <motion.div
                  layout
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => onEdit(student)}
                  onMouseEnter={() => setHoveredCardId(student.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="relative overflow-hidden cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-70 blur-xl rounded-3xl -z-10 group-hover:opacity-100 transition-opacity duration-300 scale-[0.85] group-hover:scale-90 bg-gradient-to-tr from-indigo-100 to-violet-100 dark:from-indigo-950/40 dark:to-violet-950/40" />
                  
                  <div className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-6 shadow-xl shadow-indigo-100/20 dark:shadow-indigo-950/10 transition-all duration-300 h-full">
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(student)}
                    </div>
                  
                    <div className="flex flex-col items-center text-center pt-4 pb-6">
                      <Avatar className="h-20 w-20 border-2 border-white dark:border-gray-800 shadow-lg mb-4">
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-lg font-semibold">
                          {student.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{student.name}</h3>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 dir-ltr mb-3">
                        {toPersianNumbers(student.phone)}
                      </p>
                      
                      <div className="flex items-center justify-center gap-3">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">قد</p>
                          <p className="font-medium text-sm">{toPersianNumbers(student.height)}</p>
                        </div>
                        
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">وزن</p>
                          <p className="font-medium text-sm">{toPersianNumbers(student.weight)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">پیشرفت برنامه</span>
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                            {toPersianNumbers(getCompletionPercentage(student))}٪
                          </span>
                        </div>
                        <Progress 
                          value={getCompletionPercentage(student)} 
                          className="h-2"
                          indicatorClassName={getProgressColor(getCompletionPercentage(student))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2 rtl:space-x-reverse">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddExercise(student);
                            }}
                          >
                            <Dumbbell className="h-3.5 w-3.5" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddDiet(student);
                            }}
                          >
                            <UtensilsCrossed className="h-3.5 w-3.5" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddSupplement(student);
                            }}
                          >
                            <Pill className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 z-50 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                            <DropdownMenuItem 
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDownload(student);
                              }}
                            >
                              <Download className="h-4 w-4" />
                              <span>دانلود برنامه</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Placeholder for future functionality
                              }}
                            >
                              <Clipboard className="h-4 w-4" />
                              <span>پرینت برنامه</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(student.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>حذف</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    {hoveredCardId === student.id && (
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950 shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-900">
          <TableRow className="hover:bg-slate-100 dark:hover:bg-slate-800/60">
            <TableHead className="w-[60px] font-bold">#</TableHead>
            <TableHead className="font-bold">نام و نام خانوادگی</TableHead>
            <TableHead className="font-bold">موبایل</TableHead>
            <TableHead className="font-bold">قد</TableHead>
            <TableHead className="font-bold">وزن</TableHead>
            <TableHead className="font-bold">وضعیت</TableHead>
            <TableHead className="font-bold">پیشرفت</TableHead>
            <TableHead className="text-left font-bold">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-64">
                {renderEmptyState()}
              </TableCell>
            </TableRow>
          ) : (
            <AnimatePresence mode="popLayout">
              {sortedAndFilteredStudents.map((student, index) => (
                <motion.tr
                  layout
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`transition-all ${
                    hoveredRowId === student.id 
                      ? "bg-slate-50 dark:bg-slate-900/70" 
                      : "hover:bg-slate-50/70 dark:hover:bg-slate-900/40"
                  }`}
                  onMouseEnter={() => setHoveredRowId(student.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                  onClick={() => onEdit(student)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell className="font-medium">
                    {toPersianNumbers(index + 1)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-semibold">
                          {student.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{student.name}</span>
                        {student.payment && (
                          <span className="text-xs text-muted-foreground">
                            {toPersianNumbers(student.payment.replace(/\B(?=(\d{3})+(?!\d))/g, ','))} تومان
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell dir="ltr" className="text-right font-medium text-slate-600 dark:text-slate-400">
                    {toPersianNumbers(student.phone)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700">
                      {toPersianNumbers(student.height)} سانتی‌متر
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700">
                      {toPersianNumbers(student.weight)} کیلوگرم
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(student)}
                  </TableCell>
                  <TableCell className="w-[140px]">
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={getCompletionPercentage(student)} 
                        className="h-2 w-full"
                        indicatorClassName={getProgressColor(getCompletionPercentage(student))}
                      />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400 min-w-[32px]">
                        {toPersianNumbers(getCompletionPercentage(student))}٪
                      </span>
                    </div>
                  </TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <div className="flex justify-end items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-950/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddExercise(student);
                        }}
                      >
                        <Dumbbell className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-500 hover:text-green-600 hover:bg-green-50 dark:text-slate-400 dark:hover:text-green-400 dark:hover:bg-green-950/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddDiet(student);
                        }}
                      >
                        <UtensilsCrossed className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:text-slate-400 dark:hover:text-purple-400 dark:hover:bg-purple-950/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddSupplement(student);
                        }}
                      >
                        <Pill className="h-4 w-4" />
                      </Button>
                      
                      <DropdownMenu
                        open={openMenuId === student.id}
                        onOpenChange={(open) => {
                          setOpenMenuId(open ? student.id : null);
                        }}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 z-50 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                              onDownload(student);
                              setOpenMenuId(null);
                            }}
                          >
                            <Download className="h-4 w-4" />
                            <span>دانلود برنامه</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Placeholder for future functionality
                              setOpenMenuId(null);
                            }}
                          >
                            <Clipboard className="h-4 w-4" />
                            <span>پرینت برنامه</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                            onClick={() => {
                              onDelete(student.id);
                              setOpenMenuId(null);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>حذف</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </TableBody>
      </Table>
    </div>
  );
};


import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "./StudentTypes";
import { getStudentProgress, getProgressColor } from "@/utils/studentUtils";
import { 
  Edit, Trash2, MoreVertical, User, Clipboard, Dumbbell, 
  UtensilsCrossed, Pill, Download, Filter, ArrowUpRight, 
  Search, Users, EyeOff, UserPlus
} from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";

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
  const [listLoaded, setListLoaded] = useState(false);
  const deviceInfo = useDeviceInfo();

  // Reset animation state when data changes
  useEffect(() => {
    setListLoaded(false);
    const timer = setTimeout(() => setListLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [refreshTrigger, searchQuery, viewMode]);

  // Get appropriate padding based on device type
  const getPadding = () => {
    if (deviceInfo.isMobile) return "p-2";
    if (deviceInfo.isTablet) return "p-3 md:p-4";
    return "p-4 md:p-6";
  };

  // Get appropriate grid columns based on device type
  const getGridCols = () => {
    if (deviceInfo.isMobile) return "grid-cols-1";
    if (deviceInfo.isTablet) return "grid-cols-2";
    if (deviceInfo.isSmallLaptop) return "grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  const getStatusBadge = useCallback((student: Student) => {
    // Check if the student has any exercises, meals, or supplements
    const hasExercises = student.exercises?.length || student.exercisesDay1?.length || 
                         student.exercisesDay2?.length || student.exercisesDay3?.length || 
                         student.exercisesDay4?.length;
    const hasMeals = student.meals?.length;
    const hasSupplements = student.supplements?.length || student.vitamins?.length;
    
    if (hasExercises && hasMeals && hasSupplements) {
      return (
        <Badge className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-sm transition-all duration-300 border-0">
          تکمیل
        </Badge>
      );
    } else if (hasExercises || hasMeals || hasSupplements) {
      return (
        <Badge className="bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-sm transition-all duration-300 border-0">
          در حال انجام
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm transition-all duration-300 border-0">
          جدید
        </Badge>
      );
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.03
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 }
    }
  };

  const renderEmptyState = () => (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 text-muted-foreground"
    >
      <motion.div variants={itemVariants} className="relative mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl opacity-40"></div>
        <div className={`${deviceInfo.isMobile ? 'w-16 h-16' : 'w-20 h-20 sm:w-24 sm:h-24'} rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center mb-1 border border-blue-100 dark:border-blue-800/30 shadow-inner`}>
          <Users className={`${deviceInfo.isMobile ? 'h-8 w-8' : 'h-10 w-10 sm:h-12 sm:w-12'} text-blue-500 dark:text-blue-400`} />
        </div>
      </motion.div>
      
      <motion.h3 variants={itemVariants} className={`font-medium ${deviceInfo.isMobile ? 'text-lg' : 'text-xl'} mb-2 sm:mb-3 text-foreground`}>
        {searchQuery 
          ? "هیچ شاگردی پیدا نشد"
          : "هنوز هیچ شاگردی اضافه نکرده‌اید"
        }
      </motion.h3>
      
      <motion.p variants={itemVariants} className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 sm:mb-8 text-center max-w-md px-4">
        {searchQuery 
          ? "هیچ شاگردی با عبارت جستجو شده مطابقت ندارد. جستجوی دیگری انجام دهید یا فیلترها را پاک کنید."
          : "شما هنوز هیچ شاگردی اضافه نکرده‌اید. برای شروع، شاگرد جدیدی اضافه کنید."
        }
      </motion.p>
      
      {searchQuery ? (
        <motion.div variants={itemVariants}>
          <Button 
            variant="outline" 
            onClick={onClearSearch}
            size={deviceInfo.isMobile ? "sm" : "default"}
            className="gap-2 rounded-full px-4 sm:px-6 py-1 sm:py-2 h-9 sm:h-12 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
            <span className="text-sm sm:text-base">پاک کردن جستجو</span>
          </Button>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <Button 
            onClick={onAddStudent}
            size={deviceInfo.isMobile ? "sm" : "default"}
            className="gap-2 rounded-full px-4 sm:px-6 py-1 sm:py-2 h-9 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
          >
            <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
            <span className="text-sm sm:text-base">افزودن شاگرد جدید</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );

  if (viewMode === "grid") {
    return (
      <div className={getPadding()}>
        <AnimatePresence mode="wait">
          {!listLoaded ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[30vh] flex items-center justify-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 relative flex justify-center items-center">
                  <div className="absolute w-full h-full border-4 border-indigo-100 dark:border-indigo-900/30 rounded-full"></div>
                  <div className="absolute w-full h-full border-t-4 border-indigo-500 rounded-full animate-spin"></div>
                  <User className="h-6 sm:h-8 w-6 sm:w-8 text-indigo-500" />
                </div>
                <p className="mt-4 text-xs sm:text-sm text-muted-foreground">در حال بارگذاری شاگردان...</p>
              </div>
            </motion.div>
          ) : sortedAndFilteredStudents.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[30vh]"
            >
              {renderEmptyState()}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className={`grid ${getGridCols()} gap-3 sm:gap-4 md:gap-6`}
            >
              {sortedAndFilteredStudents.map((student) => (
                <motion.div
                  layout
                  key={student.id}
                  variants={itemVariants}
                  className="relative group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onMouseEnter={() => setHoveredCardId(student.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => onEdit(student)}
                >
                  {/* Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 blur-xl rounded-2xl sm:rounded-3xl -z-10 transition-all duration-500 group-hover:scale-110"></div>
                  
                  {/* Card */}
                  <div className="relative overflow-hidden h-full backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/20 dark:hover:shadow-indigo-900/20">
                    {/* Status Badge */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                      {getStatusBadge(student)}
                    </div>
                    
                    {/* View Details Button */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className={`${deviceInfo.isMobile ? 'h-7 w-7' : 'h-8 w-8'} rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md`}
                      >
                        <ArrowUpRight className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                      </Button>
                    </div>
                    
                    {/* Student Info */}
                    <div className="flex flex-col items-center text-center pt-4 sm:pt-6 px-3 sm:px-6">
                      <div className="relative group/avatar mb-3 sm:mb-4">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-lg group-hover/avatar:opacity-30 transition-opacity duration-300"></div>
                        <Avatar className={`${deviceInfo.isMobile ? 'h-16 w-16' : 'h-18 w-18 sm:h-20 sm:w-20'} border-2 border-white dark:border-slate-800 shadow-lg ring-2 ring-indigo-100 dark:ring-indigo-900/20 group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800/30 transition-all duration-300`}>
                          <AvatarImage src={student.image} alt={student.name} />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-base sm:text-lg font-semibold">
                            {student.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <h3 className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1 line-clamp-1 text-slate-800 dark:text-slate-200">{student.name}</h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 dir-ltr mb-3 sm:mb-4">
                        {toPersianNumbers(student.phone)}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div className="backdrop-blur-sm bg-slate-50/80 dark:bg-slate-800/60 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-center shadow-sm">
                          <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 mb-0.5 sm:mb-1">قد</p>
                          <p className="font-medium text-xs sm:text-sm">{toPersianNumbers(student.height)}</p>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-slate-50/80 dark:bg-slate-800/60 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-center shadow-sm">
                          <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400 mb-0.5 sm:mb-1">وزن</p>
                          <p className="font-medium text-xs sm:text-sm">{toPersianNumbers(student.weight)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress & Actions */}
                    <div className="border-t border-slate-100 dark:border-slate-800 px-3 sm:px-6 py-3 sm:py-4 bg-slate-50/70 dark:bg-slate-800/30 backdrop-blur-sm">
                      <div className="mb-2 sm:mb-3">
                        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                          <span className="text-2xs sm:text-xs font-medium text-slate-700 dark:text-slate-300">پیشرفت برنامه</span>
                          <span className="text-2xs sm:text-xs font-medium text-slate-600 dark:text-slate-400">
                            {toPersianNumbers(getStudentProgress(student))}٪
                          </span>
                        </div>
                        <Progress 
                          value={getStudentProgress(student)} 
                          className="h-1.5 sm:h-2 bg-slate-200/70 dark:bg-slate-700/50"
                          indicatorClassName={`${getProgressColor(getStudentProgress(student))} bg-gradient-to-r from-current to-current/80`}
                          showAnimation={getStudentProgress(student) === 100}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-1 rtl:space-x-reverse">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`${deviceInfo.isMobile ? 'h-7 w-7' : 'h-8 sm:h-9 w-8 sm:w-9'} rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-indigo-900/50 dark:hover:to-indigo-800/50 shadow-sm`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddExercise(student);
                            }}
                          >
                            <Dumbbell className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`${deviceInfo.isMobile ? 'h-7 w-7' : 'h-8 sm:h-9 w-8 sm:w-9'} rounded-full bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40 text-green-600 dark:text-green-400 hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/50 dark:hover:to-green-800/50 shadow-sm`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddDiet(student);
                            }}
                          >
                            <UtensilsCrossed className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`${deviceInfo.isMobile ? 'h-7 w-7' : 'h-8 sm:h-9 w-8 sm:w-9'} rounded-full bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 text-purple-600 dark:text-purple-400 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/50 dark:hover:to-purple-800/50 shadow-sm`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddSupplement(student);
                            }}
                          >
                            <Pill className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                          </Button>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className={`${deviceInfo.isMobile ? 'h-7 w-7' : 'h-8 w-8'} hover:bg-slate-100 dark:hover:bg-slate-800`}>
                              <MoreVertical className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 sm:w-48 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-xl animate-in zoom-in-90 duration-100">
                            <DropdownMenuItem 
                              className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDownload(student);
                              }}
                            >
                              <Download className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                              <span>دانلود برنامه</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Placeholder for future functionality
                              }}
                            >
                              <Clipboard className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                              <span>پرینت برنامه</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs sm:text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(student.id);
                              }}
                            >
                              <Trash2 className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                              <span>حذف</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Table view (responsive)
  return (
    <div className="rounded-lg sm:rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {!listLoaded ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[30vh] flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 relative flex justify-center items-center">
                <div className="absolute w-full h-full border-4 border-indigo-100 dark:border-indigo-900/30 rounded-full"></div>
                <div className="absolute w-full h-full border-t-4 border-indigo-500 rounded-full animate-spin"></div>
                <User className="h-8 w-8 text-indigo-500" />
              </div>
              <p className="mt-4 text-muted-foreground">در حال بارگذاری شاگردان...</p>
            </div>
          </motion.div>
        ) : sortedAndFilteredStudents.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[30vh]"
          >
            {renderEmptyState()}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Responsive table - hide certain columns on mobile */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/80 dark:bg-slate-800/70 backdrop-blur-md">
                  <TableRow className="hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/70">
                    <TableHead className={`w-[40px] sm:w-[60px] font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm`}>#</TableHead>
                    <TableHead className={`font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm`}>نام و نام خانوادگی</TableHead>
                    <TableHead className={`hidden sm:table-cell font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm`}>موبایل</TableHead>
                    <TableHead className={`hidden md:table-cell font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm`}>قد</TableHead>
                    <TableHead className={`hidden md:table-cell font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm`}>وزن</TableHead>
                    <TableHead className={`hidden sm:table-cell font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm`}>وضعیت</TableHead>
                    <TableHead className={`font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm`}>پیشرفت</TableHead>
                    <TableHead className={`text-left font-bold text-slate-700 dark:text-slate-300 text-xs sm:text-sm`}>عملیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {sortedAndFilteredStudents.map((student, index) => (
                      <motion.tr
                        layout
                        key={student.id}
                        variants={rowVariants}
                        className={`transition-all border-slate-200/70 dark:border-slate-700/70 ${
                          hoveredRowId === student.id 
                            ? "bg-indigo-50/50 dark:bg-indigo-900/20" 
                            : "hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                        }`}
                        onMouseEnter={() => setHoveredRowId(student.id)}
                        onMouseLeave={() => setHoveredRowId(null)}
                        onClick={() => onEdit(student)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell className="font-medium text-slate-500 dark:text-slate-400 text-xs sm:text-sm p-2 sm:p-4">
                          {toPersianNumbers(index + 1)}
                        </TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative">
                              <div className={`absolute inset-0 rounded-full bg-indigo-200/30 dark:bg-indigo-800/30 blur-md opacity-0 transition-opacity duration-300 ${hoveredRowId === student.id ? 'opacity-100' : ''}`}></div>
                              <Avatar className={`${deviceInfo.isMobile ? 'h-8 w-8' : 'h-10 w-10'} border-2 border-white dark:border-gray-800 shadow-sm transition-transform duration-300 hover:scale-110`}>
                                <AvatarImage src={student.image} alt={student.name} />
                                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-semibold">
                                  {student.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-800 dark:text-slate-200 text-xs sm:text-sm">{student.name}</span>
                              {deviceInfo.isMobile && (
                                <span dir="ltr" className="text-2xs text-slate-500 dark:text-slate-400">{toPersianNumbers(student.phone)}</span>
                              )}
                              {student.payment && (
                                <span className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
                                  {toPersianNumbers(student.payment.replace(/\B(?=(\d{3})+(?!\d))/g, ','))} تومان
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell dir="ltr" className="hidden sm:table-cell text-right font-medium text-slate-600 dark:text-slate-400 text-xs sm:text-sm p-2 sm:p-4">
                          {toPersianNumbers(student.phone)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell p-2 sm:p-4">
                          <Badge variant="outline" className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/70 dark:border-slate-700/70 backdrop-blur-sm text-xs">
                            {toPersianNumbers(student.height)} سانتی‌متر
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell p-2 sm:p-4">
                          <Badge variant="outline" className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/70 dark:border-slate-700/70 backdrop-blur-sm text-xs">
                            {toPersianNumbers(student.weight)} کیلوگرم
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell p-2 sm:p-4">
                          {getStatusBadge(student)}
                        </TableCell>
                        <TableCell className={`${deviceInfo.isMobile ? 'w-[80px]' : 'w-[140px]'} p-2 sm:p-4`}>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Progress 
                              value={getStudentProgress(student)} 
                              className="h-1.5 sm:h-2 w-full bg-slate-200/70 dark:bg-slate-700/50"
                              indicatorClassName={`${getProgressColor(getStudentProgress(student))} bg-gradient-to-r from-current to-current/80`}
                              showAnimation={getStudentProgress(student) === 100}
                            />
                            <span className="text-2xs sm:text-xs font-medium text-slate-600 dark:text-slate-400 min-w-[24px] sm:min-w-[32px]">
                              {toPersianNumbers(getStudentProgress(student))}٪
                            </span>
                          </div>
                        </TableCell>
                        <TableCell onClick={e => e.stopPropagation()} className="p-1 sm:p-2">
                          <div className="flex justify-end items-center gap-0.5 sm:gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={`${deviceInfo.isMobile ? 'h-7 w-7' : 'h-8 w-8'} text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-950/30`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddExercise(student);
                              }}
                            >
                              <Dumbbell className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={`${deviceInfo.isMobile ? 'h-7 w-7' : 'h-8 w-8'} text-slate-500 hover:text-green-600 hover:bg-green-50 dark:text-slate-400 dark:hover:text-green-400 dark:hover:bg-green-950/30`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddDiet(student);
                              }}
                            >
                              <UtensilsCrossed className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className={`${deviceInfo.isMobile ? 'h-7 w-7' : 'h-8 w-8'} text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:text-slate-400 dark:hover:text-purple-400 dark:hover:bg-purple-950/30`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddSupplement(student);
                              }}
                            >
                              <Pill className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
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
                                  className={`${deviceInfo.isMobile ? 'h-7 w-7' : 'h-8 w-8'} text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800`}
                                >
                                  <MoreVertical className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40 sm:w-48 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-xl animate-in zoom-in-90 duration-100">
                                <DropdownMenuItem 
                                  className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                                  onClick={() => {
                                    onDownload(student);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  <Download className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                                  <span>دانلود برنامه</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem 
                                  className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Placeholder for future functionality
                                    setOpenMenuId(null);
                                  }}
                                >
                                  <Clipboard className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                                  <span>پرینت برنامه</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuSeparator />
                                
                                <DropdownMenuItem 
                                  className="flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs sm:text-sm"
                                  onClick={() => {
                                    onDelete(student.id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  <Trash2 className={`${deviceInfo.isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                                  <span>حذف</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

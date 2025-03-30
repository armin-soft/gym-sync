
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, Edit, Search, Filter, ChevronDown, 
  ChevronUp, ArrowUpRight, Download, MoreHorizontal, 
  CheckCircle, AlertCircle, Clock, Dumbbell, UtensilsCrossed, 
  Pill, UserPlus, ListFilter, Grid, List, X
} from "lucide-react";
import { Student } from "./StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { filterStudents, sortStudents } from "@/utils/studentUtils";

const statusColors = {
  complete: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-500 dark:border-emerald-800/50",
  inProgress: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-500 dark:border-amber-800/50",
  new: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-500 dark:border-blue-800/50",
}

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
  viewMode: initialViewMode
}: StudentsTableProps) => {
  const [viewMode, setViewMode] = useState<"table" | "grid" | "list">(initialViewMode);
  const [sortField, setSortField] = useState<"name" | "weight" | "height">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [expandedStudentId, setExpandedStudentId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "complete" | "inProgress" | "new">("all");
  const [hoverStudent, setHoverStudent] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSort = (field: "name" | "weight" | "height") => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ChevronDown className="h-3 w-3 opacity-50" />;
    return sortDirection === "asc" 
      ? <ChevronUp className="h-3 w-3 text-primary" />
      : <ChevronDown className="h-3 w-3 text-primary" />;
  };

  const getStudentStatus = (student: Student) => {
    const hasExercises = student.exercises?.length || 
                        student.exercisesDay1?.length || 
                        student.exercisesDay2?.length || 
                        student.exercisesDay3?.length || 
                        student.exercisesDay4?.length;
    const hasMeals = student.meals?.length;
    const hasSupplements = student.supplements?.length || student.vitamins?.length;
    
    if (hasExercises && hasMeals && hasSupplements) {
      return "complete";
    } else if (hasExercises || hasMeals || hasSupplements) {
      return "inProgress";
    } else {
      return "new";
    }
  };

  const getProgressPercentage = (student: Student) => {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "complete": return "تکمیل شده";
      case "inProgress": return "در حال انجام";
      case "new": return "جدید";
      default: return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete": return <CheckCircle className="h-3.5 w-3.5" />;
      case "inProgress": return <Clock className="h-3.5 w-3.5" />;
      case "new": return <AlertCircle className="h-3.5 w-3.5" />;
      default: return null;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-emerald-500";
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 30) return "bg-amber-500";
    return "bg-blue-500";
  };

  const filteredStudents = useMemo(() => {
    let result = [...sortedAndFilteredStudents];
    
    if (filterStatus !== "all") {
      result = result.filter(student => getStudentStatus(student) === filterStatus);
    }
    
    return sortStudents(result, sortField, sortDirection);
  }, [sortedAndFilteredStudents, filterStatus, sortField, sortDirection]);

  // Empty state component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
        {searchQuery ? (
          <Search className="h-10 w-10 text-primary/50" />
        ) : (
          <UserPlus className="h-10 w-10 text-primary/50" />
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-2">
        {searchQuery ? "شاگردی یافت نشد" : "شاگردی وجود ندارد"}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-6">
        {searchQuery 
          ? "هیچ شاگردی با معیارهای جستجوی شما مطابقت ندارد. لطفاً جستجوی خود را تغییر دهید."
          : "برای شروع کار با سیستم مدیریت شاگردان، اولین شاگرد خود را اضافه کنید."
        }
      </p>
      
      {searchQuery ? (
        <Button 
          variant="outline" 
          onClick={onClearSearch}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          پاک کردن جستجو
        </Button>
      ) : (
        <Button 
          onClick={onAddStudent}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80"
        >
          <UserPlus className="h-4 w-4" />
          افزودن شاگرد جدید
        </Button>
      )}
    </motion.div>
  );

  const renderTableView = () => (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-right font-medium text-muted-foreground w-[60px]">شماره</th>
              <th className="px-4 py-3 text-right font-medium">
                <button 
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <span>نام و نام خانوادگی</span>
                  {getSortIcon("name")}
                </button>
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">موبایل</th>
              <th className="px-4 py-3 text-right font-medium">
                <button 
                  onClick={() => handleSort("height")}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <span>قد</span>
                  {getSortIcon("height")}
                </button>
              </th>
              <th className="px-4 py-3 text-right font-medium">
                <button 
                  onClick={() => handleSort("weight")}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <span>وزن</span>
                  {getSortIcon("weight")}
                </button>
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">وضعیت</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">پیشرفت</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground w-[120px]">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => {
              const status = getStudentStatus(student);
              const progressPercentage = getProgressPercentage(student);
              
              return (
                <motion.tr 
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`border-b last:border-0 group transition-colors relative ${
                    hoverStudent === student.id ? "bg-muted/50" : "hover:bg-muted/30"
                  }`}
                  onClick={() => onEdit(student)}
                  onMouseEnter={() => setHoverStudent(student.id)}
                  onMouseLeave={() => setHoverStudent(null)}
                >
                  {hoverStudent === student.id && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      className="absolute top-0 right-0 w-1 h-full bg-primary origin-top"
                    />
                  )}
                  <td className="px-4 py-3 text-right text-sm">
                    {toPersianNumbers(index + 1)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary">
                          {student.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        {student.payment && (
                          <div className="text-xs text-muted-foreground">
                            {toPersianNumbers(student.payment.replace(/\B(?=(\d{3})+(?!\d))/g, ','))} تومان
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-sm text-muted-foreground">
                    <div dir="ltr" className="text-right">{toPersianNumbers(student.phone)}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant="outline">
                      {toPersianNumbers(student.height)} سانتی‌متر
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant="outline">
                      {toPersianNumbers(student.weight)} کیلوگرم
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge className={`${statusColors[status]} gap-1.5 px-2.5`}>
                      {getStatusIcon(status)}
                      <span>{getStatusText(status)}</span>
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-2 w-[140px]">
                      <Progress 
                        value={progressPercentage} 
                        className="h-2"
                        indicatorClassName={getProgressColor(progressPercentage)}
                      />
                      <span className="text-xs font-medium text-muted-foreground min-w-[30px]">
                        {toPersianNumbers(progressPercentage)}٪
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddExercise(student);
                              }}
                            >
                              <Dumbbell className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-background/80 backdrop-blur-sm text-foreground border-border">
                            برنامه تمرینی
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddDiet(student);
                              }}
                            >
                              <UtensilsCrossed className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-background/80 backdrop-blur-sm text-foreground border-border">
                            برنامه غذایی
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddSupplement(student);
                              }}
                            >
                              <Pill className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-background/80 backdrop-blur-sm text-foreground border-border">
                            مکمل‌ها و ویتامین‌ها
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <DropdownMenu
                        open={openMenuId === student.id}
                        onOpenChange={(open) => setOpenMenuId(open ? student.id : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-muted-foreground hover:text-foreground hover:bg-muted h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-background border-border">
                          <DropdownMenuItem 
                            className="gap-2 cursor-pointer"
                            onClick={() => {
                              onEdit(student);
                              setOpenMenuId(null);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            <span>ویرایش اطلاعات</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDownload(student);
                              setOpenMenuId(null);
                            }}
                          >
                            <Download className="h-4 w-4" />
                            <span>دانلود برنامه</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            className="gap-2 text-destructive cursor-pointer focus:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
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
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {filteredStudents.map((student, index) => {
          const status = getStudentStatus(student);
          const progressPercentage = getProgressPercentage(student);
          
          return (
            <motion.div
              key={student.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 },
              }}
              onClick={() => onEdit(student)}
              className="relative overflow-hidden cursor-pointer group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-50 blur-2xl rounded-[40px] -z-10 group-hover:opacity-100 transition-opacity duration-500 scale-[0.85] group-hover:scale-95 bg-primary/20" />
              
              <Card className="backdrop-blur-sm border-border/50 shadow-xl shadow-primary/5 overflow-hidden h-full">
                <div className="absolute top-3 right-3">
                  <Badge className={`${statusColors[status]} gap-1.5`}>
                    {getStatusIcon(status)}
                    <span>{getStatusText(status)}</span>
                  </Badge>
                </div>
                
                <CardHeader className="pb-2 pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 border-4 border-background mb-3 shadow-lg">
                      <AvatarImage src={student.image} alt={student.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-white text-lg font-semibold">
                        {student.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <CardTitle className="text-xl mb-1">{student.name}</CardTitle>
                    
                    <CardDescription className="text-sm dir-ltr">
                      {toPersianNumbers(student.phone)}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="bg-muted rounded-lg px-3 py-2 text-center">
                      <p className="text-xs text-muted-foreground mb-1">قد</p>
                      <p className="font-medium text-sm">{toPersianNumbers(student.height)}</p>
                    </div>
                    
                    <div className="bg-muted rounded-lg px-3 py-2 text-center">
                      <p className="text-xs text-muted-foreground mb-1">وزن</p>
                      <p className="font-medium text-sm">{toPersianNumbers(student.weight)}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium">پیشرفت برنامه</span>
                      <span className="text-xs text-muted-foreground">
                        {toPersianNumbers(progressPercentage)}٪
                      </span>
                    </div>
                    <Progress 
                      value={progressPercentage} 
                      className="h-2"
                      indicatorClassName={getProgressColor(progressPercentage)}
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2 border-t flex justify-between items-center bg-muted/50">
                  <div className="flex -space-x-1 rtl:space-x-reverse">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddExercise(student);
                            }}
                          >
                            <Dumbbell className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-background/80 backdrop-blur-sm text-foreground border-border">
                          برنامه تمرینی
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-500 dark:hover:bg-green-900/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddDiet(student);
                            }}
                          >
                            <UtensilsCrossed className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-background/80 backdrop-blur-sm text-foreground border-border">
                          برنامه غذایی
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-500 dark:hover:bg-purple-900/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddSupplement(student);
                            }}
                          >
                            <Pill className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-background/80 backdrop-blur-sm text-foreground border-border">
                          مکمل‌ها و ویتامین‌ها
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-background border-border">
                      <DropdownMenuItem 
                        className="gap-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDownload(student);
                        }}
                      >
                        <Download className="h-4 w-4" />
                        <span>دانلود برنامه</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        className="gap-2 text-destructive cursor-pointer focus:text-destructive"
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
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 left-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                  >
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {filteredStudents.map((student, index) => {
          const status = getStudentStatus(student);
          const progressPercentage = getProgressPercentage(student);
          
          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <Accordion
                type="single"
                collapsible
                className="rounded-lg border shadow-sm overflow-hidden bg-card"
                value={expandedStudentId === student.id ? "item-1" : ""}
                onValueChange={(value) => {
                  if (value === "item-1") {
                    setExpandedStudentId(student.id);
                  } else {
                    setExpandedStudentId(null);
                  }
                }}
              >
                <AccordionItem value="item-1" className="border-0">
                  <div 
                    className={`group transition-colors border-b ${
                      expandedStudentId === student.id ? "bg-muted/50" : "hover:bg-muted/30"
                    }`}
                    onClick={() => onEdit(student)}
                  >
                    <AccordionTrigger 
                      className="px-4 py-3 hover:no-underline"
                      onClick={(e) => {
                        // Prevent the onEdit trigger when clicking on the accordion trigger
                        e.stopPropagation();
                      }}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0">
                          <Avatar className="h-10 w-10 border-2 border-background">
                            <AvatarImage src={student.image} alt={student.name} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary">
                              {student.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="flex-grow text-right flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground dir-ltr text-right">
                              {toPersianNumbers(student.phone)}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge className={`${statusColors[status]} gap-1.5`}>
                              {getStatusIcon(status)}
                              <span className="hidden sm:inline">{getStatusText(status)}</span>
                            </Badge>
                            
                            <div className="hidden sm:flex items-center gap-2 w-[120px]">
                              <Progress 
                                value={progressPercentage} 
                                className="h-2 w-[80px]"
                                indicatorClassName={getProgressColor(progressPercentage)}
                              />
                              <span className="text-xs font-medium text-muted-foreground">
                                {toPersianNumbers(progressPercentage)}٪
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </div>
                  
                  <AccordionContent className="px-4 pb-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">اطلاعات فیزیکی</h4>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="flex-1 justify-center py-1.5">
                              <span className="text-muted-foreground ml-1">قد:</span>
                              <span>{toPersianNumbers(student.height)} سانتی‌متر</span>
                            </Badge>
                            <Badge variant="outline" className="flex-1 justify-center py-1.5">
                              <span className="text-muted-foreground ml-1">وزن:</span>
                              <span>{toPersianNumbers(student.weight)} کیلوگرم</span>
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">وضعیت پرداخت</h4>
                          <Badge variant="outline" className="w-full justify-center py-1.5">
                            {student.payment ? (
                              <span>{toPersianNumbers(student.payment.replace(/\B(?=(\d{3})+(?!\d))/g, ','))} تومان</span>
                            ) : (
                              <span className="text-muted-foreground">اطلاعات پرداخت موجود نیست</span>
                            )}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">پیشرفت برنامه</h4>
                        <div className="space-y-3 mt-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs">برنامه تمرینی</span>
                              <Badge variant={student.exercises?.length || student.exercisesDay1?.length ? "default" : "outline"} className="py-0 px-2 text-[10px]">
                                {student.exercises?.length || student.exercisesDay1?.length ? "تکمیل" : "ناقص"}
                              </Badge>
                            </div>
                            <Progress value={student.exercises?.length || student.exercisesDay1?.length ? 100 : 0} className="h-1.5" />
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs">برنامه غذایی</span>
                              <Badge variant={student.meals?.length ? "default" : "outline"} className="py-0 px-2 text-[10px]">
                                {student.meals?.length ? "تکمیل" : "ناقص"}
                              </Badge>
                            </div>
                            <Progress value={student.meals?.length ? 100 : 0} className="h-1.5" />
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs">مکمل‌ها</span>
                              <Badge variant={student.supplements?.length || student.vitamins?.length ? "default" : "outline"} className="py-0 px-2 text-[10px]">
                                {student.supplements?.length || student.vitamins?.length ? "تکمیل" : "ناقص"}
                              </Badge>
                            </div>
                            <Progress value={student.supplements?.length || student.vitamins?.length ? 100 : 0} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">عملیات</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            className="gap-2 text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddExercise(student);
                            }}
                          >
                            <Dumbbell className="h-3.5 w-3.5" />
                            <span>برنامه تمرینی</span>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="gap-2 text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddDiet(student);
                            }}
                          >
                            <UtensilsCrossed className="h-3.5 w-3.5" />
                            <span>برنامه غذایی</span>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="gap-2 text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddSupplement(student);
                            }}
                          >
                            <Pill className="h-3.5 w-3.5" />
                            <span>مکمل‌ها</span>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="gap-2 text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDownload(student);
                            }}
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>دانلود برنامه</span>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="gap-2 text-sm col-span-2 mt-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(student);
                            }}
                          >
                            <Edit className="h-3.5 w-3.5" />
                            <span>ویرایش اطلاعات</span>
                          </Button>
                          
                          <Button 
                            variant="destructive" 
                            className="gap-2 text-sm col-span-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(student.id);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>حذف</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-background py-4">
      <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجوی نام یا موبایل شاگرد..."
            className="w-full bg-background pr-10 focus-visible:ring-1 focus-visible:ring-primary"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Here you'd handle search functionality
              }
            }}
          />
          {localSearchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-0 h-full aspect-square rounded-r-none text-muted-foreground hover:text-foreground"
              onClick={onClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Tabs 
            defaultValue={filterStatus} 
            className="w-full md:w-auto"
            onValueChange={(value) => setFilterStatus(value as any)}
          >
            <TabsList className="w-full md:w-auto bg-muted">
              <TabsTrigger value="all" className="flex-1 md:flex-none">
                <span className="hidden md:inline">همه شاگردان</span>
                <span className="md:hidden">همه</span>
              </TabsTrigger>
              <TabsTrigger value="complete" className="flex-1 md:flex-none">
                <span className="hidden md:inline">تکمیل شده</span>
                <span className="md:hidden">تکمیل</span>
              </TabsTrigger>
              <TabsTrigger value="inProgress" className="flex-1 md:flex-none">
                <span className="hidden md:inline">در حال انجام</span>
                <span className="md:hidden">در حال انجام</span>
              </TabsTrigger>
              <TabsTrigger value="new" className="flex-1 md:flex-none">
                <span className="hidden md:inline">شاگردان جدید</span>
                <span className="md:hidden">جدید</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex rounded-md overflow-hidden w-full md:w-auto border shadow-sm">
            <Button 
              variant={viewMode === "table" ? "default" : "ghost"}
              className="rounded-none flex-1 md:flex-none border-0"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"}
              className="rounded-none flex-1 md:flex-none border-0"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"}
              className="rounded-none flex-1 md:flex-none border-0"
              onClick={() => setViewMode("list")}
            >
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {filteredStudents.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={viewMode === "grid" ? "p-4" : "p-0"}>
          {viewMode === "table" && renderTableView()}
          {viewMode === "grid" && renderGridView()}
          {viewMode === "list" && renderListView()}
        </div>
      )}
      
      {filteredStudents.length > 0 && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          نمایش {toPersianNumbers(filteredStudents.length)} شاگرد از {toPersianNumbers(students.length)} شاگرد
        </div>
      )}
    </div>
  );
};

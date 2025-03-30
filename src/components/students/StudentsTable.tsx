import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Search, Filter, Plus, ChevronDown, Check, X, 
  ArrowUpRight, MoreHorizontal, Download, Dumbbell, 
  UtensilsCrossed, Pill, Edit, Trash2, LayoutGrid, List
} from "lucide-react";
import { Student } from "./StudentTypes";
import { getStudentStatus, getProgressPercentage, filterStudents, sortStudents } from "@/utils/studentUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Motion from "@/components/ui/Motion";

// CSS class mapping for different status types
const statusConfig = {
  complete: {
    className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-500 dark:border-emerald-800/50",
    label: "تکمیل شده",
    icon: <Check className="h-3.5 w-3.5" />
  },
  inProgress: {
    className: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-500 dark:border-amber-800/50",
    label: "در حال انجام",
    icon: <Motion className="h-3.5 w-3.5" />
  },
  new: {
    className: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-500 dark:border-blue-800/50",
    label: "جدید",
    icon: <Plus className="h-3.5 w-3.5" />
  }
};

// Helper component for the empty state display
const EmptyState = ({ searchQuery, onClearSearch, onAddStudent }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 px-4 text-center"
  >
    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center mb-5">
      {searchQuery ? (
        <Search className="h-10 w-10 text-primary/50" />
      ) : (
        <Users className="h-10 w-10 text-primary/50" />
      )}
    </div>
    
    <h3 className="text-xl font-bold mb-2">
      {searchQuery ? "هیچ شاگردی یافت نشد" : "لیست شاگردان خالی است"}
    </h3>
    
    <p className="text-muted-foreground max-w-md mb-6">
      {searchQuery 
        ? "هیچ شاگردی با معیارهای جستجوی شما پیدا نشد. معیارهای جستجو را تغییر دهید یا فیلترها را پاک کنید."
        : "برای شروع کار، با استفاده از دکمه زیر اولین شاگرد خود را ثبت کنید."
      }
    </p>
    
    {searchQuery ? (
      <Button 
        variant="outline" 
        onClick={onClearSearch}
        className="gap-2"
      >
        <X className="h-4 w-4" />
        <span>پاک کردن جستجو</span>
      </Button>
    ) : (
      <Button 
        onClick={onAddStudent}
        className="gap-2 bg-gradient-to-r from-primary to-primary/80"
      >
        <Plus className="h-4 w-4" />
        <span>افزودن شاگرد جدید</span>
      </Button>
    )}
  </motion.div>
);

// Student card component for grid view
const StudentCard = ({ student, onEdit, onDelete, onAddExercise, onAddDiet, onAddSupplement, onDownload }) => {
  const status = getStudentStatus(student);
  const progressPercentage = getProgressPercentage(student);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative overflow-hidden cursor-pointer group"
      onClick={() => onEdit(student)}
    >
      <Card className="border border-border/50 shadow-md overflow-hidden h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/20">
        <div className="absolute top-3 right-3 z-10">
          <Badge className={`${statusConfig[status].className} gap-1.5`}>
            {statusConfig[status].icon}
            <span>{statusConfig[status].label}</span>
          </Badge>
        </div>
        
        <CardHeader className="pt-8 pb-2">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 border-4 border-background mb-3 shadow">
              <AvatarImage src={student.image} alt={student.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-white text-lg font-semibold">
                {student.name[0]}
              </AvatarFallback>
            </Avatar>
            
            <h3 className="text-xl font-bold mb-1">{student.name}</h3>
            <p className="text-sm text-muted-foreground dir-ltr">
              {toPersianNumbers(student.phone)}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="flex items-center justify-around gap-3 mb-4">
            <div className="bg-muted/50 rounded-lg px-3 py-2 text-center w-full">
              <p className="text-xs text-muted-foreground mb-1">قد</p>
              <p className="font-medium">{toPersianNumbers(student.height)} سانتی‌متر</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg px-3 py-2 text-center w-full">
              <p className="text-xs text-muted-foreground mb-1">وزن</p>
              <p className="font-medium">{toPersianNumbers(student.weight)} کیلوگرم</p>
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
              indicatorClassName={
                progressPercentage >= 100 ? "bg-emerald-500" :
                progressPercentage >= 70 ? "bg-green-500" :
                progressPercentage >= 30 ? "bg-amber-500" : "bg-blue-500"
              }
            />
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 border-t flex justify-between items-center bg-muted/30">
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 rounded-full p-0 bg-primary/10 text-primary hover:bg-primary/20"
                    onClick={(e) => { e.stopPropagation(); onAddExercise(student); }}
                  >
                    <Dumbbell className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>برنامه تمرینی</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 rounded-full p-0 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-500 dark:hover:bg-green-900/50"
                    onClick={(e) => { e.stopPropagation(); onAddDiet(student); }}
                  >
                    <UtensilsCrossed className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>برنامه غذایی</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 rounded-full p-0 bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-500 dark:hover:bg-purple-900/50"
                    onClick={(e) => { e.stopPropagation(); onAddSupplement(student); }}
                  >
                    <Pill className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>مکمل‌ها</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={() => onEdit(student)}
              >
                <Edit className="h-4 w-4" />
                ویرایش اطلاعات
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); onDownload(student); }}
              >
                <Download className="h-4 w-4" />
                دانلود برنامه
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                className="gap-2 text-destructive cursor-pointer focus:text-destructive"
                onClick={(e) => { e.stopPropagation(); onDelete(student.id); }}
              >
                <Trash2 className="h-4 w-4" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

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
  const [viewMode, setViewMode] = useState<"table" | "grid">(initialViewMode);
  const [sortField, setSortField] = useState<"name" | "weight" | "height">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<"all" | "complete" | "inProgress" | "new">("all");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  // Handle sort change
  const handleSort = (field: "name" | "weight" | "height") => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  
  // Get sort indicator icon
  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronDown className="h-3 w-3 opacity-50" />;
    }
    return sortOrder === "asc" 
      ? <motion.div initial={{ rotate: 0 }} animate={{ rotate: 180 }}><ChevronDown className="h-3 w-3 text-primary" /></motion.div>
      : <ChevronDown className="h-3 w-3 text-primary" />;
  };

  // Get all filtered and sorted students
  const displayedStudents = useMemo(() => {
    let result = [...sortedAndFilteredStudents];
    
    // Apply status filter if not "all"
    if (filterStatus !== "all") {
      result = result.filter(student => getStudentStatus(student) === filterStatus);
    }
    
    // Apply sort
    return sortStudents(result, sortField, sortOrder);
  }, [sortedAndFilteredStudents, filterStatus, sortField, sortOrder]);

  // Render table view
  const renderTableView = () => (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-right font-medium text-muted-foreground w-[60px]">#</th>
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
              <th className="px-4 py-3 text-center font-medium text-muted-foreground w-[120px]">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((student, index) => {
              const status = getStudentStatus(student);
              const progressPercentage = getProgressPercentage(student);
              
              return (
                <motion.tr 
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`border-b last:border-0 transition-colors relative ${
                    hoveredRow === student.id ? "bg-muted/50" : "hover:bg-muted/30"
                  }`}
                  onClick={() => onEdit(student)}
                  onMouseEnter={() => setHoveredRow(student.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {hoveredRow === student.id && (
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
                      <Avatar className="h-9 w-9 border-2 border-background">
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
                    <Badge className={`${statusConfig[status].className} gap-1.5 px-2.5`}>
                      {statusConfig[status].icon}
                      <span>{statusConfig[status].label}</span>
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-2 w-[140px]">
                      <Progress 
                        value={progressPercentage} 
                        className="h-2"
                        indicatorClassName={
                          progressPercentage >= 100 ? "bg-emerald-500" :
                          progressPercentage >= 70 ? "bg-green-500" :
                          progressPercentage >= 30 ? "bg-amber-500" : "bg-blue-500"
                        }
                      />
                      <span className="text-xs font-medium text-muted-foreground min-w-[30px]">
                        {toPersianNumbers(progressPercentage)}٪
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
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
                          <TooltipContent>برنامه تمرینی</TooltipContent>
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
                          <TooltipContent>برنامه غذایی</TooltipContent>
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
                          <TooltipContent>مکمل‌ها</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-muted-foreground hover:text-foreground hover:bg-muted h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem 
                            className="gap-2 cursor-pointer"
                            onClick={() => onEdit(student)}
                          >
                            <Edit className="h-4 w-4" />
                            <span>ویرایش اطلاعات</span>
                          </DropdownMenuItem>
                          
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

  // Render grid view
  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {displayedStudents.map((student, index) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
            onDownload={onDownload}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-background rounded-lg overflow-hidden">
      <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجوی نام یا موبایل شاگرد..."
              className="pr-10 focus-visible:ring-1 focus-visible:ring-primary"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Handle search submission here
                }
              }}
            />
            {localSearchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={onClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <Tabs 
            defaultValue={filterStatus} 
            className="w-full md:w-auto"
            onValueChange={(value) => setFilterStatus(value as any)}
          >
            <TabsList>
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="complete">تکمیل شده</TabsTrigger>
              <TabsTrigger value="inProgress">در حال انجام</TabsTrigger>
              <TabsTrigger value="new">جدید</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex rounded-md overflow-hidden border shadow-sm">
            <Button 
              variant={viewMode === "table" ? "default" : "ghost"}
              className="rounded-none"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"}
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {displayedStudents.length === 0 ? (
        <EmptyState 
          searchQuery={searchQuery}
          onClearSearch={onClearSearch}
          onAddStudent={onAddStudent}
        />
      ) : (
        <div className={viewMode === "grid" ? "p-4" : "p-0"}>
          {viewMode === "table" && renderTableView()}
          {viewMode === "grid" && renderGridView()}
        </div>
      )}
      
      {displayedStudents.length > 0 && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          نمایش {toPersianNumbers(displayedStudents.length)} شاگرد از {toPersianNumbers(students.length)} شاگرد
        </div>
      )}
    </div>
  );
};

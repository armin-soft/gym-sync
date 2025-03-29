
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Dumbbell, 
  Apple, 
  Download, 
  Pill, 
  Check, 
  Users, 
  AlertCircle,
  RulerSquare,
  Scale as WeightScale
} from "lucide-react";
import { EmptyStudentState } from "@/components/students/EmptyStudentState";
import { ProfileWarning } from "@/components/students/ProfileWarning";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface StudentsTableProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger: number;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onClearSearch: () => void;
  onAddStudent: () => void;
  viewMode?: "table" | "grid";
}

const ITEMS_PER_PAGE = 10;

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
  onClearSearch,
  onAddStudent,
  viewMode = "table"
}: StudentsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedAndFilteredStudents.length / ITEMS_PER_PAGE);
  
  // Get current page items
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = sortedAndFilteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Handle changing page when filtered results change
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [sortedAndFilteredStudents, totalPages, currentPage]);

  // If there are no students, show empty state
  if (students.length === 0) {
    return <EmptyStudentState isSearching={false} onAddStudent={onAddStudent} onClearSearch={onClearSearch} />;
  }

  // If there are no filtered students, show "no results found"
  if (sortedAndFilteredStudents.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">نتیجه‌ای پیدا نشد</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">هیچ شاگردی با معیارهای جستجو یا فیلتر شما پیدا نشد.</p>
        <Button onClick={onClearSearch} variant="outline" className="gap-2">
          <Users className="h-4 w-4" />
          <span>نمایش تمام شاگردان</span>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/70 dark:bg-gray-800/30">
              <TableRow className="border-gray-200 dark:border-gray-800 hover:bg-gray-100/80 dark:hover:bg-gray-800/60">
                <TableHead className="text-right pr-10 font-semibold text-gray-700 dark:text-gray-300">شاگرد</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">شماره تماس</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">قد</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">وزن</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">وضعیت پرداخت</TableHead>
                <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">تعداد تمرین</TableHead>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((student) => (
                <TableRow
                  key={student.id}
                  className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <TableCell className="font-medium py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={student.image || "/placeholder.svg"}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                        />
                        {(!student.exercises?.length && !student.exercisesDay1?.length) && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white dark:border-gray-800" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100 leading-snug">{student.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {toPersianNumbers(student.phone)}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <span>{toPersianNumbers(student.height)}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">سانتی‌متر</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <span>{toPersianNumbers(student.weight)}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">کیلوگرم</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {student.payment ? (
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 leading-none">
                        <Check className="h-3 w-3 mr-1" />
                        <span className="ml-1">{toPersianNumbers(student.payment.replace(/\B(?=(\d{3})+(?!\d))/g, ","))} تومان</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 leading-none">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        <span>بدون پرداخت</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex items-center text-gray-600 dark:text-gray-400 gap-1">
                      <Dumbbell className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                      <span>
                        {toPersianNumbers(
                          (student.exercises?.length || 0) +
                          (student.exercisesDay1?.length || 0) +
                          (student.exercisesDay2?.length || 0) +
                          (student.exercisesDay3?.length || 0) +
                          (student.exercisesDay4?.length || 0)
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                        onClick={() => onEdit(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
                        onClick={() => onDelete(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 border-gray-200 dark:border-gray-800">
                          <DropdownMenuItem onClick={() => onAddExercise(student)} className="gap-2 cursor-pointer">
                            <Dumbbell className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                            <span>تنظیم برنامه تمرینی</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onAddDiet(student)} className="gap-2 cursor-pointer">
                            <Apple className="h-4 w-4 text-green-500 dark:text-green-400" />
                            <span>تنظیم برنامه غذایی</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onAddSupplement(student)} className="gap-2 cursor-pointer">
                            <Pill className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                            <span>تنظیم مکمل‌ها</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDownload(student)} className="gap-2 cursor-pointer">
                            <Download className="h-4 w-4 text-sky-500 dark:text-sky-400" />
                            <span>دانلود اطلاعات</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {currentItems.map((student) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-200/80 dark:border-gray-800/80 flex flex-col h-full">
                <div className="p-6 bg-gradient-to-br from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/20 dark:to-purple-950/20 relative">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative mb-3">
                      <img
                        src={student.image || "/placeholder.svg"}
                        alt={student.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                      />
                      {(!student.exercises?.length && !student.exercisesDay1?.length) && (
                        <div className="absolute -top-1 right-1 w-6 h-6 bg-amber-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <AlertCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                      {student.payment && (
                        <div className="absolute -bottom-1 right-0 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">{student.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">{toPersianNumbers(student.phone)}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                        <WeightScale className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                        <span>{toPersianNumbers(student.weight)} کیلوگرم</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                        <RulerSquare className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
                        <span>{toPersianNumbers(student.height)} سانتی‌متر</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-900/30 p-2 flex flex-col items-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">تمرین‌ها</p>
                      <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                        {toPersianNumbers(
                          (student.exercises?.length || 0) +
                          (student.exercisesDay1?.length || 0) +
                          (student.exercisesDay2?.length || 0) +
                          (student.exercisesDay3?.length || 0) +
                          (student.exercisesDay4?.length || 0)
                        )}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-900/30 p-2 flex flex-col items-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">پرداخت</p>
                      {student.payment ? (
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 leading-relaxed">
                          {toPersianNumbers(student.payment.substring(0, 5))}...
                        </p>
                      ) : (
                        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                          بدون پرداخت
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center gap-2 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                      onClick={() => onEdit(student)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      ویرایش
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 border-gray-200 dark:border-gray-800">
                        <DropdownMenuItem onClick={() => onAddExercise(student)} className="gap-2 cursor-pointer">
                          <Dumbbell className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                          <span>تنظیم برنامه تمرینی</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAddDiet(student)} className="gap-2 cursor-pointer">
                          <Apple className="h-4 w-4 text-green-500 dark:text-green-400" />
                          <span>تنظیم برنامه غذایی</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAddSupplement(student)} className="gap-2 cursor-pointer">
                          <Pill className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                          <span>تنظیم مکمل‌ها</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDownload(student)} className="gap-2 cursor-pointer">
                          <Download className="h-4 w-4 text-sky-500 dark:text-sky-400" />
                          <span>دانلود اطلاعات</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(student.id)} className="gap-2 text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300 cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                          <span>حذف</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) paginate(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
              {pageNumbers.map((number) => (
                <PaginationItem key={number}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      paginate(number);
                    }}
                    isActive={currentPage === number}
                  >
                    {toPersianNumbers(number)}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) paginate(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

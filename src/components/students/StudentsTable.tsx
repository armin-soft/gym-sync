
import React from "react";
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
  Coins
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyStudentState } from "./EmptyStudentState";
import { motion } from "framer-motion";

interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment?: string;
  exercises?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
}

interface StudentsTableProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
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
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
  onClearSearch,
}: StudentsTableProps) => {
  const isSearching = searchQuery !== "" && sortedAndFilteredStudents.length === 0;
  const showEmptyState = students.length === 0 || isSearching;

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

  return (
    <ScrollArea className="h-[calc(100vh-20rem)] rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b border-indigo-100 dark:border-indigo-900 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40">
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
          {showEmptyState ? (
            <TableRow>
              <TableCell colSpan={7} className="h-64 p-0">
                <EmptyStudentState 
                  isSearching={isSearching} 
                  onAddStudent={onAddStudent} 
                  onClearSearch={onClearSearch} 
                />
              </TableCell>
            </TableRow>
          ) : (
            <motion.tbody
              variants={container}
              initial="hidden"
              animate="show"
            >
              {sortedAndFilteredStudents.map((student) => (
                <motion.tr 
                  key={student.id} 
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(student)}
                        className="size-8 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 rounded-full"
                        title="ویرایش شاگرد"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(student.id)}
                        className="size-8 text-slate-600 hover:bg-red-100 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-900/50 dark:hover:text-red-400 rounded-full"
                        title="حذف شاگرد"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onAddExercise(student)}
                        className="size-8 text-slate-600 hover:bg-blue-100 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-900/50 dark:hover:text-blue-400 rounded-full"
                        title="مدیریت تمرین‌ها"
                      >
                        <Dumbbell className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onAddDiet(student)}
                        className="size-8 text-slate-600 hover:bg-green-100 hover:text-green-700 dark:text-slate-300 dark:hover:bg-green-900/50 dark:hover:text-green-400 rounded-full"
                        title="مدیریت برنامه غذایی"
                      >
                        <Apple className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onAddSupplement(student)}
                        className="size-8 text-slate-600 hover:bg-purple-100 hover:text-purple-700 dark:text-slate-300 dark:hover:bg-purple-900/50 dark:hover:text-purple-400 rounded-full"
                        title="مدیریت مکمل‌ها و ویتامین‌ها"
                      >
                        <Pill className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDownload(student)}
                        className={`size-8 text-slate-600 dark:text-slate-300 ${
                          !student.payment 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400'
                        } rounded-full`}
                        title={!student.payment ? "برای دانلود باید مبلغ را تعیین کنید" : "دانلود اطلاعات"}
                        disabled={!student.payment}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </motion.tbody>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

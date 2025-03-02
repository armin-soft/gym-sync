
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

  return (
    <ScrollArea className="h-[calc(100vh-20rem)] rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5 hover:bg-primary/5">
            <TableHead className="w-14 text-center">
              <UserRound className="h-4 w-4 mx-auto text-muted-foreground" />
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-muted-foreground" />
                نام و نام خانوادگی
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                شماره موبایل
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                قد (سانتی متر)
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-muted-foreground" />
                وزن (کیلوگرم)
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-muted-foreground" />
                مبلغ (تومان)
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2 justify-center">
                برنامه‌ها
              </div>
            </TableHead>
            <TableHead className="text-left">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showEmptyState ? (
            <TableRow>
              <TableCell colSpan={7} className="h-64">
                <EmptyStudentState 
                  isSearching={isSearching} 
                  onAddStudent={onAddStudent} 
                  onClearSearch={onClearSearch} 
                />
              </TableCell>
            </TableRow>
          ) : (
            sortedAndFilteredStudents.map((student) => (
              <TableRow 
                key={student.id} 
                className="group transition-all duration-300 hover:bg-primary/5"
              >
                <TableCell>
                  <div className="relative w-10 h-10 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-sky-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <img
                      src={student.image || '/placeholder.svg'}
                      alt={student.name}
                      className="relative rounded-full object-cover w-full h-full ring-2 ring-white dark:ring-gray-800 shadow-lg group-hover:ring-primary/20 group-hover:shadow-primary/20 transition-all duration-300"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{student.name}</div>
                </TableCell>
                <TableCell dir="ltr" className="font-mono">
                  {toPersianNumbers(student.phone)}
                </TableCell>
                <TableCell>{toPersianNumbers(student.height)}</TableCell>
                <TableCell>{toPersianNumbers(student.weight)}</TableCell>
                <TableCell>
                  {student.payment ? toPersianNumbers(student.payment) : (
                    <span className="text-red-500 text-xs">تعیین نشده</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-100 text-blue-800 font-medium size-6 flex items-center justify-center rounded-full text-xs">
                        {toPersianNumbers(student.exercises?.length || 0)}
                      </div>
                      <span className="text-xs text-gray-500 mt-1">تمرین</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-green-100 text-green-800 font-medium size-6 flex items-center justify-center rounded-full text-xs">
                        {toPersianNumbers(student.meals?.length || 0)}
                      </div>
                      <span className="text-xs text-gray-500 mt-1">غذا</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-purple-100 text-purple-800 font-medium size-6 flex items-center justify-center rounded-full text-xs">
                        {toPersianNumbers((student.supplements?.length || 0) + (student.vitamins?.length || 0))}
                      </div>
                      <span className="text-xs text-gray-500 mt-1">مکمل</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(student)}
                      className="size-8 hover:bg-primary/10 hover:text-primary"
                      title="ویرایش شاگرد"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(student.id)}
                      className="size-8 hover:bg-destructive/10 hover:text-destructive"
                      title="حذف شاگرد"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAddExercise(student)}
                      className="size-8 hover:bg-blue-500/10 hover:text-blue-500"
                      title="مدیریت تمرین‌ها"
                    >
                      <Dumbbell className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAddDiet(student)}
                      className="size-8 hover:bg-green-500/10 hover:text-green-500"
                      title="مدیریت برنامه غذایی"
                    >
                      <Apple className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAddSupplement(student)}
                      className="size-8 hover:bg-purple-500/10 hover:text-purple-500"
                      title="مدیریت مکمل‌ها و ویتامین‌ها"
                    >
                      <Pill className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDownload(student)}
                      className={`size-8 ${!student.payment ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-500/10 hover:text-indigo-500'}`}
                      title={!student.payment ? "برای دانلود باید مبلغ را تعیین کنید" : "دانلود اطلاعات"}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

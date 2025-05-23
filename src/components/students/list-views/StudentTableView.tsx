import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { StudentActions } from "../StudentActions";
import { StudentListViewProps } from "./types";

export const StudentTableView: React.FC<StudentListViewProps> = ({
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
  viewMode,
  isProfileComplete,
  sortField,
  sortOrder,
  onSortChange,
  exercises,
  meals,
  supplements,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, refreshTrigger]);

  const handleSort = (field: string) => {
    if (onSortChange) {
      onSortChange(field);
    }
  };

  const totalPages = Math.ceil(sortedAndFilteredStudents.length / itemsPerPage);
  const paginatedStudents = sortedAndFilteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="hidden">
        {isLoading ? (
          <Skeleton className="h-8 w-[100px]" />
        ) : (
          <Badge variant="secondary">
            {sortedAndFilteredStudents.length} student(s)
          </Badge>
        )}
      </div>
      
      <div className="w-full flex-1 relative overflow-auto rounded-md border shadow-sm">
        {isLoading ? (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-10">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            در حال بارگذاری...
          </div>
        ) : null}
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <input type="checkbox" className="cursor-pointer" disabled />
              </TableHead>
              <TableHead>
                نام
              </TableHead>
              <TableHead>شماره تلفن</TableHead>
              <TableHead>تاریخ شروع</TableHead>
              <TableHead className="text-right">اقدامات</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {sortedAndFilteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {!searchQuery ? (
                    <>
                      هنوز هیچ شاگردی اضافه نشده است.{" "}
                      <Button size="sm" onClick={onAddStudent}>
                        اضافه کردن شاگرد جدید
                      </Button>
                    </>
                  ) : (
                    <>
                      هیچ نتیجه‌ای یافت نشد.{" "}
                      <Button size="sm" onClick={onClearSearch}>
                        پاک کردن جستجو
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              sortedAndFilteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <input type="checkbox" className="cursor-pointer" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{toPersianNumbers(student.phone)}</TableCell>
                  <TableCell>
                    {student.startDate ? toPersianNumbers(student.startDate) : "وارد نشده"}
                  </TableCell>
                  
                  {/* Actions cell */}
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <StudentActions
                        student={student}
                        exercises={exercises}
                        meals={meals}
                        supplements={supplements}
                        onEdit={() => onEdit(student)}
                        onDelete={() => onDelete(student.id)}
                        onAddExercise={() => onAddExercise(student)}
                        onAddDiet={() => onAddExercise(student)}
                        onAddSupplement={() => onAddExercise(student)}
                        onDownload={(student) => {}}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1} active={currentPage === i + 1}>
                <PaginationLink
                  href="#"
                  isCurrent={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {toPersianNumbers(i + 1)}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { StudentTableHeader } from "./table/StudentTableHeader";
import { StudentTableBody } from "./table/StudentTableBody";
import { StudentTableEmpty } from "./table/StudentTableEmpty";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentTableProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger: number;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  viewMode: "table" | "grid";
  isProfileComplete: boolean;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
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
  onSortChange
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const deviceInfo = useDeviceInfo();

  // Reset loading state when data or view changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [refreshTrigger, viewMode, sortField, sortOrder, searchQuery]);

  // Define columns for the table
  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "image",
      header: () => <div className="text-center">تصویر</div>,
      cell: () => <div className="flex items-center justify-center"></div>,
      size: deviceInfo.isMobile ? 40 : 80,
    },
    {
      accessorKey: "name",
      header: () => <div>نام</div>,
      cell: () => <div className="font-medium"></div>,
    },
    {
      accessorKey: "phone",
      header: () => <div className="text-center">شماره موبایل</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      accessorKey: "height",
      header: () => <div className="text-center">قد</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      accessorKey: "weight",
      header: () => <div className="text-center">وزن</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      accessorKey: "payment",
      header: () => <div className="text-center">مبلغ</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      accessorKey: "progress",
      header: () => <div className="text-center">تکمیل پروفایل</div>,
      cell: () => <div className="text-center"></div>,
    },
    {
      id: "actions",
      header: () => <div className="text-center">اقدامات</div>,
      cell: () => <div></div>,
    },
  ];

  const table = useReactTable({
    data: sortedAndFilteredStudents,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="min-h-[400px] flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-100 dark:border-slate-700"></div>
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-blue-500 animate-spin"></div>
            </div>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              در حال بارگذاری...
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="table"
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="overflow-hidden rounded-lg border border-slate-200/70 dark:border-slate-700/70 backdrop-blur-sm bg-white/70 dark:bg-slate-900/60 shadow-lg shadow-slate-200/30 dark:shadow-slate-900/30"
        >
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
            <Table>
              <StudentTableHeader 
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={onSortChange}
              />
              <StudentTableBody
                students={sortedAndFilteredStudents}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddExercise={onAddExercise}
                onAddDiet={onAddDiet}
                onAddSupplement={onAddSupplement}
                onDownload={onDownload}
                isProfileComplete={isProfileComplete}
                columns={columns}
                searchQuery={searchQuery}
                onAddStudent={onAddStudent}
                onClearSearch={onClearSearch}
              />
            </Table>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

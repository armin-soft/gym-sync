
import React from "react";
import { TableRow, TableHead, TableHeader } from "@/components/ui/table";

export const StudentsTableHeader: React.FC = () => {
  return (
    <TableHeader className="bg-slate-50 dark:bg-slate-900 backdrop-blur-sm sticky top-0 z-10">
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
  );
};


import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const StudentTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-center">تصویر</TableHead>
        <TableHead>نام</TableHead>
        <TableHead className="text-center">شماره موبایل</TableHead>
        <TableHead className="text-center">قد</TableHead>
        <TableHead className="text-center">وزن</TableHead>
        <TableHead className="text-center">مبلغ</TableHead>
        <TableHead className="text-center">تکمیل پروفایل</TableHead>
        <TableHead className="text-center">اقدامات</TableHead>
      </TableRow>
    </TableHeader>
  );
};

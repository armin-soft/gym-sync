
import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface StudentTableEmptyProps {
  columnsCount: number;
}

export const StudentTableEmpty: React.FC<StudentTableEmptyProps> = ({
  columnsCount
}) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={columnsCount} className="h-24 text-center">
          هنوز هیچ شاگردی ثبت نشده است.
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

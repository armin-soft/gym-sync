
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTableColumns } from "./tableColumns";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/components/students/StudentTypes";

interface StudentTableHeaderProps {
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
}

export const StudentTableHeader: React.FC<StudentTableHeaderProps> = ({
  sortField,
  sortOrder,
  onSortChange
}) => {
  const columns = useTableColumns();
  
  const getSortIcon = (column: string) => {
    if (sortField !== column) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="ml-1 h-3 w-3 text-purple-500" />
    ) : (
      <ChevronDown className="ml-1 h-3 w-3 text-purple-500" />
    );
  };

  return (
    <TableHeader className="bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
      <TableRow>
        {columns.map((column) => {
          // Properly handle column keys based on different column types
          const key = typeof column.id === "string" ? column.id : 
                     "accessorKey" in column && typeof column.accessorKey === "string" ? column.accessorKey : 
                     String(column.id);
          
          const isSortable = key && ["name", "payment", "height", "weight"].includes(key);
          
          const handleClick = () => {
            if (isSortable && onSortChange) {
              onSortChange(key);
            }
          };
          
          return (
            <TableHead
              key={key}
              className={`text-center px-4 py-3 font-semibold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 ${
                isSortable ? "cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-700/30" : ""
              }`}
              style={column.size ? { width: column.size } : {}}
              onClick={handleClick}
            >
              <motion.div
                className="flex items-center justify-center"
                whileHover={isSortable ? { scale: 1.05 } : undefined}
              >
                {typeof column.header === "function" ? column.header({
                  header: column.header,
                  column: column, 
                  table: {}
                }) : column.header}
                {isSortable && getSortIcon(key)}
              </motion.div>
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
};

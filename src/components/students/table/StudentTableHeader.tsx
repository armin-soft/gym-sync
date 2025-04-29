
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Column definition for better maintenance
  const columns = [
    { id: "image", label: "تصویر", className: "text-center", sortable: false },
    { id: "name", label: "نام", className: "", sortable: true },
    { id: "phone", label: "شماره موبایل", className: "text-center", sortable: true },
    { id: "height", label: "قد", className: "text-center", sortable: true },
    { id: "weight", label: "وزن", className: "text-center", sortable: true },
    { id: "payment", label: "مبلغ", className: "text-center", sortable: true },
    { id: "profile", label: "تکمیل پروفایل", className: "text-center", sortable: true },
    { id: "actions", label: "اقدامات", className: "text-center", sortable: false }
  ];
  
  const renderSortIcon = (columnId: string) => {
    if (sortField !== columnId) return null;
    
    return sortOrder === "asc" ? 
      <ChevronUp className="h-3 w-3 mr-1 inline-block text-blue-500" /> : 
      <ChevronDown className="h-3 w-3 mr-1 inline-block text-blue-500" />;
  };

  return (
    <TableHeader className="bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm border-b border-slate-200/70 dark:border-slate-700/70">
      <TableRow className="hover:bg-transparent border-none">
        {columns.map(column => (
          <TableHead 
            key={column.id}
            className={`h-10 px-2 sm:px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 ${column.className} ${
              column.sortable ? "cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" : ""
            }`}
            onClick={() => column.sortable && onSortChange ? onSortChange(column.id) : undefined}
          >
            <motion.div 
              className="flex items-center justify-center sm:justify-start"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              whileHover={column.sortable ? { scale: 1.05 } : {}}
            >
              {renderSortIcon(column.id)}
              <span>{column.label}</span>
            </motion.div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

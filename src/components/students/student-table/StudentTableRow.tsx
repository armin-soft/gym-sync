
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { StatusBadge } from "./StatusBadge";
import { StudentAvatar } from "./StudentAvatar";
import { StudentProgressBar } from "./StudentProgressBar";
import { StudentActionButtons } from "./StudentActionButtons";

interface StudentTableRowProps {
  student: Student;
  index: number;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
}

export const StudentTableRow: React.FC<StudentTableRowProps> = ({
  student,
  index,
  isHovered,
  onHover,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload
}) => {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={`transition-all ${
        isHovered 
          ? "bg-slate-50 dark:bg-slate-900/70" 
          : "hover:bg-slate-50/70 dark:hover:bg-slate-900/40"
      }`}
      onMouseEnter={() => onHover(student.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onEdit(student)}
      style={{ cursor: "pointer" }}
    >
      <TableCell className="font-medium">
        {toPersianNumbers(index + 1)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <StudentAvatar 
            name={student.name}
            image={student.image}
          />
          <div className="flex flex-col">
            <span className="font-medium">{student.name}</span>
            {student.payment && (
              <span className="text-xs text-muted-foreground">
                {toPersianNumbers(student.payment.replace(/\B(?=(\d{3})+(?!\d))/g, ','))} تومان
              </span>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell dir="ltr" className="text-right font-medium text-slate-600 dark:text-slate-400">
        {toPersianNumbers(student.phone)}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700">
          {toPersianNumbers(student.height)} سانتی‌متر
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700">
          {toPersianNumbers(student.weight)} کیلوگرم
        </Badge>
      </TableCell>
      <TableCell>
        <StatusBadge student={student} />
      </TableCell>
      <TableCell className="w-[140px]">
        <StudentProgressBar student={student} />
      </TableCell>
      <TableCell onClick={e => e.stopPropagation()}>
        <StudentActionButtons
          student={student}
          onAddExercise={onAddExercise}
          onAddDiet={onAddDiet}
          onAddSupplement={onAddSupplement}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      </TableCell>
    </motion.tr>
  );
};

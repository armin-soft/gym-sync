
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "./StudentTypes";
import { Edit, Trash2, MoreVertical, User, Clipboard, Dumbbell, UtensilsCrossed, Pill } from "lucide-react";
import { motion } from "framer-motion";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
  onAddExercise?: (student: Student) => void;
  onAddDiet?: (student: Student) => void;
  onAddSupplement?: (student: Student) => void;
  onDownload?: (student: Student) => void;
}

export const StudentTable = ({ 
  students, 
  onEdit, 
  onDelete, 
  onAddExercise, 
  onAddDiet, 
  onAddSupplement, 
  onDownload
}: StudentTableProps) => {
  // We'll use Radix UI's built-in state management for dropdowns

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>
            <TableHead>نام و نام خانوادگی</TableHead>
            <TableHead>موبایل</TableHead>
            <TableHead>قد</TableHead>
            <TableHead>وزن</TableHead>
            <TableHead>تمرین‌ها</TableHead>
            <TableHead>مکمل‌ها</TableHead>
            <TableHead>برنامه غذایی</TableHead>
            <TableHead className="text-left">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <User className="h-8 w-8 mb-2 opacity-40" />
                  <p className="font-medium">هیچ شاگردی یافت نشد</p>
                  <p className="text-sm mt-1">برای افزودن شاگرد جدید، از دکمه بالا استفاده کنید</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            students.map((student, index) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  {toPersianNumbers(index + 1)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.image} alt={student.name} />
                      <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{student.name}</span>
                  </div>
                </TableCell>
                <TableCell dir="ltr" className="text-right">
                  {toPersianNumbers(student.phone)}
                </TableCell>
                <TableCell>
                  {toPersianNumbers(student.height)} سانتی‌متر
                </TableCell>
                <TableCell>
                  {toPersianNumbers(student.weight)} کیلوگرم
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                    {student.exercises?.length ? toPersianNumbers(student.exercises.length) : '۰'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                    {student.supplements?.length ? toPersianNumbers(student.supplements.length) : '۰'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    {student.meals?.length ? toPersianNumbers(student.meals.length) : '۰'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end" 
                        className="w-48 z-50 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      >
                        <DropdownMenuItem 
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => {
                            onEdit(student);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          <span>ویرایش اطلاعات</span>
                        </DropdownMenuItem>
                        
                        {onDownload && (
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDownload(student);
                            }}
                          >
                            <Clipboard className="h-4 w-4" />
                            <span>پرینت برنامه</span>
                          </DropdownMenuItem>
                        )}
                        
                        {onAddExercise && (
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddExercise(student);
                            }}
                          >
                            <Dumbbell className="h-4 w-4" />
                            <span>تمرین</span>
                          </DropdownMenuItem>
                        )}
                        
                        {onAddDiet && (
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddDiet(student);
                            }}
                          >
                            <UtensilsCrossed className="h-4 w-4" />
                            <span>برنامه غذایی</span>
                          </DropdownMenuItem>
                        )}
                        
                        {onAddSupplement && (
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddSupplement(student);
                            }}
                          >
                            <Pill className="h-4 w-4" />
                            <span>مکمل و ویتامین</span>
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem 
                          className="flex items-center gap-2 text-red-600 cursor-pointer"
                          onClick={() => {
                            onDelete(student.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>حذف</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

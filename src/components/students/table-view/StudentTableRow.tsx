
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Student } from "../StudentTypes";
import { getStudentProgress, getProgressColor } from "@/utils/studentUtils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { MoreVertical, UserCog, ChevronRight, Dumbbell, UtensilsCrossed, Pill, Clipboard, Download, Trash2 } from "lucide-react";

interface StudentTableRowProps {
  student: Student;
  index: number;
  hoveredRowId: number | null;
  openMenuId: number | null;
  isProfileComplete: boolean;
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  setHoveredRowId: (id: number | null) => void;
  setOpenMenuId: (id: number | null) => void;
}

export const StudentTableRow = ({
  student,
  index,
  hoveredRowId,
  openMenuId,
  isProfileComplete,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  setHoveredRowId,
  setOpenMenuId
}: StudentTableRowProps) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={`transition-all duration-300 ${hoveredRowId === student.id ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : 'hover:bg-muted/50'}`}
      onMouseEnter={() => setHoveredRowId(student.id)}
      onMouseLeave={() => setHoveredRowId(null)}
    >
      <TableCell className="font-medium">
        {toPersianNumbers(index + 1)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 transition-transform duration-300 hover:scale-110">
            <AvatarImage src={student.image} alt={student.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">{student.name[0]}</AvatarFallback>
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
        <div className="flex justify-end items-center space-x-1 space-x-reverse">
          {hoveredRowId === student.id && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }} 
              animate={{ opacity: 1, width: 'auto' }} 
              className="mr-2 flex items-center gap-2"
            >
              <Progress 
                value={getStudentProgress(student)} 
                className="h-2 w-16 bg-slate-100" 
                indicatorClassName={getProgressColor(getStudentProgress(student))}
                showAnimation={getStudentProgress(student) >= 100}
              />
              <span className="text-xs font-medium text-slate-500">
                {toPersianNumbers(getStudentProgress(student))}٪
              </span>
            </motion.div>
          )}
          
          <div className={`transition-opacity duration-300 flex gap-1 ${hoveredRowId === student.id ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 relative overflow-hidden group"
              onClick={() => onAddExercise(student)}
              title="افزودن تمرین"
              disabled={!isProfileComplete}
            >
              <span className="absolute inset-0 bg-indigo-100 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 rounded-full"></span>
              <Dumbbell className="h-4 w-4 relative z-10" />
              <span className="sr-only">افزودن تمرین</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-green-600 hover:bg-green-100 hover:text-green-700 relative overflow-hidden group"
              onClick={() => onAddDiet(student)}
              title="افزودن برنامه غذایی"
              disabled={!isProfileComplete}
            >
              <span className="absolute inset-0 bg-green-100 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 rounded-full"></span>
              <UtensilsCrossed className="h-4 w-4 relative z-10" />
              <span className="sr-only">افزودن برنامه غذایی</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-purple-600 hover:bg-purple-100 hover:text-purple-700 relative overflow-hidden group"
              onClick={() => onAddSupplement(student)}
              title="افزودن مکمل"
              disabled={!isProfileComplete}
            >
              <span className="absolute inset-0 bg-purple-100 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 rounded-full"></span>
              <Pill className="h-4 w-4 relative z-10" />
              <span className="sr-only">افزودن مکمل</span>
            </Button>
          </div>

          <DropdownMenu
            open={openMenuId === student.id}
            onOpenChange={(open) => setOpenMenuId(open ? student.id : null)}
          >
            <DropdownMenuTrigger asChild>
              <Button 
                variant={hoveredRowId === student.id ? "secondary" : "ghost"} 
                size="icon" 
                className={`h-9 w-9 rounded-full transition-all duration-300 relative overflow-hidden group ${
                  hoveredRowId === student.id ? 'shadow-sm' : ''
                }`} 
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <span className="absolute inset-0 bg-slate-100 dark:bg-slate-800 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 rounded-full"></span>
                <MoreVertical className="h-4 w-4 relative z-10" />
                <span className="sr-only">منوی عملیات</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-xl rounded-xl p-1 animate-in zoom-in-90 duration-100"
            >
              <DropdownMenuLabel className="text-xs text-slate-500 dark:text-slate-400 px-2 pb-1">
                گزینه‌های شاگرد
              </DropdownMenuLabel>
              
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800 group/item"
                  onClick={() => {
                    onEdit(student);
                    setOpenMenuId(null);
                  }}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-800/40 transition-colors duration-200">
                    <UserCog className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-200">ویرایش اطلاعات</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">تغییر مشخصات شاگرد</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800 group/item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddExercise(student);
                    setOpenMenuId(null);
                  }}
                  disabled={!isProfileComplete}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 group-hover/item:bg-amber-100 dark:group-hover/item:bg-amber-800/40 transition-colors duration-200">
                    <Dumbbell className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 transition-colors duration-200">برنامه تمرینی</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">افزودن یا ویرایش تمرین‌ها</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800 group/item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddDiet(student);
                    setOpenMenuId(null);
                  }}
                  disabled={!isProfileComplete}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 group-hover/item:bg-green-100 dark:group-hover/item:bg-green-800/40 transition-colors duration-200">
                    <UtensilsCrossed className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors duration-200">برنامه غذایی</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">افزودن یا ویرایش برنامه غذایی</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800 group/item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddSupplement(student);
                    setOpenMenuId(null);
                  }}
                  disabled={!isProfileComplete}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 group-hover/item:bg-purple-100 dark:group-hover/item:bg-purple-800/40 transition-colors duration-200">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors duration-200">مکمل و ویتامین</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">افزودن یا ویرایش مکمل‌ها</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator className="my-1 bg-slate-200/70 dark:bg-slate-700/70" />
              
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800 group/item"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Placeholder for future print functionality
                    setOpenMenuId(null);
                  }}
                  disabled={!isProfileComplete}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover/item:bg-slate-200 dark:group-hover/item:bg-slate-700 transition-colors duration-200">
                    <Clipboard className="h-4 w-4" />
                  </div>
                  <span className="text-sm group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 transition-colors duration-200">پرینت برنامه</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800 group/item"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Placeholder for future download functionality
                    setOpenMenuId(null);
                  }}
                  disabled={!isProfileComplete}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover/item:bg-slate-200 dark:group-hover/item:bg-slate-700 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                  </div>
                  <span className="text-sm group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 transition-colors duration-200">دانلود برنامه</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator className="my-1 bg-slate-200/70 dark:bg-slate-700/70" />
              
              <DropdownMenuItem 
                className="flex items-center gap-2 cursor-pointer rounded-lg text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30 group/item"
                onClick={() => {
                  onDelete(student.id);
                  setOpenMenuId(null);
                }}
              >
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 group-hover/item:bg-red-100 dark:group-hover/item:bg-red-800/40 transition-colors duration-200">
                  <Trash2 className="h-4 w-4" />
                </div>
                <span className="font-medium group-hover/item:text-red-700 dark:group-hover/item:text-red-300 transition-colors duration-200">حذف شاگرد</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </motion.tr>
  );
};


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
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "./StudentTypes";
import { getStudentProgress, getProgressColor } from "@/utils/studentUtils";
import { 
  Edit, 
  Trash2, 
  MoreVertical, 
  User, 
  Clipboard, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Download,
  ChevronRight,
  PlusCircle,
  UserCog,
  BookMedical,
  FileEdit
} from "lucide-react";
import { motion } from "framer-motion";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  isProfileComplete: boolean;
}

export const StudentTable = ({ 
  students, 
  onEdit, 
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete
}: StudentTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

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
                    {/* Progress indicator visible on hover */}
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
                  
                    {/* Quick action buttons */}
                    <div className={`transition-opacity duration-300 flex gap-1 ${hoveredRowId === student.id ? 'opacity-100' : 'opacity-0'}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700"
                        onClick={() => onAddExercise(student)}
                        title="افزودن تمرین"
                      >
                        <Dumbbell className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-green-600 hover:bg-green-100 hover:text-green-700"
                        onClick={() => onAddDiet(student)}
                        title="افزودن برنامه غذایی"
                      >
                        <UtensilsCrossed className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                        onClick={() => onAddSupplement(student)}
                        title="افزودن مکمل"
                      >
                        <Pill className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Main dropdown menu */}
                    <DropdownMenu
                      open={openMenuId === student.id}
                      onOpenChange={(open) => {
                        setOpenMenuId(open ? student.id : null);
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant={hoveredRowId === student.id ? "secondary" : "ghost"} 
                          size="icon" 
                          className={`h-9 w-9 rounded-full transition-all duration-300 ${
                            hoveredRowId === student.id ? 'shadow-sm' : ''
                          }`} 
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <MoreVertical className="h-4 w-4" />
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
                            className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800"
                            onClick={() => {
                              onEdit(student);
                              setOpenMenuId(null);
                            }}
                          >
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                              <UserCog className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm">ویرایش اطلاعات</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">تغییر مشخصات شاگرد</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddExercise(student);
                              setOpenMenuId(null);
                            }}
                          >
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                              <Dumbbell className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm">برنامه تمرینی</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">افزودن یا ویرایش تمرین‌ها</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddDiet(student);
                              setOpenMenuId(null);
                            }}
                          >
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                              <UtensilsCrossed className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm">برنامه غذایی</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">افزودن یا ویرایش برنامه غذایی</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddSupplement(student);
                              setOpenMenuId(null);
                            }}
                          >
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                              <Pill className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm">مکمل و ویتامین</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">افزودن یا ویرایش مکمل‌ها</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        
                        <DropdownMenuSeparator className="my-1 bg-slate-200/70 dark:bg-slate-700/70" />
                        
                        <DropdownMenuGroup>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Placeholder for future print functionality
                              setOpenMenuId(null);
                            }}
                          >
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              <Clipboard className="h-4 w-4" />
                            </div>
                            <span className="text-sm">پرینت برنامه</span>
                            <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-2 cursor-pointer rounded-lg focus:bg-slate-100 dark:focus:bg-slate-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Placeholder for future download functionality
                              setOpenMenuId(null);
                            }}
                          >
                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              <Download className="h-4 w-4" />
                            </div>
                            <span className="text-sm">دانلود برنامه</span>
                            <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 ml-auto" />
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        
                        <DropdownMenuSeparator className="my-1 bg-slate-200/70 dark:bg-slate-700/70" />
                        
                        <DropdownMenuItem 
                          className="flex items-center gap-2 cursor-pointer rounded-lg text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30"
                          onClick={() => {
                            onDelete(student.id);
                            setOpenMenuId(null);
                          }}
                        >
                          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </div>
                          <span className="font-medium">حذف شاگرد</span>
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

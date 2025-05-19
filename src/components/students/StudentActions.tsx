
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Trash2, 
  CalendarDays
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface StudentActionsProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  isCard?: boolean;
}

export const StudentActions = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  isCard = false,
}: StudentActionsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(student.id);
    setIsDeleteDialogOpen(false);
  };

  // تخصیص برنامه
  const handleProgramClick = () => {
    // هدایت به صفحه برنامه با شناسه شاگرد
    navigate(`/student-program/${student.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">منوی اقدامات</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isCard ? "end" : "start"} className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80">
          <DropdownMenuLabel className="text-indigo-500 dark:text-indigo-400">
            اقدامات
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          {/* تخصیص برنامه - تنها گزینه منو */}
          <DropdownMenuItem onClick={handleProgramClick} className="gap-2">
            <CalendarDays className="h-4 w-4 text-purple-500" />
            تخصیص برنامه
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80">
          <AlertDialogHeader>
            <AlertDialogTitle>آیا از حذف این شاگرد مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این عمل قابل بازگشت نیست. تمامی اطلاعات این شاگرد پاک خواهد شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};


import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Trash2, 
  Edit, 
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
import { EditStudentButton } from "./EditStudentButton";
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
import { useRouter } from "react-router-dom";

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
  const router = useRouter();

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(student.id);
    setIsDeleteDialogOpen(false);
  };

  // Unified function for program management - now navigates to the program page
  const handleProgramClick = () => {
    // Navigate to a URL with the student's ID
    router.navigate(`/student-program/${student.id}`);
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
          
          {/* Edit action */}
          {onEdit ? (
            <DropdownMenuItem onClick={() => onEdit(student)} className="gap-2">
              <Edit className="h-4 w-4 text-gray-500" />
              ویرایش
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <a href={`/students/add-edit/${student.id}`} className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-gray-500" />
                ویرایش
              </a>
            </DropdownMenuItem>
          )}
          
          {/* Program assignment - single unified option */}
          <DropdownMenuItem onClick={handleProgramClick} className="gap-2">
            <CalendarDays className="h-4 w-4 text-purple-500" />
            تخصیص برنامه
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Delete action */}
          <DropdownMenuItem 
            onClick={handleDeleteClick}
            className="gap-2 text-red-500 focus:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
            حذف
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

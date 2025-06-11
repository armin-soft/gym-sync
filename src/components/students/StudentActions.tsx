
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { CalendarDays, MoreHorizontal, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ModernMenuItemWithAnimation } from "./ModernMenuItemWithAnimation";
import ModernProgramManager from "./program/modern/ModernProgramManager";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";

interface StudentActionsProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet?: (student: Student) => void;
  onAddSupplement?: (student: Student) => void;
  isCard?: boolean;
}

export const StudentActions = ({
  student,
  onAddExercise,
  isCard = false,
}: StudentActionsProps) => {
  const [showProgramDialog, setShowProgramDialog] = useState(false);

  // Mock data - در پروژه واقعی از props یا context دریافت می‌شود
  const mockExercises = [
    { id: 1, name: "پرس سینه", category: "سینه", type: "قدرتی" },
    { id: 2, name: "اسکات", category: "پا", type: "قدرتی" },
    { id: 3, name: "بارفیکس", category: "پشت", type: "قدرتی" },
    { id: 4, name: "شنا", category: "کاردیو", type: "هوازی" },
  ];

  const mockMeals = [
    { id: 1, name: "صبحانه پروتئینی", type: "صبحانه", calories: 400, protein: 25 },
    { id: 2, name: "ناهار سالم", type: "ناهار", calories: 600, protein: 35 },
    { id: 3, name: "شام سبک", type: "شام", calories: 350, protein: 20 },
    { id: 4, name: "میان‌وعده", type: "میان‌وعده", calories: 200, protein: 15 },
  ];

  const mockSupplements: Supplement[] = [
    { id: 1, name: "وی پروتئین", type: "پروتئین", dosage: "30 گرم", description: "برای رشد عضلات" },
    { id: 2, name: "مولتی ویتامین", type: "ویتامین", dosage: "1 قرص", description: "برای سلامت عمومی" },
    { id: 3, name: "امگا 3", type: "امگا ۳", dosage: "1000 میلی‌گرم", description: "برای سلامت قلب" },
    { id: 4, name: "کراتین", type: "کراتین", dosage: "5 گرم", description: "برای افزایش قدرت" },
  ];

  const handleProgramClick = () => {
    console.log("StudentActions: Add Exercise clicked for student:", student.name);
    setShowProgramDialog(true);
    if (onAddExercise) {
      onAddExercise(student);
    }
  };

  const handleSaveExercises = (exercisesWithSets: ExerciseWithSets[], dayNumber?: number): boolean => {
    console.log("Saving exercises:", exercisesWithSets, "for day:", dayNumber);
    // اینجا باید منطق ذخیره واقعی قرار گیرد
    return true;
  };

  const handleSaveDiet = (mealIds: number[], dayNumber?: number): boolean => {
    console.log("Saving diet:", mealIds, "for day:", dayNumber);
    // اینجا باید منطق ذخیره واقعی قرار گیرد
    return true;
  };

  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number): boolean => {
    console.log("Saving supplements:", data, "for student:", studentId);
    // اینجا باید منطق ذخیره واقعی قرار گیرد
    return true;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <MoreHorizontal className="h-5 w-5 relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
            <span className="sr-only">منوی اقدامات مدرن</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={isCard ? "end" : "start"} 
          className="w-64 p-3 rounded-2xl border-slate-200/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl dark:shadow-black/40 border-2 dark:border-slate-800/60"
        >
          {/* هدر مدرن */}
          <div className="px-3 py-2 mb-3 rounded-xl bg-gradient-to-l from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-100 dark:border-purple-800/30">
            <DropdownMenuLabel className="text-sm font-bold text-purple-700 dark:text-purple-300 p-0 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              اقدامات پیشرفته
            </DropdownMenuLabel>
            <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">
              مدیریت هوشمند {student.name}
            </p>
          </div>
          
          <div className="space-y-1">
            {/* تخصیص برنامه */}
            <ModernMenuItemWithAnimation
              icon={<CalendarDays className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
              onClick={handleProgramClick}
              label="تخصیص برنامه"
              description="ایجاد برنامه جدید"
              index={0}
              bgHoverClass="hover:bg-gradient-to-l hover:from-purple-50 hover:to-indigo-100 dark:hover:from-purple-900/20 dark:hover:to-indigo-800/20"
            />
          </div>
          
          {/* پایین منو */}
          <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
              نسخه پیشرفته GymSync
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modern Program Dialog */}
      <Dialog open={showProgramDialog} onOpenChange={setShowProgramDialog}>
        <DialogContent className="max-w-[100vw] p-0 m-0 h-[100vh] w-[100vw] rounded-none border-none overflow-hidden">
          <ModernProgramManager
            student={student}
            exercises={mockExercises}
            meals={mockMeals}
            supplements={mockSupplements}
            onSaveExercises={handleSaveExercises}
            onSaveDiet={handleSaveDiet}
            onSaveSupplements={handleSaveSupplements}
            onClose={() => setShowProgramDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

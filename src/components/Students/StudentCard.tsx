
import { useState } from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes"; // Updated import path
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Download,
  Phone,
  Ruler,
  Weight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
  isProfileComplete: boolean;
}

export const StudentCard = ({ 
  student, 
  onEdit, 
  onDelete, 
  onAddExercise, 
  onAddDiet, 
  onAddSupplement,
  isProfileComplete
}: StudentCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const getProgressColor = (progress: number = 0) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-amber-500";
    if (progress < 75) return "bg-blue-500";
    return "bg-emerald-500";
  };
  
  const getProgressText = (progress: number = 0) => {
    if (progress === 0) return "بدون برنامه";
    if (progress < 25) return "شروع نشده";
    if (progress < 50) return "در ابتدای راه";
    if (progress < 75) return "در حال پیشرفت";
    if (progress < 100) return "تقریبا کامل";
    return "کامل شده";
  };
  
  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete();
  };
  
  const hasExercises = Boolean(student.exercises?.length || 
                               student.exercisesDay1?.length || 
                               student.exercisesDay2?.length || 
                               student.exercisesDay3?.length || 
                               student.exercisesDay4?.length);
  
  const hasMeals = Boolean(student.meals?.length);
  
  const hasSupplements = Boolean(student.supplements?.length || student.vitamins?.length);
  
  const progress = student.progress || 0;
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
    hover: { 
      y: -5, 
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 500, damping: 30 }
    },
    tap: { scale: 0.98 }
  };
  
  const iconButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: 5, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.9 }
  };

  return (
    <>
      <motion.div 
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-md group"
      >
        <div className="relative p-6 pb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 absolute top-3 left-3 opacity-80 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={onEdit} className="gap-2 cursor-pointer">
                <Edit className="h-4 w-4" />
                <span>ویرایش اطلاعات</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={onAddExercise} className="gap-2 cursor-pointer">
                <Dumbbell className="h-4 w-4 text-blue-500" />
                <span>افزودن برنامه تمرینی</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onAddDiet} className="gap-2 cursor-pointer">
                <UtensilsCrossed className="h-4 w-4 text-green-500" />
                <span>افزودن برنامه غذایی</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onAddSupplement} className="gap-2 cursor-pointer">
                <Pill className="h-4 w-4 text-purple-500" />
                <span>افزودن مکمل و ویتامین</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
                <span>حذف شاگرد</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex flex-col items-center text-center mb-5">
            <div className="relative group/image mb-3">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 blur-md -z-10 scale-90"></div>
              <img 
                src={student.image || "Assets/Image/Placeholder.svg"} 
                alt={student.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
              />
              <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity"></div>
            </div>
            
            <h3 className="text-lg font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {student.name}
            </h3>
            
            <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span dir="ltr">{toPersianNumbers(student.phone)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl bg-muted/30 p-3 text-center">
              <div className="flex items-center justify-center text-primary mb-1">
                <Ruler className="h-4 w-4 mr-1.5" />
                <span className="text-xs font-medium">قد</span>
              </div>
              <p className="text-lg font-bold">{toPersianNumbers(student.height)} <span className="text-xs">سانتی‌متر</span></p>
            </div>
            
            <div className="rounded-xl bg-muted/30 p-3 text-center">
              <div className="flex items-center justify-center text-primary mb-1">
                <Weight className="h-4 w-4 mr-1.5" />
                <span className="text-xs font-medium">وزن</span>
              </div>
              <p className="text-lg font-bold">{toPersianNumbers(student.weight)} <span className="text-xs">کیلوگرم</span></p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">وضعیت پیشرفت</span>
                <span className="text-muted-foreground">{toPersianNumbers(progress)}٪</span>
              </div>
              <Progress 
                value={progress} 
                indicatorClassName={getProgressColor(progress)}
                className="h-2.5"
              />
              <p className="text-xs text-muted-foreground text-center mt-1">{getProgressText(progress)}</p>
            </div>
            
            <div className="flex justify-between items-center gap-2">
              <motion.div 
                variants={iconButtonVariants} 
                whileHover="hover" 
                whileTap="tap"
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs font-medium text-center",
                  hasExercises 
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                )}
              >
                <Dumbbell className={cn(
                  "h-4 w-4 mx-auto mb-1",
                  hasExercises ? "text-blue-500" : "text-gray-400"
                )} />
                <span>تمرین</span>
              </motion.div>
              
              <motion.div 
                variants={iconButtonVariants} 
                whileHover="hover" 
                whileTap="tap"
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs font-medium text-center",
                  hasMeals 
                    ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                )}
              >
                <UtensilsCrossed className={cn(
                  "h-4 w-4 mx-auto mb-1",
                  hasMeals ? "text-green-500" : "text-gray-400"
                )} />
                <span>تغذیه</span>
              </motion.div>
              
              <motion.div 
                variants={iconButtonVariants} 
                whileHover="hover" 
                whileTap="tap"
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs font-medium text-center",
                  hasSupplements 
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                )}
              >
                <Pill className={cn(
                  "h-4 w-4 mx-auto mb-1",
                  hasSupplements ? "text-purple-500" : "text-gray-400"
                )} />
                <span>مکمل</span>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="border-t px-6 py-3 flex justify-between items-center bg-muted/30">
          <div className="text-xs text-muted-foreground">
            {student.payment && (
              <div className="flex items-center gap-1">
                <span>مبلغ:</span>
                <span className="text-foreground font-medium">
                  {toPersianNumbers(student.payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))} تومان
                </span>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs gap-1.5 opacity-80 hover:opacity-100"
            disabled={!isProfileComplete || progress < 75}
            title={!isProfileComplete ? "ابتدا پروفایل مربی را تکمیل کنید" : progress < 75 ? "حداقل ۷۵٪ برنامه‌ها باید تکمیل شده باشند" : "دانلود پروفایل"}
          >
            <Download className="h-3.5 w-3.5" />
            <span>پروفایل</span>
          </Button>
        </div>
      </motion.div>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف شاگرد</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از حذف {student.name} اطمینان دارید؟ این عمل قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

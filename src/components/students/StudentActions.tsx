
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { CalendarDays, MoreHorizontal, Download, Eye, FileText, Share2, Sparkles, Printer, BookOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { exportStudentProgramToPdf, generateComprehensiveReport } from "@/lib/utils/pdf-export";
import { PdfPreviewModal } from "@/components/ui/PdfPreviewModal";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  console.log("Rendering modern StudentActions for student:", student.name);

  // تخصیص برنامه
  const handleProgramClick = () => {
    console.log("StudentActions: Add Exercise clicked for student:", student.name);
    if (onAddExercise) {
      onAddExercise(student);
    }
  };
  
  // پیش‌نمایش مدرن
  const handlePreviewProgramClick = () => {
    console.log("StudentActions: Modern Preview Program clicked for student:", student.name);
    setIsPreviewOpen(true);
    
    toast({
      title: "🔍 در حال آماده‌سازی پیش‌نمایش",
      description: `پیش‌نمایش برنامه ${student.name} در حال بارگیری است...`,
    });
  };
  
  // صدور برنامه معمولی
  const handleExportProgramClick = async () => {
    console.log("StudentActions: Modern Export Program clicked for student:", student.name);
    
    setIsExporting(true);
    
    toast({
      title: "📄 در حال آماده‌سازی برنامه",
      description: `برنامه ${student.name} در حال تولید است، لطفاً صبر کنید...`,
    });
    
    try {
      await exportStudentProgramToPdf(student);
      
      toast({
        title: "✅ دانلود موفقیت‌آمیز",
        description: `برنامه ${student.name} با موفقیت به صورت PDF دانلود شد`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error exporting program:", error);
      toast({
        variant: "destructive",
        title: "❌ خطا در دانلود",
        description: "مشکلی در صدور برنامه پیش آمد. لطفاً مجدداً تلاش کنید.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // تولید گزارش کامل
  const handleGenerateReportClick = async () => {
    console.log("StudentActions: Generate Comprehensive Report clicked for student:", student.name);
    
    setIsGeneratingReport(true);
    
    toast({
      title: "📊 در حال تولید گزارش کامل",
      description: `گزارش جامع ${student.name} در حال آماده‌سازی است...`,
    });
    
    try {
      await generateComprehensiveReport(student);
      
      toast({
        title: "🎉 گزارش کامل آماده شد",
        description: `گزارش جامع ${student.name} با موفقیت تولید و دانلود شد`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating comprehensive report:", error);
      toast({
        variant: "destructive",
        title: "❌ خطا در تولید گزارش",
        description: "مشکلی در تولید گزارش کامل پیش آمد. لطفاً مجدداً تلاش کنید.",
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-xl hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <MoreHorizontal className="h-5 w-5 relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
            <span className="sr-only">منوی اقدامات مدرن</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={isCard ? "end" : "start"} 
          className="w-64 p-3 rounded-2xl border-slate-200/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl dark:shadow-black/40 border-2 dark:border-slate-800/60"
        >
          {/* هدر مدرن */}
          <div className="px-3 py-2 mb-3 rounded-xl bg-gradient-to-l from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800/30">
            <DropdownMenuLabel className="text-sm font-bold text-indigo-700 dark:text-indigo-300 p-0 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              اقدامات پیشرفته
            </DropdownMenuLabel>
            <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80 mt-1">
              مدیریت هوشمند {student.name}
            </p>
          </div>
          
          <div className="space-y-1">
            {/* تخصیص برنامه */}
            <ModernMenuItemWithAnimation
              icon={<CalendarDays className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
              onClick={handleProgramClick}
              label="📋 تخصیص برنامه"
              description="ایجاد برنامه جدید"
              index={0}
              bgHoverClass="hover:bg-gradient-to-l hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-800/20"
            />
            
            <DropdownMenuSeparator className="my-2 bg-slate-200/60 dark:bg-slate-700/60" />
            
            {/* پیش‌نمایش مدرن */}
            <ModernMenuItemWithAnimation
              icon={<Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
              onClick={handlePreviewProgramClick}
              label="👁️ پیش‌نمایش مدرن"
              description="مشاهده زنده برنامه"
              index={1}
              bgHoverClass="hover:bg-gradient-to-l hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20"
            />
            
            {/* دانلود برنامه */}
            <ModernMenuItemWithAnimation
              icon={isExporting ? (
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              )}
              onClick={handleExportProgramClick}
              label={isExporting ? "در حال دانلود..." : "💾 دانلود برنامه"}
              description={isExporting ? `${toPersianNumbers(0)}% تکمیل شده` : "فایل PDF کامل"}
              index={2}
              disabled={isExporting}
              bgHoverClass="hover:bg-gradient-to-l hover:from-emerald-50 hover:to-green-50 dark:hover:from-emerald-900/20 dark:hover:to-green-900/20"
            />
            
            {/* گزارش کامل */}
            <ModernMenuItemWithAnimation
              icon={isGeneratingReport ? (
                <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              )}
              onClick={handleGenerateReportClick}
              label={isGeneratingReport ? "در حال تولید..." : "📊 گزارش کامل"}
              description={isGeneratingReport ? "آماده‌سازی گزارش جامع" : "گزارش تفصیلی پیشرفت"}
              index={3}
              disabled={isGeneratingReport}
              bgHoverClass="hover:bg-gradient-to-l hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20"
            />
          </div>
          
          {/* پایین منو */}
          <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
              🚀 نسخه پیشرفته GymSync
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <PdfPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        student={student}
      />
    </>
  );
};

interface ModernMenuItemWithAnimationProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick?: () => void;
  index: number;
  disabled?: boolean;
  bgHoverClass?: string;
}

const ModernMenuItemWithAnimation: React.FC<ModernMenuItemWithAnimationProps> = ({ 
  icon, 
  label, 
  description,
  onClick, 
  index,
  disabled = false,
  bgHoverClass = "hover:bg-slate-50 dark:hover:bg-slate-800/60" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: index * 0.08, duration: 0.3, ease: "easeOut" } 
      }}
      whileHover={{ x: 4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <DropdownMenuItem 
        onClick={disabled ? undefined : onClick} 
        disabled={disabled}
        className={`flex items-center gap-3 py-3 px-3 cursor-pointer rounded-xl text-slate-700 dark:text-slate-200 transition-all duration-300 group ${bgHoverClass} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <div className="flex-shrink-0 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-sm border border-slate-200/50 dark:border-slate-700/50 group-hover:shadow-md transition-all duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-0.5">
            {label}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
            {description}
          </div>
        </div>
      </DropdownMenuItem>
    </motion.div>
  );
};

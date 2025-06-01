
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Users, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface WelcomeSectionProps {
  getGreeting: () => string;
  profileName: string;
  totalStudents: number;
  studentsProgress: number;
}

export const WelcomeSection = ({ 
  getGreeting, 
  profileName, 
  totalStudents, 
  studentsProgress 
}: WelcomeSectionProps) => {
  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-l from-white to-violet-200 bg-clip-text text-transparent">
          {getGreeting()}
        </h1>
        <Badge className="bg-violet-500/20 text-violet-200 border-violet-400/30 backdrop-blur-sm self-start sm:self-auto">
          <Star className="w-3 h-3 ml-1" fill="currentColor" />
          {profileName}
        </Badge>
      </div>
      
      <p className="text-lg text-white/80 mb-6 flex items-center gap-3">
        به داشبورد مدیریت حرفه‌ای خود خوش آمدید
        <motion.span 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="inline-flex items-center gap-2 text-sm bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-400/30"
        >
          <Zap className="w-4 h-4" fill="currentColor" />
          آنلاین
        </motion.span>
      </p>
      
      {/* Quick stats */}
      <div className="flex gap-8 text-white/70">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-violet-300" />
          <span className="text-sm">تعداد شاگردان:</span>
          <span className="font-semibold text-white">{toPersianNumbers(totalStudents.toString())}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-300" />
          <span className="text-sm">میزان پیشرفت:</span>
          <span className="font-semibold text-white">{toPersianNumbers(studentsProgress.toString())}٪</span>
        </div>
      </div>
    </div>
  );
};

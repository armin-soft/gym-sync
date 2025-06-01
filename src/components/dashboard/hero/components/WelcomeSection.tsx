
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp } from "lucide-react";
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
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-white">
          {getGreeting()}
        </h1>
        <Badge className="bg-violet-500/20 text-violet-200 border-violet-400/30">
          <Star className="w-3 h-3 ml-1" fill="currentColor" />
          {profileName}
        </Badge>
      </div>
      
      <p className="text-lg text-white/80 mb-6">
        به داشبورد مدیریت حرفه‌ای خود خوش آمدید
      </p>
      
      <div className="flex gap-6 text-white/70">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-violet-300" />
          <span className="text-sm">شاگردان:</span>
          <span className="font-semibold text-white">{toPersianNumbers(totalStudents.toString())}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-300" />
          <span className="text-sm">پیشرفت:</span>
          <span className="font-semibold text-white">{toPersianNumbers(studentsProgress.toString())}٪</span>
        </div>
      </div>
    </div>
  );
};

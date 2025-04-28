
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Users, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProfileSectionProps {
  trainerProfile: {
    name: string;
    image: string;
  };
  stats: {
    totalStudents: number;
    studentsProgress: number;
  };
}

export const ProfileSection = ({ trainerProfile, stats }: ProfileSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 blur-lg opacity-70 animate-pulse" />
          <Avatar className="h-16 w-16 border-2 border-white/30 relative shadow-xl hover:scale-105 transition-transform duration-300">
            <AvatarImage src={trainerProfile.image} alt="تصویر پروفایل" />
            <AvatarFallback>
              <Crown className="w-6 h-6 text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              خوش آمدید <span className="inline-block animate-wave ml-1">👋</span>
            </h1>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30 transition-colors">
              {trainerProfile.name || "مربی حرفه‌ای"}
            </Badge>
          </div>
          <p className="mt-2 text-white/80">
            به داشبورد مدیریت برنامه تمرینی خود خوش آمدید
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
          <Users className="w-4 h-4 text-blue-300" />
          <span className="text-white/90">{toPersianNumbers(stats.totalStudents)} شاگرد</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
          <Activity className="w-4 h-4 text-green-300" />
          <span className="text-white/90">پیشرفت {toPersianNumbers(stats.studentsProgress)}٪</span>
        </div>
      </div>
    </motion.div>
  );
};

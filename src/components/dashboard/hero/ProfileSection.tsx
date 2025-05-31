
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Users, Activity, Sparkles, Hand, CheckCircle } from "lucide-react";
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
  // اطمینان از وجود داده‌ها با fallback بهتر
  const profileName = trainerProfile?.name || "مربی حرفه‌ای";
  const profileImage = trainerProfile?.image || "/placeholder.svg";
  const totalStudents = stats?.totalStudents || 0;
  const studentsProgress = stats?.studentsProgress || 0;

  console.log('ProfileSection data:', { trainerProfile, stats, profileName, profileImage });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-4">
        <motion.div 
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Enhanced glow effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 opacity-70 blur-lg animate-pulse" />
            <Avatar className="h-16 w-16 border-4 border-white/30 relative shadow-xl hover:scale-105 transition-transform duration-300 ring-4 ring-white/30 shadow-2xl">
              <AvatarImage 
                src={profileImage} 
                alt="تصویر پروفایل"
                onError={(e) => {
                  console.log('Avatar image failed to load, using fallback');
                  e.currentTarget.style.display = 'none';
                }}
              />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
                {getInitials(profileName)}
              </AvatarFallback>
            </Avatar>
            
            {/* Crown Badge */}
            <motion.div 
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Crown className="h-4 w-4 text-white" fill="currentColor" />
            </motion.div>
            
            {/* Verification Badge */}
            <motion.div 
              className="absolute -bottom-1 -right-1 p-1 rounded-full bg-green-500 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <CheckCircle className="h-3 w-3 text-white" fill="currentColor" />
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center text-white">
              خوش آمدید 
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="ml-2"
              >
                <Hand className="w-6 h-6 text-yellow-300" />
              </motion.div>
            </h1>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30 transition-colors self-start sm:self-auto">
              {profileName}
            </Badge>
          </div>
          <p className="mt-2 text-white/80 flex items-center gap-2">
            به داشبورد مدیریت برنامه تمرینی خود خوش آمدید
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="inline-flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full"
            >
              <Activity className="w-3 h-3" /> فعال
            </motion.span>
          </p>
          {/* اضافه کردن اطلاعات آمار برای نمایش */}
          <div className="mt-3 flex gap-4 text-sm text-white/70">
            <span>شاگردان: {toPersianNumbers(totalStudents.toString())}</span>
            <span>پیشرفت: {toPersianNumbers(studentsProgress.toString())}٪</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

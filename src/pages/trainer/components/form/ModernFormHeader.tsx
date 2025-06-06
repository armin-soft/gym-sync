
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Edit3, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernFormHeaderProps {
  profileData: any;
  deviceInfo: any;
}

const sectionConfigs = {
  personal: {
    title: 'اطلاعات شخصی',
    description: 'مدیریت اطلاعات شخصی و مشخصات فردی',
    gradient: 'from-blue-500 to-indigo-600',
    icon: Edit3
  },
  gym: {
    title: 'اطلاعات باشگاه',
    description: 'جزئیات باشگاه و امکانات ورزشی',
    gradient: 'from-emerald-500 to-teal-600',
    icon: Edit3
  },
  social: {
    title: 'شبکه‌های اجتماعی',
    description: 'مدیریت حضور آنلاین و شبکه‌های اجتماعی',
    gradient: 'from-purple-500 to-pink-600',
    icon: Edit3
  },
  certificates: {
    title: 'مدارک و گواهینامه‌ها',
    description: 'مدیریت مدارک، گواهینامه‌ها و صلاحیت‌ها',
    gradient: 'from-orange-500 to-red-600',
    icon: Edit3
  },
  statistics: {
    title: 'آمار و گزارشات',
    description: 'نمایش آمار عملکرد و گزارشات جامع',
    gradient: 'from-cyan-500 to-blue-600',
    icon: TrendingUp
  }
};

export const ModernFormHeader = ({ profileData, deviceInfo }: ModernFormHeaderProps) => {
  const config = sectionConfigs[profileData.activeSection as keyof typeof sectionConfigs] || sectionConfigs.personal;
  const Icon = config.icon;
  
  // محاسبه درصد تکمیل (ساده شده)
  const completionPercentage = 75; // به‌طور پیش‌فرض
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'from-green-400 to-emerald-500';
    if (percentage >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  return (
    <div className={cn("relative z-10 bg-gradient-to-r", config.gradient, "p-6 md:p-8 text-white")}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h2 className={`font-bold flex items-center gap-2 ${
              deviceInfo.isMobile ? 'text-xl' : 'text-2xl'
            }`}>
              {config.title}
              <Sparkles className="h-5 w-5 text-yellow-300" />
            </h2>
            <p className="text-white/80 mt-1 text-sm md:text-base">
              {config.description}
            </p>
          </div>
        </div>
        
        {/* نشان وضعیت */}
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
          <CheckCircle2 className="h-4 w-4 text-green-300" />
          <span className="text-sm font-medium">فعال</span>
        </div>
      </div>
      
      {/* نشانگر پیشرفت */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-white/70 mb-2">
          <span>میزان تکمیل پروفایل</span>
          <span>{toPersianNumbers(completionPercentage.toString())}%</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className={cn("h-full bg-gradient-to-r", getProgressColor(completionPercentage), "rounded-full")}
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

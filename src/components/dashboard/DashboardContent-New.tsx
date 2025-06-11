
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { DashboardHeaderNew } from "./header/DashboardHeader-New";
import { StatsGridNew } from "./stats/StatsGrid-New";
import { QuickActionsNew } from "./quick-access/QuickActions-New";
import { StudentsOverviewNew } from "./students/StudentsOverview-New";
import { toPersianNumbers } from "@/lib/utils/numbers";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

interface DashboardContentNewProps {
  stats: DashboardStats;
  currentTime: Date;
  students: Student[];
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const DashboardContentNew = ({ 
  stats, 
  currentTime, 
  students, 
  trainerProfile 
}: DashboardContentNewProps) => {
  const deviceInfo = useDeviceInfo();
  
  // محاسبه آمار واقعی بر اساس داده‌های localStorage
  const calculateRealCapacityUsage = () => {
    return Math.round((stats.totalStudents / stats.maxCapacity) * 100);
  };

  const getPerformanceMessage = () => {
    if (stats.studentsProgress >= 80) {
      return "عملکرد فوق‌العاده! ادامه دهید";
    } else if (stats.studentsProgress >= 60) {
      return "عملکرد خوب، قابل بهبود";
    } else if (stats.studentsProgress >= 40) {
      return "عملکرد متوسط، نیاز به توجه بیشتر";
    } else {
      return "نیاز به بررسی و بهبود برنامه‌ها";
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen w-full"
    >
      <motion.div variants={itemVariants}>
        <DashboardHeaderNew 
          trainerProfile={trainerProfile}
          totalStudents={stats.totalStudents}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatsGridNew stats={stats} />
      </motion.div>

      <div className={`responsive-grid-3 responsive-gap ${deviceInfo.isMobile ? 'grid-cols-1' : 'xl:grid-cols-3'}`}>
        <motion.div 
          variants={itemVariants}
          className={`${deviceInfo.isMobile ? '' : 'xl:col-span-2'} responsive-space-y`}
        >
          <QuickActionsNew />
          <StudentsOverviewNew students={students} />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="responsive-space-y"
        >
          {/* کارت خلاصه عملکرد */}
          <motion.div
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white"
            style={{ background: 'var(--bg-gradient-secondary)' }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/15 rounded-full blur-2xl" />
            </div>
            
            <div className="relative z-10">
              <h3 className="responsive-text-lg font-bold mb-4 text-readable">خلاصه عملکرد</h3>
              
              <div className="responsive-space-y">
                <div className="flex justify-between items-center">
                  <span className="responsive-text-sm text-readable">میانگین پیشرفت</span>
                  <span className="responsive-text-xl font-bold">{toPersianNumbers(stats.studentsProgress.toString())}%</span>
                </div>
                
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div 
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.studentsProgress}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
                
                <p className="text-white/80 responsive-text-xs text-readable">
                  {getPerformanceMessage()}
                </p>
              </div>
            </div>
          </motion.div>

          {/* کارت آمار سریع */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl responsive-padding border border-gray-200/50 dark:border-gray-700/50"
            style={{ boxShadow: 'var(--shadow-soft)' }}
          >
            <h4 className="font-bold responsive-text-base mb-4 text-gray-900 dark:text-white text-readable">آمار سریع</h4>
            
            <div className="responsive-space-y">
              <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                <span className="responsive-text-xs text-gray-600 dark:text-gray-400 text-readable">نرخ تکمیل رژیم</span>
                <span className="font-bold text-emerald-600 responsive-text-sm">{toPersianNumbers(stats.mealCompletionRate.toString())}%</span>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30">
                <span className="responsive-text-xs text-gray-600 dark:text-gray-400 text-readable">نرخ مصرف مکمل</span>
                <span className="font-bold text-sky-600 responsive-text-sm">{toPersianNumbers(stats.supplementCompletionRate.toString())}%</span>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30">
                <span className="responsive-text-xs text-gray-600 dark:text-gray-400 text-readable">ظرفیت استفاده</span>
                <span className="font-bold text-orange-600 responsive-text-sm">
                  {toPersianNumbers(calculateRealCapacityUsage().toString())}%
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <span className="responsive-text-xs text-gray-600 dark:text-gray-400 text-readable">کل برنامه‌ها</span>
                <span className="font-bold text-purple-600 responsive-text-sm">
                  {toPersianNumbers((stats.totalMeals + stats.totalSupplements).toString())}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardContentNew;

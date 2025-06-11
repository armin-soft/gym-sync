import React from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users, Activity, Calendar, Star } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface DashboardContentNewProps {
  stats: {
    totalStudents: number;
    activePrograms: number;
    completedSessions: number;
    rating: number;
  };
  currentTime: Date;
  students: {
    id: number;
    name: string;
    phone: string;
    image?: string;
    createdAt?: string;
  }[];
  trainerProfile: {
    name: string;
    image: string;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export const DashboardContentNew: React.FC<DashboardContentNewProps> = ({
  stats,
  currentTime,
  students,
  trainerProfile
}) => {
  const formatTime = currentTime.toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="dashboard-content overflow-x-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6 xs:space-y-7 sm:space-y-8 md:space-y-9 lg:space-y-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="dashboard-card">
          <div className="responsive-flex-between gap-4 xs:gap-5 sm:gap-6">
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                <div className="dashboard-icon bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="responsive-icon text-white" />
                </div>
                <div>
                  <h1 className="dashboard-title">
                    سلام، {trainerProfile.name || "مربی عزیز"}! 👋
                  </h1>
                  <p className="dashboard-subtitle">
                    خوش آمدید به داشبورد مدیریت باشگاه
                  </p>
                </div>
              </div>
              <div className="text-body text-gray-500">
                📅 {formatTime} | 🎯 مدیریت حرفه‌ای ورزشکاران
              </div>
            </div>
            
            {trainerProfile.image && (
              <div className="dashboard-icon rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg">
                <img 
                  src={trainerProfile.image} 
                  alt={trainerProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <div className="dashboard-stats-grid">
            <div className="dashboard-card hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-small text-gray-600 mb-1">تعداد شاگردان</p>
                  <p className="dashboard-stat text-emerald-600">{toPersianNumbers(stats.totalStudents)}</p>
                </div>
                <Users className="dashboard-icon text-emerald-500" />
              </div>
            </div>
            
            <div className="dashboard-card hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-small text-gray-600 mb-1">برنامه‌های فعال</p>
                  <p className="dashboard-stat text-blue-600">{toPersianNumbers(stats.activePrograms)}</p>
                </div>
                <Activity className="dashboard-icon text-blue-500" />
              </div>
            </div>
            
            <div className="dashboard-card hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-small text-gray-600 mb-1">جلسات تکمیل شده</p>
                  <p className="dashboard-stat text-purple-600">{toPersianNumbers(stats.completedSessions)}</p>
                </div>
                <Calendar className="dashboard-icon text-purple-500" />
              </div>
            </div>
            
            <div className="dashboard-card hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-small text-gray-600 mb-1">رضایت شاگردان</p>
                  <p className="dashboard-stat text-yellow-600">{toPersianNumbers(stats.rating)}.۰</p>
                </div>
                <Star className="dashboard-icon text-yellow-500" />
              </div>
            </div>
            
            <div className="dashboard-card hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body-small text-gray-600 mb-1">پیشرفت کلی</p>
                  <p className="dashboard-stat text-orange-600">{toPersianNumbers(85)}%</p>
                </div>
                <TrendingUp className="dashboard-icon text-orange-500" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Students */}
        <motion.div variants={itemVariants} className="dashboard-card">
          <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6">
            <h2 className="text-heading-3">شاگردان اخیر</h2>
            <span className="text-body-small text-gray-500">
              {toPersianNumbers(students.length)} شاگرد
            </span>
          </div>
          
          {students.length === 0 ? (
            <div className="text-center py-8 xs:py-10 sm:py-12">
              <Users className="dashboard-icon mx-auto text-gray-400 mb-3 xs:mb-4" />
              <p className="text-body text-gray-500">هنوز شاگردی ثبت نشده است</p>
            </div>
          ) : (
            <div className="space-y-3 xs:space-y-4">
              {students.slice(0, 5).map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 xs:gap-4 p-3 xs:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-blue-500">
                    <img 
                      src={student.image || "/Assets/Image/Place-Holder.svg"}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-body font-medium text-gray-800">{student.name}</h3>
                    <p className="text-body-small text-gray-500" dir="ltr">{student.phone}</p>
                  </div>
                  <div className="text-body-small text-gray-400">
                    {student.createdAt && new Date(student.createdAt).toLocaleDateString('fa-IR')}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Performance Overview */}
        <motion.div variants={itemVariants} className="dashboard-card">
          <h2 className="text-heading-3 mb-4 xs:mb-5 sm:mb-6">نمای کلی عملکرد</h2>
          <div className="dashboard-grid">
            <div className="text-center p-4 xs:p-5 bg-emerald-50 rounded-lg">
              <Activity className="dashboard-icon mx-auto text-emerald-600 mb-2 xs:mb-3" />
              <p className="text-body-large font-semibold text-emerald-800">فعال</p>
              <p className="text-body-small text-emerald-600">وضعیت باشگاه</p>
            </div>
            <div className="text-center p-4 xs:p-5 bg-blue-50 rounded-lg">
              <TrendingUp className="dashboard-icon mx-auto text-blue-600 mb-2 xs:mb-3" />
              <p className="text-body-large font-semibold text-blue-800">رو به رشد</p>
              <p className="text-body-small text-blue-600">روند عملکرد</p>
            </div>
            <div className="text-center p-4 xs:p-5 bg-purple-50 rounded-lg">
              <Star className="dashboard-icon mx-auto text-purple-600 mb-2 xs:mb-3" />
              <p className="text-body-large font-semibold text-purple-800">عالی</p>
              <p className="text-body-small text-purple-600">کیفیت خدمات</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

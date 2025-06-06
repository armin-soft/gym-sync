
import { motion } from "framer-motion";
import { BarChart3, Users, Award, TrendingUp, Calendar, Star } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatisticsSectionProps {
  profileData: any;
  deviceInfo: any;
}

export const StatisticsSection = ({ profileData, deviceInfo }: StatisticsSectionProps) => {
  const { profile } = profileData;
  const stats = profile?.statistics || {};

  const statCards = [
    {
      icon: Users,
      label: "تعداد دانشجویان",
      value: toPersianNumbers((stats.totalStudents || 0).toString()),
      color: "from-blue-500 to-indigo-600",
      description: "دانشجوی فعال"
    },
    {
      icon: Calendar,
      label: "سال‌های تجربه",
      value: toPersianNumbers((stats.yearsExperience || 0).toString()),
      color: "from-emerald-500 to-teal-600",
      description: "سال فعالیت حرفه‌ای"
    },
    {
      icon: Award,
      label: "برنامه‌های تکمیل شده",
      value: toPersianNumbers((stats.completedPrograms || 0).toString()),
      color: "from-purple-500 to-pink-600",
      description: "برنامه موفق"
    },
    {
      icon: Star,
      label: "درصد موفقیت",
      value: `${toPersianNumbers((stats.successRate || 0).toString())}%`,
      color: "from-orange-500 to-red-600",
      description: "نرخ رضایت"
    }
  ];

  return (
    <div className="space-y-6">
      {/* هدر بخش */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            آمار و گزارشات
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            نمایش عملکرد و آمار کلی فعالیت‌های شما
          </p>
        </div>
      </div>

      {/* کارت‌های آماری */}
      <div className={`grid gap-6 ${
        deviceInfo.isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'
      }`}>
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl relative`}>
              {/* پس‌زمینه تزیینی */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
              
              <div className="relative z-10">
                {/* آیکون */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-white/60" />
                </div>

                {/* مقدار */}
                <div className="mb-2">
                  <div className="text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm">
                    {stat.description}
                  </div>
                </div>

                {/* برچسب */}
                <div className="text-white/90 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* نمودار پیشرفت */}
      <motion.div
        className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-cyan-600" />
          تحلیل عملکرد
        </h4>

        <div className="space-y-4">
          {[
            { label: "تکمیل پروفایل", value: 85, color: "bg-blue-500" },
            { label: "فعالیت هفتگی", value: 92, color: "bg-emerald-500" },
            { label: "رضایت دانشجویان", value: stats.successRate || 94, color: "bg-purple-500" },
            { label: "کیفیت آموزش", value: 88, color: "bg-orange-500" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-24 text-sm text-gray-600 dark:text-gray-400">
                  {item.label}
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <motion.div
                    className={`${item.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white ml-4">
                {toPersianNumbers(item.value.toString())}%
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

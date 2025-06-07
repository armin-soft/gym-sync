
import { motion } from "framer-motion";
import { BarChart3, Users, Trophy, Star, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NewAchievementsTabProps {
  profileData: any;
}

export const NewAchievementsTab = ({ profileData }: NewAchievementsTabProps) => {
  const achievements = profileData.profileData.achievements;

  const stats = [
    {
      title: "تعداد کل شاگردان",
      value: toPersianNumbers(achievements.totalStudents.toString()),
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      description: "شاگرد فعال تحت نظارت"
    },
    {
      title: "برنامه‌های موفق",
      value: toPersianNumbers(achievements.successfulPrograms.toString()),
      icon: Trophy,
      gradient: "from-sky-500 to-blue-600",
      description: "برنامه با نتیجه مثبت"
    },
    {
      title: "رضایت شاگردان",
      value: `${toPersianNumbers(achievements.satisfaction.toString())}%`,
      icon: Star,
      gradient: "from-yellow-500 to-orange-600",
      description: "میانگین امتیاز رضایت"
    },
    {
      title: "سال تجربه",
      value: toPersianNumbers(achievements.yearsExperience.toString()),
      icon: Award,
      gradient: "from-purple-500 to-pink-600",
      description: "سال فعالیت حرفه‌ای"
    },
    {
      title: "درآمد ماهانه",
      value: `${toPersianNumbers((achievements.monthlyIncome / 1000000).toString())} میلیون`,
      icon: TrendingUp,
      gradient: "from-indigo-500 to-purple-600",
      description: "تومان درآمد متوسط"
    },
    {
      title: "دوره‌های تکمیلی",
      value: toPersianNumbers(achievements.completedCourses.toString()),
      icon: BarChart3,
      gradient: "from-pink-500 to-rose-600",
      description: "دوره آموزشی تکمیل شده"
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          دستاوردها و آمار عملکرد
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          نگاهی به آمار و عملکرد حرفه‌ای شما
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* پس‌زمینه گرادیان */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
              
              <div className="relative p-6 space-y-4">
                {/* آیکون */}
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* محتوا */}
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {stat.title}
                  </h4>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
                
                {/* اندیکاتور پیشرفت */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(parseInt(stat.value.replace(/[^\d]/g, '')) / 10, 100)}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* کارت خلاصه عملکرد */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                عملکرد ممتاز
              </h4>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                با توجه به آمار و عملکرد شما، در رده مربیان ممتاز قرار گرفته‌اید. 
                ادامه این روند باعث افزایش اعتبار و جذب شاگردان بیشتر خواهد شد.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
                <span className="text-sm text-gray-500">رتبه کلی:</span>
                <span className="font-bold text-indigo-600 mr-2">A+</span>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
                <span className="text-sm text-gray-500">سطح:</span>
                <span className="font-bold text-purple-600 mr-2">حرفه‌ای</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

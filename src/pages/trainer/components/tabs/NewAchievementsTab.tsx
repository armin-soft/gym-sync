
import { motion } from "framer-motion";
import { Trophy, Users, Target, TrendingUp, Star, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NewAchievementsTabProps {
  profileData: any;
}

export const NewAchievementsTab = ({ profileData }: NewAchievementsTabProps) => {
  const achievements = profileData.profileData.achievements;

  const achievementCards = [
    {
      icon: Users,
      title: "تعداد شاگردان",
      value: toPersianNumbers(achievements.totalStudents.toString()),
      description: "شاگرد فعال",
      gradient: "from-emerald-500 to-teal-600",
      growth: "+۱۲%"
    },
    {
      icon: Target,
      title: "برنامه‌های موفق",
      value: toPersianNumbers(achievements.successfulPrograms.toString()),
      description: "برنامه تکمیل شده",
      gradient: "from-blue-500 to-indigo-600",
      growth: "+۸%"
    },
    {
      icon: TrendingUp,
      title: "میزان رضایت",
      value: `${toPersianNumbers(achievements.satisfaction.toString())}%`,
      description: "رضایت شاگردان",
      gradient: "from-purple-500 to-pink-600",
      growth: "+۳%"
    },
    {
      icon: Award,
      title: "سال تجربه",
      value: toPersianNumbers(achievements.yearsExperience.toString()),
      description: "سال فعالیت حرفه‌ای",
      gradient: "from-orange-500 to-red-600",
      growth: "پیوسته"
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
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          دستاوردها و آمار
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          عملکرد و دستاوردهای حرفه‌ای شما
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievementCards.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className={`p-6 bg-gradient-to-br ${achievement.gradient} text-white shadow-xl border-none hover:scale-105 transition-transform duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <achievement.icon className="w-8 h-8 text-white/90" />
                <div className="bg-white/20 rounded-full px-3 py-1">
                  <span className="text-sm font-medium">{achievement.growth}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">{achievement.title}</h4>
                <div className="text-3xl font-bold">{achievement.value}</div>
                <p className="text-white/80 text-sm">{achievement.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* نمودار پیشرفت */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                وضعیت کلی عملکرد
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                ارزیابی جامع عملکرد حرفه‌ای
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">میزان موفقیت کلی</span>
              <span className="font-bold text-emerald-600">۹۵%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "95%" }}
                transition={{ delay: 0.8, duration: 1.5 }}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

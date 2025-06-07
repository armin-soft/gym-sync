
import { motion } from "framer-motion";
import { Clock, Calendar, Users, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NewScheduleTabProps {
  profileData: any;
}

export const NewScheduleTab = ({ profileData }: NewScheduleTabProps) => {
  const schedule = [
    {
      day: "شنبه",
      sessions: [
        { time: "۰۸:۰۰ - ۱۰:۰۰", type: "تمرین شخصی", students: 3, status: "تکمیل" },
        { time: "۱۰:۳۰ - ۱۲:۰۰", type: "کلاس گروهی", students: 8, status: "در حال برگزاری" },
        { time: "۱۶:۰۰ - ۱۸:۰۰", type: "تمرین شخصی", students: 4, status: "رزرو شده" }
      ]
    },
    {
      day: "یکشنبه",
      sessions: [
        { time: "۰۹:۰۰ - ۱۱:۰۰", type: "کلاس کراس فیت", students: 12, status: "رزرو شده" },
        { time: "۱۵:۰۰ - ۱۷:۰۰", type: "تمرین شخصی", students: 5, status: "رزرو شده" }
      ]
    },
    {
      day: "دوشنبه",
      sessions: [
        { time: "۰۷:۰۰ - ۰۹:۰۰", type: "تمرین صبحگاهی", students: 6, status: "رزرو شده" },
        { time: "۱۸:۰۰ - ۲۰:۰۰", type: "کلاس بدنسازی", students: 10, status: "رزرو شده" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "تکمیل": return "bg-emerald-500";
      case "در حال برگزاری": return "bg-blue-500";
      case "رزرو شده": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          برنامه کاری هفتگی
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          مدیریت زمان‌بندی و جلسات تمرینی
        </p>
      </motion.div>

      {/* آمار کلی هفته */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{toPersianNumbers("18")}</div>
              <div className="text-sm opacity-90">جلسه این هفته</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{toPersianNumbers("48")}</div>
              <div className="text-sm opacity-90">شاگرد فعال</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{toPersianNumbers("36")}</div>
              <div className="text-sm opacity-90">ساعت تمرین</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* برنامه روزانه */}
      <div className="space-y-6">
        {schedule.map((day, dayIndex) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: dayIndex * 0.1, duration: 0.5 }}
          >
            <Card className="p-6 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-600" />
                {day.day}
              </h4>
              
              <div className="space-y-3">
                {day.sessions.map((session, sessionIndex) => (
                  <div
                    key={sessionIndex}
                    className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {session.time}
                        </div>
                        <Badge className={`${getStatusColor(session.status)} text-white border-none mt-1`}>
                          {session.status}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {session.type}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {toPersianNumbers(session.students.toString())} نفر
                        </div>
                      </div>
                    </div>
                    
                    {session.status === "در حال برگزاری" && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">فعال</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

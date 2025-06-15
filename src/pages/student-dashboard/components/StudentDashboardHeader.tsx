
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { usePersianDate } from "@/hooks/usePersianDate";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const StudentDashboardHeader: React.FC = () => {
  const currentTime = useCurrentTime();
  const persianDate = usePersianDate();

  // بارگذاری اطلاعات شاگرد
  const [studentData, setStudentData] = React.useState<any>({
    name: "شاگرد عزیز",
    profileImage: "/Assets/Images/Place-Holder.svg",
    phone: "",
    gymName: "باشگاه ورزشی"
  });

  React.useEffect(() => {
    try {
      const loggedInStudentId = localStorage.getItem("loggedInStudentId");
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      const trainerProfile = JSON.parse(localStorage.getItem("trainerProfile") || "{}");
      
      if (loggedInStudentId && students.length > 0) {
        const student = students.find((s: any) => s.id === loggedInStudentId);
        if (student) {
          setStudentData({
            name: student.name || "شاگرد عزیز",
            profileImage: student.profileImage || "/Assets/Images/Place-Holder.svg",
            phone: student.phone || "",
            gymName: trainerProfile.gymName || "باشگاه ورزشی"
          });
        }
      }
    } catch (error) {
      console.error('خطا در بارگذاری اطلاعات شاگرد:', error);
    }
  }, []);

  const getGreetingMessage = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "صبح بخیر";
    if (hour < 17) return "ظهر بخیر";
    return "عصر بخیر";
  };

  const formatTime = (date: Date) => {
    return toPersianNumbers(date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gradient-to-br from-emerald-50 via-sky-50 to-emerald-100 dark:from-emerald-950/20 dark:via-sky-950/10 dark:to-emerald-950/30 border-emerald-200/50 dark:border-emerald-800/30 shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between">
            {/* بخش چپ - اطلاعات شاگرد */}
            <div className="flex items-center gap-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="w-16 h-16 border-3 border-white shadow-lg">
                  <AvatarImage 
                    src={studentData.profileImage} 
                    alt={studentData.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white text-lg font-bold">
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </motion.div>

              <div className="space-y-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {getGreetingMessage()} {studentData.name}! 👋
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    خوش آمدید به پنل شخصی خود
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1">
                    <User className="w-3 h-3 ml-1" />
                    دانش‌آموز
                  </Badge>
                  
                  {studentData.gymName && (
                    <Badge variant="outline" className="border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-300 px-3 py-1">
                      <MapPin className="w-3 h-3 ml-1" />
                      {studentData.gymName}
                    </Badge>
                  )}

                  {studentData.phone && (
                    <Badge variant="outline" className="border-sky-300 text-sky-700 dark:border-sky-600 dark:text-sky-300 px-3 py-1">
                      <Phone className="w-3 h-3 ml-1" />
                      {toPersianNumbers(studentData.phone)}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* بخش راست - تاریخ و زمان */}
            <motion.div 
              className="text-left space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 justify-end">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {persianDate || 'در حال بارگذاری...'}
                </span>
                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              
              <div className="flex items-center gap-3 justify-end">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatTime(currentTime)}
                </span>
                <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

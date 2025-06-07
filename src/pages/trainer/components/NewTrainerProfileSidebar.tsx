
import { motion } from "framer-motion";
import { Camera, Edit3, Users, Trophy, Star, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface NewTrainerProfileSidebarProps {
  profileData: any;
}

export const NewTrainerProfileSidebar = ({ profileData }: NewTrainerProfileSidebarProps) => {
  const deviceInfo = useDeviceInfo();

  const stats = [
    { 
      icon: Users, 
      label: "تعداد شاگردان", 
      value: toPersianNumbers(profileData.achievements.totalStudents.toString()),
      gradient: "from-emerald-500 to-teal-600"
    },
    { 
      icon: Trophy, 
      label: "برنامه موفق", 
      value: toPersianNumbers(profileData.achievements.successfulPrograms.toString()),
      gradient: "from-sky-500 to-blue-600"
    },
    { 
      icon: Star, 
      label: "رضایت شاگردان", 
      value: `${toPersianNumbers(profileData.achievements.satisfaction.toString())}%`,
      gradient: "from-purple-500 to-pink-600"
    },
    { 
      icon: Calendar, 
      label: "سال تجربه", 
      value: toPersianNumbers(profileData.achievements.yearsExperience.toString()),
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: deviceInfo.isMobile ? 0 : -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      {/* کارت پروفایل اصلی */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-xl">
        {/* پس‌زمینه دکوراتیو */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5" />
        <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-sky-500/10 rounded-full blur-3xl" />
        
        <div className="relative p-6 space-y-6">
          {/* تصویر پروفایل */}
          <div className="flex flex-col items-center space-y-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img 
                    src={profileData.personalInfo.profileImage} 
                    alt="پروفایل مربی"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/Assets/Image/Place-Holder.svg";
                    }}
                  />
                </div>
              </div>
              
              {/* دکمه ویرایش تصویر */}
              <motion.button
                className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-full flex items-center justify-center shadow-lg text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* نام و نشان */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {profileData.personalInfo.fullName}
              </h3>
              <Badge className="bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none">
                {profileData.personalInfo.displayName}
              </Badge>
            </div>
          </div>

          {/* بیوگرافی کوتاه */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
              {profileData.personalInfo.bio}
            </p>
          </div>

          {/* دکمه ویرایش پروفایل */}
          <Button className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 text-white border-none hover:from-emerald-600 hover:to-sky-700 shadow-lg">
            <Edit3 className="w-4 h-4 ml-2" />
            ویرایش پروفایل
          </Button>
        </div>
      </Card>

      {/* کارت آمار */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-purple-500/5" />
        
        <div className="relative p-6">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
            آمار عملکرد
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-xl text-white shadow-lg`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <stat.icon className="w-6 h-6" />
                  <div className="text-center">
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs opacity-90">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* کارت گواهینامه‌ها */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        
        <div className="relative p-6">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
            گواهینامه‌ها
          </h4>
          
          <div className="space-y-3">
            {profileData.certifications.slice(0, 3).map((cert: any, index: number) => (
              <motion.div
                key={cert.id}
                className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                  {cert.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {cert.issuer} • {cert.date}
                </div>
              </motion.div>
            ))}
            
            {profileData.certifications.length > 3 && (
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                  مشاهده {toPersianNumbers((profileData.certifications.length - 3).toString())} گواهینامه دیگر
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};


import { motion } from "framer-motion";
import { Crown, CheckCircle, Camera, Star, TrendingUp, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernProfileCardProps {
  profileData: any;
  deviceInfo: any;
}

export const ModernProfileCard = ({ profileData, deviceInfo }: ModernProfileCardProps) => {
  const stats = [
    { icon: Users, label: "دانشجو", value: profileData.profile?.statistics?.totalStudents || 0, color: "text-blue-600" },
    { icon: TrendingUp, label: "تجربه", value: `${profileData.profile?.statistics?.yearsExperience || 0} سال`, color: "text-green-600" },
    { icon: Award, label: "موفقیت", value: `${profileData.profile?.statistics?.successRate || 0}%`, color: "text-purple-600" }
  ];

  return (
    <motion.div 
      className="text-center space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* تصویر پروفایل */}
      <motion.div
        className="relative mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="relative group">
          {/* هاله نور */}
          <motion.div 
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 blur-xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* تصویر اصلی */}
          <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto">
            <img 
              src={profileData.profile?.personalInfo?.profileImage || "/Assets/Image/Place-Holder.svg"}
              alt="تصویر پروفایل"
              className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-2xl"
            />
            
            {/* آیکون دوربین */}
            <motion.button
              className="absolute bottom-2 left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* نشان تایید */}
        <motion.div
          className="absolute -bottom-2 -left-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 border-none text-white px-3 py-1">
            <CheckCircle className="h-3 w-3 ml-1" />
            تایید شده
          </Badge>
        </motion.div>
      </motion.div>

      {/* اطلاعات کاربر */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {/* نام و عنوان */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
            {profileData.profile?.personalInfo?.fullName || "نام مربی"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {profileData.profile?.personalInfo?.displayName || "استاد"}
          </p>
        </div>

        {/* نشان‌ها */}
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            <Crown className="h-3 w-3 ml-1" />
            مربی طلایی
          </Badge>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
            <Star className="h-3 w-3 ml-1" />
            حرفه‌ای
          </Badge>
        </div>

        {/* شماره تماس */}
        {profileData.profile?.personalInfo?.phone && (
          <p className="text-sm text-gray-600 dark:text-gray-400" dir="ltr">
            {toPersianNumbers(profileData.profile.personalInfo.phone)}
          </p>
        )}
      </motion.div>

      {/* آمارها */}
      <motion.div
        className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`${stat.color} mb-1`}>
              <stat.icon className="h-5 w-5 mx-auto" />
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {typeof stat.value === 'number' ? toPersianNumbers(stat.value.toString()) : stat.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};


import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Users, 
  Trophy,
  Calendar,
  Edit,
  RotateCcw
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NewTrainerProfileSidebarProps {
  profileData: any;
}

export const NewTrainerProfileSidebar = ({ profileData }: NewTrainerProfileSidebarProps) => {
  // Add safety checks for undefined data
  if (!profileData) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="text-center">در حال بارگذاری...</div>
        </Card>
      </div>
    );
  }

  const { personalInfo = {}, achievements = {}, completionPercentage = 0 } = profileData;

  // نمایش نام یا متن پیش‌فرض
  const displayName = personalInfo?.displayName || personalInfo?.fullName || "نام نمایشی";
  const hasBasicInfo = personalInfo?.fullName || personalInfo?.phone || personalInfo?.email;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      {/* کارت اصلی پروفایل */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5" />
        
        <div className="relative p-6">
          {/* تصویر پروفایل و اطلاعات اصلی */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white/20 shadow-lg">
                <AvatarImage 
                  src={personalInfo?.profileImage} 
                  alt={displayName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-600 text-white text-2xl font-bold">
                  {displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit className="w-4 h-4 text-white" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {displayName}
              </h3>
              
              {personalInfo?.specialization ? (
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {personalInfo.specialization}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-500 text-sm italic">
                  تخصص وارد نشده
                </p>
              )}

              {/* نشان تکمیل پروفایل */}
              <div className="flex items-center justify-center gap-2">
                <div className="text-xs text-gray-500">تکمیل پروفایل:</div>
                <Badge 
                  className={`${
                    completionPercentage >= 80 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                      : completionPercentage >= 50 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                        : 'bg-gradient-to-r from-red-500 to-pink-600'
                  } text-white border-none`}
                >
                  {toPersianNumbers(completionPercentage.toString())}%
                </Badge>
              </div>
            </div>
          </div>

          {/* نوار پیشرفت */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-sky-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* اطلاعات تماس */}
      {hasBasicInfo ? (
        <Card className="p-4 bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-900/60 dark:to-gray-800/60 backdrop-blur border border-white/20">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            اطلاعات تماس
          </h4>
          
          <div className="space-y-2 text-sm">
            {personalInfo?.phone && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone className="w-3 h-3" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo?.email && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Mail className="w-3 h-3" />
                <span className="text-xs break-all">{personalInfo.email}</span>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-2 border-dashed border-orange-300 dark:border-orange-700">
          <div className="text-center space-y-2">
            <User className="w-8 h-8 mx-auto text-orange-500 opacity-50" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              اطلاعات تماس وارد نشده
            </p>
          </div>
        </Card>
      )}

      {/* آمار عملکرد */}
      <Card className="p-4 bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-900/60 dark:to-gray-800/60 backdrop-blur border border-white/20">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-sky-600" />
          آمار عملکرد
        </h4>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <div className="text-lg font-bold text-emerald-600">
              {achievements?.totalStudents ? toPersianNumbers(achievements.totalStudents.toString()) : '۰'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">شاگرد</div>
          </div>
          
          <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {achievements?.satisfaction ? `${toPersianNumbers(achievements.satisfaction.toString())}%` : '۰%'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">رضایت</div>
          </div>
          
          <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              {achievements?.successfulPrograms ? toPersianNumbers(achievements.successfulPrograms.toString()) : '۰'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">برنامه</div>
          </div>
          
          <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              {achievements?.yearsExperience ? toPersianNumbers(achievements.yearsExperience.toString()) : '۰'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">سال تجربه</div>
          </div>
        </div>
      </Card>

      {/* دکمه‌های عملیات */}
      <div className="space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-gray-300 hover:border-gray-400"
          onClick={profileData?.resetProfile}
        >
          <RotateCcw className="w-4 h-4 ml-2" />
          بازنشانی پروفایل
        </Button>
      </div>
    </motion.div>
  );
};

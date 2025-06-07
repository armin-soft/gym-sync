
import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, User, Building, Share2, Award, BarChart3, Clock } from "lucide-react";
import { NewPersonalInfoTab } from "./tabs/NewPersonalInfoTab";
import { NewGymInfoTab } from "./tabs/NewGymInfoTab";
import { NewSocialMediaTab } from "./tabs/NewSocialMediaTab";
import { NewCertificationsTab } from "./tabs/NewCertificationsTab";
import { NewAchievementsTab } from "./tabs/NewAchievementsTab";
import { NewScheduleTab } from "./tabs/NewScheduleTab";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NewTrainerProfileMainFormProps {
  profileData: any;
}

export const NewTrainerProfileMainForm = ({ profileData }: NewTrainerProfileMainFormProps) => {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { 
      id: "personal", 
      label: "اطلاعات شخصی", 
      icon: User, 
      gradient: "from-emerald-500 to-teal-600",
      component: NewPersonalInfoTab
    },
    { 
      id: "gym", 
      label: "اطلاعات باشگاه", 
      icon: Building, 
      gradient: "from-sky-500 to-blue-600",
      component: NewGymInfoTab
    },
    { 
      id: "social", 
      label: "شبکه‌های اجتماعی", 
      icon: Share2, 
      gradient: "from-purple-500 to-pink-600",
      component: NewSocialMediaTab
    },
    { 
      id: "certifications", 
      label: "گواهینامه‌ها", 
      icon: Award, 
      gradient: "from-orange-500 to-red-600",
      component: NewCertificationsTab
    },
    { 
      id: "achievements", 
      label: "دستاورد ها", 
      icon: BarChart3, 
      gradient: "from-indigo-500 to-purple-600",
      component: NewAchievementsTab
    },
    { 
      id: "schedule", 
      label: "برنامه کاری", 
      icon: Clock, 
      gradient: "from-pink-500 to-rose-600",
      component: NewScheduleTab
    }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      {/* هدر فرم */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5" />
        
        <div className="relative p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-right">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                مدیریت پروفایل حرفه‌ای
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                اطلاعات کامل و دقیق خود را وارد کنید
              </p>
            </div>
            
            {/* نشان تکمیل */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {toPersianNumbers(profileData.completionPercentage.toString())}%
                </div>
                <div className="text-xs text-gray-500">تکمیل شده</div>
              </div>
              
              <div className="w-16 h-16 relative">
                <svg className="w-16 h-16 rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#completionGradient)"
                    strokeWidth="3"
                    strokeDasharray={`${profileData.completionPercentage}, 100`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="completionGradient">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* تب‌های اصلی */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-purple-500/5" />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="relative">
          {/* لیست تب‌ها */}
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 p-2">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-sky-600 data-[state=active]:text-white"
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* محتوای تب‌ها */}
          <div className="p-6">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <tab.component profileData={profileData} />
                </motion.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </Card>

      {/* دکمه‌های عملیات */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button 
          variant="outline" 
          size="lg"
          className="border-gray-300 hover:border-gray-400"
        >
          لغو تغییرات
        </Button>
        
        <Button 
          size="lg"
          className="bg-gradient-to-r from-emerald-500 to-sky-600 text-white hover:from-emerald-600 hover:to-sky-700 shadow-lg"
          disabled={profileData.isSaving}
          onClick={profileData.saveProfile}
        >
          {profileData.isSaving ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              در حال ذخیره...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              ذخیره تغییرات
            </div>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};

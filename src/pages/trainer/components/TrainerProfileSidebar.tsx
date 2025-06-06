
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Crown, User, Building, Globe, Camera } from "lucide-react";
import { TrainerProfileImage } from "./TrainerProfileImage";
import { TrainerProfile } from "@/types/trainer";
import { cn } from "@/lib/utils";

interface TrainerProfileSidebarProps {
  profile: TrainerProfile;
  onImageChange: (image: string) => void;
  activeSection: string;
  onTabChange: (section: string) => void;
}

const sections = [
  { 
    id: "personal", 
    label: "اطلاعات شخصی", 
    icon: User, 
    gradient: "from-emerald-500 to-emerald-600",
    description: "مدیریت اطلاعات شخصی"
  },
  { 
    id: "gym", 
    label: "اطلاعات باشگاه", 
    icon: Building, 
    gradient: "from-sky-500 to-sky-600",
    description: "مشخصات باشگاه"
  },
  { 
    id: "social", 
    label: "شبکه‌های اجتماعی", 
    icon: Globe, 
    gradient: "from-slate-500 to-slate-600",
    description: "حضور آنلاین"
  }
];

export const TrainerProfileSidebar: React.FC<TrainerProfileSidebarProps> = ({
  profile,
  onImageChange,
  activeSection,
  onTabChange
}) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* کارت پروفایل */}
      <Card className="border-0 bg-gradient-to-br from-white via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="p-8 text-center space-y-6">
          {/* تصویر پروفایل */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <TrainerProfileImage 
              image={profile.image}
              onImageChange={onImageChange}
            />
          </motion.div>
          
          {/* نشان تاج */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 shadow-xl">
              <Crown className="h-6 w-6 text-white" />
            </div>
          </motion.div>

          {/* اطلاعات نام */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-600 via-sky-600 to-slate-600 bg-clip-text text-transparent">
              {profile.name || "نام مربی"}
            </h3>
            {profile.phone && (
              <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium" dir="ltr">
                {profile.phone}
              </p>
            )}
            
            {/* نشان‌های وضعیت */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="h-3 w-3 ml-1" />
                فعال
              </Badge>
              <Badge className="bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800">
                مربی
              </Badge>
            </div>
          </motion.div>
        </div>
      </Card>

      {/* منوی ناوبری */}
      <Card className="border-0 bg-gradient-to-br from-white via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="p-6">
          <div className="space-y-3">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <Button
                  onClick={() => onTabChange(section.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl text-right transition-all duration-300 relative group h-auto",
                    activeSection === section.id 
                      ? "text-white shadow-xl transform scale-105" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-102 bg-transparent"
                  )}
                  variant="ghost"
                >
                  {activeSection === section.id && (
                    <div className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", section.gradient)} />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-4 w-full">
                    <div className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      activeSection === section.id ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
                    )}>
                      <section.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 text-right">
                      <div className="font-bold text-base">{section.label}</div>
                      <div className={cn(
                        "text-xs mt-0.5",
                        activeSection === section.id ? "text-white/70" : "text-gray-500 dark:text-gray-400"
                      )}>
                        {section.description}
                      </div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

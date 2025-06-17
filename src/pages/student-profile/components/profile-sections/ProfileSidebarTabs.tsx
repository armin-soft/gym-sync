
import React from "react";
import { motion } from "framer-motion";
import { User, Heart, Target, FileText } from "lucide-react";

interface ProfileSidebarTabsProps {
  activeSection: string;
  onTabChange: (section: string) => void;
}

export const ProfileSidebarTabs: React.FC<ProfileSidebarTabsProps> = ({
  activeSection,
  onTabChange
}) => {
  const tabs = [
    {
      id: "personal",
      title: "اطلاعات شخصی",
      icon: User,
      description: "نام، ایمیل، تلفن و آدرس"
    },
    {
      id: "health",
      title: "اطلاعات سلامتی",
      icon: Heart,
      description: "قد، وزن، آلرژی‌ها و شرایط پزشکی"
    },
    {
      id: "goals",
      title: "اهداف و تنظیمات",
      icon: Target,
      description: "هدف تمرینی، سطح آمادگی و زمان‌بندی"
    },
    {
      id: "notes",
      title: "یادداشت‌ها",
      icon: FileText,
      description: "یادداشت‌های شخصی و توضیحات اضافی"
    }
  ];

  return (
    <div className="space-y-3">
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = activeSection === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full text-right p-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-emerald-500 to-sky-600 text-white shadow-lg'
                : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${
                isActive 
                  ? 'bg-white/20' 
                  : 'bg-emerald-100 dark:bg-emerald-900/30'
              }`}>
                <Icon className={`h-5 w-5 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-emerald-600 dark:text-emerald-400'
                }`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{tab.title}</h4>
                <p className={`text-xs ${
                  isActive 
                    ? 'text-white/80' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {tab.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};


import { motion } from "framer-motion";
import { User, Building, Globe, Award, BarChart3, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarTabsProps {
  profileData: any;
  deviceInfo: any;
}

interface TabSection {
  id: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  description: string;
}

const sections: TabSection[] = [
  { 
    id: "personal", 
    label: "اطلاعات شخصی", 
    icon: User, 
    gradient: "from-blue-500 to-indigo-600",
    description: "مشخصات فردی"
  },
  { 
    id: "gym", 
    label: "اطلاعات باشگاه", 
    icon: Building, 
    gradient: "from-emerald-500 to-teal-600",
    description: "جزئیات باشگاه"
  },
  { 
    id: "social", 
    label: "شبکه‌های اجتماعی", 
    icon: Globe, 
    gradient: "from-purple-500 to-pink-600",
    description: "حضور آنلاین"
  },
  { 
    id: "certificates", 
    label: "مدارک و گواهینامه‌ها", 
    icon: Award, 
    gradient: "from-orange-500 to-red-600",
    description: "صلاحیت‌ها"
  },
  { 
    id: "statistics", 
    label: "آمار و گزارشات", 
    icon: BarChart3, 
    gradient: "from-cyan-500 to-blue-600",
    description: "عملکرد کلی"
  }
];

export const ModernSidebarTabs = ({ profileData, deviceInfo }: SidebarTabsProps) => {
  const { activeSection, setActiveSection } = profileData;

  if (deviceInfo.isMobile) {
    return (
      <div className="bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-4">
        <div className="flex overflow-x-auto gap-3 pb-2">
          {sections.map((section, index) => (
            <MobileTab 
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              onClick={() => setActiveSection(section.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sections.map((section, index) => (
        <DesktopTab 
          key={section.id}
          section={section}
          isActive={activeSection === section.id}
          onClick={() => setActiveSection(section.id)}
          index={index}
        />
      ))}
    </div>
  );
};

const MobileTab = ({ section, isActive, onClick, index }: {
  section: TabSection;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) => {
  const Icon = section.icon;
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 relative min-w-[80px]",
        isActive 
          ? "text-white shadow-lg" 
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div 
          className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", section.gradient)}
          layoutId="activeTab"
        />
      )}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className={cn(
          "p-2 rounded-lg",
          isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-xs font-medium text-center leading-tight">
          {section.label}
        </span>
      </div>
    </motion.button>
  );
};

const DesktopTab = ({ section, isActive, onClick, index }: {
  section: TabSection;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) => {
  const Icon = section.icon;

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl text-right transition-all duration-300 relative group",
        isActive 
          ? "text-white shadow-lg transform scale-105" 
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-102"
      )}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      whileHover={{ scale: isActive ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <motion.div 
          className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", section.gradient)}
          layoutId="activeDesktopTab"
        />
      )}
      
      <div className="relative z-10 flex items-center gap-4 w-full">
        <div className={cn(
          "p-2 rounded-lg",
          isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 text-right">
          <div className="font-medium">{section.label}</div>
          <div className={cn(
            "text-xs mt-0.5",
            isActive ? "text-white/70" : "text-gray-500 dark:text-gray-400"
          )}>
            {section.description}
          </div>
        </div>
      </div>
    </motion.button>
  );
};

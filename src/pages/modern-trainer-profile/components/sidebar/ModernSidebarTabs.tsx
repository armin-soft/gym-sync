
import React from "react";
import { motion } from "framer-motion";
import { User, Building, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernSidebarTabsProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobile: boolean;
}

const sections = [
  { 
    id: "personal", 
    label: "اطلاعات شخصی", 
    icon: User, 
    gradient: "from-emerald-600 to-emerald-700",
    description: "مدیریت اطلاعات شخصی"
  },
  { 
    id: "gym", 
    label: "باشگاه", 
    icon: Building, 
    gradient: "from-sky-600 to-sky-700",
    description: "اطلاعات باشگاه"
  },
  { 
    id: "social", 
    label: "شبکه‌های اجتماعی", 
    icon: Globe, 
    gradient: "from-emerald-500 to-sky-600",
    description: "حضور آنلاین"
  }
];

export const ModernSidebarTabs = ({ activeSection, onSectionChange, isMobile }: ModernSidebarTabsProps) => {
  return (
    <div className={cn(
      "space-y-3",
      isMobile && "flex overflow-x-auto gap-3 space-y-0"
    )}>
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        const Icon = section.icon;
        
        return (
          <motion.button
            key={section.id}
            className={cn(
              "w-full p-4 rounded-2xl text-right transition-all duration-300 relative overflow-hidden",
              isMobile && "min-w-[280px] flex-shrink-0",
              isActive 
                ? `bg-gradient-to-l ${section.gradient} text-white shadow-xl`
                : "bg-slate-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
            )}
            onClick={() => onSectionChange(section.id)}
            initial={{ opacity: 0, x: isMobile ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* پس‌زمینه متحرک */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-white/10"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <div className="relative z-10 flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-xl",
                isActive 
                  ? "bg-white/20" 
                  : "bg-slate-200/50 dark:bg-slate-700/50"
              )}>
                <Icon className={cn(
                  "h-6 w-6",
                  isActive ? "text-white" : "text-slate-600 dark:text-slate-400"
                )} />
              </div>
              <div className="text-right">
                <h4 className={cn(
                  "font-bold text-base",
                  isActive ? "text-white" : "text-slate-800 dark:text-slate-200"
                )}>
                  {section.label}
                </h4>
                {!isMobile && (
                  <p className={cn(
                    "text-sm mt-1",
                    isActive ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                  )}>
                    {section.description}
                  </p>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

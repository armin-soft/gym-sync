
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Dumbbell, Utensils, Pill } from "lucide-react";

interface ProgramTabsHeaderProps {
  activeTab: string;
}

const ProgramTabsHeader: React.FC<ProgramTabsHeaderProps> = ({ activeTab }) => {
  const tabs = [
    {
      value: "exercise",
      label: "تمرینات",
      icon: Dumbbell,
      gradient: "from-emerald-500 to-sky-600",
      bgGradient: "from-emerald-50 to-sky-50",
      darkBgGradient: "from-emerald-900/20 to-sky-900/20"
    },
    {
      value: "diet", 
      label: "رژیم غذایی",
      icon: Utensils,
      gradient: "from-sky-500 to-emerald-600",
      bgGradient: "from-sky-50 to-emerald-50",
      darkBgGradient: "from-sky-900/20 to-emerald-900/20"
    },
    {
      value: "supplement",
      label: "مکمل و ویتامین",
      icon: Pill,
      gradient: "from-orange-500 to-emerald-600",
      bgGradient: "from-orange-50 to-emerald-50",
      darkBgGradient: "from-orange-900/20 to-emerald-900/20"
    }
  ];

  return (
    <div className="p-6" dir="rtl">
      <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-emerald-100/80 to-sky-100/80 dark:from-emerald-800/50 dark:to-sky-800/50 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-600/50 h-auto p-2 rounded-2xl shadow-custom-medium">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;
          
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative h-16 rounded-xl border-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-current transition-all duration-300 group"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tab.bgGradient} dark:bg-gradient-to-r dark:${tab.darkBgGradient} shadow-custom-medium border border-white/50 dark:border-emerald-600/50`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-2 px-4">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-custom-soft` 
                    : 'bg-emerald-200 dark:bg-emerald-600 text-emerald-700 dark:text-emerald-300 group-hover:bg-emerald-300 dark:group-hover:bg-emerald-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <span className={`text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-emerald-800 dark:text-emerald-100' 
                    : 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-200'
                }`}>
                  {tab.label}
                </span>
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
};

export default ProgramTabsHeader;

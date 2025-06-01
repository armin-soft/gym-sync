
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users, User } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernGenderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  totalCount: number;
  maleCount: number;
  femaleCount: number;
}

export const ModernGenderTabs: React.FC<ModernGenderTabsProps> = ({
  activeTab,
  onTabChange,
  totalCount,
  maleCount,
  femaleCount
}) => {
  const tabs = [
    { 
      id: "all", 
      label: "همه شاگردان", 
      count: totalCount, 
      icon: <Users className="h-4 w-4" />,
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20"
    },
    { 
      id: "male", 
      label: "آقایان", 
      count: maleCount, 
      icon: <User className="h-4 w-4" />,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    { 
      id: "female", 
      label: "بانوان", 
      count: femaleCount, 
      icon: <User className="h-4 w-4" />,
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange(tab.id)}
            className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 border-2 ${
              activeTab === tab.id
                ? `bg-gradient-to-bl ${tab.bgGradient} border-transparent shadow-lg`
                : "bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600"
            }`}
          >
            {/* Background Gradient for Active Tab */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabBg"
                className={`absolute inset-0 bg-gradient-to-bl ${tab.bgGradient} opacity-90`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Content */}
            <div className="relative flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                activeTab === tab.id 
                  ? `bg-gradient-to-bl ${tab.gradient} text-white shadow-md`
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}>
                {tab.icon}
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  activeTab === tab.id 
                    ? "text-gray-900 dark:text-gray-100" 
                    : "text-gray-700 dark:text-gray-300"
                }`}>
                  {tab.label}
                </p>
                <Badge 
                  variant="secondary"
                  className={`mt-1 ${
                    activeTab === tab.id
                      ? "bg-white/80 text-gray-800 dark:bg-slate-800/80 dark:text-gray-200"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {toPersianNumbers(tab.count)} نفر
                </Badge>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

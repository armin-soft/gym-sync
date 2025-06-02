
import React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertTriangle, Info, Trash2 } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount: number;
}

const tabs = [
  {
    id: "all",
    label: "همه",
    icon: Bell,
    gradient: "from-slate-600 to-slate-700"
  },
  {
    id: "unread",
    label: "خوانده‌نشده",
    icon: AlertTriangle,
    gradient: "from-amber-600 to-orange-600"
  },
  {
    id: "read",
    label: "خوانده‌شده",
    icon: CheckCircle,
    gradient: "from-green-600 to-emerald-600"
  },
  {
    id: "system",
    label: "سیستم",
    icon: Info,
    gradient: "from-blue-600 to-sky-600"
  }
];

export const NotificationTabs = ({ activeTab, onTabChange, unreadCount }: NotificationTabsProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 p-4 bg-white/10 dark:bg-slate-800/10 backdrop-blur-xl rounded-2xl border border-slate-200/30 dark:border-slate-700/30">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base
                transition-all duration-300 transform hover:scale-105
                ${isActive 
                  ? `bg-gradient-to-l ${tab.gradient} text-white shadow-xl` 
                  : 'bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white/70 dark:hover:bg-slate-700/70'
                }
              `}
            >
              <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{tab.label}</span>
              
              {/* نشان تعداد برای تب خوانده‌نشده */}
              {tab.id === "unread" && unreadCount > 0 && (
                <motion.div
                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {toPersianNumbers(unreadCount > 99 ? 99 : unreadCount)}
                </motion.div>
              )}
              
              {/* افکت نور برای تب فعال */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(16, 185, 129, 0.2)",
                      "0 0 30px rgba(16, 185, 129, 0.4)",
                      "0 0 0 rgba(16, 185, 129, 0.2)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

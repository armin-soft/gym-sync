
import React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface EmptyNotificationStateProps {
  activeTab: string;
}

const emptyStateConfig = {
  all: {
    icon: Bell,
    title: "هنوز اعلانی وجود ندارد",
    description: "زمانی که اعلان جدیدی دریافت کنید، در اینجا نمایش داده خواهد شد",
    gradient: "from-slate-600 to-slate-700"
  },
  unread: {
    icon: AlertTriangle,
    title: "اعلان خوانده‌نشده‌ای وجود ندارد",
    description: "تمامی اعلانات شما خوانده شده‌اند",
    gradient: "from-amber-600 to-orange-600"
  },
  read: {
    icon: CheckCircle,
    title: "اعلان خوانده‌شده‌ای وجود ندارد",
    description: "هنوز اعلانی را نخوانده‌اید",
    gradient: "from-green-600 to-emerald-600"
  },
  system: {
    icon: Info,
    title: "اعلان سیستمی وجود ندارد",
    description: "هیچ اعلان سیستمی جدیدی دریافت نکرده‌اید",
    gradient: "from-blue-600 to-sky-600"
  }
};

export const EmptyNotificationState = ({ activeTab }: EmptyNotificationStateProps) => {
  const config = emptyStateConfig[activeTab as keyof typeof emptyStateConfig] || emptyStateConfig.all;
  const Icon = config.icon;

  return (
    <motion.div
      key={`empty-${activeTab}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-16 sm:py-24"
    >
      {/* آیکون */}
      <motion.div
        className={`w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${config.gradient} rounded-3xl flex items-center justify-center shadow-2xl mb-8`}
        animate={{
          y: [0, -10, 0],
          rotateY: [0, 10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
      </motion.div>

      {/* متن */}
      <motion.div
        className="text-center space-y-4 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
          {config.title}
        </h3>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {config.description}
        </p>
      </motion.div>

      {/* نقاط تزئینی */}
      <div className="flex justify-center gap-2 mt-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r ${config.gradient} rounded-full`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

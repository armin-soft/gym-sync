
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Clock, AlertTriangle, Calendar } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Message } from "../types";

interface SupportStatsProps {
  messages: Message[];
}

export const SupportStats: React.FC<SupportStatsProps> = ({ messages }) => {
  const deviceInfo = useDeviceInfo();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = {
    total: messages.length,
    unread: messages.filter(msg => !msg.isRead).length,
    today: messages.filter(msg => {
      const msgDate = new Date(msg.createdAt);
      msgDate.setHours(0, 0, 0, 0);
      return msgDate.getTime() === today.getTime();
    }).length,
    urgent: messages.filter(msg => msg.priority === 'urgent').length
  };

  const statsData = [
    {
      title: "کل پیام‌ها",
      value: stats.total,
      icon: MessageCircle,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    {
      title: "خوانده نشده",
      value: stats.unread,
      icon: Clock,
      gradient: "from-sky-500 to-sky-600",
      bgGradient: "from-sky-50 to-sky-100"
    },
    {
      title: "امروز",
      value: stats.today,
      icon: Calendar,
      gradient: "from-emerald-600 to-sky-500",
      bgGradient: "from-emerald-50/50 to-sky-50/50"
    },
    {
      title: "فوری",
      value: stats.urgent,
      icon: AlertTriangle,
      gradient: "from-red-500 to-orange-500",
      bgGradient: "from-red-50 to-orange-50"
    }
  ];

  const getGridCols = () => {
    if (deviceInfo.isMobile) return "grid-cols-2";
    if (deviceInfo.isTablet) return "grid-cols-2";
    return "grid-cols-4";
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-6";
    return "p-6";
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        delay: index * 0.1
      }
    })
  };

  return (
    <div className={cn("grid gap-4", getGridCols())} dir="rtl">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              scale: 1.02,
              y: -2,
              transition: { type: "spring", stiffness: 400 }
            }}
            className={cn(
              "relative rounded-xl overflow-hidden shadow-lg border border-white/20 backdrop-blur-sm",
              `bg-gradient-to-br ${stat.bgGradient}`,
              getCardPadding()
            )}
          >
            {/* گرادیان انیمیشن */}
            <motion.div
              className={cn(
                "absolute inset-0 bg-gradient-to-r opacity-10",
                stat.gradient
              )}
              animate={{ 
                x: ['-100%', '200%'] 
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
            />

            <div className="relative z-10 text-right">
              <div className="flex items-center justify-between mb-3">
                <div className={cn(
                  "rounded-lg flex items-center justify-center bg-gradient-to-br shadow-md",
                  stat.gradient,
                  deviceInfo.isMobile ? "w-10 h-10" : "w-12 h-12"
                )}>
                  <Icon className={cn(
                    "text-white",
                    deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6"
                  )} />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className={cn(
                  "text-gray-600 font-medium",
                  deviceInfo.isMobile ? "text-xs" : "text-sm"
                )}>
                  {stat.title}
                </p>
                <p className={cn(
                  "font-black text-gray-800",
                  deviceInfo.isMobile ? "text-xl" : deviceInfo.isTablet ? "text-2xl" : "text-3xl"
                )}>
                  {stat.value.toLocaleString('fa-IR')}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

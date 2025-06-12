
import React from "react";
import { MessageSquare, MessageCircle, CheckCircle, Clock } from "lucide-react";
import { SupportMessage } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SupportStatsProps {
  messages: SupportMessage[];
}

export function SupportStats({ messages }: SupportStatsProps) {
  const deviceInfo = useDeviceInfo();
  
  const today = new Date().setHours(0, 0, 0, 0);
  
  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === "unread").length,
    replied: messages.filter(m => m.status === "replied").length,
    today: messages.filter(m => new Date(m.timestamp).setHours(0, 0, 0, 0) === today).length
  };

  const getGridClasses = () => {
    if (deviceInfo.isMobile) return "grid-cols-2 gap-3";
    if (deviceInfo.isTablet) return "grid-cols-2 gap-4";
    return "grid-cols-4 gap-4";
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-3";
    if (deviceInfo.isTablet) return "p-4";
    return "p-5";
  };

  const convertToFarsiNumbers = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };

  const statsData = [
    {
      title: "کل پیام‌ها",
      value: stats.total,
      icon: MessageSquare,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600"
    },
    {
      title: "پیام‌های جدید",
      value: stats.unread,
      icon: MessageCircle,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "پاسخ داده شده",
      value: stats.replied,
      icon: CheckCircle,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600"
    },
    {
      title: "پیام‌های امروز",
      value: stats.today,
      icon: Clock,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    }
  ];

  return (
    <div className={cn("grid", getGridClasses())}>
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105",
              getCardPadding()
            )}
            dir="rtl"
          >
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className={cn(
                  "text-gray-600 font-medium mb-1",
                  deviceInfo.isMobile ? "text-xs" : "text-sm"
                )}>
                  {stat.title}
                </p>
                <p className={cn(
                  "font-black",
                  stat.textColor,
                  deviceInfo.isMobile ? "text-lg" : deviceInfo.isTablet ? "text-xl" : "text-2xl"
                )}>
                  {convertToFarsiNumbers(stat.value)}
                </p>
              </div>
              
              <div className={cn(
                "rounded-xl flex items-center justify-center",
                stat.bgColor,
                deviceInfo.isMobile ? "w-8 h-8" : deviceInfo.isTablet ? "w-10 h-10" : "w-12 h-12"
              )}>
                <Icon className={cn(
                  stat.textColor,
                  deviceInfo.isMobile ? "w-4 h-4" : deviceInfo.isTablet ? "w-5 h-5" : "w-6 h-6"
                )} />
              </div>
            </div>
            
            <div className={cn(
              "absolute bottom-0 left-0 h-1 bg-gradient-to-r",
              stat.color
            )}></div>
          </div>
        );
      })}
    </div>
  );
}

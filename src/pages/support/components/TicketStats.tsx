import React from "react";
import { Ticket, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import type { TicketStats as TicketStatsType } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface TicketStatsProps {
  stats: TicketStatsType;
}

export function TicketStats({ stats }: TicketStatsProps) {
  const deviceInfo = useDeviceInfo();
  
  const convertToFarsiNumbers = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };

  const getGridClasses = () => {
    if (deviceInfo.isMobile) return "grid-cols-2 gap-3";
    if (deviceInfo.isTablet) return "grid-cols-3 gap-4";
    return "grid-cols-6 gap-4";
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-3";
    if (deviceInfo.isTablet) return "p-4";
    return "p-4";
  };

  const statsData = [
    {
      title: "کل تیکت‌ها",
      value: stats.totalTickets,
      icon: Ticket,
      color: "from-emerald-500 to-sky-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      title: "تیکت‌های باز",
      value: stats.openTickets,
      icon: AlertTriangle,
      color: "from-red-500 to-orange-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600"
    },
    {
      title: "در حال بررسی",
      value: stats.inProgressTickets,
      icon: Clock,
      color: "from-blue-500 to-sky-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "حل شده",
      value: stats.resolvedTickets,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "تیکت‌های امروز",
      value: stats.todayTickets,
      icon: TrendingUp,
      color: "from-sky-500 to-emerald-600",
      bgColor: "bg-sky-50",
      textColor: "text-sky-600"
    },
    {
      title: "میانگین پاسخ (ساعت)",
      value: stats.averageResponseTime,
      icon: Clock,
      color: "from-emerald-500 to-sky-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
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
                deviceInfo.isMobile ? "w-10 h-10" : "w-12 h-12"
              )}>
                <Icon className={cn(
                  stat.textColor,
                  deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6"
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


import React from "react";
import { Search, Filter, MessageSquare, MessageCircle, CheckCircle } from "lucide-react";
import { MessageFilter, SupportMessage } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MessagesFiltersProps {
  filter: MessageFilter;
  onFilterChange: (filter: MessageFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  messages: SupportMessage[];
}

export function MessagesFilters({ 
  filter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  messages 
}: MessagesFiltersProps) {
  const deviceInfo = useDeviceInfo();
  
  const convertToFarsiNumbers = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };

  const filters = [
    {
      key: "all" as MessageFilter,
      label: "همه پیام‌ها",
      icon: MessageSquare,
      count: messages.length,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      activeColor: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      key: "unread" as MessageFilter,
      label: "خوانده نشده",
      icon: MessageCircle,
      count: messages.filter(m => m.status === "unread").length,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      activeColor: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      key: "read" as MessageFilter,
      label: "خوانده شده",
      icon: MessageSquare,
      count: messages.filter(m => m.status === "read").length,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      activeColor: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      key: "replied" as MessageFilter,
      label: "پاسخ داده شده",
      icon: CheckCircle,
      count: messages.filter(m => m.status === "replied").length,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      activeColor: "bg-indigo-50 text-indigo-600 border-indigo-200"
    }
  ];

  return (
    <div className="space-y-4">
      {/* جستجو */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="relative" dir="rtl">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="جستجو در پیام‌ها..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
            dir="rtl"
          />
        </div>
      </div>

      {/* فیلترها */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4" dir="rtl">
          <Filter className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-800">فیلتر پیام‌ها</h3>
        </div>
        
        <div className="space-y-2">
          {filters.map((filterOption) => {
            const Icon = filterOption.icon;
            const isActive = filter === filterOption.key;
            
            return (
              <button
                key={filterOption.key}
                onClick={() => onFilterChange(filterOption.key)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:scale-105",
                  isActive 
                    ? filterOption.activeColor + " border-current shadow-sm"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600"
                )}
                dir="rtl"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span className={cn(
                    "font-medium",
                    deviceInfo.isMobile ? "text-sm" : "text-base"
                  )}>
                    {filterOption.label}
                  </span>
                </div>
                
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-bold",
                  isActive 
                    ? "bg-current bg-opacity-20"
                    : "bg-gray-200 text-gray-600"
                )}>
                  {convertToFarsiNumbers(filterOption.count)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

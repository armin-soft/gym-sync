
import React from "react";
import { MessageSquare, Search } from "lucide-react";
import { MessageFilter } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  filter: MessageFilter;
  searchQuery: string;
}

export function EmptyState({ filter, searchQuery }: EmptyStateProps) {
  const deviceInfo = useDeviceInfo();
  
  const getFilterLabel = (filter: MessageFilter): string => {
    switch (filter) {
      case "unread": return "خوانده نشده";
      case "read": return "خوانده شده";
      case "replied": return "پاسخ داده شده";
      default: return "";
    }
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-6";
    if (deviceInfo.isTablet) return "p-8";
    return "p-12";
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-16 h-16";
    if (deviceInfo.isTablet) return "w-20 h-20";
    return "w-24 h-24";
  };

  const isSearching = searchQuery.length > 0;
  const hasFilter = filter !== "all";

  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 shadow-sm text-center",
      getCardPadding()
    )} dir="rtl">
      <div className="flex flex-col items-center">
        <div className={cn(
          "rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mb-6",
          getIconSize()
        )}>
          {isSearching ? (
            <Search className={cn(
              "text-violet-600",
              deviceInfo.isMobile ? "w-8 h-8" : deviceInfo.isTablet ? "w-10 h-10" : "w-12 h-12"
            )} />
          ) : (
            <MessageSquare className={cn(
              "text-violet-600",
              deviceInfo.isMobile ? "w-8 h-8" : deviceInfo.isTablet ? "w-10 h-10" : "w-12 h-12"
            )} />
          )}
        </div>
        
        <h3 className={cn(
          "font-bold text-gray-800 mb-2",
          deviceInfo.isMobile ? "text-lg" : deviceInfo.isTablet ? "text-xl" : "text-2xl"
        )}>
          {isSearching ? "نتیجه‌ای یافت نشد" : 
           hasFilter ? `هیچ پیام ${getFilterLabel(filter)}ای وجود ندارد` : 
           "هیچ پیامی وجود ندارد"}
        </h3>
        
        <p className={cn(
          "text-gray-600 leading-relaxed max-w-md",
          deviceInfo.isMobile ? "text-sm" : "text-base"
        )}>
          {isSearching ? 
            `برای جستجوی "${searchQuery}" هیچ نتیجه‌ای پیدا نشد. لطفاً کلمات کلیدی دیگری امتحان کنید.` :
           hasFilter ? 
            `در حال حاضر هیچ پیام ${getFilterLabel(filter)}ای در سیستم موجود نیست.` :
            "هنوز هیچ پیامی از شاگردان دریافت نکرده‌اید. به محض ارسال پیام توسط شاگردان، در اینجا نمایش داده خواهد شد."
          }
        </p>
        
        {!isSearching && !hasFilter && (
          <div className="mt-6 p-4 bg-violet-50 rounded-lg border border-violet-200">
            <p className="text-violet-700 text-sm font-medium">
              💡 شاگردان می‌توانند از پنل شخصی خود پیام ارسال کنند
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Dumbbell,
  Apple,
  Pill,
  Calendar,
  Trophy,
  Target,
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";
import { StudentSidebarProfile } from "./StudentSidebarProfile";
import { StudentSidebarMenuList } from "./StudentSidebarMenuList";
import { StudentSidebarFooter } from "./StudentSidebarFooter";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Student } from "@/components/students/StudentTypes";

interface StudentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  onLogout: () => void;
}

const studentSidebarItems = [
  {
    title: "پروفایل من",
    description: "مشاهده اطلاعات شخصی",
    href: "/panel/profile",
    icon: User,
  },
  {
    title: "برنامه تمرینی",
    description: "مشاهده تمرینات روزانه",
    href: "/panel/exercises",
    icon: Dumbbell,
  },
  {
    title: "برنامه غذایی",
    description: "رژیم غذایی شخصی",
    href: "/panel/diet",
    icon: Apple,
  },
  {
    title: "مکمل‌ها و ویتامین‌ها",
    description: "مکمل‌های تعیین شده",
    href: "/panel/supplements",
    icon: Pill,
  },
  {
    title: "تقویم تمرین",
    description: "برنامه هفتگی و ماهانه",
    href: "/panel/calendar",
    icon: Calendar,
  },
  {
    title: "پیشرفت من",
    description: "آمار و گزارشات",
    href: "/panel/progress",
    icon: Trophy,
  },
  {
    title: "اهداف",
    description: "تعیین و پیگیری اهداف",
    href: "/panel/goals",
    icon: Target,
  },
];

export function StudentSidebar({ isOpen, onClose, student, onLogout }: StudentSidebarProps) {
  const deviceInfo = useDeviceInfo();
  
  // تنظیم عرض منو بر اساس نوع دستگاه
  const getSidebarWidth = () => {
    if (deviceInfo.isMobile) return "w-[280px]";
    if (deviceInfo.isTablet) return "w-[320px]";
    if (deviceInfo.isSmallLaptop) return "w-[350px]";
    return "w-[380px]";
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className={cn(
          getSidebarWidth(),
          "p-0 border-l shadow-2xl bg-gradient-to-b from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50 backdrop-blur-lg"
        )}
        dir="rtl"
      >
        <div className="flex h-full flex-col overflow-hidden" dir="rtl">
          <div dir="rtl">
            <StudentSidebarProfile 
              student={student}
              onClose={onClose}
            />
          </div>
          
          <div className="px-4 py-3 border-b bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm" dir="rtl">
            <h4 className={cn(
              "text-sm font-medium text-center text-violet-700 dark:text-violet-300",
              deviceInfo.isMobile ? "text-xs" : 
              deviceInfo.isTablet ? "text-sm" : "text-base"
            )}>
              پنل شخصی شاگرد
            </h4>
          </div>
          
          <ScrollArea className="flex-1" dir="rtl">
            <div dir="rtl">
              <StudentSidebarMenuList items={studentSidebarItems} onClose={onClose} />
            </div>
          </ScrollArea>
          
          <div dir="rtl" className="border-t bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm">
            <button
              onClick={onLogout}
              className="w-full p-4 flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">خروج از حساب</span>
            </button>
          </div>
          
          <div dir="rtl">
            <StudentSidebarFooter />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

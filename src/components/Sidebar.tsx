
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  Dumbbell,
  Apple,
  Pill,
  Save,
  LayoutDashboard,
  UserRound
} from "lucide-react";
import { useState, useEffect } from "react";
import { SidebarProfile } from "./sidebar/SidebarProfile";
import { SidebarMenuList } from "./sidebar/SidebarMenuList";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  {
    title: "داشبورد",
    description: "نمای کلی و آمار",
    href: "/Management",
    icon: LayoutDashboard,
  },
  {
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی",
    href: "/Management/Coach-Profile",
    icon: UserRound,
  },
  {
    title: "شاگردان",
    description: "مدیریت شاگردان",
    href: "/Management/Students",
    icon: Users,
  },
  {
    title: "حرکات تمرینی",
    description: "مدیریت تمرینات",
    href: "/Management/Exercise-Movements",
    icon: Dumbbell,
  },
  {
    title: "برنامه‌های غذایی",
    description: "مدیریت رژیم غذایی",
    href: "/Management/Diet-Plan",
    icon: Apple,
  },
  {
    title: "مکمل و ویتامین",
    description: "مدیریت مکمل‌ها",
    href: "/Management/Supplements-Vitamins",
    icon: Pill,
  },
  {
    title: "پشتیبان‌گیری و بازیابی",
    description: "مدیریت داده‌ها",
    href: "/Management/Backup-Restore",
    icon: Save,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const deviceInfo = useDeviceInfo();
  const [gymName, setGymName] = useState("");
  
  useEffect(() => {
    const savedGymName = localStorage.getItem("gym_name") || "";
    setGymName(savedGymName);
  }, []);
  
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
          "p-0 border-l shadow-2xl bg-gradient-to-b from-background/95 to-background/98 backdrop-blur-xl"
        )}
        dir="rtl"
      >
        <div className="flex h-full flex-col overflow-hidden" dir="rtl">
          <div dir="rtl">
            <SidebarProfile
              name="مدیر سیستم"
              email="admin@gym.com"
              image="/Assets/Image/Place-Holder.svg"
              onClose={onClose}
            />
          </div>
          
          <div className="px-4 py-3 border-b bg-muted/30" dir="rtl">
            <h4 className={cn(
              "text-sm font-medium text-center",
              deviceInfo.isMobile ? "text-xs" : 
              deviceInfo.isTablet ? "text-sm" : "text-base"
            )}>
              پنل مدیریت مربی
            </h4>
          </div>
          
          <ScrollArea className="flex-1" dir="rtl">
            <div dir="rtl">
              <SidebarMenuList items={sidebarItems} onClose={onClose} />
            </div>
          </ScrollArea>
          
          <div dir="rtl">
            <SidebarFooter gymName={gymName} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

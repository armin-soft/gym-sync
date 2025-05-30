import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  User2,
  Users,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  Database,
  Menu
} from "lucide-react";
import { useEffect, useState } from "react";
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
    description: "نمای کلی باشگاه و آمار",
    href: "/Management",
    icon: LayoutDashboard,
  },
  {
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی",
    href: "/Management/Coach-Profile",
    icon: User2,
  },
  {
    title: "شاگردان",
    description: "مدیریت ورزشکاران",
    href: "/Management/Students",
    icon: Users,
  },
  {
    title: "حرکات تمرینی",
    description: "مدیریت حرکات و تمرینات",
    href: "/Management/Exercise-Movements",
    icon: Dumbbell,
  },
  {
    title: "برنامه های غذایی",
    description: "مدیریت رژیم غذایی",
    href: "/Management/Diet-Plan",
    icon: UtensilsCrossed,
  },
  {
    title: "مکمل و ویتامین",
    description: "مدیریت مکمل‌های ورزشی",
    href: "/Management/Supplements-Vitamins",
    icon: Pill,
  },
  {
    title: "پشتیبان‌گیری و بازیابی",
    description: "مدیریت داده‌ها",
    href: "/Management/Backup-Restore",
    icon: Database,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [gymName, setGymName] = useState("");
  const [trainerProfile, setTrainerProfile] = useState({
    name: "مربی",
    image: "",
    email: ""
  });
  const deviceInfo = useDeviceInfo();
  
  const loadProfile = () => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setTrainerProfile({
          name: profile.name || "مربی",
          image: profile.image || "",
          email: profile.email || ""
        });
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      } catch (error) {
        console.error('Error loading profile from localStorage:', error);
      }
    }
  };
  
  useEffect(() => {
    loadProfile();
    
    const handleStorageChange = () => {
      loadProfile();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
          "p-0 border-l shadow-2xl bg-white dark:bg-card/90 backdrop-blur-lg"
        )}
        dir="rtl"
      >
        <div className="flex h-full flex-col overflow-hidden" dir="rtl">
          <div dir="rtl">
            <SidebarProfile 
              name={trainerProfile.name}
              email={trainerProfile.email}
              image={trainerProfile.image}
              onClose={onClose}
            />
          </div>
          
          <div className="px-4 py-3 border-b bg-muted/30" dir="rtl">
            <h4 className={cn(
              "text-sm font-medium text-center text-muted-foreground",
              deviceInfo.isMobile ? "text-xs" : 
              deviceInfo.isTablet ? "text-sm" : "text-base"
            )}>
              {gymName || "برنامه مدیریت"}
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

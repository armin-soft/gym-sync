
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  User2,
  Users,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  Database,
  ChevronLeft,
  Menu
} from "lucide-react";
import manifestData from "@/Manifest.json";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProfile } from "./sidebar/SidebarProfile";
import { SidebarMenuList } from "./sidebar/SidebarMenuList";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  {
    title: "داشبورد",
    description: "نمای کلی باشگاه و آمار",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی",
    href: "/Coach-Profile",
    icon: User2,
  },
  {
    title: "شاگردان",
    description: "مدیریت ورزشکاران",
    href: "/Students",
    icon: Users,
  },
  {
    title: "حرکات تمرینی",
    description: "مدیریت حرکات و تمرینات",
    href: "/Exercise-Movements",
    icon: Dumbbell,
  },
  {
    title: "برنامه های غذایی",
    description: "مدیریت رژیم غذایی",
    href: "/Diet-Plan",
    icon: UtensilsCrossed,
  },
  {
    title: "مکمل و ویتامین",
    description: "مدیریت مکمل‌های ورزشی",
    href: "/Supplements-Vitamins",
    icon: Pill,
  },
  {
    title: "پشتیبان‌گیری و بازیابی",
    description: "مدیریت داده‌ها",
    href: "/Backup-Restore",
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
  const { toast } = useToast();
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
      >
        <div className="flex h-full flex-col overflow-hidden">
          <SidebarProfile 
            name={trainerProfile.name}
            email={trainerProfile.email}
            image={trainerProfile.image}
            onClose={onClose}
          />
          
          <div className="px-4 py-3 border-b bg-muted/30">
            <h4 className={cn(
              "text-sm font-medium text-center text-muted-foreground",
              deviceInfo.isMobile ? "text-xs" : 
              deviceInfo.isTablet ? "text-sm" : "text-base"
            )}>
              {gymName || "برنامه مدیریت"}
            </h4>
          </div>
          
          <ScrollArea className="flex-1">
            <SidebarMenuList items={sidebarItems} onClose={onClose} />
          </ScrollArea>
          
          <SidebarFooter gymName={gymName} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

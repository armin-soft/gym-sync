
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
  Sparkles,
  ChevronLeft,
  Crown
} from "lucide-react";
import { useEffect, useState } from "react";
import { ModernSidebarProfile } from "./sidebar/ModernSidebarProfile";
import { ModernSidebarMenuList } from "./sidebar/ModernSidebarMenuList";
import { ModernSidebarFooter } from "./sidebar/ModernSidebarFooter";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

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
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی",
    href: "/Management/Coach-Profile",
    icon: User2,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "شاگردان",
    description: "مدیریت ورزشکاران",
    href: "/Management/Students",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "حرکات تمرینی",
    description: "مدیریت حرکات و تمرینات",
    href: "/Management/Exercise-Movements",
    icon: Dumbbell,
    gradient: "from-orange-500 to-amber-600",
  },
  {
    title: "برنامه های غذایی",
    description: "مدیریت رژیم غذایی",
    href: "/Management/Diet-Plan",
    icon: UtensilsCrossed,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    title: "مکمل و ویتامین",
    description: "مدیریت مکمل‌های ورزشی",
    href: "/Management/Supplements-Vitamins",
    icon: Pill,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "پشتیبان‌گیری و بازیابی",
    description: "مدیریت داده‌ها",
    href: "/Management/Backup-Restore",
    icon: Database,
    gradient: "from-slate-500 to-gray-600",
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
  
  const getSidebarWidth = () => {
    if (deviceInfo.isMobile) return "w-[320px]";
    if (deviceInfo.isTablet) return "w-[360px]";
    if (deviceInfo.isSmallLaptop) return "w-[380px]";
    return "w-[400px]";
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className={cn(
          getSidebarWidth(),
          "p-0 border-l-0 shadow-2xl bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900 backdrop-blur-xl"
        )}
        dir="rtl"
      >
        <motion.div 
          className="flex h-full flex-col overflow-hidden relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          dir="rtl"
        >
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
          
          {/* Header Section */}
          <div className="relative z-10" dir="rtl">
            <ModernSidebarProfile 
              name={trainerProfile.name}
              email={trainerProfile.email}
              image={trainerProfile.image}
              onClose={onClose}
            />
          </div>
          
          {/* Gym Name Section */}
          <motion.div 
            className="px-6 py-4 border-b border-gradient-to-r from-violet-200/30 via-blue-200/30 to-purple-200/30 dark:from-violet-700/30 dark:via-blue-700/30 dark:to-purple-700/30 bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm" 
            dir="rtl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <h4 className={cn(
                "font-bold text-center bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent",
                deviceInfo.isMobile ? "text-sm" : 
                deviceInfo.isTablet ? "text-base" : "text-lg"
              )}>
                {gymName || "پنل مدیریت حرفه‌ای"}
              </h4>
            </div>
          </motion.div>
          
          {/* Menu Section */}
          <ScrollArea className="flex-1 relative z-10" dir="rtl">
            <div dir="rtl" className="p-2">
              <ModernSidebarMenuList items={sidebarItems} onClose={onClose} />
            </div>
          </ScrollArea>
          
          {/* Footer Section */}
          <div dir="rtl" className="relative z-10">
            <ModernSidebarFooter gymName={gymName} />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-4 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}

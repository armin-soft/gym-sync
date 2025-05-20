
import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User2,
  Users,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  Database,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import manifestData from "@/Manifest.json";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "داشبورد",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "پروفایل مربی",
    href: "/Coach-Profile",
    icon: User2,
  },
  {
    title: "شاگردان",
    href: "/Students",
    icon: Users,
  },
  {
    title: "تمرینات",
    href: "/Exercise-Movements",
    icon: Dumbbell,
  },
  {
    title: "برنامه غذایی",
    href: "/Diet-Plan",
    icon: UtensilsCrossed,
  },
  {
    title: "مکمل‌ها",
    href: "/Supplements-Vitamins",
    icon: Pill,
  },
  {
    title: "پشتیبان‌گیری",
    href: "/Backup-Restore",
    icon: Database,
  }
];

// کامپوننت آیتم منو بهینه‌سازی شده
const SidebarItem = React.memo(({ item, isActive, onClick }: { 
  item: SidebarItem, 
  isActive: boolean, 
  onClick: () => void 
}) => (
  <Link
    key={item.href}
    to={item.href}
    onClick={onClick}
    className={cn(
      "group flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200",
      "hover:bg-accent/50 active:scale-[0.98]",
      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
    )}
  >
    <div className="flex items-center gap-4">
      <div className={cn(
        "rounded-md p-1 transition-colors duration-200",
        isActive ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
      )}>
        <item.icon className="h-4 w-4" />
      </div>
      <span className="text-sm font-medium">{item.title}</span>
    </div>
    <ChevronLeft className={cn(
      "h-4 w-4 opacity-0 transition-all duration-200",
      "group-hover:opacity-100 group-hover:translate-x-0",
      "group-hover:text-primary",
      isActive ? "opacity-100 text-primary" : "-translate-x-2"
    )} />
  </Link>
));

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [gymName, setGymName] = React.useState("");
  
  // بارگذاری نام باشگاه از پروفایل مربی - فقط وقتی منو باز است
  React.useEffect(() => {
    if (isOpen) {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          if (profile.gymName) {
            setGymName(profile.gymName);
          }
        } catch (error) {
          console.error('Error loading gym name:', error);
        }
      }
    }
  }, [isOpen]);
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[280px] p-0 border-l bg-card/95 backdrop-blur-sm"
        // تنظیمات برای باز شدن سریع‌تر
        onOpenAutoFocus={(e) => e.preventDefault()}
        onEscapeKeyDown={onClose}
      >
        <div className="flex h-full flex-col">
          <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Menu className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">منوی اصلی</h2>
                </div>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-1 py-3">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <SidebarItem 
                    key={item.href} 
                    item={item} 
                    isActive={isActive} 
                    onClick={onClose} 
                  />
                );
              })}
            </div>
          </ScrollArea>
          
          <div className="mt-auto p-4 border-t bg-card/50">
            <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{gymName || "برنامه مدیریت"}</span>
                <span className="text-xs text-muted-foreground">نسخه {toPersianNumbers(manifestData.version || "3.0.0")}</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

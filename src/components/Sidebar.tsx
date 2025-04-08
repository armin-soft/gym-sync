
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
  LineChart,
  HelpCircle,
  Menu,
  Database
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

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
    title: "حرکات تمرینی",
    href: "/Exercise-Movements",
    icon: Dumbbell,
  },
  {
    title: "برنامه های غذایی",
    href: "/Diet-Plan",
    icon: UtensilsCrossed,
  },
  {
    title: "مکمل و ویتامین",
    href: "/Supplements-Vitamins",
    icon: Pill,
  },
  {
    title: "گزارشات",
    href: "/Reports",
    icon: LineChart,
  },
  {
    title: "پشتیبان‌گیری و بازیابی",
    href: "/Backup-Restore",
    icon: Database,
  },
  {
    title: "درباره",
    href: "/About",
    icon: HelpCircle,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [gymName, setGymName] = useState("مدیریت برنامه");
  
  const loadGymName = () => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(`مدیریت برنامه ${profile.gymName}`);
        }
      } catch (error) {
        console.error('Error loading gym name from localStorage:', error);
      }
    }
  };
  
  useEffect(() => {
    loadGymName();
    
    const handleStorageChange = () => {
      loadGymName();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[280px] p-0 border-l bg-card/95 backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Menu className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{gymName}</p>
                </div>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-1 py-3">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center rounded-lg px-3 py-2 transition-all duration-200",
                      "hover:bg-accent/50 active:scale-[0.98]",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "rounded-md p-1 transition-colors duration-200",
                        isActive ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
                      )}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  </Link>
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
                <span className="text-sm font-medium">{gymName}</span>
                <span className="text-xs text-muted-foreground">نسخه ۱.۰.۰</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

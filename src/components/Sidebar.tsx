
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  ChevronRight
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
  description?: string;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "داشبورد",
    href: "/",
    icon: LayoutDashboard,
    description: "نمای کلی از وضعیت برنامه‌ها",
  },
  {
    title: "پروفایل مربی",
    href: "/trainer",
    icon: User2,
    description: "مدیریت اطلاعات مربی",
  },
  {
    title: "شاگردان",
    href: "/students",
    icon: Users,
    description: "مدیریت لیست شاگردان",
  },
  {
    title: "تمرینات",
    href: "/exercises",
    icon: Dumbbell,
    description: "برنامه‌های تمرینی",
  },
  {
    title: "برنامه غذایی",
    href: "/diet",
    icon: UtensilsCrossed,
    description: "مدیریت رژیم غذایی",
  },
  {
    title: "مکمل‌ها",
    href: "/supplements",
    icon: Pill,
    description: "مدیریت مکمل‌های ورزشی",
  },
  {
    title: "گزارشات",
    href: "/reports",
    icon: LineChart,
    description: "آمار و گزارشات",
  },
  {
    title: "درباره",
    href: "/about",
    icon: HelpCircle,
    description: "اطلاعات برنامه",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[85vw] sm:w-[400px] p-0 border-l bg-card/80 backdrop-blur-xl"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
                  <Menu className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <SheetTitle className="text-xl">منوی اصلی</SheetTitle>
                  <p className="text-xs text-muted-foreground">مدیریت فیکس - نسخه ۱.۰.۰</p>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
          </SheetHeader>
          
          <ScrollArea className="flex-1 overflow-hidden px-2">
            <div className="space-y-1 p-2">
              {sidebarItems.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.href && [
                      "bg-gradient-to-r from-primary/10 to-transparent",
                      "border-primary/20",
                      "text-foreground"
                    ],
                    "animate-in fade-in-50 slide-in-from-right duration-300",
                    { "delay-150": index > 0 }
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                    location.pathname === item.href 
                      ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-accent/50 text-muted-foreground group-hover:text-accent-foreground group-hover:shadow"
                  )}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-medium leading-none">
                        {item.title}
                      </span>
                      <ChevronRight className={cn(
                        "h-4 w-4 text-muted-foreground/50 transition-all duration-300",
                        location.pathname === item.href ? "rotate-90 text-primary" : "group-hover:translate-x-1"
                      )} />
                    </div>
                    {item.description && (
                      <span className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
          
          <div className="border-t bg-card/80 p-4 backdrop-blur-xl">
            <div className="rounded-xl bg-gradient-to-b from-primary/10 to-primary/5 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                  <Dumbbell className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">مدیریت فیکس</span>
                  <span className="text-xs text-muted-foreground">سامانه مدیریت باشگاه</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

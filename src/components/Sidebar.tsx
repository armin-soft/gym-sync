
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  X,
  Weight,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  description?: string;
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
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="p-0 w-80">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Weight className="ml-2 h-6 w-6 text-primary animate-pulse" />
            <div className="text-lg font-bold">مدیریت برنامه فیکس</div>
            <Button
              variant="ghost"
              size="icon"
              className="mr-auto h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
          <div className="space-y-1 p-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent transition-all duration-200",
                  location.pathname === item.href 
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground hover:text-primary",
                  "animate-in fade-in-50 slide-in-from-right-8"
                )}
              >
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200",
                  location.pathname === item.href 
                    ? "bg-primary text-primary-foreground"
                    : "border bg-background"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 mr-3">
                  <div className="text-sm font-semibold leading-none tracking-tight">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="mt-1 text-xs font-normal text-muted-foreground line-clamp-1">
                      {item.description}
                    </div>
                  )}
                </div>
                {location.pathname === item.href && (
                  <div className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-lg bg-primary" />
                )}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

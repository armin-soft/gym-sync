
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
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
    href: "/trainer",
    icon: User2,
  },
  {
    title: "شاگردان",
    href: "/students",
    icon: Users,
  },
  {
    title: "تمرینات",
    href: "/exercises",
    icon: Dumbbell,
  },
  {
    title: "برنامه غذایی",
    href: "/diet",
    icon: UtensilsCrossed,
  },
  {
    title: "مکمل‌ها",
    href: "/supplements",
    icon: Pill,
  },
  {
    title: "گزارشات",
    href: "/reports",
    icon: LineChart,
  },
  {
    title: "درباره",
    href: "/about",
    icon: HelpCircle,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[280px] p-0 border-l"
      >
        <div className="flex h-full flex-col">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Menu className="h-5 w-5" />
              <h2 className="font-semibold">منوی اصلی</h2>
            </div>
            <Separator className="my-4" />
          </div>
          
          <ScrollArea className="flex-1">
            <div className="px-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">مدیریت فیکس</span>
                <span className="text-xs text-muted-foreground">نسخه ۱.۰.۰</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


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
} from "lucide-react";

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
      <SheetContent side="right" className="p-0 w-72">
        <div className="space-y-4 py-4">
          <div className="px-4 py-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold tracking-tight">منو</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-500"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="py-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50",
                  "mx-3 mb-1 hover:bg-slate-100 dark:hover:bg-slate-800",
                  location.pathname === item.href && "bg-slate-100 dark:bg-slate-800"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}

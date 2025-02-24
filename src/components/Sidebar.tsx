
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
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  description?: string;
  category: "main" | "management" | "tools";
}

const sidebarItems: SidebarItem[] = [
  {
    title: "داشبورد",
    href: "/",
    icon: LayoutDashboard,
    description: "نمای کلی از وضعیت برنامه‌ها",
    category: "main",
  },
  {
    title: "پروفایل مربی",
    href: "/trainer",
    icon: User2,
    description: "مدیریت اطلاعات مربی",
    category: "main",
  },
  {
    title: "شاگردان",
    href: "/students",
    icon: Users,
    description: "مدیریت لیست شاگردان",
    category: "management",
  },
  {
    title: "تمرینات",
    href: "/exercises",
    icon: Dumbbell,
    description: "برنامه‌های تمرینی",
    category: "management",
  },
  {
    title: "برنامه غذایی",
    href: "/diet",
    icon: UtensilsCrossed,
    description: "مدیریت رژیم غذایی",
    category: "management",
  },
  {
    title: "مکمل‌ها",
    href: "/supplements",
    icon: Pill,
    description: "مدیریت مکمل‌های ورزشی",
    category: "tools",
  },
  {
    title: "گزارشات",
    href: "/reports",
    icon: LineChart,
    description: "آمار و گزارشات",
    category: "tools",
  },
  {
    title: "درباره",
    href: "/about",
    icon: HelpCircle,
    description: "اطلاعات برنامه",
    category: "tools",
  },
];

const MenuGroup = ({ items, category }: { items: SidebarItem[], category: string }) => {
  const location = useLocation();
  
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent transition-all duration-200",
            location.pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-primary",
            "animate-in fade-in-50 slide-in-from-right-8"
          )}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border bg-background">
            <item.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 mr-2">
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
  );
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<string>("main");
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="p-0 w-80">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Weight className="ml-2 h-6 w-6 text-primary" />
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
        
        <Tabs value={activeTab} className="mt-4 px-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="main" className="text-xs">اصلی</TabsTrigger>
            <TabsTrigger value="management" className="text-xs">مدیریت</TabsTrigger>
            <TabsTrigger value="tools" className="text-xs">ابزارها</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <ScrollArea className="h-[calc(100vh-8rem)] pb-10 pt-6">
          <div className="px-4">
            {activeTab === "main" && (
              <MenuGroup items={sidebarItems.filter(item => item.category === "main")} category="main" />
            )}
            {activeTab === "management" && (
              <MenuGroup items={sidebarItems.filter(item => item.category === "management")} category="management" />
            )}
            {activeTab === "tools" && (
              <MenuGroup items={sidebarItems.filter(item => item.category === "tools")} category="tools" />
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

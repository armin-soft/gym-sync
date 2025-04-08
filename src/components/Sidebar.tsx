
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
  Database,
  LogOut,
  ChevronLeft,
  Settings,
  Menu
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

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
  badgeColor?: string;
}

const sidebarItems: SidebarItem[] = [
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
    badge: "جدید",
    badgeColor: "bg-emerald-500"
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
    title: "گزارشات",
    description: "آمار و گزارش‌گیری",
    href: "/Reports",
    icon: LineChart,
  },
  {
    title: "پشتیبان‌گیری و بازیابی",
    description: "مدیریت داده‌ها",
    href: "/Backup-Restore",
    icon: Database,
  },
  {
    title: "درباره",
    description: "اطلاعات نرم‌افزار",
    href: "/About",
    icon: HelpCircle,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [gymName, setGymName] = useState("مدیریت برنامه");
  const [trainerProfile, setTrainerProfile] = useState({
    name: "مربی",
    image: "",
    email: ""
  });
  const { toast } = useToast();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
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
          setGymName(`مدیریت برنامه ${profile.gymName}`);
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("rememberMeExpiry");
    
    toast({
      title: "خروج موفقیت‌آمیز",
      description: "شما با موفقیت از سیستم خارج شدید",
    });
    
    // Reload the page to go back to login
    window.location.reload();
  };

  // Animation variants
  const sidebarVariants = {
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    closed: { 
      opacity: 0, 
      x: 40,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 20 }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[320px] p-0 border-l shadow-2xl bg-white dark:bg-card/90 backdrop-blur-lg"
      >
        <div className="flex h-full flex-col overflow-hidden">
          {/* Header with user profile */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative px-5 py-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white"
          >
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={onClose} 
              className="absolute top-4 left-4 rounded-full text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-lg"></div>
                <Avatar className="h-16 w-16 border-2 border-white/50 relative">
                  {trainerProfile.image ? (
                    <AvatarImage src={trainerProfile.image} alt={trainerProfile.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                      {trainerProfile.name.slice(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <h3 className="font-bold text-lg">{trainerProfile.name}</h3>
              <p className="text-xs text-white/70">{trainerProfile.email}</p>
              
              <div className="flex mt-4 space-x-2 space-x-reverse">
                <Button 
                  size="sm" 
                  variant="outline"
                  asChild
                  className="rounded-full text-xs bg-white/10 border-white/20 hover:bg-white/20 text-white"
                >
                  <Link to="/Coach-Profile">
                    <Settings className="h-3.5 w-3.5 ml-1.5" />
                    پروفایل
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="rounded-full text-xs bg-white/10 border-white/20 hover:bg-white/20 text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="h-3.5 w-3.5 ml-1.5" />
                  خروج
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Separator with gym name */}
          <div className="px-4 py-3 border-b bg-muted/30">
            <h4 className="text-sm font-medium text-center text-muted-foreground">{gymName}</h4>
          </div>
          
          {/* Scrollable navigation area */}
          <ScrollArea className="flex-1">
            <motion.div 
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              className="py-4 px-3"
            >
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.href;
                const isHovered = hoveredItem === item.href;
                
                return (
                  <motion.div 
                    key={item.href}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "relative block py-3 px-4 mb-1 rounded-lg transition-all duration-200",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      )}
                    >
                      {/* Background gradient for active item */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 opacity-80"></div>
                      )}
                      
                      {/* Background hover effect */}
                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 rounded-lg bg-muted"
                          ></motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="relative flex items-center">
                        <div className={cn(
                          "flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center mr-3.5",
                          isActive 
                            ? "bg-white/20 text-white" 
                            : "bg-muted-foreground/10 text-muted-foreground"
                        )}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              "font-medium",
                              isActive ? "text-white" : ""
                            )}>
                              {item.title}
                            </span>
                            
                            {item.badge && (
                              <span className={cn(
                                "px-1.5 py-0.5 text-[10px] rounded-full font-medium",
                                item.badgeColor || "bg-primary",
                                isActive ? "text-white bg-white/20" : "text-white"
                              )}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          
                          {item.description && (
                            <p className={cn(
                              "text-xs mt-0.5",
                              isActive ? "text-white/70" : "text-muted-foreground"
                            )}>
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </ScrollArea>
          
          {/* Footer with version info */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex-shrink-0 rounded-full bg-primary/10 p-2.5">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{gymName}</span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>نسخه ۱.۰.۰</span>
                  <span className="inline-block mx-1.5 w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                  <span>۱۴۰۳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

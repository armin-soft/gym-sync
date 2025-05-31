
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  User2, 
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Database,
  Crown,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Calendar,
  Award,
  X
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { AppIcon } from "@/components/ui/app-icon";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  {
    title: "داشبورد",
    description: "نمای کلی و آمارها",
    href: "/Management",
    icon: LayoutDashboard,
    gradient: "from-violet-500 to-purple-600",
    color: "violet",
    badge: "جدید"
  },
  {
    title: "پروفایل مربی",
    description: "مدیریت اطلاعات شخصی",
    href: "/Management/Coach-Profile",
    icon: User2,
    gradient: "from-blue-500 to-cyan-600",
    color: "blue"
  },
  {
    title: "شاگردان",
    description: "مدیریت ورزشکاران",
    href: "/Management/Students",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    color: "emerald",
    badge: "۱۵"
  },
  {
    title: "حرکات تمرینی",
    description: "مدیریت تمرینات",
    href: "/Management/Exercise-Movements",
    icon: Dumbbell,
    gradient: "from-orange-500 to-amber-600",
    color: "orange"
  },
  {
    title: "برنامه‌های غذایی",
    description: "مدیریت رژیم غذایی",
    href: "/Management/Diet-Plan",
    icon: UtensilsCrossed,
    gradient: "from-rose-500 to-pink-600",
    color: "rose"
  },
  {
    title: "مکمل‌ها و ویتامین‌ها",
    description: "مدیریت مکمل‌های ورزشی",
    href: "/Management/Supplements-Vitamins",
    icon: Pill,
    gradient: "from-indigo-500 to-purple-600",
    color: "indigo"
  },
  {
    title: "پشتیبان‌گیری",
    description: "مدیریت داده‌ها",
    href: "/Management/Backup-Restore",
    icon: Database,
    gradient: "from-slate-500 to-gray-600",
    color: "slate"
  }
];

const quickStats = [
  { label: "شاگردان فعال", value: "۱۵", icon: Users, color: "emerald" },
  { label: "برنامه‌های امروز", value: "۸", icon: Calendar, color: "blue" },
  { label: "پیشرفت هفته", value: "۹۲%", icon: TrendingUp, color: "violet" },
  { label: "امتیاز کیفیت", value: "۴.۹", icon: Award, color: "amber" }
];

export const DashboardSidebar = ({ isOpen, onClose }: DashboardSidebarProps) => {
  const location = useLocation();
  const deviceInfo = useDeviceInfo();
  const [trainerProfile, setTrainerProfile] = useState({ name: "مربی", image: "" });
  const [gymName, setGymName] = useState("");

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('trainerProfile') || '{}');
    setTrainerProfile({
      name: profile.name || "مربی", 
      image: profile.image || ""
    });
    setGymName(profile.gymName || "باشگاه ورزشی");
  }, []);

  const getSidebarWidth = () => {
    if (deviceInfo.isMobile) return "w-[300px]";
    if (deviceInfo.isTablet) return "w-[340px]";
    return "w-[380px]";
  };

  const sidebarVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, x: 50 }
  };

  const itemVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className={cn(
          getSidebarWidth(),
          "p-0 border-l-0 bg-gradient-to-br from-white via-gray-50/50 to-slate-50 dark:from-gray-900 dark:via-gray-800/50 dark:to-slate-900"
        )}
        dir="rtl"
      >
        <motion.div
          variants={sidebarVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex h-full flex-col relative overflow-hidden"
          dir="rtl"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl" />

          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="relative z-10 p-6 border-b border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {gymName}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">مدیریت حرفه‌ای</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-100/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-violet-200 dark:border-violet-700">
                <img 
                  src={trainerProfile.image || "/Assets/Images/Place-Holder.svg"} 
                  alt={trainerProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{trainerProfile.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">مربی حرفه‌ای</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            variants={itemVariants}
            className="relative z-10 p-4 border-b border-gray-200/50 dark:border-gray-700/50"
          >
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              آمار سریع
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-1 rounded-md",
                      stat.color === "emerald" && "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
                      stat.color === "blue" && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                      stat.color === "violet" && "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
                      stat.color === "amber" && "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                      <stat.icon className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{stat.value}</p>
                      <p className="text-2xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <ScrollArea className="flex-1 relative z-10">
            <motion.div variants={itemVariants} className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                منوی اصلی
              </h3>
              
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "group relative flex items-center gap-3 p-4 rounded-xl transition-all duration-300 border",
                        isActive 
                          ? "bg-gradient-to-r text-white shadow-lg border-transparent" + " " + item.gradient
                          : "hover:bg-gray-100 dark:hover:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
                      )}
                    >
                      {/* Icon */}
                      <div className={cn(
                        "p-2.5 rounded-lg transition-all duration-300",
                        isActive 
                          ? "bg-white/20" 
                          : "bg-gray-100 dark:bg-gray-800 group-hover:scale-110"
                      )}>
                        <Icon className={cn(
                          "h-5 w-5 transition-colors",
                          isActive ? "text-white" : "text-gray-600 dark:text-gray-400"
                        )} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-medium transition-colors",
                            isActive ? "text-white" : "text-gray-900 dark:text-gray-100"
                          )}>
                            {item.title}
                          </span>
                          {item.badge && (
                            <Badge 
                              variant={isActive ? "secondary" : "outline"} 
                              className="text-2xs px-1.5 py-0"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className={cn(
                          "text-xs mt-0.5 transition-colors",
                          isActive ? "text-white/70" : "text-gray-500 dark:text-gray-400"
                        )}>
                          {item.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-all duration-300",
                        isActive 
                          ? "text-white opacity-100 translate-x-0" 
                          : "text-gray-400 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      )} />

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </ScrollArea>

          {/* Footer */}
          <motion.div 
            variants={itemVariants}
            className="relative z-10 p-4 border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AppIcon size="sm" />
                <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  GymSync Pro
                </span>
              </div>
              <p className="text-2xs text-gray-500 dark:text-gray-400">
                نسخه ۴.۰.۶ • ساخته شده با ❤️
              </p>
            </div>
          </motion.div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};

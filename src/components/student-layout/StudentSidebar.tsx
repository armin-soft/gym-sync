
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, User, Dumbbell, Apple, Pill, 
  BarChart3, MessageCircle, X, ChevronLeft,
  Activity, Calendar, Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  {
    title: "داشبورد",
    href: "/Student",
    icon: Home,
    description: "نمای کلی پیشرفت و آمار",
    badge: null,
    gradient: "from-emerald-500 to-green-500"
  },
  {
    title: "پروفایل شخصی",
    href: "/Student/Profile",
    icon: User,
    description: "مدیریت اطلاعات شخصی",
    badge: null,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "حرکات تمرینی",
    href: "/Student/Exercise-Movements",
    icon: Dumbbell,
    description: "برنامه تمرینی و تمارین",
    badge: "۱۲",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    title: "برنامه غذایی",
    href: "/Student/Diet-Plan",
    icon: Apple,
    description: "رژیم غذایی و وعده‌ها",
    badge: "۸",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "مکمل‌ها و ویتامین‌ها",
    href: "/Student/Supplements-Vitamins",
    icon: Pill,
    description: "مکمل‌های دریافتی",
    badge: "۴",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    title: "گزارشات و تحلیل‌ها",
    href: "/Student/Report",
    icon: BarChart3,
    description: "آمار پیشرفت و نتایج",
    badge: null,
    gradient: "from-red-500 to-pink-500"
  },
  {
    title: "پشتیبانی و ارتباط",
    href: "/Student/Support",
    icon: MessageCircle,
    description: "ارتباط با مربی",
    badge: "۲",
    gradient: "from-indigo-500 to-blue-500"
  }
];

export const StudentSidebar: React.FC<StudentSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    navigate(href);
    onClose();
  };

  // دریافت اطلاعات شاگرد از localStorage
  const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
  const studentName = studentData.name || "نام شاگرد";
  const studentLevel = "مبتدی"; // از API دریافت خواهد شد

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-emerald-200/30 dark:border-slate-700/50 shadow-2xl"
            dir="rtl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-emerald-200/30 dark:border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">G</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                        Gym-Sync
                      </h2>
                      <p className="text-xs text-muted-foreground">پنل شاگرد</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Student Info */}
                <div className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/30 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center shadow-md">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">{studentName}</h3>
                      <Badge variant="outline" className="text-xs bg-white/50 dark:bg-slate-800/50 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300">
                        سطح: {studentLevel}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-white/50 dark:bg-slate-800/30 rounded-lg">
                      <Activity className="h-4 w-4 mx-auto mb-1 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">{toPersianNumbers("24")}</p>
                      <p className="text-xs text-muted-foreground">تمرین</p>
                    </div>
                    <div className="text-center p-2 bg-white/50 dark:bg-slate-800/30 rounded-lg">
                      <Calendar className="h-4 w-4 mx-auto mb-1 text-sky-600 dark:text-sky-400" />
                      <p className="text-xs font-medium text-sky-700 dark:text-sky-300">{toPersianNumbers("45")}</p>
                      <p className="text-xs text-muted-foreground">روز</p>
                    </div>
                    <div className="text-center p-2 bg-white/50 dark:bg-slate-800/30 rounded-lg">
                      <Target className="h-4 w-4 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
                      <p className="text-xs font-medium text-purple-700 dark:text-purple-300">{toPersianNumbers("85")}%</p>
                      <p className="text-xs text-muted-foreground">هدف</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <ScrollArea className="flex-1 px-4 py-2">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    
                    return (
                      <motion.div
                        key={item.href}
                        whileHover={{ x: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start h-auto p-4 text-right hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-200",
                            isActive && "bg-gradient-to-l shadow-lg border-0",
                            isActive && `bg-gradient-to-l ${item.gradient} text-white hover:from-emerald-600 hover:to-sky-600`
                          )}
                          onClick={() => handleNavigation(item.href)}
                        >
                          <div className="flex items-center gap-4 w-full">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                              isActive 
                                ? "bg-white/20 shadow-lg" 
                                : "bg-emerald-100 dark:bg-emerald-900/30"
                            )}>
                              <Icon className={cn(
                                "h-5 w-5",
                                isActive 
                                  ? "text-white" 
                                  : "text-emerald-600 dark:text-emerald-400"
                              )} />
                            </div>
                            
                            <div className="flex-1 text-right">
                              <div className="flex items-center justify-between">
                                <span className={cn(
                                  "font-medium",
                                  isActive 
                                    ? "text-white" 
                                    : "text-gray-900 dark:text-gray-100"
                                )}>
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge 
                                    variant="secondary" 
                                    className={cn(
                                      "text-xs h-5 px-2",
                                      isActive 
                                        ? "bg-white/20 text-white border-white/30" 
                                        : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                                    )}
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className={cn(
                                "text-xs mt-1",
                                isActive 
                                  ? "text-white/80" 
                                  : "text-muted-foreground"
                              )}>
                                {item.description}
                              </p>
                            </div>

                            {isActive && (
                              <ChevronLeft className="h-4 w-4 text-white/80" />
                            )}
                          </div>
                        </Button>
                      </motion.div>
                    );
                  })}
                </nav>
              </ScrollArea>

              {/* Footer */}
              <div className="p-4 border-t border-emerald-200/30 dark:border-slate-700/50">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">نسخه {toPersianNumbers("6.0.0")}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    با ❤️ ساخته شده برای شما
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

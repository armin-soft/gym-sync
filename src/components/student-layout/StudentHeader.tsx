
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Bell, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { AppIcon } from "@/components/ui/app-icon";
import { cn } from "@/lib/utils";

interface StudentHeaderProps {
  onSidebarToggle: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ onSidebarToggle }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("rememberedEmail");
    localStorage.removeItem("rememberMeExpiry");
    localStorage.removeItem("hasSelectedUserType");
    localStorage.removeItem("selectedUserType");
    localStorage.removeItem("studentData");
    navigate("/");
  };

  // دریافت اطلاعات شاگرد از localStorage
  const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
  const studentName = studentData.name || "کاربر عزیز";

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 right-0 left-0 z-50 h-16 bg-gradient-to-r from-emerald-50/95 to-sky-50/95 dark:from-slate-950/95 dark:via-emerald-950/90 dark:to-sky-950/85 backdrop-blur-xl border-b border-emerald-200/30 dark:border-slate-700/50 shadow-lg"
      dir="rtl"
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Right Side - Menu & Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="h-10 w-10 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
          >
            <Menu className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
          </Button>
          
          <div className="flex items-center gap-3">
            <AppIcon size="sm" animated />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                Gym-Sync
              </h1>
              <p className="text-xs text-muted-foreground">پنل شاگرد</p>
            </div>
          </div>
        </div>

        {/* Center - Welcome Message */}
        <div className="hidden md:flex items-center gap-2">
          <Badge 
            variant="outline" 
            className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
          >
            خوش آمدید، {studentName}
          </Badge>
        </div>

        {/* Left Side - Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors relative"
          >
            <Bell className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
            <Badge className="absolute -top-1 -left-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-br from-orange-500 to-red-500 border-0">
              {toPersianNumbers("2")}
            </Badge>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-10 w-10 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-600 dark:text-red-400"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

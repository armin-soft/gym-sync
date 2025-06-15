
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Bell, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { AppIcon } from "@/components/ui/app-icon";
import { handleStudentLogout } from "./utils/studentAuthUtils";

interface StudentHeaderProps {
  onSidebarToggle: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ onSidebarToggle }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    handleStudentLogout();
  };

  // دریافت اطلاعات شاگرد از localStorage
  const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
  const studentName = studentData.name || "کاربر عزیز";

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 right-0 left-0 z-50 h-16 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-700/50 shadow-lg"
      dir="rtl"
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Right Side - Menu & Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="h-10 w-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
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
            className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
          >
            <User className="w-3 h-3 ml-1" />
            خوش آمدید، {studentName}
          </Badge>
        </div>

        {/* Left Side - Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="h-4 w-4 text-slate-700 dark:text-slate-300" />
            <Badge className="absolute -top-1 -left-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 border-0 text-white">
              {toPersianNumbers("2")}
            </Badge>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-10 w-10 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-red-600 dark:text-red-400"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { X, LogOut, Home, Dumbbell, Utensils, Pill, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/app-icon";
import { Student } from "@/components/students/StudentTypes";

interface StudentDashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  onLogout: () => void;
}

export const StudentDashboardSidebar: React.FC<StudentDashboardSidebarProps> = ({
  isOpen,
  onClose,
  student,
  onLogout
}) => {
  const navItems = [
    { label: "داشبورد", icon: Home, path: `/Students/dashboard/${student.id}` },
    { label: "پروفایل من", icon: User, path: "/Students/profile" },
    { label: "برنامه تمرینی", icon: Dumbbell, path: "/Students/exercises" },
    { label: "برنامه غذایی", icon: Utensils, path: "/Students/diet" },
    { label: "مکمل‌ها", icon: Pill, path: "/Students/supplements" },
  ];

  // Sidebar animations
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { x: -300, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
  };

  // Backdrop animations
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-[280px] bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-hidden flex flex-col"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AppIcon size="sm" animated />
                  <div>
                    <h2 className="font-bold text-lg">پنل شاگرد</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">دسترسی به برنامه های شما</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* User profile */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-violet-200 dark:ring-violet-800">
                  <img 
                    src={student.image || "/Assets/Image/Place-Holder.svg"} 
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{student.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">شاگرد</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 p-3 rounded-xl transition-all",
                        isActive 
                          ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>خروج از حساب کاربری</span>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

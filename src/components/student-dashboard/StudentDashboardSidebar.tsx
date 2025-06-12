
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Dumbbell, Apple, Pill, Calendar, Trophy, Target, BarChart3, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Student } from "@/components/students/StudentTypes";

interface StudentDashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  onLogout: () => void;
}

const menuItems = [
  { icon: User, title: "پروفایل شخصی", href: "/Students/profile", description: "مشاهده اطلاعات" },
  { icon: Dumbbell, title: "برنامه تمرینی", href: "/Students/exercises", description: "تمرینات روزانه" },
  { icon: Apple, title: "رژیم غذایی", href: "/Students/diet", description: "برنامه تغذیه" },
  { icon: Pill, title: "مکمل‌ها", href: "/Students/supplements", description: "ویتامین و مکمل" },
  { icon: Calendar, title: "تقویم", href: "/Students/calendar", description: "برنامه هفتگی" },
  { icon: Trophy, title: "دستاوردها", href: "/Students/achievements", description: "نشان‌ها و جوایز" },
  { icon: Target, title: "اهداف", href: "/Students/goals", description: "تعیین اهداف" },
  { icon: BarChart3, title: "پیشرفت", href: "/Students/progress", description: "آمار و گزارش" },
];

export const StudentDashboardSidebar: React.FC<StudentDashboardSidebarProps> = ({
  isOpen,
  onClose,
  student,
  onLogout
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-violet-200/50 dark:border-violet-800/50 shadow-2xl"
            dir="rtl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="p-6 border-b border-violet-200/50 dark:border-violet-800/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-violet-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                    منوی اصلی
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="p-2 hover:bg-violet-100 dark:hover:bg-violet-900/20 rounded-xl"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Student Info */}
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50 rounded-xl">
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-violet-200 dark:ring-violet-800">
                    <img 
                      src={student.image || "/Assets/Image/Place-Holder.svg"} 
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{student.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">شاگرد فعال</p>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <ScrollArea className="flex-1 p-2">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-4 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-xl group"
                        onClick={() => {
                          // Navigate to the specific page
                          onClose();
                        }}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="p-2 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/50 dark:to-indigo-900/50 rounded-lg group-hover:scale-110 transition-transform">
                            <item.icon className="h-5 w-5 text-violet-700 dark:text-violet-300" />
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-slate-800 dark:text-slate-200">{item.title}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">{item.description}</p>
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Footer */}
              <div className="p-4 border-t border-violet-200/50 dark:border-violet-800/50">
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800 rounded-xl"
                >
                  <LogOut className="h-4 w-4 ml-2" />
                  خروج از حساب
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

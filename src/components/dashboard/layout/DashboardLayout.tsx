
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, Search, Settings, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { DashboardSidebar } from "./DashboardSidebar";
import { AppIcon } from "@/components/ui/app-icon";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const deviceInfo = useDeviceInfo();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close sidebar on large screens
  useEffect(() => {
    if (!deviceInfo.isMobile && !deviceInfo.isTablet) {
      setSidebarOpen(false);
    }
  }, [deviceInfo.isMobile, deviceInfo.isTablet]);

  const headerHeight = deviceInfo.isMobile ? "h-16" : "h-20";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 persian-numbers" dir="rtl">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "sticky top-0 z-40 border-b transition-all duration-200",
            scrolled 
              ? "bg-white/80 backdrop-blur-xl shadow-lg border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-800/50" 
              : "bg-white/60 backdrop-blur-sm border-gray-100 dark:bg-gray-900/60 dark:border-gray-800",
            headerHeight
          )}
        >
          <div className="px-4 lg:px-8 h-full flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="hover:bg-violet-100 dark:hover:bg-violet-800/20 transition-colors"
              >
                <Menu className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </Button>
              
              <div className="flex items-center gap-3">
                <AppIcon size="md" animated />
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    پنل مدیریت حرفه‌ای
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    سیستم مدیریت باشگاه
                  </p>
                </div>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 bg-gray-100/50 dark:bg-gray-800/50 border-0 focus:bg-white dark:focus:bg-gray-800 transition-colors"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
              
              <Button variant="ghost" className="flex items-center gap-2 px-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium">مربی</span>
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {deviceInfo.isMobile && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => setSearchQuery("")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

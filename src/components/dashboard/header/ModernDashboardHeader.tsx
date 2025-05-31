
import { motion } from "framer-motion";
import { 
  Bell, 
  Search, 
  Settings, 
  ChevronDown,
  Calendar,
  User,
  LogOut,
  HelpCircle
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernDashboardHeaderProps {
  trainerProfile: {
    name: string;
    image: string;
  };
  stats: {
    totalStudents: number;
    studentsProgress: number;
  };
  currentTime: Date;
}

export const ModernDashboardHeader = ({ 
  trainerProfile, 
  stats, 
  currentTime 
}: ModernDashboardHeaderProps) => {
  const deviceInfo = useDeviceInfo();
  
  const profileName = trainerProfile?.name || "مربی حرفه‌ای";
  const profileImage = trainerProfile?.image || "/placeholder.svg";
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-sm"
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Welcome & Stats */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-4"
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              داشبورد مدیریت
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
              {!deviceInfo.isMobile && (
                <>
                  <span>شاگردان: {toPersianNumbers(stats.totalStudents.toString())}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>پیشرفت: {toPersianNumbers(stats.studentsProgress.toString())}٪</span>
                </>
              )}
            </p>
          </div>
        </motion.div>

        {/* Center Section - Search & Quick Actions */}
        {!deviceInfo.isMobile && (
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو..."
                className="w-64 h-9 pl-10 pr-4 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Quick Date */}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <Calendar className="w-4 h-4 ml-2 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {new Intl.DateTimeFormat('fa-IR').format(currentTime)}
              </span>
            </Button>
          </motion.div>
        )}

        {/* Right Section - Notifications & Profile */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2"
        >
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative h-9 w-9 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
          >
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 hover:bg-red-500 border-white dark:border-gray-950">
              ۳
            </Badge>
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
          >
            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 gap-2 px-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
              >
                <div className="relative">
                  <Avatar className="h-7 w-7 border-2 border-white/30 shadow-sm">
                    <AvatarImage src={profileImage} alt="پروفایل" />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold">
                      {getInitials(profileName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-950 rounded-full"></div>
                </div>
                {!deviceInfo.isMobile && (
                  <>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-20 truncate">
                      {profileName}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl"
            >
              <DropdownMenuLabel className="text-right">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{profileName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">مربی حرفه‌ای</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-right cursor-pointer">
                <User className="ml-2 h-4 w-4" />
                <span>پروفایل</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-right cursor-pointer">
                <Settings className="ml-2 h-4 w-4" />
                <span>تنظیمات</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-right cursor-pointer">
                <HelpCircle className="ml-2 h-4 w-4" />
                <span>راهنما</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-right cursor-pointer text-red-600 dark:text-red-400">
                <LogOut className="ml-2 h-4 w-4" />
                <span>خروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.header>
  );
};

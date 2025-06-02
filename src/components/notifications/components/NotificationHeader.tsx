
import React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

export const NotificationHeader = ({ unreadCount, onMarkAllAsRead }: NotificationHeaderProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        {/* آیکون و لوگو */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-flex items-center justify-center mb-6"
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-emerald-600 via-sky-600 to-emerald-700 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Bell className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
            </motion.div>
            
            {/* نشان تعداد اعلان‌ها */}
            {unreadCount > 0 && (
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-xs font-bold">
                  {toPersianNumbers(unreadCount > 99 ? 99 : unreadCount)}
                </span>
              </motion.div>
            )}
            
            {/* نشان‌های کناری */}
            <motion.div
              className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* عنوان و توضیحات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
            <span className="bg-gradient-to-l from-emerald-700 via-sky-700 to-emerald-800 bg-clip-text text-transparent">
              مرکز اعلانات و پیام‌ها
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            مدیریت و پیگیری تمامی اعلانات، پیام‌ها و بروزرسانی‌های سیستم
          </p>
        </motion.div>

        {/* دکمه علامت‌گذاری همه به‌عنوان خوانده‌شده */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button
              onClick={onMarkAllAsRead}
              className="bg-gradient-to-l from-emerald-600 to-sky-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <CheckCircle className="w-5 h-5 ml-2" />
              علامت‌گذاری همه به‌عنوان خوانده‌شده
            </Button>
          </motion.div>
        )}

        {/* خط جداکننده */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          className="mx-auto mt-8 h-px max-w-md bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-600 to-transparent"
        />
      </motion.div>
    </div>
  );
};

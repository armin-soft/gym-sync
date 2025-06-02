
import React from "react";
import { motion } from "framer-motion";
import { NotificationBackground } from "./components/NotificationBackground";
import { NotificationHeader } from "./components/NotificationHeader";
import { NotificationTabs } from "./components/NotificationTabs";
import { NotificationContent } from "./components/NotificationContent";
import { useNotifications } from "./hooks/useNotifications";

export const NotificationsPage = () => {
  const {
    activeTab,
    setActiveTab,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  } = useNotifications();

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40">
      <NotificationBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* هدر */}
        <div className="flex-shrink-0 pt-8 sm:pt-12 lg:pt-16">
          <NotificationHeader unreadCount={unreadCount} onMarkAllAsRead={markAllAsRead} />
        </div>

        {/* محتوای اصلی */}
        <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* تب‌ها */}
              <NotificationTabs 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
                unreadCount={unreadCount}
              />
              
              {/* محتوای نوتیفیکشن‌ها */}
              <NotificationContent
                activeTab={activeTab}
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
                onClearAll={clearAll}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

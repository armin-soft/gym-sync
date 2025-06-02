
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationCard } from "./NotificationCard";
import { EmptyNotificationState } from "./EmptyNotificationState";
import { NotificationActions } from "./NotificationActions";
import { NotificationType } from "../types/notificationTypes";

interface NotificationContentProps {
  activeTab: string;
  notifications: NotificationType[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationContent = ({
  activeTab,
  notifications,
  onMarkAsRead,
  onDelete,
  onClearAll
}: NotificationContentProps) => {
  // فیلتر کردن نوتیفیکشن‌ها بر اساس تب فعال
  const filteredNotifications = notifications.filter(notification => {
    switch (activeTab) {
      case "unread":
        return !notification.isRead;
      case "read":
        return notification.isRead;
      case "system":
        return notification.type === "system";
      default:
        return true;
    }
  });

  const hasNotifications = filteredNotifications.length > 0;

  return (
    <div className="space-y-6">
      {/* اکشن‌ها */}
      {hasNotifications && (
        <NotificationActions
          activeTab={activeTab}
          notificationCount={filteredNotifications.length}
          onClearAll={onClearAll}
        />
      )}

      {/* لیست نوتیفیکشن‌ها */}
      <AnimatePresence mode="wait">
        {hasNotifications ? (
          <motion.div
            key="notifications-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {filteredNotifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                index={index}
                onMarkAsRead={onMarkAsRead}
                onDelete={onDelete}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyNotificationState activeTab={activeTab} />
        )}
      </AnimatePresence>
    </div>
  );
};

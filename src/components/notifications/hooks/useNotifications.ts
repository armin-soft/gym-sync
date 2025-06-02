
import { useState, useEffect } from "react";
import { NotificationType } from "../types/notificationTypes";

// داده‌های نمونه
const sampleNotifications: NotificationType[] = [
  {
    id: "1",
    title: "خوش آمدید به سیستم",
    message: "به سیستم مدیریت برنامه تمرینی خوش آمدید. برای شروع، پروفایل خود را تکمیل کنید.",
    type: "info",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 10) // 10 دقیقه پیش
  },
  {
    id: "2",
    title: "برنامه تمرینی جدید",
    message: "برنامه تمرینی جدید برای شاگرد علی محمدی تنظیم شد.",
    type: "success",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 ساعت پیش
  },
  {
    id: "3",
    title: "یادآوری پشتیبان‌گیری",
    message: "زمان پشتیبان‌گیری از اطلاعات فرا رسیده است. لطفاً از داده‌های خود نسخه پشتیبان تهیه کنید.",
    type: "warning",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 روز پیش
  },
  {
    id: "4",
    title: "بروزرسانی سیستم",
    message: "سیستم به نسخه 5.2.0 بروزرسانی شد. ویژگی‌های جدید در دسترس قرار گرفت.",
    type: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 روز پیش
  },
  {
    id: "5",
    title: "خطا در ذخیره‌سازی",
    message: "مشکلی در ذخیره‌سازی اطلاعات شاگرد جدید پیش آمد. لطفاً مجدد تلاش کنید.",
    type: "error",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 ساعت پیش
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>(sampleNotifications);
  const [activeTab, setActiveTab] = useState("all");

  // محاسبه تعداد اعلانات خوانده‌نشده
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // علامت‌گذاری به‌عنوان خوانده‌شده
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // علامت‌گذاری همه به‌عنوان خوانده‌شده
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // حذف نوتیفیکشن
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // پاک کردن همه
  const clearAll = () => {
    setNotifications([]);
  };

  // اضافه کردن نوتیفیکشن جدید
  const addNotification = (notification: Omit<NotificationType, "id" | "createdAt">) => {
    const newNotification: NotificationType = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return {
    notifications,
    activeTab,
    setActiveTab,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    addNotification
  };
};

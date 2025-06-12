
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { SupportHeader } from "./components/SupportHeader";
import { SupportContent } from "./components/SupportContent";
import { SupportStats } from "./components/SupportStats";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Message } from "./types";

const SupportPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const deviceInfo = useDeviceInfo();

  // بارگذاری پیام‌ها از localStorage
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('supportMessages');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(Array.isArray(parsedMessages) ? parsedMessages : []);
        
        // شمارش پیام‌های خوانده نشده
        const unread = parsedMessages.filter((msg: Message) => !msg.isRead).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('خطا در بارگذاری پیام‌ها:', error);
      setMessages([]);
    }
  }, []);

  // ذخیره پیام‌ها در localStorage
  const saveMessages = (newMessages: Message[]) => {
    try {
      localStorage.setItem('supportMessages', JSON.stringify(newMessages));
      setMessages(newMessages);
      
      // به‌روزرسانی شمارش خوانده نشده
      const unread = newMessages.filter(msg => !msg.isRead).length;
      setUnreadCount(unread);
      
      // ارسال event برای به‌روزرسانی نوتیفیکیشن در هدر
      window.dispatchEvent(new CustomEvent('supportMessagesUpdated', {
        detail: { unreadCount: unread }
      }));
    } catch (error) {
      console.error('خطا در ذخیره پیام‌ها:', error);
    }
  };

  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    );
    saveMessages(updatedMessages);
  };

  const markAllAsRead = () => {
    const updatedMessages = messages.map(msg => ({ ...msg, isRead: true }));
    saveMessages(updatedMessages);
  };

  const deleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    saveMessages(updatedMessages);
  };

  const getPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-6";
    return "p-8";
  };

  return (
    <PageContainer className="persian-numbers" fullHeight>
      <div className={`min-h-screen w-full relative ${getPadding()}`} dir="rtl">
        {/* پس‌زمینه گرادیانی با رنگ‌های انتخاب نوع ورود */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-sky-50/30 to-emerald-50/40 -z-10" />
        
        <div className="relative z-10 w-full h-full space-y-6">
          <SupportHeader unreadCount={unreadCount} onMarkAllAsRead={markAllAsRead} />
          <SupportStats messages={messages} />
          <SupportContent 
            messages={messages}
            onMarkAsRead={markAsRead}
            onDeleteMessage={deleteMessage}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default SupportPage;

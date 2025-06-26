import React, { useState, useMemo, useEffect } from "react";
import { SupportHeader } from "./components/SupportHeader";
import { TicketStats } from "./components/TicketStats";
import { TicketFilters } from "./components/TicketFilters";
import { TicketCard } from "./components/TicketCard";
import { EmptyState } from "./components/EmptyState";
import { TicketFilter, TicketSort } from "./types";
import { useTicketData } from "./hooks/useTicketData";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MessageCircle, User, Clock, RefreshCw } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { toast } from "@/hooks/use-toast";

interface StudentMessage {
  id: string;
  sender: 'student' | 'trainer';
  senderName: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
  studentId?: number;
}

interface Notification {
  id: string;
  type: 'support_message' | 'support_ticket';
  title: string;
  description: string;
  timestamp: number;
  isRead: boolean;
  studentId: number;
  messageId?: string;
  ticketId?: string;
}

export default function SupportPage() {
  const [filter, setFilter] = useState<TicketFilter>("all");
  const [sortBy, setSortBy] = useState<TicketSort>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [studentMessages, setStudentMessages] = useState<StudentMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'tickets' | 'messages' | 'notifications'>('tickets');
  const deviceInfo = useDeviceInfo();
  
  const { 
    tickets, 
    loading, 
    updateTicketStatus, 
    addTicketResponse, 
    getTicketStats,
    getStudentInfo,
    refreshTickets
  } = useTicketData();

  useEffect(() => {
    console.log('Support page loaded, loading data...');
    loadNotifications();
    loadStudentMessages();
    
    // Listen for new notifications and messages
    const handleStorageChange = (e: StorageEvent) => {
      console.log('Storage event received:', e.key);
      if (e.key === 'managementNotifications') {
        loadNotifications();
        toast({
          variant: "default",
          title: "اعلان جدید",
          description: "پیام یا تیکت جدیدی از شاگردان دریافت شد"
        });
      }
      if (e.key === 'studentSupportMessages') {
        loadStudentMessages();
        refreshTickets();
      }
      if (e.key === 'studentSupportTickets') {
        refreshTickets();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshTickets]);

  const loadNotifications = () => {
    const savedNotifications = getLocalStorageItem<Notification[]>('managementNotifications', []);
    console.log('Loaded notifications:', savedNotifications);
    setNotifications(savedNotifications);
  };

  const loadStudentMessages = () => {
    const allMessages = getLocalStorageItem<StudentMessage[]>('studentSupportMessages', []);
    console.log('Loaded all messages:', allMessages);
    // Only show student messages (not trainer replies)
    const studentOnlyMessages = allMessages.filter(msg => msg.sender === 'student');
    console.log('Student only messages:', studentOnlyMessages);
    setStudentMessages(studentOnlyMessages);
  };

  const markNotificationAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    );
    setNotifications(updatedNotifications);
    setLocalStorageItem('managementNotifications', updatedNotifications);
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, isRead: true }));
    setNotifications(updatedNotifications);
    setLocalStorageItem('managementNotifications', updatedNotifications);
  };

  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    refreshTickets();
    loadNotifications();
    loadStudentMessages();
    toast({
      variant: "default",
      title: "به‌روزرسانی شد",
      description: "اطلاعات پشتیبانی به‌روزرسانی شد"
    });
  };

  const getStudentName = (studentId: number) => {
    const student = getStudentInfo(studentId);
    return student?.name || 'شاگرد نامشخص';
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'همین الان';
    } else if (diffInHours < 24) {
      return `${toPersianNumbers(Math.floor(diffInHours).toString())} ساعت پیش`;
    } else {
      return `${toPersianNumbers(Math.floor(diffInHours / 24).toString())} روز پیش`;
    }
  };

  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter(ticket => {
      const matchesFilter = filter === "all" || ticket.status === filter;
      const matchesSearch = searchQuery === "" || 
        ticket.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });

    // مرتب‌سازی
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt - a.createdAt;
        case "oldest":
          return a.createdAt - b.createdAt;
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "status":
          const statusOrder = { open: 4, in_progress: 3, resolved: 2, closed: 1 };
          return statusOrder[b.status] - statusOrder[a.status];
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return filtered;
  }, [tickets, filter, searchQuery, sortBy]);

  const handleAddResponse = (ticketId: string, message: string) => {
    addTicketResponse(ticketId, {
      ticketId,
      authorType: "trainer",
      authorName: "مربی",
      message,
      timestamp: Date.now()
    });
  };

  const getContainerClasses = () => {
    if (deviceInfo.isMobile) return "p-2 space-y-3";
    if (deviceInfo.isTablet) return "p-4 space-y-4";
    return "p-6 space-y-6";
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  console.log('Current state:', {
    tickets: tickets.length,
    notifications: notifications.length,
    messages: studentMessages.length,
    loading
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری تیکت‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40" dir="rtl">
      <div className={cn("w-full", getContainerClasses())}>
        <SupportHeader />
        <TicketStats stats={getTicketStats()} />

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeTab === 'tickets' ? "default" : "outline"}
            onClick={() => setActiveTab('tickets')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
              activeTab === 'tickets'
                ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg"
                : "border-gray-200 hover:bg-emerald-50 hover:border-emerald-200"
            )}
          >
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">تیکت‌های پشتیبانی</span>
            {tickets.length > 0 && (
              <Badge className="bg-white/20 text-white text-xs px-1.5 py-0.5">
                {toPersianNumbers(tickets.length.toString())}
              </Badge>
            )}
          </Button>
          
          <Button
            variant={activeTab === 'messages' ? "default" : "outline"}
            onClick={() => setActiveTab('messages')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
              activeTab === 'messages'
                ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg"
                : "border-gray-200 hover:bg-emerald-50 hover:border-emerald-200"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">پیام‌های شاگردان</span>
            {studentMessages.length > 0 && (
              <Badge className="bg-white/20 text-white text-xs px-1.5 py-0.5">
                {toPersianNumbers(studentMessages.length.toString())}
              </Badge>
            )}
          </Button>
          
          <Button
            variant={activeTab === 'notifications' ? "default" : "outline"}
            onClick={() => setActiveTab('notifications')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 relative",
              activeTab === 'notifications'
                ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg"
                : "border-gray-200 hover:bg-emerald-50 hover:border-emerald-200"
            )}
          >
            <Bell className="w-4 h-4" />
            <span className="text-sm font-medium">اعلان‌ها</span>
            {unreadNotifications > 0 && (
              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 absolute -top-2 -left-2">
                {toPersianNumbers(unreadNotifications.toString())}
              </Badge>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border-gray-200 hover:bg-emerald-50 hover:border-emerald-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">به‌روزرسانی</span>
          </Button>
        </div>
        
        {activeTab === 'tickets' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <TicketFilters 
                filter={filter}
                onFilterChange={setFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                tickets={tickets}
              />
            </div>
            
            <div className="lg:col-span-3">
              {filteredAndSortedTickets.length > 0 ? (
                <div className="space-y-4">
                  {filteredAndSortedTickets.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onStatusChange={updateTicketStatus}
                      onAddResponse={handleAddResponse}
                      studentInfo={getStudentInfo(ticket.studentId)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState filter={filter} searchQuery={searchQuery} />
              )}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">پیام‌های دریافتی از شاگردان</h3>
            
            {studentMessages.length === 0 ? (
              <Card className="p-8 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">پیامی وجود ندارد</h3>
                <p className="text-gray-500">هنوز هیچ پیامی از شاگردان دریافت نشده است</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {studentMessages
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((message) => (
                    <Card key={message.id} className="border-gray-200 hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold">
                            {message.senderName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{message.senderName}</h4>
                              <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{message.message}</p>
                            {message.studentId && (
                              <div className="mt-2">
                                <Badge variant="outline" className="text-xs">
                                  شناسه شاگرد: {toPersianNumbers(message.studentId.toString())}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">اعلان‌های جدید</h3>
              {unreadNotifications > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllNotificationsAsRead}
                  className="text-sm"
                >
                  علامت‌گذاری همه به‌عنوان خوانده‌شده
                </Button>
              )}
            </div>
            
            {notifications.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">اعلانی وجود ندارد</h3>
                <p className="text-gray-500">هنوز هیچ اعلان جدیدی دریافت نشده است</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={cn(
                      "border transition-all duration-200 cursor-pointer hover:shadow-md",
                      !notification.isRead ? "border-emerald-200 bg-emerald-50/50" : "border-gray-200"
                    )}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          notification.type === 'support_message' 
                            ? "bg-blue-100 text-blue-600" 
                            : "bg-orange-100 text-orange-600"
                        )}>
                          {notification.type === 'support_message' ? (
                            <MessageCircle className="w-5 h-5" />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(notification.timestamp)}</span>
                            <span>•</span>
                            <span>{getStudentName(notification.studentId)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

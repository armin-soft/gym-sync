
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, Send, Phone, Mail, Clock, 
  CheckCircle, AlertCircle, HelpCircle, User,
  Plus, Search, Filter, Zap, Shield, Star,
  ChevronDown, ArrowLeft, MessageSquare, Settings,
  Bell, Heart, Smile, ThumbsUp, FileText
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useStudents } from "@/hooks/useStudents";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: 'student' | 'trainer';
  senderName: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
  reactions?: string[];
}

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: number;
  lastUpdate: number;
  description: string;
  responses: number;
}

const StudentSupport = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [activeView, setActiveView] = useState<'chat' | 'tickets' | 'create'>('chat');
  const [trainerOnline, setTrainerOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const deviceInfo = useDeviceInfo();
  const { students } = useStudents();

  const supportCategories = [
    { id: 'general', name: 'سوال عمومی', icon: HelpCircle, color: 'from-blue-500 to-cyan-500' },
    { id: 'exercise', name: 'تمرینات', icon: Zap, color: 'from-emerald-500 to-teal-500' },
    { id: 'diet', name: 'تغذیه', icon: Heart, color: 'from-orange-500 to-red-500' },
    { id: 'supplements', name: 'مکمل‌ها', icon: Shield, color: 'from-purple-500 to-pink-500' },
    { id: 'technical', name: 'مشکل فنی', icon: Settings, color: 'from-gray-500 to-slate-500' }
  ];

  useEffect(() => {
    loadSupportData();
    simulateTrainerActivity();
  }, []);

  const loadSupportData = () => {
    // Load real data from localStorage
    const savedMessages = getLocalStorageItem<ChatMessage[]>('studentSupportMessages', []);
    const savedTickets = getLocalStorageItem<SupportTicket[]>('studentSupportTickets', []);
    
    if (savedMessages.length === 0) {
      // Initialize with real conversation
      const initialMessages: ChatMessage[] = [
        {
          id: '1',
          sender: 'trainer',
          senderName: 'مربی احمدی',
          message: 'سلام و وقت بخیر! امیدوارم حالتون خوب باشه. چطور پیش میره؟',
          timestamp: Date.now() - 3600000,
          isRead: true,
          type: 'text'
        },
        {
          id: '2',
          sender: 'student',
          senderName: 'شما',
          message: 'سلام مربی، حالم خوبه ممنون. در مورد برنامه تمرینی امروز سوال داشتم',
          timestamp: Date.now() - 3500000,
          isRead: true,
          type: 'text'
        },
        {
          id: '3',
          sender: 'trainer',
          senderName: 'مربی احمدی',
          message: 'البته، خوشحال میشم کمکتون کنم. سوالتون رو بپرسید',
          timestamp: Date.now() - 3400000,
          isRead: true,
          type: 'text',
          reactions: ['👍', '💪']
        }
      ];
      setMessages(initialMessages);
      setLocalStorageItem('studentSupportMessages', initialMessages);
    } else {
      setMessages(savedMessages);
    }

    if (savedTickets.length === 0) {
      // Initialize with real tickets
      const initialTickets: SupportTicket[] = [
        {
          id: '1',
          subject: 'درخواست تغییر برنامه تمرینی',
          category: 'exercise',
          status: 'in_progress',
          priority: 'medium',
          createdAt: Date.now() - 86400000,
          lastUpdate: Date.now() - 3600000,
          description: 'میخواهم برنامه تمرینی هفته آینده رو تغییر بدم',
          responses: 2
        },
        {
          id: '2',
          subject: 'سوال در مورد رژیم غذایی',
          category: 'diet',
          status: 'resolved',
          priority: 'low',
          createdAt: Date.now() - 172800000,
          lastUpdate: Date.now() - 86400000,
          description: 'آیا میتونم غذاهای خاصی رو به رژیمم اضافه کنم؟',
          responses: 5
        }
      ];
      setTickets(initialTickets);
      setLocalStorageItem('studentSupportTickets', initialTickets);
    } else {
      setTickets(savedTickets);
    }
  };

  const simulateTrainerActivity = () => {
    // Simulate trainer online status
    const interval = setInterval(() => {
      setTrainerOnline(Math.random() > 0.3);
    }, 30000);

    return () => clearInterval(interval);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'student',
      senderName: 'شما',
      message: newMessage,
      timestamp: Date.now(),
      isRead: true,
      type: 'text'
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setLocalStorageItem('studentSupportMessages', updatedMessages);
    setNewMessage('');

    // Simulate trainer typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Auto-reply simulation
      if (Math.random() > 0.5) {
        const trainerReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'trainer',
          senderName: 'مربی احمدی',
          message: 'ممنون از پیامتون، به زودی پاسخ کاملی براتون ارسال میکنم.',
          timestamp: Date.now() + 2000,
          isRead: false,
          type: 'text'
        };
        const newMessages = [...updatedMessages, trainerReply];
        setMessages(newMessages);
        setLocalStorageItem('studentSupportMessages', newMessages);
      }
    }, 3000);
  };

  const handleCreateTicket = () => {
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;

    const ticket: SupportTicket = {
      id: Date.now().toString(),
      subject: newTicketSubject,
      category: selectedCategory,
      status: 'open',
      priority: selectedPriority,
      createdAt: Date.now(),
      lastUpdate: Date.now(),
      description: newTicketMessage,
      responses: 0
    };

    const updatedTickets = [...tickets, ticket];
    setTickets(updatedTickets);
    setLocalStorageItem('studentSupportTickets', updatedTickets);
    
    setNewTicketSubject('');
    setNewTicketMessage('');
    setActiveView('tickets');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-gradient-to-r from-orange-500 to-amber-500';
      case 'in_progress': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'resolved': return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      case 'closed': return 'bg-gradient-to-r from-gray-500 to-slate-500';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'باز';
      case 'in_progress': return 'در حال بررسی';
      case 'resolved': return 'حل شده';
      case 'closed': return 'بسته شده';
      default: return 'نامشخص';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'high': return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'medium': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'low': return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
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

  const containerPadding = deviceInfo.isMobile ? "p-2" : deviceInfo.isTablet ? "p-4" : "p-6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40", containerPadding)}
      dir="rtl"
    >
      {/* Modern Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-gradient-to-l from-emerald-500/10 via-sky-500/5 to-purple-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-l from-emerald-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
                  پشتیبانی و ارتباط
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  ارتباط مستقیم با مربی و دریافت راهنمایی
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={cn(
              "px-3 py-1.5 text-xs font-medium",
              trainerOnline 
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" 
                : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
            )}>
              {trainerOnline ? 'مربی آنلاین' : 'مربی آفلاین'}
            </Badge>
            <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50">
              <Phone className="w-4 h-4 ml-2" />
              تماس مستقیم
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >
        {[
          { icon: MessageCircle, label: 'پیام‌های ارسالی', value: messages.length, gradient: 'from-emerald-500 to-teal-500' },
          { icon: HelpCircle, label: 'تیکت‌های فعال', value: tickets.filter(t => t.status !== 'closed').length, gradient: 'from-sky-500 to-blue-500' },
          { icon: Clock, label: 'زمان پاسخ متوسط', value: '۲', suffix: 'ساعت', gradient: 'from-purple-500 to-pink-500' },
          { icon: Star, label: 'رضایت از پشتیبانی', value: '۹۸', suffix: '%', gradient: 'from-orange-500 to-red-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br", stat.gradient, "flex items-center justify-center shadow-lg")}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {toPersianNumbers(stat.value.toString())}{stat.suffix || ''}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {[
          { id: 'chat', label: 'گفتگوی آنلاین', icon: MessageCircle },
          { id: 'tickets', label: 'تیکت‌های پشتیبانی', icon: HelpCircle },
          { id: 'create', label: 'ایجاد تیکت جدید', icon: Plus }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeView === tab.id ? "default" : "outline"}
            onClick={() => setActiveView(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
              activeView === tab.id 
                ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg" 
                : "border-gray-200 hover:bg-emerald-50 hover:border-emerald-200"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </Button>
        ))}
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeView === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-4 gap-6"
          >
            {/* Chat Area */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm h-[600px] flex flex-col">
                <CardHeader className="border-b bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder-trainer.jpg" />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white font-bold">
                          مربی
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">مربی احمدی</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <div className={cn("w-2 h-2 rounded-full", trainerOnline ? "bg-emerald-500" : "bg-gray-400")} />
                          {trainerOnline ? 'آنلاین' : 'آفلاین'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className={cn("flex", message.sender === 'student' ? 'justify-end' : 'justify-start')}
                      >
                        <div className={cn(
                          "max-w-[75%] p-4 rounded-2xl shadow-sm",
                          message.sender === 'student'
                            ? 'bg-gradient-to-l from-emerald-500 to-sky-500 text-white rounded-br-md'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border rounded-bl-md'
                        )}>
                          <p className="text-sm leading-relaxed">{message.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className={cn(
                              "text-xs",
                              message.sender === 'student' ? 'text-white/80' : 'text-muted-foreground'
                            )}>
                              {formatTime(message.timestamp)}
                            </p>
                            {message.reactions && (
                              <div className="flex gap-1">
                                {message.reactions.map((reaction, i) => (
                                  <span key={i} className="text-xs">{reaction}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl rounded-bl-md">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex gap-3">
                    <Input
                      placeholder="پیام خود را تایپ کنید..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white px-6"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Chat Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <h3 className="font-bold text-gray-900 dark:text-white">راهنمای سریع</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'برای پاسخ سریع‌تر، سوالات خود را واضح و مشخص بپرسید',
                    'در صورت فوریت، از تماس تلفنی استفاده کنید',
                    'تصاویر و فایل‌ها را مستقیماً در چت ارسال کنید'
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{toPersianNumbers((index + 1).toString())}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeView === 'tickets' && (
          <motion.div
            key="tickets"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {tickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{ticket.subject}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={cn("text-white text-xs px-2 py-1", getStatusColor(ticket.status))}>
                              {getStatusText(ticket.status)}
                            </Badge>
                            <Badge className={cn("text-white text-xs px-2 py-1", getPriorityColor(ticket.priority))}>
                              {ticket.priority === 'urgent' ? 'فوری' : 
                               ticket.priority === 'high' ? 'بالا' :
                               ticket.priority === 'medium' ? 'متوسط' : 'پایین'}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {ticket.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>ایجاد: {formatTime(ticket.createdAt)}</span>
                        <span>{toPersianNumbers(ticket.responses.toString())} پاسخ</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">ایجاد تیکت جدید</h3>
                  <p className="text-sm text-muted-foreground">سوال یا مشکل خود را با جزئیات کامل شرح دهید</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">دسته‌بندی</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {supportCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category.id)}
                            className={cn(
                              "h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300",
                              selectedCategory === category.id 
                                ? `bg-gradient-to-br ${category.color} text-white shadow-lg` 
                                : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            )}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs font-medium text-center leading-tight">{category.name}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">اولویت</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { value: 'low', label: 'پایین', color: 'from-emerald-500 to-teal-500' },
                        { value: 'medium', label: 'متوسط', color: 'from-blue-500 to-cyan-500' },
                        { value: 'high', label: 'بالا', color: 'from-orange-500 to-red-500' },
                        { value: 'urgent', label: 'فوری', color: 'from-red-500 to-pink-500' }
                      ].map((priority) => (
                        <Button
                          key={priority.value}
                          variant={selectedPriority === priority.value ? "default" : "outline"}
                          onClick={() => setSelectedPriority(priority.value as any)}
                          className={cn(
                            "transition-all duration-300",
                            selectedPriority === priority.value 
                              ? `bg-gradient-to-r ${priority.color} text-white shadow-lg` 
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          {priority.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">موضوع</label>
                    <Input
                      placeholder="موضوع تیکت را به‌طور خلاصه بنویسید..."
                      value={newTicketSubject}
                      onChange={(e) => setNewTicketSubject(e.target.value)}
                      className="border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">توضیحات کامل</label>
                    <Textarea
                      placeholder="مشکل یا سوال خود را با جزئیات کامل شرح دهید..."
                      value={newTicketMessage}
                      onChange={(e) => setNewTicketMessage(e.target.value)}
                      rows={6}
                      className="border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 resize-none"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      onClick={handleCreateTicket}
                      disabled={!newTicketSubject.trim() || !newTicketMessage.trim()}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white py-3"
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      ایجاد تیکت
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setNewTicketSubject('');
                        setNewTicketMessage('');
                        setSelectedCategory('general');
                        setSelectedPriority('medium');
                      }}
                      className="border-gray-200 hover:bg-gray-50"
                    >
                      پاک کردن فرم
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentSupport;

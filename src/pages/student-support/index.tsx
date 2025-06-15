
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, Send, Phone, Mail, Clock, 
  CheckCircle, AlertCircle, HelpCircle, User,
  Plus, Search, Filter
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

const supportCategories = [
  { id: 'general', name: 'سوال عمومی', icon: HelpCircle, color: 'blue' },
  { id: 'exercise', name: 'تمرینات', icon: User, color: 'emerald' },
  { id: 'diet', name: 'تغذیه', icon: User, color: 'orange' },
  { id: 'supplements', name: 'مکمل‌ها', icon: User, color: 'purple' },
  { id: 'technical', name: 'مشکل فنی', icon: AlertCircle, color: 'red' }
];

const messages = [
  {
    id: 1,
    sender: 'trainer',
    senderName: 'مربی احمدی',
    message: 'سلام! چطور پیش میره؟ تمرین امروز رو انجام دادید؟',
    time: '۱۰:۳۰',
    date: 'امروز',
    isRead: true
  },
  {
    id: 2,
    sender: 'student',
    senderName: 'شما',
    message: 'سلام مربی، بله تمرین رو انجام دادم ولی در مورد تمرین اسکوات سوال داشتم',
    time: '۱۰:۴۵',
    date: 'امروز',
    isRead: true
  },
  {
    id: 3,
    sender: 'trainer',
    senderName: 'مربی احمدی',
    message: 'عالی! سوالتون رو بپرسید، خوشحال میشم کمکتون کنم',
    time: '۱۰:۴۶',
    date: 'امروز',
    isRead: true
  },
  {
    id: 4,
    sender: 'student',
    senderName: 'شما',
    message: 'وقتی اسکوات انجام میدم احساس میکنم فرم حرکتم درست نیست. راهنمایی کنید لطفاً',
    time: '۱۰:۵۰',
    date: 'امروز',
    isRead: true
  }
];

const tickets = [
  {
    id: 1,
    subject: 'مشکل در ثبت وزن',
    category: 'technical',
    status: 'open',
    priority: 'medium',
    createdAt: '۱۴۰۳/۰۹/۱۵',
    lastUpdate: '۲ ساعت پیش'
  },
  {
    id: 2,
    subject: 'سوال در مورد رژیم غذایی',
    category: 'diet',
    status: 'answered',
    priority: 'low',
    createdAt: '۱۴۰۳/۰۹/۱۲',
    lastUpdate: 'دیروز'
  },
  {
    id: 3,
    subject: 'درخواست تغییر برنامه تمرینی',
    category: 'exercise',
    status: 'closed',
    priority: 'high',
    createdAt: '۱۴۰۳/۰۹/۱۰',
    lastUpdate: '۳ روز پیش'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'orange';
    case 'answered': return 'blue';
    case 'closed': return 'green';
    default: return 'gray';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'open': return 'باز';
    case 'answered': return 'پاسخ داده شده';
    case 'closed': return 'بسته شده';
    default: return 'نامشخص';
  }
};

const StudentSupport = () => {
  const [newMessage, setNewMessage] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [activeTab, setActiveTab] = useState('chat');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Send message logic here
      setNewMessage('');
    }
  };

  const handleCreateTicket = () => {
    if (newTicketSubject.trim() && newTicketMessage.trim()) {
      // Create ticket logic here
      setNewTicketSubject('');
      setNewTicketMessage('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-2">
              پشتیبانی و ارتباط
            </h1>
            <p className="text-lg text-muted-foreground">
              ارتباط با مربی و دریافت راهنمایی
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              تماس مستقیم
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              ایمیل
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("24")}
                </p>
                <p className="text-sm text-muted-foreground">پیام‌های ارسالی</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("3")}
                </p>
                <p className="text-sm text-muted-foreground">تیکت‌های فعال</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("2")}h
                </p>
                <p className="text-sm text-muted-foreground">زمان پاسخ متوسط</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white">
                      مربی
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">مربی احمدی</h3>
                    <p className="text-sm text-muted-foreground">آنلاین</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  فعال
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-3 rounded-xl ${
                    message.sender === 'student'
                      ? 'bg-gradient-to-l from-emerald-500 to-sky-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'student' ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      {toPersianNumbers(message.time)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="پیام خود را تایپ کنید..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-l from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Create New Ticket */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-white" />
                </div>
                ایجاد تیکت جدید
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">دسته‌بندی</label>
                <div className="grid grid-cols-2 gap-2">
                  {supportCategories.slice(0, 4).map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`justify-start ${
                          selectedCategory === category.id 
                            ? `bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 text-white` 
                            : ''
                        }`}
                      >
                        <Icon className="w-3 h-3 ml-2" />
                        {category.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">موضوع</label>
                <Input
                  placeholder="موضوع تیکت..."
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">توضیحات</label>
                <Textarea
                  placeholder="توضیحات کامل..."
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  rows={3}
                />
              </div>
              
              <Button 
                onClick={handleCreateTicket}
                className="w-full bg-gradient-to-l from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white"
              >
                ایجاد تیکت
              </Button>
            </CardContent>
          </Card>

          {/* Recent Tickets */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <HelpCircle className="h-4 w-4 text-white" />
                </div>
                تیکت‌های اخیر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{ticket.subject}</h4>
                      <Badge 
                        className={`bg-${getStatusColor(ticket.status)}-100 text-${getStatusColor(ticket.status)}-700 dark:bg-${getStatusColor(ticket.status)}-900/30 dark:text-${getStatusColor(ticket.status)}-300 text-xs`}
                      >
                        {getStatusText(ticket.status)}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>ایجاد: {toPersianNumbers(ticket.createdAt)}</p>
                      <p>آخرین بروزرسانی: {ticket.lastUpdate}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentSupport;

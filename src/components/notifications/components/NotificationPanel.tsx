
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info,
  Trash2,
  MarkAsRead,
  Settings,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { NotificationData } from '../types/notification';
import { useNotifications } from '../context/NotificationContext';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { cn } from '@/lib/utils';

const typeConfig = {
  success: {
    icon: CheckCircle,
    colors: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20',
    border: 'border-emerald-200/50 dark:border-emerald-800/50',
    iconColors: 'from-emerald-500 to-emerald-600',
    textColor: 'text-emerald-800 dark:text-emerald-200',
    label: 'موفقیت'
  },
  error: {
    icon: AlertCircle,
    colors: 'from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20',
    border: 'border-red-200/50 dark:border-red-800/50',
    iconColors: 'from-red-500 to-red-600',
    textColor: 'text-red-800 dark:text-red-200',
    label: 'خطا'
  },
  warning: {
    icon: AlertTriangle,
    colors: 'from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20',
    border: 'border-amber-200/50 dark:border-amber-800/50',
    iconColors: 'from-amber-500 to-amber-600',
    textColor: 'text-amber-800 dark:text-amber-200',
    label: 'هشدار'
  },
  info: {
    icon: Info,
    colors: 'from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/20',
    border: 'border-sky-200/50 dark:border-sky-800/50',
    iconColors: 'from-sky-500 to-sky-600',
    textColor: 'text-sky-800 dark:text-sky-200',
    label: 'اطلاعات'
  }
};

interface NotificationItemProps {
  notification: NotificationData;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead, 
  onRemove 
}) => {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative bg-gradient-to-br backdrop-blur-xl rounded-2xl shadow-lg border-2 overflow-hidden",
        config.colors,
        config.border,
        !notification.read && "ring-2 ring-emerald-200 dark:ring-emerald-800"
      )}
      dir="rtl"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* آیکون */}
          <div className={cn(
            "p-3 bg-gradient-to-r rounded-xl shadow-lg flex-shrink-0",
            config.iconColors
          )}>
            <Icon className="w-5 h-5 text-white" />
          </div>

          {/* محتوا */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={cn("text-lg font-bold", config.textColor)}>
                {notification.title}
              </h3>
              
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <Badge className="bg-emerald-500 text-white text-xs px-2 py-1">
                    جدید
                  </Badge>
                )}
                
                {notification.urgent && (
                  <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                    فوری
                  </Badge>
                )}
              </div>
            </div>
            
            {notification.description && (
              <p className={cn("text-sm opacity-80 mb-4", config.textColor)}>
                {notification.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="text-xs opacity-60">
                {toPersianNumbers(notification.timestamp.toLocaleDateString('fa-IR'))} - {' '}
                {toPersianNumbers(notification.timestamp.toLocaleTimeString('fa-IR', {
                  hour: '2-digit',
                  minute: '2-digit'
                }))}
              </div>

              <div className="flex items-center gap-2">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarkAsRead(notification.id)}
                    className="h-8 px-3 text-xs hover:bg-white/20 dark:hover:bg-slate-800/20"
                  >
                    <MarkAsRead className="w-3 h-3 ml-1" />
                    خوانده شد
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(notification.id)}
                  className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* نشانگر نوع */}
      <div className={cn(
        "absolute top-0 right-0 w-1 h-full bg-gradient-to-b",
        config.iconColors
      )} />
    </motion.div>
  );
};

export const NotificationPanel: React.FC = () => {
  const { 
    notifications, 
    markAsRead, 
    removeNotification, 
    clearAll, 
    unreadCount 
  } = useNotifications();
  
  const [filter, setFilter] = useState<'all' | 'unread' | 'success' | 'error' | 'warning' | 'info'>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  return (
    <div className="w-full max-w-4xl mx-auto" dir="rtl">
      {/* هدر */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-xl shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                اعلانات و پیام‌ها
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                مدیریت اعلانات سیستم
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <Badge className="bg-emerald-500 text-white px-3 py-1">
                {toPersianNumbers(unreadCount)} خوانده نشده
              </Badge>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="h-10 px-4"
            >
              <Trash2 className="w-4 h-4 ml-2" />
              پاک کردن همه
            </Button>
          </div>
        </div>

        {/* فیلترها */}
        <div className="flex items-center gap-2 mt-6">
          <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm text-slate-600 dark:text-slate-400 ml-3">فیلتر:</span>
          
          {([
            { key: 'all', label: 'همه' },
            { key: 'unread', label: 'خوانده نشده' },
            { key: 'success', label: 'موفقیت' },
            { key: 'error', label: 'خطا' },
            { key: 'warning', label: 'هشدار' },
            { key: 'info', label: 'اطلاعات' }
          ] as const).map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(key)}
              className={cn(
                "h-8 px-3 text-xs",
                filter === key && "bg-gradient-to-r from-emerald-500 to-sky-600 text-white"
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* لیست اعلانات */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onRemove={removeNotification}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Bell className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                اعلانی موجود نیست
              </h3>
              <p className="text-slate-500 dark:text-slate-500">
                هنوز هیچ اعلانی دریافت نکرده‌اید
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

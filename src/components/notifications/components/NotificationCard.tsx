
import React from "react";
import { motion } from "framer-motion";
import { Check, Trash2, Clock, AlertTriangle, Info, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationType } from "../types/notificationTypes";
import { formatDistanceToNow } from "date-fns-jalali";

interface NotificationCardProps {
  notification: NotificationType;
  index: number;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const typeConfig = {
  info: {
    icon: Info,
    gradient: "from-blue-500 to-sky-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800"
  },
  success: {
    icon: CheckCircle,
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800"
  },
  warning: {
    icon: AlertTriangle,
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800"
  },
  error: {
    icon: AlertTriangle,
    gradient: "from-red-500 to-rose-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800"
  },
  system: {
    icon: Star,
    gradient: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-200 dark:border-purple-800"
  }
};

export const NotificationCard = ({ notification, index, onMarkAsRead, onDelete }: NotificationCardProps) => {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`
        relative overflow-hidden rounded-2xl border-2 ${config.borderColor} ${config.bgColor}
        ${!notification.isRead ? 'shadow-lg' : 'opacity-70'}
        transition-all duration-300 hover:shadow-xl
      `}
    >
      {/* نشان خوانده‌نشده */}
      {!notification.isRead && (
        <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      )}

      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-4">
          {/* آیکون */}
          <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* محتوا */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${!notification.isRead ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                  {notification.title}
                </h3>
                <p className={`mt-2 text-base leading-relaxed ${!notification.isRead ? 'text-slate-700 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                  {notification.message}
                </p>
                
                {/* زمان */}
                <div className="flex items-center gap-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{formatDistanceToNow(notification.createdAt, { addSuffix: true })}</span>
                </div>
              </div>

              {/* اکشن‌ها */}
              <div className="flex items-center gap-2">
                {!notification.isRead && (
                  <Button
                    onClick={() => onMarkAsRead(notification.id)}
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                
                <Button
                  onClick={() => onDelete(notification.id)}
                  size="sm"
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* افکت نور برای نوتیفیکشن‌های خوانده‌نشده */}
      {!notification.isRead && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              "0 0 0 rgba(16, 185, 129, 0.1)",
              "0 0 20px rgba(16, 185, 129, 0.2)",
              "0 0 0 rgba(16, 185, 129, 0.1)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

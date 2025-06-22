
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationData } from '../types/notification';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { cn } from '@/lib/utils';

interface ModernToastProps {
  notification: NotificationData;
  onDismiss: (id: string) => void;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    colors: 'from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20',
    border: 'border-emerald-200/50 dark:border-emerald-800/50',
    iconColors: 'from-emerald-500 to-emerald-600',
    textColor: 'text-emerald-800 dark:text-emerald-200'
  },
  error: {
    icon: AlertCircle,
    colors: 'from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20',
    border: 'border-red-200/50 dark:border-red-800/50',
    iconColors: 'from-red-500 to-red-600',
    textColor: 'text-red-800 dark:text-red-200'
  },
  warning: {
    icon: AlertTriangle,
    colors: 'from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20',
    border: 'border-amber-200/50 dark:border-amber-800/50',
    iconColors: 'from-amber-500 to-amber-600',
    textColor: 'text-amber-800 dark:text-amber-200'
  },
  info: {
    icon: Info,
    colors: 'from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/20',
    border: 'border-sky-200/50 dark:border-sky-800/50',
    iconColors: 'from-sky-500 to-sky-600',
    textColor: 'text-sky-800 dark:text-sky-200'
  }
};

export const ModernToast: React.FC<ModernToastProps> = ({ notification, onDismiss }) => {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative bg-gradient-to-br backdrop-blur-xl rounded-2xl shadow-2xl border-2 overflow-hidden max-w-md w-full",
        config.colors,
        config.border
      )}
      dir="rtl"
    >
      {/* تأثیرات پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br opacity-20 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-tl opacity-15 rounded-full blur-lg" />
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-start gap-4">
          {/* آیکون */}
          <motion.div 
            className={cn(
              "p-3 bg-gradient-to-r rounded-xl shadow-lg flex-shrink-0",
              config.iconColors
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* محتوا */}
          <div className="flex-1 min-w-0">
            <motion.h3 
              className={cn("text-lg font-bold mb-2", config.textColor)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {notification.title}
            </motion.h3>
            
            {notification.description && (
              <motion.p 
                className={cn("text-sm opacity-80 mb-4", config.textColor)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {notification.description}
              </motion.p>
            )}

            {/* زمان */}
            <motion.div 
              className="text-xs opacity-60 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {toPersianNumbers(notification.timestamp.toLocaleTimeString('fa-IR', {
                hour: '2-digit',
                minute: '2-digit'
              }))}
            </motion.div>

            {/* اکشن‌ها */}
            {notification.actions && notification.actions.length > 0 && (
              <motion.div 
                className="flex gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {notification.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant === 'primary' ? 'default' : 'outline'}
                    size="sm"
                    onClick={action.action}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>

          {/* دکمه بستن */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(notification.id)}
            className="h-8 w-8 p-0 rounded-xl hover:bg-white/20 dark:hover:bg-slate-800/20 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
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

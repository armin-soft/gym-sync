
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Trash2, 
  ChevronDown,
  Tag,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Message } from "../types";

interface MessageCardProps {
  message: Message;
  onMarkAsRead: (messageId: string) => void;
  onDeleteMessage: (messageId: string) => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onMarkAsRead,
  onDeleteMessage
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const deviceInfo = useDeviceInfo();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'فوری';
      case 'high': return 'بالا';
      case 'medium': return 'متوسط';
      default: return 'کم';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'technical': return 'فنی';
      case 'program': return 'برنامه تمرینی';
      case 'diet': return 'تغذیه';
      case 'payment': return 'مالی';
      default: return 'عمومی';
    }
  };

  const formatDate = (date: Date) => {
    const messageDate = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'همین الان';
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`;
    if (diffInHours < 48) return 'دیروز';
    
    return messageDate.toLocaleDateString('fa-IR');
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-5";
    return "p-6";
  };

  return (
    <motion.div
      layout
      className={cn(
        "relative rounded-xl border shadow-sm transition-all duration-200 overflow-hidden",
        message.isRead 
          ? "bg-white/60 border-gray-200/50" 
          : "bg-gradient-to-br from-emerald-50/80 to-sky-50/60 border-emerald-200/50 shadow-md",
        getCardPadding()
      )}
      dir="rtl"
    >
      {/* نشانگر خوانده نشده */}
      {!message.isRead && (
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-sky-500" />
      )}

      <div className="space-y-4">
        {/* هدر پیام */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={cn(
              "rounded-full overflow-hidden border-2 border-white shadow-sm",
              deviceInfo.isMobile ? "w-10 h-10" : "w-12 h-12"
            )}>
              {message.studentImage ? (
                <img 
                  src={message.studentImage} 
                  alt={message.studentName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center">
                  <User className={cn(
                    "text-white",
                    deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6"
                  )} />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 text-right">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className={cn(
                  "font-semibold text-gray-800 truncate",
                  deviceInfo.isMobile ? "text-sm" : "text-base"
                )}>
                  {message.studentName}
                </h3>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              </div>

              <h4 className={cn(
                "font-medium text-gray-700 mb-2",
                deviceInfo.isMobile ? "text-sm" : "text-base"
              )}>
                {message.subject}
              </h4>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-white text-xs",
                    getPriorityColor(message.priority)
                  )}
                >
                  <AlertTriangle className="w-3 h-3 ml-1" />
                  {getPriorityText(message.priority)}
                </Badge>
                
                <Badge variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 ml-1" />
                  {getCategoryText(message.category)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!message.isRead && (
              <Button
                onClick={() => onMarkAsRead(message.id)}
                size="sm"
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              size="sm"
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </Button>
          </div>
        </div>

        {/* محتوای کامل پیام */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-200/50">
                <div className="bg-gray-50/50 rounded-lg p-4 mb-4">
                  <p className={cn(
                    "text-gray-700 leading-relaxed whitespace-pre-wrap text-right",
                    deviceInfo.isMobile ? "text-sm" : "text-base"
                  )}>
                    {message.content}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>ارسال شده در: {new Date(message.createdAt).toLocaleString('fa-IR')}</span>
                  </div>

                  <Button
                    onClick={() => onDeleteMessage(message.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 ml-1" />
                    حذف
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

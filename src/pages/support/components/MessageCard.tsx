
import React, { useState } from "react";
import { User, Clock, MessageSquare, Reply, Check, AlertCircle } from "lucide-react";
import { SupportMessage } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MessageCardProps {
  message: SupportMessage;
  onMarkAsRead: (messageId: string) => void;
  onReply: (messageId: string, reply: string) => void;
}

export function MessageCard({ message, onMarkAsRead, onReply }: MessageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const deviceInfo = useDeviceInfo();

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${convertToFarsiNumbers(minutes)} دقیقه پیش`;
    } else if (hours < 24) {
      return `${convertToFarsiNumbers(hours)} ساعت پیش`;
    } else {
      return `${convertToFarsiNumbers(days)} روز پیش`;
    }
  };

  const convertToFarsiNumbers = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-600 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "low": return "bg-green-100 text-green-600 border-green-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "فوری";
      case "medium": return "متوسط";
      case "low": return "عادی";
      default: return "نامشخص";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread": return "bg-red-500";
      case "read": return "bg-blue-500";
      case "replied": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "unread": return "خوانده نشده";
      case "read": return "خوانده شده";
      case "replied": return "پاسخ داده شده";
      default: return "نامشخص";
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(message.id, replyText);
      setReplyText("");
      setIsReplying(false);
    }
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-5";
    return "p-6";
  };

  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300",
      message.status === "unread" ? "border-r-4 border-r-red-500" : "",
      getCardPadding()
    )} dir="rtl">
      {/* هدر کارت */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-full flex items-center justify-center">
            {message.studentImage ? (
              <img 
                src={message.studentImage} 
                alt={message.studentName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          
          <div className="text-right">
            <h3 className="font-semibold text-gray-800">{message.studentName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{formatTimeAgo(message.timestamp)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium border",
            getPriorityColor(message.priority)
          )}>
            {getPriorityLabel(message.priority)}
          </span>
          
          <div className="flex items-center gap-1">
            <div className={cn("w-2 h-2 rounded-full", getStatusColor(message.status))}></div>
            <span className="text-xs text-gray-500">{getStatusLabel(message.status)}</span>
          </div>
        </div>
      </div>

      {/* موضوع پیام */}
      <h4 className="font-medium text-gray-800 mb-3 text-right">{message.subject}</h4>

      {/* متن پیام */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className={cn(
          "text-gray-700 text-right leading-relaxed",
          !isExpanded && message.message.length > 150 ? "line-clamp-3" : ""
        )}>
          {isExpanded ? message.message : message.message.substring(0, 150)}
          {!isExpanded && message.message.length > 150 && "..."}
        </p>
        
        {message.message.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-emerald-600 text-sm mt-2 hover:underline"
          >
            {isExpanded ? "کمتر نمایش بده" : "بیشتر نمایش بده"}
          </button>
        )}
      </div>

      {/* پاسخ قبلی */}
      {message.reply && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Reply className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">پاسخ شما:</span>
          </div>
          <p className="text-gray-700 text-right text-sm">{message.reply}</p>
        </div>
      )}

      {/* اکشن‌ها */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {message.status === "unread" && (
            <button
              onClick={() => onMarkAsRead(message.id)}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              <Check className="w-4 h-4" />
              علامت‌گذاری به عنوان خوانده شده
            </button>
          )}
          
          {!isReplying && message.status !== "replied" && (
            <button
              onClick={() => setIsReplying(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors text-sm"
            >
              <Reply className="w-4 h-4" />
              پاسخ دادن
            </button>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          کد پیام: {message.id}
        </div>
      </div>

      {/* فرم پاسخ */}
      {isReplying && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="پاسخ خود را اینجا بنویسید..."
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-right"
            rows={4}
            dir="rtl"
          />
          
          <div className="flex items-center gap-2 mt-3" dir="rtl">
            <button
              onClick={handleReply}
              disabled={!replyText.trim()}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-sky-600 text-white rounded-lg hover:from-emerald-700 hover:to-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              ارسال پاسخ
            </button>
            <button
              onClick={() => {
                setIsReplying(false);
                setReplyText("");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              انصراف
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

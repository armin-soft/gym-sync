
import React, { useState } from "react";
import { Clock, MessageSquare, CheckCircle, Reply, User } from "lucide-react";
import { SupportMessage } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MessageCardProps {
  message: SupportMessage;
  onMarkAsRead: (messageId: string) => void;
  onReply: (messageId: string, reply: string) => void;
}

export function MessageCard({ message, onMarkAsRead, onReply }: MessageCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const deviceInfo = useDeviceInfo();

  const convertToFarsiNumbers = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const persianDate = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
    return convertToFarsiNumbers(persianDate);
  };

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(message.id, replyText);
      setReplyText("");
      setIsReplying(false);
    }
  };

  const getStatusColor = () => {
    switch (message.status) {
      case "unread": return "text-purple-600 bg-purple-50";
      case "read": return "text-indigo-600 bg-indigo-50";
      case "replied": return "text-indigo-600 bg-indigo-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusLabel = () => {
    switch (message.status) {
      case "unread": return "خوانده نشده";
      case "read": return "خوانده شده";
      case "replied": return "پاسخ داده شده";
      default: return "نامشخص";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300" dir="rtl">
      {/* هدر کارت */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{message.studentName}</h3>
              <p className="text-sm text-gray-500">{formatDate(message.timestamp)}</p>
            </div>
          </div>
          
          <div className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor())}>
            {getStatusLabel()}
          </div>
        </div>
        
        <h4 className="font-medium text-gray-800 mb-2">{message.subject}</h4>
      </div>

      {/* محتوای پیام */}
      <div className="p-4">
        <p className="text-gray-700 leading-relaxed mb-4">{message.message}</p>
        
        {/* پاسخ قبلی */}
        {message.reply && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Reply className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-800">پاسخ شما:</span>
            </div>
            <p className="text-indigo-700 text-sm">{message.reply}</p>
          </div>
        )}

        {/* فرم پاسخ */}
        {isReplying && (
          <div className="space-y-3 mb-4">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="پاسخ خود را بنویسید..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={3}
              dir="rtl"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsReplying(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ارسال پاسخ
              </button>
            </div>
          </div>
        )}

        {/* دکمه‌های عملیات */}
        <div className="flex gap-2 justify-end">
          {message.status === "unread" && (
            <button
              onClick={() => onMarkAsRead(message.id)}
              className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">علامت‌گذاری به عنوان خوانده شده</span>
            </button>
          )}
          
          {!isReplying && (
            <button
              onClick={() => setIsReplying(true)}
              className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Reply className="w-4 h-4" />
              <span className="text-sm">پاسخ</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


import React, { useState } from "react";
import { SupportTicket } from "../types";
import { Clock, User, AlertCircle, CheckCircle, MessageSquare, Phone, Mail } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TicketCardProps {
  ticket: SupportTicket;
  onStatusChange: (ticketId: string, status: SupportTicket['status']) => void;
  onAddResponse: (ticketId: string, response: string) => void;
  studentInfo?: any;
}

export function TicketCard({ ticket, onStatusChange, onAddResponse, studentInfo }: TicketCardProps) {
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
      case "urgent": return "bg-red-100 text-red-700 border-red-200";
      case "high": return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent": return "فوق‌العاده";
      case "high": return "بالا";
      case "medium": return "متوسط";
      case "low": return "پایین";
      default: return "نامشخص";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-500";
      case "in_progress": return "bg-blue-500";
      case "resolved": return "bg-green-500";
      case "closed": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open": return "باز";
      case "in_progress": return "در حال بررسی";
      case "resolved": return "حل شده";
      case "closed": return "بسته شده";
      default: return "نامشخص";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "exercise": return "تمرین";
      case "diet": return "رژیم غذایی";
      case "supplement": return "مکمل";
      case "consultation": return "مشاوره";
      case "technical": return "فنی";
      case "payment": return "پرداخت";
      case "other": return "سایر";
      default: return "نامشخص";
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      onAddResponse(ticket.id, replyText);
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
      ticket.status === "open" ? "border-r-4 border-r-red-500" : "",
      getCardPadding()
    )} dir="rtl">
      {/* هدر تیکت */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-full flex items-center justify-center">
            {studentInfo?.image ? (
              <img 
                src={studentInfo.image} 
                alt={studentInfo.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          
          <div className="text-right">
            <h3 className="font-semibold text-gray-800">{ticket.studentName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">
                #{ticket.ticketNumber}
              </span>
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{formatTimeAgo(ticket.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
              {getPriorityLabel(ticket.priority)}
            </Badge>
            
            <div className="flex items-center gap-1">
              <div className={cn("w-2 h-2 rounded-full", getStatusColor(ticket.status))}></div>
              <span className="text-xs text-gray-500">{getStatusLabel(ticket.status)}</span>
            </div>
          </div>
          
          <Badge variant="secondary" className="text-xs">
            {getCategoryLabel(ticket.category)}
          </Badge>
        </div>
      </div>

      {/* اطلاعات تماس شاگرد */}
      {studentInfo && (
        <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          {studentInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{studentInfo.phone}</span>
            </div>
          )}
          {studentInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{studentInfo.email}</span>
            </div>
          )}
        </div>
      )}

      {/* موضوع تیکت */}
      <h4 className="font-medium text-gray-800 mb-3 text-right">{ticket.subject}</h4>

      {/* توضیحات */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className={cn(
          "text-gray-700 text-right leading-relaxed",
          !isExpanded && ticket.description.length > 200 ? "line-clamp-3" : ""
        )}>
          {isExpanded ? ticket.description : ticket.description.substring(0, 200)}
          {!isExpanded && ticket.description.length > 200 && "..."}
        </p>
        
        {ticket.description.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-emerald-600 text-sm mt-2 hover:underline"
          >
            {isExpanded ? "کمتر نمایش بده" : "بیشتر نمایش بده"}
          </button>
        )}
      </div>

      {/* پاسخ‌های قبلی */}
      {ticket.responses.length > 0 && (
        <div className="space-y-2 mb-4">
          <h5 className="font-medium text-gray-700 text-sm">پاسخ‌ها:</h5>
          {ticket.responses.slice(-2).map((response) => (
            <div
              key={response.id}
              className={cn(
                "p-3 rounded-lg text-sm",
                response.authorType === "trainer"
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-blue-50 border border-blue-200"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-xs">
                  {response.authorType === "trainer" ? "مربی" : "شاگرد"}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(response.timestamp)}
                </span>
              </div>
              <p className="text-gray-700 text-right">{response.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* اکشن‌ها */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {ticket.status !== "closed" && !isReplying && (
            <Button
              onClick={() => setIsReplying(true)}
              size="sm"
              className="bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              پاسخ دادن
            </Button>
          )}
          
          {ticket.status === "open" && (
            <Button
              onClick={() => onStatusChange(ticket.id, "in_progress")}
              variant="outline"
              size="sm"
            >
              شروع بررسی
            </Button>
          )}
          
          {ticket.status === "in_progress" && (
            <Button
              onClick={() => onStatusChange(ticket.id, "resolved")}
              variant="outline"
              size="sm"
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              حل شد
            </Button>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          آخرین بروزرسانی: {formatTimeAgo(ticket.updatedAt)}
        </div>
      </div>

      {/* فرم پاسخ */}
      {isReplying && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="پاسخ خود را اینجا بنویسید..."
            className="mb-3"
            rows={4}
            dir="rtl"
          />
          
          <div className="flex items-center gap-2" dir="rtl">
            <Button
              onClick={handleReply}
              disabled={!replyText.trim()}
              size="sm"
              className="bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700"
            >
              ارسال پاسخ
            </Button>
            <Button
              onClick={() => {
                setIsReplying(false);
                setReplyText("");
              }}
              variant="outline"
              size="sm"
            >
              انصراف
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

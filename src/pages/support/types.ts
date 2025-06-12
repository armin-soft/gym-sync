
export type MessageStatus = "unread" | "read" | "replied";
export type MessagePriority = "low" | "medium" | "high";
export type MessageCategory = "exercise" | "diet" | "supplement" | "consultation" | "technical" | "other";
export type MessageFilter = "all" | MessageStatus;

export interface SupportMessage {
  id: string;
  studentId: string;
  studentName: string;
  studentImage?: string;
  subject: string;
  message: string;
  timestamp: number;
  status: MessageStatus;
  priority: MessagePriority;
  category: MessageCategory;
  reply?: string;
  replyTimestamp?: number;
}

export interface SupportStats {
  totalMessages: number;
  unreadMessages: number;
  repliedMessages: number;
  todayMessages: number;
}

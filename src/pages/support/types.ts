
export interface Message {
  id: string;
  studentId: string;
  studentName: string;
  studentImage?: string;
  subject: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'program' | 'diet' | 'payment' | 'general';
}

export interface SupportStats {
  totalMessages: number;
  unreadMessages: number;
  todayMessages: number;
  urgentMessages: number;
}


export interface NotificationType {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "system";
  isRead: boolean;
  createdAt: Date;
}

export interface NotificationState {
  notifications: NotificationType[];
  unreadCount: number;
  activeTab: string;
}


export interface NotificationData {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
  read: boolean;
  urgent: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
}

export interface ToastOptions {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
}

export interface NotificationState {
  notifications: NotificationData[];
  toasts: NotificationData[];
}

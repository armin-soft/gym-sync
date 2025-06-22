
import { useNotifications as useNotificationsContext } from '@/components/notifications/context/NotificationContext';
import { ToastOptions } from '@/components/notifications/types/notification';

export const useNotifications = () => {
  return useNotificationsContext();
};

// Helper functions for quick toast usage
export const useToast = () => {
  const { showToast } = useNotificationsContext();

  const toast = {
    success: (title: string, description?: string) => 
      showToast({ title, description, type: 'success' }),
    
    error: (title: string, description?: string) => 
      showToast({ title, description, type: 'error' }),
      
    warning: (title: string, description?: string) => 
      showToast({ title, description, type: 'warning' }),
      
    info: (title: string, description?: string) => 
      showToast({ title, description, type: 'info' }),
      
    custom: (options: ToastOptions) => showToast(options)
  };

  return { toast, showToast };
};

// Backwards compatibility
export const toast = {
  success: (title: string, description?: string) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast({ title, description, type: 'success' });
    }
  },
  error: (title: string, description?: string) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast({ title, description, type: 'error' });
    }
  },
  warning: (title: string, description?: string) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast({ title, description, type: 'warning' });
    }
  },
  info: (title: string, description?: string) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast({ title, description, type: 'info' });
    }
  }
};

export const successToast = toast.success;
export const errorToast = toast.error;
export const warningToast = toast.warning;
export const infoToast = toast.info;

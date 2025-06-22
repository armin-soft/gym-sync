
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { NotificationData, NotificationState, ToastOptions } from '../types/notification';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface NotificationContextType {
  notifications: NotificationData[];
  toasts: NotificationData[];
  addNotification: (notification: Omit<NotificationData, 'id' | 'timestamp'>) => string;
  showToast: (options: ToastOptions) => string;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  dismissToast: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: NotificationData }
  | { type: 'ADD_TOAST'; payload: NotificationData }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'DISMISS_TOAST'; payload: string }
  | { type: 'CLEAR_ALL' };

const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    case 'DISMISS_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.payload)
      };
    case 'CLEAR_ALL':
      return {
        notifications: [],
        toasts: []
      };
    default:
      return state;
  }
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
    toasts: []
  });

  const addNotification = useCallback((notification: Omit<NotificationData, 'id' | 'timestamp'>) => {
    const id = generateId();
    const newNotification: NotificationData = {
      ...notification,
      id,
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
    return id;
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id = generateId();
    const toast: NotificationData = {
      id,
      title: options.title,
      description: options.description,
      type: options.type || 'info',
      timestamp: new Date(),
      read: false,
      urgent: false,
      actions: options.actions
    };
    
    dispatch({ type: 'ADD_TOAST', payload: toast });

    // Auto dismiss after duration
    if (!options.persistent) {
      const duration = options.duration || 5000;
      setTimeout(() => {
        dispatch({ type: 'DISMISS_TOAST', payload: id });
      }, duration);
    }

    return id;
  }, []);

  const markAsRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, []);

  const dismissToast = useCallback((id: string) => {
    dispatch({ type: 'DISMISS_TOAST', payload: id });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  const unreadCount = state.notifications.filter(n => !n.read).length;

  const value: NotificationContextType = {
    notifications: state.notifications,
    toasts: state.toasts,
    addNotification,
    showToast,
    markAsRead,
    removeNotification,
    dismissToast,
    clearAll,
    unreadCount
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

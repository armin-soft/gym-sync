
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ModernToast } from './ModernToast';
import { useNotifications } from '../context/NotificationContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useNotifications();

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md" dir="rtl">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ModernToast
            key={toast.id}
            notification={toast}
            onDismiss={dismissToast}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

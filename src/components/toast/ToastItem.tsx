
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { ToastType } from "./types";
import { useToastContext } from "./ToastProvider";
import { Button } from "@/components/ui/button";

interface ToastItemProps {
  toast: ToastType;
}

export const ToastItem = ({ toast }: ToastItemProps) => {
  const { dispatch } = useToastContext();

  const getToastIcon = () => {
    switch (toast.variant) {
      case "success":
        return <CheckCircle className="responsive-w-xs responsive-h-xs text-emerald-600" />;
      case "error":
        return <AlertCircle className="responsive-w-xs responsive-h-xs text-red-600" />;
      case "warning":
        return <AlertTriangle className="responsive-w-xs responsive-h-xs text-amber-600" />;
      case "info":
        return <Info className="responsive-w-xs responsive-h-xs text-blue-600" />;
      default:
        return <Info className="responsive-w-xs responsive-h-xs text-violet-600" />;
    }
  };

  const getToastColors = () => {
    switch (toast.variant) {
      case "success":
        return "bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 border-emerald-200 dark:from-emerald-950 dark:via-green-950 dark:to-emerald-900 dark:border-emerald-800";
      case "error":
        return "bg-gradient-to-br from-red-50 via-rose-50 to-red-100 border-red-200 dark:from-red-950 dark:via-rose-950 dark:to-red-900 dark:border-red-800";
      case "warning":
        return "bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 border-amber-200 dark:from-amber-950 dark:via-yellow-950 dark:to-amber-900 dark:border-amber-800";
      case "info":
        return "bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 border-blue-200 dark:from-blue-950 dark:via-sky-950 dark:to-blue-900 dark:border-blue-800";
      default:
        return "bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 border-violet-200 dark:from-violet-950 dark:via-purple-950 dark:to-indigo-900 dark:border-violet-800";
    }
  };

  const handleDismiss = () => {
    dispatch({ type: "DISMISS_TOAST", toastId: toast.id });
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", toastId: toast.id });
    }, 300);
  };

  useEffect(() => {
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration]);

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl border shadow-lg backdrop-blur-sm
        ${getToastColors()}
        responsive-p-sm
      `}
      dir="rtl"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23ffffff' stroke-width='0.5' opacity='0.3'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e')]"></div>
      </div>

      {/* Content */}
      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="responsive-w-sm responsive-h-sm bg-white/80 dark:bg-black/20 rounded-lg flex items-center justify-center shadow-sm">
            {getToastIcon()}
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="responsive-text-xs font-semibold text-gray-800 dark:text-gray-100 mb-1">
              {toast.title}
            </h4>
          )}
          {toast.description && (
            <p className="responsive-text-2xs text-gray-700 dark:text-gray-200 leading-relaxed">
              {toast.description}
            </p>
          )}
          
          {/* Action Button */}
          {toast.action && (
            <Button
              variant="outline"
              size="sm"
              onClick={toast.action.onClick}
              className="mt-2 h-7 px-3 text-xs border-gray-300 dark:border-gray-600 hover:bg-white/50 dark:hover:bg-black/20"
            >
              {toast.action.label}
            </Button>
          )}
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="flex-shrink-0 h-6 w-6 p-1 hover:bg-white/50 dark:hover:bg-black/20 rounded-lg"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-full"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: (toast.duration || 5000) / 1000, ease: "linear" }}
      />
    </motion.div>
  );
};

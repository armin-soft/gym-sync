
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle, Info, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationToastProps {
  type?: NotificationType;
  title: string;
  description?: string;
  onClose?: () => void;
}

export const NotificationToast = ({
  type = "info",
  title,
  description,
  onClose,
}: NotificationToastProps) => {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    info: <Info className="h-5 w-5 text-primary" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
  };

  const gradients = {
    success: "from-green-500/20 to-green-500/5",
    info: "from-primary/20 to-primary/5",
    warning: "from-amber-500/20 to-amber-500/5",
    error: "from-red-500/20 to-red-500/5",
  };

  const borders = {
    success: "border-green-500/20",
    info: "border-primary/20",
    warning: "border-amber-500/20",
    error: "border-red-500/20", 
  };

  const bgColors = {
    success: "bg-green-500/20",
    info: "bg-primary/20",
    warning: "bg-amber-500/20",
    error: "bg-red-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "relative bg-gradient-to-r backdrop-blur-md border shadow-lg rounded-xl px-6 py-4 flex items-center gap-3 persian-numbers select-none",
        gradients[type],
        borders[type]
      )}
    >
      <div className={cn("flex-shrink-0 p-2 rounded-full", bgColors[type])}>
        {icons[type]}
      </div>
      <div className="flex-1 pr-6">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground/80 mt-0.5">{description}</p>
        )}
      </div>
      
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-foreground/10 transition-colors duration-200"
        aria-label="Close"
      >
        <X className="h-4 w-4 text-foreground/50 hover:text-foreground/80" />
      </button>
      
      {/* Progress bar animation */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 5, ease: "linear" }}
        className={cn(
          "absolute bottom-0 left-0 h-0.5 rounded-full",
          type === "success" ? "bg-green-500/50" : 
          type === "info" ? "bg-primary/50" : 
          type === "warning" ? "bg-amber-500/50" : 
          "bg-red-500/50"
        )}
      />
    </motion.div>
  );
};

// Helper functions to create toast content with enhanced UI
export const createNotificationToast = (
  type: NotificationType,
  title: string,
  description?: string
) => {
  return (t: string) => (
    <NotificationToast
      type={type}
      title={title}
      description={description}
      onClose={() => toast.dismiss(t)}
    />
  );
};

// Pre-configured toast functions
export const successToast = (title: string, description?: string) => {
  toast.custom(createNotificationToast("success", title, description), {
    position: "top-center",
    duration: 5000,
  });
};

export const infoToast = (title: string, description?: string) => {
  toast.custom(createNotificationToast("info", title, description), {
    position: "top-center",
    duration: 5000,
  });
};

export const warningToast = (title: string, description?: string) => {
  toast.custom(createNotificationToast("warning", title, description), {
    position: "top-center",
    duration: 5000,
  });
};

export const errorToast = (title: string, description?: string) => {
  toast.custom(createNotificationToast("error", title, description), {
    position: "top-center",
    duration: 7000, // Longer duration for errors
  });
};

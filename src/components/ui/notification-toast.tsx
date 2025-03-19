
import React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
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
    success: "from-green-500/10 to-green-500/5",
    info: "from-primary/10 to-primary/5",
    warning: "from-amber-500/10 to-amber-500/5",
    error: "from-red-500/10 to-red-500/5",
  };

  const borders = {
    success: "border-green-500/20",
    info: "border-primary/20",
    warning: "border-amber-500/20",
    error: "border-red-500/20", 
  };

  const bgColors = {
    success: "bg-green-500/10",
    info: "bg-primary/10",
    warning: "bg-amber-500/10",
    error: "bg-red-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-gradient-to-r backdrop-blur-md border shadow-lg rounded-lg px-6 py-4 flex items-center gap-3 persian-numbers select-none",
        gradients[type],
        borders[type]
      )}
      onClick={onClose}
    >
      <div className={cn("flex-shrink-0 p-2 rounded-full", bgColors[type])}>
        {type === "info" ? <Bell className="h-5 w-5 text-primary" /> : icons[type]}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {type === "success" && (
        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
      )}
    </motion.div>
  );
};

// Helper function to create toast content
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

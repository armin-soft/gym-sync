
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
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 25 
        }
      }}
      exit={{ 
        opacity: 0, 
        y: -20, 
        scale: 0.95,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative bg-gradient-to-r backdrop-blur-md border shadow-lg rounded-xl px-6 py-4 flex items-center gap-3 persian-numbers select-none",
        gradients[type],
        borders[type]
      )}
    >
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          transition: { delay: 0.1, duration: 0.2 }
        }}
        className={cn("flex-shrink-0 p-2 rounded-full", bgColors[type])}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {icons[type]}
      </motion.div>
      
      <div className="flex-1 pr-6">
        <motion.h3 
          initial={{ opacity: 0, y: 5 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.2, duration: 0.3 }
          }}
          className="font-semibold text-foreground"
        >
          {title}
        </motion.h3>
        
        {description && (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.3, duration: 0.3 }
            }}
            className="text-sm text-muted-foreground/80 mt-0.5"
          >
            {description}
          </motion.p>
        )}
      </div>
      
      <motion.button 
        onClick={onClose}
        className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-foreground/10 transition-colors duration-200"
        aria-label="Close"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ 
          opacity: 1, 
          rotate: 0,
          transition: { delay: 0.4, duration: 0.2 }
        }}
      >
        <X className="h-4 w-4 text-foreground/50 hover:text-foreground/90" />
      </motion.button>
      
      {/* Enhanced progress bar animation */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ 
          width: "100%",
          transition: { 
            duration: 5, 
            ease: "linear"
          }
        }}
        className={cn(
          "absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r",
          type === "success" ? "from-green-300 to-green-500" : 
          type === "info" ? "from-blue-300 to-primary" : 
          type === "warning" ? "from-amber-300 to-amber-500" : 
          "from-red-300 to-red-500"
        )}
      />
      
      {/* Added visual effect elements */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full w-4 h-4 opacity-20",
              type === "success" ? "bg-green-500" : 
              type === "info" ? "bg-primary" : 
              type === "warning" ? "bg-amber-500" : 
              "bg-red-500"
            )}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
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


import React from "react";
import { motion } from "framer-motion";
import { MessageCard } from "./MessageCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Message } from "../types";

interface MessagesListProps {
  messages: Message[];
  onMarkAsRead: (messageId: string) => void;
  onDeleteMessage: (messageId: string) => void;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  onMarkAsRead,
  onDeleteMessage
}) => {
  const deviceInfo = useDeviceInfo();

  const getListHeight = () => {
    if (deviceInfo.isMobile) return "h-[500px]";
    if (deviceInfo.isTablet) return "h-[600px]";
    return "h-[700px]";
  };

  const getPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-6";
    return "p-6";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <ScrollArea className={cn(getListHeight())}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn("space-y-4", getPadding())}
        dir="rtl"
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            variants={itemVariants}
            layout
            whileHover={{ 
              scale: 1.01,
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            <MessageCard
              message={message}
              onMarkAsRead={onMarkAsRead}
              onDeleteMessage={onDeleteMessage}
            />
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  );
};

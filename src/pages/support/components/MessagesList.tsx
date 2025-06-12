
import React from "react";
import { MessageCard } from "./MessageCard";
import { SupportMessage } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MessagesListProps {
  messages: SupportMessage[];
  onMarkAsRead: (messageId: string) => void;
  onReply: (messageId: string, reply: string) => void;
}

export function MessagesList({ messages, onMarkAsRead, onReply }: MessagesListProps) {
  const deviceInfo = useDeviceInfo();
  
  const getSpacing = () => {
    if (deviceInfo.isMobile) return "space-y-3";
    if (deviceInfo.isTablet) return "space-y-4";
    return "space-y-4";
  };

  return (
    <div className={cn("w-full", getSpacing())}>
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onMarkAsRead={onMarkAsRead}
          onReply={onReply}
        />
      ))}
    </div>
  );
}

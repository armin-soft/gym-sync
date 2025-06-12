
import React, { useState, useEffect } from "react";
import { SupportHeader } from "./components/SupportHeader";
import { SupportStats } from "./components/SupportStats";
import { SupportContent } from "./components/SupportContent";
import { MessagesList } from "./components/MessagesList";
import { MessagesFilters } from "./components/MessagesFilters";
import { EmptyState } from "./components/EmptyState";
import { SupportMessage, MessageFilter } from "./types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function SupportPage() {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [filter, setFilter] = useState<MessageFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const deviceInfo = useDeviceInfo();

  useEffect(() => {
    loadSupportMessages();
  }, []);

  const loadSupportMessages = () => {
    try {
      const savedMessages = localStorage.getItem('supportMessages');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Error loading support messages:', error);
      setMessages([]);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === "all" || message.status === filter;
    const matchesSearch = searchQuery === "" || 
      message.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleMarkAsRead = (messageId: string) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, status: "read" as const } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('supportMessages', JSON.stringify(updatedMessages));
  };

  const handleReply = (messageId: string, reply: string) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, status: "replied" as const, reply } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('supportMessages', JSON.stringify(updatedMessages));
  };

  const getContainerClasses = () => {
    if (deviceInfo.isMobile) return "p-2 space-y-3";
    if (deviceInfo.isTablet) return "p-4 space-y-4";
    return "p-6 space-y-6";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40" dir="rtl">
      <div className={cn("w-full", getContainerClasses())}>
        <SupportHeader />
        <SupportStats messages={messages} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <MessagesFilters 
              filter={filter}
              onFilterChange={setFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              messages={messages}
            />
          </div>
          
          <div className="lg:col-span-3">
            {filteredMessages.length > 0 ? (
              <MessagesList 
                messages={filteredMessages}
                onMarkAsRead={handleMarkAsRead}
                onReply={handleReply}
              />
            ) : (
              <EmptyState filter={filter} searchQuery={searchQuery} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

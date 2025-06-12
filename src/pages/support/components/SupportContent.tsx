
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessagesList } from "./MessagesList";
import { MessagesFilters } from "./MessagesFilters";
import { EmptyState } from "./EmptyState";
import { Message } from "../types";

interface SupportContentProps {
  messages: Message[];
  onMarkAsRead: (messageId: string) => void;
  onDeleteMessage: (messageId: string) => void;
}

export const SupportContent: React.FC<SupportContentProps> = ({
  messages,
  onMarkAsRead,
  onDeleteMessage
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // فیلتر کردن پیام‌ها
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || message.category === selectedCategory;
    const matchesPriority = selectedPriority === "all" || message.priority === selectedPriority;
    const matchesReadStatus = !showUnreadOnly || !message.isRead;

    return matchesSearch && matchesCategory && matchesPriority && matchesReadStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
      dir="rtl"
    >
      <MessagesFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        showUnreadOnly={showUnreadOnly}
        setShowUnreadOnly={setShowUnreadOnly}
        totalMessages={messages.length}
        filteredMessages={filteredMessages.length}
      />

      <AnimatePresence mode="wait">
        {filteredMessages.length === 0 ? (
          <EmptyState 
            hasMessages={messages.length > 0}
            searchQuery={searchQuery}
          />
        ) : (
          <MessagesList
            messages={filteredMessages}
            onMarkAsRead={onMarkAsRead}
            onDeleteMessage={onDeleteMessage}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

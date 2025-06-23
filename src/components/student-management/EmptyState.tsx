
import React from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddStudent: () => void;
  searchQuery?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onAddStudent,
  searchQuery = ""
}) => {
  const isSearching = searchQuery.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-8"
    >
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
        {isSearching ? (
          <Search className="w-10 h-10 text-blue-600" />
        ) : (
          <Users className="w-10 h-10 text-blue-600" />
        )}
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
        {isSearching ? "موردی یافت نشد" : "شاگردی ثبت نشده است"}
      </h3>

      <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
        {isSearching
          ? `متأسفانه هیچ شاگردی با عبارت «${searchQuery}» پیدا نشد. لطفاً جستجوی دیگری امتحان کنید یا شاگرد جدیدی اضافه کنید.`
          : "برای شروع مدیریت شاگردان، اولین شاگرد خود را ثبت کنید. شما می‌توانید اطلاعات کامل، برنامه‌های ورزشی و رژیم غذایی هر شاگرد را مدیریت کنید."
        }
      </p>

      <Button
        onClick={onAddStudent}
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
      >
        <UserPlus className="w-5 h-5 ml-2" />
        {isSearching ? "افزودن شاگرد جدید" : "اولین شاگرد را ثبت کنید"}
      </Button>
    </motion.div>
  );
};

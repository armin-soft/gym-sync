
import React from "react";
import { motion } from "framer-motion";
import { Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NotificationActionsProps {
  activeTab: string;
  notificationCount: number;
  onClearAll: () => void;
}

export const NotificationActions = ({ activeTab, notificationCount, onClearAll }: NotificationActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-200/30 dark:border-slate-700/30"
    >
      {/* آمار */}
      <div className="flex items-center gap-3">
        <Filter className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        <span className="text-slate-700 dark:text-slate-200 font-semibold">
          {toPersianNumbers(notificationCount)} اعلان
        </span>
      </div>

      {/* دکمه پاک کردن همه */}
      {notificationCount > 0 && (
        <Button
          onClick={onClearAll}
          variant="destructive"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
        >
          <Trash2 className="w-4 h-4 ml-2" />
          پاک کردن همه
        </Button>
      )}
    </motion.div>
  );
};

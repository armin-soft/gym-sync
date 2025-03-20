
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DietDialogHeaderProps {
  studentName: string;
}

export const DietDialogHeader: React.FC<DietDialogHeaderProps> = ({
  studentName,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between px-6 py-4 border-b bg-white/80 dark:bg-gray-800/30 backdrop-blur-sm shrink-0"
    >
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-2.5 rounded-xl shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
            <path d="M7 2v20"></path>
            <path d="M21 15V2"></path>
            <path d="M18 15h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"></path>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">مدیریت برنامه غذایی</h2>
          <p className="text-sm text-gray-500">
            {studentName ? `برای ${studentName}` : "برنامه غذایی جدید"}
          </p>
        </div>
      </div>
      <Button variant="outline" size="icon" className="rounded-full">
        <X className="h-4 w-4" />
        <span className="sr-only">بستن</span>
      </Button>
    </motion.div>
  );
};

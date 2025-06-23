
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserPlus, 
  Search, 
  Filter,
  RefreshCw,
  Download,
  Upload
} from "lucide-react";

interface StudentHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddStudent: () => void;
  onRefresh: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddStudent,
  onRefresh
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          مدیریت شاگردان
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          مدیریت کامل اطلاعات و برنامه‌های شاگردان
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
        {/* Search Section */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="جستجو در شاگردان..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10 bg-white/50 dark:bg-gray-900/50 border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-600"
              dir="rtl"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950"
          >
            <RefreshCw className="w-4 h-4 ml-2" />
            بروزرسانی
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-950"
          >
            <Download className="w-4 h-4 ml-2" />
            خروجی
          </Button>
          
          <Button
            onClick={onAddStudent}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <UserPlus className="w-4 h-4 ml-2" />
            افزودن شاگرد
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


import React from "react";
import { motion } from "framer-motion";
import { Plus, RefreshCw, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentManagementHeaderProps {
  totalStudents: number;
  activeStudents: number;
  onAddStudent: () => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const StudentManagementHeader: React.FC<StudentManagementHeaderProps> = ({
  totalStudents,
  activeStudents,
  onAddStudent,
  onRefresh,
  isLoading = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 rounded-2xl shadow-xl mb-8"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            مدیریت شاگردان
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Badge 
              variant="secondary" 
              className="bg-white/20 text-white border-white/30 text-base px-4 py-2"
            >
              <Users className="w-4 h-4 ml-2" />
              کل شاگردان: {toPersianNumbers(totalStudents.toString())}
            </Badge>
            
            <Badge 
              variant="secondary" 
              className="bg-white/20 text-white border-white/30 text-base px-4 py-2"
            >
              <TrendingUp className="w-4 h-4 ml-2" />
              فعال: {toPersianNumbers(activeStudents.toString())}
            </Badge>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex gap-3"
        >
          <Button
            onClick={onRefresh}
            disabled={isLoading}
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
          >
            <RefreshCw className={`w-5 h-5 ml-2 ${isLoading ? 'animate-spin' : ''}`} />
            بروزرسانی
          </Button>
          
          <Button
            onClick={onAddStudent}
            size="lg"
            className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-6"
          >
            <Plus className="w-5 h-5 ml-2" />
            افزودن شاگرد
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};


import React from "react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Calendar, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StudentHeaderInfoProps {
  currentDate?: string;
  seasonEmoji?: string;
  studentsCount: number;
}

const StudentHeaderInfo: React.FC<StudentHeaderInfoProps> = ({ 
  currentDate, 
  seasonEmoji, 
  studentsCount 
}) => {
  return (
    <Card className="w-full p-4 mb-4 bg-gradient-to-br from-indigo-50/80 to-purple-50/70 dark:from-indigo-950/30 dark:to-purple-950/20 backdrop-blur-sm border border-indigo-100/50 dark:border-indigo-800/30 rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2.5 rounded-lg">
            <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">تاریخ امروز</div>
            <div className="font-bold text-lg flex items-center">
              {currentDate ? (
                <>
                  {toPersianNumbers(currentDate)} 
                  <span className="mr-2">{seasonEmoji}</span>
                </>
              ) : (
                "در حال بارگذاری..."
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 dark:bg-purple-900/40 p-2.5 rounded-lg">
            <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">تعداد شاگردان</div>
            <div className="font-bold text-lg flex items-center">
              {toPersianNumbers(studentsCount)} شاگرد
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentHeaderInfo;

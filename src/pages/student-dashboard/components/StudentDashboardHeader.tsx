
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const StudentDashboardHeader = () => {
  // دریافت اطلاعات شاگرد از localStorage
  const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
  const studentName = studentData.name || "شاگرد عزیز";
  
  // تاریخ امروز (در حالت واقعی از API دریافت خواهد شد)
  const today = new Date();
  const persianDate = today.toLocaleDateString('fa-IR');
  const currentTime = today.toLocaleTimeString('fa-IR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/30">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent">
            سلام {studentName}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            آماده یک روز فوق‌العاده در باشگاه هستی؟
          </p>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-3">
          <Badge 
            variant="outline" 
            className="bg-white/50 dark:bg-slate-800/50 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 px-3 py-1"
          >
            <Calendar className="w-4 h-4 ml-2" />
            {persianDate}
          </Badge>
          
          <Badge 
            variant="outline" 
            className="bg-white/50 dark:bg-slate-800/50 border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300 px-3 py-1"
          >
            <Clock className="w-4 h-4 ml-2" />
            {toPersianNumbers(currentTime)}
          </Badge>
          
          <Badge 
            variant="outline" 
            className="bg-white/50 dark:bg-slate-800/50 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 px-3 py-1"
          >
            <MapPin className="w-4 h-4 ml-2" />
            باشگاه فلان
          </Badge>
        </div>
      </div>
    </div>
  );
};

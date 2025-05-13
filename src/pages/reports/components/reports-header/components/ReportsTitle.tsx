
import { motion } from "framer-motion";
import { ChartBarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportsTitleProps {
  isMobile: boolean;
}

export const ReportsTitle = ({ isMobile }: ReportsTitleProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 mb-1">
        <div className={`p-2 rounded-md bg-primary/10 text-primary shadow-sm`}>
          <ChartBarIcon className="w-5 h-5" />
        </div>
        <h2 className={cn(
          "font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",
          isMobile ? "text-xl" : "text-2xl md:text-3xl"
        )}>
          گزارشات و آمار
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
        نمای کلی عملکرد و آمار باشگاه شما در بازه‌های زمانی مختلف به همراه تحلیل روند رشد
      </p>
    </div>
  );
};

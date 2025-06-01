
import { Clock, Calendar } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface TimeSectionProps {
  currentTime: Date;
  formatTime: (date: Date) => string;
  formatDate: (date: Date) => string;
}

export const TimeSection = ({ currentTime, formatTime, formatDate }: TimeSectionProps) => {
  return (
    <div className="flex flex-col items-end space-y-4">
      {/* Current time */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="text-right">
          <div className="text-xl font-bold text-white mb-1">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm text-white/60 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            زمان فعلی
          </div>
        </div>
      </div>

      {/* Current date */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="text-right">
          <div className="text-sm font-semibold text-white mb-1">
            {formatDate(currentTime)}
          </div>
          <div className="text-xs text-white/60 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            تاریخ امروز
          </div>
        </div>
      </div>
    </div>
  );
};

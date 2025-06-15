
import { Clock, Calendar } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentHeaderTimeDateProps {
  currentTime: Date;
  persianDate: string;
}

export const StudentHeaderTimeDate = ({ currentTime, persianDate }: StudentHeaderTimeDateProps) => {
  const formatTime = (date: Date) => {
    return toPersianNumbers(
      date.toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    );
  };

  return (
    <div className="flex flex-col items-center lg:items-end gap-3">
      <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3">
        <Clock className="h-5 w-5 text-white/90" />
        <span className="text-white font-bold text-lg">
          {formatTime(currentTime)}
        </span>
      </div>
      
      <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2">
        <Calendar className="h-4 w-4 text-white/80" />
        <span className="text-white/90 text-sm">
          {persianDate}
        </span>
      </div>
    </div>
  );
};

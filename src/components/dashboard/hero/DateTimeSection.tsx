
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useShamsiDate } from "@/hooks/useShamsiDate";
import { useState, useEffect } from "react";

interface DateTimeSectionProps {
  currentTime: Date;
}

export const DateTimeSection = ({ currentTime }: DateTimeSectionProps) => {
  const { dateInfo, isLoading } = useShamsiDate();
  const [time, setTime] = useState(new Date());
  
  // Effect to update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-wrap gap-3"
    >
      <AnimatePresence mode="wait">
        {dateInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-wrap gap-3"
          >
            <Badge 
              variant="outline" 
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <span className="text-2xl">{dateInfo.Season_Emoji}</span>
              <span>{dateInfo.Shamsi_Date}</span>
              <span className="text-white/60">{dateInfo.Season}</span>
            </Badge>
            <Badge 
              variant="outline" 
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <span className="text-2xl">{dateInfo.Time_Based_Emoji}</span>
              <Clock className="w-3.5 h-3.5 ml-1.5 text-blue-300" />
              <span>{time.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              <span className="text-white/60">{dateInfo.Time_Based}</span>
            </Badge>
          </motion.div>
        )}
        {isLoading && (
          <Badge 
            variant="outline" 
            className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full animate-pulse"
          >
            در حال بارگذاری...
          </Badge>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

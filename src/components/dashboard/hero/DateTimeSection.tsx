
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, SunMoon } from "lucide-react";
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

  // اضافه کردن کد دیباگ برای بررسی اطلاعات دریافتی
  useEffect(() => {
    console.log("DateTimeSection dateInfo:", dateInfo);
    console.log("DateTimeSection isLoading:", isLoading);
  }, [dateInfo, isLoading]);

  // Animation variants for badges
  const badgeVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

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
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-wrap gap-3"
          >
            <motion.div variants={badgeVariants}>
              <Badge 
                variant="outline" 
                className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{dateInfo.Season_Emoji}</span>
                <Calendar className="w-3.5 h-3.5 mr-1 text-yellow-300 opacity-80" />
                <span>{dateInfo.Shamsi_Date}</span>
                <span className="text-white/60 text-xs px-1.5 py-0.5 bg-white/10 rounded-full">{dateInfo.Season}</span>
              </Badge>
            </motion.div>
            
            <motion.div variants={badgeVariants}>
              <Badge 
                variant="outline" 
                className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{dateInfo.Time_Based_Emoji}</span>
                <Clock className="w-3.5 h-3.5 ml-1.5 text-blue-300 opacity-80" />
                <motion.span 
                  key={time.toISOString()} // Re-render on time change
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {time.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </motion.span>
                <span className="text-white/60 text-xs px-1.5 py-0.5 bg-white/10 rounded-full">{dateInfo.Time_Based}</span>
              </Badge>
            </motion.div>
          </motion.div>
        )}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Badge 
              variant="outline" 
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2"
            >
              <SunMoon className="w-4 h-4 animate-pulse text-blue-300" />
              <span className="animate-pulse">در حال بارگذاری...</span>
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

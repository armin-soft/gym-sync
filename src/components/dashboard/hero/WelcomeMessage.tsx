
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

interface WelcomeMessageProps {
  name: string;
}

export const WelcomeMessage = ({ name }: WelcomeMessageProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "صبح بخیر";
    if (hour < 18) return "ظهر بخیر";
    return "عصر بخیر";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Sparkles className="h-5 w-5 text-yellow-300" fill="currentColor" />
        </motion.div>
        <span className="text-sm text-white/80 font-medium">{getGreeting()}</span>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
        <span>{name || "مربی عزیز"}</span>
        <Star className="h-6 w-6 text-yellow-300" fill="currentColor" />
      </h1>
      
      <p className="text-white/70 text-sm">
        آماده برای یک روز پرانرژی و موفق هستید؟
      </p>
    </motion.div>
  );
};

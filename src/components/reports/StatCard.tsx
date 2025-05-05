
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatCardProps {
  title: string;
  value: number;
  growth: number;
  icon: React.ElementType;
  color: string;
  bgLight: string;
  textColor: string;
  format?: (value: number) => string;
  index?: number;
  isMobile?: boolean;
}

export const StatCard = ({
  title,
  value,
  growth,
  icon: Icon,
  color,
  bgLight,
  textColor,
  format,
  index = 0,
  isMobile = false
}: StatCardProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -5, 
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      variants={variants}
    >
      <Card className={`${isMobile ? 'p-3' : 'p-4 md:p-5'} group transition-all duration-300 border-border/50 backdrop-blur-sm bg-card/90 hover:bg-card overflow-hidden`}>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-xl ${bgLight} transition-all duration-300 group-hover:scale-110`}>
              <Icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} ${textColor}`} />
            </div>
            <div className={`text-xs font-medium flex items-center gap-1 px-2.5 py-1.5 rounded-full ${
              growth >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {growth >= 0 ? (
                <TrendingUp className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
              ) : (
                <TrendingDown className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
              )}
              <span className="font-semibold">{toPersianNumbers(Math.abs(growth))}٪</span>
            </div>
          </div>
          <div className="mt-3 md:mt-4">
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="mt-1 md:mt-2 text-base sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-foreground/90 to-foreground/70 bg-clip-text">
              {format ? format(value) : toPersianNumbers(value)}
            </p>
          </div>
          <div className="mt-3 md:mt-4 h-2 md:h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((value / (value * 1.5)) * 100, 100)}%` }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
            />
          </div>
          
          {/* Decorative design elements */}
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-tr from-foreground/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </Card>
    </motion.div>
  );
};


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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`${isMobile ? 'p-3' : 'p-4 md:p-6'} group hover:shadow-lg transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div className={`p-1.5 sm:p-2 rounded-lg ${bgLight}`}>
            <Icon className={`${isMobile ? 'w-3.5 h-3.5' : 'w-5 h-5'} ${textColor}`} />
          </div>
          <div className={`text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full ${
            growth >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {growth >= 0 ? (
              <TrendingUp className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} />
            ) : (
              <TrendingDown className={`${isMobile ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} />
            )}
            {toPersianNumbers(Math.abs(growth))}٪
          </div>
        </div>
        <div className="mt-3 md:mt-4">
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="mt-1 md:mt-2 text-base sm:text-lg md:text-2xl font-bold">
            {format ? format(value) : toPersianNumbers(value)}
          </p>
        </div>
        <div className="mt-3 md:mt-4 h-1.5 md:h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 group-hover:w-full`}
            style={{ width: `${Math.min((value / (value * 1.5)) * 100, 100)}%` }}
          />
        </div>
      </Card>
    </motion.div>
  );
};

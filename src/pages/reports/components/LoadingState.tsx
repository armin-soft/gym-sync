
import { motion } from "framer-motion";
import { ChartBarIcon } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const LoadingState = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-background/95 via-background to-background/90 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 p-8 max-w-md mx-auto"
      >
        <div className="relative mx-auto">
          <motion.div 
            animate={{ 
              rotate: 360,
              borderRadius: ["50% 50% 50% 50%", "30% 70% 70% 30%", "50% 50% 50% 50%"]
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full mx-auto"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <ChartBarIcon className="w-10 h-10 text-primary" />
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h3 className="text-xl font-bold text-foreground">در حال بارگذاری گزارشات</h3>
          <p className="text-muted-foreground">لطفاً کمی صبر کنید...</p>
          
          <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-6">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

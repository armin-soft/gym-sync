
import { motion } from "framer-motion";
import { Loader2, FlaskConical, Pill } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-60 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 blur-lg opacity-30" />
          
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
            }}
            className="relative w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: -180 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <FlaskConical className="h-6 w-6 text-white absolute top-2 right-2" />
              <Pill className="h-6 w-6 text-white absolute bottom-2 left-2" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-bold text-slate-700 dark:text-slate-300"
        >
          در حال بارگیری...
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-slate-500 dark:text-slate-400 mt-2"
        >
          در حال آماده سازی لیست مکمل ها و ویتامین ها
        </motion.p>
        
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "70%" }}
          transition={{ delay: 0.6, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="h-1 bg-gradient-to-r from-violet-400 to-blue-500 rounded-full mt-6 max-w-sm"
        />
      </div>
    </div>
  );
};

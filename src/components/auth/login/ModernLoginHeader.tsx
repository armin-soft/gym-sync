
import { motion } from "framer-motion";
import { UserCircle2, Sparkles, Shield } from "lucide-react";

interface ModernLoginHeaderProps {
  gymName: string;
}

export const ModernLoginHeader = ({ gymName }: ModernLoginHeaderProps) => {
  return (
    <div className="text-center">
      {/* Avatar with modern styling */}
      <motion.div 
        className="relative mx-auto mb-6 w-20 h-20 flex items-center justify-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl opacity-90 blur-sm"></div>
        <div className="relative bg-gradient-to-br from-indigo-500 to-purple-700 rounded-2xl p-4 shadow-2xl">
          <UserCircle2 className="h-12 w-12 text-white" />
        </div>
        
        {/* Floating sparkles */}
        <motion.div
          className="absolute -top-1 -right-1 text-yellow-400"
          animate={{ 
            rotate: [0, 20, 0], 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Sparkles size={16} />
        </motion.div>

        {/* Security badge */}
        <motion.div
          className="absolute -bottom-1 -left-1 bg-green-500 rounded-full p-1"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield className="h-3 w-3 text-white" />
        </motion.div>
      </motion.div>
      
      {/* Title with gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-3">
          {gymName ? `ورود به سیستم ${gymName}` : "ورود به سیستم مدیریت"}
        </h1>
        
        <motion.p 
          className="text-white/70 text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          مربی عزیز، لطفا با ایمیل و رمز عبور خود وارد شوید
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </motion.div>
    </div>
  );
};


import { motion } from "framer-motion";
import { UserCircle2, Sparkles } from "lucide-react";

interface LoginHeaderProps {
  gymName: string;
}

export const LoginHeader = ({ gymName }: LoginHeaderProps) => {
  return (
    <>
      <motion.div 
        className="relative mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-orange-500/20 to-gold-500/40 p-2 sm:p-3 w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center shadow-lg shadow-orange-500/20"
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.25), 0 10px 10px -5px rgba(249, 115, 22, 0.1)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <UserCircle2 className="h-10 sm:h-12 w-10 sm:w-12 text-orange-500" />
        
        {/* افکت هاله متحرک */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-orange-500/30"
          initial={{ scale: 1 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* افکت ستاره‌ها */}
        <motion.div
          className="absolute -right-1 -top-1 text-gold-500"
          initial={{ rotate: 0, scale: 0.8 }}
          animate={{ 
            rotate: [0, 20, 0], 
            scale: [0.8, 1, 0.8],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Sparkles size={18} />
        </motion.div>
      </motion.div>
      
      <div>
        <motion.h3 
          className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-orange-500 via-gold-500 to-orange-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {gymName ? (
            <>ورود به سیستم مدیریت {gymName}</>
          ) : (
            <>ورود به سیستم مدیریت</>
          )}
        </motion.h3>
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.4, duration: 0.5 }
          }}
        >
          <p className="text-center text-muted-foreground text-xs sm:text-sm">
            مربی عزیز، لطفا با ایمیل و رمز عبور خود وارد شوید
          </p>
          <motion.div
            className="absolute -bottom-2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "6rem", x: "-50%" }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.div>
      </div>
    </>
  );
};

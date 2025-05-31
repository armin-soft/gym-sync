
import { motion } from "framer-motion";
import { UserCircle2, Sparkles } from "lucide-react";
import { useBrandTheme } from "@/hooks/use-brand-theme";

interface LoginHeaderProps {
  gymName: string;
}

export const LoginHeader = ({ gymName }: LoginHeaderProps) => {
  const { getGradientClass, colors } = useBrandTheme();
  
  return (
    <>
      <motion.div 
        className={`relative mx-auto mb-3 sm:mb-4 rounded-full ${getGradientClass('primary')} p-2 sm:p-3 w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center shadow-lg shadow-brand-primary/20`}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: `0 20px 25px -5px ${colors.primary}40, 0 10px 10px -5px ${colors.primary}20`
        }}
        whileTap={{ scale: 0.95 }}
      >
        <UserCircle2 className="h-10 sm:h-12 w-10 sm:w-12 text-white" />
        
        {/* افکت هاله متحرک */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-primary/30"
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
          className="absolute -right-1 -top-1 text-brand-secondary"
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
          className={`text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-3 ${getGradientClass('primary')} bg-clip-text text-transparent`}
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
            className="absolute -bottom-2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "6rem", x: "-50%" }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.div>
      </div>
    </>
  );
};


import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useBrandTheme } from "@/hooks/use-brand-theme";

interface LoginButtonProps {
  loading: boolean;
}

export const LoginButton = ({ loading }: LoginButtonProps) => {
  const { getGradientClass, colors } = useBrandTheme();
  
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      backgroundColor: colors.primary,
      boxShadow: `0 10px 15px -3px ${colors.primary}33, 0 4px 6px -2px ${colors.primary}20`,
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }
    },
    tap: { scale: 0.97 }
  };

  const loginIconVariants = {
    rest: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.button 
      type="submit" 
      className={`w-full h-10 sm:h-12 text-sm sm:text-base font-medium transition-all relative overflow-hidden rounded-md ${getGradientClass('primary')} text-white flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20`}
      disabled={loading}
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 sm:h-5 w-4 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          در حال ورود...
        </div>
      ) : (
        <>
          <span className="relative z-10">ورود به سیستم</span>
          <motion.div
            variants={loginIconVariants}
            initial="rest"
            whileHover="hover"
          >
            <LogIn className="h-4 sm:h-5 w-4 sm:w-5" />
          </motion.div>
          
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className={`absolute inset-0 ${getGradientClass('accent')} bg-[length:200%_100%]`}
              animate={{ 
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
          
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)"
              ],
              backgroundPosition: ["-200% 0", "200% 0"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
    </motion.button>
  );
};

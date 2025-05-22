
import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { LoginForm } from "./LoginFormMain";

interface LoginContainerProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginContainer = ({ onLoginSuccess }: LoginContainerProps) => {
  return (
    <PageContainer fullScreen fullHeight withBackground>
      {/* افکت‌های فوق مدرن پس‌زمینه */}
      <AnimatedBackground />

      {/* محتوای اصلی فرم ورود */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="px-4 w-full max-w-md">
          <LoginForm onLoginSuccess={onLoginSuccess} />
        </div>
      </div>
    </PageContainer>
  );
};

// کامپوننت افکت های پس‌زمینه پیشرفته
const AnimatedBackground = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* گرادیان پس‌زمینه */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-primary/15 to-violet-600/20"></div>
      
      {/* حباب‌های شناور */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-primary/10 to-indigo-500/20"
          style={{
            width: `${Math.random() * 400 + 100}px`,
            height: `${Math.random() * 400 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(60px)',
          }}
          initial={{
            opacity: 0.3,
            scale: 0.8,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* خطوط موجی */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#4361ee" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {[...Array(5)].map((_, i) => {
          const baseY = 200 + i * 200;
          const amplitude = 30 + i * 10;
          const period = 800 + i * 200;
          
          return (
            <motion.path
              key={i}
              d={`M0 ${baseY} Q ${period/4} ${baseY + amplitude}, ${period/2} ${baseY} T ${period} ${baseY} T ${period*1.5} ${baseY} T ${period*2} ${baseY}`}
              fill="none"
              stroke="url(#wave-grad)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.5,
                pathOffset: [0, 1]
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};

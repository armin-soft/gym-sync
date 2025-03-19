
import { LoginForm } from "../LoginForm";
import { motion } from "framer-motion";

interface LoginContainerProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginContainer = ({ onLoginSuccess }: LoginContainerProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background with blurred gradient */}
      <AnimatedBackground />

      {/* Login form container with enhanced animations */}
      <div className="relative z-10 px-4 w-full max-w-md">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};

// Animated Background component for the login page
const AnimatedBackground = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-primary/5 to-violet-500/10"></div>
      
      {/* Animated floating particles */}
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
    </motion.div>
  );
};

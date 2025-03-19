
import { useState, useEffect } from "react";
import { LoginForm } from "./auth/LoginForm";
import { LoadingScreen } from "./LoadingScreen";
import { motion } from "framer-motion";
import { defaultProfile } from "@/types/trainer";
import { toast } from "sonner";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize default trainer profile if it doesn't exist
    const savedProfile = localStorage.getItem('trainerProfile');
    if (!savedProfile) {
      localStorage.setItem('trainerProfile', JSON.stringify(defaultProfile));
    }
    
    // Check if the user is already logged in via session token or remember me
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const rememberMeExpiry = localStorage.getItem("rememberMeExpiry");
      
      if (isLoggedIn) {
        setAuthenticated(true);
        return;
      }
      
      // Check if remember me is still valid
      if (rememberMeExpiry) {
        const expiryDate = new Date(rememberMeExpiry);
        if (expiryDate > new Date()) {
          // Remember me token is still valid
          localStorage.setItem("isLoggedIn", "true");
          setAuthenticated(true);
          
          // Show welcome back notification
          const profile = JSON.parse(localStorage.getItem('trainerProfile') || '{}');
          setTimeout(() => {
            toast.success(
              `${profile.name || 'کاربر'} عزیز، خوش آمدید`,
              {
                description: "به سیستم مدیریت برنامه وارد شدید",
                position: "top-center",
                className: "persian-numbers",
              }
            );
          }, 1000);
        } else {
          // Remember me expired, clear it
          localStorage.removeItem("rememberMeExpiry");
        }
      }
    };
    
    checkAuth();
  }, []);

  const handleLoginSuccess = (rememberMe: boolean = false) => {
    setAuthenticated(true);
    
    // If remember me is checked, set expiry for 30 days
    if (rememberMe) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      localStorage.setItem("rememberMeExpiry", expiryDate.toString());
    }
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  // If still loading, show the loading screen
  if (loading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // If not authenticated, show the login form
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background with blurred gradient */}
        <motion.div 
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5"></div>
          
          {/* Animated circles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5"
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
                opacity: [0.3, 0.6, 0.3],
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

        {/* Login form container with enhanced animations */}
        <div className="relative z-10 px-4 w-full max-w-md">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  // If authenticated, show the main content
  return <>{children}</>;
};

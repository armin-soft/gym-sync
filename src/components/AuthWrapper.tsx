
import { useState, useEffect } from "react";
import { LoginForm } from "./auth/LoginForm";
import { LoadingScreen } from "./LoadingScreen";
import { motion } from "framer-motion";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      setAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
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
        {/* Background gradient with animation */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 z-0"
          animate={{ 
            background: [
              "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(255, 255, 255, 1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(255, 255, 255, 1), rgba(59, 130, 246, 0.05))"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0.1, scale: 0.8 }}
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
                scale: [0.8, 1.2, 0.8],
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          ))}
        </div>

        {/* Login form container */}
        <div className="relative z-10 px-4 w-full max-w-md">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  // If authenticated, show the main content
  return <>{children}</>;
};

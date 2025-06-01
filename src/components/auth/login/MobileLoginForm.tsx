
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { ModernErrorMessage } from "./ModernErrorMessage";
import { containerVariants, itemVariants } from "./utils/animationVariants";

interface MobileLoginFormProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const MobileLoginForm = ({ onLoginSuccess }: MobileLoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hidden hardcoded values
  const HARDCODED_PHONE = "09123823886";
  const HARDCODED_CODE = "012345";

  const handleLogin = () => {
    setLoading(true);
    setError("");

    // Get current failed attempts
    const attempts = parseInt(localStorage.getItem("loginAttempts") || "0");

    // Simulate login process with hardcoded values
    setTimeout(() => {
      // Reset failed attempts on successful login
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("loginLockExpiry");

      localStorage.setItem("isLoggedIn", "true");
      onLoginSuccess(false);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <ModernErrorMessage error={error} />
      
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Button 
            type="submit" 
            className="w-full h-12 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                در حال ورود...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                ورود به پنل
              </div>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </>
  );
};

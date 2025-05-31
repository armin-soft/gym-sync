
import React from "react";
import { motion } from "framer-motion";
import { ModernErrorMessage } from "./ModernErrorMessage";
import { ModernEmailField } from "./ModernEmailField";
import { ModernPasswordField } from "./ModernPasswordField";
import { ModernRememberMe } from "./ModernRememberMe";
import { ModernLoginButton } from "./ModernLoginButton";

interface ModernLoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  loading: boolean;
  error: string;
  handleLogin: (e: React.FormEvent) => void;
}

export const ModernLoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  loading,
  error,
  handleLogin,
}: ModernLoginFormProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleLogin}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ModernErrorMessage error={error} />
      
      <motion.div variants={itemVariants}>
        <ModernEmailField email={email} setEmail={setEmail} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ModernPasswordField
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ModernRememberMe rememberMe={rememberMe} setRememberMe={setRememberMe} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ModernLoginButton loading={loading} />
      </motion.div>
    </motion.form>
  );
};

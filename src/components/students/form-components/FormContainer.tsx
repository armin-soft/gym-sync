
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface FormContainerProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export const FormContainer = ({ children, onSubmit, className = "" }: FormContainerProps) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className={`bg-white dark:bg-slate-900 rounded-t-3xl px-6 pt-6 pb-6 shadow-[0_-40px_80px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_-40px_80px_-15px_rgba(0,0,0,0.5)] space-y-6 ${className}`}
    >
      {children}
    </form>
  );
};

export const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

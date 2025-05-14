
import React from "react";
import { motion } from "framer-motion";

interface FormContainerProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export const dialogVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const FormContainer: React.FC<FormContainerProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      {children}
    </form>
  );
};

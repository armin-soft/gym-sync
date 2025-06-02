
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps {
  loading: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  loadingText?: string;
}

export const LoadingButton = ({
  loading,
  disabled,
  onClick,
  type = "button",
  className,
  children,
  loadingText = "در حال پردازش..."
}: LoadingButtonProps) => {
  return (
    <Button 
      type={type}
      onClick={onClick}
      className={className}
      disabled={loading || disabled}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <motion.div
            className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

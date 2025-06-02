
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToastContext } from "./ToastProvider";
import { ToastItem } from "./ToastItem";

export const ToastContainer = () => {
  const { state } = useToastContext();

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-sm p-2 xs:p-3 sm:p-4 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {state.toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.4
            }}
            className="mb-2 xs:mb-3 pointer-events-auto"
          >
            <ToastItem toast={toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

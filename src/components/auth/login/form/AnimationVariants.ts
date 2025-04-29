
export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      duration: 0.8,
      staggerChildren: 0.15
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  }
};

export const lockIconVariants = {
  hover: { rotate: [0, -5, 5, -5, 5, 0], scale: 1.05 },
  tap: { scale: 0.95 }
};

export const lockTimerVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { 
    scale: 1,
    opacity: 1,
    boxShadow: [
      "0 0 0 rgba(239, 68, 68, 0.1)",
      "0 0 20px rgba(239, 68, 68, 0.2)",
      "0 0 0 rgba(239, 68, 68, 0.1)"
    ],
  },
  transition: {
    boxShadow: {
      repeat: Infinity,
      duration: 2
    }
  }
};

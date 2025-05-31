
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

interface EditStudentButtonProps {
  studentId: number;
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
}

export const EditStudentButton = ({
  studentId,
  variant = "ghost",
  size = "icon",
  className = "",
  onClick
}: EditStudentButtonProps) => {
  // Hover animation variants
  const buttonVariants = {
    rest: { 
      scale: 1,
      backgroundColor: "var(--transparent)",
      transition: { duration: 0.2, ease: "easeInOut" } 
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "var(--hover-bg)",
      transition: { duration: 0.2, ease: "easeInOut" } 
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeInOut" } 
    }
  };
  
  // Dynamic styles based on variant
  const getHoverBg = () => {
    if (variant === "ghost") return "var(--bg-hover-ghost)";
    if (variant === "outline") return "var(--bg-hover-outline)";
    return "var(--bg-hover-default)";
  };

  if (onClick) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        style={{ "--hover-bg": getHoverBg() } as any}
      >
        <Button
          variant={variant}
          size={size}
          className={`transition-all duration-300 ${className}`}
          onClick={onClick}
        >
          <Edit className="h-4 w-4" />
          {size !== "icon" && (
            <span className="mr-2 text-sm font-medium">ویرایش</span>
          )}
        </Button>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      style={{ "--hover-bg": getHoverBg() } as any}
    >
      <Button
        asChild
        variant={variant}
        size={size}
        className={`transition-all duration-300 ${className}`}
      >
        <Link to={`/students/add-edit/${studentId}`} className="flex items-center">
          <Edit className="h-4 w-4" />
          {size !== "icon" && (
            <span className="mr-2 text-sm font-medium">ویرایش</span>
          )}
        </Link>
      </Button>
    </motion.div>
  );
};

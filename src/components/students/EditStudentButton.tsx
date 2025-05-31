
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useBrandTheme } from "@/hooks/use-brand-theme";

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
  const { colors } = useBrandTheme();
  
  // Hover animation variants
  const buttonVariants = {
    rest: { 
      scale: 1,
      backgroundColor: "transparent",
      transition: { duration: 0.2, ease: "easeInOut" } 
    },
    hover: { 
      scale: 1.05,
      backgroundColor: colors.primary + "20",
      transition: { duration: 0.2, ease: "easeInOut" } 
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeInOut" } 
    }
  };

  if (onClick) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <Button
          variant={variant}
          size={size}
          className={`transition-all duration-300 ${className}`}
          onClick={onClick}
        >
          <Edit className="h-4 w-4 text-brand-primary" />
          {size !== "icon" && (
            <span className="mr-2 text-sm font-medium text-brand-primary">ویرایش</span>
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
    >
      <Button
        asChild
        variant={variant}
        size={size}
        className={`transition-all duration-300 ${className}`}
      >
        <Link to={`/students/add-edit/${studentId}`} className="flex items-center">
          <Edit className="h-4 w-4 text-brand-primary" />
          {size !== "icon" && (
            <span className="mr-2 text-sm font-medium text-brand-primary">ویرایش</span>
          )}
        </Link>
      </Button>
    </motion.div>
  );
};


import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface AddStudentButtonProps {
  variant?: "default" | "accent" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const AddStudentButton = ({
  variant = "default",
  size = "default",
  className = "",
}: AddStudentButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Button
        asChild
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
      >
        <Link to="/students/add-edit">
          <UserPlus className={size === "icon" ? "h-4 w-4" : "h-5 w-5 -mr-1"} />
          {size !== "icon" && "افزودن شاگرد جدید"}
        </Link>
      </Button>
    </motion.div>
  );
};

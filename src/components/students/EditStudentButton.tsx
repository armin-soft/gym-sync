
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

interface EditStudentButtonProps {
  studentId: number;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const EditStudentButton = ({
  studentId,
  variant = "ghost",
  size = "icon",
  className = "",
}: EditStudentButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        asChild
        variant={variant}
        size={size}
        className={className}
      >
        <Link to={`/students/add-edit/${studentId}`}>
          <Edit className="h-4 w-4" />
          {size !== "icon" && "ویرایش"}
        </Link>
      </Button>
    </motion.div>
  );
};

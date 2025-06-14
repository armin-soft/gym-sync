
import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContextMenuButtonProps {
  icon: LucideIcon;
  label: string;
  path?: string;
  onClick?: () => void;
  variant?: "default" | "danger";
  className?: string;
}

export const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({
  icon: Icon,
  label,
  path,
  onClick,
  variant = "default",
  className
}) => {
  const baseClasses = cn(
    "flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200",
    "hover:bg-gray-50 dark:hover:bg-gray-800",
    variant === "danger" && "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
    className
  );

  if (path) {
    return (
      <Link to={path} className={baseClasses}>
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
};


import React from "react";

interface ContextMenuButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "blue" | "purple" | "green" | "orange" | "red" | "slate";
}

export const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = "blue"
}) => {
  const getVariantClasses = () => {
    const baseClasses = "group hover:bg-opacity-90 dark:hover:bg-opacity-30";
    
    switch (variant) {
      case "purple":
        return `${baseClasses} hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300`;
      case "blue":
        return `${baseClasses} hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300`;
      case "green":
        return `${baseClasses} hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300`;
      case "orange":
        return `${baseClasses} hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-300`;
      case "red":
        return `${baseClasses} hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300`;
      case "slate":
        return `${baseClasses} hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200`;
      default:
        return `${baseClasses} hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200`;
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "purple": return "text-purple-500 dark:text-purple-400";
      case "blue": return "text-blue-500 dark:text-blue-400";
      case "green": return "text-green-500 dark:text-green-400";
      case "orange": return "text-orange-500 dark:text-orange-400";
      case "red": return "text-red-500 dark:text-red-400";
      case "slate": return "text-slate-500 dark:text-slate-400";
      default: return "text-slate-500 dark:text-slate-400";
    }
  };

  return (
    <button
      className={`w-full flex items-start gap-3 px-2.5 py-2 rounded-lg text-left text-sm transition-all duration-200 ${getVariantClasses()} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className={`mt-0.5 ${getIconClasses()}`}>
        {React.Children.toArray(children)[0]}
      </span>
      <div className="flex flex-col">
        {React.Children.toArray(children)[1]}
      </div>
    </button>
  );
};

export default ContextMenuButton;


import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface StudentCardAvatarProps {
  image?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

export const StudentCardAvatar: React.FC<StudentCardAvatarProps> = ({
  image,
  name,
  size = "md"
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };
  
  return (
    <Avatar className={`${sizeClasses[size]} border-2 border-indigo-100 dark:border-indigo-900`}>
      {image ? (
        <AvatarImage src={image} alt={name} />
      ) : (
        <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-indigo-600 text-white">
          {name?.charAt(0) || <User className="h-6 w-6" />}
        </AvatarFallback>
      )}
    </Avatar>
  );
};


import React, { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, RefreshCw, User } from "lucide-react";

interface ProfileImageUploadProps {
  previewImage: string;
  onChange: (imageData: string) => void;
  error?: boolean;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  previewImage,
  onChange,
  error
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert("حجم تصویر باید کمتر از ۵ مگابایت باشد");
      return;
    }
    
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setIsLoading(false);
      onChange(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    onChange("/placeholder.svg");
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      <Avatar className={`w-32 h-32 mx-auto transition-all duration-300 ${error ? 'ring-2 ring-destructive' : ''}`}>
        {isLoading ? (
          <AvatarFallback className="bg-muted">
            <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin" />
          </AvatarFallback>
        ) : previewImage && previewImage !== "/placeholder.svg" ? (
          <AvatarImage 
            src={previewImage} 
            alt="تصویر پروفایل" 
            className="object-cover"
          />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50">
            <User className="h-12 w-12 text-indigo-500/70" />
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="h-8 w-8 rounded-full shadow-lg bg-white dark:bg-slate-800"
          onClick={() => document.getElementById("profile-image-upload")?.click()}
        >
          <Camera className="h-4 w-4" />
          <Input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </Button>
        
        {previewImage && previewImage !== "/placeholder.svg" && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full shadow-lg bg-white dark:bg-slate-800"
            onClick={handleReset}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

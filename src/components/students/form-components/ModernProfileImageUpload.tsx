
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, RefreshCw, User, Sparkles } from "lucide-react";

interface ModernProfileImageUploadProps {
  previewImage: string;
  onChange: (imageData: string) => void;
  error?: boolean;
}

export const ModernProfileImageUpload: React.FC<ModernProfileImageUploadProps> = ({
  previewImage,
  onChange,
  error
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(previewImage);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    setCurrentImage(previewImage);
  }, [previewImage]);

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
      const newImage = event.target?.result as string;
      setCurrentImage(newImage);
      onChange(newImage);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    onChange("/Assets/Image/Place-Holder.svg");
    setCurrentImage("/Assets/Image/Place-Holder.svg");
  };

  return (
    <div className="relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-2xl scale-150" />
      
      <motion.div 
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className={`relative w-40 h-40 mx-auto ${error ? 'ring-4 ring-red-400' : ''}`}>
          <Avatar className="w-40 h-40 border-4 border-white dark:border-slate-800 shadow-2xl shadow-purple-500/25">
            {isLoading ? (
              <AvatarFallback className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900">
                <RefreshCw className="h-12 w-12 text-violet-500 animate-spin" />
              </AvatarFallback>
            ) : currentImage && currentImage !== "/Assets/Image/Place-Holder.svg" ? (
              <AvatarImage 
                src={currentImage} 
                alt="تصویر پروفایل" 
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100 dark:from-violet-900 dark:via-purple-900 dark:to-pink-900">
                <User className="h-16 w-16 text-violet-500" />
              </AvatarFallback>
            )}
          </Avatar>
          
          {/* Sparkle decoration */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </motion.div>
          
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Camera className="h-8 w-8 text-white" />
          </motion.div>
        </div>
        
        {/* Action buttons */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="button"
              size="icon"
              className="h-12 w-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25"
              onClick={() => document.getElementById("modern-profile-image-upload")?.click()}
            >
              <Camera className="h-5 w-5" />
              <Input
                type="file"
                id="modern-profile-image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </Button>
          </motion.div>
          
          {currentImage && currentImage !== "/Assets/Image/Place-Holder.svg" && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg border-2 border-gray-200 dark:border-gray-700"
                onClick={handleReset}
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Help text */}
      <motion.p 
        className="text-center text-sm text-muted-foreground mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        برای افزودن تصویر کلیک کنید (حداکثر ۵ مگابایت)
      </motion.p>
    </div>
  );
};

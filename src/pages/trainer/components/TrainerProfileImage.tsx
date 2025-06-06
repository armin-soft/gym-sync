
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainerProfileImageProps {
  image: string;
  onImageChange: (image: string) => void;
}

export const TrainerProfileImage = ({ image, onImageChange }: TrainerProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative mx-auto"
      >
        {/* Glow effect */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-lg" />
        
        {/* Image container */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-2xl">
          {image === "/Assets/Image/Place-Holder.svg" ? (
            <div className="w-full h-full bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900 dark:to-indigo-900 flex items-center justify-center">
              <Camera className="w-12 h-12 text-violet-500" />
            </div>
          ) : (
            <img
              src={image}
              alt="تصویر پروفایل"
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <Upload className="w-8 h-8 text-white" />
          </motion.div>
        </div>
        
        {/* Upload button */}
        <Button
          onClick={() => fileInputRef.current?.click()}
          size="sm"
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white rounded-full w-10 h-10 p-0 shadow-lg"
        >
          <Camera className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
};

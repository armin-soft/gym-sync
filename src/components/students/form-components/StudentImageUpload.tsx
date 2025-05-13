
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentImageUploadProps {
  image: string;
  onImageChange: (imageUrl: string) => void;
  error?: string;
  itemVariants: any;
}

export const StudentImageUpload = ({ 
  image, 
  onImageChange, 
  error,
  itemVariants 
}: StudentImageUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "خطا",
          description: "حجم تصویر نباید بیشتر از ۲ مگابایت باشد",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center -mt-16 mb-6">
      <motion.div 
        variants={itemVariants} 
        className="relative group"
      >
        <div className="relative">
          <img
            src={image}
            alt="تصویر پروفایل"
            className={`w-24 h-24 rounded-full object-cover ring-4 ${
              error 
                ? "ring-red-200 border-red-500" 
                : "ring-white dark:ring-slate-800"
            } bg-white dark:bg-slate-800 shadow-xl transition-transform duration-300 group-hover:scale-105 z-10`}
          />
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
        </div>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0 h-8 w-8 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
          onClick={handleImageClick}
        >
          <Camera className="h-4 w-4" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-lg scale-90 -z-10" />
      </motion.div>
    </div>
  );
};

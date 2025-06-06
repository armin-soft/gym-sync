
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface TrainerProfileImageProps {
  image: string;
  onImageChange: (image: string) => void;
}

export const TrainerProfileImage: React.FC<TrainerProfileImageProps> = ({
  image,
  onImageChange
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً یک فایل تصویری انتخاب کنید",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "حجم تصویر نباید بیشتر از ۲ مگابایت باشد",
      });
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onImageChange(result);
      setIsUploading(false);
      toast({
        title: "موفقیت",
        description: "تصویر پروفایل با موفقیت بروزرسانی شد",
      });
    };

    reader.onerror = () => {
      setIsUploading(false);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در آپلود تصویر پیش آمد",
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="relative mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      
      <motion.div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* حلقه درخشان */}
        <motion.div 
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-500/40 via-sky-500/40 to-slate-500/40 opacity-0"
          animate={{ 
            opacity: isHovering ? 0.8 : 0, 
            scale: isHovering ? 1.1 : 1,
            rotate: [0, 360]
          }}
          transition={{ 
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* کانتینر تصویر */}
        <motion.div
          className="w-40 h-40 relative rounded-full overflow-hidden cursor-pointer ring-4 ring-white dark:ring-gray-900 shadow-2xl"
          onClick={() => fileInputRef.current?.click()}
        >
          {/* تصویر یا placeholder */}
          {image === "/Assets/Image/Place-Holder.svg" ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-emerald-400/20 to-sky-400/20 rounded-full blur-xl"></div>
                <ImageIcon className="w-12 h-12 text-muted-foreground/40 mb-2 relative" />
              </div>
              <p className="text-sm text-muted-foreground font-bold">انتخاب تصویر</p>
            </div>
          ) : (
            <img 
              src={image} 
              alt="تصویر پروفایل"
              className="w-full h-full object-cover"
            />
          )}
          
          {/* overlay هنگام hover */}
          <AnimatePresence>
            {(isHovering || isUploading) && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isUploading ? (
                  <div className="text-white flex flex-col items-center">
                    <motion.div 
                      className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                    <p className="text-sm mt-2 font-bold">در حال آپلود...</p>
                  </div>
                ) : (
                  <div className="text-white flex flex-col items-center">
                    <Camera className="h-8 w-8 text-white mb-1" />
                    <p className="text-sm font-bold">تغییر تصویر</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* دکمه تغییر تصویر */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 shadow-lg"
          >
            <Upload className="h-4 w-4 ml-2" />
            تغییر
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

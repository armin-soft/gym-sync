
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ModernProfileImageProps {
  image: string;
  onImageChange: (image: string) => void;
}

export const ModernProfileImage = ({ image, onImageChange }: ModernProfileImageProps) => {
  const deviceInfo = useDeviceInfo();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const getImageSize = () => {
    if (deviceInfo.isMobile) return "w-32 h-32 sm:w-36 sm:h-36";
    if (deviceInfo.isTablet) return "w-40 h-40";
    return "w-44 h-44";
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onImageChange(result);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('خطا در آپلود تصویر:', error);
      setIsUploading(false);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const ImagePlaceholder = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-emerald-400/20 to-sky-400/20 rounded-full blur-xl" />
        <ImageIcon className="w-12 h-12 text-emerald-400/60 mb-3 relative" />
      </div>
      <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 font-medium">انتخاب تصویر</p>
    </div>
  );

  return (
    <div className="relative mx-auto flex flex-col items-center">
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
      >
        {/* افکت نوری پس‌زمینه */}
        <motion.div 
          className={cn(
            "absolute -inset-4 rounded-full bg-gradient-to-l from-emerald-500/40 via-sky-500/40 to-emerald-500/40 opacity-0",
            isHovering && "opacity-100"
          )}
          animate={{ 
            opacity: isHovering ? 0.8 : 0, 
            scale: isHovering ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* کانتینر تصویر */}
        <motion.div
          className={cn(
            getImageSize(),
            "relative rounded-full overflow-hidden cursor-pointer",
            "ring-4 ring-white dark:ring-slate-900 shadow-2xl",
            "hover:ring-emerald-200 dark:hover:ring-emerald-800 hover:shadow-emerald-500/30",
            "transition-all duration-300",
            isUploading && "cursor-wait"
          )}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleFileUpload}
        >
          {/* تصویر یا placeholder */}
          {image === "/Assets/Image/Place-Holder.svg" ? (
            <ImagePlaceholder />
          ) : (
            <img 
              src={image} 
              alt="تصویر پروفایل"
              className="w-full h-full object-cover"
              onError={() => onImageChange("/Assets/Image/Place-Holder.svg")}
            />
          )}
          
          {/* overlay هنگام hover */}
          <AnimatePresence>
            {(isHovering && !isUploading) && (
              <motion.div 
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col items-center text-white">
                  <Camera className="w-8 h-8 mb-2" />
                  <p className="text-xs font-medium">تغییر تصویر</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* نشانگر آپلود */}
          <AnimatePresence>
            {isUploading && (
              <motion.div 
                className="absolute inset-0 bg-black/70 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col items-center text-white">
                  <motion.div 
                    className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                  <p className="text-xs mt-2">در حال آپلود...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* دکمه آپلود */}
        <motion.button
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-l from-emerald-600 to-sky-600 rounded-full shadow-xl flex items-center justify-center text-white"
          onClick={handleFileUpload}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Upload className="w-5 h-5" />
        </motion.button>
      </motion.div>
      
      {/* نشان مربی */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -bottom-3 -right-2"
      >
        <div className="bg-gradient-to-l from-emerald-600 to-sky-600 border-none text-white px-3 py-1 text-xs rounded-full font-bold shadow-lg">
          مربی
        </div>
      </motion.div>
    </div>
  );
};

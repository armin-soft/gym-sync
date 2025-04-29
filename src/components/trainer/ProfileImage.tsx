
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Camera, ImageIcon, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

interface ProfileImageProps {
  image: string;
  onImageChange: (image: string) => void;
}

export const ProfileImage = ({ image, onImageChange }: ProfileImageProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const deviceInfo = useDeviceInfo();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
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
        title: "آپلود موفق",
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

  // Responsive image dimensions based on device type
  const getImageSize = () => {
    if (deviceInfo.isMobile) return "w-28 h-28 sm:w-32 sm:h-32";
    if (deviceInfo.isTablet) return "w-36 h-36";
    return "w-40 h-40";
  };

  return (
    <div className="relative mx-auto flex flex-col items-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        onClick={(e) => e.stopPropagation()}
      />
      
      <motion.div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Background glow effect */}
        <motion.div 
          className={cn(
            "absolute -inset-3 rounded-full bg-gradient-to-r from-indigo-500/40 via-sky-500/40 to-purple-500/40 opacity-0",
            isHovering || dragActive ? "opacity-100" : ""
          )}
          animate={{ 
            opacity: isHovering || dragActive ? 0.8 : 0, 
            scale: isHovering || dragActive ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Image container */}
        <motion.div
          className={cn(
            getImageSize(),
            "relative rounded-full overflow-hidden cursor-pointer",
            "ring-4 ring-white dark:ring-gray-900 shadow-xl",
            "hover:ring-indigo-200 dark:hover:ring-indigo-900 hover:shadow-indigo-500/20",
            "transition-all duration-300",
            isUploading ? "cursor-wait" : ""
          )}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Image or placeholder */}
          {image === "/placeholder.svg" ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
              <ImageIcon className="w-10 h-10 text-muted-foreground/40 mb-2" />
              <p className="text-xs text-muted-foreground font-medium">انتخاب تصویر</p>
            </div>
          ) : (
            <img 
              src={image} 
              alt="تصویر پروفایل"
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Hover overlay */}
          <AnimatePresence>
            {(isHovering || dragActive) && !isUploading && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {dragActive ? (
                  <div className="text-white flex flex-col items-center">
                    <UploadCloud className="h-10 w-10 text-white mb-1" />
                    <p className="text-sm font-medium">رها کنید</p>
                  </div>
                ) : (
                  <div className="text-white flex flex-col items-center">
                    <Camera className="h-8 w-8 text-white mb-1" />
                    <p className="text-sm font-medium">تغییر تصویر</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Upload progress indicator */}
          {isUploading && (
            <motion.div 
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="w-10 h-10 border-3 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                <p className="text-white text-xs mt-2">در حال آپلود...</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      
      {/* Profile badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute -bottom-2 -right-1"
      >
        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 border-none text-white px-2 py-0.5 text-xs">
          مربی
        </Badge>
      </motion.div>
    </div>
  );
};

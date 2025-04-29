
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Camera, ImageIcon, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ProfileImageProps {
  image: string;
  onImageChange: (image: string) => void;
}

export const ProfileImage = ({ image, onImageChange }: ProfileImageProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
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
    if (deviceInfo.isMobile) return "w-40 h-40";
    if (deviceInfo.isTablet) return "w-48 h-48";
    return "w-56 h-56";
  };

  // Responsive card padding based on device type
  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-5";
    return "p-6";
  };

  return (
    <Card className="relative overflow-hidden backdrop-blur-xl bg-white/50 border-primary/10 shadow-xl">
      <div className={`${getCardPadding()}`}>
        <div 
          className={`relative mx-auto ${getImageSize()} group`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            onClick={(e) => e.stopPropagation()}
            required
          />
          
          <motion.div 
            className={cn(
              `${getImageSize()} relative rounded-2xl overflow-hidden cursor-pointer`,
              "ring-4 ring-background shadow-2xl transition-all duration-500",
              "hover:ring-primary/20 hover:shadow-primary/20 hover:scale-[1.02]",
              dragActive ? "ring-primary ring-opacity-70 scale-[1.05]" : "",
              isUploading ? "cursor-wait" : "cursor-pointer"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
          >
            {/* Placeholder for empty image */}
            {image === "/placeholder.svg" ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/40 mb-4" />
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">انتخاب تصویر پروفایل</p>
              </div>
            ) : (
              <img 
                src={image} 
                alt="تصویر پروفایل"
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Overlay effect */}
            <motion.div 
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center",
                "bg-gradient-to-t from-black/60 to-transparent",
                dragActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                "transition-all duration-300"
              )}
              animate={{ opacity: dragActive ? 1 : 0 }}
              whileHover={{ opacity: 1 }}
            >
              {dragActive ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <UploadCloud className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-lg mb-2" />
                  <p className="text-xs sm:text-sm text-white font-medium drop-shadow-md">رها کنید</p>
                </motion.div>
              ) : (
                <motion.div className="flex flex-col items-center">
                  <Camera className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg mb-2" />
                  <p className="text-xs sm:text-sm text-white font-medium drop-shadow-md">تغییر تصویر</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          
          {/* Upload progress indicator */}
          {isUploading && (
            <motion.div 
              className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
};

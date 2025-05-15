
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ImagePlaceholder } from "./profile-image/ImagePlaceholder";
import { HoverOverlay } from "./profile-image/HoverOverlay";
import { UploadProgress } from "./profile-image/UploadProgress";
import { ProfileBadge } from "./profile-image/ProfileBadge";
import { useImageUpload } from "./profile-image/useImageUpload";

interface ProfileImageProps {
  image: string;
  onImageChange: (image: string) => void;
}

export const ProfileImage = ({ image, onImageChange }: ProfileImageProps) => {
  const deviceInfo = useDeviceInfo();
  const {
    fileInputRef,
    isUploading,
    dragActive,
    isHovering,
    setIsHovering,
    handleImageUpload,
    handleDrag,
    handleDrop
  } = useImageUpload({ onImageChange });

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
          {image === "/Assets/Image/Place-Holder.svg" ? (
            <ImagePlaceholder />
          ) : (
            <img 
              src={image} 
              alt="تصویر پروفایل"
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Hover overlay */}
          <AnimatePresence>
            <HoverOverlay 
              isHovering={isHovering} 
              dragActive={dragActive} 
              isUploading={isUploading} 
            />
          </AnimatePresence>
          
          {/* Upload progress indicator */}
          <AnimatePresence>
            <UploadProgress isUploading={isUploading} />
          </AnimatePresence>
        </motion.div>
      </motion.div>
      
      {/* Profile badge */}
      <ProfileBadge />
    </div>
  );
};

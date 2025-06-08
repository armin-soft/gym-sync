
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseImageUploadProps {
  onImageChange: (image: string) => void;
}

export const useImageUpload = ({ onImageChange }: UseImageUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showCameraCapture, setShowCameraCapture] = useState(false);

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

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        variant: "destructive",
        title: "خطا", 
        description: "حجم تصویر نباید بیشتر از ۵ مگابایت باشد",
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

  const handleFileUpload = () => {
    try {
      fileInputRef.current?.click();
    } catch (error) {
      console.error('Error opening file dialog:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در باز کردن انتخاب فایل پیش آمد",
      });
    }
  };

  const handleCameraCapture = () => {
    try {
      // Check if camera is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "دوربین در این مرورگر پشتیبانی نمی‌شود",
        });
        return;
      }
      
      setShowCameraCapture(true);
    } catch (error) {
      console.error('Error opening camera:', error);
      toast({
        variant: "destructive", 
        title: "خطا",
        description: "مشکلی در باز کردن دوربین پیش آمد",
      });
    }
  };

  const handleCameraCaptureComplete = (imageData: string) => {
    try {
      onImageChange(imageData);
      setShowCameraCapture(false);
      toast({
        title: "عکس گرفته شد",
        description: "تصویر پروفایل با موفقیت بروزرسانی شد",
      });
    } catch (error) {
      console.error('Error processing captured image:', error);
      toast({
        variant: "destructive",
        title: "خطا", 
        description: "مشکلی در پردازش تصویر گرفته شده پیش آمد",
      });
    }
  };

  return {
    fileInputRef,
    isUploading,
    dragActive,
    isHovering,
    setIsHovering,
    showCameraCapture,
    setShowCameraCapture,
    handleImageUpload,
    handleDrag,
    handleDrop,
    handleFileUpload,
    handleCameraCapture,
    handleCameraCaptureComplete
  };
};

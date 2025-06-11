
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, X } from "lucide-react";

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageChange: (file: File | null) => void;
  studentName?: string;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImage,
  onImageChange,
  studentName
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 mb-4 border-b border-emerald-100 dark:border-emerald-800">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20">
          <Camera className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">تصویر پروفایل</h3>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24 border-4 border-emerald-200 dark:border-emerald-700">
          <AvatarImage 
            src={currentImage || "/Assets/Image/Place-Holder.svg"} 
            alt={studentName || "شاگرد"} 
            className="object-cover"
          />
          <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xl">
            {studentName?.substring(0, 2) || "ش"}
          </AvatarFallback>
        </Avatar>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
          >
            <Upload className="h-4 w-4 mr-2" />
            انتخاب تصویر
          </Button>

          {currentImage && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveImage}
              className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <X className="h-4 w-4 mr-2" />
              حذف
            </Button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

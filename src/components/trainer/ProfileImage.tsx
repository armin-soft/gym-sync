
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

interface ProfileImageProps {
  image: string;
  onImageChange: (image: string) => void;
}

export const ProfileImage = ({ image, onImageChange }: ProfileImageProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  return (
    <Card className="relative overflow-hidden p-6 backdrop-blur-xl bg-white/50 border-primary/10">
      <div className="relative mx-auto w-48 h-48 group">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          onClick={(e) => e.stopPropagation()}
          required
        />
        <Button
          className={cn(
            "w-48 h-48 p-0 relative rounded-2xl overflow-hidden",
            "ring-4 ring-background shadow-2xl transition-all duration-500",
            "hover:ring-primary/20 hover:shadow-primary/20 hover:scale-[1.02]",
            "disabled:opacity-50",
            isUploading ? "cursor-wait" : "cursor-pointer"
          )}
          variant="ghost"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <img 
            src={image} 
            alt="تصویر پروفایل"
            className="w-full h-full object-cover"
          />
          <div className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-gradient-to-t from-black/60 to-transparent",
            "opacity-0 group-hover:opacity-100 transition-all duration-300"
          )}>
            <Camera className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
        </Button>
      </div>
    </Card>
  );
};

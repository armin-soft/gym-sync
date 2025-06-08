
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Camera, Upload, ChevronDown } from "lucide-react";

interface ImageUploadOptionsProps {
  onFileUpload: () => void;
  onCameraCapture: () => void;
  className?: string;
}

export const ImageUploadOptions = ({ 
  onFileUpload, 
  onCameraCapture, 
  className 
}: ImageUploadOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`bg-white border-gray-200 hover:bg-gray-50 ${className}`}
        >
          <Upload className="h-4 w-4 mr-2" />
          تغییر تصویر
          <ChevronDown className="h-3 w-3 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="center" className="w-48">
        <DropdownMenuItem onClick={onFileUpload} className="cursor-pointer">
          <Upload className="h-4 w-4 mr-2 text-blue-500" />
          <span>انتخاب از فایل</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={onCameraCapture} className="cursor-pointer">
          <Camera className="h-4 w-4 mr-2 text-green-500" />
          <span>گرفتن عکس با دوربین</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

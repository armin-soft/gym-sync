
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Camera, Upload, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={className}
        >
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950"
          >
            <Upload className="h-4 w-4 mr-2" />
            تغییر تصویر
            <ChevronDown className="h-3 w-3 ml-2" />
          </Button>
        </motion.div>
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

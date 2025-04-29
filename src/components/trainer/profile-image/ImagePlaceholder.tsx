
import { ImageIcon } from "lucide-react";

export const ImagePlaceholder = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <ImageIcon className="w-10 h-10 text-muted-foreground/40 mb-2" />
      <p className="text-xs text-muted-foreground font-medium">انتخاب تصویر</p>
    </div>
  );
};

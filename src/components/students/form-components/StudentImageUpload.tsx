
import React from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

interface StudentImageUploadProps {
  image: string;
  onImageChange: (imageUrl: string) => void;
  error?: boolean;
  itemVariants: any;
}

export const StudentImageUpload: React.FC<StudentImageUploadProps> = ({
  image,
  onImageChange,
  error,
  itemVariants
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          onImageChange(event.target.result.toString());
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Update to use the new image path in the Assets/Image directory
  const defaultImage = image === "/placeholder.svg" ? "/Assets/Image/placeholder.svg" : image;

  return (
    <motion.div variants={itemVariants}>
      <div className="relative mx-auto w-24 h-24 mb-4">
        <div
          className={`w-24 h-24 rounded-full overflow-hidden border-2 ${
            error ? "border-red-500" : "border-indigo-200"
          }`}
        >
          <img
            src={defaultImage}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              // In case the new path also fails, set a simple fallback
              const target = e.target as HTMLImageElement;
              if (target.src !== 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xMiAyMnYtNm0wIDZIOC41YzAtMy44NTggMy4xNC03IDctN3M3IDMuMTQyIDcgN0gxNiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiLz48L3N2Zz4=') {
                target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xMiAyMnYtNm0wIDZIOC41YzAtMy44NTggMy4xNC03IDctN3M3IDMuMTQyIDcgN0gxNiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiLz48L3N2Zz4=';
              }
            }}
          />
        </div>

        <label
          htmlFor="image-upload"
          className="absolute bottom-0 right-0 p-1 bg-indigo-500 text-white rounded-full cursor-pointer shadow-lg hover:bg-indigo-600 transition-colors"
        >
          <Upload className="h-4 w-4" />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </motion.div>
  );
};


import React from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pill, Heart, X } from "lucide-react";

interface DialogHeaderProps {
  type: "supplement" | "vitamin";
  mode: "add" | "edit";
  onClose: () => void;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  type,
  mode,
  onClose,
}) => {
  const getGradientColors = () => {
    return type === "supplement"
      ? "from-emerald-500 to-sky-600"
      : "from-sky-500 to-emerald-600";
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className={`p-4 bg-gradient-to-br ${getGradientColors()} rounded-2xl`}>
          {type === "supplement" ? (
            <Pill className="w-6 h-6 text-white" />
          ) : (
            <Heart className="w-6 h-6 text-white" />
          )}
        </div>
        <div>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {mode === "add" ? "افزودن" : "ویرایش"} {type === "supplement" ? "مکمل" : "ویتامین"}
          </DialogTitle>
          <p className="text-gray-500">
            {mode === "add" ? "اطلاعات جدید را وارد کنید" : "اطلاعات موجود را ویرایش کنید"}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="h-10 w-10 p-0 rounded-xl hover:bg-gray-100"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};

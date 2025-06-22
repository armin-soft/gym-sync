
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface FormActionsProps {
  mode: "add" | "edit";
  type: "supplement" | "vitamin";
  onCancel: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({
  mode,
  type,
  onCancel,
}) => {
  const getGradientColors = () => {
    return type === "supplement"
      ? "from-emerald-500 to-sky-600"
      : "from-sky-500 to-emerald-600";
  };

  return (
    <div className="flex gap-4 pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="flex-1 h-12 rounded-xl border-2 border-gray-300 hover:border-gray-400"
      >
        انصراف
      </Button>
      <Button
        type="submit"
        className={`flex-1 h-12 bg-gradient-to-r ${getGradientColors()} hover:from-emerald-600 hover:to-sky-700 text-white shadow-lg rounded-xl`}
      >
        <Save className="w-5 h-5 ml-2" />
        {mode === "add" ? "افزودن" : "ویرایش"}
      </Button>
    </div>
  );
};

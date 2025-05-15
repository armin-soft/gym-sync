
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface FormActionAreaProps {
  loading?: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export const FormActionArea: React.FC<FormActionAreaProps> = ({
  loading = false,
  onSave,
  onCancel,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-t bg-muted/20">
      <div></div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          <X className="h-4 w-4 mr-2" />
          انصراف
        </Button>
        <Button
          onClick={onSave}
          disabled={loading}
        >
          <Save className="h-4 w-4 mr-2" />
          ذخیره
        </Button>
      </div>
    </div>
  );
};

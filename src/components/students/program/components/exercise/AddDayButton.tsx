
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddDayButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const AddDayButton: React.FC<AddDayButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className="h-10 w-10 rounded-md border-dashed"
      disabled={disabled}
    >
      <Plus className="h-4 w-4" />
    </Button>
  );
};

export default AddDayButton;
